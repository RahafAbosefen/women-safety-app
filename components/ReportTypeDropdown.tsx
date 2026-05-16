// import React from "react";
// import { View, StyleSheet, Pressable, Text } from "react-native";
// import { RadioButton } from "react-native-paper";
// import { Ionicons } from "@expo/vector-icons";

// type Props = {
//   open: boolean;
//   reportType: string;
//   onToggle: () => void;
//   onSelect: (value: string) => void;
// };

// export default function ReportTypeDropdown({
//   open,
//   reportType,
//   onToggle,
//   onSelect,
// }: Props) {
//   return (
//     <>
//       <Pressable style={styles.dropdown} onPress={onToggle}>
//         <Text style={styles.dropdownText}>{reportType}</Text>
//         <Ionicons
//           name={open ? "chevron-up" : "chevron-down"}
//           size={22}
//           color="#2B5C73"
//         />
//       </Pressable>

//       {open && (
//         <View style={styles.menuBox}>
//           <RadioButton.Group onValueChange={onSelect} value={reportType}>
//             <Pressable style={styles.item} onPress={() => onSelect("Harassment")}>
//               <RadioButton value="Harassment" />
//               <Text style={styles.itemText}>Harassment</Text>
//             </Pressable>

//             <Pressable
//               style={styles.item}
//               onPress={() => onSelect("Physical violence")}
//             >
//               <RadioButton value="Physical violence" />
//               <Text style={styles.itemText}>Physical violence</Text>
//             </Pressable>

//             <Pressable style={styles.item} onPress={() => onSelect("Verbal abuse")}>
//               <RadioButton value="Verbal abuse" />
//               <Text style={styles.itemText}>Verbal abuse</Text>
//             </Pressable>

//              <Pressable style={styles.item} onPress={() => onSelect("Other")}>
//               <RadioButton value="Other" />
//               <Text style={styles.itemText}>Other</Text>
//             </Pressable>
//           </RadioButton.Group>
//         </View>
//       )}
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   dropdown: {
//     height: 58,
//     borderWidth: 1.5,
//     borderColor: "#B7C5CC",
//     borderRadius: 18,
//     backgroundColor: "#fff",
//     paddingHorizontal: 18,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   dropdownText: {
//     fontSize: 17,
//     color: "#496878",
//   },
//   menuBox: {
//     marginTop: 10,
//     backgroundColor: "#fff",
//     borderRadius: 18,
//     borderWidth: 1,
//     borderColor: "#E3E8EB",
//     paddingVertical: 10,
//     marginBottom: 16,
//   },
//   item: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//   },
//   itemText: {
//     fontSize: 16,
//     color: "#496878",
//   },
// });

import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { RadioButton, TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { MapColors, AppColors } from "@/constants/theme";

type Props = {
  open: boolean;
  reportType: string;
  otherReportType: string;
  onToggle: () => void;
  onSelect: (value: string) => void;
  onOtherChange: (value: string) => void;
  onClose: () => void;
  variant?: "default" | "map";
  error?: boolean;
};

export default function ReportTypeDropdown({
  open,
  reportType,
  otherReportType,
  onToggle,
  onSelect,
  onOtherChange,
  onClose,
  variant = "default",
  error = false,
}: Props) {
  const isMapVariant = variant === "map";

  return (
    <>
      <Pressable
        style={[
          styles.dropdown,
          isMapVariant && styles.mapDropdown,
          error && styles.dropdownError,
        ]}
        onPress={onToggle}
      >
        <Text
          style={[styles.dropdownText, isMapVariant && styles.mapDropdownText]}
        >
          {reportType === "Other" && otherReportType
            ? otherReportType
            : reportType}
        </Text>

        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={22}
          color={isMapVariant ? MapColors.primary : "#2B5C73"}
        />
      </Pressable>

      {open && (
        <View style={[styles.menuBox, isMapVariant && styles.mapMenuBox]}>
          <RadioButton.Group onValueChange={onSelect} value={reportType}>
            <Pressable
              style={styles.item}
              onPress={() => onSelect("Harassment")}
            >
              <RadioButton
                value="Harassment"
                color={isMapVariant ? MapColors.primary : "#2B5C73"}
                uncheckedColor={
                  isMapVariant ? MapColors.submitButton : "#B7C5CC"
                }
              />
              <Text
                style={[styles.itemText, isMapVariant && styles.mapItemText]}
              >
                Harassment
              </Text>
            </Pressable>

            <Pressable
              style={styles.item}
              onPress={() => onSelect("Physical violence")}
            >
              <RadioButton value="Physical violence" />
              <Text style={styles.itemText}>Physical violence</Text>
            </Pressable>

            <Pressable
              style={styles.item}
              onPress={() => onSelect("Verbal abuse")}
            >
              <RadioButton value="Verbal abuse" />
              <Text style={styles.itemText}>Verbal abuse</Text>
            </Pressable>

            <Pressable style={styles.item} onPress={() => onSelect("Other")}>
              <RadioButton value="Other" />
              <Text style={styles.itemText}>Other</Text>
            </Pressable>

            {reportType === "Other" && (
              <TextInput
                mode="outlined"
                label="Write report type"
                placeholder="Type here..."
                value={otherReportType}
                onChangeText={onOtherChange}
                onBlur={onClose}
                outlineColor={
                  isMapVariant ? MapColors.pageBackground : "#B8C7CF"
                }
                activeOutlineColor={
                  isMapVariant ? MapColors.primary : "#204E64"
                }
                style={styles.otherInput}
                contentStyle={styles.otherInputContent}
              />
            )}
          </RadioButton.Group>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: 58,
    borderWidth: 1.5,
    borderColor: "#B7C5CC",
    borderRadius: 18,
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 17,
    color: "#496878",
  },
  menuBox: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E3E8EB",
    paddingVertical: 10,
    marginBottom: 16,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  itemText: {
    fontSize: 16,
    color: "#496878",
  },
  otherInput: {
    marginHorizontal: 14,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  otherInputContent: {
    color: "#204E64",
  },
  dropdownError: {
    borderColor: AppColors.error,
  },

  mapDropdown: {
    width: "100%",
    borderWidth: 1,
    borderColor: MapColors.pageBackground,
    borderRadius: 12,
    backgroundColor: MapColors.sheetBackground,
    paddingHorizontal: 14,
    paddingVertical: 14,
    height: "auto",
    minHeight: 52,
  },

  mapDropdownText: {
    fontSize: 14,
    color: MapColors.primary,
    fontWeight: "500",
  },

  mapMenuBox: {
    marginTop: 6,
    backgroundColor: MapColors.sheetBackground,
    borderWidth: 1,
    borderColor: MapColors.pageBackground,
    borderRadius: 12,
    overflow: "hidden",
    paddingVertical: 0,
    marginBottom: 8,
  },

  mapItem: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: MapColors.sheetBackground,
  },

  mapItemText: {
    fontSize: 14,
    color: MapColors.primary,
  },

  mapPressedOption: {
    opacity: 0.75,
  },

  mapOtherInput: {
    marginHorizontal: 14,
    marginTop: 8,
    marginBottom: 12,
    backgroundColor: MapColors.sheetBackground,
  },
});
