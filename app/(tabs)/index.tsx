import React, { useState, useEffect } from "react";
import { StyleSheet, Alert, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { Text, Portal } from "react-native-paper";

import SOSButton from "@/components/SOSButton";
import SendingSOSModal from "@/components/SendingSOSModal";
import ResultSOSModal from "@/components/ResultSOSModal";
import { auth } from "@/services/firebaseConfig";
import { addSOSAlert } from "@/services/SOSService";
import { useRouter } from "expo-router";
import { CloudinaryService } from "@/services/CloudinaryService";

export default function HomeScreen() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);
  const [count, setCount] = useState(5);
  const [running, setRunning] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

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
{/* for test */}
  const pickAndUploadImage = async () => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Camera roll permission is required");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled) {
      setUploading(true);
      const imageUri = result.assets[0].uri;
      const url = await CloudinaryService.uploadImage(imageUri);
      setUploadedImageUrl(url);
      Alert.alert("Success", "Image uploaded successfully!");
    }
  } catch (error) {
    console.log("Upload error:", error);
    Alert.alert("Error", "Failed to upload image");
  } finally {
    setUploading(false);
  }
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
{/* for test */}
<Pressable
  onPress={pickAndUploadImage}
  style={({ pressed }) => [styles.uploadButton, pressed && { opacity: 0.7 }]}
  disabled={uploading}
>
  <Text style={styles.uploadButtonText}>
    {uploading ? "Uploading..." : "Upload Image"}
  </Text>
</Pressable>

{uploadedImageUrl && (
  <Image
    source={{ uri: uploadedImageUrl }}
    style={styles.uploadedImage}
  />
)}
{/* for test */}
      <Pressable
        onPress={() => router.push("/case-status")}
        style={({ pressed }) => [styles.testButton, pressed && { opacity: 0.7 }]}
      >
        <Text style={styles.testButtonText}>Case Status (Test)</Text>
      </Pressable>

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


  testButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#2d4a5e",
    borderRadius: 10,
  },
  testButtonText: {
    color: "white",
    fontSize: 14,
  },


  uploadButton: {
  marginTop: 20,
  padding: 12,
  backgroundColor: "#2d4a5e",
  borderRadius: 10,
  width: "80%",
  alignItems: "center",
},
uploadButtonText: {
  color: "white",
  fontSize: 14,
  fontWeight: "600",
},
uploadedImage: {
  width: 100,
  height: 100,
  borderRadius: 10,
  marginTop: 15,
},

});