import { useEffect, useState } from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";

import { auth } from "@/services/firebaseConfig";
import { addSOSAlert } from "@/services/SOSService";
import { NotificationService } from "@/services/NotificationService";

export const useSOSAlert = () => {
  const [visible, setVisible] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);
  const [cancelVisible, setCancelVisible] = useState(false);

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

      await NotificationService.notifyUser({
        userId: user.uid,
        title: "SOS Alert Sent",
        body: "Your emergency alert was sent successfully.",
        type: "sos",
      });
    } catch (error) {
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

  return {
    visible,
    resultVisible,
    cancelVisible,
    count,
    startSOS,
    cancelSOS,
    setResultVisible,
    setCancelVisible,
  };
};