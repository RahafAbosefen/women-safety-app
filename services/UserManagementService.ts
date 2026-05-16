import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export type UserReportStatus = "pending" | "approved" | "rejected";
export type UserReportSource = "reports" | "mapReports";

export type UserReport = {
  id: string;
  source: UserReportSource;
  userId?: string;
  userName: string;
  userImage: string;
  userEmail?: string;
  reportType: string;
  details: string;
  status: UserReportStatus;
  imageUrls: string[];
  audioUri: string | null;
  createdAt?: unknown;
};

const mapReportDocument = (
  id: string,
  source: UserReportSource,
  data: any,
): UserReport => {
  return {
    id,
    source,
    userId: data.userId || "",
    userName: data.userName || data.userEmail || "Unknown user",
    userImage: data.userImage || "",
    userEmail: data.userEmail || "",
    reportType: data.reportType || "Report",
    details: data.details || "",
    status: data.status || "pending",
    imageUrls: data.imageUrls || [],
    audioUri: data.audioUri || data.audioUrl || null,
    createdAt: data.createdAt,
  };
};

export const fetchPendingUserReports = async (): Promise<UserReport[]> => {
  const reportsQuery = query(
    collection(db, "reports"),
    where("status", "==", "pending"),
  );

  const mapReportsQuery = query(
    collection(db, "mapReports"),
    where("status", "==", "pending"),
  );

  const [reportsSnapshot, mapReportsSnapshot] = await Promise.all([
    getDocs(reportsQuery),
    getDocs(mapReportsQuery),
  ]);

  const reports = reportsSnapshot.docs.map((document) =>
    mapReportDocument(document.id, "reports", document.data()),
  );

  const mapReports = mapReportsSnapshot.docs.map((document) =>
    mapReportDocument(document.id, "mapReports", document.data()),
  );

  return [...reports, ...mapReports];
};

export const approveUserReport = async (report: UserReport) => {
  const reportRef = doc(db, report.source, report.id);

  await updateDoc(reportRef, {
    status: "approved",
    reviewedAt: new Date(),
  });
};

export const rejectUserReport = async (report: UserReport) => {
  const reportRef = doc(db, report.source, report.id);

  await deleteDoc(reportRef);
};
