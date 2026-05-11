import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "./firebaseConfig";

const db = getFirestore(app);

export const OrganizationsService = {
  getOrganizations: async () => {
    try {
      const snapshot = await getDocs(collection(db, "organizations"));
      const organizations = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return organizations;
    } catch (error) {
      console.error("Firestore Error:", error);
      throw error;
    }
  },
};