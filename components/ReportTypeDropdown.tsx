import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { RadioButton } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  open: boolean;
  reportType: string;
  onToggle: () => void;
  onSelect: (value: string) => void;
};

export default function ReportTypeDropdown({
  open,
  reportType,
  onToggle,
  onSelect,
}: Props) {
  return (
    <>
      <Pressable style={styles.dropdown} onPress={onToggle}>
        <Text style={styles.dropdownText}>{reportType}</Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={22}
          color="#2B5C73"
        />
      </Pressable>

      {open && (
        <View style={styles.menuBox}>
          <RadioButton.Group onValueChange={onSelect} value={reportType}>
            <Pressable style={styles.item} onPress={() => onSelect("Harassment")}>
              <RadioButton value="Harassment" />
              <Text style={styles.itemText}>Harassment</Text>
            </Pressable>

            <Pressable
              style={styles.item}
              onPress={() => onSelect("Physical violence")}
            >
              <RadioButton value="Physical violence" />
              <Text style={styles.itemText}>Physical violence</Text>
            </Pressable>

            <Pressable style={styles.item} onPress={() => onSelect("Verbal abuse")}>
              <RadioButton value="Verbal abuse" />
              <Text style={styles.itemText}>Verbal abuse</Text>
            </Pressable>
          
             <Pressable style={styles.item} onPress={() => onSelect("Other")}>
              <RadioButton value="Other" />
              <Text style={styles.itemText}>Other</Text>
            </Pressable>
          </RadioButton.Group>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: 58,
    borderWidth: 1.5,
    borderColor: "#B7C5CC",
    borderRadius: 18,
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 17,
    color: "#496878",
  },
  menuBox: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E3E8EB",
    paddingVertical: 10,
    marginBottom: 16,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  itemText: {
    fontSize: 16,
    color: "#496878",
  },
});