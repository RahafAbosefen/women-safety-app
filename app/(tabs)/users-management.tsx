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
import { usersManagementStyles as styles } from "@/styles/UserManagement.styles";
import { UserManagementColors } from "@/constants/theme";
import UserCard from "@/components/company/user-card";
import UserCaseModal from "@/components/company/user-case-modal";
import { useUserReports } from "@/hooks/useUserReports";
import {
  approveUserReport,
  rejectUserReport,
  type UserReport,
} from "@/services/UserManagementService";
import NotificationBell from "@/components/NotificationBell";
import { NotificationService } from "@/services/NotificationService";

const UsersManagement = () => {
  const [selectedReport, setSelectedReport] = useState<UserReport | null>(null);

  const queryClient = useQueryClient();
  const { data, isLoading, error, refetch } = useUserReports();

  const approveMutation = useMutation({
    mutationFn: async (report: UserReport) => {
      await approveUserReport(report);

      if (report.userId) {
        try {
          await NotificationService.notifyUser({
            userId: report.userId,
            title: "Report Approved",
            body: "Your report has been approved.",
            type: "report",
          });
        } catch (notificationError) {
          console.log("Notification error:", notificationError);
        }
      }
    },
    onSuccess: async () => {
      setSelectedReport(null);
      await queryClient.invalidateQueries({ queryKey: ["userReports"] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (report: UserReport) => {
      if (report.userId) {
        try {
          await NotificationService.notifyUser({
            userId: report.userId,
            title: "Report Rejected",
            body: "Your report has been reviewed and removed.",
            type: "report",
          });
        } catch (notificationError) {
          console.log("Notification error:", notificationError);
        }
      }

      await rejectUserReport(report);
    },
    onSuccess: async () => {
      setSelectedReport(null);
      await queryClient.invalidateQueries({ queryKey: ["userReports"] });
    },
    onError: (error) => {
      console.log("Reject error:", error);
    },
  });

  const isApproveLoading = approveMutation.isPending;
  const isRejectLoading = rejectMutation.isPending;

  const handleApprove = (report: UserReport) => {
    approveMutation.mutate(report);
  };

  const handleReject = (report: UserReport) => {
    rejectMutation.mutate(report);
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator color={UserManagementColors.primary} />
        <Text style={styles.loadingText}>Loading reports...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error fetching reports</Text>

        <Pressable style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerCenter}>
          <Text style={styles.title}>Users Management</Text>
          <Text style={styles.subtitle}>Review pending reports</Text>
        </View>

        <View style={styles.notificationContainer}>
          <NotificationBell />
        </View>
      </View>
      <ScrollView
        contentContainerStyle={[
          styles.listContent,
          (!data || data.length === 0) && styles.emptyListContent,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {data && data.length > 0 ? (
          data.map((report) => (
            <UserCard
              key={`${report.source}-${report.id}`}
              report={report}
              onPress={() => setSelectedReport(report)}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Ionicons
                name="checkmark"
                size={34}
                color={UserManagementColors.danger}
              />
            </View>

            <Text style={styles.emptyTitle}>No pending reports</Text>
            <Text style={styles.emptyText}>
              All user reports have been reviewed.
            </Text>
          </View>
        )}
      </ScrollView>

      <UserCaseModal
        visible={Boolean(selectedReport)}
        report={selectedReport}
        isApproveLoading={isApproveLoading}
        isRejectLoading={isRejectLoading}
        onClose={() => setSelectedReport(null)}
        onApprove={() => {
          if (selectedReport) {
            handleApprove(selectedReport);
          }
        }}
        onReject={() => {
          if (selectedReport) {
            handleReject(selectedReport);
          }
        }}
      />
    </View>
  );
};

export default UsersManagement;
