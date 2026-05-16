import { Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useReportCard } from "@/hooks/useMyReports";
import { styles } from "@/styles/myReports.styles";

type Props = {
  id: string;
  reportType: string;
  details: string;
  source: string;
};

export const ReportCard = ({ id, reportType, details, source }: Props) => {
  const { getIcon, goToDetails, getIconColor } = useReportCard(reportType);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
      ]}
      onPress={() => goToDetails(String(id), String(source))}
    >
      <View style={styles.row}>
        <View style={[styles.iconBox, { backgroundColor: getIconColor() }]}>
          <Ionicons name={getIcon()} size={22} color="#fff" />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.CardTitle}>{reportType?.trim()}</Text>

          <Text style={styles.desc} numberOfLines={1}>
            {details}
          </Text>
          <View style={styles.sourcePill}>
            <Text style={styles.sourceText}>
              {source === "reports" ? "NORMAL" : "MAP"}
            </Text>
          </View>
        </View>
        <View style={styles.arrowBox}>
          <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
        </View>
      </View>
    </Pressable>
  );
};
