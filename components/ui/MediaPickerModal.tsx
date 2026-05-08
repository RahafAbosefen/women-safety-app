import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { AppColors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  visible: boolean;
  title?: string;
  hasImage: boolean;
  onCamera: () => void;
  onGallery: () => void;
  onRemove?: () => void;
  onClose: () => void;
}

export const MediaPickerModal = ({
  visible,
  title,
  hasImage,
  onCamera,
  onGallery,
  onRemove,
  onClose,
}: Props) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>

          <Pressable style={styles.item} onPress={onCamera}>
            <Ionicons name="camera" size={20} color={AppColors.primary} />
            <Text style={styles.text}>Take Photo</Text>
          </Pressable>

          <Pressable style={styles.item} onPress={onGallery}>
            <Ionicons name="images" size={20} color={AppColors.primary} />
            <Text style={styles.text}>Choose from Gallery</Text>
          </Pressable>

          {hasImage && !!onRemove && (
            <Pressable style={styles.item} onPress={onRemove}>
              <Ionicons name="trash" size={20} color="red" />
              <Text style={[styles.text, { color: "red" }]}>Remove Image</Text>
            </Pressable>
          )}

          <Pressable style={styles.cancel} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
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
  card: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: AppColors.primary,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 10,
  },
  text: {
    fontSize: 15,
    color: AppColors.text,
  },
  cancel: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
  },
  cancelText: {
    color: AppColors.primary,
    fontWeight: "bold",
  },
});
