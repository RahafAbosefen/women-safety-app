import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MapColors } from "@/constants/theme";
import type { MapMarkerVariant } from "@/constants/mockMapMarkers";
import { customMarkerStyles as styles } from "@/styles/Map.styles";

type CustomMarkerProps = {
  variant?: MapMarkerVariant;
};

const CustomMarker = ({ variant = "danger" }: CustomMarkerProps) => {
  if (variant === "active") {
    return (
      <View style={styles.activeOuter}>
        <View style={styles.activeInner} />
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

export default CustomMarker;
