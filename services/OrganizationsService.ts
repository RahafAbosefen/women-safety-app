import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "./firebaseConfig";

const firestoreDb = getFirestore(app);

export const OrganizationsService = {
  getOrganizations: async () => {
  try {
    const snapshot = await getDocs(collection(firestoreDb, "organizations"));
    const organizations = snapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name as string,
      type: doc.data().type as string,
      phone: doc.data().phone as string,
      email: doc.data().email as string,
    }));

    
    return organizations;
  } catch (error) {
    console.error("Firestore Error:", error);
    throw error;
  }
},
};