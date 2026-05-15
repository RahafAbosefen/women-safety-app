// const CLOUD_NAME = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
// const UPLOAD_PRESET = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

// export const CloudinaryService = {
//   uploadImage: async (imageUri: string) => {
//     try {
//       const formData = new FormData();
//       formData.append("file", {
//         uri: imageUri,
//         type: "image/jpeg",
//         name: "upload.jpg",
//       } as any);
//       formData.append("upload_preset", UPLOAD_PRESET!);

//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await response.json();
//       return data.secure_url as string;
//     } catch (error) {
//       console.error("Cloudinary Error:", error);
//       throw error;
//     }
//   },
// };


const CLOUD_NAME = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export const CloudinaryService = {
  uploadImage: async (imageUri: string) => {
    try {
      const formData = new FormData();

      formData.append("file", {
        uri: imageUri,
        type: "image/jpeg",
        name: "upload.jpg",
      } as any);

      formData.append("upload_preset", UPLOAD_PRESET!);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log("Cloudinary Image Error:", data);
        throw new Error("Image upload failed");
      }

      return data.secure_url as string;
    } catch (error) {
      console.error("Cloudinary Error:", error);
      throw error;
    }
  },

  uploadAudio: async (audioUri: string) => {
    try {
      const formData = new FormData();

      formData.append("file", {
        uri: audioUri,
        type: "audio/m4a",
        name: `audio_${Date.now()}.m4a`,
      } as any);

      formData.append("upload_preset", UPLOAD_PRESET!);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log("Cloudinary Audio Error:", data);
        throw new Error("Audio upload failed");
      }

      return data.secure_url as string;
    } catch (error) {
      console.error("Cloudinary Audio Error:", error);
      throw error;
    }
  },
};