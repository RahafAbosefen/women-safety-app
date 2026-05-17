import React, { useState } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Pressable,
  TextInput,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getUserRole, login } from "@/services/AuthService";
import { styles } from "@/styles/Login.styles";

type FormData = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<FormData>({ mode: "all" });

  const [showPassword, setShowPassword] = useState(true);
  const [loginError, setLoginError] = useState("");

  const onSubmit = async (data: FormData) => {
  try {
    setLoginError("");

    const user = await login(data);
    const role = await getUserRole(user.uid);

    const userRole = role === "company" ? "company" : "user";

    await AsyncStorage.removeItem("auth");

    await AsyncStorage.setItem(
      "auth",
      JSON.stringify({
        isLoggedIn: true,
        uid: user.uid,
        email: user.email,
        role: userRole,
      })
    );

    if (userRole === "company") {
      router.replace("/companyTabs" as any);
    } else {
      router.replace("/userTabs" as any);
    }
  } catch (error) {
    console.log(error);
    setLoginError("Email or password is incorrect");
  }

  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <Text style={styles.title}>Welcome back!</Text>
            <Text style={styles.subtitle}>Login to continue</Text>

            <Controller
              control={control}
              name="email"
              rules={{ required: "Email is required" }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <View style={styles.inputContainer}>
                  <View style={styles.inputWrapper}>
                    <View style={styles.iconCircle}>
                      <Ionicons
                        name="mail-outline"
                        size={24}
                        color="#2d4a5e"
                      />
                    </View>

                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Email"
                      placeholderTextColor="#9A9A9A"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      style={styles.textInput}
                    />
                  </View>

                  {error && (
                    <Text style={styles.errorText}>{error.message}</Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{ required: "Password is required" }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <View style={styles.inputContainer}>
                  <View style={styles.inputWrapper}>
                    <View style={styles.iconCircle}>
                      <Ionicons
                        name="lock-closed-outline"
                        size={24}
                        color="#2d4a5e"
                      />
                    </View>

                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Password"
                      placeholderTextColor="#9A9A9A"
                      secureTextEntry={showPassword}
                      style={styles.textInput}
                    />

                    <Pressable
                      style={styles.eyeButton}
                      onPress={() => setShowPassword((prev) => !prev)}
                    >
                      <Ionicons
                        name={showPassword ? "eye-off" : "eye"}
                        size={24}
                        color="#2d4a5e"
                      />
                    </Pressable>
                  </View>

                  {error && (
                    <Text style={styles.errorText}>{error.message}</Text>
                  )}
                </View>
              )}
            />

            {loginError ? (
              <Text style={styles.loginError}>{loginError}</Text>
            ) : null}

            <Pressable
              style={styles.loginButton}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </Pressable>

            <Pressable
              style={styles.backButton}
              onPress={() => router.replace("/(auth)")}
            >
              <Text style={styles.backText}>Back to Welcome</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}