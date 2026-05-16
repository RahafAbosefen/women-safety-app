import { useLocalSearchParams, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { UsersService } from "@/services/UsersService";

export default function CompanyDetails() {
  const { id } = useLocalSearchParams();
  const [company, setCompany] = useState<any>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      if (typeof id === "string") {
        const data = await UsersService.getUserProfile(id);
        setCompany(data);
      }
    };

    fetchCompany();
  }, [id]);

  if (!company) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: company.companyName || "Company Details" }} />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{company.companyName}</Text>
        <Text style={styles.item}>Email: {company.email}</Text>
        <Text style={styles.item}>Phone: {company.phoneNumber}</Text>
        <Text style={styles.item}>Emergency Phone: {company.emergencyPhone}</Text>
        <Text style={styles.item}>Location: {company.companyLocation}</Text>
        <Text style={styles.item}>Service Type: {company.serviceType}</Text>
        <Text style={styles.item}>Start Time: {company.serviceStartTime}</Text>
        <Text style={styles.item}>End Time: {company.serviceEndTime}</Text>
        <Text style={styles.description}>{company.companyDescription}</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2D2340",
    marginBottom: 20,
  },
  item: {
    fontSize: 16,
    color: "#4B4560",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#2D2340",
    marginTop: 12,
    lineHeight: 24,
  },
});