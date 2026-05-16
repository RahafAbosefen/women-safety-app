import type { ComponentProps } from "react";
import { Ionicons } from "@expo/vector-icons";

export type IncidentOption = {
  label: string;
  value: string;
  icon: ComponentProps<typeof Ionicons>["name"];
};

export const incidentOptions: IncidentOption[] = [
  {
    label: "Harassment",
    value: "Harassment",
    icon: "alert-circle-outline",
  },
  {
    label: "Physical violence",
    value: "Physical violence",
    icon: "shield-outline",
  },
  {
    label: "Verbal abuse",
    value: "Verbal abuse",
    icon: "chatbubble-ellipses-outline",
  },
  {
    label: "Others",
    value: "Others",
    icon: "ellipsis-horizontal-circle-outline",
  },
];
