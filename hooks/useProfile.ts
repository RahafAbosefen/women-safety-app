import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import StorageService from "@/services/StorageService";
import { UsersService } from "@/services/UsersService";

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  isAnonymous: boolean;
}

export const useProfile = () => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    defaultValues: { name: "", email: "", phone: "", isAnonymous: false },
  });

  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
        reset(data);
        alert("تم حفظ التعديلات بنجاح!");
      }
    } catch (error) {
      console.error("Save Error:", error);
      alert("حدث خطأ أثناء الحفظ.");
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
  };
};
