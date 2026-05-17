import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  Alert,
  TextInput,
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
  const [search, setSearch] = useState("");

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

const filteredCompanies = companies.filter((company) =>
  company.name.toLowerCase().includes(search.toLowerCase())
);
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
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        onPress={() =>
          router.push({
            pathname: "/userTabs/company-details/[id]" as any,
            params: { id: item.id },
          })
        }
      >
        <View style={styles.iconContainer}>
          <Ionicons
            name="business-outline"
            size={28}
            color={AppColors.primary}
          />
        </View>

        <View style={styles.cardInfo}>
          <Text numberOfLines={1} style={styles.cardName}>
            {item.name || "Company"}
          </Text>

          <Text numberOfLines={1} style={styles.cardType}>
            {item.type || "Company"}
          </Text>
        </View>

        <Pressable
          style={styles.chatButton}
          onPress={(e) => {
            e.stopPropagation();
            openChatWithCompany(item);
          }}
        >
          <Text style={styles.chatText}>Chat</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </Pressable>
      </Pressable>
    ),
    [openChatWithCompany, router]
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
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={AppColors.primary} />
        </Pressable>

        <Text style={styles.title}>Contact Us</Text>

        <Text style={styles.subtitle}>Choose a company to chat with</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={22} color="#9AA1B4" />

        <TextInput
          placeholder="Search company..."
          placeholderTextColor="#9AA1B4"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={filteredCompanies}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={renderCompany}
        ListEmptyComponent={
          <View style={styles.loadingContainer}>
            <Text style={styles.errorText}>No companies found</Text>
          </View>
        }
        ListFooterComponent={
          <View style={styles.supportCard}>
            <View style={styles.supportLeft}>
              <View style={styles.supportIcon}>
                <Ionicons name="heart-outline" size={24} color="#8B6CFF" />
              </View>

              <View>
                <Text style={styles.supportTitle}>Need help?</Text>
                <Text style={styles.supportSubtitle}>
                  We're here to support you.
                </Text>
              </View>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}