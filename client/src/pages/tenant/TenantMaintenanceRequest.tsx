import React from "react";
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
import { Textarea } from "@/components/ui/textarea";
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
  Wrench,
  AlertCircle,
  Clock,
  CheckCircle2,
  MessageSquare,
  Paperclip,
  ChevronDown,
  Search,
} from "lucide-react";

const TenantMaintenanceRequest = () => {
  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Maintenance Requests</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* New Request Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Submit New Request</CardTitle>
            <CardDescription>
              Report maintenance issues in your unit
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="issue-type">Issue Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="appliance">Appliance</SelectItem>
                  <SelectItem value="heating-cooling">
                    Heating/Cooling
                  </SelectItem>
                  <SelectItem value="structural">Structural</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="urgency">Urgency Level</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emergency">
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2 text-destructive" />
                      Emergency (24hr response)
                    </div>
                  </SelectItem>
                  <SelectItem value="urgent">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-warning" />
                      Urgent (48hr response)
                    </div>
                  </SelectItem>
                  <SelectItem value="routine">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-success" />
                      Routine (5-7 day response)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the issue in detail..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Attachments (Optional)</Label>
              <div className="flex items-center justify-center w-full border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-gray-50">
                <div className="text-center">
                  <Paperclip className="h-6 w-6 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mt-2">
                    Click to upload photos or documents
                  </p>
                </div>
                <Input type="file" className="hidden" multiple />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline" className="mr-2">
              Cancel
            </Button>
            <Button>Submit Request</Button>
          </CardFooter>
        </Card>

        {/* Active Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Active Requests</CardTitle>
            <CardDescription>Your current maintenance issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Wrench className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Leaky Faucet</p>
                    <p className="text-xs text-muted-foreground">
                      Submitted: May 15
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">
                  <Clock className="h-3 w-3 mr-1" />
                  In Progress
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Wrench className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Broken Blinds</p>
                    <p className="text-xs text-muted-foreground">
                      Submitted: May 20
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
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Requests
            </Button>
          </CardFooter>
        </Card>

        {/* Request History Table */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Request History</CardTitle>
                <CardDescription>Past maintenance requests</CardDescription>
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
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">AC Repair</TableCell>
                  <TableCell>Apr 28, 2023</TableCell>
                  <TableCell>
                    <Badge variant="default">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  </TableCell>
                  <TableCell>
                    Replaced capacitor, system working normally
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Clogged Drain</TableCell>
                  <TableCell>Mar 15, 2023</TableCell>
                  <TableCell>
                    <Badge variant="default">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  </TableCell>
                  <TableCell>Cleared blockage in kitchen sink</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
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
      </div>
    </main>
  );
};

export default TenantMaintenanceRequest;
