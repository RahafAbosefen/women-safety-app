import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";

type Props = {
  recording: boolean;
  images: string[];
  audioUri: string | null;
  isPlaying: boolean;
  onPickImage: () => void;
  onAudioPress: () => void;
  onRemoveImage: (index: number) => void;
  onPlaySound: () => void;
  onDeleteAudio: () => void;
};

export default function EvidenceSection({
  recording,
  images,
  audioUri,
  isPlaying,
  onPickImage,
  onAudioPress,
  onRemoveImage,
  onPlaySound,
  onDeleteAudio,
}: Props) {
  return (
    <>
      <Text style={styles.evidenceTitle}>Add evidence (optional)</Text>

      <View style={styles.buttonRow}>
        <Pressable style={styles.smallButton} onPress={onPickImage}>
          <Feather name="image" size={18} color="#204E64" />
          <Text style={styles.smallButtonText}>Photo</Text>
        </Pressable>

        <Pressable style={styles.smallButton} onPress={onAudioPress}>
          <Feather name="mic" size={18} color="#204E64" />
          <Text style={styles.smallButtonText}>
            {recording ? "Stop" : "Audio"}
          </Text>
        </Pressable>
      </View>

      <View style={styles.imagesContainer}>
        {images.map((uri, index) => (
          <View key={`${uri}-${index}`} style={styles.imageWrapper}>
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

      {audioUri && (
        <View style={styles.audioBox}>
          <Pressable style={styles.audioPlayButton} onPress={onPlaySound}>
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={18}
              color="#fff"
            />
          </Pressable>

          <Text style={styles.audioText}>Voice recording ready</Text>

          <Pressable style={styles.audioDeleteButton} onPress={onDeleteAudio}>
            <Ionicons name="close" size={16} color="#fff" />
          </Pressable>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  evidenceTitle: {
    textAlign: "center",
    color: "#C49AA3",
    fontSize: 16,
    marginBottom: 18,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 26,
  },
  smallButton: {
    width: "42%",
    height: 44,
    borderWidth: 1.8,
    borderColor: "#204E64",
    borderRadius: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  smallButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#204E64",
    fontWeight: "500",
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  deleteButton: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  audioBox: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderWidth: 1.4,
    borderColor: "#B8C7CF",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  audioPlayButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#204E64",
    justifyContent: "center",
    alignItems: "center",
  },
  audioText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: "#204E64",
  },
  audioDeleteButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#D9534F",
    justifyContent: "center",
    alignItems: "center",
  },
});