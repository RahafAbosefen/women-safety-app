import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";

export type MapReportType = {
  userId: string;
  userEmail: string;
  userName?: string;
  userImage?: string;
  reportType: string;
  details: string;
  location: {
    latitude: number;
    longitude: number;
  } | null;
  locationName: string;
  imageUrls: string[];
  audioUri: string | null;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
};
export const addReportMap = async (report: MapReportType) => {
  const docRef = await addDoc(collection(db, "mapReports"), report);
  return docRef;
};
