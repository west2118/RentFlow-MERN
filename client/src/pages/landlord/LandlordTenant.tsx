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
import {
  Plus,
  Search,
  Mail,
  Phone,
  User,
  Home,
  FileText,
  MoreVertical,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  Calendar,
  Building,
} from "lucide-react";
import useFetchData from "@/hooks/useFetchData";
import type { UserType } from "@/types/userTypes";
import { useUserStore } from "@/store/useUserStore";
import LandlordTenantsTable from "@/components/app/landlord/LandlordTenantsTable";
import type { UnitType } from "@/types/unitTypes";
import { Loading } from "@/components/app/Loading";

export function LandlordTenant() {
  const token = useUserStore((state) => state.userToken);
  const { data, error, loading } = useFetchData<UnitType[]>(
    "http://localhost:8080/api/landlord-tenants",
    token
  );

  if (!data || loading) {
    return <Loading />;
  }

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Tenant Management</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Tenant
        </Button>
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
              <Input placeholder="Search tenants..." className="pl-9" />
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
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((item) => (
                <LandlordTenantsTable key={item._id} item={item} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">3</span> of{" "}
            <span className="font-medium">8</span> tenants
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
