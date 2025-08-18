import { TableCell, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import React from "react";

const NoDataFoundTable = ({
  numberOfSpan,
  label,
}: {
  numberOfSpan: number;
  label: string;
}) => {
  return (
    <TableRow>
      <TableCell colSpan={numberOfSpan} className="text-center py-10">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="rounded-full bg-muted p-4">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default NoDataFoundTable;
