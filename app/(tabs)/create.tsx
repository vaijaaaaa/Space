import { COLORS } from '@/constants/theme';
import { styles } from '@/styles/create.styles';
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';

import * as ImagePicker from 'expo-image-picker';



export default function CreateScreen() {

  const router = useRouter();
  const { user } = useUser();

  const [caption,setCaption] = useState("");
  const [selectedImage,setSelectedImage] = useState<string | null>(null);
  const [isSharing,setIsSharing] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:"images",
      allowsEditing:true,
      aspect:[1,1],
      quality:0.8,
    });

    if(!result.canceled) setSelectedImage(result.assets[0].uri);

  }

  if(!selectedImage){
    return (
      <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color={COLORS.primary} />
        </TouchableOpacity>
  
        <Text style={styles.headerTitle}>New Post</Text>
  
        <View style={{ width: 28 }} />
      </View>
  
      <TouchableOpacity style={styles.emptyImageContainer} onPress={pickImage}>
        <Ionicons name="image-outline" size={48} color={COLORS.grey} />
        <Text style={styles.emptyImageText}>Tap to select an image</Text>
      </TouchableOpacity>
    </View>
    );
  }

  return(
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : "height"}
    style={styles.container}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
    >
      <View style={styles.contentContainer}>
        <View style = {styles.header}>
        <TouchableOpacity
        onPress={()=>{
          setSelectedImage(null);
          setCaption("");
        }}
        disabled={isSharing}
        >
          <Ionicons
          name = "close-outline"
          size={28}
          color={isSharing?COLORS.grey:COLORS.white}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Post</Text>
        <TouchableOpacity
  style={[styles.shareButton, isSharing && styles.shareButtonDisabled]}
  disabled={isSharing || !selectedImage}
>
  {isSharing ? (
    <ActivityIndicator size="small" color={COLORS.primary} />
  ) : (
    <Text style={styles.shareText}>Share</Text>
  )}
</TouchableOpacity>


      </View>
      
      </View>
    </KeyboardAvoidingView>
  );



  
}
