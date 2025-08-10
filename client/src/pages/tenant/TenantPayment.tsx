import TenantPaymentCurrentDueCard from "@/components/app/tenant/payments/TenantPaymentCurrentDueCard";
import TenantPaymentStatusCard from "@/components/app/tenant/payments/TenantPaymentStatusCard";
import { useUserStore } from "@/store/useUserStore";
import useFetchData from "@/hooks/useFetchData";
import type { PaymentType } from "@/types/paymentTypes";
import { Loading } from "@/components/app/Loading";
import TenantPaymentCompletedTableCard from "@/components/app/tenant/payments/TenantPaymentCompletedTableCard";
import TenantPaymentNextMonthCard from "@/components/app/tenant/payments/TenantPaymentNextMonthCard";

type DataType = {
  paymentMonth: PaymentType;
  completedPayment: PaymentType[];
  nextMonthPayment: PaymentType;
};

const TenantPayment = () => {
  const token = useUserStore((state) => state.userToken);
  const { data, loading, error } = useFetchData<DataType>(
    `http://localhost:8080/api/tenant-payment`,
    token
  );

  if (loading || !data) return <Loading />;

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Payments</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Payment Summary Cards */}
        <TenantPaymentCurrentDueCard item={data?.paymentMonth} />

        <TenantPaymentStatusCard status={data?.paymentMonth.status} />

        <TenantPaymentNextMonthCard item={data?.nextMonthPayment} />
      </div>

      {/* Payment History Table */}
      <TenantPaymentCompletedTableCard item={data?.completedPayment} />
    </main>
  );
};

export default TenantPayment;
