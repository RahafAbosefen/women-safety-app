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
  subtitle: {
    fontSize: 14,
    color: AppColors.gray,
    marginTop: 5,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: AppColors.white,
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  cardPressed: {
    opacity: 0.7,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: AppColors.card,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: "bold",
    color: AppColors.primary,
  },
  cardType: {
    fontSize: 13,
    color: AppColors.gray,
    marginTop: 3,
  },
  errorText: {
    color: AppColors.error,
    textAlign: "center",
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});