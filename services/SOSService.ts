import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";

export type SOSAlertType = {
  userId: string;
  userEmail: string;
  location: {
    latitude: number;
    longitude: number;
  } | null;
  createdAt: Date;
  status: string;
};

export const addSOSAlert = async (alertData: SOSAlertType) => {
  const docRef = await addDoc(collection(db, "sosAlerts"), alertData);
  return docRef;
};