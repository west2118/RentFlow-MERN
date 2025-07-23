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
import { Mail, DollarSign, CreditCard, Bell } from "lucide-react";

const LandlordPaymentActionsCard = () => {
  return (
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
                <SelectItem value="urgent">Urgent Payment Request</SelectItem>
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
                <SelectItem value="michael">Michael Chen (Unit 5A)</SelectItem>
                <SelectItem value="david">David Wilson (Unit 2C)</SelectItem>
                <SelectItem value="sarah">Sarah Johnson (Unit 3B)</SelectItem>
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
                <SelectItem value="stripe">Credit/Debit (Stripe)</SelectItem>
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
  );
};

export default LandlordPaymentActionsCard;
