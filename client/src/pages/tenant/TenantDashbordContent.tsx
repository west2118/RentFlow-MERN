import { Suspense } from "react";
import TenantDashboardSummaryCards from "@/components/app/tenant/dashboard/TenantDashboardSummaryCards";
import TenantDashboardMaintenanceRequests from "@/components/app/tenant/dashboard/TenantDashboardMaintenanceRequests";
import { SummaryCardSkeletonGrid } from "@/components/app/shared/skeletons/SummaryCardSkeletonGrid";
import { LandlordDashboardMaintenanceCardSkeleton } from "@/components/app/shared/skeletons/LandlordDashboardMaintenanceCardSkeleton";

const TenantDashbordContent = () => {

  return (
    <main className="p-6">
      <Suspense fallback={<SummaryCardSkeletonGrid />}>
        <TenantDashboardSummaryCards />
      </Suspense>

      {/* Maintenance Requests */}
      <Suspense fallback={<LandlordDashboardMaintenanceCardSkeleton />}>
        <TenantDashboardMaintenanceRequests />
      </Suspense>
    </main>
  );
};

export default TenantDashbordContent;
