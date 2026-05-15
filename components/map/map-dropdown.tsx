import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { MapColors, AppColors } from "@/constants/theme";
import { incidentOptions } from "@/constants/reportTypes";
import { Ionicons } from "@expo/vector-icons";

type MapDropdownProps = {
  value: string;
  onSelect: (value: string) => void;
  error?: boolean;
};

const MapDropdown = ({ value, onSelect, error = false }: MapDropdownProps) => {
  const [open, setOpen] = useState(false);

  const selectedOption = incidentOptions.find((item) => item.value === value);

  const handleSelect = (value: string) => {
    onSelect(value);
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setOpen((current) => !current)}
        style={({ pressed }) => [
          styles.dropdownButton,
          error && styles.dropdownButtonError,
          pressed && styles.pressedButton,
        ]}
      >
        <View style={styles.selectedContent}>
          {selectedOption && (
            <Ionicons
              name={selectedOption.icon}
              size={18}
              color={MapColors.primary}
            />
          )}

          <Text style={[styles.dropdownText, !value && styles.placeholderText]}>
            {selectedOption?.label || "Incident Type *"}
          </Text>
        </View>

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
              key={item.value}
              onPress={() => handleSelect(item.value)}
              style={({ pressed }) => [
                styles.optionButton,
                index !== incidentOptions.length - 1 && styles.optionBorder,
                value === item.value && styles.selectedOption,
                pressed && styles.pressedOption,
              ]}
            >
              <View style={styles.optionContent}>
                <Ionicons
                  name={item.icon}
                  size={18}
                  color={MapColors.primary}
                />

                <Text style={styles.optionText}>{item.label}</Text>
              </View>
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
  pressedButton: {
    opacity: 0.8,
  },
  pressedOption: {
    opacity: 0.75,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  selectedOption: {
    backgroundColor: MapColors.pageBackground,
  },
  selectedContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default MapDropdown;
