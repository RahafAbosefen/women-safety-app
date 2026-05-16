import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { auth } from "@/services/firebaseConfig";
import { getUserRole } from "@/services/AuthService";

export default function WelcomeScreen() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const role = await getUserRole(user.uid);
        if (role === "company") {
          router.replace("/companyTabs" as any);
        } else {
          router.replace("/userTabs" as any);
        }
      } else {
        setCheckingAuth(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (checkingAuth)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2d4a5e" />
      </View>
    );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Who are you?</Text>

        <Text style={styles.subtitle}>
          Select your account type to continue
        </Text>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    padding: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2d4a5e",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
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
    textAlign: "center",
  },
});
