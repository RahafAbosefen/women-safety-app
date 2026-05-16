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
    await setDoc(doc(db, "users", uid), {
      ...data,
      createdAt: new Date().toISOString(),
    });
  },

  getUserProfile: async (uid: string) => {
    const userDoc = await getDoc(doc(db, "users", uid));

    if (userDoc.exists()) {
      return userDoc.data();
    }

    return null;
  },

  updateUserProfile: async (uid: string, data: any) => {
    await setDoc(
      doc(db, "users", uid),
      {
        ...data,
        updatedAt: new Date().toISOString(),
      },
      { merge: true },
    );
  },

  getCompanies: async () => {
    const querySnapshot = await getDocs(collection(db, "users"));

    return querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((user: any) => user.role === "company");
  },
};
