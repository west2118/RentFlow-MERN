import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export type UploadedImage = {
  file: string | File | null;
  preview: string | null;
};

export type ImageMap<T extends string> = Record<T, UploadedImage>;

export const useImageUploader = <T extends string>(initialTypes: T[]) => {
  const [images, setImages] = useState<ImageMap<T>>(
    () =>
      Object.fromEntries(
        initialTypes.map((type) => [type, { file: null, preview: null }])
      ) as ImageMap<T>
  );

  const handleImageChange = (e: any, type: string) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);

    setImages((prev) => ({
      ...prev,
      [type]: { file, preview },
    }));
  };

  const handleUploadImages = async () => {
    const uploadedUrls: { type: T; url: string }[] = [];

    for (const key in images) {
      const typedKey = key as T;
      const file = images[typedKey].file;
      if (!file) return;

      if (typeof file === "string") {
        uploadedUrls.push({
          type: typedKey,
          url: images[typedKey].preview!,
        });
        continue;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
      formData.append("folder", "movies");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDNAME
          }/image/upload`,
          formData
        );

        uploadedUrls.push({
          type: key,
          url: response.data.secure_url,
        });
      } catch (error: any) {
        toast.error(error.response?.data?.message || error.message);
      }
    }

    return uploadedUrls;
  };

  return { images, handleImageChange, handleUploadImages, setImages };
};
