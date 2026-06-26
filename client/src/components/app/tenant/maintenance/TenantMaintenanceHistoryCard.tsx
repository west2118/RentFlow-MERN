import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, MessageSquare, Plus, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/useUserStore";
import type { MaintenanceType } from "@/types/maintenanceTypes";
import TenantMaintenanceTable from "./TenantMaintenanceTable";
import { Loading } from "../../Loading";
import { fetchData } from "@/constants/fetchData";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MaintenanceModalDetails } from "../../MaintenanceModalDetails";
import NoDataFoundTable from "../../NoDataFoundTable";
import { LandlordTenantTableRowSkeleton } from "../../landlord/tenants/LandlordTenantTableRowSkeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { paymentStatusArray } from "@/constants/paymentStatusArray";
import { useDebounceInput } from "@/hooks/useDebounceInput";
import Pagination from "../../Pagination";
import { maintenanceTypes } from "@/constants/maintenanceStatus";
import TenantMaintenanceSkeletonLoading from "./TenantMaintenanceSkeletonLoading";
import { useNavigate } from "react-router-dom";
import type { LeaseType } from "@/types/leaseTypes";

type DataType = {
  lease?: LeaseType;
  maintenances: MaintenanceType[];
  total: number;
  page: number;
  totalPages: number;
};

const TenantMaintenanceHistoryCard = () => {
  const navigate = useNavigate();
  const [isModalDetailsOpen, setIsModalDetailsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<MaintenanceType | null>(
    null
  );
  const token = useUserStore((state) => state.userToken);

  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounceInput(search);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useQuery<DataType>({
    queryKey: ["tenant-maintenance", page, limit, debouncedSearch, status],
    queryFn: fetchData(
      `http://localhost:8080/api/tenant-maintenance?page=${page}${
        status !== "All" ? `&status=${status}` : ""
      }&limit=${limit}${debouncedSearch ? `&search=${debouncedSearch}` : ""}`),
    
  });

  const handleOpenDetailsModal = (item: MaintenanceType) => {
    setIsModalDetailsOpen(true);
    setSelectedItem(item);
  };

  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Request History</CardTitle>
            <CardDescription>All Past maintenance requests</CardDescription>
          </div>
          <div className="flex space-x-4">
            {data && data?.lease?.status !== "expired" && (
              <Button
                onClick={() => navigate("/tenant/maintenance-request/create")}>
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            )}
            <Select value={status} onValueChange={(value) => setStatus(value)}>
              <SelectTrigger className="w-34">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {maintenanceTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
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
              <TableHead>Request</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Technician Notes</TableHead>
              <TableHead className="text-end">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TenantMaintenanceSkeletonLoading />
            ) : data && data?.maintenances.length > 0 ? (
              data?.maintenances.map((item) => (
                <TenantMaintenanceTable
                  key={item._id}
                  item={item}
                  handleOpenDetailsModal={handleOpenDetailsModal}
                />
              ))
            ) : (
              <NoDataFoundTable
                numberOfSpan={5}
                label="No maintenance records found"
              />
            )}
          </TableBody>
        </Table>
      </CardContent>

      {data && data?.maintenances.length > 0 && (
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

      {isModalDetailsOpen && (
        <MaintenanceModalDetails
          isModalOpen={isModalDetailsOpen}
          onCloseModal={() => {
            setIsModalDetailsOpen(false);
            setSelectedItem(null);
          }}
          item={selectedItem}
        />
      )}
    </Card>
  );
};

export default TenantMaintenanceHistoryCard;
