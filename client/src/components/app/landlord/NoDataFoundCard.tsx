import { FileWarning } from "lucide-react";
import React from "react";

const NoDataFoundCard = ({ label }: { label: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-50 text-center text-muted-foreground">
      <FileWarning className="w-8 h-8 mb-2" />
      <p className="text-sm">{label}</p>
    </div>
  );
};

export default NoDataFoundCard;
