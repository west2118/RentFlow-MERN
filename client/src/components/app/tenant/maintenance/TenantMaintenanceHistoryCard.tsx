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
import { CheckCircle2, MessageSquare, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/useUserStore";
import type { MaintenanceType } from "@/types/maintenanceTypes";
import TenantMaintenanceTable from "./TenantMaintenanceTable";
import { Loading } from "../../Loading";
import TenantPaymentCompletedNoData from "../payments/TenantPaymentCompletedNoData";
import { fetchData } from "@/constants/fetchData";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MaintenanceModalDetails } from "../../MaintenanceModalDetails";

const TenantMaintenanceHistoryCard = () => {
  const [isModalDetailsOpen, setIsModalDetailsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<MaintenanceType | null>(
    null
  );
  const token = useUserStore((state) => state.userToken);

  const { data, isLoading } = useQuery<MaintenanceType[]>({
    queryKey: ["tenant-unit-lease-maintenance-payment"],
    queryFn: fetchData("http://localhost:8080/api/tenant-maintenance", token),
    enabled: !!token,
  });

  console.log(data);

  const handleOpenDetailsModal = (item: MaintenanceType) => {
    setIsModalDetailsOpen(true);
    setSelectedItem(item);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <CardTitle>Request History</CardTitle>
            <CardDescription>All Past maintenance requests</CardDescription>
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
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Technician Notes</TableHead>
              <TableHead className="text-end">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length > 0 ? (
              data?.map((item) => (
                <TenantMaintenanceTable
                  key={item._id}
                  item={item}
                  handleOpenDetailsModal={handleOpenDetailsModal}
                />
              ))
            ) : (
              <TenantPaymentCompletedNoData
                numberOfSpan={5}
                label="No maintenance request found"
              />
            )}
          </TableBody>
        </Table>
      </CardContent>
      {data && data.length > 0 && (
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">2</span> of{" "}
            <span className="font-medium">5</span> requests
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
