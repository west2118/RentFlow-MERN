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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  User,
  Mail,
  Phone,
  Bell,
  BellOff,
  AlertTriangle,
  Trash2,
  Save,
  ChevronDown,
} from "lucide-react";

export function LandlordSettings() {
  return (
    <main className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Account Settings</h2>
        <p className="text-muted-foreground">
          Manage your profile and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile Information</span>
              </div>
            </CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john.doe@example.com"
                  className="pl-9"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  id="phone"
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="pl-9"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </CardFooter>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Preferences</span>
              </div>
            </CardTitle>
            <CardDescription>
              Configure how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="space-y-1">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive important updates via email
                </p>
              </div>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-4">
              <div className="space-y-1">
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get text alerts for urgent matters
                </p>
              </div>
              <Switch id="sms-notifications" />
            </div>
            <div className="flex items-center justify-between space-x-4">
              <div className="space-y-1">
                <Label htmlFor="payment-reminders">Payment Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Alerts for upcoming and overdue payments
                </p>
              </div>
              <Switch id="payment-reminders" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-4">
              <div className="space-y-1">
                <Label htmlFor="maintenance-updates">Maintenance Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Status changes for maintenance requests
                </p>
              </div>
              <Switch id="maintenance-updates" defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notification-frequency">
                Notification Frequency
              </Label>
              <Select defaultValue="instant">
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instant">Instant</SelectItem>
                  <SelectItem value="daily">Daily Digest</SelectItem>
                  <SelectItem value="weekly">Weekly Summary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Preferences
            </Button>
          </CardFooter>
        </Card>

        {/* Account Deletion */}
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center space-x-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                <span>Danger Zone</span>
              </div>
            </CardTitle>
            <CardDescription>
              Permanent actions that cannot be undone
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="delete-account">Delete Account</Label>
              <p className="text-sm text-muted-foreground">
                This will permanently delete your account and all associated
                data.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-email">Confirm Email</Label>
              <Input
                id="confirm-email"
                type="email"
                placeholder="Enter your email to confirm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="delete-reason">
                Reason for Leaving (Optional)
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="too-expensive">Too expensive</SelectItem>
                  <SelectItem value="missing-features">
                    Missing features
                  </SelectItem>
                  <SelectItem value="switching-platform">
                    Switching to another platform
                  </SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
