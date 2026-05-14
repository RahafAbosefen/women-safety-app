import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MapColors } from "@/constants/theme";
import type { MapMarkerVariant } from "@/constants/mockMapMarkers";

type CustomMarkerProps = {
  variant?: MapMarkerVariant;
};

const CustomMarker = ({ variant = "danger" }: CustomMarkerProps) => {
  if (variant === "active") {
    return (
      <View style={styles.currentLocationOuter}>
        <View style={styles.currentLocationInner} />
      </View>
    );
  }
  const getIconName = () => {
    if (variant === "danger") return "warning-outline";
    return "shield-checkmark-outline";
  };

  return (
    <View
      style={[
        styles.markerBody,
        variant === "danger" && styles.dangerMarker,
        variant === "neutral" && styles.neutralMarker,
      ]}
    >
      <Ionicons
        name={getIconName()}
        size={20}
        color={
          variant === "neutral" ? MapColors.primary : MapColors.sheetBackground
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  currentLocationOuter: {
    width: 74,
    height: 74,
    borderRadius: 37,
    borderWidth: 3,
    borderColor: MapColors.primary,
    backgroundColor: MapColors.activeMarkerRingBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  currentLocationInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: MapColors.primary,
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
