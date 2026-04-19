import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { MapColors, AppColors } from "@/constants/theme";

type props={
  images:string[];
  onPickImage:()=>void;
  onRemoveImage:(index:number)=>void
};

export default function EvidenceSection({
  images,onPickImage,onRemoveImage}:props){
      return (
    <View>
      <Text style={styles.evidenceTitle}> Add evidence (optional)</Text>

      <Pressable style={styles.smallButton} onPress={onPickImage}>
        <Feather name="image" size={18} color={MapColors.primary} />
        <Text style={styles.smallButtonText}>Photo</Text>
      </Pressable>

      <View style={styles.imagesContainer}>
        {images.map((uri, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri }} style={styles.image} contentFit="cover" />
            <Pressable
              style={styles.deleteButton}
              onPress={() => onRemoveImage(index)}
            >
              <Text style={styles.deleteButtonText}>X</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  evidenceTitle: {
    textAlign: "center",
    color: MapColors.supportText,
    fontSize: 16,
    marginBottom: 18,
  },
  smallButton: {
    width: "42%",
    alignSelf: "center",
    height: 44,
    borderWidth: 1.8,
    borderColor: MapColors.primary,
    borderRadius: 12,
    backgroundColor: MapColors.sheetBackground,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  smallButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: MapColors.primary,
    fontWeight: "500",
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
    marginTop: 10,
    justifyContent: "center",
  },
  imageWrapper: {
    position: "relative",
    width: 100,
    height: 100,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  deleteButton: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: AppColors.error,
    borderRadius: 14,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  deleteButtonText: {
    color: MapColors.sheetBackground,
    fontSize: 14,
    fontWeight: "bold",
  },
});