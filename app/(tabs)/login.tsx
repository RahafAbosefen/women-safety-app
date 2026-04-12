import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { login } from "@/services/AuthService";
import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";

type FormData = {
    email: string;
    password: string;
};

export default function LoginScreen() {
    const { control, handleSubmit } = useForm<FormData>({ mode: "all" });

    const onSubmit = async (data: FormData) => {
        try {
            const user = await login(data);
            console.log(user);
            router.push('/(tabs)');
        } catch (error) {
            console.log(error);
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
                            <AppInput
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                error={!!error}
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
                            <AppInput
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Password"
                                secureTextEntry={true}
                                error={!!error}
                            />
                            {error && <Text style={styles.errorText}>{error.message}</Text>}
                        </View>
                    )}
                />

                <Text style={styles.forgotPassword}>Forgot your password?</Text>

                <AppButton title="Login" onPress={handleSubmit(onSubmit)} />
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
});