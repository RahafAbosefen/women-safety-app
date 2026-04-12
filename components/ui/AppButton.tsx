import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

type AppButtonProps = {
    title: string;
    onPress: () => void;
};

export function AppButton({ title, onPress }: AppButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                pressed && { opacity: 0.7 },
            ]}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#2d4a5e',
        borderRadius: 10,
        padding: 15,
        width: 250,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});