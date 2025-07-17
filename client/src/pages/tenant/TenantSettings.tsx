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
  Lock,
  MessageSquare,
} from "lucide-react";

const TenantSettings = () => {
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
                <Input id="firstName" defaultValue="Sarah" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Johnson" />
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
                  defaultValue="sarah.johnson@example.com"
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
                <Label htmlFor="rent-reminders">Rent Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Receive alerts before rent is due
                </p>
              </div>
              <Switch id="rent-reminders" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-4">
              <div className="space-y-1">
                <Label htmlFor="maintenance-updates">Maintenance Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about request status changes
                </p>
              </div>
              <Switch id="maintenance-updates" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-4">
              <div className="space-y-1">
                <Label htmlFor="promotional">Promotional Offers</Label>
                <p className="text-sm text-muted-foreground">
                  Receive special offers from property management
                </p>
              </div>
              <Switch id="promotional" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notification-method">
                Preferred Notification Method
              </Label>
              <Select defaultValue="email">
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email Only</SelectItem>
                  <SelectItem value="sms">Text Message Only</SelectItem>
                  <SelectItem value="both">Email and Text</SelectItem>
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

        {/* Security & Account Deletion */}
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
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Lock className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Change Password</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
              </div>
              <Button variant="outline">Update Password</Button>
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="flex items-center space-x-3">
                <Trash2 className="h-5 w-5 text-destructive" />
                <h3 className="font-medium">Delete Account</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                This will permanently delete your account and all associated
                data. You will lose access to all lease documents and payment
                history.
              </p>
              <div className="space-y-2">
                <Label htmlFor="delete-confirm">
                  Enter your email to confirm
                </Label>
                <Input
                  id="delete-confirm"
                  type="email"
                  placeholder="sarah.johnson@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="delete-reason">
                  Reason for leaving (optional)
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="moving-out">Moving out</SelectItem>
                    <SelectItem value="dissatisfied">
                      Dissatisfied with service
                    </SelectItem>
                    <SelectItem value="privacy">Privacy concerns</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Permanently Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default TenantSettings;
