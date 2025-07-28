import { Badge } from "@/components/ui/badge";
import { statusStyle } from "@/constants/statusStyle";
import type { MaintenanceType } from "@/types/maintenanceTypes";
import { Clock, Wrench } from "lucide-react";

const LandlordMaintenanceLatestCard = ({
  maintenance,
}: {
  maintenance: MaintenanceType;
}) => {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center space-x-4">
        <Wrench className="h-5 w-5 text-primary" />
        <div>
          <p className="font-medium">{maintenance?.issueType}</p>
          <p className="text-sm text-muted-foreground">
            Unit {maintenance?.unitNumber}
          </p>
        </div>
      </div>
      {statusStyle(maintenance?.status)}
    </div>
  );
};

export default LandlordMaintenanceLatestCard;
