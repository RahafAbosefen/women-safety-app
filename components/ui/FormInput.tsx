import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Controller, Control, FieldValues } from "react-hook-form";

type FormInputProps<T extends FieldValues> = {
  name: string;
  control: Control<T>;
  rules?: any;
  label?: string;
  icon?: keyof typeof Ionicons.glyphMap;
} & TextInputProps;

export function FormInput<T extends FieldValues>({
  name,
  control,
  rules,
  label,
  icon,
  ...inputProps
}: FormInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name as any}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          <View style={[styles.inputBox, error && styles.errorInput]}>
            <View style={styles.row}>
              {icon && (
                <Ionicons
                  name={icon}
                  size={22}
                  color="#7B4DDB"
                  style={styles.icon}
                />
              )}

              <View style={styles.inputContent}>
                {label && <Text style={styles.label}>{label}</Text>}

                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  {...inputProps}
                  placeholderTextColor="#999"
                />
              </View>
            </View>
          </View>

          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  inputBox: {
    borderColor: "#E1DDE8",
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
backgroundColor: "#FAFAFA",  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 14,
  },
  inputContent: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: "#4B4560",
    marginBottom: 4,
  },
  input: {
    fontSize: 17,
    color: "#111111",
    padding: 0,
    minHeight: 28,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});