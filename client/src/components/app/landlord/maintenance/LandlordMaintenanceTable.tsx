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
  Clock,
  Home,
  MessageSquare,
  MoreVertical,
  User,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import LandlordManageRequestModal from "./LandlordManageRequestModal";

const LandlordMaintenanceTable = ({ item }: { item: MaintenanceType }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center space-x-3">
          <Wrench className="h-5 w-5 text-primary" />
          <div>
            <p>Leaky Faucet</p>
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
        <div className="flex justify-end space-x-1">
          {item?.status === "Pending" ? (
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setSelectedStatus("In Progress");
              }}
              variant="destructive">
              Mark as In Progress
            </Button>
          ) : item?.status === "Completed" ? (
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setSelectedStatus("Completed");
              }}
              variant="outline">
              Mark as Completed
            </Button>
          )}
        </div>
      </TableCell>

      {isModalOpen && (
        <LandlordManageRequestModal
          item={item}
          isModalOpen={isModalOpen}
          onCloseModal={() => setIsModalOpen(false)}
          status={selectedStatus || undefined}
        />
      )}
    </TableRow>
  );
};

export default LandlordMaintenanceTable;
