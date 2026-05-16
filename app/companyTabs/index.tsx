import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import {  Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function CompanyIndex() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Company Dashboard",
          headerStyle: { backgroundColor: "#7B4DDB" },
          headerTintColor: "#FFFFFF",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome, Company!</Text>
        <Text style={styles.subtitle}>
          Manage your profile, services, and monitor reports all in one place.
        </Text>

        <View style={styles.buttonsRow}>
          <Pressable style={styles.cardButton}>
            <Ionicons name="person-outline" size={30} color="#7B4DDB" />
            <Text style={styles.cardText}>Profile</Text>
            
          </Pressable>

          <Pressable style={styles.cardButton}>
            <Ionicons name="shield-checkmark-outline" size={30} color="#7B4DDB" />
            <Text style={styles.cardText}>Services</Text>
          </Pressable>

          <Pressable style={styles.cardButton}>
            <Ionicons name="document-text-outline" size={30} color="#7B4DDB" />
            <Text style={styles.cardText}>Reports</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F0FF",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  welcome: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2D2340",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#4B4560",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 22,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  cardButton: {
    backgroundColor: "#FFFFFF",
    width: 100,
    height: 120,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    marginHorizontal: 8,
  },
  cardText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    color: "#2D2340",
  },
});