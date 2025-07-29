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
import type { UnitType } from "@/types/unitTypes";
import { useQuery } from "@tanstack/react-query";
import { CalendarCheck } from "lucide-react";
import LandlordDashboardPaymentLatest from "./LandlordDashboardPaymentLatest";
import type { PaymentType } from "@/types/paymentTypes";
import { useNavigate } from "react-router-dom";
import LandlordDashboardPaymentLoading from "./LandlordDashboardPaymentLoading";
import NoDataFoundCard from "../NoDataFoundCard";

const LandlordMaintenanceRentCard = () => {
  const navigate = useNavigate();
  const token = useUserStore((state) => state.userToken);

  const { data, isLoading } = useQuery<PaymentType[]>({
    queryKey: ["latest-units"],
    queryFn: fetchData("http://localhost:8080/api/expected-payment", token),
    enabled: !!token,
  });

  console.log("Due date data: ", data);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Rent Due</CardTitle>
        <CardDescription>Payments expected in the next 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <>
              {[...Array(3)].map((_, index) => (
                <LandlordDashboardPaymentLoading key={index} />
              ))}
            </>
          ) : data && data.length > 0 ? (
            data?.map((payment) => (
              <LandlordDashboardPaymentLatest
                key={payment._id}
                payment={payment}
              />
            ))
          ) : (
            <NoDataFoundCard label="No maintenance records found" />
          )}
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex justify-end">
        <Button
          onClick={() => navigate("/landlord/payments")}
          variant="outline">
          View All Payments
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LandlordMaintenanceRentCard;
