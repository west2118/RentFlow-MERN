import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DollarSign,
  CreditCard,
  CheckCircle2,
  Clock,
  AlertCircle,
  History,
  CalendarDays,
  Download,
  Search,
  ChevronDown,
  CreditCardIcon,
} from "lucide-react";

import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import TenantPaymentCurrentDueCard from "@/components/app/tenant/payments/TenantPaymentCurrentDueCard";
import TenantPaymentStatusCard from "@/components/app/tenant/payments/TenantPaymentStatusCard";
import TenantPaymentMethodCard from "@/components/app/tenant/payments/TenantPaymentMethodCard";
import { useUserStore } from "@/store/useUserStore";
import useFetchData from "@/hooks/useFetchData";
import type { PaymentType } from "@/types/paymentTypes";
import { Loading } from "@/components/app/Loading";
import TenantPaymentCompletedTableCard from "@/components/app/tenant/payments/TenantPaymentCompletedTableCard";
import { useNavigate } from "react-router-dom";

type DataType = {
  paymentMonth: PaymentType;
  completedPayment: PaymentType[];
};

const TenantPayment = () => {
  const token = useUserStore((state) => state.userToken);
  const { data, loading, error } = useFetchData<DataType>(
    `http://localhost:8080/api/tenant-payment`,
    token
  );

  if (loading || !data) return <Loading />;

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Payments</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Payment Summary Cards */}
        <TenantPaymentCurrentDueCard item={data?.paymentMonth} />

        <TenantPaymentStatusCard status={data?.paymentMonth.status} />

        <TenantPaymentMethodCard />
      </div>

      {/* Payment History Table */}
      <TenantPaymentCompletedTableCard item={data?.completedPayment} />
    </main>
  );
};

export default TenantPayment;
