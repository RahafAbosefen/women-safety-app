import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function CompanyDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const mockData = {
          companyName: "Hello gdhdb",
          serviceType: "Psychological Support",
          email: "ragha@gmail.com",
          phoneNumber: "05999595",
          emergencyPhone: "0599",
          companyLocation: "Ramallah",
          serviceStartTime: "4:31 AM",
          serviceEndTime: "4:00 PM",
          companyDescription: "vdvdbd يارب اخلص",
        };
        setCompany(mockData);
      } catch (error) {
        console.log("Error fetching company:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7B4DDB" />
      </View>
    );
  }

  if (!company) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Company not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* الهيدر الأزرق المنحني */}
          <View style={styles.curvedHeader}>
            <Pressable
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </Pressable>
          </View>

          {/* منطقة الصورة المرفوعة لتأتي فوق الهيدر والاسم */}
          <View style={styles.profileImageContainer}>
            <View style={styles.imagePlaceholder}>
              {company.logo ? (
                <Image source={{ uri: company.logo }} style={styles.logoImage} />
              ) : (
                <Ionicons name="business-outline" size={44} color="#7B4DDB" />
              )}
            </View>
            <Text style={styles.companyName}>{company.companyName}</Text>
            <Text style={styles.serviceType}>{company.serviceType}</Text>
          </View>

          {/* كارد المعلومات الأبيض مع الخطوط الفاصلة */}
          <View style={styles.card}>
            <InfoRow icon="mail-outline" label="EMAIL ADDRESS" value={company.email} />
            <View style={styles.divider} />

            <InfoRow icon="call-outline" label="PHONE NUMBER" value={company.phoneNumber} />
            <View style={styles.divider} />

            <InfoRow icon="alert-circle-outline" label="EMERGENCY PHONE" value={company.emergencyPhone} valueColor="#D32F2F" />
            <View style={styles.divider} />

            <InfoRow icon="location-outline" label="LOCATION" value={company.companyLocation} />
            <View style={styles.divider} />

            <InfoRow icon="time-outline" label="WORKING HOURS" value={`${company.serviceStartTime} - ${company.serviceEndTime}`} />
            <View style={styles.divider} />

            <InfoRow icon="document-text-outline" label="ABOUT COMPANY" value={company.companyDescription} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function InfoRow({ icon, label, value, valueColor }: { icon: any; label: string; value: string; valueColor?: string }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.iconWrapper}>
        <Ionicons name={icon} size={20} color="#7B4DDB" />
      </View>
      <View style={styles.infoText}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={[styles.infoValue, valueColor ? { color: valueColor } : null]}>{value || "—"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  scrollContent: { flexGrow: 1, paddingBottom: 40 },
  
  curvedHeader: {
    backgroundColor: "#204E64",
    height: 160,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },

  profileImageContainer: {
    alignItems: "center",
    marginTop: -60,
    marginBottom: 24,
  },
  imagePlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 14,
  },
  logoImage: { width: 110, height: 110, borderRadius: 55 },
  
  companyName: { fontSize: 24, fontWeight: "bold", color: "#204E64", textAlign: "center" },
  serviceType: { fontSize: 14, color: "#777", marginTop: 4, fontWeight: "500" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    marginHorizontal: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 15,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  infoRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    paddingVertical: 12 
  },
  iconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#F4F0FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  infoText: { flex: 1 },
  infoLabel: { fontSize: 11, color: "#999", fontWeight: "700", letterSpacing: 0.5 },
  infoValue: { fontSize: 15, color: "#204E64", fontWeight: "600", marginTop: 3 },
  
  divider: {
    height: 1,
    backgroundColor: "#EFEFEF",
    marginLeft: 52,
  },
});