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
import { Search } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import type { MaintenanceType } from "@/types/maintenanceTypes";
import LandlordMaintenanceTable from "@/components/app/landlord/maintenance/LandlordMaintenanceTable";
import { Loading } from "@/components/app/Loading";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/constants/fetchData";
import { useState } from "react";
import LandlordManageRequestModal from "@/components/app/landlord/maintenance/LandlordManageRequestModal";
import { MaintenanceModalDetails } from "@/components/app/MaintenanceModalDetails";

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

  const { data, isLoading } = useQuery<MaintenanceType[]>({
    queryKey: ["landlord-maintenance"],
    queryFn: fetchData("http://localhost:8080/api/landlord-maintenance", token),
    enabled: !!token,
  });

  console.log("Dataaaaa: ", data);

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

  if (isLoading) {
    return <Loading />;
  }

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
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search requests..." className="pl-9" />
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
              {data && data.length > 0 ? (
                data?.map((item) => (
                  <LandlordMaintenanceTable
                    key={item._id}
                    item={item}
                    handleOpenModal={handleOpenModal}
                    handleOpenDetailsModal={handleOpenDetailsModal}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-6 text-sm text-muted-foreground">
                    No maintenance records found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">3</span> of{" "}
            <span className="font-medium">7</span> requests
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
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
