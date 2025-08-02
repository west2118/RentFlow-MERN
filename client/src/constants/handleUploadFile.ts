import axios from "axios";

export const handleUploadFile = async (file: File | null) => {
  const formData = new FormData();
  formData.append("file", file!);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDNAME);
  formData.append("cloud_name", "documents");

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_FILE_UPLOAD_PRESET
    }/auto/upload`,
    formData
  );

  return res.data.secure_url;
};
