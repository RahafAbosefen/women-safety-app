import { useState, useCallback } from "react";
import { MapColors, AppColors } from "@/constants/theme";
import MapDropdown from "@/components/map/map-dropdown";
import {
  View,
  StyleSheet,
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
import { addReportMap } from "@/services/ReportMapService";
import { Controller, useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { MediaPickerModal } from "../ui/MediaPickerModal";
import { useMediaManager } from "@/hooks/useMediaManager";
import { CloudinaryService } from "@/services/CloudinaryService";
import AudioFeature from "@/components/AudioFeature";

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
  reportType: string;
  details: string;
};

const ReportSheet = ({
  isVisible,
  onSubmit,
  onClose,
  location,
}: ReportSheetProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<ReportFormData>({
    defaultValues: {
      reportType: "",
      details: "",
    },
    mode: "onSubmit",
  });

  const selectedIncident = watch("reportType");

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

    if (!data.reportType) {
      setError("reportType", {
        type: "manual",
        message: "Select the type that best describes the incident",
      });
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
        reportType: data.reportType,
        details: data.details,
        location,
        locationName: `${location.latitude}, ${location.longitude}`,
        imageUrls,
        audioUri: uploadedAudioUrl,
        createdAt: new Date(),
      });

      reset({ reportType: "", details: "" });
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

              <Controller
                control={control}
                name="reportType"
                rules={{
                  required: "Select the type that best describes the incident",
                }}
                render={() => (
                  <>
                    <MapDropdown
                      value={selectedIncident}
                      onSelect={(value) => {
                        setValue("reportType", value, { shouldValidate: true });
                        clearErrors("reportType");
                      }}
                      error={!!errors.reportType}
                    />

                    <Text
                      style={[
                        styles.hint,
                        errors.reportType && styles.errorHint,
                      ]}
                    >
                      {errors.reportType
                        ? errors.reportType.message
                        : "Select the type that best describes the incident"}
                    </Text>
                  </>
                )}
              />

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
              <View style={styles.evidenceRow}>
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

                <Pressable
                  style={({ pressed }) => [
                    styles.evidenceBtn,
                    pressed && styles.evidenceBtnPressed,
                  ]}
                >
                  <Ionicons
                    name="mic-outline"
                    size={20}
                    color={MapColors.primary}
                  />
                  <Text style={styles.evidenceBtnText}>Audio</Text>
                </Pressable>
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

              <AudioFeature
                key={`audio-${audioResetKey}`}
                resetKey={audioResetKey}
                onAudioRecorded={(uri) => {
                  setAudioUri(uri);
                }}
              />

              <Pressable
                onPress={handleSubmit(onFormSubmit)}
                disabled={isSubmitting || !location}
                style={({ pressed }) => [
                  styles.submitBtn,
                  pressed && !isSubmitting && styles.submitBtnPressed,
                  (isSubmitting || !location) && styles.submitBtnDisabled,
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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: MapColors.overlayBackground,
  },
  sheet: {
    backgroundColor: MapColors.sheetBackground,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 18,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    maxHeight: "88%",
  },
  sheetContent: {
    paddingBottom: 28,
  },
  title: {
    color: MapColors.primary,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
  locationText: {
    fontSize: 13,
    color: MapColors.primary,
    marginBottom: 12,
    textAlign: "center",
  },
  hint: {
    fontSize: 12,
    color: MapColors.submitButton,
    marginBottom: 12,
    width: "100%",
  },
  errorHint: {
    color: AppColors.error,
  },
  input: {
    borderWidth: 1,
    padding: 14,
    borderColor: MapColors.pageBackground,
    borderRadius: 8,
    marginBottom: 8,
    minHeight: 100,
    textAlignVertical: "top",
    width: "100%",
    backgroundColor: MapColors.sheetBackground,
  },
  inputError: {
    borderColor: AppColors.error,
  },
  errorText: {
    width: "100%",
    fontSize: 12,
    color: AppColors.error,
    marginBottom: 16,
  },
  submitBtn: {
    backgroundColor: MapColors.submitButton,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
    marginTop: 8,
  },
  submitBtnPressed: {
    backgroundColor: MapColors.primary,
    opacity: 0.9,
  },
  submitBtnDisabled: {
    opacity: 0.7,
  },
  submitText: {
    color: MapColors.sheetBackground,
    fontWeight: "600",
    fontSize: 16,
  },
  evidenceLabel: {
    textAlign: "center",
    color: MapColors.supportText,
    marginBottom: 12,
  },
  evidenceRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 16,
  },
  evidenceBtn: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  borderWidth: 1,
  borderColor: MapColors.primary,
  borderRadius: 12,
  paddingVertical: 12,
  paddingHorizontal: 22,
  backgroundColor: MapColors.sheetBackground,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 4,
  elevation: 2,
},
  evidenceBtnPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
  evidenceBtnText: {
    color: MapColors.primary,
    fontSize: 14,
  },
  reportImage: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: MapColors.pageBackground,
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
    justifyContent: "center",
  },
  imageBox: {
    width: 95,
    height: 95,
    borderRadius: 12,
    position: "relative",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  removeImageButton: {
    position: "absolute",
    top: -7,
    right: -7,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: AppColors.error,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ReportSheet;
