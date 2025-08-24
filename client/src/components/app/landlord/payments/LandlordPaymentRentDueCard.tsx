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
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  CalendarDays,
  Bell,
  MoreVertical,
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

type LandlordPaymentRentDueCard = {
  payments: PaymentType[];
  total: number;
  page: number;
  totalPages: number;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  status: string;
  search: string;
  isLoading: boolean;
};

const LandlordPaymentRentDueCard = ({
  payments,
  total,
  page,
  totalPages,
  setSearch,
  setPage,
  limit,
  setStatus,
  status,
  search,
  isLoading,
}: LandlordPaymentRentDueCard) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [tenant, setTenant] = useState("");
  const [tenantFullName, setTenantFullName] = useState("");

  const handleOpenModal = (tenantUid: string, fullName: string) => {
    setIsModalOpen(true);
    setTenant(tenantUid);
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
            <Select value={status} onValueChange={(value) => setStatus(value)}>
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
            ) : payments && payments.length > 0 ? (
              payments?.map((item) => (
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
      {payments && payments?.length > 0 && (
        <CardFooter className="flex justify-between">
          <Pagination
            limit={limit}
            page={page}
            total={total}
            totalPages={totalPages}
            setPage={setPage}
          />
        </CardFooter>
      )}

      {isModalOpen && (
        <NotificationCreateModal
          isModalOpen={isModalOpen}
          onCloseModal={handleCloseModal}
          fullName={tenantFullName}
          tenantUid={tenant}
        />
      )}
    </Card>
  );
};

export default LandlordPaymentRentDueCard;
