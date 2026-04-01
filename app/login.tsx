import React from "react";
import {
    Text,
    StyleSheet,
    Pressable,
    View,
    TextInput,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { login } from "@/api/UsersService";

type FormData = {
    email: string;
    password: string;
};

export default function LoginScreen() {
    const { control, handleSubmit } = useForm<FormData>({ mode: "all" });


const onSubmit = async (data: FormData) => {
    try {
        const response = await login(data);
        const users = response.data;
        const user = users.find((u: any) => u.password === data.password);
        if (user) {
            router.push('/(tabs)');
        } else {
            alert('Invalid email or password');
        }
    } catch (error) {
        alert('Something went wrong');
    }
};


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>welcome back!</Text>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Login</Text>

                <Controller
                    control={control}
                    name="email"
                    rules={{ required: "Email is required" }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <View>
                            <TextInput
                                style={[styles.input, error && styles.errorInput]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            {error && <Text style={styles.errorText}>{error.message}</Text>}
                        </View>
                    )}
                />

                <Controller
                    control={control}
                    name="password"
                    rules={{ required: "Password is required" }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <View>
                            <TextInput
                                style={[styles.input, error && styles.errorInput]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Password"
                                secureTextEntry={true}
                            />
                            {error && <Text style={styles.errorText}>{error.message}</Text>}
                        </View>
                    )}
                />

                <Text style={styles.forgotPassword}>Forgot your password?</Text>

                <Pressable
                    onPress={handleSubmit(onSubmit)}
                    style={({ pressed }) => [
                        styles.button,
                        pressed && { opacity: 0.7 },
                    ]}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2d4a5e',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#dde8e8',
        borderRadius: 40,
        padding: 30,
        width: '85%',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2d4a5e',
        marginBottom: 20,
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 12,
        width: 250,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
    },
    forgotPassword: {
        color: '#8b3a3a',
        fontSize: 12,
        alignSelf: 'flex-end',
        marginBottom: 20,
        fontStyle: 'italic',
    },
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