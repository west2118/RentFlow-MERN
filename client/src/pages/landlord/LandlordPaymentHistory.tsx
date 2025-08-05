import LandlordPaymentHistoryPaymentCards from "@/components/app/landlord/payment-history/LandlordPaymentHistoryPaymentCards";
import LandlordPaymentHistoryTableRow from "@/components/app/landlord/payment-history/LandlordPaymentHistoryTableRow";
import { Loading } from "@/components/app/Loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { fetchData } from "@/constants/fetchData";
import { useUserStore } from "@/store/useUserStore";
import type { PaymentType } from "@/types/paymentTypes";
import { useQuery } from "@tanstack/react-query";
import {
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Download,
  Filter,
} from "lucide-react";

export function LandlordPaymentHistory() {
  const token = useUserStore((state) => state.userToken);

  const { data, isLoading } = useQuery<PaymentType[]>({
    queryKey: ["landlord-payments"],
    queryFn: fetchData("http://localhost:8080/api/landlord-payments", token),
    enabled: !!token,
  });

  const totalCollectedAndPayments = (status: string) => {
    const payments = data?.filter((payment) => payment.status === status);
    const totalCollected = payments?.reduce(
      (accu, curr) => accu + curr.amount,
      0
    );
    const totalPayment = payments?.length;

    return {
      totalCollected,
      totalPayment,
    };
  };

  console.log(data);

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto p-4 md:p-6 w-full max-w-8xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Payment History</h1>
          <p className="text-muted-foreground">
            Track all rent payments and transactions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Total Collected */}
        <LandlordPaymentHistoryPaymentCards
          totalCollectedAndPayments={totalCollectedAndPayments("Paid")}
          title="Total Collected"
          icon={DollarSign}
          description="completed payment"
        />

        {/* Pending Balance */}
        <LandlordPaymentHistoryPaymentCards
          totalCollectedAndPayments={totalCollectedAndPayments("Pending")}
          title="Pending Balance"
          icon={AlertCircle}
          description="pending payment"
        />

        {/* Overdue balance */}
        <LandlordPaymentHistoryPaymentCards
          totalCollectedAndPayments={totalCollectedAndPayments("Overdue")}
          title="Overdue Balance"
          icon={AlertCircle}
          description="overdue payment"
        />
      </div>

      {/* Payment History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            All rent payments for the past 12 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Due Date</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Receipt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Paid Payment */}
              {data?.map((payment) => (
                <LandlordPaymentHistoryTableRow
                  key={payment._id}
                  payment={payment}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing 4 of 12 payments
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
