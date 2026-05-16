import { FormInput } from "@/components/ui/FormInput";
import { useForm } from "react-hook-form";
import TimePickerField from "@/components/ui/TimePickerField";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { UsersService } from "@/services/UsersService";
import { Stack } from "expo-router";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useMediaManager } from "@/hooks/useMediaManager";
import { MediaPickerModal } from "@/components/ui/MediaPickerModal";
import { CompanyDropdown } from "@/components/ui/CompanyDropdown";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type FormData = {
  companyName: string;
  email: string;
  phoneNumber: string;
  companyDescription: string;
  companyLocation: string;
  serviceType: string;
  emergencyPhone: string;
  serviceStartTime: string;
  serviceEndTime: string;
  companyImage?: string;
};

const locationOptions = ["Ramallah", "Nablus", "Hebron", "Jenin", "Bethlehem"];

const serviceTypeOptions = [
  "Emergency Rescue",
  "Psychological Support",
  "Legal Support",
  "Shelter Service",
  "Medical Assistance",
];

export default function CompanyProfile() {
  const { control, handleSubmit, setValue, watch, reset } = useForm<FormData>({
    mode: "all",
  });

  const companyImage = watch("companyImage");

  const media = useMediaManager((uri) => {
    setValue("companyImage", uri, { shouldDirty: true });
  });

  const selectedLocation = watch("companyLocation");
  const selectedServiceType = watch("serviceType");

  const [startTime, setStartTime] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);

  const [endTime, setEndTime] = useState(new Date());
  const [showEndPicker, setShowEndPicker] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const auth = getAuth();
      const uid = auth.currentUser?.uid;

      if (uid) {
        const data = await UsersService.getUserProfile(uid);

        if (data) {
          reset(data as FormData);

          if (data.serviceStartTime) {
            setStartTime(new Date(data.serviceStartTime));
          }

          if (data.serviceEndTime) {
            setEndTime(new Date(data.serviceEndTime));
          }
        }
      }
    };

    fetchProfile();
  }, [reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const auth = getAuth();
      const uid = auth.currentUser?.uid;
      if (uid) {
        await UsersService.updateUserProfile(uid, data);
        alert("تم الحفظ بنجاح!");
      }
    } catch {
      alert("حدث خطأ، حاولي مرة أخرى");
    }
  };

  const handleStartTimeChange = (event: any, selectedTime?: Date) => {
    setShowStartPicker(false);
    if (selectedTime) {
      setStartTime(selectedTime);
      setValue("serviceStartTime", selectedTime.toISOString(), {
        shouldValidate: true,
      });
    }
  };
  const handleEndTimeChange = (event: any, selectedTime?: Date) => {
    setShowEndPicker(false);

    if (selectedTime) {
      setEndTime(selectedTime);
      setValue("serviceEndTime", selectedTime.toISOString(), {
        shouldValidate: true,
      });
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Company Profile",
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerTintColor: "#2D2340",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />
      <SafeAreaView style={styles.container}>
        <MediaPickerModal
          visible={media.visible}
          title="Company Logo"
          hasImage={Boolean(companyImage)}
          onCamera={media.openCamera}
          onGallery={media.openGallery}
          onRemove={() => setValue("companyImage", "", { shouldDirty: true })}
          onClose={media.closeModal}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.imageContainer}>
              <Pressable onPress={media.openModal}>
                {companyImage ? (
                  <Image
                    source={{ uri: companyImage }}
                    style={styles.companyImage}
                  />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <Ionicons
                      name="business-outline"
                      size={36}
                      color="#7B4DDB"
                    />
                  </View>
                )}
              </Pressable>

              <Pressable style={styles.cameraButton} onPress={media.openCamera}>
                <Ionicons name="camera" size={18} color="#FFFFFF" />
              </Pressable>
            </View>
            <FormInput
              icon="business-outline"
              label="company Name:"
              control={control}
              name="companyName"
              rules={{ required: "Company Name is required" }}
              placeholder="Enter your company Name"
            />
            <FormInput
              icon="mail-outline"
              label="Email:"
              control={control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              }}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
            <FormInput
              icon="call-outline"
              label="Phone:"
              control={control}
              name="phoneNumber"
              rules={{ required: "Phone is required" }}
              placeholder="Enter your Phone"
              keyboardType="phone-pad"
            />
            <FormInput
              icon="document-text-outline"
              label="Company Description:"
              control={control}
              name="companyDescription"
              rules={{ required: "Company description is required" }}
              placeholder="Enter your companyDescription"
              multiline
              numberOfLines={4}
              style={{
                minHeight: 70,
                textAlignVertical: "top",
              }}
            />
            <FormInput
              icon="alert-circle-outline"
              label="Emergency Phone:"
              control={control}
              name="emergencyPhone"
              rules={{ required: "Emergency phone is required" }}
              placeholder="Enter emergency phone"
              keyboardType="phone-pad"
            />

            <CompanyDropdown
              label="Company Location"
              icon="location-outline"
              options={locationOptions}
              selectedValue={selectedLocation}
              onSelect={(value) =>
                setValue("companyLocation", value, { shouldValidate: true })
              }
            />

            <CompanyDropdown
              label="Service Type"
              icon="shield-checkmark-outline"
              options={serviceTypeOptions}
              selectedValue={selectedServiceType}
              onSelect={(value) =>
                setValue("serviceType", value, { shouldValidate: true })
              }
            />
            <TimePickerField
              label="Service Start Time"
              value={startTime}
              show={showStartPicker}
              onOpen={() => setShowStartPicker(true)}
              onChange={handleStartTimeChange}
            />

            <TimePickerField
              label="Service End Time"
              value={endTime}
              show={showEndPicker}
              onOpen={() => setShowEndPicker(true)}
              onChange={handleEndTimeChange}
            />

            <Pressable
              onPress={handleSubmit(onSubmit)}
              style={({ pressed }) => [
                styles.button,
                pressed && { opacity: 0.7 },
              ]}
            >
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    padding: 20,
    paddingBottom: 120,
  },
  button: {
    backgroundColor: "#7B4DDB",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  imageContainer: {
    alignSelf: "center",
    marginBottom: 20,
    position: "relative",
  },
  companyImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  imagePlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#F4F0FF",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#7B4DDB",
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
});
