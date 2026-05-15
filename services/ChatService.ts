import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebaseConfig";

export const ChatService = {
  getOrCreateChat: async ({
    victimId,
    organizationId,
    organizationName,
  }: {
    victimId: string;
    organizationId: string;
    organizationName?: string;
  }) => {
    try {
      const chatsRef = collection(db, "chats");

      const chatsQuery = query(
        chatsRef,
        where("participants", "array-contains", victimId),
        where("organizationId", "==", organizationId)
      );

      const snapshot = await getDocs(chatsQuery);

      if (!snapshot.empty) {
        return snapshot.docs[0].id;
      }

      const newChat = await addDoc(chatsRef, {
        participants: [victimId, organizationId],
        victimId,
        organizationId,
        title: organizationName || "Organization Chat",
        lastMessage: "",
        lastTimestamp: serverTimestamp(),
        createdAt: serverTimestamp(),
      });

      return newChat.id;
    } catch (error) {
      console.error("ChatService Error:", error);
      throw error;
    }
  },
};