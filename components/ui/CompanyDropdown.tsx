import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type CompanyDropdownProps = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  options: string[];
  selectedValue?: string;
  onSelect: (value: string) => void;
};

export function CompanyDropdown({
  label,
  icon,
  options,
  selectedValue,
  onSelect,
}: CompanyDropdownProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <View>
      <Pressable
        style={styles.container}
        onPress={() => setOpen(!open)}
      >
        <Ionicons name={icon} size={28} color="#7B4DDB" />

        <View style={styles.textContainer}>
          <Text style={styles.label}>{label}</Text>
         <Text
  style={[
    styles.value,
    !selectedValue && styles.placeholder,
  ]}
>
  {selectedValue || "Choose option"}
</Text>
        </View>

        <Ionicons name="chevron-down-outline" size={22} color="#7B4DDB" />
      </Pressable>

      {open && (
        <View style={styles.optionsBox}>
          {options.map((option) => (
            <Pressable
              key={option}
              style={styles.optionItem}
              onPress={() => {
                onSelect(option);
                setOpen(false);
              }}
            >
              <Text style={styles.optionText}>{option}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#E1DDE8",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  textContainer: {
    flex: 1,
  },

  label: {
    fontSize: 14,
    color: "#4B4560",
    marginBottom: 4,
  },

  value: {
    fontSize: 17,
    color: "#010503",
  },
placeholder: {
  color: "#B8B2C6",
},
  optionsBox: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E1DDE8",
    borderRadius: 14,
    marginTop: -8,
    marginBottom: 14,
    overflow: "hidden",
  },

  optionItem: {
    padding: 14,
  },

  optionText: {
    fontSize: 16,
    color: "#2D2340",
  },
});