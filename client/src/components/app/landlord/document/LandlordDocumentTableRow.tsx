import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { folderTypes } from "@/constants/folders";
import { formatDate } from "@/constants/formatDate";
import type { DocumentType } from "@/types/documentTypes";
import { Download, FileText, Folder, Trash2 } from "lucide-react";

const LandlordDocumentTableRow = ({ item }: { item: DocumentType }) => {
  const folderLabel = folderTypes.find(
    (folder) => folder.value === item.category
  );

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center space-x-3">
          <FileText className="h-5 w-5 text-primary" />
          <div>
            <a
              href={item.documents[0].file}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline">
              {item.documents[0].name}
            </a>
            <p className="text-sm text-muted-foreground">
              {`Unit ${item.unitNumber} - ${item.tenantFullName}`}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline">
          {item.documents[0].name.split(".")[1].toUpperCase()}
        </Badge>
      </TableCell>
      <TableCell>{formatDate(item.createdAt.toString())}</TableCell>
      <TableCell>{item.documents[0].size}</TableCell>
      <TableCell>
        <div className="flex items-center">
          <Folder className="h-4 w-4 mr-2 text-muted-foreground" />
          {folderLabel?.label}
        </div>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end space-x-1">
          <Button variant="ghost" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default LandlordDocumentTableRow;
