import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native"; // 🟢 تم إضافة StyleSheet هنا

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
        },tabBarItemStyle: {
          height: 60,
          alignItems: "center",
          justifyContent: "center",
        },tabBarIconStyle: {
          marginTop: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} activeName="home" inactiveName="home-outline" />
          ),
        }}
      />

      <Tabs.Screen
        name="addReport"
        options={{
          title: "Report",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} activeName="add-circle" inactiveName="add-circle-outline" />
          ),
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} activeName="map" inactiveName="map-outline" />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} activeName="person" inactiveName="person-outline" />
          ),
        }}
      />

      <Tabs.Screen 
        name="company-details/[id]" 
        options={{ 
          href: null,
          tabBarButton: () => null, 
          headerShown: false
        }} 
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconBox: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  activeIconBox: {
    backgroundColor: ACTIVE_BG,
  },
});