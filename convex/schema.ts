import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({

    users:defineTable({
        username:v.string(),
        fullname:v.string(),
        email:v.string(),
        bio:v.string(),
        image:v.string(),
        followers:v.number(),
        following:v.number(),
        posts:v.number(),
        clerkId:v.string(),
        
    }).index("by_clerkId", ["clerkId"]),  
    
    posts:defineTable({
        userId:v.string(),
        imageUrl:v.string(),
        storageId:v.id("_storage"),
        caption:v.optional(v.string()),
        likes:v.number(),
        comments:v.number(),
    }).index("by_userId", ["userId"]),


    likes:defineTable({
        userId:v.id("users"),
        postId:v.id("posts"),
    }).index("by_postId", ["postId"]).index("by_user_and_post", ["userId", "postId"]),


    comments:defineTable({
        userId:v.id("users"),
        postId:v.id("posts"),
        content:v.string(),
    }).index("by_postId", ["postId"]),


    follows:defineTable({
        followerId:v.id("users"),
        followingId:v.id("users"),
    }).index("by_followerId", ["followerId"]).index("by_followingId", ["followingId"]).index("by_follower_and_following", ["followerId", "followingId"]),


    notifications:defineTable({
        receiverId:v.id("users"),
        senderId:v.id("users"),
        type:v.union(v.literal("like"), v.literal("comment"), v.literal("follow")),
        postId:v.optional(v.id("posts")),
        commentId:v.optional(v.id("comments")),
    }).index("by_receiverId", ["receiverId"]),


    bookmarks:defineTable({
        userId:v.id("users"),
        postId:v.id("posts"),
    }).index("by_userId", ["userId"]).index("by_postId", ["postId"]).index("by_user_and_post", ["userId", "postId"]),

   



});