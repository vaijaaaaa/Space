import { COLORS } from '@/constants/theme';
import { styles } from '@/styles/create.styles';
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function CreateScreen() {

  const router = useRouter();
  const { user } = useUser();

  const [caption,setCaption] = useState("");
  const [selectedImage,setSelectedImage] = useState<string | null>(null);
  const [isSharing,setIsSharing] = useState(false);

  







  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color={COLORS.primary} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>New Post</Text>

      <View style={{ width: 28 }} />
    </View>

    <TouchableOpacity style={styles.emptyImageContainer}>
      <Ionicons name="image-outline" size={48} color={COLORS.grey} />
      <Text style={styles.emptyImageText}>Tap to select an image</Text>
    </TouchableOpacity>
  </View>
  );
}
