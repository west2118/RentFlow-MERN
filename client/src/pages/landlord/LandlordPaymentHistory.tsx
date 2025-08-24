import LandlordPaymentHistoryPaymentCards from "@/components/app/landlord/payment-history/LandlordPaymentHistoryPaymentCards";
import LandlordPaymentHistoryTableRow from "@/components/app/landlord/payment-history/LandlordPaymentHistoryTableRow";
import { Loading } from "@/components/app/Loading";
import Pagination from "@/components/app/Pagination";
import PaymentLoadingSkeleton from "@/components/app/PaymentLoadingSkeleton";
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
import WithSkeleton from "@/constants/WithSkeleton";
import { useDebounceInput } from "@/hooks/useDebounceInput";
import { useUserStore } from "@/store/useUserStore";
import type { PaymentType } from "@/types/paymentTypes";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Download,
  Filter,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { LandlordTenantTableRowSkeleton } from "@/components/app/landlord/tenants/LandlordTenantTableRowSkeleton";
import NoDataFoundTable from "@/components/app/NoDataFoundTable";

type DataType = {
  page: number;
  payments: PaymentType[];
  total: number;
  totalPages: number;
  totalOverdue: {
    totalAmount: number;
    totalLength: number;
  };
  totalPending: {
    totalAmount: number;
    totalLength: number;
  };
  totalPaid: {
    totalAmount: number;
    totalLength: number;
  };
};

export function LandlordPaymentHistory() {
  const token = useUserStore((state) => state.userToken);

  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounceInput(search);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useQuery<DataType>({
    queryKey: ["landlord-payments", page, limit, status, debouncedSearch],
    queryFn: fetchData(
      `http://localhost:8080/api/landlord-payments?page=${page}${
        status !== "All" ? `&status=${status}` : ""
      }&limit=${limit}${debouncedSearch ? `&search=${debouncedSearch}` : ""}`,
      token
    ),
    enabled: !!token,
    placeholderData: keepPreviousData,
  });

  return (
    // <div className="container mx-auto p-4 md:p-6 w-full max-w-8xl"></div>
    <div className="p-6">
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
        <WithSkeleton
          isLoading={isLoading}
          skeleton={<PaymentLoadingSkeleton />}>
          <LandlordPaymentHistoryPaymentCards
            totalCollectedAndPayments={{
              totalAmount: data?.totalPaid.totalAmount ?? 0,
              totalLength: data?.totalPaid.totalLength ?? 0,
            }}
            title="Total Collected"
            icon={DollarSign}
            description="completed payment"
          />
        </WithSkeleton>

        <WithSkeleton
          isLoading={isLoading}
          skeleton={<PaymentLoadingSkeleton />}>
          <LandlordPaymentHistoryPaymentCards
            totalCollectedAndPayments={{
              totalAmount: data?.totalPending.totalAmount ?? 0,
              totalLength: data?.totalPending.totalLength ?? 0,
            }}
            title="Pending Balance"
            icon={AlertCircle}
            description="pending payment"
          />
        </WithSkeleton>

        <WithSkeleton
          isLoading={isLoading}
          skeleton={<PaymentLoadingSkeleton />}>
          <LandlordPaymentHistoryPaymentCards
            totalCollectedAndPayments={{
              totalAmount: data?.totalOverdue.totalAmount ?? 0,
              totalLength: data?.totalOverdue.totalLength ?? 0,
            }}
            title="Overdue Balance"
            icon={AlertCircle}
            description="overdue payment"
          />
        </WithSkeleton>
      </div>

      {/* Payment History Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Rent Due</CardTitle>
              <CardDescription>Payments due this month</CardDescription>
            </div>
            <div className="flex space-x-4">
              <Select
                value={status}
                onValueChange={(value) => setStatus(value)}>
                <SelectTrigger className="w-34">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                  <SelectItem value="In Process">In Process</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search requests..."
                  className="pl-9"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-black">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Due Date</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Late Fee</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Receipt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Paid Payment */}
              {isLoading ? (
                <LandlordTenantTableRowSkeleton />
              ) : data?.payments && data?.payments.length ? (
                data?.payments?.map((payment) => (
                  <LandlordPaymentHistoryTableRow
                    key={payment._id}
                    payment={payment}
                  />
                ))
              ) : (
                <NoDataFoundTable
                  numberOfSpan={9}
                  label="No payment records found"
                />
              )}
            </TableBody>
          </Table>
        </CardContent>
        {data?.payments && data?.payments?.length > 0 && (
          <CardFooter className="flex justify-between">
            <Pagination
              limit={limit}
              page={page}
              total={data?.total}
              totalPages={data?.totalPages}
              setPage={setPage}
            />
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
