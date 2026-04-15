import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";

export type MapReportType = {
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

export const addReportMap = async (report: MapReportType) => {
  const docRef = await addDoc(collection(db, "mapReport"), report);
  return docRef;
};