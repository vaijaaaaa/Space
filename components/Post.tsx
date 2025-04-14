import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from '@/styles/feed.styles'
import { Link } from 'expo-router'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants/theme'
import { Id } from '@/convex/_generated/dataModel'
import { useState } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import CommentsModal from './CommentsModal'
import { formatDistanceToNow, set } from 'date-fns'
import { useUser } from '@clerk/clerk-expo'






type PostProps = {
   post:{
    _id:Id<"posts">,
    imageUrl:string,
    caption:string,
    likes:number,
    comments:number,
    _creationTime:number,
    isLiked:boolean,
    isBookmarked:boolean,
    author:{
        _id:string;
        username:string;
        image:string;
    }
   } 
}



export default function Post({post}:PostProps) {

    const[isLiked, setIsLiked] = useState(post.isLiked);
    const[likesCount, setLikesCount] = useState(post.likes);
    const[isBookmarked, setIsBookmarked] = useState(post.isBookmarked);
    const[commentsCount, setCommentsCount] = useState(post.comments);
    const[showComments, setShowComments] = useState(false);


    const {user} = useUser();

   const currentUser =  useQuery(api.users.getUserByClerkId, user ? {clerkId:user?.id} :"skip" )
  



    const toggleLike = useMutation(api.posts.toggleLike);
    const toggleBookmark = useMutation(api.bookmarks.toggleBookmark);
    const deletePost = useMutation(api.posts.deletPost);




    const handlelike = async() =>{
      try {
        const newIsLiked = await toggleLike({postId:post._id});
        setIsLiked(newIsLiked);
        setLikesCount((prev) => newIsLiked ? prev + 1 : prev - 1);
      } catch (error) {
        console.log("Error liking post:", error);
        
      }
    }

    const handleBookmark = async() =>{
     const newIsBookmaked = await toggleBookmark({postId:post._id});
     setIsBookmarked(newIsBookmaked);
    }

    const handleDelete = async() =>{
      try {
        await toggleLike({postId:post._id});
      } catch (error) {
        console.log("Error deleting post:", error);
        
      }
    }








  return (

    <View style={styles.post}>
       <View style={styles.postHeader}>
      <Link href={"/(tabs)/notifications"}>
        <TouchableOpacity style={styles.postHeaderLeft}>
          <Image
            source={ post.author.image }
            style={styles.postAvatar}
            contentFit="cover"
            transition={200}
            cachePolicy="memory-disk"
          />
          <Text style={styles.postUsername}>{post.author.username}</Text>
        </TouchableOpacity>
      </Link>

       {/* if i'm the owner of the post, show the delete button */}
{post.author._id === currentUser?._id ? (
  <TouchableOpacity onPress={handleDelete}>
    <Ionicons name="trash-outline" size={20} color={COLORS.primary} />
  </TouchableOpacity>
) : (
  <TouchableOpacity>
    <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.white} />
  </TouchableOpacity>
)}
        
    </View>

    <Image
    source={post.imageUrl}
    style={styles.postImage}
    contentFit="cover"
    transition={200}
    cachePolicy="memory-disk"
    />

        <View style={styles.postActions}>
        <View style={styles.postActionsLeft}>
            <TouchableOpacity onPress={handlelike}>
            <Ionicons name={isLiked ?"heart":"heart-outline"} size={24} color={COLORS.white} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> setShowComments(true)}>
            <Ionicons name={"chatbubble-outline"} size={22} color={COLORS.white} />
            </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleBookmark}>
            <Ionicons name={isBookmarked ? "bookmark":"bookmark-outline"} size={22} color={COLORS.white} />
        </TouchableOpacity>
        </View>


        <View style={styles.postInfo}>
        <Text style={styles.likesText}>Be the first to Like</Text>
        {post.caption && (
            <View style={styles.captionContainer}>
            <Text style={styles.captionUsername}>{post.author.username}</Text>
            <Text style={styles.captionText}>{post.caption}</Text>
            </View>
        )}

        {commentsCount > 0 && (
             <TouchableOpacity onPress={() => setShowComments(true)}>
             <Text style={styles.commentsText}>View all {commentsCount} comments</Text>
         </TouchableOpacity>
        )}


     

        <Text style={styles.timeAgo}>{formatDistanceToNow(post._creationTime,{addSuffix:true})}</Text>
        </View>

        <CommentsModal
        postId={post._id}
        visible={showComments}
        onClose={() => setShowComments(false)}
        onCommentAdded={() => setCommentsCount((prev) => prev + 1)}
        />
    </View>
  )
}