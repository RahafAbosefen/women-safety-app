import React, { useEffect, useState } from "react";
import { View, Text, Pressable,  Alert } from "react-native";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { MapColors } from "@/constants/theme";
import { audioFeatureStyles as styles } from "@/styles/Map.styles";

type AudioFeatureProps = {
  onAudioRecorded?: (uri: string | null) => void;
  resetKey?: number;
  variant?: "default" | "map";
};

export default function AudioFeature({
  onAudioRecorded,
  resetKey = 0,
  variant = "default",
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
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
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

  const isMapVariant = variant === "map";

  return (
    <View style={isMapVariant ? styles.mapContainer : styles.container}>
      {!recording ? (
        <Pressable
          style={({ pressed }) => [
            isMapVariant ? styles.mapRecordButton : styles.recordButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={startRecording}
        >
          <Ionicons
            name="mic-outline"
            size={isMapVariant ? 20 : 22}
            color={isMapVariant ? MapColors.primary : "#fff"}
          />
          <Text style={isMapVariant ? styles.mapButtonText : styles.buttonText}>
            {isMapVariant ? "Audio" : "Start Recording"}
          </Text>
        </Pressable>
      ) : (
        <Pressable
          style={({ pressed }) => [
            isMapVariant ? styles.mapStopButton : styles.stopButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={stopRecording}
        >
          <Ionicons
            name="stop-outline"
            size={isMapVariant ? 20 : 22}
            color="#fff"
          />
          <Text
            style={isMapVariant ? styles.mapStopButtonText : styles.buttonText}
          >
            {isMapVariant ? "Stop" : "Stop Recording"}
          </Text>
        </Pressable>
      )}

      {audioUri && (
        <View style={isMapVariant ? styles.mapAudioCard : styles.audioCard}>
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

