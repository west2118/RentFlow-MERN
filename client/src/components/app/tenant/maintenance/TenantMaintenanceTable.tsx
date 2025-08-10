import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableRow, TableCell } from "@/components/ui/table";
import { formatDate } from "@/constants/formatDate";
import { statusStyle } from "@/constants/statusStyle";
import type { MaintenanceType } from "@/types/maintenanceTypes";
import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TenantMaintenanceTable = ({
  item,
  handleOpenDetailsModal,
}: {
  item: MaintenanceType;
  handleOpenDetailsModal: (item: MaintenanceType) => void;
}) => {
  const navigate = useNavigate();

  return (
    <TableRow>
      <TableCell className="font-medium">{item?.requestName}</TableCell>
      <TableCell>{formatDate(item?.createdAt)}</TableCell>
      <TableCell>{statusStyle(item?.status)}</TableCell>
      <TableCell className="max-w-[200px] truncate">
        {item?.techNotes
          ? item.techNotes
          : "Technician notes will appear here once completed"}
      </TableCell>
      <TableCell className="text-right space-x-2">
        <Button variant="ghost" size="icon">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleOpenDetailsModal(item)}>
                <Eye className="mr-1 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  navigate(`/tenant/maintenance-request/edit/${item._id}`)
                }>
                <Pencil className="mr-1 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash2 className="mr-1 h-4 w-4 text-red-500" />
                <span className="text-red-500">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TenantMaintenanceTable;
