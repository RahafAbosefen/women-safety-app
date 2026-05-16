import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

const ACTIVE_COLOR = "#204E64";
const INACTIVE_COLOR = "#9AAAB4";
const ACTIVE_BG = "#EAF2F5";

type IconName = keyof typeof Ionicons.glyphMap;

function TabIcon({
  focused,
  activeName,
  inactiveName,
}: {
  focused: boolean;
  activeName: IconName;
  inactiveName: IconName;
}) {
  return (
    <View style={[styles.iconBox, focused && styles.activeIconBox]}>
      <Ionicons
        name={focused ? activeName : inactiveName}
        size={focused ? 27 : 25}
        color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
      />
    </View>
  );
}

export default function UserTabLayout() {
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
          headerShown: false,
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
          title: "Report",
          headerShown: false,
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
          headerShown: false,
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
        name="contact-us"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
