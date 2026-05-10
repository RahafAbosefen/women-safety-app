import React, { useState, useCallback } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/CaseStatus.styles";
import { AppColors } from "@/constants/theme";

const PROGRESS_OPTIONS = ["Reported", "Accepted", "On the way", "Resolved"];
const PRIORITY_OPTIONS = ["Low", "Medium", "High"];

export default function CaseStatusScreen() {
  const router = useRouter();
  const [selectedProgress, setSelectedProgress] = useState("Reported");
  const [selectedPriority, setSelectedPriority] = useState("Low");
  const [submitted, setSubmitted] = useState(false);

  const handleConfirm = useCallback(() => {
    setSubmitted(true);
  }, []);

  if (submitted) {
    return (
      <SafeAreaView style={styles.successContainer}>
        <View style={styles.successCircle}>
          <Ionicons name="checkmark" size={60} color={AppColors.primary} />
        </View>
        <Text style={styles.successText}>Status Update Successfully</Text>
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.confirmButtonPressed,
          ]}
        onPress={() => {
  setSubmitted(false);
  router.back();
}}
        >
          <Text style={styles.backButtonText}>Back To Dashboard</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Case Status</Text>
        </View>

        <View style={styles.mapContainer}>
          <View style={[styles.map, { backgroundColor: AppColors.card, justifyContent: "center", alignItems: "center" }]}>
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
              <View style={[styles.radioCircle, selectedProgress === option && styles.radioSelected]}>
                {selectedProgress === option && <View style={styles.radioDot} />}
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
                <View style={[styles.radioCircle, selectedPriority === option && styles.radioSelected]}>
                  {selectedPriority === option && <View style={styles.radioDot} />}
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
        >
          <Text style={styles.confirmButtonText}>CONFIRM STATUS</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}