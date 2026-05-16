import { useQuery } from "@tanstack/react-query";
import { fetchMyReports } from "@/services/reportsService";
import StorageService from "@/services/StorageService";
import { useRouter } from "expo-router";
import { REPORT_CONFIG } from "@/constants/reportConfig";

export const useMyReports = () => {
  return useQuery({
    queryKey: ["myReports"],
    queryFn: async () => {
      const user = await StorageService.getUser();
      return fetchMyReports(user.uid);
    },
  });
};

export const useReportCard = (reportType: string) => {
  const router = useRouter();
  const getIcon = () => {
    return REPORT_CONFIG[reportType]?.icon ?? REPORT_CONFIG.Other.icon;
  };

  const getIconColor = () => {
    return REPORT_CONFIG[reportType]?.color ?? REPORT_CONFIG.Other.color;
  };

  const goToDetails = (id: string, source: string) => {
    router.push({
      pathname: "/report-details/[id]",
      params: { id, source },
    });
  };

  return { getIcon, getIconColor, goToDetails };
};
