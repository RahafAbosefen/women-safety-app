import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { auth, db } from "@/services/firebaseConfig";

type AppNotification = {
  id: string;
  title: string;
  body: string;
  type?: "sos" | "report" | "mapReport" | "general";
  read?: boolean;
  createdAt?: any;
};

const screenWidth = Dimensions.get("window").width;
const panelWidth = Math.min(screenWidth * 0.88, 390);

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let unsubscribeNotifications: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setNotifications([]);
        return;
      }

      const notificationsQuery = query(
        collection(db, "notifications"),
        where("userId", "==", user.uid)
      );

      unsubscribeNotifications = onSnapshot(
        notificationsQuery,
        (snapshot) => {
          const list = snapshot.docs.map((docItem) => ({
            id: docItem.id,
            ...docItem.data(),
          })) as AppNotification[];

          const sortedList = list.sort((a, b) => {
            const aTime = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
            const bTime = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;

            return bTime - aTime;
          });

          setNotifications(sortedList);
        },
        (error) => {
          console.log("Notifications error:", error);
        }
      );
    });

    return () => {
      unsubscribeAuth();

      if (unsubscribeNotifications) {
        unsubscribeNotifications();
      }
    };
  }, []);

  const unreadCount = notifications.filter((item) => !item.read).length;
  const hasUnread = unreadCount > 0;

  const getIconName = (type?: string) => {
    if (type === "sos") return "warning-outline";
    if (type === "report") return "document-text-outline";
    if (type === "mapReport") return "map-outline";

    return "notifications-outline";
  };

  const getNotificationLabel = (type?: string) => {
    if (type === "sos") return "Emergency";
    if (type === "report") return "Report";
    if (type === "mapReport") return "Map report";

    return "Update";
  };

  const formatTime = (createdAt: any) => {
    if (!createdAt?.toDate) return "";

    const date = createdAt.toDate();

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await updateDoc(doc(db, "notifications", notificationId), {
        read: true,
      });
    } catch (error) {
      console.log("Mark notification as read error:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter((item) => !item.read);

      await Promise.all(
        unreadNotifications.map((item) =>
          updateDoc(doc(db, "notifications", item.id), {
            read: true,
          })
        )
      );
    } catch (error) {
      console.log("Mark all notifications as read error:", error);
    }
  };

  const openNotifications = async () => {
    setVisible(true);

    if (hasUnread) {
      await markAllAsRead();
    }
  };

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.notificationButton,
          pressed && styles.pressed,
        ]}
        onPress={openNotifications}
      >
        <Ionicons name="notifications-outline" size={23} color="#204E64" />

        {hasUnread && (
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>
              {unreadCount > 9 ? "9+" : unreadCount}
            </Text>
          </View>
        )}
      </Pressable>

      <Modal transparent visible={visible} animationType="fade">
        <View style={styles.overlay}>
          <Pressable
            style={styles.dismissArea}
            onPress={() => setVisible(false)}
          />

          <View style={[styles.panel, { width: panelWidth }]}>
            <View style={styles.panelHandle} />

            <View style={styles.header}>
              <View>
                <Text style={styles.title}>Notifications</Text>
                <Text style={styles.subtitle}>
                  {notifications.length === 0
                    ? "No updates yet"
                    : `${notifications.length} saved update${
                        notifications.length > 1 ? "s" : ""
                      }`}
                </Text>
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.closeButton,
                  pressed && styles.pressed,
                ]}
                onPress={() => setVisible(false)}
              >
                <Ionicons name="close" size={22} color="#204E64" />
              </Pressable>
            </View>

            {notifications.length > 0 && (
              <View style={styles.summaryCard}>
                <View style={styles.summaryIcon}>
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={22}
                    color="#204E64"
                  />
                </View>

                <View style={styles.summaryTextWrapper}>
                  <Text style={styles.summaryTitle}>You’re updated</Text>
                  <Text style={styles.summaryText}>
                    Important safety actions will appear here.
                  </Text>
                </View>
              </View>
            )}

            {notifications.length === 0 ? (
              <View style={styles.emptyContainer}>
                <View style={styles.emptyIconCircle}>
                  <Ionicons
                    name="notifications-outline"
                    size={46}
                    color="#B8C7CF"
                  />
                </View>

                <Text style={styles.emptyTitle}>No notifications yet</Text>

                <Text style={styles.emptyText}>
                  SOS, reports, and map updates will show up here.
                </Text>
              </View>
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
              >
                {notifications.map((item) => (
                  <Pressable
                    key={item.id}
                    style={({ pressed }) => [
                      styles.notificationItem,
                      !item.read && styles.unreadNotificationItem,
                      pressed && styles.pressed,
                    ]}
                    onPress={() => markAsRead(item.id)}
                  >
                    <View style={styles.iconCircle}>
                      <Ionicons
                        name={getIconName(item.type)}
                        size={22}
                        color="#204E64"
                      />
                    </View>

                    <View style={styles.textWrapper}>
                      <View style={styles.itemTopRow}>
                        <Text style={styles.itemLabel}>
                          {getNotificationLabel(item.type)}
                        </Text>

                        {!!formatTime(item.createdAt) && (
                          <Text style={styles.timeText}>
                            {formatTime(item.createdAt)}
                          </Text>
                        )}
                      </View>

                      <Text style={styles.itemTitle}>{item.title}</Text>
                      <Text style={styles.itemBody}>{item.body}</Text>
                    </View>

                    {!item.read && <View style={styles.unreadDot} />}
                  </Pressable>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  notificationButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    position: "relative",
    borderWidth: 1,
    borderColor: "#EEF2F5",
  },
  notificationBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#D9534F",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
  notificationBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "900",
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.99 }],
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(17, 24, 39, 0.38)",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  dismissArea: {
    flex: 1,
  },
  panel: {
    height: "100%",
    backgroundColor: "#F8F8F8",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    paddingTop: 18,
    paddingHorizontal: 18,
    paddingBottom: 24,
    elevation: 14,
    borderLeftWidth: 1,
    borderColor: "#EEF2F5",
  },
  panelHandle: {
    alignSelf: "center",
    width: 42,
    height: 5,
    borderRadius: 99,
    backgroundColor: "#D9E3E8",
    marginBottom: 18,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#204E64",
    letterSpacing: -0.4,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#64748B",
    fontWeight: "600",
  },
  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#EEF2F5",
  },

  summaryCard: {
    backgroundColor: "#EAF2F5",
    borderRadius: 22,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#D8E8EE",
  },
  summaryIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  summaryTextWrapper: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#204E64",
    marginBottom: 2,
  },
  summaryText: {
    fontSize: 12,
    color: "#64748B",
    lineHeight: 17,
  },

  listContent: {
    paddingBottom: 20,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 13,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EEF2F5",
  },
  unreadNotificationItem: {
    backgroundColor: "#EAF2F5",
    borderColor: "#D8E8EE",
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#EEF2F5",
  },
  textWrapper: {
    flex: 1,
  },
  itemTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  itemLabel: {
    fontSize: 11,
    fontWeight: "900",
    color: "#B1848D",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  timeText: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "700",
    marginLeft: 8,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#204E64",
    marginBottom: 3,
  },
  itemBody: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 18,
  },
  unreadDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#D9534F",
    marginLeft: 8,
    marginTop: 8,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  emptyIconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#EAF2F5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#D8E8EE",
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#204E64",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#94A3B8",
    textAlign: "center",
    lineHeight: 21,
  },
});                                                            