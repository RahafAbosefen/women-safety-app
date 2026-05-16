import { StyleSheet } from "react-native";
import { AppColors } from "@/constants/theme";

export const casesListStyles = StyleSheet.create({
  headerContainer: {
    paddingTop: 35,
    paddingHorizontal: 37,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  archiveButton: {
    borderWidth: 1.5,
    borderColor: AppColors.primary,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  archiveButtonText: {
    color: AppColors.primary,
    fontWeight: "700",
    fontSize: 15,
  },
  caseCard: {
    borderRadius: 28,
    paddingVertical: 24,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 18,
  },
  caseName: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },
  tag: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginBottom: 8,
  },
  tagText: {
    fontWeight: "700",
    fontSize: 14,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusText: {
    color: "#6B7280",
    fontSize: 15,
    fontWeight: "600",
  },
  statusButton: {
    backgroundColor: AppColors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  statusButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
});