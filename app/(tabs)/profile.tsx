
import { Image } from "expo-image";
import React from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Switch,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Controller } from "react-hook-form";
import { logout } from "@/services/AuthService";
import { useRouter } from "expo-router";
import { AppColors } from "@/constants/theme";
import { styles } from "@/styles/Profile.styles";
import { FormInput } from "@/components/ui/FormInput";
import { useProfile } from "@/hooks/useProfile";

export default function ProfileScreen() {
  const router = useRouter();
  const {
    control,
    isDirty,
    isLoading,
    isAnonymous,
    isNotificationsEnabled,
    setIsNotificationsEnabled,
    handleSubmit,
    onSubmit,
    handleAnonymousChange,
  } = useProfile();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={AppColors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topHeader}>
          <Text style={styles.topHeaderTitle}>Profile</Text>
          <Pressable
            onPress={async () => {
              try {
                await logout();
                router.replace("/(auth)/login");
              } catch (error) {
                console.error(error);
              }
            }}
            style={styles.logoutIcon}
          >
            <Ionicons name="log-out-outline" size={24} color="#D32F2F" />
          </Pressable>
        </View>

        <View style={styles.headerSection}>
          <View style={styles.imageContainer}>
       <Image
              source={{
                uri: `https://ui-avatars.com/api/?name=${control._formValues.name || "User"}&background=204E64&color=fff&size=128`,
              }}
              style={styles.profileImage}
            />
            <Pressable style={styles.cameraBtn}>
              <Ionicons name="camera" size={18} color={AppColors.background} />
            </Pressable>
          </View>

          <Controller
            control={control}
            name="name"
            render={({ field: { value } }) => (
              <Text style={styles.userNameText}>{value}</Text>
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { value } }) => (
              <Text style={styles.userEmailText}>{value}</Text>
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
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Full Name</Text>
            <FormInput
              name="name"
              control={control}
              label=""
              placeholder="Your Name"
              style={[styles.input, isAnonymous && styles.inputLocked]}
              editable={!isAnonymous}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Email Address</Text>
            <FormInput
              name="email"
              control={control}
              label=""
              placeholder="Your Email"
              keyboardType="email-address"
              style={[styles.input, isAnonymous && styles.inputLocked]}
              editable={!isAnonymous}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Phone Number</Text>
            <FormInput
              name="phone"
              control={control}
              label=""
              placeholder="Your Phone"
              keyboardType="phone-pad"
              style={styles.input}
            />
          </View>
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
            onValueChange={setIsNotificationsEnabled}
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

        <Pressable style={styles.myReportsBtn}>
          <Text style={styles.myReportsBtnText}>My Reports</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}