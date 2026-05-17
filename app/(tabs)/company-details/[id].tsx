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
import { UsersService } from "@/services/UsersService"; // تأكدي أن المسار صحيح حسب مشروعكم

export default function CompanyDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        // 🟢 استدعاء البيانات الحقيقية من السيرفر
        const data = await UsersService.getUserProfile(id as string);
       console.log("🔥 Firebase Data:", data);
        setCompany(data);
      } catch (error) {
        console.log("Error fetching company:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCompany();
    }
  }, [id]);

  // ⏰ دالة ذكية لتنسيق الوقت الحقيقي وجعله مقروءاً بوضوح
  const formatTime = (timeString: string) => {
    if (!timeString) return "—";
    try {
      // إذا كان الوقت يحتوي على ثواني مثل 16:00:00، نأخذ الساعات والدقائق فقط
      const [hoursStr, minutesStr] = timeString.split(":");
      let hours = parseInt(hoursStr, 10);
      const minutes = minutesStr ? minutesStr.substring(0, 2) : "00";
      
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // الساعة 0 تتحول لـ 12
      
      return `${hours}:${minutes} ${ampm}`;
    } catch (e) {
      return timeString; // لو الصيغة غريبة يعرضها كما هي كخطة احتياطية
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="AppColors.gray" />
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

  // دمج وقت البداية والنهاية بعد التنسيق
  const workingHours = (company.serviceStartTime || company.serviceEndTime)
    ? `${formatTime(company.serviceStartTime)} - ${formatTime(company.serviceEndTime)}`
    : "—";

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

          {/* منطقة الصورة الحقيقية للبروفايل والاسم */}
          <View style={styles.profileImageContainer}>
            <View style={styles.imagePlaceholder}>
              {/* 🖼️ التعديل الأول: استقبال وعرض صورة البروفايل الحقيقية من السيرفر إذا وجدت */}
              {company.profilePicture || company.logo || company.image ? (
                <Image 
                  source={{ uri: company.profilePicture || company.logo || company.image }} 
                  style={styles.logoImage} 
                />
              ) : (
                // أيقونة احتياطية لو المستخدم مش حاطط صورة بروفايل
                <Ionicons name="business-outline" size={44} color="AppColors.gray" />
              )}
            </View>
            <Text style={styles.companyName}>{company.companyName || company.name}</Text>
            <Text style={styles.serviceType}>{company.serviceType || "Provider"}</Text>
          </View>

          {/* كارد المعلومات الأبيض مع الخطوط الفاصلة */}
          <View style={styles.card}>
            <InfoRow icon="mail-outline" label="EMAIL ADDRESS" value={company.email} />
            <View style={styles.divider} />

            <InfoRow icon="call-outline" label="PHONE NUMBER" value={company.phoneNumber} />
            <View style={styles.divider} />

            <InfoRow icon="alert-circle-outline" label="EMERGENCY PHONE" value={company.emergencyPhone} valueColor="#D32F2F" />
            <View style={styles.divider} />

            <InfoRow icon="location-outline" label="LOCATION" value={company.companyLocation || company.location} />
            <View style={styles.divider} />

            {/* ⏰ التعديل الثاني: عرض الساعات بطريقة منسقة ومقروءة */}
            <InfoRow icon="time-outline" label="WORKING HOURS" value={workingHours} />
            <View style={styles.divider} />

            <InfoRow icon="document-text-outline" label="ABOUT COMPANY" value={company.companyDescription || company.description} />
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
        <Ionicons name={icon} size={20} color="AppColors.gray" />
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