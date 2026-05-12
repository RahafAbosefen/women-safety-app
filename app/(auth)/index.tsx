import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function SelectRole() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Who are you?</Text>
      <Text style={styles.subtitle}>Select your account type to continue</Text>

      <Pressable
        style={styles.userButton}
        onPress={() => router.push("/(auth)/signUp?role=user")}
      >
        <Text style={styles.buttonText}>👤 User</Text>
      </Pressable>

      <Pressable
        style={styles.companyButton}
        onPress={() => router.push("/(auth)/signUp?role=company")}
      >
        <Text style={styles.buttonText}>🏢 Company</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/(auth)/login")}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2d4a5e",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    marginBottom: 40,
  },
  userButton: {
    backgroundColor: "#2d4a5e",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 16,
  },
  companyButton: {
    backgroundColor: "#7B4DDB",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    color: "#2d4a5e",
    fontSize: 15,
    textDecorationLine: "underline",
  },
});