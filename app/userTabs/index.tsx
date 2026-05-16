import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Pressable,
  View,
  ScrollView,
  Modal,
  StatusBar,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Portal } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { PlayfairDisplay_700Bold } from "@expo-google-fonts/playfair-display";

import StorageService from "@/services/StorageService";
import { UsersService } from "@/services/UsersService";

import NotificationBell from "@/components/NotificationBell";
import SOSButton from "@/components/SOS/SOSButton";
import SendingSOSModal from "@/components/SOS/SendingSOSModal";
import ResultSOSModal from "@/components/SOS/ResultSOSModal";

import { useSOSAlert } from "@/hooks/useSOSAlert";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
  });

  const {
    visible,
    resultVisible,
    cancelVisible,
    count,
    startSOS,
    cancelSOS,
    setResultVisible,
    setCancelVisible,
  } = useSOSAlert();

  const [displayName, setDisplayName] = useState("User");

  useEffect(() => {
    const loadUserName = async () => {
      try {
        const storedUser = await StorageService.getUser();

        if (!storedUser?.uid) {
          setDisplayName("User");
          return;
        }

        const firebaseData: any = await UsersService.getUserProfile(
          storedUser.uid
        );

        if (!firebaseData) {
          setDisplayName("User");
          return;
        }

        const firstName = firebaseData.firstName?.trim() || "";
        const fullName = `${firstName}`.trim();

        setDisplayName(fullName.length > 0 ? fullName : "User");
      } catch (error) {
        console.log("Load user name error:", error);
        setDisplayName("User");
      }
    };

    loadUserName();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          {/* <View style={styles.heroCircleOne} />
          <View style={styles.heroCircleTwo} />
          <View style={styles.heroLeafOne} />
          <View style={styles.heroLeafTwo} />
           <View style={styles.heroDotOne} />
          <View style={styles.heroDotTwo} />  */}

          <View style={styles.heroTopRow}>
            <View style={styles.brandWrapper}>
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

              <Text style={styles.helloText}>
                Hi {displayName} <Text style={styles.heart}>♥</Text>
              </Text>
            </View>

            <View style={styles.notificationWrapper}>
              <NotificationBell />
            </View>
          </View>
        </View>

        <View style={styles.safeCard}>
          <View style={styles.safeIconGlow}>
            <View style={styles.safeIcon}>
              <Ionicons name="shield-checkmark" size={38} color="#FFFFFF" />
            </View>
          </View>

          <View style={styles.safeTextWrapper}>
            <Text style={styles.safeCardTitle}>You’re safe here</Text>
            <Text style={styles.safeCardSubtitle}>
              AURA is here to support you and keep you protected.
            </Text>
          </View>
        </View>

        <View style={styles.sosSection}>
          <Text style={styles.mainTitle}>Do you need help now?</Text>

          <Text style={styles.helperText}>
            Hold the SOS button to alert trusted support.
          </Text>

          <View style={styles.sosOuterGlow}>
            <View style={styles.sosMiddleGlow}>
              <View style={styles.sosInnerGlow}>
                <SOSButton onPress={startSOS} />
              </View>
            </View>
          </View>

          <View style={styles.locationPill}>
            <View style={styles.locationIcon}>
              <Ionicons name="location" size={20} color="#D56D7A" />
            </View>

            <Text style={styles.locationText}>
              Your location will be shared automatically during an alert.
            </Text>
          </View>
        </View>

        <View style={styles.supportSection}>
          <Text style={styles.sectionTitle}>Need support?</Text>

          <Pressable
            onPress={() => router.push("/userTabs/contact-us" as any)}
            style={({ pressed }) => [
              styles.organizationCard,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.organizationIcon}>
              <Ionicons name="business-outline" size={27} color="#204E64" />
            </View>

            <View style={styles.cardTextWrapper}>
              <Text style={styles.cardTitle}>Contact Organizations</Text>
              <Text style={styles.cardSubtitle}>
                Connect with trusted organizations when you need support.
              </Text>
            </View>

            <View style={styles.arrowCircle}>
              <Ionicons name="chevron-forward" size={20} color="#204E64" />
            </View>
          </Pressable>
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
       <Modal transparent visible={cancelVisible} animationType="fade" statusBarTranslucent>
         <StatusBar backgroundColor="rgba(17, 24, 39, 0.42)" translucent />
        <View style={styles.cancelOverlay}>
          <View style={styles.cancelCard}>
           
            <Ionicons
              name="close-circle-outline"
              size={50}
               color="#D94343"
            />
            

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
    backgroundColor: "#F8F4F3",
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 120,
  },

  hero: {
    minHeight: 200,
    backgroundColor: "#063747",
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    paddingHorizontal: 24,
    paddingTop: 34,
    overflow: "hidden",
  },

  heroCircleOne: {
    position: "absolute",
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: "rgba(255,255,255,0.07)",
    right: -55,
    top: -25,
  },

  heroCircleTwo: {
    position: "absolute",
    width: 155,
    height: 155,
    borderRadius: 78,
    backgroundColor: "rgba(255,255,255,0.10)",
    left: -64,
    bottom: 25,
  },

  heroLeafOne: {
    position: "absolute",
    right: 34,
    bottom: 92,
    width: 116,
    height: 38,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.09)",
    transform: [{ rotate: "-31deg" }],
  },

  heroLeafTwo: {
    position: "absolute",
    right: 76,
    bottom: 76,
    width: 118,
    height: 42,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.08)",
    transform: [{ rotate: "-28deg" }],
  },

  heroDotOne: {
    position: "absolute",
    top: 150,
    right: 226,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "rgba(255,255,255,0.5)",
  },

  heroDotTwo: {
    position: "absolute",
    top: 112,
    right: 198,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.55)",
  },

