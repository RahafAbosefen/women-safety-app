import React from "react";
import { StyleSheet, View } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const ACTIVE_COLOR = "#571d1d";
const INACTIVE_COLOR = "rgb(66, 5, 5), 154, 154)";
const ACTIVE_BG = "#f2e3e3";

export default function CompanyTabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,

        tabBarStyle: {
          height: 78,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#EEF2F5",
          paddingTop: 8,
          paddingBottom: 10,

          elevation: 10,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 10,
          shadowOffset: {
            width: 0,
            height: -2,
          },
        },

        tabBarItemStyle: {
          height: 60,
          alignItems: "center",
          justifyContent: "center",
        },

        tabBarIconStyle: {
          marginTop: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconBox, focused && styles.activeIconBox]}>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="users-management"
        options={{
          title: "Users",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconBox, focused && styles.activeIconBox]}>
              <Ionicons
                name={focused ? "people" : "people-outline"}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="CompanyProfile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconBox, focused && styles.activeIconBox]}>
              <Ionicons
                name={focused ? "business" : "business-outline"}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconBox, focused && styles.activeIconBox]}>
              <Ionicons
                name={focused ? "chatbubbles" : "chatbubbles-outline"}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen name="CasesList" options={{ href: null }} />
      <Tabs.Screen name="case-status" options={{ href: null }} />
      <Tabs.Screen name="archive-cases" options={{ href: null }} />

      <Tabs.Screen
        name="company-details/[id]"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  activeIconBox: {
    backgroundColor: ACTIVE_BG,
  },
});