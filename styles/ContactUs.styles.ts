import { StyleSheet } from "react-native";
import { AppColors } from "@/constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFC",
  },

  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 18,
  },

  backButton: {
    marginBottom: 18,
    alignSelf: "flex-start",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: AppColors.primary,
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    color: "#7B8190",
    lineHeight: 22,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 20,
    paddingHorizontal: 18,
    height: 58,
    marginBottom: 22,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#1E2432",
  },

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },

  iconContainer: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#F3F0FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  cardInfo: {
    flex: 1,
    justifyContent: "center",
  },

  cardName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E2432",
    marginBottom: 6,
  },

  cardType: {
    fontSize: 14,
    color: "#8A90A2",
    fontWeight: "500",
  },

  chatButton: {
    backgroundColor: AppColors.primary,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  chatText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginRight: 6,
  },

  supportCard: {
    backgroundColor: "#F6F3FF",
    marginTop: 10,
    borderRadius: 24,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  supportLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  supportIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  supportTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E2432",
    marginBottom: 4,
  },

  supportSubtitle: {
    fontSize: 14,
    color: "#8A90A2",
  },

  errorText: {
    color: AppColors.error,
    textAlign: "center",
    marginTop: 20,
    fontSize: 15,
    fontWeight: "600",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});