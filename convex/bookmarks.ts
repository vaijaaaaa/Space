import { v } from "convex/values";
import { mutation } from "./_generated/server"; 
import { getAuthenticatedUser } from "./users";
import { MutationCtx } from "./_generated/server";

export const toggleBookmark = mutation({
  args: { postId: v.id("posts") },

  handler: async (ctx: MutationCtx, args: { postId: any; }) => {
    const currentUser = await getAuthenticatedUser(ctx);

    const existing = await ctx.db
      .query("bookmarks")
      .withIndex("by_user_and_post", (q) =>
        q.eq("userId", currentUser._id).eq("postId", args.postId)
      )
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
      return false;
    } else {
      await ctx.db.insert("bookmarks", {
        userId: currentUser._id,
        postId: args.postId,
      });
      return true;
    }
  },
});


