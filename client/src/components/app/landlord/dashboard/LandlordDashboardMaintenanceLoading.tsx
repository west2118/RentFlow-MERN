import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LandlordDashboardMaintenanceLoading = () => {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-5 w-5 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <Skeleton className="h-6 w-20 rounded-full" />
    </div>
  );
};

export default LandlordDashboardMaintenanceLoading;
