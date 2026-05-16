import { Ionicons } from "@expo/vector-icons";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

export const REPORT_CONFIG: Record<string, { icon: IconName; color: string }> =
  {
    Harassment: {
      icon: "hand-left-outline",
      color: "#8B3A3A",
    },

    "Physical violence": {
      icon: "warning-outline",
      color: "#C0392B",
    },

    "Verbal abuse": {
      icon: "chatbubble-ellipses-outline",
      color: "#2D4A5E",
    },

    Other: {
      icon: "document-text-outline",
      color: "#64748B",
    },
  };
