import React, { Suspense } from "react";
import { Loading } from "@/components/app/Loading";
import LandlordDashboardMaintenanceCard from "@/components/app/landlord/dashboard/LandlordDashboardMaintenanceCard";
import LandlordMaintenanceRentCard from "@/components/app/landlord/dashboard/LandlordMaintenanceRentCard";
import LandlordDashboardSummaryCards from "@/components/app/landlord/dashboard/LandlordDashboardSummaryCards";
import { SummaryCardSkeletonGrid } from "@/components/app/shared/skeletons/SummaryCardSkeletonGrid";
import { LandlordDashboardMaintenanceCardSkeleton } from "@/components/app/shared/skeletons/LandlordDashboardMaintenanceCardSkeleton";
import { LandlordMaintenanceRentCardSkeleton } from "@/components/app/shared/skeletons/LandlordMaintenanceRentCardSkeleton";

const LandlordDashboardContent = () => {
  return (
    <main className="p-6">
      {/* Quick Stats */}
      <Suspense fallback={<SummaryCardSkeletonGrid />}>
        <LandlordDashboardSummaryCards />
      </Suspense>

      {/* Maintenance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Rent */}
        <Suspense fallback={<LandlordDashboardMaintenanceCardSkeleton />}>
          <LandlordDashboardMaintenanceCard />
        </Suspense>

        <Suspense fallback={<LandlordMaintenanceRentCardSkeleton />}>
          <LandlordMaintenanceRentCard />
        </Suspense>
      </div>
    </main>
  );
};

export default LandlordDashboardContent;
