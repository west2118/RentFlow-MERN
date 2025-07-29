import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  LayoutGrid,
  Users,
  Wrench,
  DollarSign,
  FileText,
  Settings,
  Menu,
  Bell,
  Search,
  User,
  ChevronDown,
  CircleDollarSign,
  CalendarCheck,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import LandlordDashboardTotalUnitsCard from "@/components/app/landlord/dashboard/LandlordDashboardTotalUnitsCard";
import LandlordDashboardTotalOccupiedCard from "@/components/app/landlord/dashboard/LandlordDashboardTotalOccupiedCard";
import LandlordDashboardAvailableUnitCard from "@/components/app/landlord/dashboard/LandlordDashboardAvailableUnitCard";
import LandlordDashboardTotalMonthRent from "@/components/app/landlord/dashboard/LandlordDashboardTotalMonthRent";
import useFetchData from "@/hooks/useFetchData";
import { useUserStore } from "@/store/useUserStore";
import type { UnitType } from "@/types/unitTypes";
import { Loading } from "@/components/app/Loading";
import { useMemo } from "react";
import type { PaymentType } from "@/types/paymentTypes";
import LandlordDashboardMaintenanceCard from "@/components/app/landlord/dashboard/LandlordDashboardMaintenanceCard";
import LandlordMaintenanceRentCard from "@/components/app/landlord/dashboard/LandlordMaintenanceRentCard";

type DataType = {
  units: UnitType[];
  paymentMonth: PaymentType[];
};

const LandlordDashboardContent = () => {
  const userUid = useUserStore((state) => state.user?.uid);
  const token = useUserStore((state) => state.userToken);
  const { data, loading } = useFetchData<DataType>(
    `http://localhost:8080/api/landlord-units/${userUid}`,
    token,
    [userUid]
  );

  const { totalUnits, totalOccupiedUnits, totalAvailableUnits } =
    useMemo(() => {
      const totalUnits = data?.units.length;
      const totalOccupiedUnits = data?.units.filter(
        (unit) => unit.status === "Occupied"
      ).length;
      const totalAvailableUnits = data?.units.filter(
        (unit) => unit.status === "Available"
      ).length;

      return {
        totalUnits,
        totalOccupiedUnits,
        totalAvailableUnits,
      };
    }, [data]);

  const totalMonthRent = data?.paymentMonth.reduce(
    (accu, curr) => accu + curr.amount,
    0
  );

  const totalUnitsInPayment = data?.paymentMonth.length;

  const percentageTotalOccupied =
    (Number(totalOccupiedUnits) / Number(totalUnits)) * 100;

  const percentageTotalAvailable =
    (Number(totalAvailableUnits) / Number(totalUnits)) * 100;

  if (loading) return <Loading />;

  return (
    <main className="p-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <LandlordDashboardTotalUnitsCard totalUnits={totalUnits} />

        <LandlordDashboardTotalOccupiedCard
          totalOccupiedUnits={totalOccupiedUnits}
          percentageTotalOccupied={percentageTotalOccupied}
        />

        <LandlordDashboardAvailableUnitCard
          totalAvailableUnits={totalAvailableUnits}
          percentageTotalAvailable={percentageTotalAvailable}
        />

        <LandlordDashboardTotalMonthRent
          totalMonthRent={totalMonthRent}
          totalUnitsInPayment={totalUnitsInPayment}
        />
      </div>

      {/* Maintenance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Rent */}
        <LandlordDashboardMaintenanceCard />

        <LandlordMaintenanceRentCard />
      </div>
    </main>
  );
};

export default LandlordDashboardContent;
