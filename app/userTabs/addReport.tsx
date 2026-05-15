import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
  Image,
  Alert,
  Keyboard,
} from "react-native";

import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import ReportTypeDropdown from "@/components/ReportTypeDropdown";
import ResultSOSModal from "@/components/ResultSOSModal";
import { MediaPickerModal } from "@/components/ui/MediaPickerModal";
import AudioFeature from "@/components/AudioFeature";
import LocationFeature from "@/components/LocationFeature";
import NotificationBell from "@/components/NotificationBell";

import { useMediaManager } from "@/hooks/useMediaManager";

import { router } from "expo-router";
import { addReport } from "@/services/ReportService";
import { auth } from "@/services/firebaseConfig";
import { CloudinaryService } from "@/services/CloudinaryService";
import { NotificationService } from "@/services/NotificationService";

type ReportFormData = {
  details: string;
};

export default function AddReport() {
  const [open, setOpen] = useState(false);
  const [reportType, setReportType] = useState("Harassment");
  const [otherReportType, setOtherReportType] = useState("");
  const [resultVisible, setResultVisible] = useState(false);

  const [images, setImages] = useState<string[]>([]);

  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [audioResetKey, setAudioResetKey] = useState(0);

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationResetKey, setLocationResetKey] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit, reset } = useForm<ReportFormData>({
    defaultValues: {
      details: "",
    },
  });

  const media = useMediaManager((uri) => {
    if (uri) {
      setImages((prev) => [...prev, uri]);
    }
  });

  const closeDropdown = () => {
    setOpen(false);
    Keyboard.dismiss();
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const removeAllImages = () => {
    setImages([]);
    media.closeModal();
  };

  const onSubmit = async (data: ReportFormData) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        Alert.alert("Error", "User not logged in");
        return;
      }

      const finalReportType =
        reportType === "Other" ? otherReportType.trim() : reportType;

      if (reportType === "Other" && !otherReportType.trim()) {
        Alert.alert("Error", "Please write the report type.");
        return;
      }

      setIsSubmitting(true);

      let uploadedAudioUrl = "";
      let uploadedImageUrls: string[] = [];

      if (audioUri) {
        uploadedAudioUrl = await CloudinaryService.uploadAudio(audioUri);
      }

      if (images.length > 0) {
        uploadedImageUrls = await Promise.all(
          images.map((imageUri) => CloudinaryService.uploadImage(imageUri)),
        );
      }

      await addReport({
        userId: user.uid,
        userEmail: user.email || "",
        userName: user.displayName || user.email || "Unknown user",
        userImage: user.photoURL || "",
        reportType: finalReportType,
        details: data.details,
        location: location,
        imageUrls: uploadedImageUrls,
        audioUrl: uploadedAudioUrl,
        status: "pending",
        createdAt: new Date(),
      });

      await NotificationService.notifyUser({
        userId: user.uid,
        title: "Report Submitted",
        body: "Your report was submitted successfully.",
        type: "report",
      });

      setReportType("Harassment");
      setOtherReportType("");
      reset({ details: "" });

      setImages([]);

      setAudioUri(null);
      setAudioResetKey((prev) => prev + 1);

      setLocation(null);
      setLocationResetKey((prev) => prev + 1);

      setOpen(false);
      setResultVisible(true);
    } catch (error: any) {
      console.log("Firestore error:", error);
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      onScrollBeginDrag={closeDropdown}
    >
      <View style={styles.topSpace} />

      <View style={styles.headerRow}>
        <View style={styles.headerSide} />

        <Text style={styles.headerTitle}>Add Report</Text>

        <View style={styles.headerSide}>
          <NotificationBell />
        </View>
      </View>

      <ReportTypeDropdown
        open={open}
        reportType={reportType}
        otherReportType={otherReportType}
        onToggle={() => setOpen(!open)}
        onSelect={(value) => {
          setReportType(value);

          if (value !== "Other") {
            setOtherReportType("");
            setOpen(false);
          }
        }}
        onOtherChange={setOtherReportType}
        onClose={closeDropdown}
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
          <View>
            <TextInput
              mode="outlined"
              label="Details"
              placeholder="Share details if you feel comfortable"
              value={value}
              onChangeText={onChange}
              onFocus={() => setOpen(false)}
              multiline
              outlineColor="#B8C7CF"
              activeOutlineColor="#204E64"
              style={styles.detailsInput}
              contentStyle={styles.detailsInputContent}
            />

            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        )}
      />

      <Text style={styles.evidenceTitle}>
        You can add optional evidence if you feel comfortable
      </Text>

      <LocationFeature
        key={`location-${locationResetKey}`}
        onLocationChange={(newLocation) => {
          setLocation(newLocation);
        }}
      />

      <Pressable style={styles.addImageButton} onPress={media.openModal}>
        <Ionicons name="camera-outline" size={22} color="#fff" />
        <Text style={styles.addImageButtonText}>Add Image</Text>
      </Pressable>

      {images.length > 0 && (
        <View style={styles.imagesContainer}>
          {images.map((imageUri, index) => (
            <View key={`${imageUri}-${index}`} style={styles.imageBox}>
              <Image source={{ uri: imageUri }} style={styles.previewImage} />

              <Pressable
                style={styles.removeImageButton}
                onPress={() => removeImage(index)}
              >
                <Ionicons name="close" size={18} color="#fff" />
              </Pressable>
            </View>
          ))}
        </View>
      )}

      <AudioFeature
        key={`audio-${audioResetKey}`}
        resetKey={audioResetKey}
        onAudioRecorded={(uri) => {
          setAudioUri(uri);
        }}
      />

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

      <Pressable
        style={[
          styles.submitButton,
          isSubmitting && styles.submitButtonDisabled,
        ]}
        disabled={isSubmitting}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.submitButtonText}>
          {isSubmitting ? "Submitting..." : "Submit Report"}
        </Text>
      </Pressable>

      <MediaPickerModal
        visible={media.visible}
        title="Report Image"
        hasImage={images.length > 0}
        onCamera={media.openCamera}
        onGallery={media.openGallery}
        onRemove={removeAllImages}
        onClose={media.closeModal}
      />
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
    paddingTop: 18,
    paddingBottom: 130,
  },

  topSpace: {
    height: 28,
  },

  headerRow: {
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerSide: {
    width: 52,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 30,
    fontWeight: "900",
    color: "#204E64",
    textAlign: "center",
    letterSpacing: -0.4,
  },

  detailsInput: {
    marginTop: 18,
    backgroundColor: "#fff",
    marginBottom: 22,
    borderRadius: 16,
  },

  detailsInputContent: {
    minHeight: 125,
    color: "#204E64",
    fontSize: 15,
    paddingTop: 14,
  },

  errorText: {
    color: "#D9534F",
    marginBottom: 10,
    fontSize: 13,
    fontWeight: "600",
  },

  evidenceTitle: {
    textAlign: "center",
    color: "#B1848D",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 25,
    marginTop: 15,
    lineHeight: 23,
    paddingHorizontal: 8,
  },

  addImageButton: {
    width: "60%",
    minHeight: 56,
    backgroundColor: "#204E64",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
    elevation: 2,
  },

  addImageButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },

  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 18,
    justifyContent: "center",
  },

  imageBox: {
    width: 105,
    height: 105,
    borderRadius: 16,
    position: "relative",
  },

  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },

  removeImageButton: {
    position: "absolute",
    top: -7,
    right: -7,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#D9534F",
    alignItems: "center",
    justifyContent: "center",
  },

  submitButton: {
    width: "70%",
    minHeight: 58,
    alignSelf: "center",
    backgroundColor: "#a1767e",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginTop: 22,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },

  submitButtonDisabled: {
    opacity: 0.65,
  },

  submitButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "900",
  },
});
