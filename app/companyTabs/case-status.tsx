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

  const fromArchive = params.fromArchive as string;

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

  const backPath =
    fromArchive === "true"
      ? "/companyTabs/archive-cases"
      : "/companyTabs/CasesList";

  const getReportTagStyle = () => {
    if (reportType === "Harassment") {
      return {
        backgroundColor: "#F3F0FF",
        color: "#6D5BD0",
      };
    }

    if (reportType === "Physical violence") {
      return {
        backgroundColor: "#FFE7EA",
        color: "#C2414B",
      };
    }

    return {
      backgroundColor: "#FFF0E2",
      color: "#B85C00",
    };
  };

  const tagStyle = getReportTagStyle();

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

      router.replace(backPath as any);
    } catch (error) {
      console.error("Update case status error:", error);
      Alert.alert("Error", "Could not update case status");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable onPress={() => router.replace(backPath as any)}>
            <Ionicons
              name="arrow-back"
              size={30}
              color={AppColors.primary}
            />
          </Pressable>

          <Text style={styles.title}>Case Status</Text>
        </View>

        <View style={styles.userCard}>
          <View style={styles.userRow}>
            <View style={styles.profileIconBox}>
              <Ionicons
                name="person-outline"
                size={34}
                color={AppColors.primary}
              />
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.userName}>
                {userName || "Unknown user"}
              </Text>

              <View
                style={[
                  styles.reportTag,
                  {
                    backgroundColor: tagStyle.backgroundColor,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.reportTagText,
                    {
                      color: tagStyle.color,
                    },
                  ]}
                >
                  {reportType || "Report"}
                </Text>
              </View>

              <View style={styles.statusRow}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={18}
                  color="#34A853"
                />

                <Text style={styles.statusText}>
                  {selectedProgress}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.detailsBox}>
            <Text style={styles.detailsTitle}>
              Details
            </Text>

            <Text style={styles.detailsText}>
              {details || "No details provided"}
            </Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>
            Case Progress
          </Text>

          {PROGRESS_OPTIONS.map((option) => (
            <Pressable
              key={option}
              style={styles.progressRow}
              onPress={() => setSelectedProgress(option)}
            >
              <View
                style={[
                  styles.radioCircle,
                  selectedProgress === option &&
                    styles.radioSelected,
                ]}
              >
                {selectedProgress === option && (
                  <View style={styles.radioDot} />
                )}
              </View>

              <Text style={styles.progressText}>
                {option}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>
            Priority Level
          </Text>

          <View style={styles.priorityContainer}>
            {PRIORITY_OPTIONS.map((option) => (
              <Pressable
                key={option}
                onPress={() => setSelectedPriority(option)}
                style={styles.priorityItem}
              >
                <View
                  style={[
                    styles.radioCircle,
                    selectedPriority === option &&
                      styles.radioSelected,
                  ]}
                >
                  {selectedPriority === option && (
                    <View style={styles.radioDot} />
                  )}
                </View>

                <Text style={styles.priorityText}>
                  {option}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Pressable
          style={styles.updateButton}
          onPress={handleConfirm}
          disabled={isUpdating}
        >
          <Text style={styles.updateButtonText}>
            {isUpdating ? "UPDATING..." : "UPDATE STATUS"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}