import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UserManagementColors } from "@/constants/theme";
import type { UserReport } from "@/services/UserManagementService";

type UserCaseModalProps = {
  visible: boolean;
  report: UserReport | null;
  isLoading?: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
};

const UserCaseModal = ({
  visible,
  report,
  isLoading = false,
  onClose,
  onApprove,
  onReject,
}: UserCaseModalProps) => {
  if (!report) {
    return null;
  }

  const avatarLetter = report.userName.charAt(0).toUpperCase();

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Ionicons
              name="close"
              size={24}
              color={UserManagementColors.textDark}
            />
          </Pressable>

          <View style={styles.userHeader}>
            {report.userImage ? (
              <Image source={{ uri: report.userImage }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>{avatarLetter}</Text>
              </View>
            )}

            <View style={styles.userText}>
              <Text numberOfLines={1} style={styles.name}>
                {report.userName}
              </Text>
              <Text style={styles.sourceText}>
                {report.source === "mapReports" ? "Map Report" : "Report"}
              </Text>
            </View>
          </View>

          <View style={styles.detailsCard}>
            <Text style={styles.label}>Report Type</Text>
            <View style={styles.fieldBox}>
              <Text style={styles.fieldText}>{report.reportType}</Text>
            </View>

            <Text style={styles.label}>Report Details</Text>
            <View style={styles.detailsBox}>
              <Text style={styles.detailsText}>{report.details}</Text>
            </View>
          </View>

          <View style={styles.actions}>
            <Pressable
              disabled={isLoading}
              onPress={onReject}
              style={({ pressed }) => [
                styles.rejectButton,
                pressed && !isLoading && styles.buttonPressed,
                isLoading && styles.disabledButton,
              ]}
            >
              <Ionicons
                name="close"
                size={18}
                color={UserManagementColors.white}
              />
              <Text style={styles.actionText}>Reject</Text>
            </Pressable>

            <Pressable
              disabled={isLoading}
              onPress={onApprove}
              style={({ pressed }) => [
                styles.approveButton,
                pressed && !isLoading && styles.buttonPressed,
                isLoading && styles.disabledButton,
              ]}
            >
              <Ionicons
                name="checkmark"
                size={18}
                color={UserManagementColors.white}
              />
              <Text style={styles.actionText}>Approve</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: UserManagementColors.overlayBackground,
    paddingHorizontal: 20,
  },
  sheet: {
    backgroundColor: UserManagementColors.cardBackground,
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

export default UserCaseModal;
