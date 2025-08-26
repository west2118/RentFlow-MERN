import TenantDashboardUnitCard from "@/components/app/tenant/dashboard/TenantDashboardUnitCard";
import { useUserStore } from "@/store/useUserStore";
import type { UnitType } from "@/types/unitTypes";
import type { LeaseType } from "@/types/leaseTypes";
import TenantDashboardRentCard from "@/components/app/tenant/dashboard/TenantDashboardRentCard";
import TenantDashboardLeaseCard from "@/components/app/tenant/dashboard/TenantDashboardLeaseCard";
import { Loading } from "@/components/app/Loading";
import type { PaymentType } from "@/types/paymentTypes";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/constants/fetchData";
import TenantDashboardMaintenanceRequests from "@/components/app/tenant/dashboard/TenantDashboardMaintenanceRequests";
import type { MaintenanceType } from "@/types/maintenanceTypes";

type DataType = {
  unit: UnitType;
  lease: LeaseType;
  payment: PaymentType | null;
  maintenance: MaintenanceType[];
};

const TenantDashbordContent = () => {
  const token = useUserStore((state) => state.userToken);

  const { data, isLoading } = useQuery<DataType>({
    queryKey: ["tenant-unit-lease-maintenance-payment"],
    queryFn: fetchData("http://localhost:8080/api/unit-lease", token),
    enabled: !!token,
  });

  console.log("Dashboard Data: ", data);

  if (isLoading) return <Loading />;

  return (
    <main className="p-6">
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

      {/* Maintenance Requests */}

      <TenantDashboardMaintenanceRequests
        maintenance={data?.maintenance ?? []}
      />
    </main>
  );
};

export default TenantDashbordContent;
