import { Button } from "@/components/ui/button";
import { Plus, History } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { Loading } from "@/components/app/Loading";
import LandlordPaymentTotalMonthCard from "@/components/app/landlord/payments/LandlordPaymentTotalMonthCard";
import LandlordPaymentCollectedCard from "@/components/app/landlord/payments/LandlordPaymentCollectedCard";
import LandlordPaymentTotalOverdue from "@/components/app/landlord/payments/LandlordPaymentTotalOverdue";
import LandlordPaymentRentDueCard from "@/components/app/landlord/payments/LandlordPaymentRentDueCard";
import LandlordPaymentActionsCard from "@/components/app/landlord/payments/LandlordPaymentActionsCard";
import type { PaymentType } from "@/types/paymentTypes";
import { useNavigate } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchData } from "@/constants/fetchData";
import { useDebounceInput } from "@/hooks/useDebounceInput";
import { useState } from "react";
import PaymentLoadingSkeleton from "@/components/app/PaymentLoadingSkeleton";
import WithSkeleton from "@/constants/WithSkeleton";
import PaymentLoadingSkeletonWithProgress from "@/components/app/PaymentLoadingSkeletonWithProgress";

type DataType = {
  totalDue: number;
  totalUnits: number;
  totalPaid: number;
  totalRent: number;
  totalOverdue: number;
  totalUnitOverdue: number;
  payments: PaymentType[];
  total: number;
  page: number;
  totalPages: number;
};

export function LandlordPayments() {
  const navigate = useNavigate();
  const token = useUserStore((state) => state.userToken);

  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounceInput(search);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useQuery<DataType>({
    queryKey: ["payments-month", page, limit, status, debouncedSearch],
    queryFn: fetchData(
      `http://localhost:8080/api/payments-month?page=${page}${
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
        <WithSkeleton
          isLoading={isLoading}
          skeleton={<PaymentLoadingSkeleton />}>
          <LandlordPaymentTotalMonthCard
            totalDue={data?.totalDue}
            totalUnits={data?.totalUnits}
          />
        </WithSkeleton>

        <WithSkeleton
          isLoading={isLoading}
          skeleton={<PaymentLoadingSkeletonWithProgress />}>
          <LandlordPaymentCollectedCard
            totalPaid={data?.totalPaid}
            totalRent={data?.totalRent}
          />
        </WithSkeleton>

        <WithSkeleton
          isLoading={isLoading}
          skeleton={<PaymentLoadingSkeleton />}>
          <LandlordPaymentTotalOverdue
            totalOverdue={data?.totalOverdue}
            totalUnitOverdue={data?.totalUnitOverdue}
          />
        </WithSkeleton>
      </div>

      {/* Rent Due List */}
      <LandlordPaymentRentDueCard
        setSearch={setSearch}
        setPage={setPage}
        limit={limit}
        setStatus={setStatus}
        status={status}
        search={search}
        payments={data?.payments ?? []}
        total={data?.total ?? 0}
        page={data?.page ?? 0}
        totalPages={data?.totalPages ?? 0}
        isLoading={isLoading}
      />

      {/* Payment Actions */}
      {/* <LandlordPaymentActionsCard /> */}
    </main>
  );
}
