import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '@clerk/clerk-expo';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import { Loader } from '@/components/Loader';

export default function Profile() {

  const {signOut,userId} = useAuth();
  const [isEditModalVisible,setIsEditModalVisible] = useState(false);
  const currentUser = useQuery(api.users.getUserByClerkId,userId ?{clerkId:userId}:"skip");
  
  const [editedProfile,setEditedProfile] = useState({
    fullname:currentUser?.fullname || "",
    bio:currentUser?.bio||"",
  });

  const[selectedPost,setSelectedPost] = useState<Doc<"posts">| null>(null)
  const posts = useQuery(api.posts.getPostByUser,{});

  const updateProfile = useMutation(api.users.updateProfile);

  const handleSaveProfile = async()=>{

  }


  if(!currentUser || posts === undefined) return <Loader/>


  return (
    <View>
      <Text>profile screen</Text>
    </View>
  )
}