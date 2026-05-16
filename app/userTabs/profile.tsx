import { Image } from "expo-image";
import React from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Switch,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Controller } from "react-hook-form";
import { AppColors } from "@/constants/theme";
import { styles } from "@/styles/Profile.styles";
import { FormInput } from "@/components/ui/FormInput";
import { useProfile } from "@/hooks/useProfile";
import { AppAlert } from "@/components/ui/CustomAlert";
import { MediaPickerModal } from "@/components/ui/MediaPickerModal";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const {
    control,
    isDirty,
    isLoading,
    isAnonymous,
    isNotificationsEnabled,
    handleSubmit,
    onSubmit,
    handleAnonymousChange,
    triggerLogoutAlert,
    profileImage,
    media,
    alert,
    closeAlert,
    removeProfileImage,
    handleNotificationsChange,
  } = useProfile();
  const router = useRouter();
  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={AppColors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topHeader}>
            <Text style={styles.topHeaderTitle}>Profile</Text>
            <Pressable onPress={triggerLogoutAlert}>
              <Ionicons
                name="log-out-outline"
                size={24}
                color={AppColors.primary}
              />
            </Pressable>
          </View>

          <View style={styles.headerSection}>
            <View style={styles.imageContainer}>
              <Pressable onPress={media.openModal}>
                <Image
                  source={{
                    uri:
                      profileImage ||
                      `https://ui-avatars.com/api/?name=${control._formValues.name || "User"}&background=204E64&color=fff&size=128`,
                  }}
                  style={styles.profileImage}
                />
              </Pressable>

              <Pressable style={styles.cameraBtn} onPress={media.openCamera}>
                <Ionicons name="camera" size={18} color="white" />
              </Pressable>
            </View>

            <Controller
              control={control}
              name="name"
              render={({ field: { value } }) => (
                <Text style={styles.userNameText}>
                  {isAnonymous ? "Anonymous" : value}
                </Text>
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { value } }) => (
                <Text style={styles.userEmailText}>
                  {isAnonymous ? "************" : value}
                </Text>
              )}
            />
          </View>

          <View style={styles.sectionCard}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Personal Information</Text>
              {isDirty && (
                <Pressable
                  onPress={handleSubmit(onSubmit)}
                  style={({ pressed }) => [
                    styles.saveButtonOpacity,
                    pressed && styles.pressed,
                  ]}
                >
                  <View style={styles.saveBadge}>
                    <Text style={styles.saveBadgeText}>Save</Text>
                  </View>
                </Pressable>
              )}
            </View>

            <FormInput
              control={control}
              name="name"
              icon="person-outline"
              rules={{
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              }}
              label=""
              placeholder="Your Name"
              style={[styles.input, isAnonymous && styles.inputLocked]}
              editable={!isAnonymous}
            />

            <FormInput
              control={control}
              name="email"
              icon="mail-outline"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              }}
              label=""
              placeholder="Your Email"
              keyboardType="email-address"
              style={[styles.input, isAnonymous && styles.inputLocked]}
              editable={!isAnonymous}
            />

            <FormInput
              control={control}
              name="phone"
              icon="call-outline"
              rules={{
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be exactly 10 digits",
                },
              }}
              label=""
              placeholder="Your Phone"
              keyboardType="phone-pad"
              style={styles.input}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.rowLeft}>
              <Ionicons
                name="notifications-outline"
                size={20}
                color={AppColors.primary}
              />
              <Text style={styles.rowText}>Notifications</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: AppColors.primary }}
              thumbColor={isNotificationsEnabled ? AppColors.white : "#f4f3f4"}
              value={isNotificationsEnabled}
              onValueChange={handleNotificationsChange}
            />
          </View>

          <Pressable style={styles.checkboxRow} onPress={handleAnonymousChange}>
            <Ionicons
              name={isAnonymous ? "checkbox" : "square-outline"}
              size={22}
              color={AppColors.primary}
            />
            <Text style={styles.checkboxText}>Anonymous User</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/my-reports")}
            style={styles.myReportsBtn}
          >
            <Ionicons
              name="document-text-outline"
              size={20}
              color={AppColors.white}
              style={{ marginRight: 10 }}
            />
            <Text style={styles.myReportsBtnText}>My Reports</Text>
          </Pressable>
        </ScrollView>
        <AppAlert
          visible={alert.visible}
          title={alert.title}
          message={alert.message}
          confirmText={alert.confirmText}
          onConfirm={alert.onConfirm}
          onCancel={closeAlert}
        />
        <MediaPickerModal
          visible={media.visible}
          title="Profile Image"
          hasImage={Boolean(profileImage)}
          onCamera={media.openCamera}
          onGallery={media.openGallery}
          onRemove={removeProfileImage}
          onClose={media.closeModal}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
