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
import { archiveCasesStyles } from "@/styles/ArchiveCases.styles";
import { AppColors } from "@/constants/theme";

type Case = {
  id: string;
  source: "reports" | "mapReports";
  userName: string;
  status: string;
  reportType: string;
  details: string;
};

export default function ArchiveCasesScreen() {
  const router = useRouter();
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArchivedCases = async () => {
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
          status: data.status || "",
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
          status: data.status || "",
          reportType: data.reportType || "Map Report",
          details: data.details || "",
        };
      });

      const archivedCases = [...reports, ...mapReports].filter(
        (item) => item.status === "Resolved"
      );

      setCases(archivedCases);
    } catch (error) {
      console.error("Fetch archived cases error:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchArchivedCases();
    }, [])
  );

  const renderCase = useCallback(
    ({ item }: { item: Case }) => (
      <Pressable
        style={({ pressed }) => [
          styles.card,
          archiveCasesStyles.archiveCard,
          pressed && styles.cardPressed,
        ]}
      >
        <View style={styles.iconContainer}>
          <Ionicons
            name="person-outline"
            size={26}
            color={AppColors.primary}
          />
        </View>

        <View style={styles.cardInfo}>
          <Text style={[styles.cardName, archiveCasesStyles.archiveName]}>
            {item.userName}
          </Text>

          <View style={archiveCasesStyles.reportTag}>
            <Text style={archiveCasesStyles.reportTagText}>
              {item.reportType}
            </Text>
          </View>

          <View style={archiveCasesStyles.resolvedRow}>
            <Ionicons
              name="checkmark-circle-outline"
              size={18}
              color="#34A853"
            />

            <Text style={archiveCasesStyles.resolvedText}>Resolved</Text>
          </View>
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
                fromArchive: "true",
              },
            } as any)
          }
          style={archiveCasesStyles.detailsButton}
        >
          <Text style={archiveCasesStyles.detailsButtonText}>Details →</Text>
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
      <View style={archiveCasesStyles.headerContainer}>
        <View style={archiveCasesStyles.headerRow}>
          <Pressable
            onPress={() => router.replace("/companyTabs/CasesList" as any)}
          >
            <Ionicons name="arrow-back" size={28} color={AppColors.primary} />
          </Pressable>

          <Text style={styles.title}>Archive</Text>
        </View>

        <Text style={styles.subtitle}>Resolved cases</Text>
      </View>

      <FlatList
        data={cases}
        keyExtractor={(item) => `${item.source}-${item.id}`}
        contentContainerStyle={styles.listContent}
        renderItem={renderCase}
        ListEmptyComponent={
          <View style={styles.loadingContainer}>
            <Text style={styles.errorText}>No archived cases found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}