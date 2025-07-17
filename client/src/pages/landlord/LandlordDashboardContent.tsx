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
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  LayoutGrid,
  Users,
  Wrench,
  DollarSign,
  FileText,
  Settings,
  Menu,
  Bell,
  Search,
  User,
  ChevronDown,
  CircleDollarSign,
  CalendarCheck,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";

const LandlordDashboardContent = () => {
  return (
    <main className="p-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Units</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Occupied</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9</div>
            <p className="text-xs text-muted-foreground">75% occupancy rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">25% vacancy rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Rent</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$9,450</div>
            <p className="text-xs text-muted-foreground">Due in 5 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Maintenance Overview</CardTitle>
            <CardDescription>
              Recent maintenance requests and status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Wrench className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Leaky Faucet</p>
                    <p className="text-sm text-muted-foreground">Unit 3B</p>
                  </div>
                </div>
                <Badge variant="secondary">
                  <Clock className="h-3 w-3 mr-1" />
                  In Progress
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Wrench className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Broken Window</p>
                    <p className="text-sm text-muted-foreground">Unit 5A</p>
                  </div>
                </div>
                <Badge variant="default">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Wrench className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">AC Not Working</p>
                    <p className="text-sm text-muted-foreground">Unit 2C</p>
                  </div>
                </div>
                <Badge variant="destructive">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Pending
                </Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline">View All Requests</Button>
          </CardFooter>
        </Card>

        {/* Upcoming Rent */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Rent Due</CardTitle>
            <CardDescription>
              Payments expected in the next 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Unit 4D</p>
                  <p className="text-sm text-muted-foreground">Sarah Johnson</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$1,200</p>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <CalendarCheck className="h-3 w-3 mr-1" />
                    Due tomorrow
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Unit 7B</p>
                  <p className="text-sm text-muted-foreground">Michael Chen</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$950</p>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <CalendarCheck className="h-3 w-3 mr-1" />
                    Due in 3 days
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Unit 1A</p>
                  <p className="text-sm text-muted-foreground">David Wilson</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$1,100</p>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <CalendarCheck className="h-3 w-3 mr-1" />
                    Due in 5 days
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline">View All Payments</Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default LandlordDashboardContent;
