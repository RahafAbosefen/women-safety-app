import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
import { styles } from "@/styles/CaseStatus.styles";
import { AppColors } from "@/constants/theme";

const PROGRESS_OPTIONS = ["approved", "Accepted", "On the way", "Resolved"];
const PRIORITY_OPTIONS = ["Low", "Medium", "High"];

export default function CaseStatusScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const id = params.id as string;
  const source = params.source as "reports" | "mapReports";
  const currentStatus = params.status as string;
  const userName = params.userName as string;
  const reportType = params.reportType as string;
  const details = params.details as string;

  const [selectedProgress, setSelectedProgress] = useState(
    currentStatus || "approved"
  );
  const [selectedPriority, setSelectedPriority] = useState("Low");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleConfirm = async () => {
    try {
      if (!id || !source) {
        Alert.alert("Error", "Missing case information");
        return;
      }

      setIsUpdating(true);

      const reportRef = doc(db, source, id);

      await updateDoc(reportRef, {
        status: selectedProgress,
        priority: selectedPriority,
        updatedAt: new Date(),
      });

      router.replace("/companyTabs/CasesList" as any);
    } catch (error) {
      console.error("Update case status error:", error);
      Alert.alert("Error", "Could not update case status");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Pressable
            onPress={() => router.replace("/companyTabs/CasesList" as any)}
            style={{ marginBottom: 12 }}
          >
            <Ionicons name="arrow-back" size={28} color={AppColors.primary} />
          </Pressable>

          <Text style={styles.title}>Case Status</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>
            {userName || "Unknown user"}
          </Text>

          <Text style={[styles.radioLabel, { marginTop: 8 }]}>
            Case Type: {reportType || "Report"}
          </Text>

          <Text style={[styles.radioLabel, { marginTop: 12 }]}>
            Details: {details || "No details provided"}
          </Text>
        </View>

        <View style={styles.mapContainer}>
          <View
            style={[
              styles.map,
              {
                backgroundColor: AppColors.card,
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Ionicons name="map-outline" size={50} color={AppColors.primary} />
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Case Progress</Text>

          {PROGRESS_OPTIONS.map((option) => (
            <Pressable
              key={option}
              style={styles.radioRow}
              onPress={() => setSelectedProgress(option)}
            >
              <View
                style={[
                  styles.radioCircle,
                  selectedProgress === option && styles.radioSelected,
                ]}
              >
                {selectedProgress === option && (
                  <View style={styles.radioDot} />
                )}
              </View>

              <Text style={styles.radioLabel}>{option}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Priority Level</Text>

          <View style={{ flexDirection: "row", gap: 20 }}>
            {PRIORITY_OPTIONS.map((option) => (
              <Pressable
                key={option}
                style={styles.radioRow}
                onPress={() => setSelectedPriority(option)}
              >
                <View
                  style={[
                    styles.radioCircle,
                    selectedPriority === option && styles.radioSelected,
                  ]}
                >
                  {selectedPriority === option && (
                    <View style={styles.radioDot} />
                  )}
                </View>

                <Text style={styles.radioLabel}>{option}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.confirmButton,
            pressed && styles.confirmButtonPressed,
          ]}
          onPress={handleConfirm}
          disabled={isUpdating}
        >
          <Text style={styles.confirmButtonText}>
            {isUpdating ? "UPDATING..." : "UPDATE STATUS"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}