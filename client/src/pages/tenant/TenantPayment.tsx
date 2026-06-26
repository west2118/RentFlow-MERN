import TenantPaymentCompletedTableCard from "@/components/app/tenant/payments/TenantPaymentCompletedTableCard";
import TenantPaymentSummaryCards from "@/components/app/tenant/payments/TenantPaymentSummaryCards";

const TenantPayment = () => {
  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Payments</h2>
      </div>

      <TenantPaymentSummaryCards />

      <TenantPaymentCompletedTableCard />
    </main>
  );
};

export default TenantPayment;
