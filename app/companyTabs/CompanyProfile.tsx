import React from "react";
import { Stack } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { MediaPickerModal } from "@/components/ui/MediaPickerModal";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { CompanyDetailsForm } from "@/components/profile/CompanyDetailsForm";
import { styles } from "@/styles/CompanyProfile";

export default function CompanyProfile() {
  const profileLogic = useCompanyProfile();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        <MediaPickerModal
          visible={profileLogic.media.visible}
          title="Company Logo"
          hasImage={Boolean(profileLogic.companyImage)}
          onCamera={profileLogic.media.openCamera}
          onGallery={profileLogic.media.openGallery}
          onRemove={profileLogic.removeProfileImage} 
          onClose={profileLogic.media.closeModal}
        />
        

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <ProfileHeader
              isEditing={profileLogic.isEditing}
              companyImage={profileLogic.companyImage}
              onEditToggle={() =>
                profileLogic.setIsEditing(!profileLogic.isEditing)
              }
              onImagePress={profileLogic.media.openModal}
              onCameraPress={profileLogic.media.openCamera}
              onLogout={profileLogic.triggerLogoutAlert}
            />
            <CompanyDetailsForm
              {...profileLogic}
              onSave={profileLogic.handleSubmit(profileLogic.onSubmit)}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}
