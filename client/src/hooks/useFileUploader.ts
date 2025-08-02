import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export type Documents = {
  file: File;
  preview: string;
  name: string;
  size: string;
};

export const useDocumentUploader = () => {
  const [documents, setDocumuents] = useState<Documents[]>([]);

  const handleDocumentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (!file) return;

    const newDocs = Array.from(file).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
    }));

    setDocumuents((prev) => {
      const existingFiles = new Set(prev.map((doc) => doc.name + doc.size));
      const filteredDocs = newDocs.filter(
        (doc) => !existingFiles.has(doc.name + doc.size)
      );
      return [...prev, ...filteredDocs];
    });
  };

  const uploadDocuments = async () => {
    const uploadedUrls = [];

    for (const doc of documents) {
      const formData = new FormData();
      formData.append("file", doc.file);
      formData.append("upload_preset", import.meta.env.VITE_FILE_UPLOAD_PRESET);
      formData.append("folder", "documents");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDNAME
          }/auto/upload`,
          formData
        );

        uploadedUrls.push({
          name: doc.name,
          size: doc.size,
          file: response.data.secure_url,
        });
      } catch (error: any) {
        toast.error(error.response?.data?.message || error.message);
      }
    }

    return uploadedUrls;
  };

  return { documents, handleDocumentsChange, uploadDocuments, setDocumuents };
};
