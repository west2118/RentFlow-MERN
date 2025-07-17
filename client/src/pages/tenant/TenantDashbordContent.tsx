import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Wrench,
  DollarSign,
  FileText,
  Settings,
  Bell,
  CalendarDays,
  CheckCircle2,
  AlertCircle,
  Clock,
  Menu,
  User,
  ChevronDown,
  Plus,
} from "lucide-react";

const TenantDashbordContent = () => {
  return (
    <main className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* My Unit Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">My Unit</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">Unit 3B</div>
            <p className="text-sm text-muted-foreground">123 Main St, Apt 3B</p>
            <div className="mt-2 text-sm">
              <p>2 Bed, 1 Bath</p>
              <p>750 sq ft</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </CardFooter>
        </Card>

        {/* Rent Status Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Rent Status</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold mb-2">$1,200</div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Due Date</span>
              <span>June 1, 2023</span>
            </div>
            <div className="flex justify-between text-sm mb-3">
              <span className="text-muted-foreground">Status</span>
              <Badge variant="default">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Paid
              </Badge>
            </div>
            <Progress value={100} className="h-2" />
          </CardContent>
          <CardFooter>
            <Button className="w-full">Make Payment</Button>
          </CardFooter>
        </Card>

        {/* Lease Info Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Lease Information
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Start Date</span>
              <span>Jan 1, 2023</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">End Date</span>
              <span>Dec 31, 2023</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Monthly Rent</span>
              <span>$1,200</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Payment Due</span>
              <span>1st of each month</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Lease
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Maintenance Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Active Maintenance Requests</CardTitle>
          <CardDescription>Your current maintenance issues</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-4">
                <Wrench className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Leaky Faucet</p>
                  <p className="text-sm text-muted-foreground">
                    Submitted: May 15, 2023
                  </p>
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
                  <p className="font-medium">Broken Blinds</p>
                  <p className="text-sm text-muted-foreground">
                    Submitted: May 20, 2023
                  </p>
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
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Request
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default TenantDashbordContent;
