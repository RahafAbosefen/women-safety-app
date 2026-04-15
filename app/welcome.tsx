import React from "react";
import { Text, StyleSheet, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function WelcomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Let's Get Started...</Text>

                <Pressable style={styles.googleButton}>
                    <Text style={styles.googleText}>Continue with Google</Text>
                </Pressable>

                <Pressable
                    style={styles.signUpButton}
                       onPress={() => router.push("/signUp")}
                >
                    <Text style={styles.signUpText}>Sign Up</Text>
                </Pressable>

                <Pressable
                    style={styles.loginButton}
                    onPress={() => router.push('/login')}
                >
                    <Text style={styles.loginText}>Login</Text>
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
    card: {
        backgroundColor: '#dde8e8',
        borderRadius: 40,
        padding: 40,
        width: '85%',
        alignItems: 'center',
        gap: 15,
    },
    title: {
        fontSize: 18,
        color: '#2d4a5e',
        marginBottom: 10,
    },
    googleButton: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 12,
        width: '100%',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    googleText: {
        color: '#2d4a5e',
        fontSize: 14,
    },
    signUpButton: {
        backgroundColor: '#2d4a5e',
        borderRadius: 10,
        padding: 12,
        width: '100%',
        alignItems: 'center',
    },
    signUpText: {
        color: 'white',
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: '#8b3a3a',
        borderRadius: 10,
        padding: 12,
        width: '100%',
        alignItems: 'center',
    },
    loginText: {
        color: 'white',
        fontSize: 14,
    },
});
