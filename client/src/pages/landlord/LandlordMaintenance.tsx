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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Search,
  Mail,
  Wrench,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  MessageSquare,
  Home,
  User,
  MoreVertical,
} from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import useFetchData from "@/hooks/useFetchData";
import type { MaintenanceType } from "@/types/maintenanceTypes";
import LandlordMaintenanceTable from "@/components/app/landlord/maintenance/LandlordMaintenanceTable";
import { Loading } from "@/components/app/Loading";

export function LandlordMaintenance() {
  const token = useUserStore((state) => state.userToken);
  const { data, loading, error } = useFetchData<MaintenanceType[]>(
    "http://localhost:8080/api/landlord-maintenance",
    token
  );

  if (!data || loading) {
    return <Loading />;
  }

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Maintenance Requests</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Wrench className="h-4 w-4 mr-2" />
            Request History
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Request
          </Button>
        </div>
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
              {data.length > 0 ? (
                data?.map((item) => (
                  <LandlordMaintenanceTable key={item._id} item={item} />
                ))
              ) : (
                <p></p>
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
    </main>
  );
}
