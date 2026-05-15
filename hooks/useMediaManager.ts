import { useState } from "react";
import { MediaService } from "@/services/MediaService";

export const useMediaManager = (onImage: (uri: string) => void) => {
  const [visible, setVisible] = useState(false);

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  const openCamera = async () => {
    const photo = await MediaService.takePhoto();
    if (photo) onImage(photo);
    closeModal();
  };

  const openGallery = async () => {
    const uri = await MediaService.pickFromGallery();
    if (uri) onImage(uri);
    closeModal();
  };

  return {
    visible,
    openModal,
    closeModal,
    openCamera,
    openGallery,
  };
};
