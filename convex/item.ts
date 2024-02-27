import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import uuid from 'react-native-uuid';


export const getMostRecentPurchase = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const order_id = await ctx.db.query("orders_").filter(q => q.eq(q.field("userId"), args.userId)).order("desc").take(1);
        console.log("we took", order_id)
        if (order_id === undefined || order_id.length === 0) {
            return [];
        }
        return await ctx.db.query("items_").filter(q => q.and(q.eq(q.field("userId"), args.userId), q.eq(q.field("orderId"), order_id[0]?.orderId))).collect();
    }
})

export const getPurchaseDate = query({
    args: { orderId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db.query("orders_").filter(q => q.eq(q.field("orderId"), args.orderId)).collect();
    }
})

/**
 * Get all orders that belong to user `userId`
 */
export const getUserHistory = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db.query("orders_").filter(q => q.eq(q.field("userId"), args.userId)).collect()
    }
})

/**
 * Get all items that were ordered as part of the order `orderId`
 */
export const get = query({
    args: { orderId: v.string(), userId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db.query("items_").filter(q => q.and(q.eq(q.field("orderId"), args.orderId), q.eq(q.field("userId"), args.userId))).collect();
    },
});

/**
 * Post foods to the database
 * Returns the UUID of the order that those foods represent
 */
export const postFoods = mutation({
    args: { foods: v.array(v.string()), userId: v.string() },
    handler: async (ctx, args) => {
        const uuid_ = uuid.v4().toString();
        await Promise.all(args.foods.map(food => ctx.db.insert("items_", {
            userId: args.userId,
            orderId: uuid_,
            name: food,
        })));

        return uuid_;
    }
})

export const postOrder = mutation({
    args: { userId: v.string(), score: v.number(), orderId: v.string() },
    handler: async (ctx, args) => {
        await ctx.db.insert("orders_", { userId: args.userId, orderId: args.orderId, score: args.score });
    }
})