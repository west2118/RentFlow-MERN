import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";

const NoDataFound = ({
  numberOfSpan,
  label,
}: {
  numberOfSpan: number;
  label: string;
}) => {
  return (
    <TableRow>
      <TableCell colSpan={numberOfSpan} className="text-center py-10">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3l18 18M9.88 9.88A3 3 0 0112 9c.63 0 1.21.2 1.68.54m1.44 1.44A3 3 0 0115 12c0 .63-.2 1.21-.54 1.68M12 15h.01M9.17 9.17A3 3 0 009 12c0 .63.2 1.21.54 1.68M12 3a9 9 0 100 18 9 9 0 000-18z"
            />
          </svg>
          <span>{label}</span>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default NoDataFound;
