import { Button } from "@/components/ui/button";
import { Plus, History } from "lucide-react";
import useFetchData from "@/hooks/useFetchData";
import { useUserStore } from "@/store/useUserStore";
import { Loading } from "@/components/app/Loading";
import LandlordPaymentTotalMonthCard from "@/components/app/landlord/payments/LandlordPaymentTotalMonthCard";
import LandlordPaymentCollectedCard from "@/components/app/landlord/payments/LandlordPaymentCollectedCard";
import LandlordPaymentTotalOverdue from "@/components/app/landlord/payments/LandlordPaymentTotalOverdue";
import LandlordPaymentRentDueCard from "@/components/app/landlord/payments/LandlordPaymentRentDueCard";
import LandlordPaymentActionsCard from "@/components/app/landlord/payments/LandlordPaymentActionsCard";
import type { PaymentType } from "@/types/paymentTypes";
import { useNavigate } from "react-router-dom";

export function LandlordPayments() {
  const navigate = useNavigate();
  const token = useUserStore((state) => state.userToken);
  const { data, loading, error } = useFetchData<PaymentType[]>(
    "http://localhost:8080/api/payments-month",
    token
  );

  const totalDue = data
    ?.filter((item) => item.status === "Pending" || item.status === "Overdue")
    .reduce((accu, curr) => accu + curr.totalAmount!, 0);
  const totalUnits = data?.filter(
    (item) => item.status === "Pending" || item.status === "Overdue"
  ).length;

  const totalPaid = data
    ?.filter((item) => item.status === "Paid")
    .reduce((accu, curr) => accu + curr.totalAmount!, 0);
  const totalRent = data?.reduce((accu, curr) => accu + curr.totalAmount!, 0);

  const totalOverdue = data
    ?.filter((item) => item.status === "Overdue")
    .reduce((accu, curr) => accu + curr.totalAmount!, 0);
  const totalUnitOverdue = data?.filter(
    (item) => item.status === "Overdue"
  ).length;

  if (loading || !data) {
    return <Loading />;
  }

  console.log(data);

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Payments</h2>
        <div className="flex space-x-2">
          <Button
            onClick={() => navigate("/landlord/payment-history")}
            variant="outline">
            <History className="h-4 w-4 mr-2" />
            Payment History
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Record Payment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Payment Summary Cards */}
        <LandlordPaymentTotalMonthCard
          totalDue={totalDue}
          totalUnits={totalUnits}
        />

        <LandlordPaymentCollectedCard
          totalPaid={totalPaid}
          totalRent={totalRent}
        />

        <LandlordPaymentTotalOverdue
          totalOverdue={totalOverdue}
          totalUnitOverdue={totalUnitOverdue}
        />
      </div>

      {/* Rent Due List */}
      <LandlordPaymentRentDueCard data={data} />

      {/* Payment Actions */}
      {/* <LandlordPaymentActionsCard /> */}
    </main>
  );
}
