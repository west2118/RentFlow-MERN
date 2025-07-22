import { Loading } from "@/components/app/Loading";
import TenantUnitDetailsCards from "@/components/app/tenant/unit/TenantUnitDetailsCards";
import TenantUnitLeaseInfoCard from "@/components/app/tenant/unit/TenantUnitLeaseInfoCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import useFetchData from "@/hooks/useFetchData";
import { useUserStore } from "@/store/useUserStore";
import type { LeaseType } from "@/types/leaseTypes";
import type { UnitType } from "@/types/unitTypes";
import { Download, FileText } from "lucide-react";

type DataType = {
  unit: UnitType;
  lease: LeaseType;
};

const TenantUnit = () => {
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.userToken);
  const { data, loading, error } = useFetchData<DataType>(
    `http://localhost:8080/api/unit-lease`,
    token
  );

  if (loading || !data) return <Loading />;

  return (
    <main className="p-6">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Unit Details Card */}
        {data?.unit && <TenantUnitDetailsCards unit={data?.unit} />}

        {/* Lease Information Card */}
        {data?.lease && <TenantUnitLeaseInfoCard lease={data?.lease} />}

        {/* Rules & Regulations Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Community Rules</CardTitle>
            <CardDescription>
              Important policies for your building
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                  <span className="text-xs">1</span>
                </div>
                <p>Quiet hours from 10pm to 7am daily</p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                  <span className="text-xs">2</span>
                </div>
                <p>No smoking in units or common areas</p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                  <span className="text-xs">3</span>
                </div>
                <p>
                  Maximum 2 overnight guests for no more than 7 consecutive
                  nights
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                  <span className="text-xs">4</span>
                </div>
                <p>Trash must be taken to dumpsters daily</p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                  <span className="text-xs">5</span>
                </div>
                <p>No modifications to unit without written approval</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default TenantUnit;
