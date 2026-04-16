import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { MapColors, AppColors } from "@/constants/theme";

type MapDropdownProps = {
  value: string;
  onSelect: (value: string) => void;
  error?: boolean;
};

const incidentOptions = [
  { label: "Harassment", icon: "alert-circle" },
  { label: "Physical violence", icon: "shield" },
  { label: "Verbal abuse", icon: "message-circle" },
  { label: "Others", icon: "more-horizontal" },
];

const MapDropdown = ({ value, onSelect, error = false }: MapDropdownProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (item: string) => {
    onSelect(item);
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setOpen(!open)}
        style={[styles.dropdownButton, error && styles.dropdownButtonError]}
      >
        <Text style={[styles.dropdownText, !value && styles.placeholderText]}>
          {value || "Incident Type *"}
        </Text>

        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={20}
          color={MapColors.primary}
        />
      </Pressable>

      {open && (
        <View style={styles.optionsContainer}>
          {incidentOptions.map((item, index) => (
            <Pressable
              key={item.label}
              onPress={() => handleSelect(item.label)}
              style={[
                styles.optionButton,
                index !== incidentOptions.length - 1 && styles.optionBorder,
              ]}
            >
              <Feather
                name={item.icon as any}
                size={16}
                color={MapColors.primary}
              />
              <Text style={styles.optionText}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 8,
  },
  dropdownButton: {
    width: "100%",
    borderWidth: 1,
    borderColor: MapColors.pageBackground,
    borderRadius: 12,
    backgroundColor: MapColors.sheetBackground,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownButtonError: {
    borderColor: AppColors.error,
  },
  dropdownText: {
    fontSize: 14,
    color: MapColors.primary,
    fontWeight: "500",
  },
  placeholderText: {
    color: MapColors.submitButton,
    fontWeight: "400",
  },
  optionsContainer: {
    marginTop: 6,
    backgroundColor: MapColors.sheetBackground,
    borderWidth: 1,
    borderColor: MapColors.pageBackground,
    borderRadius: 12,
    overflow: "hidden",
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: MapColors.sheetBackground,
  },
  optionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: MapColors.pageBackground,
  },
  optionText: {
    fontSize: 14,
    color: MapColors.primary,
  },
});

export default MapDropdown;