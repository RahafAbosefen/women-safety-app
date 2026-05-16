import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import StorageService from "@/services/StorageService";
import { UsersService } from "@/services/UsersService";
import { Keyboard } from "react-native"; 
import { logout } from "@/services/AuthService";
import { useRouter } from "expo-router";
import { useMediaManager } from "./useMediaManager";
import { useAlertManager } from "./useAlertManager";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CloudinaryService } from "@/services/CloudinaryService";

export type FormData = {
  companyName: string;
  email: string;
  phoneNumber: string;
  companyDescription: string;
  companyLocation: string;
  serviceType: string;
  emergencyPhone: string;
  serviceStartTime: string;
  serviceEndTime: string;
  companyImage?: string;
};

export const useCompanyProfile = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  
  const [startTime, setStartTime] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [endTime, setEndTime] = useState(new Date());
  const [showEndPicker, setShowEndPicker] = useState(false);

  const { control, handleSubmit, setValue, watch, reset, formState: { errors, isDirty } } = useForm<FormData>({
    mode: "all",
  });

  const companyImage = watch("companyImage");
  const selectedLocation = watch("companyLocation");
  const selectedServiceType = watch("serviceType");

  const {  openAlert, closeAlert } = useAlertManager();

  const getUserId = async () => {
    const user = await StorageService.getUser();
    if (!user?.uid) throw new Error("No UID found");
    return user.uid;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["companyProfile"],
    queryFn: async () => {
      const uid = await getUserId();
      return UsersService.getUserProfile(uid);
    },
  });

  useEffect(() => {
    if (!error) return;
    openAlert({
      type: "error",
      title: "Error",
      message: "Failed to load company profile",
      confirmText: "OK",
      onConfirm: closeAlert,
    });
  }, [error, openAlert, closeAlert]);

  useEffect(() => {
    if (!data || isLoading) return;
    reset(data as FormData);
    if (data.serviceStartTime) setStartTime(new Date(data.serviceStartTime));
    if (data.serviceEndTime) setEndTime(new Date(data.serviceEndTime));
  }, [data, reset, isLoading]);

  const updateProfileMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const uid = await getUserId();
      return UsersService.updateUserProfile(uid, formData);
    },
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["companyProfile"] });
      reset(variables);
      setIsEditing(false);
      Keyboard.dismiss();

      openAlert({
        type: "success",
        title: "Success",
        message: "Saved successfully",
        confirmText: "OK",
        onConfirm: closeAlert,
      });
    },
    onError: () => {
      openAlert({
        type: "error",
        title: "Update Failed",
        message: "Please check your internet connection and try again.",
        confirmText: "OK",
        onConfirm: closeAlert,
      });
    },
  });

  const onSubmit = (formData: FormData) => {
    updateProfileMutation.mutate(formData);
  };

  const updateImageMutation = useMutation({
    mutationFn: async (uri: string | null) => {
      const uid = await getUserId();
      if (!uri) {
        return UsersService.updateUserProfile(uid, { companyImage: "" });
      }
      const url = await CloudinaryService.uploadImage(uri);
      return UsersService.updateUserProfile(uid, { companyImage: url });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companyProfile"] });
    },
    onError: () => {
      openAlert({
        type: "error",
        title: "Image Upload Failed",
        message: "Please check your internet connection and try again.",
        confirmText: "OK",
        onConfirm: closeAlert,
      });
    },
  });

  const media = useMediaManager(async (uri) => {
    updateImageMutation.mutate(uri);
  });

  const removeProfileImage = () => {
    updateImageMutation.mutate(null);
  };

  const handleStartTimeChange = (event: any, selectedTime?: Date) => {
    setShowStartPicker(false);
    if (selectedTime) {
      setStartTime(selectedTime);
      setValue("serviceStartTime", selectedTime.toISOString(), { shouldValidate: true });
    }
  };

  const handleEndTimeChange = (event: any, selectedTime?: Date) => {
    setShowEndPicker(false);
    if (selectedTime) {
      setEndTime(selectedTime);
      setValue("serviceEndTime", selectedTime.toISOString(), { shouldValidate: true });
    }
  };

  const confirmLogout = useCallback(async () => {
    closeAlert();
    await logout();
    router.replace("/login");
  }, [router, closeAlert]);

  const triggerLogoutAlert = () => {
    openAlert({
      type: "confirm",
      title: "Logout",
      message: "Are you sure you want to exit?",
      confirmText: "Logout",
      cancelText: "Cancel",
      onConfirm: confirmLogout,
      onCancel: closeAlert,
    });
  };

  return {
    control,
    errors,
    isDirty,
    isLoading: isLoading || updateProfileMutation.isPending || updateImageMutation.isPending, 
    isEditing,
    setIsEditing,
    companyImage,
    media,
    selectedLocation,
    selectedServiceType,
    startTime,
    showStartPicker,
    setShowStartPicker,
    handleStartTimeChange,
    endTime,
    showEndPicker,
    setShowEndPicker,
    handleEndTimeChange,
    onSubmit,
    handleSubmit,
    setValue, 
    removeProfileImage,
    triggerLogoutAlert,
    closeAlert,
  };
};