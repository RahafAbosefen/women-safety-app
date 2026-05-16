import { StyleSheet } from "react-native";
import { AppColors } from "@/constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingTop: 35,
    paddingHorizontal: 24,
    marginBottom: 28,
  },

  title: {
    fontSize: 30,
    fontWeight: "900",
    color: AppColors.primary,
  },

  userCard: {
    backgroundColor: "#fff",
    marginHorizontal: 24,
    borderRadius: 30,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 24,
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },

  profileIconBox: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#EEF3F4",
    justifyContent: "center",
    alignItems: "center",
  },

  userInfo: {
    flex: 1,
  },

  userName: {
    fontSize: 22,
    fontWeight: "800",
    color: AppColors.primary,
    marginBottom: 10,
  },

  reportTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 12,
    marginBottom: 10,
  },

  reportTagText: {
    fontSize: 15,
    fontWeight: "700",
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  statusText: {
    color: "#6B7280",
    fontSize: 16,
    fontWeight: "600",
  },

  detailsBox: {
    marginTop: 22,
    backgroundColor: "#F8FAFB",
    borderRadius: 20,
    padding: 18,
  },

  detailsTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: AppColors.primary,
    marginBottom: 10,
  },

  detailsText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#6B7280",
  },

  sectionCard: {
    backgroundColor: "#fff",
    marginHorizontal: 24,
    borderRadius: 30,
    padding: 24,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: AppColors.primary,
    marginBottom: 20,
  },

  progressRow: {
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  progressText: {
    fontSize: 18,
    color: "#445468",
    fontWeight: "600",
  },

  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  priorityItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  priorityText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#445468",
  },

  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#B8C7CF",
    alignItems: "center",
    justifyContent: "center",
  },

  radioSelected: {
    borderColor: AppColors.primary,
  },

  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: AppColors.primary,
  },

  updateButton: {
    marginHorizontal: 24,
    backgroundColor: AppColors.primary,
    paddingVertical: 20,
    borderRadius: 24,
    alignItems: "center",
    marginBottom: 40,
  },

  updateButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});