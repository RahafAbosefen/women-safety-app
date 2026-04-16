import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

type AppInputProps = TextInputProps & {
    error?: boolean;
};

export function AppInput({ error, style, ...props }: AppInputProps) {
    return (
        <TextInput
            style={[styles.input, error && styles.errorInput, style]}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 12,
        paddingRight: 45,
        width: '100%',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    errorInput: {
        borderColor: 'red',
    },
});