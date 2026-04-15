import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MapColors } from "@/constants/theme";

type CustomMarkerProps = {
  variant?: "danger" | "neutral" | "active";
};

const CustomMarker = ({ variant = "danger" }: CustomMarkerProps) => {
  const isActive = variant === "active";

  return (
    <View style={styles.wrapper}>
      {isActive && <View style={styles.activeRing} />}

      <View
        style={[
          styles.markerBody,
          variant === "danger" && styles.dangerMarker,
          variant === "neutral" && styles.neutralMarker,
          variant === "active" && styles.activeMarker,
        ]}
      >
        <Ionicons
          name="location-sharp"
          size={18}
          color={variant === "neutral" ? MapColors.primary : MapColors.sheetBackground}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  activeRing: {
    position: "absolute",
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 2,
    borderColor: MapColors.primary,
    backgroundColor: "rgba(33,69,86,0.08)",
  },
  markerBody: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  dangerMarker: {
    backgroundColor: MapColors.dangerMarker,
  },
  neutralMarker: {
    backgroundColor: MapColors.neutralMarker,
  },
  activeMarker: {
    backgroundColor: MapColors.primary,
  },
});

export default CustomMarker;