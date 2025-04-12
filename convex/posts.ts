import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthenticatedUser } from "./users";

export const generateUploadUrl = mutation(async(ctx)=>{
    const identity = await ctx.auth.getUserIdentity();
    if(!identity) throw new Error("Not authenticated");
    return await ctx.storage.generateUploadUrl();
});




export const createPost = mutation({
    args:{
        caption:v.optional(v.string()),
        storageId:v.id("_storage"),
    },
    handler:async(ctx,args) => {
       
        const currentUser = await getAuthenticatedUser(ctx);

        const imageUrl = await ctx.storage.getUrl(args.storageId);
        if(!imageUrl) throw new Error("Image not found");

        //create post
       const postId =  await ctx.db.insert("posts",{
            userId: currentUser._id,
            imageUrl,
            storageId: args.storageId,
            caption:args.caption,
            likes:0,
            comments:0,
        })

        await ctx.db.patch(currentUser._id,{
            posts:currentUser.posts+1
        })

        return postId;


    },
})


export const getFeedPosts = query({
    handler:async(ctx) =>{
        const currentUser = await getAuthenticatedUser(ctx);


        //get all posts
        const posts = await ctx.db.query("posts").order("desc").collect();

        if(posts.length === 0) return [];

        return posts;


    }
})