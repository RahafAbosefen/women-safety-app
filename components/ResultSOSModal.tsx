

import React from "react";
import { View, StyleSheet } from "react-native";
import { Modal, Text, Button } from "react-native-paper";

type ResultSOSModalProps = {
  visible: boolean;
  onDismiss: () => void;
  title?: string;
  subtitle?: string;
  buttonText?: string;
};

export default function ResultSOSModal({
  visible,
  onDismiss,
  title = "Emergency alert sent",
  subtitle = "Help is on the way",
  buttonText = "Back to home",
}: ResultSOSModalProps) {
  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={styles.resultModal}
    >
      <Text style={styles.resultTitle}>{title}</Text>

      <View style={styles.resultCircle}>
        <Text style={styles.checkIcon}>✓</Text>
      </View>

      <Text style={styles.resultSubtitle}>{subtitle}</Text>

      <Button
        mode="contained"
        onPress={onDismiss}
        style={styles.backButton}
        contentStyle={styles.backButtonContent}
        labelStyle={styles.backButtonLabel}
      >
        {buttonText}
      </Button>
    </Modal>
  );
}

const styles = StyleSheet.create({
  resultModal: {
    backgroundColor: "#e8d6d1",
    borderRadius: 16,
    padding: 20,
    width: 300,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  resultCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: "#1f4b63",
    backgroundColor: "#f5f5f5",
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  checkIcon: {
    fontSize: 60,
    color: "#1f4b63",
    fontWeight: "bold",
  },
  resultTitle: {
    fontSize: 20,
    color: "#1f4b63",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  resultSubtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#1f4b63",
    borderRadius: 12,
    width: 160,
  },
  backButtonContent: {
    height: 48,
  },
  backButtonLabel: {
    color: "#fff",
    fontSize: 16,
  },
});