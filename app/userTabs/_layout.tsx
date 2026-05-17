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
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              activeName="home"
              inactiveName="home-outline"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="addReport"
        options={{
          title: "Report",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              activeName="add-circle"
              inactiveName="add-circle-outline"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              activeName="map"
              inactiveName="map-outline"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              activeName="person"
              inactiveName="person-outline"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              activeName="chatbubbles"
              inactiveName="chatbubbles-outline"
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

       <Tabs.Screen
        name="company-details/[id]"
        options={{
          href: null,
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