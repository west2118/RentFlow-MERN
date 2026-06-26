import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchData } from "@/constants/fetchData";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import TenantUnitDetailsCards from "@/components/app/tenant/unit/TenantUnitDetailsCards";
import TenantUnitLeaseInfoCard from "@/components/app/tenant/unit/TenantUnitLeaseInfoCard";
import type { UnitType } from "@/types/unitTypes";
import type { LeaseType } from "@/types/leaseTypes";

type DataType = {
  unit: UnitType;
  lease: LeaseType;
};

const TenantUnitDetailsLeaseCards = () => {
  const { data } = useSuspenseQuery<DataType>({
    queryKey: ["tenant-unit-lease"],
    queryFn: fetchData("http://localhost:8080/api/tenant-unit-lease"),
  });

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">My Unit</h2>
          <p className="text-muted-foreground">
            Unit {data?.unit?.unitNumber} - {data?.unit?.address}
          </p>
        </div>
        <Button variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          Download Lease
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Unit Details Card */}
        <TenantUnitDetailsCards
          unit={data?.unit}
          status={data?.lease.status ?? ""}
        />

        {/* Lease Information Card */}
        <TenantUnitLeaseInfoCard
          lease={data?.lease}
          status={data?.lease.status ?? ""}
        />
      </div>
    </>
  );
};

export default TenantUnitDetailsLeaseCards;
