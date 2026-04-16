import React, { useState, useEffect } from "react";
import { StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { Text, Portal } from "react-native-paper";

import SOSButton from "@/components/SOSButton";
import SendingSOSModal from "@/components/SendingSOSModal";
import ResultSOSModal from "@/components/ResultSOSModal";
import { auth } from "@/services/firebaseConfig";
import { addSOSAlert } from "@/services/SOSService";
import { logout } from "@/services/AuthService";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);
  const [count, setCount] = useState(5);
  const [running, setRunning] = useState(false);

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

    requestAnimationFrame(() => {
      alert("SOS has been cancelled");
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainTitle}>Do you feel unsafe right now?</Text>
      <Text style={styles.helperText}>Hold to send SOS alert</Text>

      <SOSButton onPress={startSOS} />

      <Text style={styles.locationInfo}>
        Your location will be shared automatically
      </Text>
      <Text style={styles.safeText}>You are currently safe</Text>

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

 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: "600",
    color: "#111",
    textAlign: "center",
    marginBottom: 10,
  },
  helperText: {
    marginTop: 20,
    fontSize: 16,
    color: "#9A6A70",
  },
  locationInfo: {
    fontSize: 15,
    color: "#9A6A70",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 25,
  },
  
  safeText: {
    fontSize: 14,
    color: "#9A6A70",
    textAlign: "center",
  },
});