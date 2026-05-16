import { StyleSheet } from "react-native";
import { AppColors } from "@/constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  header: {
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: AppColors.primary,
  },
  mapContainer: {
    height: 200,
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
  },
  map: {
    flex: 1,
  },
  sectionCard: {
    backgroundColor: AppColors.white,
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: AppColors.primary,
    marginBottom: 15,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: AppColors.primary,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
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
  radioLabel: {
    fontSize: 15,
    color: AppColors.text,
  },
  confirmButton: {
    backgroundColor: AppColors.primary,
    marginHorizontal: 20,
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  confirmButtonPressed: {
    opacity: 0.7,
  },
  confirmButtonText: {
    color: AppColors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.background,
  },
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: AppColors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  successText: {
    fontSize: 20,
    fontWeight: "bold",
    color: AppColors.primary,
    marginBottom: 40,
  },
  backButton: {
    backgroundColor: AppColors.primary,
    paddingHorizontal: 40,
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    color: AppColors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});