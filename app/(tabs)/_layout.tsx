import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFFFFF",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 18,
          color: "#204E64",
        },
        headerRight: () => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="notifications-outline"
              size={24}
              style={{ marginRight: 15 }}
            />
          </View>
        ),
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#204E64",
        tabBarInactiveTintColor: "#A0A0A0",
        tabBarStyle: {
          position: "absolute",
          bottom: 10,
          left: 20,
          right: 20,
          height: 70,
          borderRadius: 35,
          backgroundColor: "#F5F5F5",
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,

          title: "Aura",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="addReport"
        options={{
          headerShown: false,
          title: "Add Report",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "add-circle" : "add-circle-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "map" : "map-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="contact-us"
        options={{
          title: "Contact Us",
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="case-status"
        options={{
          title: "Case Status",
          tabBarButton: () => null,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="messages"
        options={{
          headerShown: false,

          title: "Messages",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="users-management"
        options={{
          title: "Users",
          tabBarIcon: ({ color }) => (
            <Ionicons name="people-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
