import { Image, Pressable, Text, View } from "react-native";

import { userCardStyles as styles } from "@/styles/UserManagement.styles";
import type { UserReport } from "@/services/UserManagementService";

type UserCardProps = {
  report: UserReport;
  onPress: () => void;
};

const getDisplayName = (name?: string) => {
  if (!name || !name.trim()) {
    return "Unknown user";
  }

  if (name.includes("@")) {
    return name.split("@")[0];
  }

  return name;
};

const UserCard = ({ report, onPress }: UserCardProps) => {
  const displayName = getDisplayName(report.userName);
  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.userInfoPressed]}
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
          {displayName}
        </Text>

        <Text numberOfLines={1} style={styles.reportType}>
          {report.reportType}
        </Text>
      </View>
    </Pressable>
  );
};

export default UserCard;
