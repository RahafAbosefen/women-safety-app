import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";

export type ReportStatus = "pending" | "approved" | "rejected";

export type ReportLocation = {
  latitude: number;
  longitude: number;
};

export type ReportType = {
  userId: string;
  userEmail: string;
  userName?: string;
  userImage?: string;
  reportType: string;
  details: string;
  location: ReportLocation | null;
  imageUrls: string[];
  audioUrl: string | null;
  status: ReportStatus;
  createdAt: Date;
};

export type MapReportType = {
  userId: string;
  userEmail: string;
  userName?: string;
  userImage?: string;
  reportType: string;
  details: string;
  location: ReportLocation | null;
  locationName: string;
  imageUrls: string[];
  audioUri: string | null;
  status: ReportStatus;
  createdAt: Date;
};

export const addReport = async (report: ReportType) => {
  const docRef = await addDoc(collection(db, "reports"), report);
  return docRef;
};

export const addReportMap = async (report: MapReportType) => {
  const docRef = await addDoc(collection(db, "mapReports"), report);
  return docRef;
};