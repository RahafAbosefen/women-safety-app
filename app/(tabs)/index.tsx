import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Alert,
  Pressable,
  Image,
  View,
  ScrollView,
  Modal,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { Text, Portal } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { PlayfairDisplay_700Bold } from "@expo-google-fonts/playfair-display";
import StorageService from "@/services/StorageService";

import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  limit,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import NotificationBell from "@/components/NotificationBell";
import SOSButton from "@/components/SOSButton";
import SendingSOSModal from "@/components/SendingSOSModal";
import ResultSOSModal from "@/components/ResultSOSModal";

import { NotificationService } from "@/services/NotificationService";
import { auth, db } from "@/services/firebaseConfig";
import { addSOSAlert } from "@/services/SOSService";
import { CloudinaryService } from "@/services/CloudinaryService";
import { UsersService } from "@/services/UsersService";

import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
  });

  const [visible, setVisible] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);
  const [cancelVisible, setCancelVisible] = useState(false);

  const [count, setCount] = useState(5);
  const [running, setRunning] = useState(false);

  const [displayName, setDisplayName] = useState("User");

  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
  const loadUserName = async () => {
    try {
      const storedUser = await StorageService.getUser();

      if (!storedUser?.uid) {
        setDisplayName("User");
        return;
      }

      const firebaseData: any = await UsersService.getUserProfile(storedUser.uid);

      if (!firebaseData) {
        setDisplayName("User");
        return;
      }

      const firstName = firebaseData.firstName?.trim() || "";
      

      const fullName = `${firstName}`.trim();

      if (fullName.length > 0) {
        setDisplayName(fullName);
      } else {
        setDisplayName("User");
      }
    } catch (error) {
      console.log("Load user name error:", error);
      setDisplayName("User");
    }
  };

  loadUserName();
}, []);
  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Location permission denied");
        return null;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      return {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };
    } catch (error) {
      console.log("Location error:", error);
      return null;
    }
  };

  const sendSOSAlert = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        return;
      }

      const currentLocation = await getCurrentLocation();

      if (!currentLocation) {
        return;
      }

      await addSOSAlert({
        userId: user.uid,
        userEmail: user.email || "",
        location: currentLocation,
        createdAt: new Date(),
        status: "sent",
      });

      await NotificationService.notifyUser({
        userId: user.uid,
        title: "SOS Alert Sent",
        body: "Your emergency alert was sent successfully.",
        type: "sos",
      });
    } catch (error: any) {
      console.log("SOS Firestore error:", error);
    }
  };

  useEffect(() => {
    if (!running) return;

    if (count <= 0) {
      setVisible(false);
      setRunning(false);
      setResultVisible(true);
      sendSOSAlert();
      return;
    }

    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [running, count]);

  const startSOS = () => {
    setCount(5);
    setRunning(true);
    setVisible(true);
  };

  const cancelSOS = () => {
    setVisible(false);
    setRunning(false);
    setCancelVisible(true);
  };

  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentWrapper}>
          <View style={styles.headerRow}>
            <View style={styles.appNameWrapper}>
              <Text
                style={[
                  styles.appName,
                  fontsLoaded && {
                    fontFamily: "PlayfairDisplay_700Bold",
                  },
                ]}
              >
                AURA
              </Text>
            </View>

            <View style={styles.greetingWrapper}>
              <Text style={styles.helloText}>Hi {displayName}</Text>
              <Text style={styles.welcomeText}>We are here to support you</Text>
            </View>

            <View style={styles.notificationWrapper}>
              <NotificationBell />
            </View>
          </View>

          <View style={styles.safeCard}>
            <View style={styles.safeIcon}>
              <Ionicons
                name="shield-checkmark-outline"
                size={31}
                color="#204E64"
              />
            </View>

            <View style={styles.safeTextWrapper}>
              <Text style={styles.safeCardTitle}>You’re safe here</Text>
              <Text style={styles.safeCardSubtitle}>
                Your reports, chats, and emergency alerts stay private and
                protected.
              </Text>
            </View>
          </View>

          <View style={styles.sosSection}>
            <Text style={styles.mainTitle}> Do you need help now?</Text>

            <Text style={styles.helperText}>
              Hold the SOS button to alert your trusted support.
            </Text>

            <View style={styles.sosGlowWrapper}>
              <SOSButton onPress={startSOS} />
            </View>

            <Text style={styles.locationInfo}>
              Your location will be shared automatically with your alert.
            </Text>

          </View>

          <View style={styles.supportSection}>
            <Text style={styles.sectionTitle}>Need support?</Text>

            <Pressable
              onPress={() => router.push("/contact-us")}
              style={({ pressed }) => [
                styles.organizationCard,
                pressed && styles.pressed,
              ]}
            >
              <View style={styles.organizationIcon}>
                <Ionicons name="business-outline" size={26} color="#204E64" />
              </View>

              <View style={styles.cardTextWrapper}>
                <Text style={styles.cardTitle}>Contact Organizations</Text>
                <Text style={styles.cardSubtitle}>
                  Connect with trusted organizations when you need support.
                </Text>
              </View>

              <Ionicons name="chevron-forward" size={22} color="#B8C7CF" />
            </Pressable>

            

          </View>
        </View>
      </ScrollView>

      <Portal>
        <SendingSOSModal
          visible={visible}
          count={count}
          onCancel={cancelSOS}
        />

        <ResultSOSModal
          visible={resultVisible}
          onDismiss={() => setResultVisible(false)}
        />
      </Portal>

      <Modal transparent visible={cancelVisible} animationType="fade">
        <View style={styles.cancelOverlay}>
          <View style={styles.cancelCard}>
            <View style={styles.cancelIconCircle}>
              <Ionicons
                name="checkmark-circle-outline"
                size={46}
                color="#2E7D64"
              />
            </View>

            <Text style={styles.cancelTitle}>SOS Cancelled</Text>

            <Text style={styles.cancelMessage}>
              Your emergency alert was cancelled successfully. No alert has been
              sent.
            </Text>

            <Pressable
              style={({ pressed }) => [
                styles.cancelOkButton,
                pressed && styles.pressed,
              ]}
              onPress={() => setCancelVisible(false)}
            >
              <Text style={styles.cancelOkText}>Okay</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 120,
    alignItems: "center",
  },
  contentWrapper: {
    width: "100%",
    maxWidth: 430,
  },

  headerRow: {
    width: "100%",
    minHeight: 152,
   
    marginBottom: 22,
    position: "relative",
    justifyContent: "center",
  },
  appNameWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  appName: {
    fontSize: 43,
    color: "#204E64",
    letterSpacing: 4,
    textAlign: "center",
  },
  greetingWrapper: {
    alignSelf: "flex-end",
  
    paddingRight: 100,
    maxWidth: "100%",
  },
  helloText: {
    fontSize:15,
    color: "#536c78",
    fontWeight: "600",
    
    marginBottom: 5,
  },
  welcomeText: {
    fontSize: 19,
    color: "#6d2a2a",
    fontWeight: "900",
    
    letterSpacing: -0.4,
    lineHeight: 29,
  },
  notificationWrapper: {
    position: "absolute",
    right: 0,
    top: 0,
  },

  safeCard: {
    backgroundColor: "#EAF2F5",
    borderRadius: 24,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "#D8E8EE",
    elevation: 1,
  },
  safeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  safeTextWrapper: {
    flex: 1,
  },
  safeCardTitle: {
    fontSize: 18,
    color: "#204E64",
    fontWeight: "900",
    marginBottom: 4,
  },
  safeCardSubtitle: {
    fontSize: 13,
    color: "#4F6B79",
    lineHeight: 19,
  },

  sosSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  mainTitle: {
    fontSize: 25,
    fontWeight: "900",
    color: "#111827",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: -0.4,
  },
  helperText: {
    fontSize: 15,
    color: "#7B5B61",
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 22,
    paddingHorizontal: 14,
  },
  sosGlowWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  locationInfo: {
    fontSize: 14,
    color: "#8A6870",
    textAlign: "center",
    marginTop: 24,
    lineHeight: 20,
    paddingHorizontal: 18,
  },
  statusPill: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#EAF7F0",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#CDEBDD",
  },
 

  supportSection: {
    width: "100%",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 14,
    letterSpacing: -0.3,
  },
  organizationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#EEF2F5",
    elevation: 2,
  },
  caseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEF2F5",
    elevation: 2,
  },
  organizationIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#EAF2F5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  caseIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#F2F4FA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cardTextWrapper: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    color: "#204E64",
    fontWeight: "900",
    marginBottom: 3,
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 18,
  },

  cancelOverlay: {
    flex: 1,
    backgroundColor: "rgba(17, 24, 39, 0.38)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  cancelCard: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEF2F5",
    elevation: 10,
  },
  cancelIconCircle: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: "#EAF7F0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#CDEBDD",
  },
  cancelTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#204E64",
    marginBottom: 8,
    textAlign: "center",
  },
  cancelMessage: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 22,
  },
  cancelOkButton: {
    width: "100%",
    backgroundColor: "#204E64",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  cancelOkText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.99 }],
  },
  uploadedImage: {
    width: "100%",
    height: 180,
    borderRadius: 18,
    marginTop: 12,
    marginBottom: 12,
  },
});