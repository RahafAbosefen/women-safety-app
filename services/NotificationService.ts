import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db } from "@/services/firebaseConfig";
import { UsersService } from "./UsersService";

type NotificationType = "sos" | "report" | "mapReport" | "general";

export const NotificationService = {
  setup: () => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  },

  requestPermissions: async () => {
    NotificationService.setup();

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return false;
    }

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#204E64",
      });
    }

    return true;
  },

  showLocalNotification: async ({
    title,
    body,
  }: {
    title: string;
    body: string;
  }) => {
    const hasPermission = await NotificationService.requestPermissions();

    if (!hasPermission) return;

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
      },
      trigger: null,
    });
  },

  saveInAppNotification: async ({
    userId,
    title,
    body,
    type = "general",
  }: {
    userId: string;
    title: string;
    body: string;
    type?: NotificationType;
  }) => {
    await addDoc(collection(db, "notifications"), {
      userId,
      title,
      body,
      type,
      read: false,
      createdAt: serverTimestamp(),
    });
  },

  notifyUser: async ({
    userId,
    title,
    body,
    type = "general",
  }: {
    userId: string;
    title: string;
    body: string;
    type?: NotificationType;
  }) => {
    const user = await UsersService.getUserProfile(userId);

    await NotificationService.saveInAppNotification({
      userId,
      title,
      body,
      type,
    });

    if (user?.isNotificationsEnabled) {
      await NotificationService.showLocalNotification({
        title,
        body,
      });
    }
  },
};
