import { StyleSheet } from "react-native";
import { AppColors } from "@/constants/theme";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingVertical: 40,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 34,
    paddingHorizontal: 24,
    paddingVertical: 28,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 5,
  },

  title: {
    fontSize: 28,
    fontWeight: "900",
    color: AppColors.primary,
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#8E8E93",
    textAlign: "center",
    marginBottom: 30,
  },

  inputContainer: {
    width: "100%",
    marginBottom: 16,
  },

  inputWrapper: {
    height: 52,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E1E5EA",
    backgroundColor: "#FFFFFF",

    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
  },

  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#F1F2F4",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 12,
  },

  textInput: {
    flex: 1,
    fontSize: 15,
    color: AppColors.primary,
  },

  eyeButton: {
    paddingLeft: 10,
  },

  errorText: {
    color: AppColors.error,
    fontSize: 12,
    marginTop: 6,
    marginLeft: 8,
  },

  loginError: {
    color: AppColors.error,
    fontSize: 13,
    marginBottom: 14,
    textAlign: "center",
    fontWeight: "600",
  },

  loginButton: {
    height: 54,
    borderRadius: 14,
    backgroundColor: AppColors.primary,

    alignItems: "center",
    justifyContent: "center",

    marginTop: 10,
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  backButton: {
    marginTop: 24,
    alignItems: "center",
  },

  backText: {
    color: AppColors.primary,
    fontSize: 15,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});