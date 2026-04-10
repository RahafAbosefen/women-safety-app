// import { error } from "console";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function SignUp() {
  const { control, handleSubmit } = useForm<FormData>({ mode: "all" });
  const onSubmit = (data: any) => {
    console.log(data);
  };

  type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
};

  return (
    <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
    <ScrollView>
      <Text style={styles.title}>Sign Up</Text>
<View style={styles.card}>

      <Text style={styles.label}>First Name:</Text>
      <Controller
        control={control}
        name="firstName"
        rules={{ required: "First Name is required" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <TextInput
              style={[styles.input, error && styles.errorInput]}
              value={value}
              onChangeText={onChange}
              placeholder="Enter your firstName"
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        )}
      />
      <Text style={styles.label}>Last Name:</Text>
      <Controller
        control={control}
        name="lastName"
        rules={{ required: "Last Name is required" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <TextInput
              style={[styles.input, error && styles.errorInput]}
              value={value}
              onChangeText={onChange}
              placeholder="Enter your lastName"
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        )}
      />
      <Text style={styles.label}>Email:</Text>
      <Controller
        control={control}
        name="email"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email address",
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <TextInput
              style={[styles.input, error && styles.errorInput]}
              value={value}
              onChangeText={onChange}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        )}
      />
      <Text style={styles.label}>Password:</Text>
      <Controller
        control={control}
        name="password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <TextInput
              style={[styles.input, error && styles.errorInput]}
              value={value}
              onChangeText={onChange}
              secureTextEntry
              placeholder="Enter your password"
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        )}
      />
      <Text style={styles.label}>Phone:</Text>
      <Controller
        control={control}
        name="phone"
        rules={{ required: "Phone is required" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <TextInput
              style={[styles.input, error && styles.errorInput]}
              value={value}
              onChangeText={onChange}
              placeholder="Phone"
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        )}
      />
      </View>
      <Pressable onPress={handleSubmit(onSubmit)} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
       </ScrollView>
  </KeyboardAvoidingView>
</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5", 
  },
  card: {
  backgroundColor: "#dde8e8",
  borderRadius: 40,
  padding: 30,
  width: "100%",
},
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2d4a5e", 
    textAlign: "center",
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 8,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 20,
    fontSize: 16,
    backgroundColor: "#fff",
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
