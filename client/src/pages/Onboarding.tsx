import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

export default function OnboardingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to RentFlow
            </h2>
            <p className="text-gray-600">
              Let's get you set up. Choose your role to continue.
            </p>
          </div>

          {/* Role Selection */}
          <Tabs defaultValue="landlord" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="landlord">I'm a Landlord</TabsTrigger>
              <TabsTrigger value="tenant">I'm a Tenant</TabsTrigger>
            </TabsList>

            <TabsContent value="landlord">
              <Card>
                <CardHeader>
                  <CardTitle>Landlord Setup</CardTitle>
                  <CardDescription>
                    Manage your properties efficiently with RentFlow
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="notification">Email Notifications</Label>
                    <div className="flex items-center space-x-2">
                      <Switch id="notification" defaultChecked />
                      <Label htmlFor="notification">
                        Receive email notifications
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency">Preferred Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="cad">CAD ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Verification (Optional)</Label>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <Label htmlFor="id-front">ID Front</Label>
                          <Input id="id-front" type="file" />
                        </div>
                        <div className="flex-1">
                          <Label htmlFor="id-back">ID Back</Label>
                          <Input id="id-back" type="file" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="proof-address">Proof of Address</Label>
                        <Input id="proof-address" type="file" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={() => navigate("/landlord")}>
                    Continue Setup
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="tenant">
              <Card>
                <CardHeader>
                  <CardTitle>Tenant Setup</CardTitle>
                  <CardDescription>
                    Access your rental information and communicate with your
                    landlord
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="tenant-notification">
                      Notification Preferences
                    </Label>
                    <RadioGroup
                      defaultValue="all"
                      className="grid grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="all-notifications" />
                        <Label htmlFor="all-notifications">All</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="important"
                          id="important-notifications"
                        />
                        <Label htmlFor="important-notifications">
                          Important Only
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="none" id="no-notifications" />
                        <Label htmlFor="no-notifications">None</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tenant-currency">Preferred Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="cad">CAD ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Verification (Optional)</Label>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <Label htmlFor="tenant-id-front">ID Front</Label>
                          <Input id="tenant-id-front" type="file" />
                        </div>
                        <div className="flex-1">
                          <Label htmlFor="tenant-id-back">ID Back</Label>
                          <Input id="tenant-id-back" type="file" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Continue Setup</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
