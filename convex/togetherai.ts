import { v } from 'convex/values';
import { action } from './_generated/server.js';

const apiKey = process.env.TOGETHER_API_KEY;
const baseUrl = 'https://api.together.xyz';

export const getScore = action({
    args: { foodItems: v.array(v.string()) },
    handler: async (ctx, args) => {
        const url = `${baseUrl}/v1/chat/completions`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        };

        const foodItemsStr = args.foodItems.join(', ');
        const data = {
            model: "Qwen/Qwen1.5-72B-Chat",
            max_tokens: 1024,
            messages: [{
                role: "user",
                content: `I want you to rate purchases based on how healthy or uhealthy they are. Return a score out of 100 (with 100 
being very healthy and 0 being very unhealthy). For reference consider a purchase of (Mixed greens, almond butter, quinoa, wild 
salmon, cauliflower rice, sweet potatoes, avocados, olive oil, chia seeds, blueberries, sprouted bread, kefir, hummus, almonds, 
lentils, Brussels sprouts, steel-cut oats, bell peppers, organic eggs, Greek yogurt) will be considered very healthy with a score of 
100. And an order of (Candy, processed snacks, sugary cereals, frozen desserts, pre-packaged sweets, flavored yogurts, processed 
meats, high-fat dressings, soda, refined pastries, high-sodium frozen meals, artificially flavored snacks, sweetened beverages) will 
be considered very unhealthy with a score of 0.
            Keeping this in mind rate the following order: ${foodItemsStr}
            Give me a single score out of 100 that would wholistically reflect on the order. Return me a single number, nothing 
else.`
            }]
        };

        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        };

        const response = await fetch(url, options);
        const result = await response.json();
        const score = result.choices[0].message.content;

        const match = score.match(/\d+/);

        if (!match) {
            return -1;
        }

        const finalScore = match[0];
        return parseInt(finalScore);
    }
});

async function getItems(receiptStr: string[]) {
    const url = `${baseUrl}/v1/chat/completions`;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };

    const data = {
        model: "garage-bAInd/Platypus2-70B-instruct",
        max_tokens: 1024,
        messages: [{
            role: "user",
            content: `Return the names of all food items from the following text extracted from a Grocery Bill: '${receiptStr}' 
Return these items in the form of a python list. Make sure to only include food items. Also strictly only return the python list with 
food items. Do not return anything else. Just the python list. Your response must only contain the python list and no other words.`
        }]
    };

    const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    };

    const response = await fetch(url, options);
    const result = await response.json();
    const items = result.choices[0].message.content;

    const pattern = /\['.*?'\]/;
    const match = items.match(pattern);
    let itemsList = [];

    if (match) {
        itemsList = JSON.parse(match[0].replace(/'/g, '"')); // Replace single quotes with double quotes for valid JSON
        console.log("food Items List :");
        console.log(itemsList);
    } else {
        console.log("No list found in the string.");
    }

    return itemsList;
}

export const getRecipe = action({
    args: { foodItems: v.array(v.string()) },
    handler: async (ctx, args) => {
        const url = `${baseUrl}/v1/chat/completions`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        };

        const foodItemsStr = args.foodItems.join(', ');
        const data = {
            model: "meta-llama/Llama-2-70b-chat-hf",
            max_tokens: 1024,
            messages: [{
                role: "user",
                content: `From the following food items: ${foodItemsStr}, return a healthy recipe.`
            }]
        };

        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        };

        const response = await fetch(url, options);
        const result = await response.json();
        const recipe = result.choices[0].message.content;
        return recipe;
    }
});


async function getTextFromImage(base64Encoded: string) {
    const requestJson = {
        "requests": [
            {
                "image": {
                    "content": base64Encoded
                },
                "features": [
                    {
                        "type": "TEXT_DETECTION",
                        "maxResults": 1
                    }
                ]
            }
        ]
    };
    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + process.env.GOOGLE_AUTH_KEY!,
            'x-goog-user-project': process.env.GOOGLE_PROJECT_ID!,
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(requestJson)
    };

    const result = await fetch('https://vision.googleapis.com/v1/images:annotate', options)
        .then(response => response.json()).catch(reason => console.error(reason));

    console.log(result);

    console.log('Text:');
    const text = result.responses[0].fullTextAnnotation ? result.responses[0].fullTextAnnotation.text : '';
    console.log('Grocceries :');
    console.log(text);
    return text;
}

function removeUnnecessaryLines(receiptString: string) {
    const lines = receiptString.split('\n');
    const items = lines.filter(line =>
        !(line.match(/\$/) || line.match(/@/) || line.match(/ AM /) || line.match(/ PM /)) &&
            line.match(/^T\s/) ? line.substring(2) : line
    );

    return items;
}

export const processReceipt = action({
    args: { base64Encoded: v.string() },
    handler: async (ctx, args) => {
        const text = await getTextFromImage(args.base64Encoded);
        const items = removeUnnecessaryLines(text);
        if (items.length == 0) {
            console.log("Please click a more clear picture of the bill");
            return;
        }
        const foodItems = await getItems(items);
        return foodItems;
    }
})