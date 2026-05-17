

import React from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

type Props = {
  visible: boolean;
  count: number;
  onCancel: () => void;
};

export default function SendingSOSModal({ visible, count, onCancel }: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Sending SOS...</Text>

          
            <View style={styles.countInner}>
              <Text style={styles.countText}>{count}</Text>
            </View>
         

          <Text style={styles.subtitle}>
            Your emergency alert will be sent automatically.
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.cancelButton,
              pressed && styles.cancelButtonPressed,
            ]}
            onPress={onCancel}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(17, 24, 39, 0.45)",
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
    paddingBottom: 28,
    paddingHorizontal: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F0D8D4",
    elevation: 14,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 18,
  },

  title: {
    fontSize: 27,
    fontWeight: "900",
    color: "#204E64",
    textAlign: "center",
    marginBottom: 26,
  },

 

  countInner: {
    width: 145,
    height: 145,
    borderRadius: 72.5,
    backgroundColor: "#FFFFFF",
    borderWidth: 8,
    borderColor: "#D94343",
    alignItems: "center",
    justifyContent: "center",
  },

  countText: {
    fontSize: 58,
    fontWeight: "900",
    color: "#D94343",
  },

  subtitle: {
    fontSize: 15,
    color: "#6B7D86",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
    fontWeight: "600",
  },

  cancelButton: {
    width: "70%",
    minHeight: 54,
    borderRadius: 18,
    backgroundColor: "#204E64",
    alignItems: "center",
    justifyContent: "center",
  },

  cancelButtonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },

  cancelText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },
});