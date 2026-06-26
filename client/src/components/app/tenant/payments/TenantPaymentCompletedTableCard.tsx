import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableFooter,
  TableCell,
} from "@/components/ui/table";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { PaymentType } from "@/types/paymentTypes";
import TenantPaymentCompletedTableRow from "./TenantPaymentCompletedTableRow";
import { ReceiptModal } from "../../ReceiptModal";
import { useState } from "react";
import NoDataFoundTable from "../../NoDataFoundTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { paymentStatusArray } from "@/constants/paymentStatusArray";
import Pagination from "../../Pagination";
import TenantPaymentCompletedTableRowSkeleton from "./TenantPaymentCompletedTableRowSkeleton";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchData } from "@/constants/fetchData";
import { useDebounceInput } from "@/hooks/useDebounceInput";

type HistoryDataType = {
  completedPayment: PaymentType[];
  total: number;
  page: number;
  totalPages: number;
};

const TenantPaymentCompletedTableCard = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<PaymentType | null>(null);

  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounceInput(search);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useQuery<HistoryDataType>({
    queryKey: ["tenant-payment-history", page, limit, debouncedSearch, status],
    queryFn: fetchData(
      `http://localhost:8080/api/tenant-payment/history?page=${page}${status !== "All" ? `&status=${status}` : ""
      }&limit=${limit}${debouncedSearch ? `&search=${debouncedSearch}` : ""}`
    ),
    placeholderData: keepPreviousData,
  });

  const handleOpenModal = (payment: PaymentType) => {
    setIsModalOpen(true);
    setSelectedItem(payment);
  };

  const item = data?.completedPayment;
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Your past rent payments</CardDescription>
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
              <TableHead>Date Paid</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Late Fee</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-end">Receipt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TenantPaymentCompletedTableRowSkeleton />
            ) : item && item.length > 0 ? (
              item?.map((item) => (
                <TenantPaymentCompletedTableRow
                  key={item._id}
                  payment={item}
                  handleOpenModal={handleOpenModal}
                />
              ))
            ) : (
              <NoDataFoundTable
                numberOfSpan={7}
                label="No payment records found"
              />
            )}
          </TableBody>

          {item && item?.length > 0 && (
            <TableFooter className="bg-white">
              <TableRow>
                <TableCell colSpan={7}>
                  <Pagination
                    limit={limit}
                    page={page}
                    total={total}
                    totalPages={totalPages}
                    setPage={setPage}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </CardContent>

      {isModalOpen && (
        <ReceiptModal
          isModalOpen={isModalOpen}
          isCloseModal={() => setIsModalOpen(false)}
          payment={selectedItem}
        />
      )}
    </Card>
  );
};

export default TenantPaymentCompletedTableCard;
