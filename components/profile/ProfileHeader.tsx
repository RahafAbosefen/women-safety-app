import React from "react";
import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { AppColors } from "@/constants/theme";
import { styles } from '../../styles/CompanyProfile'; 
type ProfileHeaderProps = {
  isEditing: boolean;
  companyImage?: string;
  onEditToggle: () => void;
  onLogout: () => void;
  onImagePress?: () => void;
  onCameraPress?: () => void;
};

export const ProfileHeader = ({
  isEditing,
  companyImage,
  onEditToggle,
  onLogout,
  onImagePress,
  onCameraPress,
}: ProfileHeaderProps) => {
  return (
    <View style={styles.headerWrapper}>
      <View style={styles.curvedBg} />

      <View style={styles.headerTop}>
        <Pressable onPress={onEditToggle} style={styles.navTextButton}>
          <Text style={styles.navText}>{isEditing ? "Cancel" : "Edit"}</Text>
        </Pressable>

       
      </View>

      <View style={styles.profileContent}>
        <View style={styles.imageContainer}>
          <Pressable onPress={isEditing ? onImagePress : undefined}>
            {companyImage ? (
              <Image source={{ uri: companyImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Ionicons name="business-outline" size={50} color={AppColors.gray} />
              </View>
            )}
          </Pressable>

          {/* {isEditing && (
            <Pressable style={styles.cameraButton} onPress={onCameraPress}>
              <Ionicons name="camera" size={16} color="#fff" />
            </Pressable>
          )} */}
        </View>
      </View>
    </View>
  );
};