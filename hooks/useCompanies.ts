import { useQuery } from "@tanstack/react-query";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import app from "@/services/firebaseConfig";

const db = getFirestore(app);

export const useCompanies = () => {
  const { data: companies, isLoading, isError } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const q = query(collection(db, "users"), where("role", "==", "company"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name ,
          type: data.type || "Company",
          email: data.email,
          phone: data.phone || "",
        };
      });
    },
    staleTime: 0,
  });

  return { companies, isLoading, isError };
};