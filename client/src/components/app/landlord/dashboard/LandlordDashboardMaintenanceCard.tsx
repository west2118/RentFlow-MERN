import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { fetchData } from "@/constants/fetchData";
import { useUserStore } from "@/store/useUserStore";
import { useQuery } from "@tanstack/react-query";
import {
  Wrench,
  AlertCircle,
  CheckCircle2,
  Clock,
  FileWarning,
} from "lucide-react";
import LandlordMaintenanceLatestCard from "./LandlordMaintenanceLatestCard";
import type { MaintenanceType } from "@/types/maintenanceTypes";
import DataLoading from "../../DataLoading";
import { useNavigate } from "react-router-dom";
import LandlordDashboardMaintenanceLoading from "./LandlordDashboardMaintenanceLoading";
import NoDataFoundCard from "../NoDataFoundCard";

const LandlordDashboardMaintenanceCard = () => {
  const navigate = useNavigate();
  const token = useUserStore((state) => state.userToken);

  const { data, isLoading } = useQuery<MaintenanceType[]>({
    queryKey: ["latest-maintenance"],
    queryFn: fetchData(
      "http://localhost:8080/api/landlord-latest-maintenance",
      token
    ),
    enabled: !!token,
  });

  console.log(data);

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Maintenance Overview</CardTitle>
        <CardDescription>
          Recent maintenance requests and status
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <LandlordDashboardMaintenanceLoading key={index} />
            ))}
          </div>
        ) : data && data.length > 0 ? (
          <div className="space-y-4">
            {data.map((maintenance) => (
              <LandlordMaintenanceLatestCard
                key={maintenance._id}
                maintenance={maintenance}
              />
            ))}
          </div>
        ) : (
          <NoDataFoundCard label="No maintenance records found" />
        )}
      </CardContent>
      {Array.isArray(data) && data.length > 0 && (
        <CardFooter className="mt-auto flex justify-end">
          <Button
            onClick={() => navigate("/landlord/maintenance")}
            variant="outline">
            View All Requests
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default LandlordDashboardMaintenanceCard;
