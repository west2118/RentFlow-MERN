import { Button } from "@/components/ui/button";
import type { Documents } from "@/hooks/useFileUploader";
import { FileText, XCircle } from "lucide-react";
import React from "react";

const LandlordLeaseDocumentCard = ({
  document,
  index,
  handleRemoveDocument,
}: {
  document: Documents;
  index: number;
  handleRemoveDocument: (i: number) => void;
}) => {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center space-x-3">
        <FileText className="h-5 w-5 text-primary shrink-0" />
        <div>
          <a target="_blank" href={document.preview} className="font-medium">
            {document.name}
          </a>
          <p className="text-xs text-muted-foreground">{document.size}</p>
        </div>
      </div>
      <Button
        onClick={() => handleRemoveDocument(index)}
        variant="ghost"
        type="button"
        size="icon">
        <XCircle className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  );
};

export default LandlordLeaseDocumentCard;
