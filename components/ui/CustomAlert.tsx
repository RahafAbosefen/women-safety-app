import React from "react";
import { View, Text, StyleSheet, Pressable, Modal } from "react-native";
import { AppColors } from "@/constants/theme";
interface MyAlertProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const AppAlert = ({
  visible,
  title,
  message,
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: MyAlertProps) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.alertCard}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.row}>
            <Pressable style={styles.btn} onPress={onCancel}>
              <Text style={styles.cancelText}>{cancelText}</Text>
            </Pressable>
            <Pressable style={styles.btn} onPress={onConfirm}>
              <Text style={styles.confirmText}>{confirmText}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertCard: {
    width: 280,
    backgroundColor: AppColors.background,
    borderRadius: 18,
    padding: 22,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: AppColors.primary,
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: AppColors.text,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    borderTopWidth: 0.5,
    borderTopColor: AppColors.border,
    paddingTop: 10,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  confirmText: {
    color: "red",
    fontWeight: "bold",
  },
  cancelText: {
    color: AppColors.primary,
  },
});
