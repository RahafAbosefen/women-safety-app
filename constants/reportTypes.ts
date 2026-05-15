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
    value: "harassment",
    icon: "alert-circle-outline",
  },
  {
    label: "Physical violence",
    value: "physical_violence",
    icon: "shield-outline",
  },
  {
    label: "Verbal abuse",
    value: "verbal_abuse",
    icon: "chatbubble-ellipses-outline",
  },
  {
    label: "Others",
    value: "others",
    icon: "ellipsis-horizontal-circle-outline",
  },
];
