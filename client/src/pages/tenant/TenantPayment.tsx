import TenantPaymentCurrentDueCard from "@/components/app/tenant/payments/TenantPaymentCurrentDueCard";
import TenantPaymentStatusCard from "@/components/app/tenant/payments/TenantPaymentStatusCard";
import { useUserStore } from "@/store/useUserStore";
import type { PaymentType } from "@/types/paymentTypes";
import { Loading } from "@/components/app/Loading";
import TenantPaymentCompletedTableCard from "@/components/app/tenant/payments/TenantPaymentCompletedTableCard";
import TenantPaymentNextMonthCard from "@/components/app/tenant/payments/TenantPaymentNextMonthCard";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchData } from "@/constants/fetchData";
import { useState } from "react";
import { useDebounceInput } from "@/hooks/useDebounceInput";
import WithSkeleton from "@/constants/WithSkeleton";
import PaymentLoadingSkeleton from "@/components/app/PaymentLoadingSkeleton";
import type { LeaseType } from "@/types/leaseTypes";

type DataType = {
  lease?: LeaseType;
  paymentMonth: PaymentType;
  completedPayment: PaymentType[];
  nextMonthPayment: PaymentType;
  total: number;
  page: number;
  totalPages: number;
};

const TenantPayment = () => {
  const token = useUserStore((state) => state.userToken);

  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounceInput(search);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useQuery<DataType>({
    queryKey: ["tenant-payment", page, limit, debouncedSearch, status],
    queryFn: fetchData(
      `http://localhost:8080/api/tenant-payment?page=${page}${
        status !== "All" ? `&status=${status}` : ""
      }&limit=${limit}${debouncedSearch ? `&search=${debouncedSearch}` : ""}`,
      token
    ),
    enabled: !!token,
    placeholderData: keepPreviousData,
  });

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Payments</h2>
      </div>

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

      {/* Payment History Table */}
      <TenantPaymentCompletedTableCard
        setSearch={setSearch}
        setPage={setPage}
        limit={limit}
        setStatus={setStatus}
        status={status}
        search={search}
        item={data?.completedPayment ?? []}
        total={data?.total ?? 0}
        page={data?.page ?? 0}
        totalPages={data?.totalPages ?? 0}
        isLoading={isLoading}
      />
    </main>
  );
};

export default TenantPayment;
