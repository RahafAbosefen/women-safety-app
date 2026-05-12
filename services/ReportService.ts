import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";

export type ReportType = {
  userId: string;
  userEmail: string;
  reportType: string;
  details: string;
  location: {
    latitude: number; 
    longitude: number;
  } | null;
  imageUrls: string[];
  // audioUrl: string | null;
  createdAt: Date;
};

export const addReport = async (report: ReportType) => {
  const docRef = await addDoc(collection(db, "reports"), report);
  return docRef;
};