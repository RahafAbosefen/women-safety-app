import React from "react";
import { Modal, Pressable, StyleSheet, View,StatusBar } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  visible: boolean;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onDismiss: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  iconBackground?: string;
};

export default function ResultSOSModal({
  visible,
  title = "SOS Alert Sent",
  subtitle = "Your emergency alert was sent successfully.",
  buttonText = "Okay",
  onDismiss,
  iconName = "checkmark-circle-outline",
  iconColor = "#2E7D64",
  iconBackground = "#EAF7F0",
}: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade" statusBarTranslucent>
      <StatusBar backgroundColor="rgba(17, 24, 39, 0.42)" translucent />
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={[styles.iconOuter, { backgroundColor: iconBackground }]}>
            <Ionicons name={iconName} size={58} color={iconColor} />
          </View>

          <Text style={styles.title}>{title}</Text>

          <Text style={styles.subtitle}>{subtitle}</Text>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={onDismiss}
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(17, 24, 39, 0.42)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  card: {
    width: "100%",
    maxWidth: 345,
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    paddingTop: 34,
    paddingBottom: 26,
    paddingHorizontal: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEF2F5",
    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.16,
    shadowRadius: 18,
  },

  iconOuter: {
    width: 112,
    height: 112,
    borderRadius: 56,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "rgba(46, 125, 100, 0.12)",
  },

  title: {
    fontSize: 25,
    fontWeight: "900",
    color: "#204E64",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: -0.4,
  },

  subtitle: {
    fontSize: 16,
    color: "#6B7D86",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 28,
    paddingHorizontal: 4,
    fontWeight: "600",
  },

  button: {
    width: "100%",
    minHeight: 58,
    borderRadius: 18,
    backgroundColor: "#204E64",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },

  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },
});