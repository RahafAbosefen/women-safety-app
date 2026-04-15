import React, { useState } from 'react';
import { MapColors, AppColors } from '@/constants/theme';
import MapDropdown from "@/components/map/map-dropdown";
import EvidenceSection from "@/components/EvidenceSection";
import {
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
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { auth } from '@/services/firebaseConfig';
import { addReportMap } from '@/services/ReportMapService';
import { Controller, useForm } from 'react-hook-form';

type ReportSheetProps = {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

type ReportFormData = {
  reportType: string;
  details: string;
};

const ReportSheet = ({ isVisible, onSubmit, onClose }: ReportSheetProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

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
      reportType: '',
      details: '',
    },
    mode: 'onSubmit',
  });

  const selectedIncident = watch('reportType');

  const handlePickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permission required', 'Please allow access to your photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.7,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      const selectedUri = result.assets[0].uri;
      setImages((prev) => [...prev, selectedUri]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required.');
        return null;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };

      setLocation(coords);
      return coords;
    } catch (error) {
      console.log(error);
      Alert.alert('Location error', 'Could not get current location.');
      return null;
    }
  };

  const onFormSubmit = async (data: ReportFormData) => {
    Keyboard.dismiss();

    if (!data.reportType) {
      setError('reportType', {
        type: 'manual',
        message: 'Select the type that best describes the incident',
      });
      return;
    }

    try {
      const user = auth.currentUser;

      if (!user) {
        Alert.alert('User not logged in');
        return;
      }

      let currentCoords = location;

      if (!currentCoords) {
        currentCoords = await getCurrentLocation();
      }

      await addReportMap({
        userId: user.uid,
        userEmail: user.email || '',
        reportType: data.reportType,
        details: data.details,
        location: currentCoords,
        imageUrls: images,
        createdAt: new Date(),
      });

      reset({
        reportType: '',
        details: '',
      });
      setImages([]);
      setLocation(null);

      onSubmit();
    } catch (error: any) {
      console.log('Firestore error:', error);
      Alert.alert('Error', error.message || 'Could not save report.');
    }
  };

  return (
    <Modal visible={isVisible} animationType='slide' transparent onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
                  required: 'Select the type that best describes the incident',
                }}
                render={() => (
                  <>
                    <MapDropdown
                      value={selectedIncident}
                      onSelect={(value) => {
                        setValue('reportType', value, { shouldValidate: true });
                        clearErrors('reportType');
                      }}
                      error={!!errors.reportType}
                    />

                    <Text style={[styles.hint, errors.reportType && styles.errorHint]}>
                      Select the type that best describes the incident
                    </Text>
                  </>
                )}
              />

              <Controller
                control={control}
                name="details"
                rules={{
                  required: 'Please describe the incident in more detail',
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[styles.input, errors.details && styles.inputError]}
                    placeholder="Share details if you feel comfortable"
                    placeholderTextColor={MapColors.submitButton}
                    multiline
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />

              {errors.details && (
                <Text style={styles.errorText}>
                  {errors.details.message}
                </Text>
              )}

              <EvidenceSection
                images={images}
                onPickImage={handlePickImage}
                onRemoveImage={handleRemoveImage}
              />

              <Pressable
                onPress={handleSubmit(onFormSubmit)}
                style={({ pressed }) => [
                  styles.submitBtn,
                  pressed && styles.submitBtnPressed
                ]}
              >
                <Text style={styles.submitText}>Submit Report</Text>
              </Pressable>
            </ScrollView>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sheet: {
    backgroundColor: MapColors.sheetBackground,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 18,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    maxHeight: '88%',
  },
  sheetContent: {
    paddingBottom: 28,
  },
  title: {
    color: MapColors.primary,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  hint: {
    fontSize: 12,
    color: MapColors.submitButton,
    marginBottom: 12,
    width: '100%',
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
    textAlignVertical: 'top',
    width: '100%',
    backgroundColor: MapColors.sheetBackground,
  },
  inputError: {
    borderColor: AppColors.error,
  },
  errorText: {
    width: '100%',
    fontSize: 12,
    color: AppColors.error,
    marginBottom: 16,
  },
  submitBtn: {
    backgroundColor: MapColors.submitButton,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
  },
  submitText: {
    color: MapColors.sheetBackground,
    fontWeight: '600',
    fontSize: 16,
  },
  submitBtnPressed: {
    backgroundColor: MapColors.primary,
    opacity: 0.9,
  },
});

export default ReportSheet;