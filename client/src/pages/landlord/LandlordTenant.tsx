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
import LandlordTenantsTable from "@/components/app/landlord/LandlordTenantsTable";
import type { UnitType } from "@/types/unitTypes";
import { Loading } from "@/components/app/Loading";
import { useState } from "react";
import type { LeaseType } from "@/types/leaseTypes";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/constants/fetchData";
import { LeaseDetailsModal } from "@/components/app/LeaseDetailsModal";
import Pagination from "@/components/app/Pagination";
import { useDebounceInput } from "@/hooks/useDebounceInput";
import { LandlordTenantTableRowSkeleton } from "@/components/app/landlord/tenants/LandlordTenantTableRowSkeleton";
import NoDataFoundTable from "@/components/app/NoDataFoundTable";

type DataProps = {
  tenants: UnitType[];
  total: number;
  page: number;
  totalPages: number;
};

export function LandlordTenant() {
  const token = useUserStore((state) => state.userToken);
  const [selectedLease, setSelectedLease] = useState<LeaseType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounceInput(search);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useQuery<DataProps>({
    queryKey: ["landlord-tenants", page, limit, debouncedSearch],
    queryFn: fetchData(
      `http://localhost:8080/api/landlord-tenants?page=${page}&limit=${limit}${
        debouncedSearch ? `&search=${debouncedSearch}` : ""
      }`,
      token
    ),
    enabled: !!token,
  });

  const openModal = (lease: LeaseType) => {
    setSelectedLease(lease);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedLease(null);
    setIsModalOpen(false);
  };

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Tenant Management</h2>
      </div>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Tenant List</CardTitle>
              <CardDescription>
                All current and prospective tenants
              </CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search tenants..."
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
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Rent Amount</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Lease End</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <LandlordTenantTableRowSkeleton />
              ) : data && data?.tenants.length > 0 ? (
                data?.tenants.map((item) => (
                  <LandlordTenantsTable
                    key={item._id}
                    onViewLease={() => openModal(item?.lease!)}
                    item={item}
                  />
                ))
              ) : (
                <NoDataFoundTable
                  numberOfSpan={7}
                  label="No Tenant Data Found"
                />
              )}
            </TableBody>
          </Table>
        </CardContent>
        {data && data?.tenants.length > 0 && (
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

      {isModalOpen && (
        <LeaseDetailsModal
          isModalOpen={isModalOpen}
          isCloseModal={closeModal}
          lease={selectedLease}
        />
      )}
    </main>
  );
}
