import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
   Pressable
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { UsersService } from "@/services/UsersService";

export default function CompanyDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const data = await UsersService.getUserProfile(id as string);
        setCompany(data);
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
    <SafeAreaView style={styles.container}>

<Pressable 
  onPress={() => router.push("/userTabs/contact-us" as any)} 
  style={styles.backButton}
>     <Ionicons name="arrow-back" size={24} color="#204E64" />
      </Pressable>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.imagePlaceholder}>
            <Ionicons name="business-outline" size={40} color="#7B4DDB" />
          </View>
          <Text style={styles.companyName}>{company.companyName}</Text>
          <Text style={styles.serviceType}>{company.serviceType}</Text>
        </View>

        <View style={styles.card}>
          <InfoRow icon="mail-outline" label="Email" value={company.email} />
          <InfoRow icon="call-outline" label="Phone" value={company.phoneNumber} />
          <InfoRow icon="alert-circle-outline" label="Emergency" value={company.emergencyPhone} />
          <InfoRow icon="location-outline" label="Location" value={company.companyLocation} />
          <InfoRow icon="time-outline" label="Working Hours" value={`${company.serviceStartTime} - ${company.serviceEndTime}`} />
          <InfoRow icon="document-text-outline" label="Description" value={company.companyDescription} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={20} color="#7B4DDB" />
      <View style={styles.infoText}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value || "—"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  backButton: { padding: 16 },
  content: { padding: 20, paddingBottom: 100 },
  header: { alignItems: "center", marginBottom: 24 },
  imagePlaceholder: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: "#F4F0FF",
    justifyContent: "center", alignItems: "center",
    marginBottom: 12,
  },
  companyName: { fontSize: 24, fontWeight: "bold", color: "#204E64" },
  serviceType: { fontSize: 14, color: "#888", marginTop: 4 },
  card: {
    backgroundColor: "#F9F9F9", borderRadius: 20,
    padding: 16, gap: 16,
  },
  infoRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  infoText: { flex: 1 },
  infoLabel: { fontSize: 12, color: "#888" },
  infoValue: { fontSize: 15, color: "#204E64", fontWeight: "600" },
});