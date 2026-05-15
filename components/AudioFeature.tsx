import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

type AudioFeatureProps = {
  onAudioRecorded?: (uri: string | null) => void;
  resetKey?: number;
};

export default function AudioFeature({
  onAudioRecorded,
  resetKey = 0,
}: AudioFeatureProps) {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setAudioUri(null);
    setRecording(null);
    setIsPlaying(false);

    if (onAudioRecorded) {
      onAudioRecorded(null);
    }
  }, [resetKey]);

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Permission needed", "Please allow microphone access.");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const newRecording = new Audio.Recording();

      await newRecording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      await newRecording.startAsync();
      setRecording(newRecording);
    } catch (error) {
      console.log("Start recording error:", error);
      Alert.alert("Error", "Could not start recording.");
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;

      await recording.stopAndUnloadAsync();

      const uri = recording.getURI();

      setAudioUri(uri || null);
      setRecording(null);

      if (onAudioRecorded) {
        onAudioRecorded(uri || null);
      }
    } catch (error) {
      console.log("Stop recording error:", error);
      Alert.alert("Error", "Could not stop recording.");
    }
  };

  const playAudio = async () => {
    try {
      if (!audioUri) return;

      setIsPlaying(true);

      const { sound } = await Audio.Sound.createAsync({
        uri: audioUri,
      });

      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log("Play audio error:", error);
      setIsPlaying(false);
      Alert.alert("Error", "Could not play audio.");
    }
  };

  const removeAudio = () => {
    setAudioUri(null);
    setRecording(null);
    setIsPlaying(false);

    if (onAudioRecorded) {
      onAudioRecorded(null);
    }
  };

  return (
    <View style={styles.container}>
      {!recording ? (
        <Pressable style={styles.recordButton} onPress={startRecording}>
          <Ionicons name="mic-outline" size={22} color="#fff" />
          <Text style={styles.buttonText}>Start Recording</Text>
        </Pressable>
      ) : (
        <Pressable style={styles.stopButton} onPress={stopRecording}>
          <Ionicons name="stop-outline" size={22} color="#fff" />
          <Text style={styles.buttonText}>Stop Recording</Text>
        </Pressable>
      )}

      {audioUri && (
        <View style={styles.audioCard}>
          <View style={styles.audioInfo}>
            <Ionicons name="musical-notes-outline" size={22} color="#204E64" />
            <Text style={styles.audioText}>Audio recorded</Text>
          </View>

          <View style={styles.actions}>
            <Pressable style={styles.playButton} onPress={playAudio}>
              <Ionicons
                name={isPlaying ? "volume-high-outline" : "play-outline"}
                size={20}
                color="#fff"
              />
            </Pressable>

            <Pressable style={styles.deleteButton} onPress={removeAudio}>
              <Ionicons name="close" size={18} color="#fff" />
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginBottom: 8,
  },

  recordButton: {
    width: "60%",
    minHeight: 56,
    backgroundColor: "#204E64",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    elevation: 2,
  },

  stopButton: {
    width: "60%",
    minHeight: 56,
    backgroundColor: "#B1848D",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    elevation: 2,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },

  audioCard: {
    marginTop: 14,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  audioInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },

  audioText: {
    color: "#204E64",
    fontSize: 15,
    fontWeight: "700",
  },

  actions: {
    flexDirection: "row",
    gap: 8,
  },

  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#204E64",
    alignItems: "center",
    justifyContent: "center",
  },

  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#D9534F",
    alignItems: "center",
    justifyContent: "center",
  },
});