heroTopRow: {
  position: "relative",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
},

  brandWrapper: {
  width: "100%",
  
  alignItems: "center",
},
appName: {
  fontSize: 58,
  color: "#F4C9CF",
  letterSpacing: 5,
  textAlign: "center",
},
 helloText: {
  alignSelf: "flex-start",
  marginTop: 10,
  color: "#FFFFFF",
  fontSize: 25,
  fontWeight: "900",
},

  heart: {
    color: "#c4a8ad",
  },

 notificationWrapper: {
  position: "absolute",
  right: 0,
  top: 18,

},
  safeCard: {
    marginHorizontal: 30,
    marginTop: -30,
    backgroundColor: "#ffefef",
    borderRadius: 26,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8D8D6",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 16,
    zIndex: 20,
  },

  safeIconGlow: {
    width: 70,
    height: 70,
    borderRadius: 39,
    backgroundColor: "#FDE4E6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  safeIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: "#f7b7be",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#D96673",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    transform: [{ rotate: "-6deg" }],
  },

  safeTextWrapper: {
    flex: 1,
  },

  safeCardTitle: {
    color: "#204E64",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 5,
  },

  safeCardSubtitle: {
    color: "#6B7D86",
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "600",
  },

  sosSection: {
    marginHorizontal: 18,
    marginTop: 30,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 8,
  },

  mainTitle: {
    fontSize: 31,
    fontWeight: "900",
    color: "#204E64",
    textAlign: "center",
    marginBottom: 10,
  },

  helperText: {
    color: "#8A6870",
    fontSize: 18,
    textAlign: "center",
    lineHeight: 25,
    marginBottom: 28,
    paddingHorizontal: 14,
  },

  sosOuterGlow: {
    width: 245,
    height: 245,
    borderRadius: 123,
    backgroundColor: "rgba(244, 171, 180, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },

  sosMiddleGlow: {
    width: 202,
    height: 202,
    borderRadius: 101,
    backgroundColor: "rgba(244, 171, 180, 0.21)",
    alignItems: "center",
    justifyContent: "center",
  },

  sosInnerGlow: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(244, 171, 180, 0.34)",
    alignItems: "center",
    justifyContent: "center",
  },

  locationPill: {
    marginTop: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F3D8DC",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },

  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FDE6E9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  locationText: {
    flex: 1,
    color: "#8A6870",
    fontSize: 12.5,
    lineHeight: 18,
    fontWeight: "700",
  },

  supportSection: {
    marginTop: 22,
    paddingHorizontal: 18,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#204E64",
    marginBottom: 12,
  },

  organizationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F0E2DF",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },

  organizationIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#EAF2F5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  cardTextWrapper: {
    flex: 1,
  },

  cardTitle: {
    color: "#204E64",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 3,
  },

  cardSubtitle: {
    color: "#64748B",
    fontSize: 13,
    lineHeight: 18,
  },

  arrowCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F1F6F8",
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: "#fafafa",
    borderRadius: 26,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEF2F5",
    elevation: 10,
  },

  // cancelIconCircle: {
  //   width: 78,
  //   height: 78,
  //   borderRadius: 39,
  //   backgroundColor: "#ffdcdc",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginBottom: 16,
  //   borderWidth: 1,
  //   borderColor: "#ffffff",
  // },

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
    opacity: 0.78,
    transform: [{ scale: 0.99 }],
  },
});