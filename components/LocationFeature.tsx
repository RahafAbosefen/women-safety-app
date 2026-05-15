import { useState } from "react";
import { StyleSheet, Pressable, Text, Alert } from "react-native";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

type LocationValue = {
  latitude: number;
  longitude: number;
};

type Props = {
  onLocationChange: (location: LocationValue | null) => void;
};

export default function LocationFeature({ onLocationChange }: Props) {
  const [locationText, setLocationText] = useState(
    "Add current location (optional)"
  );

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLocationText("Location permission denied");
        onLocationChange(null);

        Alert.alert(
          "Permission needed",
          "Please allow location access if you want to add your current location."
        );

        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = currentLocation.coords;

      setLocationText("Location added successfully");

      onLocationChange({
        latitude,
        longitude,
      });
    } catch (error) {
      console.log("Location error:", error);
      setLocationText("Could not get location");
      onLocationChange(null);

      Alert.alert("Error", "Could not get your current location.");
    }
  };

  return (
    <Pressable style={styles.locationBox} onPress={getLocation}>
      <Ionicons name="location-outline" size={22} color="#204E64" />
      <Text style={styles.locationText}>{locationText}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  locationBox: {
    width: "100%",
    minHeight: 56,
    borderWidth: 1.4,
    borderColor: "#B8C7CF",
    borderRadius: 16,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  locationText: {
    marginLeft: 10,
    color: "#4F6B79",
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
});