import React from "react";
import { useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { FormInput } from "@/components/ui/FormInput";
import { signUp } from "@/services/AuthService";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
};

export default function SignUp() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<FormData>({ mode: "all" });
  const params = useLocalSearchParams();
  const role = typeof params.role === "string" ? params.role : "user";

  const onSubmit = async (data: FormData) => {
    try {
      const user = await signUp({
        ...data,
        role,
      });

      console.log("Success:", user);
      alert("Registration successful!");

      if (role === "company") {
        router.replace("/CompanyProfile");
      } else {
        router.replace("/(tabs)");
      }
    } catch (error: any) {
      console.error("Sign Up Error:", error);
      alert("Something went wrong, please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <Text style={styles.title}>Sign Up</Text>
          <View style={styles.card}>
            <FormInput
              label="First Name"
              icon="person-outline"
              control={control}
              name="firstName"
              rules={{ required: "First Name is required" }}
              placeholder="Enter your firstName"
            />

            <FormInput
              label="Last Name:"
              icon="people-outline"
              control={control}
              name="lastName"
              rules={{ required: "Last Name is required" }}
              placeholder="Enter your lastName"
            />

            <FormInput
              label="Email:"
              control={control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              }}
              placeholder="Enter your email"
              keyboardType="email-address"
              icon="mail-outline"
            />

            <FormInput
              label="Password:"
              control={control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              icon="lock-closed-outline"
              placeholder="Enter your password"
              secureTextEntry
            />

            <FormInput
              label="Phone:"
              control={control}
              name="phone"
              rules={{ required: "Phone is required" }}
              placeholder="Enter your Phone"
              icon="business-outline"
              keyboardType="phone-pad"
            />

            <Pressable
              onPress={handleSubmit(onSubmit)}
              style={({ pressed }) => [
                styles.button,
                pressed && { opacity: 0.7 },
              ]}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  card: {
    marginTop: 30,
    backgroundColor: "#dde8e8",
    borderRadius: 40,
    padding: 30,
    width: "100%",
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: "bold",
    color: "#2d4a5e",
    textAlign: "center",
    marginBottom: 0,
  },
  button: {
    backgroundColor: "#2d4a5e",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
