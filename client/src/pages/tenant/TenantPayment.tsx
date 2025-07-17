import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DollarSign,
  CreditCard,
  CheckCircle2,
  Clock,
  AlertCircle,
  History,
  CalendarDays,
  Download,
  Search,
  ChevronDown,
} from "lucide-react";

import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const TenantPayment = () => {
  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Payments</h2>
        <Button variant="outline">
          <History className="h-4 w-4 mr-2" />
          Payment History
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Payment Summary Cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Current Rent Due
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,200</div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <CalendarDays className="h-4 w-4 mr-1" />
              Due June 1, 2023
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Payment Status
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className="mb-2">
              <Clock className="h-3 w-3 mr-1" />
              Pending
            </Badge>
            <Progress value={0} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">Not yet paid</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Payment Method
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm">VISA •••• 4242</div>
            <p className="text-xs text-muted-foreground mt-1">
              Expires 04/2025
            </p>
            <Button variant="link" size="sm" className="p-0 h-auto mt-2">
              Change Payment Method
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Pay Rent Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Pay Rent</CardTitle>
          <CardDescription>
            Make a payment for your current rent due
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Amount Due</Label>
              <div className="flex items-center text-xl font-semibold">
                <DollarSign className="h-5 w-5 mr-1" />
                <span>1,200.00</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Payment Date</Label>
              <div className="flex items-center">
                <CalendarDays className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>May 25, 2023</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <Select defaultValue="credit-card">
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit-card">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Credit/Debit Card
                    </div>
                  </SelectItem>
                  <SelectItem value="bank-transfer">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Bank Transfer
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="w-full md:w-auto">
            <CreditCard className="h-4 w-4 mr-2" />
            Pay with Stripe
          </Button>
        </CardFooter>
      </Card>

      {/* Payment History Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Your past rent payments</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search payments..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Receipt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>May 1, 2023</TableCell>
                <TableCell>$1,200.00</TableCell>
                <TableCell>May 2023</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell>
                  <Badge variant="default">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Apr 1, 2023</TableCell>
                <TableCell>$1,200.00</TableCell>
                <TableCell>Apr 2023</TableCell>
                <TableCell>Bank Transfer</TableCell>
                <TableCell>
                  <Badge variant="default">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Mar 3, 2023</TableCell>
                <TableCell>$1,250.00</TableCell>
                <TableCell>Mar 2023</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell>
                  <Badge variant="default">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">3</span> of{" "}
            <span className="font-medium">12</span> payments
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
};

export default TenantPayment;
