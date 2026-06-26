import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import LandlordDashboardMaintenanceLoading from "../../landlord/dashboard/LandlordDashboardMaintenanceLoading";

export const LandlordDashboardMaintenanceCardSkeleton = () => (
  <Card className="lg:col-span-2">
    <CardHeader>
      <CardTitle>Maintenance Overview</CardTitle>
      <CardDescription>
        Recent maintenance requests and status
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <LandlordDashboardMaintenanceLoading key={index} />
        ))}
      </div>
    </CardContent>
  </Card>
);
