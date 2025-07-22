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
import { Badge } from "@/components/ui/badge";
import useFetchData from "@/hooks/useFetchData";
import { useUserStore } from "@/store/useUserStore";
import type { MaintenanceType } from "@/types/maintenanceTypes";
import TenantMaintenanceTable from "./TenantMaintenanceTable";
import { Loading } from "../../Loading";

const TenantMaintenanceHistoryCard = () => {
  const token = useUserStore((state) => state.userToken);
  const { data, loading, error } = useFetchData<MaintenanceType[]>(
    "http://localhost:8080/api/tenant-maintenance",
    token
  );

  if (loading || !data) {
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
            {data?.map((item) => (
              <TenantMaintenanceTable key={item._id} item={item} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
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
    </Card>
  );
};

export default TenantMaintenanceHistoryCard;
