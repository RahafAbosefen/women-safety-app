import { useCallback, useEffect } from "react";
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
import { NotificationService } from "@/services/NotificationService";

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
}

export const useProfile = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    defaultValues: { name: "", email: "", phone: "" },
    mode: "onChange",
  });

  const { alert, openAlert, closeAlert } = useAlertManager();

  const getUserId = async () => {
    const user = await StorageService.getUser();
    if (!user?.uid) throw new Error("No UID");
    return user.uid;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["userProfile"],
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
      message: "Failed to load profile",
      confirmText: "OK",
      onConfirm: closeAlert,
    });
  }, [error, openAlert, closeAlert]);

  useEffect(() => {
    if (!data || isLoading) return;

    reset({
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
    });
  }, [data, reset, isLoading]);

  const updateProfileMutation = useMutation({
    mutationFn: async (formData: ProfileFormData) => {
      const uid = await getUserId();
      const [firstName, ...last] = formData.name.split(" ");

      return UsersService.updateUserProfile(uid, {
        firstName,
        lastName: last.join(" "),
        email: formData.email,
        phone: formData.phone,
      });
    },
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      reset(variables);
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

  const onSubmit = (data: ProfileFormData) => {
    updateProfileMutation.mutate(data);
  };

  const updateImage = useMutation({
    mutationFn: async (uri: string | null) => {
      const uid = await getUserId();
      if (!uri) {
        return UsersService.updateUserProfile(uid, {
          profileImage: "",
        });
      }
      const url = await CloudinaryService.uploadImage(uri);
      return UsersService.updateUserProfile(uid, {
        profileImage: url,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
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
    updateImage.mutate(uri);
  });

  const removeProfileImage = () => {
    updateImage.mutate(null);
  };

  const isAnonymous = data?.isAnonymous ?? false;
  const isNotificationsEnabled = data?.isNotificationsEnabled ?? false;

  const handleAnonymousChange = async () => {
    const uid = await getUserId();
    await UsersService.updateUserProfile(uid, {
      isAnonymous: !(data?.isAnonymous ?? false),
    });

    queryClient.invalidateQueries({ queryKey: ["userProfile"] });
  };

  const handleNotificationsChange = async () => {
    const uid = await getUserId();

    const newValue = !(data?.isNotificationsEnabled ?? false);

    await UsersService.updateUserProfile(uid, {
      isNotificationsEnabled: newValue,
    });

    queryClient.invalidateQueries({ queryKey: ["userProfile"] });

    if (newValue) {
      await NotificationService.requestPermissions();
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
    isLoading,
    isAnonymous,
    isNotificationsEnabled,
    profileImage: data?.profileImage ?? null,
    alert,
    media,
    error,
    onSubmit,
    handleSubmit,
    removeProfileImage,
    handleAnonymousChange,
    handleNotificationsChange,
    triggerLogoutAlert,
    confirmLogout,
    closeAlert,
  };
};
