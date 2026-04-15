import { getFirestore, doc, setDoc } from "firebase/firestore";
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
  
};
