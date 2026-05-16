import { StyleSheet } from "react-native";
import { MapColors, UserManagementColors } from "@/constants/theme";

export const usersManagementStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: UserManagementColors.pageBackground,
    paddingHorizontal: 20,
    paddingTop: 76,
  },

  header: {
    marginBottom: 26,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },

  headerCenter: {
    alignItems: "center",
  },

  notificationContainer: {
    position: "absolute",
    right: 0,
    top: -8,
  },

  title: {
    color: MapColors.primary,
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
  },

  subtitle: {
    color: UserManagementColors.textMuted,
    fontSize: 14,
    marginTop: 6,
    textAlign: "center",
    fontWeight: "600",
  },

  listContent: {
    paddingBottom: 120,
  },

  emptyListContent: {
    flexGrow: 1,
    justifyContent: "center",
  },

  centerContainer: {
    flex: 1,
    backgroundColor: UserManagementColors.pageBackground,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  loadingText: {
    marginTop: 12,
    color: UserManagementColors.primary,
    fontSize: 15,
  },

  errorText: {
    color: UserManagementColors.danger,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 12,
  },

  retryButton: {
    backgroundColor: UserManagementColors.primary,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },

  retryText: {
    color: UserManagementColors.white,
    fontWeight: "700",
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80,
  },

  emptyIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: UserManagementColors.danger,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  emptyTitle: {
    color: UserManagementColors.danger,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 8,
  },
  emptyText: {
    color: UserManagementColors.textMuted,
    fontSize: 13,
    textAlign: "center",
  },

  casesButton: {
    backgroundColor: UserManagementColors.primary,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  casesButtonText: {
    color: UserManagementColors.white,
    fontWeight: "800",
    fontSize: 15,
  },

});

export const userCardStyles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF3F0",
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.025,
    shadowRadius: 5,
    elevation: 1,
  },

  userInfoPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 14,
    backgroundColor: UserManagementColors.white,
  },

  avatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 14,
    backgroundColor: UserManagementColors.avatarBackground,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: UserManagementColors.danger,
    fontSize: 22,
    fontWeight: "800",
  },

  textContainer: {
    flex: 1,
    minWidth: 0,
  },

  name: {
    color: UserManagementColors.textDark,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 6,
  },

  reportType: {
    color: UserManagementColors.textMuted,
    fontSize: 14,
    fontWeight: "700",
  },
});

export const userCaseModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: UserManagementColors.overlayBackground,
    paddingHorizontal: 20,
  },

  sheet: {
    backgroundColor: "#FFF8F6",
    borderRadius: 22,
    padding: 20,
    width: "100%",
  },

  closeButton: {
    alignSelf: "flex-end",
    padding: 4,
    marginBottom: 4,
  },

  userHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },

  avatar: {
    width: 66,
    height: 66,
    borderRadius: 33,
    marginRight: 14,
    backgroundColor: UserManagementColors.white,
  },

  avatarPlaceholder: {
    width: 66,
    height: 66,
    borderRadius: 33,
    marginRight: 14,
    backgroundColor: UserManagementColors.avatarBackground,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: UserManagementColors.danger,
    fontSize: 26,
    fontWeight: "800",
  },

  userText: {
    flex: 1,
  },

  name: {
    color: UserManagementColors.textDark,
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 4,
  },

  sourceText: {
    color: UserManagementColors.textMuted,
    fontSize: 13,
    fontWeight: "600",
  },

  detailsCard: {
    width: "100%",
  },

  label: {
    color: UserManagementColors.danger,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 8,
  },

  fieldBox: {
    backgroundColor: UserManagementColors.fieldBackground,
    borderWidth: 1,
    borderColor: UserManagementColors.fieldBorder,
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
  },

  fieldText: {
    color: UserManagementColors.textDark,
    fontSize: 14,
    fontWeight: "600",
  },

  detailsBox: {
    backgroundColor: UserManagementColors.fieldBackground,
    borderWidth: 1,
    borderColor: UserManagementColors.fieldBorder,
    borderRadius: 14,
    padding: 14,
    minHeight: 110,
    marginBottom: 22,
  },

  detailsText: {
    color: UserManagementColors.textDark,
    fontSize: 14,
    lineHeight: 21,
  },

  actions: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },

  approveButton: {
    flex: 1,
    backgroundColor: UserManagementColors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },

  rejectButton: {
    flex: 1,
    backgroundColor: UserManagementColors.danger,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },

  actionText: {
    color: UserManagementColors.white,
    fontSize: 15,
    fontWeight: "800",
  },

  buttonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },

  disabledButton: {
    opacity: 0.6,
  },
    
});
