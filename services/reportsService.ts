import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export const fetchMapReports = async () => {
  const snapshot = await getDocs(collection(db, "mapReports"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    source: "mapReports" as const,
  }));
};

export const fetchReports = async () => {
  const snapshot = await getDocs(collection(db, "reports"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    source: "reports" as const,
  }));
};

export const fetchAllReports = async () => {
  const [mapReports, reports] = await Promise.all([
    fetchMapReports(),
    fetchReports(),
  ]);

  return [...mapReports, ...reports];
};

export const fetchReportById = async (id: string, source: string) => {
  const snapshot = await getDoc(doc(db, source, id));

  if (!snapshot.exists()) {
    throw new Error("Report not found");
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
    source,
  };
};

export const fetchMyReports = async (userId: string) => {
  const q1 = query(collection(db, "reports"), where("userId", "==", userId));
  const q2 = query(collection(db, "mapReports"), where("userId", "==", userId));

  const [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]);

  const reports = snap1.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    source: "reports" as const,
  }));

  const mapReports = snap2.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    source: "mapReports" as const,
  }));

  return [...reports, ...mapReports].sort(
    (a: any, b: any) =>
      b.createdAt?.toDate()?.getTime() - a.createdAt?.toDate()?.getTime(),
  );
};
