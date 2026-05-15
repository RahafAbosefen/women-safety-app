import { useQuery } from "@tanstack/react-query";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import app from "@/services/firebaseConfig";

const db = getFirestore(app);

export type Company = {
  id: string;
  name: string;
  type: string;
  email: string;
  phone: string;
};

const getCompanies = async (): Promise<Company[]> => {
  try {
    const q = query(collection(db, "users"), where("role", "==", "company"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || data.email,
        type: data.type || "Company",
        email: data.email || "",
        phone: data.phone || "",
      };
    });
  } catch (error) {
    console.log("Get companies error:", error);
    throw error;
  }
};

export const useCompanies = () => {
  const { data: companies, isLoading, isError } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
    staleTime: 0,
  });

  return { companies, isLoading, isError };
};