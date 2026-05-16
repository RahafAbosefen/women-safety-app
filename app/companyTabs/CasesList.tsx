import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
import { styles } from "@/styles/ContactUs.styles";
import { AppColors } from "@/constants/theme";

type Case = {
  id: string;
  source: "reports" | "mapReports";
  userName: string;
  status: string;
  reportType: string;
  details: string;
};

export default function CasesListScreen() {
  const router = useRouter();
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCases = async () => {
    try {
      setLoading(true);

      const [reportsSnapshot, mapReportsSnapshot] = await Promise.all([
        getDocs(collection(db, "reports")),
        getDocs(collection(db, "mapReports")),
      ]);

      const reports = reportsSnapshot.docs.map((document) => {
        const data: any = document.data();

        return {
          id: document.id,
          source: "reports" as const,
          userName: data.userName || data.userEmail || "Unknown user",
          status: data.status || "approved",
          reportType: data.reportType || "Report",
          details: data.details || "",
        };
      });

      const mapReports = mapReportsSnapshot.docs.map((document) => {
        const data: any = document.data();

        return {
          id: document.id,
          source: "mapReports" as const,
          userName: data.userName || data.userEmail || "Unknown user",
          status: data.status || "approved",
          reportType: data.reportType || "Map Report",
          details: data.details || "",
        };
      });

      const activeCases = [...reports, ...mapReports].filter(
        (item) => item.status !== "pending" && item.status !== "rejected"
      );

      setCases(activeCases);
    } catch (error) {
      console.error("Fetch cases error:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCases();
    }, [])
  );

  const renderCase = useCallback(
    ({ item }: { item: Case }) => (
      <Pressable
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      >
        <View style={styles.iconContainer}>
          <Ionicons name="person-outline" size={24} color={AppColors.primary} />
        </View>

        <View style={styles.cardInfo}>
          <Text style={styles.cardName}>{item.userName}</Text>
          <Text style={styles.cardType}>
            {item.reportType} • {item.status}
          </Text>
        </View>

        <Pressable
          onPress={() =>
            router.push({
              pathname: "/companyTabs/case-status",
              params: {
                id: item.id,
                source: item.source,
                status: item.status,
                userName: item.userName,
                reportType: item.reportType,
                details: item.details,
              },
            } as any)
          }
          style={{
            backgroundColor: AppColors.primary,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>View</Text>
        </Pressable>
      </Pressable>
    ),
    [router]
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={AppColors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.replace("/companyTabs/users-management" as any)}
          style={{ marginBottom: 12 }}
        >
          <Ionicons name="arrow-back" size={28} color={AppColors.primary} />
        </Pressable>

        <Text style={styles.title}>Cases</Text>
        <Text style={styles.subtitle}>Manage active cases</Text>
      </View>

      <FlatList
        data={cases}
        keyExtractor={(item) => `${item.source}-${item.id}`}
        contentContainerStyle={styles.listContent}
        renderItem={renderCase}
        ListEmptyComponent={
          <View style={styles.loadingContainer}>
            <Text style={styles.errorText}>No cases found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}