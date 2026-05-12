import React, { useCallback } from "react";
import { View, Text, FlatList, Pressable, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { OrganizationsService } from "@/services/OrganizationsService";
import { styles } from "@/styles/ContactUs.styles";
import { AppColors } from "@/constants/theme";

export default function ContactUsScreen() {
  const router = useRouter();

  const { data: organizations, isLoading, isError } = useQuery({
    queryKey: ["organizations"],
    queryFn: OrganizationsService.getOrganizations,
  });

  const renderOrganization = useCallback(({ item }: { item: any }) => (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
     // onPress={() => router.push("/chat")}
     onPress={() => alert(`Opening chat with ${item.name}`)}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="business-outline" size={24} color={AppColors.primary} />
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardType}>{item.type}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={AppColors.gray} />
    </Pressable>
  ), []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={AppColors.primary} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Something went wrong</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Contact Us</Text>
        <Text style={styles.subtitle}>Choose an organization to chat with</Text>
      </View>

      <FlatList
        data={organizations}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={renderOrganization}
      />
    </SafeAreaView>
  );
}