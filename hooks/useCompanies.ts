import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "@/services/firebaseConfig";

export type Company = {
  id: string;
  uid: string;
  userId: string;

  name: string;
  type: string;
  email: string;
  phone: string;
  role: string;

  organizationName?: string;
  fullName?: string;
  category?: string;
};

const getCompanies = async (): Promise<Company[]> => {
  try {
    const usersRef = collection(db, "users");

    const companiesQuery = query(
      usersRef,
      where("role", "==", "company")
    );

    const snapshot = await getDocs(companiesQuery);

    const companies: Company[] = snapshot.docs.map((docItem) => {
      const data: any = docItem.data();

      const companyName =
        data.name ||
        data.organizationName ||
        data.fullName ||
        "Company";

      const companyType =
        data.type ||
        data.category ||
        "Support company";

      return {
        id: docItem.id,
        uid: docItem.id,
        userId: docItem.id,

        name: companyName,
        type: companyType,
        email: data.email || "",
        phone: data.phone || "",
        role: data.role || "",

        organizationName: data.organizationName || "",
        fullName: data.fullName || "",
        category: data.category || "",
      };
    });

    return companies;
  } catch (error) {
    console.log("Get companies error:", error);
    throw error;
  }
};

export const useCompanies = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });

  return {
    companies: data || [],
    isLoading,
    isError,
    error,
    refetch,
  };
};