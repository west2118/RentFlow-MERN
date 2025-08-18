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
import { Search, X } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import type { MaintenanceType } from "@/types/maintenanceTypes";
import LandlordMaintenanceTable from "@/components/app/landlord/maintenance/LandlordMaintenanceTable";
import { Loading } from "@/components/app/Loading";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/constants/fetchData";
import { useState } from "react";
import LandlordManageRequestModal from "@/components/app/landlord/maintenance/LandlordManageRequestModal";
import { MaintenanceModalDetails } from "@/components/app/MaintenanceModalDetails";
import { useDebounceInput } from "@/hooks/useDebounceInput";
import NoDataFoundTable from "@/components/app/NoDataFoundTable";
import { LandlordTenantTableRowSkeleton } from "@/components/app/landlord/tenants/LandlordTenantTableRowSkeleton";
import Pagination from "@/components/app/Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DataProps = {
  maintenances: MaintenanceType[];
  total: number;
  page: number;
  totalPages: number;
};

export function LandlordMaintenance() {
  const token = useUserStore((state) => state.userToken);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalDetailsOpen, setIsModalDetailsOpen] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<
    "In Progress" | "Completed" | null
  >(null);
  const [selectedItem, setSelectedItem] = useState<MaintenanceType | null>(
    null
  );

  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounceInput(search);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useQuery<DataProps>({
    queryKey: ["landlord-maintenance", page, limit, debouncedSearch, status],
    queryFn: fetchData(
      `http://localhost:8080/api/landlord-maintenance?page=${page}${
        status !== "All" ? `&status=${status}` : ""
      }&limit=${limit}${debouncedSearch ? `&search=${debouncedSearch}` : ""}`,
      token
    ),
    enabled: !!token,
  });

  const handleOpenModal = (
    status: "In Progress" | "Completed",
    item: MaintenanceType | null
  ) => {
    setIsModalOpen(true);
    setSelectedStatus(status);
    setSelectedItem(item);
  };

  const handleOpenDetailsModal = (item: MaintenanceType | null) => {
    setIsModalDetailsOpen(true);
    setSelectedItem(item);
  };

  console.log(status);

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Maintenance Requests</h2>
      </div>

      {/* Maintenance Requests Table */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Active Requests</CardTitle>
              <CardDescription>
                Recent maintenance issues reported by tenants
              </CardDescription>
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
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
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
                <TableHead>Unit</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <LandlordTenantTableRowSkeleton />
              ) : data && data?.maintenances.length > 0 ? (
                data?.maintenances.map((item) => (
                  <LandlordMaintenanceTable
                    key={item._id}
                    item={item}
                    handleOpenModal={handleOpenModal}
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
      </Card>

      {isModalOpen && selectedItem && selectedStatus && (
        <LandlordManageRequestModal
          item={selectedItem}
          isModalOpen={isModalOpen}
          onCloseModal={() => {
            setIsModalOpen(false);
            setSelectedItem(null);
            setSelectedStatus(null);
          }}
          status={selectedStatus}
        />
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
    </main>
  );
}
