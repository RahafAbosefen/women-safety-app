import { View, Text, Pressable, Modal } from "react-native";
import { successSheetStyles as styles } from "@/styles/Map.styles";

type SuccessSheetProps = {
  isVisible: boolean;
  onBackToMap: () => void;
};

const SuccessSheet = ({ isVisible, onBackToMap }: SuccessSheetProps) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onRequestClose={onBackToMap}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.iconCircle}>
            <Text style={styles.checkmark}> ✓ </Text>
          </View>

          <Text style={styles.title}> Report submitted successfully </Text>
          <Text style={styles.subtitle}>
            {" "}
            Your report has been received and shared with the relevant
            authorities
          </Text>
          <Text style={styles.support}>We are here to support you </Text>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={onBackToMap}
          >
            <Text style={styles.buttonText}> Back to map </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessSheet;
