<<<<<<< HEAD
// import { useState } from "react";
// import {
//   ActivityIndicator,
//   Pressable,
//   ScrollView,
//   Text,
//   View,
// } from "react-native";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { Ionicons } from "@expo/vector-icons";
// import { usersManagementStyles as styles } from "@/styles/UserManagement.styles";
// import { useRouter } from "expo-router";

// import { UserManagementColors } from "@/constants/theme";
// import UserCard from "@/components/company/user-card";
// import UserCaseModal from "@/components/company/user-case-modal";
// import { useUserReports } from "@/hooks/useUserReports";
// import {
//   approveUserReport,
//   rejectUserReport,
//   type UserReport,
// } from "@/services/UserManagementService";
// import NotificationBell from "@/components/NotificationBell";
// import { NotificationService } from "@/services/NotificationService";
=======
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { UserManagementColors } from "@/constants/theme";
import { usersManagementStyles as styles } from "@/styles/UserManagement.styles";
import UserCard from "@/components/company/user-card";
import UserCaseModal from "@/components/company/user-case-modal";
import NotificationBell from "@/components/NotificationBell";
import { useUserReports } from "@/hooks/useUserReports";
import {
  approveUserReport,
  rejectUserReport,
  type UserReport,
} from "@/services/UserManagementService";
import { NotificationService } from "@/services/NotificationService";
>>>>>>> 05047883ef500a10952e21b3ef62f99961726ecc

// const UsersManagement = () => {
//   const router = useRouter();
//   const [selectedReport, setSelectedReport] = useState<UserReport | null>(null);

//   const queryClient = useQueryClient();
//   const { data, isLoading, error, refetch } = useUserReports();

<<<<<<< HEAD
//   const approveMutation = useMutation({
//     mutationFn: async (report: UserReport) => {
//       await approveUserReport(report);

//       if (report.userId) {
//         try {
//           await NotificationService.notifyUser({
//             userId: report.userId,
//             title: "Report Approved",
//             body: "Your report has been approved.",
//             type: "report",
//           });
//         } catch (notificationError) {
//           console.log("Notification error:", notificationError);
//         }
//       }
//     },
//     onSuccess: async () => {
//     mutationFn: approveUserReport,
//     onSuccess: () => {
//       console.log("Approve success!");
//       setSelectedReport(null);
//       await queryClient.invalidateQueries({ queryKey: ["userReports"] });
//       void queryClient.invalidateQueries({ queryKey: ["userReports"] });
//       router.replace("/companyTabs/CasesList" as any);
//     },
//     onError: (error) => {
//       console.error("Approve error:", error);
//     },
//   });
=======
  const approveMutation = useMutation({
    mutationFn: approveUserReport,

    onSuccess: async () => {
      console.log("Approve success!");
      setSelectedReport(null);

      await queryClient.invalidateQueries({
        queryKey: ["userReports"],
      });

      router.replace("/companyTabs/CasesList" as any);
    },

    onError: (error) => {
      console.error("Approve error:", error);
    },
  });
>>>>>>> 05047883ef500a10952e21b3ef62f99961726ecc

//   const rejectMutation = useMutation({
//     mutationFn: async (report: UserReport) => {
//       if (report.userId) {
//         try {
//           await NotificationService.notifyUser({
//             userId: report.userId,
//             title: "Report Rejected",
//             body: "Your report has been reviewed and removed.",
//             type: "report",
//           });
//         } catch (notificationError) {
//           console.log("Notification error:", notificationError);
//         }
//       }

<<<<<<< HEAD
//       await rejectUserReport(report);
//     },
//     onSuccess: async () => {
//       setSelectedReport(null);
//       await queryClient.invalidateQueries({ queryKey: ["userReports"] });
//     },
//     onError: (error) => {
//       console.log("Reject error:", error);
//     },
//   });
=======
      await rejectUserReport(report);
    },

    onSuccess: async () => {
      setSelectedReport(null);

      await queryClient.invalidateQueries({
        queryKey: ["userReports"],
      });
    },

    onError: (error) => {
      console.log("Reject error:", error);
    },
  });
>>>>>>> 05047883ef500a10952e21b3ef62f99961726ecc

//   const isApproveLoading = approveMutation.isPending;
//   const isRejectLoading = rejectMutation.isPending;

//   const handleApprove = (report: UserReport) => {
//     approveMutation.mutate(report);
//   };

//   const handleReject = (report: UserReport) => {
//     rejectMutation.mutate(report);
//   };

//   if (isLoading) {
//     return (
//       <View style={styles.centerContainer}>
//         <ActivityIndicator color={UserManagementColors.primary} />
//         <Text style={styles.loadingText}>Loading reports...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.centerContainer}>
//         <Text style={styles.errorText}>Error fetching reports</Text>

