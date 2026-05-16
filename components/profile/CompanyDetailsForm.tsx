import React from "react";
import { View, Pressable, Text } from "react-native";
import { FormInput } from "@/components/ui/FormInput";
import { CompanyDropdown } from "@/components/profile/CompanyDropdown";
import TimePickerField from "./TimePickerField";
import { styles } from '../../styles/CompanyProfile'; 
const locationOptions = ["Ramallah", "Nablus", "Hebron", "Jenin", "Bethlehem"];
const serviceTypeOptions = [
  "Emergency Rescue",
  "Psychological Support",
  "Legal Support",
  "Shelter Service",
  "Medical Assistance",
];

export const CompanyDetailsForm = ({
  control,
  isEditing,
  setValue,
  selectedLocation,
  selectedServiceType,
  startTime,
  endTime,
  showStartPicker,
  showEndPicker,
  setShowStartPicker,
  setShowEndPicker,
  handleStartTimeChange,
  handleEndTimeChange,
  onSave,
}: any) => {
  return (
    <View style={styles.formContainer}>
      <FormInput
        icon="business-outline"
        label="Company Name:"
        control={control}
        name="companyName"
        rules={{ required: "Company Name is required" }}
        placeholder="Enter your company Name"
        editable={isEditing}
      />
      <FormInput
        icon="mail-outline"
        label="Email:"
        control={control}
        name="email"
        rules={{ required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" } }}
        placeholder="Enter your email"
        keyboardType="email-address"
        editable={isEditing}
      />
      <FormInput
        icon="call-outline"
        label="Phone:"
        control={control}
        name="phoneNumber"
        rules={{ required: "Phone is required" }}
        placeholder="Enter your Phone"
        keyboardType="phone-pad"
        editable={isEditing}
      />
      <FormInput
        icon="document-text-outline"
        label="Company Description:"
        control={control}
        name="companyDescription"
        rules={{ required: "Company description is required" }}
        placeholder="Enter your company description"
        multiline
        numberOfLines={4}
        style={{ minHeight: 70, textAlignVertical: "top" }}
        editable={isEditing}
      />
      <FormInput
        icon="alert-circle-outline"
        label="Emergency Phone:"
        control={control}
        name="emergencyPhone"
        rules={{ required: "Emergency phone is required" }}
        placeholder="Enter emergency phone"
        keyboardType="phone-pad"
        editable={isEditing}
      />

      <CompanyDropdown
        label="Company Location"
        icon="location-outline"
        options={locationOptions}
        selectedValue={selectedLocation}
        onSelect={(value) => isEditing && setValue("companyLocation", value, { shouldValidate: true })}
      />
      <CompanyDropdown
        label="Service Type"
        icon="shield-checkmark-outline"
        options={serviceTypeOptions}
        selectedValue={selectedServiceType}
        onSelect={(value) => isEditing && setValue("serviceType", value, { shouldValidate: true })}
      />

      <TimePickerField
        label="Service Start Time"
        value={startTime}
        show={showStartPicker}
        onOpen={() => isEditing && setShowStartPicker(true)}
        onChange={handleStartTimeChange}
      />
      <TimePickerField
        label="Service End Time"
        value={endTime}
        show={showEndPicker}
        onOpen={() => isEditing && setShowEndPicker(true)}
        onChange={handleEndTimeChange}
      />

      {isEditing && (
        <Pressable onPress={onSave} style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      )}
    </View>
  );
};