import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import StorageService from "@/services/StorageService";
import { UsersService } from "@/services/UsersService";
import { Keyboard } from "react-native";
import { logout } from "@/services/AuthService";
import { useRouter } from "expo-router";
import { useMediaManager } from "./useMediaManager";
import { useAlertManager } from "./useAlertManager";
interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  isAnonymous: boolean;
}

export const useProfile = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    defaultValues: { name: "", email: "", phone: "", isAnonymous: false },
    mode: "onChange",
  });

  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [originalData, setOriginalData] = useState<ProfileFormData>({
    name: "",
    email: "",
    phone: "",
    isAnonymous: false,
  });

  useEffect(() => {
    const loadUserFromFirebase = async () => {
      try {
        const user = await StorageService.getUser();
        if (user && user.uid) {
          const firebaseData = await UsersService.getUserProfile(user.uid);
          if (firebaseData) {
            const formattedData = {
              name: `${firebaseData.firstName} ${firebaseData.lastName}`,
              email: firebaseData.email,
              phone: firebaseData.phone,
              isAnonymous: firebaseData.isAnonymous || false,
            };

            setIsAnonymous(firebaseData.isAnonymous || false);
            reset(formattedData);
            setOriginalData(formattedData);
            const img = await StorageService.getProfileImage();
            setProfileImage(img);
          }
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUserFromFirebase();
  }, [reset]);

  const { alert, openAlert, closeAlert } = useAlertManager();

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

  const saveImage = useCallback(async (uri: string) => {
    await StorageService.saveProfileImage(uri);
    setProfileImage(uri);
  }, []);

  const media = useMediaManager(saveImage);

  const showSaveSuccessAlert = () => {
    openAlert({
      type: "success",
      title: "Success",
      message: "Saved successfully",
      confirmText: "OK",
      onConfirm: closeAlert,
    });
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const user = await StorageService.getUser();
      if (user && user.uid) {
        const finalName = isAnonymous ? originalData.name : data.name;
        const finalEmail = isAnonymous ? originalData.email : data.email;

        const [firstName, ...lastNameParts] = finalName.split(" ");

        const updatedProfile = {
          firstName: firstName,
          lastName: lastNameParts.join(" "),
          email: finalEmail,
          phone: data.phone,
          isAnonymous: isAnonymous,
        };

        await UsersService.createUserProfile(user.uid, updatedProfile);

        setOriginalData({
          name: finalName,
          email: finalEmail,
          phone: data.phone,
          isAnonymous: isAnonymous,
        });
        Keyboard.dismiss();
        reset(data);
        showSaveSuccessAlert();
      }
    } catch (error) {
      openAlert({
        type: "error",
        title: "Error",
        message: "Something went wrong",
        confirmText: "OK",
        onConfirm: closeAlert,
      });
      console.error("Error saving profile:", error);
    }
  };
  const handleAnonymousChange = () => {
    const newStatus = !isAnonymous;
    setIsAnonymous(newStatus);
    setValue("isAnonymous", newStatus, { shouldDirty: true });

    if (newStatus) {
      setOriginalData({ ...getValues(), isAnonymous: false });
      setValue("name", "Anonymous", { shouldDirty: true });
      setValue("email", "************", { shouldDirty: true });
    } else {
      setValue("name", originalData.name, { shouldDirty: true });
      setValue("email", originalData.email, { shouldDirty: true });
    }
  };

  const hasChanges = isDirty || isAnonymous !== originalData.isAnonymous;

  return {
    control,
    errors,
    isDirty: hasChanges,
    isLoading,
    isAnonymous,
    isNotificationsEnabled,
    setIsNotificationsEnabled,
    handleSubmit,
    onSubmit,
    handleAnonymousChange,
    triggerLogoutAlert,
    confirmLogout,
    profileImage,
    media,
    alert,
    closeAlert,
  };
};
