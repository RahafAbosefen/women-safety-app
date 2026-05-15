import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Keyboard,
  Image,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams, Stack } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Audio } from "expo-av";

import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { auth, db } from "../../services/firebaseConfig";
import { CloudinaryService } from "@/services/CloudinaryService";
import { MediaPickerModal } from "@/components/ui/MediaPickerModal";

type MessageType = "text" | "image" | "audio";

type Message = {
  id: string;
  type?: MessageType;
  text?: string;
  imageUrl?: string;
  audioUrl?: string;
  senderId: string;
  createdAt?: any;
};

export default function ChatScreen() {
  const { chatId, title } = useLocalSearchParams<{
    chatId: string;
    title?: string;
  }>();

  const currentUser = auth.currentUser;
  const flatListRef = useRef<FlatList<Message>>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(true);

  const [isSendingMedia, setIsSendingMedia] = useState(false);
  const [mediaModalVisible, setMediaModalVisible] = useState(false);

  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  useEffect(() => {
    if (!chatId) return;

    const messagesRef = collection(db, "chats", chatId, "messages");
    const messagesQuery = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(
      messagesQuery,
      (snapshot) => {
        const list: Message[] = snapshot.docs.map((docItem) => ({
          id: docItem.id,
          ...docItem.data(),
        })) as Message[];

        setMessages(list);
        setLoading(false);

        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      },
      (error) => {
        console.log("Messages error:", error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [chatId]);

  const updateChatLastMessage = async (lastMessage: string) => {
    if (!chatId) return;

    await updateDoc(doc(db, "chats", chatId), {
      lastMessage,
      lastTimestamp: serverTimestamp(),
    });
  };

  const openMediaModal = () => {
    setMediaModalVisible(true);
  };

  const closeMediaModal = () => {
    setMediaModalVisible(false);
  };

  const sendImageToChat = async (imageUri: string) => {
    try {
      if (!currentUser || !chatId) return;

      setIsSendingMedia(true);

      const imageUrl = await CloudinaryService.uploadImage(imageUri);

      await addDoc(collection(db, "chats", chatId, "messages"), {
        type: "image",
        imageUrl,
        senderId: currentUser.uid,
        createdAt: serverTimestamp(),
      });

      await updateChatLastMessage("📷 Photo");

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.log("Send image error:", error);
      Alert.alert("Error", "Could not send image.");
    } finally {
      setIsSendingMedia(false);
    }
  };

  const openCamera = async () => {
    try {
      if (!currentUser || !chatId) return;

      const permission = await ImagePicker.requestCameraPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Permission needed", "Please allow camera access.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.8,
      });

      closeMediaModal();

      if (result.canceled) return;

      await sendImageToChat(result.assets[0].uri);
    } catch (error) {
      console.log("Camera error:", error);
      Alert.alert("Error", "Could not take photo.");
      setIsSendingMedia(false);
    }
  };

  const openGallery = async () => {
    try {
      if (!currentUser || !chatId) return;

      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Permission needed", "Please allow photo access.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.8,
        allowsMultipleSelection: false,
      });

      closeMediaModal();

      if (result.canceled) return;

      await sendImageToChat(result.assets[0].uri);
    } catch (error) {
      console.log("Gallery error:", error);
      Alert.alert("Error", "Could not pick image.");
      setIsSendingMedia(false);
    }
  };

  const sendTextMessage = async () => {
    if (!messageText.trim()) return;
    if (!currentUser || !chatId) return;

    const textToSend = messageText.trim();

    setMessageText("");
    Keyboard.dismiss();

    try {
      await addDoc(collection(db, "chats", chatId, "messages"), {
        type: "text",
        text: textToSend,
        senderId: currentUser.uid,
        createdAt: serverTimestamp(),
      });

      await updateChatLastMessage(textToSend);

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.log("Send message error:", error);
      Alert.alert("Error", "Could not send message.");
    }
  };

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Permission needed", "Please allow microphone access.");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const newRecording = new Audio.Recording();

      await newRecording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      await newRecording.startAsync();
      setRecording(newRecording);
    } catch (error) {
      console.log("Start recording error:", error);
      Alert.alert("Error", "Could not start recording.");
    }
  };

  const stopRecordingAndSend = async () => {
    try {
      if (!recording || !currentUser || !chatId) return;

      setIsSendingMedia(true);

      await recording.stopAndUnloadAsync();

      const audioUri = recording.getURI();
      setRecording(null);

      if (!audioUri) {
        Alert.alert("Error", "Audio was not recorded.");
        return;
      }

      const audioUrl = await CloudinaryService.uploadAudio(audioUri);

      await addDoc(collection(db, "chats", chatId, "messages"), {
        type: "audio",
        audioUrl,
        senderId: currentUser.uid,
        createdAt: serverTimestamp(),
      });

      await updateChatLastMessage("🎤 Voice message");

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.log("Send audio error:", error);
      Alert.alert("Error", "Could not send audio.");
    } finally {
      setIsSendingMedia(false);
      setRecording(null);
    }
  };

  const playAudio = async (audioUrl: string, messageId: string) => {
    try {
      setPlayingAudioId(messageId);

      const { sound } = await Audio.Sound.createAsync({
        uri: audioUrl,
      });

      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setPlayingAudioId(null);
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log("Play audio error:", error);
      setPlayingAudioId(null);
      Alert.alert("Error", "Could not play audio.");
    }
  };

  const renderMessageContent = (item: Message, isMine: boolean) => {
    const messageType = item.type || "text";

    if (messageType === "image" && item.imageUrl) {
      return (
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.chatImage}
          resizeMode="cover"
        />
      );
    }

    if (messageType === "audio" && item.audioUrl) {
      const isPlaying = playingAudioId === item.id;

      return (
        <Pressable
          style={styles.audioBubbleContent}
          onPress={() => playAudio(item.audioUrl!, item.id)}
        >
          <View
            style={[
              styles.audioPlayCircle,
              isMine && styles.myAudioPlayCircle,
            ]}
          >
            <Ionicons
              name={isPlaying ? "volume-high-outline" : "play-outline"}
              size={19}
              color={isMine ? "#204E64" : "#FFFFFF"}
            />
          </View>

          <Text
            style={[
              styles.audioText,
              isMine ? styles.myMessageText : styles.messageText,
            ]}
          >
            Voice message
          </Text>
        </Pressable>
      );
    }

    return (
      <Text style={[styles.messageText, isMine && styles.myMessageText]}>
        {item.text}
      </Text>
    );
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isMine = item.senderId === currentUser?.uid;
    const isImage = item.type === "image";

    return (
      <View
        style={[
          styles.messageBubble,
          isImage && styles.imageMessageBubble,
          isMine ? styles.myMessage : styles.otherMessage,
        ]}
      >
        {renderMessageContent(item, isMine)}
      </View>
    );
  };

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />

        <View style={styles.center}>
          <ActivityIndicator size="large" color="#204E64" />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={25} color="#204E64" />
          </Pressable>

          <View style={styles.headerAvatar}>
            <Ionicons name="business-outline" size={22} color="#204E64" />
          </View>

          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {title || "Chat"}
            </Text>
            <Text style={styles.headerSubtitle}>Private conversation</Text>
          </View>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />

        {isSendingMedia && (
          <View style={styles.uploadingBar}>
            <ActivityIndicator size="small" color="#204E64" />
            <Text style={styles.uploadingText}>Sending...</Text>
          </View>
        )}

        <View style={styles.inputRow}>
          <Pressable
            style={styles.mediaButton}
            onPress={openMediaModal}
            disabled={isSendingMedia || Boolean(recording)}
          >
            <Ionicons name="add-outline" size={24} color="#204E64" />
          </Pressable>

          <TextInput
            style={styles.input}
            placeholder="Write a message..."
            placeholderTextColor="#8FA1AD"
            value={messageText}
            onChangeText={setMessageText}
            multiline
          />

          <Pressable
            style={[styles.micButton, recording && styles.recordingButton]}
            onPress={recording ? stopRecordingAndSend : startRecording}
            disabled={isSendingMedia}
          >
            <Ionicons
              name={recording ? "stop-outline" : "mic-outline"}
              size={21}
              color="#fff"
            />
          </Pressable>

          <Pressable
            style={styles.sendButton}
            onPress={sendTextMessage}
            disabled={isSendingMedia}
          >
            <Ionicons name="send" size={21} color="#fff" />
          </Pressable>
        </View>

        <MediaPickerModal
          visible={mediaModalVisible}
          title="Send Image"
          hasImage={false}
          onCamera={openCamera}
          onGallery={openGallery}
          onRemove={() => {}}
          onClose={closeMediaModal}
        />
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    paddingTop: 54,
    paddingBottom: 14,
    paddingHorizontal: 18,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    marginRight: 10,
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  headerAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#EAF2F5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#204E64",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },

  messagesList: {
    padding: 16,
    paddingBottom: 24,
    flexGrow: 1,
  },
  messageBubble: {
    maxWidth: "76%",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginBottom: 10,
  },
  imageMessageBubble: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#204E64",
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "#EEF2F5",
  },
  messageText: {
    color: "#204E64",
    fontSize: 15,
    lineHeight: 20,
  },
  myMessageText: {
    color: "#fff",
  },

  chatImage: {
    width: 210,
    height: 210,
    borderRadius: 13,
    backgroundColor: "#E5E7EB",
  },

  audioBubbleContent: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 170,
  },
  audioPlayCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#204E64",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },
  myAudioPlayCircle: {
    backgroundColor: "#FFFFFF",
  },
  audioText: {
    fontSize: 15,
    fontWeight: "700",
  },

  uploadingBar: {
    marginHorizontal: 14,
    marginBottom: 8,
    backgroundColor: "#EAF2F5",
    borderRadius: 14,
    paddingVertical: 9,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  uploadingText: {
    color: "#204E64",
    fontSize: 13,
    fontWeight: "700",
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: Platform.OS === "ios" ? 22 : 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    gap: 8,
  },
  mediaButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#EAF2F5",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D8E8EE",
  },
  input: {
    flex: 1,
    minHeight: 46,
    maxHeight: 110,
    borderWidth: 1.4,
    borderColor: "#B8C7CF",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 11,
    color: "#204E64",
    backgroundColor: "#fff",
    fontSize: 15,
  },
  micButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#B1848D",
    alignItems: "center",
    justifyContent: "center",
  },
  recordingButton: {
    backgroundColor: "#D9534F",
  },
  sendButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#204E64",
    alignItems: "center",
    justifyContent: "center",
  },

  center: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
  },
});