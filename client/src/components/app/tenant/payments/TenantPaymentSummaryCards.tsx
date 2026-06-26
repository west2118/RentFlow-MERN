import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/constants/fetchData";
import WithSkeleton from "@/constants/WithSkeleton";
import PaymentLoadingSkeleton from "@/components/app/PaymentLoadingSkeleton";
import TenantPaymentCurrentDueCard from "./TenantPaymentCurrentDueCard";
import TenantPaymentStatusCard from "./TenantPaymentStatusCard";
import TenantPaymentNextMonthCard from "./TenantPaymentNextMonthCard";
import type { PaymentType } from "@/types/paymentTypes";
import type { LeaseType } from "@/types/leaseTypes";

type SummaryDataType = {
  lease?: LeaseType;
  paymentMonth: PaymentType;
  nextMonthPayment: PaymentType;
};

const TenantPaymentSummaryCards = () => {
  const { data, isLoading } = useQuery<SummaryDataType>({
    queryKey: ["tenant-payment-summary"],
    queryFn: fetchData("http://localhost:8080/api/tenant-payment/summary"),
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <WithSkeleton
        isLoading={isLoading}
        skeleton={<PaymentLoadingSkeleton />}>
        <TenantPaymentCurrentDueCard
          item={data?.paymentMonth}
          expired={data?.lease?.status ?? ""}
        />
      </WithSkeleton>

      <WithSkeleton
        isLoading={isLoading}
        skeleton={<PaymentLoadingSkeleton />}>
        <TenantPaymentStatusCard
          status={data?.paymentMonth ? data?.paymentMonth.status : ""}
          expired={data?.lease?.status ?? ""}
        />
      </WithSkeleton>

      <WithSkeleton
        isLoading={isLoading}
        skeleton={<PaymentLoadingSkeleton />}>
        <TenantPaymentNextMonthCard
          item={data?.nextMonthPayment}
          expired={data?.lease?.status ?? ""}
        />
      </WithSkeleton>
    </div>
  );
};

export default TenantPaymentSummaryCards;
