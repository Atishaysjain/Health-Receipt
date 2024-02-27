import { v } from "convex/values";
import { query } from "./_generated/server";

export const getFoodFacts = query({
    args: { product_name: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db.query("openfoodfacts")
            .withSearchIndex("search_product_name", (q) =>
                q.search("product_name", args.product_name)
            )
            .take(10);
    }
})