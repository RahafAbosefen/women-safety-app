import React from "react";
import { Text, StyleSheet, Pressable, View, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from "react-hook-form";
import { sendContactMessage } from "@/api/UsersService";

type FormData = {
    name: string;
    email: string;
    message: string;
};

export default function ContactUsScreen() {
    const { control, handleSubmit } = useForm<FormData>({ mode: "all" });

    const onSubmit = async (data: FormData) => {
    try {
        await sendContactMessage(data);
        alert('Message sent successfully!');
    } catch (error) {
        alert('Something went wrong');
    }
};

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Contact Us</Text>

            <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Name"
                    />
                )}
            />

            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                )}
            />

            <Controller
                control={control}
                name="message"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={[styles.input, styles.messageInput]}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Message"
                        multiline={true}
                    />
                )}
            />

            <Pressable
                onPress={handleSubmit(onSubmit)}
                style={({ pressed }) => [
                    styles.button,
                    pressed && { opacity: 0.7 },
                ]}
            >
                <Text style={styles.buttonText}>Send</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2d4a5e',
        marginBottom: 20,
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 12,
        width: '100%',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    messageInput: {
        height: 120,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#2d4a5e',
        borderRadius: 10,
        padding: 15,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});