import { StyleSheet } from "react-native";
import { AppColors } from "@/constants/theme";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: AppColors.primary,
    marginBottom: 20,
  },
  card: {
    backgroundColor: AppColors.card,
    borderRadius: 40,
    padding: 30,
    width: "85%",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: AppColors.primary,
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
  },
  passwordContainer: {
    width: "100%",
    position: "relative",
    justifyContent: "center",
  },
  eyeButton: {
    position: "absolute",
    right: 14,
    top: 0,
    bottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: AppColors.error,
    fontSize: 12,
    marginBottom: 10,
  },
  loginError: {
    color: AppColors.error,
    fontSize: 13,
    marginBottom: 10,
    textAlign: "center",
  },
  backButton: {
    marginTop: 15,
  },
  backText: {
    color: AppColors.primary,
    fontSize: 14,
    fontWeight: "600",
  },
});