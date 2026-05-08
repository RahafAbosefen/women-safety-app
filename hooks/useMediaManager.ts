import { useState } from "react";
import StorageService from "@/services/StorageService";
import { MediaService } from "@/services/MediaService";

export const useMediaManager = (onImage: (uri: string) => void) => {
  const [visible, setVisible] = useState(false);

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  const openCamera = async () => {
    const photo = await MediaService.takePhoto();
    if (photo?.uri) onImage(photo.uri);
    closeModal();
  };

  const openGallery = async () => {
    const uri = await MediaService.pickFromGallery();
    if (uri) onImage(uri);
    closeModal();
  };

  const removeImage = async () => {
    await StorageService.removeProfileImage();
    onImage("");
    closeModal();
  };

  return {
    visible,
    openModal,
    closeModal,
    openCamera,
    openGallery,
    removeImage,
  };
};
