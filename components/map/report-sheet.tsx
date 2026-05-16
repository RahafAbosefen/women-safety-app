import { useState, useCallback } from "react";
import { MapColors } from "@/constants/theme";
import ReportTypeDropdown from "@/components/ReportTypeDropdown";
import { reportSheetStyles as styles } from "@/styles/Map.styles";
import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Alert,
  ScrollView,
  Keyboard,
  ActivityIndicator,
  Image,
} from "react-native";
import { auth } from "@/services/firebaseConfig";
import { addReportMap } from "@/services/ReportService";
import { Controller, useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { MediaPickerModal } from "../ui/MediaPickerModal";
import { useMediaManager } from "@/hooks/useMediaManager";
import { CloudinaryService } from "@/services/CloudinaryService";
import AudioFeature from "@/components/AudioFeature";
import { NotificationService } from "@/services/NotificationService";

type ReportLocation = {
  latitude: number;
  longitude: number;
};

type ReportSheetProps = {
  isVisible: boolean;
  location: ReportLocation | null;
  onClose: () => void;
  onSubmit: () => void;
};

type ReportFormData = {
  details: string;
};

const ReportSheet = ({
  isVisible,
  onSubmit,
  onClose,
  location,
}: ReportSheetProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [reportType, setReportType] = useState("Harassment");
  const [otherReportType, setOtherReportType] = useState("");

  const closeDropdown = () => {
    setOpen(false);
    Keyboard.dismiss();
  };

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ReportFormData>({
    defaultValues: {
      details: "",
    },
    mode: "onSubmit",
  });

  const detailsValue = watch("details");

  const finalSelectedReportType =
    reportType === "Other" ? otherReportType.trim() : reportType;

  const canSubmitReport =
    Boolean(location) &&
    Boolean(finalSelectedReportType) &&
    Boolean(detailsValue?.trim());

  const [images, setImages] = useState<string[]>([]);
  const saveImage = useCallback((uri: string) => {
    if (uri) {
      setImages((prev) => [...prev, uri]);
    }
  }, []);

  const media = useMediaManager(saveImage);

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const removeAllImages = () => {
    setImages([]);
    media.closeModal();
  };

  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [audioResetKey, setAudioResetKey] = useState(0);

  const onFormSubmit = async (data: ReportFormData) => {
    Keyboard.dismiss();

    if (!location) {
      Alert.alert(
        "Location not ready",
        "Location is required to submit the report.",
      );
      return;
    }

    const finalReportType =
      reportType === "Other" ? otherReportType.trim() : reportType;

    if (reportType === "Other" && !otherReportType.trim()) {
      Alert.alert("Error", "Please write the report type.");
      return;
    }

    try {
      setIsSubmitting(true);

      const user = auth.currentUser;

      if (!user) {
        Alert.alert("Error", "User not logged in");
        return;
      }

      let imageUrls: string[] = [];

      if (images.length > 0) {
        imageUrls = await Promise.all(
          images.map((imageUri) => CloudinaryService.uploadImage(imageUri)),
        );
      }
      let uploadedAudioUrl: string | null = null;

      if (audioUri) {
        uploadedAudioUrl = await CloudinaryService.uploadAudio(audioUri);
      }

      await addReportMap({
        userId: user.uid,
        userEmail: user.email || "",
        userName: user.displayName || user.email || "Unknown user",
        userImage: user.photoURL || "",
        reportType: finalReportType,

        details: data.details,
        location,
        locationName: `${location.latitude}, ${location.longitude}`,
        imageUrls,
        audioUrl: uploadedAudioUrl,
        status: "pending",
        createdAt: new Date(),
      });
      await NotificationService.notifyUser({
        userId: user.uid,
        title: "Report Submitted",
        body: "Your report has been received and shared with the relevant authorities.",
        type: "mapReport",
      });
      reset({ details: "" });
      setReportType("Harassment");
      setOtherReportType("");
      setOpen(false);
      setImages([]);
      setAudioUri(null);
      setAudioResetKey((prev) => prev + 1);

      onSubmit();
    } catch (error: any) {
      console.log("Firestore error:", error);
      Alert.alert("Error", error.message || "Could not save report.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Pressable style={styles.overlay} onPress={onClose}>
          <Pressable style={styles.sheet} onPress={() => Keyboard.dismiss()}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
              contentContainerStyle={styles.sheetContent}
            >
              <Text style={styles.title}>Report from this location</Text>

              <ReportTypeDropdown
                open={open}
                reportType={reportType}
                otherReportType={otherReportType}
                variant="map"
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

              <Text style={styles.hint}>
                Select the type that best describes the incident
              </Text>

              <Controller
                control={control}
                name="details"
                rules={{
                  required: "Please describe the incident in more detail",
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[styles.input, errors.details && styles.inputError]}
                    placeholder="Describe what happened * "
                    placeholderTextColor={MapColors.submitButton}
                    multiline
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />

              {errors.details && (
                <Text style={styles.errorText}>{errors.details.message}</Text>
              )}

              <Text style={styles.evidenceLabel}>Add evidence (optional)</Text>

              <View
                style={[
                  styles.evidenceRow,
                  audioUri && styles.evidenceRowWithAudio,
                ]}
              >
                <Pressable
                  onPress={media.openModal}
                  style={({ pressed }) => [
                    styles.evidenceBtn,
                    pressed && styles.evidenceBtnPressed,
                  ]}
                >
                  <Ionicons
                    name="camera-outline"
                    size={20}
                    color={MapColors.primary}
                  />
                  <Text style={styles.evidenceBtnText}>Photo</Text>
                </Pressable>

                <AudioFeature
                  key={`audio-${audioResetKey}`}
                  resetKey={audioResetKey}
                  variant="map"
                  onAudioRecorded={(uri) => {
                    setAudioUri(uri);
                  }}
                />
              </View>
              {images.length > 0 && (
                <View style={styles.imagesContainer}>
                  {images.map((imageUri, index) => (
                    <View key={`${imageUri}-${index}`} style={styles.imageBox}>
                      <Image
                        source={{ uri: imageUri }}
                        style={styles.previewImage}
                      />

                      <Pressable
                        style={styles.removeImageButton}
                        onPress={() => removeImage(index)}
                      >
                        <Ionicons
                          name="close"
                          size={18}
                          color={MapColors.sheetBackground}
                        />
                      </Pressable>
                    </View>
                  ))}
                </View>
              )}

              <Pressable
                onPress={handleSubmit(onFormSubmit)}
                disabled={isSubmitting || !canSubmitReport}
                style={({ pressed }) => [
                  styles.submitBtn,
                  canSubmitReport && styles.submitBtnReady,
                  pressed &&
                    canSubmitReport &&
                    !isSubmitting &&
                    styles.submitBtnPressed,
                  (!canSubmitReport || isSubmitting) &&
                    styles.submitBtnDisabled,
                ]}
              >
                {isSubmitting ? (
                  <ActivityIndicator color={MapColors.sheetBackground} />
                ) : (
                  <Text style={styles.submitText}>Submit Report</Text>
                )}
              </Pressable>
            </ScrollView>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
      <MediaPickerModal
        visible={media.visible}
        title="Report Image"
        hasImage={images.length > 0}
        onCamera={media.openCamera}
        onGallery={media.openGallery}
        onRemove={removeAllImages}
        onClose={media.closeModal}
      />
    </Modal>
  );
};

export default ReportSheet;
