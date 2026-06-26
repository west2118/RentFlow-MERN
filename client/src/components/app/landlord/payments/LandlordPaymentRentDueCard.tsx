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
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Search,
  Bell,
  X,
} from "lucide-react";
import type { PaymentType } from "@/types/paymentTypes";
import LandlordPaymentDueTableRow from "./LandlordPaymentDueTableRow";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "../../Pagination";
import { LandlordTenantTableRowSkeleton } from "../tenants/LandlordTenantTableRowSkeleton";
import NoDataFoundTable from "../../NoDataFoundTable";
import { NotificationCreateModal } from "../../NotificationCreateModal";
import { useState } from "react";
import { paymentStatusArray } from "@/constants/paymentStatusArray";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchData } from "@/constants/fetchData";
import { useDebounceInput } from "@/hooks/useDebounceInput";

type DataType = {
  payments: PaymentType[];
  total: number;
  page: number;
  totalPages: number;
};

const LandlordPaymentRentDueCard = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [tenant, setTenant] = useState("");
  const [tenantFullName, setTenantFullName] = useState("");

  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounceInput(search);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useQuery<DataType>({
    queryKey: ["payments-month", page, limit, status, debouncedSearch],
    queryFn: fetchData(
      `http://localhost:8080/api/payments-month?page=${page}${
        status !== "All" ? `&status=${status}` : ""
      }&limit=${limit}${debouncedSearch ? `&search=${debouncedSearch}` : ""}`
    ),
    placeholderData: keepPreviousData,
  });

  const handleOpenModal = (targetValue: string, fullName: string = "") => {
    setIsModalOpen(true);
    setTenant(targetValue);
    setTenantFullName(fullName);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTenant("");
    setTenantFullName("");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Rent Due</CardTitle>
            <CardDescription>Payments due this month</CardDescription>
          </div>
          <div className="flex space-x-4">
            <Button onClick={() => handleOpenModal("all")} variant="default">
              <Bell className="w-4 h-4" />
              Remind All
            </Button>
            <Select value={status} onValueChange={(value) => {
              setStatus(value);
              setPage(1);
            }}>
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
              <TableHead>Unit/Tenant</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Late Fee</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Receipt</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <LandlordTenantTableRowSkeleton />
            ) : data && data.payments && data.payments.length > 0 ? (
              data.payments.map((item) => (
                <LandlordPaymentDueTableRow
                  key={item?._id}
                  item={item}
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
        </Table>
      </CardContent>
      {data && data.payments && data.payments.length > 0 && (
        <CardFooter className="flex justify-between">
          <Pagination
            limit={limit}
            page={page}
            total={data.total}
            totalPages={data.totalPages}
            setPage={setPage}
          />
        </CardFooter>
      )}

      {isModalOpen && (
        <NotificationCreateModal
          isModalOpen={isModalOpen}
          onCloseModal={handleCloseModal}
          fullName={tenantFullName}
          tenantId={tenant}
        />
      )}
    </Card>
  );
};

export default LandlordPaymentRentDueCard;
