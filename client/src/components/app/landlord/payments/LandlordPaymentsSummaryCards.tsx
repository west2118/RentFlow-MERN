import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/constants/fetchData";
import PaymentLoadingSkeleton from "@/components/app/PaymentLoadingSkeleton";
import WithSkeleton from "@/constants/WithSkeleton";
import PaymentLoadingSkeletonWithProgress from "@/components/app/PaymentLoadingSkeletonWithProgress";
import LandlordPaymentTotalMonthCard from "@/components/app/landlord/payments/LandlordPaymentTotalMonthCard";
import LandlordPaymentCollectedCard from "@/components/app/landlord/payments/LandlordPaymentCollectedCard";
import LandlordPaymentTotalOverdue from "@/components/app/landlord/payments/LandlordPaymentTotalOverdue";

type SummaryDataType = {
  totalDue: number;
  totalUnits: number;
  totalPaid: number;
  totalRent: number;
  totalOverdue: number;
  totalUnitOverdue: number;
};

export function LandlordPaymentsSummaryCards() {
  const { data, isLoading } = useQuery<SummaryDataType>({
    queryKey: ["payments-month-summary"],
    queryFn: fetchData(`http://localhost:8080/api/payments-month-summary`),
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Payment Summary Cards */}
      <WithSkeleton isLoading={isLoading} skeleton={<PaymentLoadingSkeleton />}>
        <LandlordPaymentTotalMonthCard
          totalDue={data?.totalDue || 0}
          totalUnits={data?.totalUnits || 0}
        />
      </WithSkeleton>

      <WithSkeleton
        isLoading={isLoading}
        skeleton={<PaymentLoadingSkeletonWithProgress />}>
        <LandlordPaymentCollectedCard
          totalPaid={data?.totalPaid || 0}
          totalRent={data?.totalRent || 0}
        />
      </WithSkeleton>

      <WithSkeleton isLoading={isLoading} skeleton={<PaymentLoadingSkeleton />}>
        <LandlordPaymentTotalOverdue
          totalOverdue={data?.totalOverdue || 0}
          totalUnitOverdue={data?.totalUnitOverdue || 0}
        />
      </WithSkeleton>
    </div>
  );
}