//         <Pressable style={styles.retryButton} onPress={() => refetch()}>
//           <Text style={styles.retryText}>Try again</Text>
//         </Pressable>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.screen}>
//       <View style={styles.header}>
//         <View style={styles.headerCenter}>
//           <Text style={styles.title}>Users Management</Text>
//           <Text style={styles.subtitle}>Review pending reports</Text>
//         </View>

//         <View style={styles.notificationContainer}>
//           <NotificationBell />
//         </View>
//       </View>

//       <Pressable
//         style={styles.casesButton}
//         onPress={() => router.push("/companyTabs/CasesList" as any)}
//       >
//         <Text style={styles.casesButtonText}>View Cases</Text>
//       </Pressable>

//       <ScrollView
//         contentContainerStyle={[
//           styles.listContent,
//           (!data || data.length === 0) && styles.emptyListContent,
//         ]}
//         showsVerticalScrollIndicator={false}
//       >
//         {data && data.length > 0 ? (
//           data.map((report) => (
//             <UserCard
//               key={`${report.source}-${report.id}`}
//               report={report}
//               onPress={() => setSelectedReport(report)}
//             />
//           ))
//         ) : (
//           <View style={styles.emptyContainer}>
//             <View style={styles.emptyIconCircle}>
//               <Ionicons
//                 name="checkmark"
//                 size={34}
//                 color={UserManagementColors.danger}
//               />
//             </View>

//             <Text style={styles.emptyTitle}>No pending reports</Text>
//             <Text style={styles.emptyText}>
//               All user reports have been reviewed.
//             </Text>
//           </View>
//         )}
//       </ScrollView>

//       <UserCaseModal
//         visible={Boolean(selectedReport)}
//         report={selectedReport}
//         isApproveLoading={isApproveLoading}
//         isRejectLoading={isRejectLoading}
//         onClose={() => setSelectedReport(null)}
//         onApprove={() => {
//           if (selectedReport) {
//             handleApprove(selectedReport);
//           }
//         }}
//         onReject={() => {
//           if (selectedReport) {
//             handleReject(selectedReport);
//           }
//         }}
//       />
//     </View>
//   );
// };

<<<<<<< HEAD
// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     backgroundColor: UserManagementColors.pageBackground,
//     paddingHorizontal: 20,
//     paddingTop: 24,
//   },
//   header: {
//     marginBottom: 22,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   headerSide: {
//     width: 42,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   headerCenter: {
//     flex: 1,
//     alignItems: "center",
//   },
//   title: {
//     color: UserManagementColors.textDark,
//     fontSize: 22,
//     fontWeight: "800",
//     textAlign: "center",
//   },
//   subtitle: {
//     color: UserManagementColors.textMuted,
//     fontSize: 13,
//     marginTop: 6,
//     textAlign: "center",
//   },
//   listContent: {
//     paddingBottom: 30,
//   },
//   emptyListContent: {
//     flexGrow: 1,
//     justifyContent: "center",
//   },
//   centerContainer: {
//     flex: 1,
//     backgroundColor: UserManagementColors.pageBackground,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//   },
//   loadingText: {
//     marginTop: 12,
//     color: UserManagementColors.primary,
//     fontSize: 15,
//   },
//   errorText: {
//     color: UserManagementColors.danger,
//     fontSize: 15,
//     fontWeight: "700",
//     marginBottom: 12,
//   },
//   retryButton: {
//     backgroundColor: UserManagementColors.primary,
//     paddingVertical: 10,
//     paddingHorizontal: 18,
//     borderRadius: 10,
//   },
//   retryText: {
//     color: UserManagementColors.white,
//     fontWeight: "700",
//   },
//   emptyContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingBottom: 80,
//   },
//   emptyIconCircle: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     borderWidth: 2,
//     borderColor: UserManagementColors.danger,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 14,
//   },
//   emptyTitle: {
//     color: UserManagementColors.danger,
//     fontSize: 14,
//     fontWeight: "800",
//     marginBottom: 8,
//   },
//   emptyText: {
//     color: UserManagementColors.textMuted,
//     fontSize: 13,
//     textAlign: "center",
//   },
//   casesButton: {
//     backgroundColor: UserManagementColors.primary,
//     paddingVertical: 10,
//     paddingHorizontal: 18,
//     borderRadius: 10,
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   casesButtonText: {
//     color: UserManagementColors.white,
//     fontWeight: "700",
//   },
// });

// export default UsersManagement;
=======
export default UsersManagement;
>>>>>>> 05047883ef500a10952e21b3ef62f99961726ecc
