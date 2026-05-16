import { useQuery } from "@tanstack/react-query";
import { fetchPendingUserReports } from "@/services/UserManagementService";

export const useUserReports = () => {
  return useQuery({
    queryKey: ["userReports"],
    queryFn: fetchPendingUserReports,
  });
};
