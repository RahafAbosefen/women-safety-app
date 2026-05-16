import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  label: string;
  value: Date;
  show: boolean;
  onOpen: () => void;
  onChange: (event: any, selectedTime?: Date) => void;
};

export default function TimePickerField({
  label,
  value,
  show,
  onOpen,
  onChange,
}: Props) {
  return (
    <View>
      <Pressable style={styles.timeBox} onPress={onOpen}>
        <Ionicons name="time-outline" size={28} color="#9EA2AE" />

        <View>
          <Text style={styles.timeLabel}>{label}</Text>
          <Text style={styles.timeValue}>{value.toLocaleTimeString()}</Text>
        </View>
      </Pressable>

      {show && (
        <DateTimePicker
          value={value}
          mode="time"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  timeBox: {
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

  timeLabel: {
    fontSize: 14,
    color: "#4B4560",
    marginBottom: 4,
  },

  timeValue: {
    fontSize: 17,
    color: "#2D2340",
  },
});