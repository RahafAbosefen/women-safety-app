import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UserManagementColors } from "@/constants/theme";
import type { UserReport } from "@/services/UserManagementService";

type UserCardProps = {
  report: UserReport;
  onPress: () => void;
  onApprove: () => void;
  onReject: () => void;
};

const UserCard = ({ report, onPress, onApprove, onReject }: UserCardProps) => {
  const avatarLetter = report.userName.charAt(0).toUpperCase();

  return (
    <View style={styles.card}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.userInfo,
          pressed && styles.userInfoPressed,
        ]}
      >
        {report.userImage ? (
          <Image source={{ uri: report.userImage }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{avatarLetter}</Text>
          </View>
        )}

        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.name}>
            {report.userName}
          </Text>

          <Text numberOfLines={1} style={styles.reportType}>
            {report.reportType}
          </Text>

          <Text numberOfLines={1} style={styles.description}>
            {report.details}
          </Text>
        </View>
      </Pressable>

      <View style={styles.actions}>
        <Pressable
          onPress={onReject}
          style={({ pressed }) => [
            styles.rejectButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Ionicons name="close" size={14} color={UserManagementColors.white} />
          <Text style={styles.actionText}>Reject</Text>
        </Pressable>

        <Pressable
          onPress={onApprove}
          style={({ pressed }) => [
            styles.approveButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Ionicons
            name="checkmark"
            size={14}
            color={UserManagementColors.white}
          />
          <Text style={styles.actionText}>Approve</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: UserManagementColors.cardBackground,
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    minWidth: 0,
  },
  userInfoPressed: {
    opacity: 0.8,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    marginRight: 12,
    backgroundColor: UserManagementColors.white,
  },
  avatarPlaceholder: {
    width: 58,
    height: 58,
    borderRadius: 29,
    marginRight: 12,
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
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
  },
  reportType: {
    color: UserManagementColors.textDark,
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    color: UserManagementColors.textMuted,
    fontSize: 12,
    lineHeight: 17,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
    marginLeft: 10,
    alignItems: "center",
  },
  approveButton: {
    backgroundColor: UserManagementColors.primary,
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rejectButton: {
    backgroundColor: UserManagementColors.danger,
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actionText: {
    color: UserManagementColors.white,
    fontSize: 12,
    fontWeight: "700",
  },
  buttonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.96 }],
  },
});

export default UserCard;
