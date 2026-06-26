import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, AlertCircle, Clock, Plus } from "lucide-react";
import type { MaintenanceType } from "@/types/maintenanceTypes";
import TenantDashboardMaintenanceCard from "./TenantDashboardMaintenanceCard";
import NoDataFoundCard from "../../landlord/NoDataFoundCard";
import { useNavigate } from "react-router-dom";

import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchData } from "@/constants/fetchData";

const TenantDashboardMaintenanceRequests = () => {
  const navigate = useNavigate();

  const { data: maintenance } = useSuspenseQuery<MaintenanceType[]>({
    queryKey: ["tenant-recent-maintenance"],
    queryFn: fetchData("http://localhost:8080/api/tenant-recent-maintenance"),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Maintenance Requests</CardTitle>
        <CardDescription>Your current maintenance issues</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {maintenance && maintenance?.length > 0 ? (
            maintenance?.map((item) => (
              <TenantDashboardMaintenanceCard key={item?._id} item={item} />
            ))
          ) : (
            <NoDataFoundCard label="No Maintenance Record Found" />
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => navigate("/tenant/maintenance-request/create")}>
          <Plus className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TenantDashboardMaintenanceRequests;
