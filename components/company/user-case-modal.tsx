import { Image, Modal, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UserManagementColors } from "@/constants/theme";
import type { UserReport } from "@/services/UserManagementService";
import { userCaseModalStyles as styles } from "@/styles/UserManagement.styles";

type UserCaseModalProps = {
  visible: boolean;
  report: UserReport | null;
  isApproveLoading?: boolean;
  isRejectLoading?: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
};

const UserCaseModal = ({
  visible,
  report,
  isApproveLoading = false,
  isRejectLoading = false,
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
              disabled={isRejectLoading || isApproveLoading}
              onPress={onReject}
              style={({ pressed }) => [
                styles.rejectButton,
                pressed &&
                  !isRejectLoading &&
                  !isApproveLoading &&
                  styles.buttonPressed,
                isRejectLoading && styles.disabledButton,
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
              disabled={isApproveLoading || isRejectLoading}
              onPress={onApprove}
              style={({ pressed }) => [
                styles.approveButton,
                pressed &&
                  !isApproveLoading &&
                  !isRejectLoading &&
                  styles.buttonPressed,
                isApproveLoading && styles.disabledButton,
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

export default UserCaseModal;
