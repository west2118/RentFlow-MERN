import { Suspense } from "react";
import TenantUnitDetailsLeaseCards from "@/components/app/tenant/unit/TenantUnitDetailsLeaseCards";
import { TenantUnitDetailsLeaseSkeleton } from "@/components/app/shared/skeletons/TenantUnitDetailsLeaseSkeleton";
import TenantUnitCommunityRulesCard from "@/components/app/tenant/unit/TenantUnitCommunityRulesCard";

const TenantUnit = () => {

  return (
    <main className="p-6">
      <Suspense fallback={<TenantUnitDetailsLeaseSkeleton />}>
        <TenantUnitDetailsLeaseCards />
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Rules & Regulations Card */}
        <TenantUnitCommunityRulesCard />
      </div>
    </main>
  );
};

export default TenantUnit;
