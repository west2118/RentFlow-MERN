import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import LandlordDashboardPaymentLoading from "../../landlord/dashboard/LandlordDashboardPaymentLoading";

export const LandlordMaintenanceRentCardSkeleton = () => (
  <Card>
    <CardHeader>
      <CardTitle>Upcoming Rent Due</CardTitle>
      <CardDescription>Payments expected in the next 7 days</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <LandlordDashboardPaymentLoading key={index} />
        ))}
      </div>
    </CardContent>
    <CardFooter className="mt-auto flex justify-end">
      <Button variant="outline" disabled>
        View All Payments
      </Button>
    </CardFooter>
  </Card>
);
