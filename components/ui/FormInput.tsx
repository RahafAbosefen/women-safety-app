import React from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TextInputProps,
} from "react-native";
import { Controller, Control, FieldValues } from "react-hook-form";

type FormInputProps<T extends FieldValues> = {
    name: string;
    control: Control<T>;
    rules?: any;
    label?: string;
} & TextInputProps;

export function FormInput<T extends FieldValues>({
     name,
     control,
     rules,
     label,
     ...inputProps
 }: FormInputProps<T>) {
    return (
        <Controller
            control={control}
            name={name as any}
            rules={rules}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <View style={styles.container}>
                    {label && <Text style={styles.label}>{label}</Text>}
                    <TextInput
                        style={[styles.input, error && styles.errorInput]}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        {...inputProps}
                                            placeholderTextColor="#999"

                    />
                    {error && (
                        <Text style={styles.errorText}>{error.message}</Text>
                    )}
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: "center",
  },
    label: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 8,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 20,
    fontSize: 16,
    backgroundColor: "#fff",
  },
   errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
   
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2d4a5e",
    textAlign: "center",
    marginBottom: 30,
  },
});

