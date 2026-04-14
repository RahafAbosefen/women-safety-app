

import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Portal, TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { Audio } from "expo-av";

import ReportTypeDropdown from "@/components/ReportTypeDropdown";
import EvidenceSection from "@/components/EvidenceSection";
import ResultSOSModal from "@/components/ResultSOSModal";
import { router } from "expo-router";
import { addReport } from "@/services/ReportService";
type ReportFormData = {
  details: string;
};

export default function AddReportScreen() {
  const [open, setOpen] = useState(false);
  const [reportType, setReportType] = useState("Harassment");
  const [resultVisible, setResultVisible] = useState(false);

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [locationText, setLocationText] = useState(
    "Current location (auto-detected)"
  );

  const [images, setImages] = useState<string[]>([]);

  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

 

  const { control, handleSubmit, reset } = useForm<ReportFormData>({
    defaultValues: {
      details: "",
    },
  });

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLocationText("Permission denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;

      setLocation({ latitude, longitude });
      setLocationText(
        `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`
      );
    } catch (error) {
      setLocationText("Error getting location");
    }
  };

  const pickImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Permission needed", "Please allow photo access.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.8,
        allowsMultipleSelection: true,
      });

      if (!result.canceled) {
        const newImages = result.assets.map((img) => img.uri);
        setImages((prev) => [...prev, ...newImages]);
      }
    } catch (error) {
      console.log("Image picker error:", error);
      Alert.alert("Error", "Could not pick image.");
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Permission needed", "Allow microphone access");
        return;
      }

      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      setAudioUri(null);
      setIsPlaying(false);

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(newRecording);
      Alert.alert("Recording started");
    } catch (err) {
      console.log("Start recording error:", err);
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

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
      });

      Alert.alert("Recording saved");
    } catch (err) {
      console.log("Stop recording error:", err);
      Alert.alert("Error", "Could not save recording.");
    }
  };

  const playSound = async () => {
    try {
      if (!audioUri) return;

      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true }
      );

      setSound(newSound);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status: any) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (error) {
      console.log("Error playing sound:", error);
      Alert.alert("Error", "Could not play audio.");
    }
  };

  const deleteAudio = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      setAudioUri(null);
      setRecording(null);
      setIsPlaying(false);
    } catch (error) {
      console.log("Error deleting audio:", error);
    }
  };


const onSubmit = async (data: any) => {
  try {
    await addReport({
      reportType: reportType,
      details: data.details,
      location: location,
      imageUrls: images,
      
      createdAt: new Date(),
    });



    setReportType("Harassment");
    reset({ details: "" });
    setLocation(null);
    setLocationText("Current location (auto-detected)");
    setImages([]);
  
    setOpen(false);

    setResultVisible(true);
  } catch (error: any) {
    console.log("Firestore error:", error);
    alert(error.message);
  }
};
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.topSpace} />

      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Report Details</Text>
      </View>

      <ReportTypeDropdown
        open={open}
        reportType={reportType}
        onToggle={() => setOpen(!open)}
        onSelect={(value) => {
          setReportType(value);
          setOpen(false);
        }}
      />

     <Controller
  control={control}
  name="details"
  rules={{ 
    required: "Details is required", 
    minLength: {
      value: 10,
      message: "Write at least 10 characters",
    },
  }}
  render={({ field: { onChange, value }, fieldState: { error } }) => (
    <>
      <TextInput
        mode="outlined"
        label="Details"
        placeholder="Share details if you feel comfortable"
        value={value}
        onChangeText={onChange}
        multiline
        outlineColor="#B8C7CF"
        activeOutlineColor="#204E64"
        style={styles.detailsInput}
        contentStyle={styles.detailsInputContent}
      />

      {error && (
        <Text style={{ color: "red", marginTop: 5,marginBottom:5 }}>
          {error.message}
        </Text>
      )}
    </>
  )}
/>
      <Pressable style={styles.locationBox} onPress={getLocation}>
        <Ionicons name="location-outline" size={22} color="#204E64" />
        <Text style={styles.locationText}>{locationText}</Text>
      </Pressable>

      <EvidenceSection
        recording={!!recording}
        images={images}
        audioUri={audioUri}
        isPlaying={isPlaying}
        onPickImage={pickImage}
        onAudioPress={recording ? stopRecording : startRecording}
        onRemoveImage={removeImage}
        onPlaySound={playSound}
        onDeleteAudio={deleteAudio}
      />

     

    <Portal>
  <ResultSOSModal
    visible={resultVisible}
    title="Report submitted"
    subtitle="Your report was sent successfully"
    buttonText="Back to home"
    onDismiss={() => {
      setResultVisible(false);
      router.push("/");
    }}
  />
</Portal>
   <Pressable style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.submitButtonText}>Submit Report</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  topSpace: {
    height: 50,
  },
  headerRow: {
    marginTop: 10,
    alignItems: "center",
    marginBottom: 34,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#204E64",
  },
  detailsInput: {
    marginTop: 20,
    backgroundColor: "#fff",
    marginBottom: 22,
  },
  detailsInputContent: {
    minHeight: 115,
    color: "#204E64",
  },
  locationBox: {
    minHeight: 50,
    borderWidth: 1.4,
    borderColor: "#B8C7CF",
    borderRadius: 15,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },
  locationText: {
    marginLeft: 8,
    color: "#4F6B79",
    fontSize: 15,
    flex: 1,
  },

  submitButton: {
    alignSelf: "center",
    backgroundColor: "#204E64",
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 32,
    marginTop: 4,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});