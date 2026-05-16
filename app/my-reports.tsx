import {
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useMyReports } from "@/hooks/useMyReports";
import { ReportCard } from "@/components/report-card";
import { styles } from "@/styles/myReports.styles";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function MyReportsScreen() {
  const { data, isLoading, error } = useMyReports();
  const router = useRouter();

  const isEmpty = !isLoading && !error && data?.length === 0;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Pressable style={styles.backBtn} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={20} color="#0f172a" />
            </Pressable>
            <Text style={styles.title}>My Reports</Text>
          </View>
        </View>

        {isLoading && (
          <View style={styles.stateBox}>
            <ActivityIndicator size="large" color="#2563eb" />
            <Text style={styles.stateText}>Loading your reports...</Text>
          </View>
        )}

        {error && (
          <View style={styles.stateBox}>
            <Ionicons name="alert-circle-outline" size={40} color="red" />
            <Text style={[styles.stateText, { color: "red" }]}>
              Something went wrong
            </Text>
          </View>
        )}

        {isEmpty && (
          <View style={styles.stateBox}>
            <Ionicons name="folder-open-outline" size={42} color="#94a3b8" />
            <Text style={styles.stateText}>No reports yet</Text>
            <Text style={styles.subText}>
              Your submitted reports will appear here
            </Text>
          </View>
        )}

        {!isLoading &&
          !error &&
          data?.map((report: any) => (
            <ReportCard
              key={report.id}
              id={report.id}
              reportType={report.reportType}
              details={report.details}
              source={report.source}
            />
          ))}
      </ScrollView>
    </>
  );
}
