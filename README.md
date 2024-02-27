# Health-Receipt

Understanding how healthy your shopping list is is now as easy as simply scanning your receipt! Simply open the app, scan your receipt, and start understanding what's going into your body. From essential nutrients to harmful chemicals, our application details them all in an easily-understandable way. Get started today!

Its core functionalities include:

- OCR-Based Receipt Scanning: Using optical character recognition (OCR) technology, Health Receipt scans grocery store receipts to extract detailed information about the food items listed.
- Nutrition Information: The app retrieves nutrition facts for each scanned product, including calorie count, macronutrient breakdown, and ingredient list.
- Eco-Scores and Packaging Information: Health Receipt evaluates the environmental impact of each product by analyzing packaging materials and carbon footprint, providing users with eco-scores to guide sustainable purchasing decisions.
- Allergen Warnings: The app identifies potential allergens present in scanned products, helping users with dietary restrictions make safe choices.
- Recipe Creation: Health Receipt offers a unique feature that allows users to generate recipes based on the ingredients scanned from their receipts, promoting creative and healthy meal planning.

## Demo

[![Watch the video](https://img.youtube.com/vi/gEBNzcm0g6Y/0.jpg)](https://www.youtube.com/watch?v=gEBNzcm0g6Y)

## How we built it

- Typescript: We chose TypeScript for its strong typing system and scalability, enabling us to write cleaner and more maintainable code.
- Bun: The backend of Health Receipt is powered by Bun, providing a fast and efficient server environment for processing user requests and handling data.
- npm: We utilized npm, the package manager for JavaScript, to integrate various libraries and dependencies into our project, streamlining development and ensuring compatibility.
- Convex: Leveraging the Convex framework, we implemented features such as text search, server functions, and real-time updates, enhancing the performance and functionality of our app's backend.
- Google Vision API: For OCR functionality, we integrated the Google Vision API, which enabled us to extract text data from grocery store receipts with high accuracy and reliability.
- Together AI: Collaborating with Together AI, we incorporated innovative features like recipe creation into Health Receipt, enriching the user experience and adding value to the app.

## Team

This application was built with ❤️ by

- Atishay J.
- Eliot H.
- Sravan K.
- Rohit

## Data Flow

For developers, here's how everything works. When you scan your receipt, our OCR model extracts what products you bought and securely sends that data to our Convex backend, which then looks up the products, retrieves the information
about the foods from our database (), and then sends that data back to our frontend, which displays it.

## Getting Started Developing!

- First, make sure to run `bun install` (or `npm install`) in order to install all necessary packages
- Next, run the backend by running `npx convex dev`
- Then, install Expo Go on the mobile device that you will be viewing the frontend
- Finally, run `bun start` (or `npm start`) in order to start the frontend. Open Expo Go on your device and scan the QR code,
  and then you'll see the application there!
