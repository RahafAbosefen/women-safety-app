import { useState } from "react";
import { Alert } from "react-native";

import { auth } from "@/services/firebaseConfig";
import { addReport } from "@/services/ReportService";
import { CloudinaryService } from "@/services/CloudinaryService";
import { NotificationService } from "@/services/NotificationService";
import { UsersService } from "@/services/UsersService";

type LocationValue = {
  latitude: number;
  longitude: number;
} | null;

type SubmitReportParams = {
  reportType: string;
  otherReportType: string;
  details: string;
  location: LocationValue;
  images: string[];
  audioUri: string | null;
};

export const useReportSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitReport = async ({
    reportType,
    otherReportType,
    details,
    location,
    images,
    audioUri,
  }: SubmitReportParams) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        Alert.alert("Error", "User not logged in");
        return false;
      }

      const finalReportType =
        reportType === "Other" ? otherReportType.trim() : reportType;

      if (reportType === "Other" && !otherReportType.trim()) {
        Alert.alert("Error", "Please write the report type.");
        return false;
      }

      setIsSubmitting(true);

      const userProfile: any = await UsersService.getUserProfile(user.uid);

      const submittedUserName =
        userProfile?.firstName && userProfile?.lastName
          ? `${userProfile.firstName} ${userProfile.lastName}`
          : userProfile?.name || user.email || "Unknown user";

      let uploadedAudioUrl: string | null = null;
      let uploadedImageUrls: string[] = [];

      if (audioUri) {
        uploadedAudioUrl = await CloudinaryService.uploadAudio(audioUri);
      }

      if (images.length > 0) {
        uploadedImageUrls = await Promise.all(
          images.map((imageUri) => CloudinaryService.uploadImage(imageUri))
        );
      }

      await addReport({
        userId: user.uid,
        userEmail: user.email || "",
        userName: submittedUserName,
        userImage: user.photoURL || "",
        reportType: finalReportType,
        details,
        location,
        imageUrls: uploadedImageUrls,
        audioUrl: uploadedAudioUrl,
        status: "pending",
        createdAt: new Date(),
      });

      await NotificationService.notifyUser({
        userId: user.uid,
        title: "Report Submitted",
        body: "Your report was submitted successfully.",
        type: "report",
      });

      return true;
    } catch (error: any) {
      console.log("Submit report error:", error);
      Alert.alert("Error", error.message || "Something went wrong");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitReport,
  };
};