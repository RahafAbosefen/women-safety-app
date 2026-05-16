import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ChatService } from "@/services/ChatService";
import { auth } from "@/services/firebaseConfig";
import { styles } from "@/styles/ContactUs.styles";
import { AppColors } from "@/constants/theme";
import * as SQLite from "expo-sqlite";
import NetInfo from "@react-native-community/netinfo";
import { useCompanies } from "@/hooks/useCompanies";

type Company = {
  id: string;
  name: string;
  type: string;
  phone: string;
  email: string;
};

export default function ContactUsScreen() {
  const router = useRouter();
  const { companies: onlineCompanies, isLoading, isError } = useCompanies();

  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    let cancelled = false;

    const initDatabase = async () => {
      const database = await SQLite.openDatabaseAsync("companies.db");

      await database.execAsync(`
        CREATE TABLE IF NOT EXISTS companies (
          id TEXT PRIMARY KEY,
          name TEXT,
          type TEXT,
          phone TEXT,
          email TEXT
        );
      `);

      if (!cancelled) {
        setDb(database);
      }
    };

    initDatabase();

    return () => {
      cancelled = true;
    };
  }, []);

  const reload = useCallback(async () => {
    if (!db) return;

    const rows = await db.getAllAsync<Company>("SELECT * FROM companies;");
    setCompanies(rows);
  }, [db]);

  useEffect(() => {
    reload();
  }, [reload]);

  useEffect(() => {
    if (!db || !onlineCompanies) return;

    const saveCompaniesToSQLite = async () => {
      await db.execAsync(`DELETE FROM companies;`);

      for (const company of onlineCompanies) {
        await db.runAsync(
          `INSERT OR REPLACE INTO companies 
          (id, name, type, phone, email) 
          VALUES (?, ?, ?, ?, ?);`,
          String(company.id),
          String(company.name || ""),
          String(company.type || ""),
          String(company.phone || ""),
          String(company.email || "")
        );
      }

      await reload();
    };

    saveCompaniesToSQLite();
  }, [db, onlineCompanies, reload]);

  const openChatWithCompany = useCallback(
    async (company: Company) => {
      try {
        const user = auth.currentUser;

        if (!user) {
          Alert.alert("Error", "User not logged in");
          return;
        }

        const networkState = await NetInfo.fetch();

        if (!networkState.isConnected) {
          Alert.alert(
            "No Internet Connection",
            "Companies are available offline, but chat needs internet connection."
          );
          return;
        }

        const chatId = await ChatService.getOrCreateChat({
          victimId: user.uid,
          organizationId: company.id,
          organizationName: company.name || "Company",
        });

        router.push({
          pathname: "/chat/[chatId]",
          params: {
            chatId,
            title: company.name || "Company",
          },
        });
      } catch (error: any) {
        console.error("Open chat error:", error);
        Alert.alert("Error", error.message ?? "Could not open chat");
      }
    },
    [router]
  );

  const renderCompany = useCallback(
    ({ item }: { item: Company }) => (
      <Pressable
        style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}
        onPress={() => openChatWithCompany(item)}
      >
        <View style={styles.iconContainer}>
          <Ionicons
            name="business-outline"
            size={24}
            color={AppColors.primary}
          />
        </View>

        <View style={styles.cardInfo}>
          <Text style={styles.cardName}>{item.name}</Text>
          <Text style={styles.cardType}>{item.type}</Text>
        </View>

        <Ionicons
          name="chatbubble-ellipses-outline"
          size={22}
          color={AppColors.primary}
        />
      </Pressable>
    ),
    [openChatWithCompany]
  );

  if (isLoading && companies.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={AppColors.primary} />
      </View>
    );
  }

  if (isError && companies.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Something went wrong</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>

        <Pressable
          onPress={() => router.back()}
          style={{ marginBottom: 15 }}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color={AppColors.primary}
          />
        </Pressable>

        <Text style={styles.title}>Contact Us</Text>

        <Text style={styles.subtitle}>
          Choose a company to chat with
        </Text>

      </View>

      <FlatList
        data={companies}
        keyExtractor={(item) => item.id}
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