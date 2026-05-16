import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import {
  ScrollView,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useReportDetails } from "@/hooks/useReportDetails";
import { styles } from "@/styles/report.styles";
import { AppColors } from "@/constants/theme";

export default function ReportDetailsScreen() {
  const { id, source } = useLocalSearchParams();
  const router = useRouter();

  const { report, loading, playAudio, isPlaying, stopAudio } = useReportDetails(
    String(id),
    String(source),
  );
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={AppColors.primary} />
          <Text style={styles.loadingText}>Loading report...</Text>
        </View>
      ) : !report ? (
        <View style={styles.center}>
          <Ionicons name="alert-circle-outline" size={40} color="red" />
          <Text style={styles.loadingText}>Report not found</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <Pressable
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <Ionicons name="arrow-back" size={22} color="#fff" />
              </Pressable>
            </View>

            <View style={styles.headerContent}>
              <View style={styles.iconContainer}>
                <Ionicons name="document-text-outline" size={28} color="#fff" />
              </View>

              <View>
                <Text style={styles.reportType}>{report.reportType}</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Details</Text>
            <Text style={styles.description}>{report.details}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Location</Text>

            {report.location ? (
              <Text style={styles.locationText}>
                📍 {report.location.latitude}, {report.location.longitude}
              </Text>
            ) : (
              <Text style={styles.emptyText}>No location available</Text>
            )}
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Images</Text>

            {report.imageUrls?.length ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {report.imageUrls.map((img: string, i: number) => (
                  <Image key={i} source={{ uri: img }} style={styles.image} />
                ))}
              </ScrollView>
            ) : (
              <Text style={styles.emptyText}>No images available</Text>
            )}
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Audio</Text>

            {report.audioUrl ? (
              <View style={styles.audioCard}>
                <View style={styles.audioInfo}>
                  <Ionicons
                    name="musical-notes-outline"
                    size={22}
                    color="#204E64"
                  />
                  <Text style={styles.audioText}>Audio recorded</Text>
                </View>

                <View style={styles.actions}>
                  <Pressable
                    style={styles.playButton}
                    onPress={() => (isPlaying ? stopAudio() : playAudio())}
                  >
                    <Ionicons
                      name={isPlaying ? "pause-outline" : "play-outline"}
                      size={20}
                      color="#fff"
                    />
                  </Pressable>
                </View>
              </View>
            ) : (
              <Text style={styles.emptyText}>No audio attached</Text>
            )}
          </View>
        </ScrollView>
      )}
    </>
  );
}
