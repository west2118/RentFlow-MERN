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

  console.log(data.paymentMonth);

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Payments</h2>
        {data?.paymentMonth.status === "Pending" && (
          <Button variant="default">
            <CreditCardIcon className="h-4 w-4 mr-2" />
            Make Payment
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Payment Summary Cards */}
        <TenantPaymentCurrentDueCard item={data?.paymentMonth} />

        <TenantPaymentStatusCard status={data?.paymentMonth.status} />

        <TenantPaymentMethodCard />
      </div>

      {/* Pay Rent Card */}
      {/* <Card className="mb-6">
        <CardHeader>
          <CardTitle>Pay Rent</CardTitle>
          <CardDescription>
            Make a payment for your current rent due
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Amount Due</Label>
              <div className="flex items-center text-xl font-semibold">
                <DollarSign className="h-5 w-5 mr-1" />
                <span>1,200.00</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Payment Date</Label>
              <div className="flex items-center">
                <CalendarDays className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>May 25, 2023</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <Select defaultValue="credit-card">
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit-card">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Credit/Debit Card
                    </div>
                  </SelectItem>
                  <SelectItem value="bank-transfer">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Bank Transfer
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="w-full md:w-auto">
            <CreditCard className="h-4 w-4 mr-2" />
            Pay with Stripe
          </Button>
        </CardFooter>
      </Card> */}

      {/* Payment History Table */}
      <TenantPaymentCompletedTableCard item={data?.completedPayment} />
    </main>
  );
};

export default TenantPayment;
