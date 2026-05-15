import React, { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCompanies } from "@/hooks/useCompanies";
import { ChatService } from "@/services/ChatService";
import { auth } from "@/services/firebaseConfig";
import { styles } from "@/styles/ContactUs.styles";
import { AppColors } from "@/constants/theme";
import * as SQLite from "expo-sqlite";

export default function ContactUsScreen() {
  const router = useRouter();
  const { companies, isLoading, isError } = useCompanies();
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const database = await SQLite.openDatabaseAsync("companies.db");
      await database.execAsync(
        `CREATE TABLE IF NOT EXISTS companies (
          id TEXT PRIMARY KEY,
          name TEXT,
          type TEXT,
          phone TEXT,
          email TEXT
        );`
      );
      if (!cancelled) setDb(database);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!db || !companies) return;
    (async () => {
      await db.execAsync(`DELETE FROM companies;`);
      for (const company of companies) {
        await db.runAsync(
          `INSERT OR REPLACE INTO companies (id, name, type, phone, email) VALUES (?, ?, ?, ?, ?);`,
          String(company.id), String(company.name || ""), String(company.type || ""), String(company.phone || ""), String(company.email || "")
        );
      }
    })();
  }, [db, companies]);

  const openChatWithCompany = async (company: any) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "User not logged in");
        return;
      }
      const companyId = company.id;
      const companyName = company.name || "Company";
      const chatId = await ChatService.getOrCreateChat({
        victimId: user.uid,
        organizationId: companyId,
        organizationName: companyName,
      });
      router.push({
        pathname: "/chat/[chatId]",
        params: { chatId, title: companyName },
      });
    } catch (error: any) {
      console.log("Open chat error:", error);
      Alert.alert("Error", error.message || "Could not open chat");
    }
  };
  const renderCompany = useCallback(({ item }: { item: any }) => (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => openChatWithCompany(item)} 
    >
      <View style={styles.iconContainer}>
        <Ionicons name="business-outline" size={24} color={AppColors.primary} />
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardName}>{item.name}</Text>
       
      </View>
      <Ionicons name="chatbubble-ellipses-outline" size={22} color={AppColors.primary} />
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
        <Text style={styles.subtitle}>Choose a company to chat with</Text>
      </View>

      <FlatList
        data={companies}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={renderCompany}
        ListEmptyComponent={
          <View style={styles.loadingContainer}>
            <Text style={styles.errorText}>No companies found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}