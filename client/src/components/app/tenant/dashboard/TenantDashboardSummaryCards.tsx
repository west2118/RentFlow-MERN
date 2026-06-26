import React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchData } from "@/constants/fetchData";
import TenantDashboardUnitCard from "@/components/app/tenant/dashboard/TenantDashboardUnitCard";
import TenantDashboardRentCard from "@/components/app/tenant/dashboard/TenantDashboardRentCard";
import TenantDashboardLeaseCard from "@/components/app/tenant/dashboard/TenantDashboardLeaseCard";
import type { UnitType } from "@/types/unitTypes";
import type { LeaseType } from "@/types/leaseTypes";
import type { PaymentType } from "@/types/paymentTypes";

type DataType = {
  unit: UnitType;
  lease: LeaseType;
  payment: PaymentType | null;
};

const TenantDashboardSummaryCards = () => {
  const { data } = useSuspenseQuery<DataType>({
    queryKey: ["tenant-unit-lease-payment"],
    queryFn: fetchData("http://localhost:8080/api/unit-lease"),
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {/* My Unit Card */}
      <TenantDashboardUnitCard
        unit={data?.unit}
        status={data?.lease?.status ?? ""}
      />

      {/* Rent Status Card */}
      <TenantDashboardRentCard
        payment={data?.payment!}
        status={data?.lease?.status ?? ""}
      />

      {/* Lease Info Card */}
      <TenantDashboardLeaseCard
        lease={data?.lease}
        status={data?.lease?.status ?? ""}
      />
    </div>
  );
};

export default TenantDashboardSummaryCards;
