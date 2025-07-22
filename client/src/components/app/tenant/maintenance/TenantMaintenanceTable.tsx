import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { formatDate } from "@/constants/formatDate";
import { statusStyle } from "@/constants/statusStyle";
import type { MaintenanceType } from "@/types/maintenanceTypes";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  MessageSquare,
  MoreVertical,
  Pencil,
  Trash,
} from "lucide-react";

const TenantMaintenanceTable = ({ item }: { item: MaintenanceType }) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{item?.requestName}</TableCell>
      <TableCell>{formatDate(item?.createdAt)}</TableCell>
      <TableCell>{statusStyle(item?.status)}</TableCell>
      <TableCell>
        {item?.techNotes
          ? `${item.techNotes.slice(0, 40)}...`
          : "Technician notes will appear here once completed"}
      </TableCell>
      <TableCell className="text-right space-x-2">
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TenantMaintenanceTable;
