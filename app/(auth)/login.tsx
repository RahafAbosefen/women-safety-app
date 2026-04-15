import React, { useState } from "react";
import {Text,StyleSheet,View,KeyboardAvoidingView,ScrollView,Platform,Pressable,} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { login } from "@/services/AuthService";
import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";

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

      await login(data);

      router.replace('/(tabs)');

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
        >
          <Text style={styles.title}>Welcome back!</Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Login</Text>

      
            <Controller
              control={control}
              name="email"
              rules={{ required: "Email is required" }}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <View style={styles.inputContainer}>
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
                <View style={styles.inputContainer}>
                  <View style={styles.passwordContainer}>
                    <AppInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Password"
                      secureTextEntry={showPassword}
                    />

                    <Pressable
                      style={styles.eyeButton}
                      onPress={() => setShowPassword(prev => !prev)}
                    >
                      <Ionicons
                          name={showPassword ? "eye-off" : "eye"}
                        size={22}
                        color="#2d4a5e"
                      />
                    </Pressable>
                  </View>

                  {error && <Text style={styles.errorText}>{error.message}</Text>}
                </View>
              )}
            />

            {loginError ? (
              <Text style={styles.loginError}>{loginError}</Text>
            ) : null}

            <AppButton title="Login" onPress={handleSubmit(onSubmit)} />

            <Pressable
              style={styles.backButton}
              onPress={() => router.replace('/(auth)')}
            >
              <Text style={styles.backText}>Back to Welcome</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
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
  inputContainer: {
    width: '100%',
  },
  passwordContainer: {
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
  },
  eyeButton: {
    position: 'absolute',
    right: 14,
    top: 0,
    bottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  loginError: {
    color: 'red',
    fontSize: 13,
    marginBottom: 10,
    textAlign: 'center',
  },
  backButton: {
    marginTop: 15,
  },
  backText: {
    color: '#2d4a5e',
    fontSize: 14,
    fontWeight: '600',
  },
});