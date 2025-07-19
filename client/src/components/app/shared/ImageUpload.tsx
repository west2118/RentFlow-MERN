import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import React from "react";

type ImageUploadProps = {
  label: string;
  imageData: {
    preview: string | null;
  };
  onChangeImage: (e: any, type: string) => void;
  name: string;
  width?: number;
};

const ImageUpload = ({
  label,
  imageData,
  onChangeImage,
  name,
  width = 200,
}: ImageUploadProps) => {
  return (
    <div className={`space-y-2 w-[${width}px]`}>
      <Label>{label}</Label>

      <div className="relative w-full h-full">
        {/* Preview or Upload Area */}
        {imageData.preview ? (
          <div className="w-full h-[240px]">
            <img
              src={imageData.preview}
              className="w-full h-full object-cover border rounded-lg"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-[240px] border-2 border-dashed border-gray-300 rounded-lg bg-gray-50/50">
            <Upload className="h-8 w-8 text-gray-400 mb-3" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">No file selected</span>
            </p>
          </div>
        )}

        {/* Always visible file input */}
        <div className="mt-3">
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => onChangeImage(e, name)}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground mt-1">
            PNG, JPG (MAX. 5MB)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
