import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";
import { Id } from "./_generated/dataModel";


export const addComment = mutation({
    args:{
        content:v.string(),
        postId:v.id("posts")
    },

    handler:async (ctx,args) =>{
        const currentUser = await getAuthenticatedUser(ctx);

        const post = await ctx.db.get(args.postId);
        if(!post){
            throw new Error("Post not found");
        }

        const commentId = await ctx.db.insert("comments", {
            userId:currentUser?._id,
            postId:args.postId,
            content:args.content,
        });

        await ctx.db.patch(args.postId, { comments: post.comments });


       

        if (post.userId !== currentUser._id) {
            await ctx.db.insert("notifications", {
                receiverId: post.userId as Id<"users">,
                senderId: currentUser._id as Id<"users">,
                type: "comment",
                postId: args.postId,
                commentId: commentId,
            });
        }
        
        return commentId

    }
})


export const getCommenst = query({
    args:{postId:v.id("posts")},
    handler:async (ctx,args) => {

        const comments = await ctx.db
        .query("comments")
        .withIndex("by_postId",(q) => q.eq("postId", args.postId))
        .collect();

        const commenstWithInfo = await Promise.all(
            comments.map(async(Comment)=>{
                const user = await ctx.db.get(Comment.userId);
                return {
                    ...Comment,
                    user: {
                       fullname:user!.fullname,
                       image:user!.image,
                    },
                };
            })
        )
        return commenstWithInfo;
        
    },
})

