import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { auth, db } from "@/services/firebaseConfig";

type ChatType = {
  id: string;
  title?: string;
  lastMessage?: string;
  lastTimestamp?: any;
  participants?: string[];
  organizationId?: string;
  victimId?: string;
};

const avatarThemes = [
  { bg: "#EAF2F5", text: "#204E64" },
  { bg: "#FBECEF", text: "#B1848D" },
  { bg: "#EAF7F0", text: "#2E7D64" },
  { bg: "#FFF4DF", text: "#B87918" },
  { bg: "#EEF0FF", text: "#5362B8" },
];

export default function MessagesScreen() {
  const [searchText, setSearchText] = useState("");
  const [chats, setChats] = useState<ChatType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeChats: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (unsubscribeChats) {
        unsubscribeChats();
      }

      if (!user) {
        setChats([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      const chatsRef = collection(db, "chats");

      const chatsQuery = query(
        chatsRef,
        where("participants", "array-contains", user.uid)
      );

      unsubscribeChats = onSnapshot(
        chatsQuery,
        (snapshot) => {
          const chatsList: ChatType[] = snapshot.docs.map((docItem) => ({
            id: docItem.id,
            ...docItem.data(),
          })) as ChatType[];

          const sortedChats = chatsList.sort((a, b) => {
            const aTime = a.lastTimestamp?.seconds
              ? a.lastTimestamp.seconds
              : 0;

            const bTime = b.lastTimestamp?.seconds
              ? b.lastTimestamp.seconds
              : 0;

            return bTime - aTime;
          });

          setChats(sortedChats);
          setLoading(false);
        },
        (error) => {
          console.log("Messages screen error:", error);
          setLoading(false);
        }
      );
    });

    return () => {
      unsubscribeAuth();

      if (unsubscribeChats) {
        unsubscribeChats();
      }
    };
  }, []);

  const filteredChats = useMemo(() => {
    const text = searchText.trim().toLowerCase();

    if (!text) return chats;

    return chats.filter((chat) =>
      (chat.title || "").toLowerCase().includes(text)
    );
  }, [searchText, chats]);

  const getInitials = (name: string) => {
    if (!name) return "CH";

    const parts = name.trim().split(" ").filter(Boolean);

    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }

    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  };

  const formatTime = (timestamp: any) => {
    if (!timestamp?.seconds) return "";

    const date = new Date(timestamp.seconds * 1000);

    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getLastMessageText = (lastMessage?: string) => {
    if (!lastMessage || !lastMessage.trim()) {
      return "Start your conversation";
    }

    return lastMessage;
  };

  const openChat = (chat: ChatType) => {
    router.push({
      pathname: "/chat/[chatId]",
      params: {
        chatId: chat.id,
        title: chat.title || "Chat",
      },
    });
  };

  const renderChatItem = ({
    item,
    index,
  }: {
    item: ChatType;
    index: number;
  }) => {
    const theme = avatarThemes[index % avatarThemes.length];

    return (
      <Pressable
        onPress={() => openChat(item)}
        style={({ pressed }) => [
          styles.chatCard,
          pressed && styles.chatCardPressed,
        ]}
      >
        <View style={[styles.avatar, { backgroundColor: theme.bg }]}>
          <Text style={[styles.avatarText, { color: theme.text }]}>
            {getInitials(item.title || "Chat")}
          </Text>
        </View>

        <View style={styles.chatInfo}>
          <View style={styles.topRow}>
            <Text style={styles.chatTitle} numberOfLines={1}>
              {item.title || "Organization"}
            </Text>

            <Text style={styles.chatTime}>
              {formatTime(item.lastTimestamp)}
            </Text>
          </View>

          <View style={styles.messagePill}>
          

            <Text style={styles.lastMessage} numberOfLines={1}>
              {getLastMessageText(item.lastMessage)}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#204E64" />
          <Text style={styles.loadingText}>Loading messages...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View  />

      <View style={styles.headerSection}>
        <View style={styles.headerIcon}>
          <Ionicons name="chatbubbles-outline" size={28} color="#204E64" />
        </View>
        <View>
          <Text style={styles.screenTitle}>Messages</Text>
         
        </View>

        
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={23} color="#9AAAB4" />

        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search organization..."
          placeholderTextColor="#9AAAB4"
          style={styles.searchInput}
        />

        {searchText.length > 0 && (
          <Pressable onPress={() => setSearchText("")}>
            <Ionicons name="close-circle" size={21} color="#B8C7CF" />
          </Pressable>
        )}
      </View>

      {filteredChats.length === 0 ? (
        <View style={styles.emptyCard}>
          <View style={styles.emptyIconWrap}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={42}
              color="#9FB2BC"
            />
          </View>

          <Text style={styles.emptyTitle}>No messages yet</Text>

          <Text style={styles.emptyText}>
            Your conversations with organizations will appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredChats}
          keyExtractor={(item) => item.id}
          renderItem={renderChatItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FA",
    paddingHorizontal: 18,
    paddingTop: 8,
  },


  headerSection: {
    marginTop: 10,
    marginBottom: 25,
    flexDirection: "row",
    alignItems: "center",
   
  },

  screenTitle: {
    fontSize: 34,
    fontWeight: "900",
    color: "#204E64",
    letterSpacing: 0.2,
  },

  screenSubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#8FA1AD",
    lineHeight: 20,
  },

  headerIcon: {
    width: 54,
    height: 54,
   
    alignItems: "center",
    justifyContent: "center",
    
  },

  searchBox: {
    height: 58,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EDF1",
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#204E64",
  },

  listContent: {
    paddingBottom: 130,
  },

  chatCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#EDF1F4",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 14,
    elevation: 3,
  },

  chatCardPressed: {
    opacity: 0.86,
    transform: [{ scale: 0.99 }],
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  avatarText: {
    fontSize: 20,
    fontWeight: "900",
  },

  chatInfo: {
    flex: 1,
    justifyContent: "center",
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  chatTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: "900",
    color: "#204E64",
    marginRight: 10,
  },

  chatTime: {
    fontSize: 13,
    fontWeight: "800",
    color: "#97A6B1",
  },

  messagePill: {
    flexDirection: "row",
    alignItems: "center",
   
    paddingHorizontal: 10,
    paddingVertical: 7,
    alignSelf: "flex-start",
    maxWidth: "100%",
  },

  lastMessage: {
    marginLeft: 6,
    fontSize: 14,
    color: "#667784",
    lineHeight: 18,
    maxWidth: "92%",
  },

  emptyCard: {
    marginTop: 30,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#EDF1F4",
    paddingVertical: 54,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 14,
    elevation: 3,
  },

  emptyIconWrap: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#EEF4F7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#204E64",
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 14,
    color: "#90A0AA",
    textAlign: "center",
    lineHeight: 21,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 12,
    color: "#8FA1AD",
    fontSize: 14,
    fontWeight: "700",
  },
});