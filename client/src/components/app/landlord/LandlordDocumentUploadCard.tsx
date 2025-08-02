import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import type { Documents } from "@/hooks/useFileUploader";
import { FileText, XCircle } from "lucide-react";
import LandlordLeaseDocumentCard from "./lease/LandlordLeaseDocumentCard";

type LandlordDocumentUploadCardProps = {
  handleDocumentsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  documents: Documents[];
  handleRemoveDocument: (i: number) => void;
};

const LandlordDocumentUploadCard = ({
  handleDocumentsChange,
  documents,
  handleRemoveDocument,
}: LandlordDocumentUploadCardProps) => {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Lease Documents</CardTitle>
        <CardDescription>Upload signed lease agreements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <FileText className="h-10 w-10 text-muted-foreground mb-3" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-muted-foreground">
                PDF, DOCX, or JPG (MAX. 10MB)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              multiple
              onChange={handleDocumentsChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="space-y-3">
          {documents.map((document, index) => (
            <LandlordLeaseDocumentCard
              key={document.name}
              document={document}
              index={index}
              handleRemoveDocument={handleRemoveDocument}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LandlordDocumentUploadCard;
