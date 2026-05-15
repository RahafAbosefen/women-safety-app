import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

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

    updateUserProfile: async (uid: string, data: any) => {
  try {
    await setDoc(
      doc(db, "users", uid),
      {
        ...data,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Firestore Error (Update):", error);
    throw error;
  }
},

getCompanies: async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));

    return querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((user: any) => user.role === "company");
  } catch (error) {
    console.error("Firestore Error (Get Companies):", error);
    throw error;
  }
},

};
