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
import { Progress } from "@/components/ui/progress";
import {
  Plus,
  Search,
  Mail,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  CalendarDays,
  History,
  CreditCard,
  Bell,
  MoreVertical,
} from "lucide-react";

export function LandlordPayments() {
  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Payments</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <History className="h-4 w-4 mr-2" />
            Payment History
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Record Payment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Payment Summary Cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Due</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,450</div>
            <p className="text-xs text-muted-foreground">From 9 units</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Collected</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,200</div>
            <p className="text-xs text-muted-foreground">61% collected</p>
            <Progress value={61} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,750</div>
            <p className="text-xs text-muted-foreground">From 3 units</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rent Due List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Rent Due</CardTitle>
                <CardDescription>Payments due this month</CardDescription>
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
                  <TableHead>Unit/Tenant</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Unit 3B</div>
                    <div className="text-sm text-muted-foreground">
                      Sarah Johnson
                    </div>
                  </TableCell>
                  <TableCell>$1,200</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                      May 1
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Paid
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button variant="ghost" size="icon">
                        <Bell className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Unit 5A</div>
                    <div className="text-sm text-muted-foreground">
                      Michael Chen
                    </div>
                  </TableCell>
                  <TableCell>$950</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                      May 1
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="destructive">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Overdue
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button variant="ghost" size="icon">
                        <Bell className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Unit 2C</div>
                    <div className="text-sm text-muted-foreground">
                      David Wilson
                    </div>
                  </TableCell>
                  <TableCell>$1,100</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                      May 1
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      <Clock className="h-3 w-3 mr-1" />
                      Pending
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button variant="ghost" size="icon">
                        <Bell className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">3</span> of{" "}
              <span className="font-medium">9</span> payments
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

        {/* Payment Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Actions</CardTitle>
            <CardDescription>Manage tenant payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Send Reminders */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Send Reminders</h3>
              </div>
              <div className="space-y-2">
                <Label>Select Tenants</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose tenants" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overdue">All Overdue</SelectItem>
                    <SelectItem value="pending">All Pending</SelectItem>
                    <SelectItem value="specific">Specific Tenants</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Message Template</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="friendly">Friendly Reminder</SelectItem>
                    <SelectItem value="formal">Formal Notice</SelectItem>
                    <SelectItem value="urgent">
                      Urgent Payment Request
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Send Reminders
              </Button>
              <div className="text-xs text-muted-foreground">
                Reminders will be sent via SMS (Twilio) and email
              </div>
            </div>

            {/* Collect Payment */}
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center space-x-3">
                <CreditCard className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Collect Payment</h3>
              </div>
              <div className="space-y-2">
                <Label>Select Tenant</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose tenant" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="michael">
                      Michael Chen (Unit 5A)
                    </SelectItem>
                    <SelectItem value="david">
                      David Wilson (Unit 2C)
                    </SelectItem>
                    <SelectItem value="sarah">
                      Sarah Johnson (Unit 3B)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Payment Amount</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input type="number" placeholder="0.00" className="pl-8" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <Select defaultValue="stripe">
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stripe">
                      Credit/Debit (Stripe)
                    </SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">
                <CreditCard className="h-4 w-4 mr-2" />
                Process Payment
              </Button>
              <div className="text-xs text-muted-foreground">
                Credit card payments processed via Stripe
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
