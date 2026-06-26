import React, { useState } from "react";
import LandlordPaymentHistoryTableRow from "@/components/app/landlord/payment-history/LandlordPaymentHistoryTableRow";
import Pagination from "@/components/app/Pagination";
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
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { fetchData } from "@/constants/fetchData";
import { useDebounceInput } from "@/hooks/useDebounceInput";
import type { PaymentType } from "@/types/paymentTypes";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { LandlordTenantTableRowSkeleton } from "@/components/app/landlord/tenants/LandlordTenantTableRowSkeleton";
import NoDataFoundTable from "@/components/app/NoDataFoundTable";
import { paymentStatusArray } from "@/constants/paymentStatusArray";

type DataType = {
  page: number;
  payments: PaymentType[];
  total: number;
  totalPages: number;
};

const LandlordPaymentHistoryTableCard = () => {
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
      }&limit=${limit}${debouncedSearch ? `&search=${debouncedSearch}` : ""}`
    ),
    placeholderData: keepPreviousData,
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Rent Due</CardTitle>
            <CardDescription>Payments due this month</CardDescription>
          </div>
          <div className="flex space-x-4">
            <Select value={status} onValueChange={(value) => setStatus(value)}>
              <SelectTrigger className="w-34">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {paymentStatusArray.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
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
  );
};

export default LandlordPaymentHistoryTableCard;
