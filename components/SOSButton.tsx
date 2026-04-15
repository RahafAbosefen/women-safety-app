import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

type SOSButtonProps = {
  onPress: () => void;
};

export default function SOSButton({ onPress }: SOSButtonProps) {
  return (
    <Pressable style={styles.sosButton} onPress={onPress}>
      <Text style={styles.sosText}>SOS</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  sosButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#a62020",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  sosText: {
    fontSize: 36,
    color: "#fff",
    fontWeight: "bold",
  },
});