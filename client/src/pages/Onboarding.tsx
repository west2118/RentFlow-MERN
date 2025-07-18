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
import OnboardingForm from "@/components/app/LandlordSetup";
import LandlordSetup from "@/components/app/LandlordSetup";
import TenantSetup from "@/components/app/TenantSetup";

export default function OnboardingPage() {
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

            <LandlordSetup />

            <TenantSetup />
          </Tabs>
        </div>
      </main>
    </div>
  );
}
