import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { formatDate } from "@/constants/formatDate";
import { statusStyle } from "@/constants/statusStyle";
import type { MaintenanceType } from "@/types/maintenanceTypes";
import { Check, Eye, Home, MoreVertical, User, Wrench } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type HandleOpenModalProps = (
  status: "In Progress" | "Completed",
  item: MaintenanceType | null
) => void;

type HandleOpenDetailsModalProps = (item: MaintenanceType | null) => void;

const LandlordMaintenanceTable = ({
  item,
  handleOpenModal,
  handleOpenDetailsModal,
}: {
  item: MaintenanceType;
  handleOpenModal: HandleOpenModalProps;
  handleOpenDetailsModal: HandleOpenDetailsModalProps;
}) => {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center space-x-3">
          <Wrench className="h-5 w-5 text-primary" />
          <div>
            <p>{item?.requestName}</p>
            <p className="text-sm text-muted-foreground">
              Submitted: {formatDate(item?.createdAt)}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center">
          <Home className="h-4 w-4 mr-2 text-muted-foreground" />
          Unit {item?.unitNumber}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center">
          <User className="h-4 w-4 mr-2 text-muted-foreground" />
          {item?.tenantName}
        </div>
      </TableCell>
      <TableCell>{statusStyle(item?.status)}</TableCell>
      <TableCell className="text-right">
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
            {item?.status === "Pending" && (
              <DropdownMenuItem
                onClick={() => handleOpenModal("In Progress", item)}>
                <Check className="mr-1 h-4 w-4" />
                Mark as In Progress
              </DropdownMenuItem>
            )}
            {item?.status !== "Pending" && item?.status !== "Completed" && (
              <DropdownMenuItem
                onClick={() => handleOpenModal("Completed", item)}>
                <Check className="mr-1 h-4 w-4" />
                Mark as Completed
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default LandlordMaintenanceTable;
