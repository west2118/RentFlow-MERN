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

export function LandlordMaintenance() {
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <Wrench className="h-5 w-5 text-primary" />
                      <div>
                        <p>Leaky Faucet</p>
                        <p className="text-sm text-muted-foreground">
                          Submitted: 05/15/2023
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Home className="h-4 w-4 mr-2 text-muted-foreground" />
                      Unit 3B
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      Sarah Johnson
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      <Clock className="h-3 w-3 mr-1" />
                      In Progress
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button variant="ghost" size="icon">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <Wrench className="h-5 w-5 text-primary" />
                      <div>
                        <p>Broken Window</p>
                        <p className="text-sm text-muted-foreground">
                          Submitted: 05/10/2023
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Home className="h-4 w-4 mr-2 text-muted-foreground" />
                      Unit 5A
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      Michael Chen
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button variant="ghost" size="icon">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <Wrench className="h-5 w-5 text-primary" />
                      <div>
                        <p>AC Not Working</p>
                        <p className="text-sm text-muted-foreground">
                          Submitted: 05/18/2023
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Home className="h-4 w-4 mr-2 text-muted-foreground" />
                      Unit 2C
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      David Wilson
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="destructive">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Pending
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button variant="ghost" size="icon">
                        <MessageSquare className="h-4 w-4" />
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

        {/* Update Status & Message */}
        <Card>
          <CardHeader>
            <CardTitle>Manage Request</CardTitle>
            <CardDescription>Update status or message tenant</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Selected Request</Label>
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Leaky Faucet</p>
                <p className="text-sm text-muted-foreground">
                  Unit 3B - Sarah Johnson
                </p>
                <p className="text-sm mt-2">
                  "Kitchen faucet has been leaking for 2 days, getting worse."
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Update Status</Label>
              <Select defaultValue="in-progress">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2 text-destructive" />
                      Pending
                    </div>
                  </SelectItem>
                  <SelectItem value="in-progress">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-secondary" />
                      In Progress
                    </div>
                  </SelectItem>
                  <SelectItem value="completed">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-success" />
                      Completed
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message Tenant</Label>
              <Textarea
                id="message"
                placeholder="Update the tenant on the maintenance progress..."
                rows={4}
              />
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Message will be sent via email and in-app notification
                </div>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Add Note (Internal)</Label>
              <Textarea
                placeholder="Add internal notes about this request..."
                rows={3}
              />
              <div className="flex justify-end">
                <Button variant="outline" size="sm">
                  Save Note
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
