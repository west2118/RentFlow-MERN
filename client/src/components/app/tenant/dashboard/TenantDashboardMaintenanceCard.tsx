import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/constants/formatDate";
import { statusStyle } from "@/constants/statusStyle";
import type { MaintenanceType } from "@/types/maintenanceTypes";
import { Clock, Wrench } from "lucide-react";

const TenantDashboardMaintenanceCard = ({
  item,
}: {
  item: MaintenanceType;
}) => {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center space-x-4">
        <Wrench className="h-5 w-5 text-primary" />
        <div>
          <p className="font-medium">{item?.requestName}</p>
          <p className="text-sm text-muted-foreground">
            Submitted: {formatDate(item?.createdAt)}
          </p>
        </div>
      </div>
      {statusStyle(item?.status)}
    </div>
  );
};

export default TenantDashboardMaintenanceCard;
