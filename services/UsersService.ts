import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import app from "./firebaseConfig";

const db = getFirestore(app);

export const UsersService = {
  createUserProfile: async (uid: string, data: any) => {
    try {
      await setDoc(doc(db, "users", uid), {
        ...data,
        createdAt: new Date().toISOString(),
      });
      
    } catch (error) {
      console.error("Firestore Error:", error);
      throw error;
    }
  },
  getUserProfile: async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        console.log("No such user!");
        return null;
      }
    } catch (error) {
      console.error("Firestore Error (Get):", error);
      throw error;
    }
  },
};
