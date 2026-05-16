import { StyleSheet } from "react-native";
import { AppColors } from "@/constants/theme";

export const archiveCasesStyles = StyleSheet.create({
  headerContainer: {
    paddingTop: 35,
    paddingHorizontal: 37,
    marginBottom: 20,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },

  archiveCard: {
    borderRadius: 28,
    paddingVertical: 24,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 18,
  },

  archiveName: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },

  reportTag: {
    alignSelf: "flex-start",
    backgroundColor: "#F3F0FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginBottom: 8,
  },

  reportTagText: {
    color: "#6D5BD0",
    fontWeight: "700",
    fontSize: 14,
  },

  resolvedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  resolvedText: {
    color: "#6B7280",
    fontSize: 15,
    fontWeight: "600",
  },

  detailsButton: {
    backgroundColor: AppColors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },

  detailsButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
});