

// import { addDoc, collection } from "firebase/firestore";
// import { db } from "./firebaseConfig";

// export const addReport = async (report: any) => {
//   const docRef = await addDoc(collection(db, "reports"), report);
//   return docRef;
// };

import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";

export type ReportType = {
  reportType: string;
  details: string;
  location: {
    latitude: number;
    longitude: number;
  } | null;
  imageUrls: string[];

  createdAt: Date;
};

export const addReport = async (report: ReportType) => {
  const docRef = await addDoc(collection(db, "reports"), report);
  return docRef;
};