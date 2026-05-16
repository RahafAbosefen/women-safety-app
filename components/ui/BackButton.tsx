import React from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type BackButtonProps = {
  color?: string;
  size?: number;
  style?: ViewStyle;
};

export default function BackButton({
  color = "#0f172a",
  size = 22,
  style,
}: BackButtonProps) {
  const router = useRouter();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.backBtn,
        style,
        pressed && styles.pressed,
      ]}
      onPress={() => router.back()}
    >
      <Ionicons name="arrow-back" size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },
});