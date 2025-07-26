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
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Wrench,
  DollarSign,
  FileText,
  Settings,
  Bell,
  CalendarDays,
  CheckCircle2,
  AlertCircle,
  Clock,
  Menu,
  User,
  ChevronDown,
  Plus,
} from "lucide-react";
import TenantDashboardUnitCard from "@/components/app/tenant/dashboard/TenantDashboardUnitCard";
import useFetchData from "@/hooks/useFetchData";
import { useUserStore } from "@/store/useUserStore";
import type { UnitType } from "@/types/unitTypes";
import type { LeaseType } from "@/types/leaseTypes";
import TenantDashboardRentCard from "@/components/app/tenant/dashboard/TenantDashboardRentCard";
import TenantDashboardLeaseCard from "@/components/app/tenant/dashboard/TenantDashboardLeaseCard";
import { Loading } from "@/components/app/Loading";
import type { PaymentType } from "@/types/paymentTypes";

type DataType = {
  unit: UnitType;
  lease: LeaseType;
  paymentMonth: PaymentType | null;
};

const TenantDashbordContent = () => {
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.userToken);
  const { data, loading, error } = useFetchData<DataType>(
    `http://localhost:8080/api/unit-lease`,
    token
  );

  if (loading || !data) return <Loading />;

  return (
    <main className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* My Unit Card */}
        {data?.unit && <TenantDashboardUnitCard unit={data?.unit} />}

        {/* Rent Status Card */}
        {data?.paymentMonth && (
          <TenantDashboardRentCard payment={data?.paymentMonth} />
        )}

        {/* Lease Info Card */}
        {data?.lease && <TenantDashboardLeaseCard lease={data?.lease} />}
      </div>

      {/* Maintenance Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Active Maintenance Requests</CardTitle>
          <CardDescription>Your current maintenance issues</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-4">
                <Wrench className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Leaky Faucet</p>
                  <p className="text-sm text-muted-foreground">
                    Submitted: May 15, 2023
                  </p>
                </div>
              </div>
              <Badge variant="secondary">
                <Clock className="h-3 w-3 mr-1" />
                In Progress
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-4">
                <Wrench className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Broken Blinds</p>
                  <p className="text-sm text-muted-foreground">
                    Submitted: May 20, 2023
                  </p>
                </div>
              </div>
              <Badge variant="destructive">
                <AlertCircle className="h-3 w-3 mr-1" />
                Pending
              </Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Request
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default TenantDashbordContent;
