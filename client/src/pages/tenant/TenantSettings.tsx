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
import ProfileSettings from "@/components/app/shared/ProfileSettings";

const TenantSettings = () => {
  return (
    <main className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Account Settings</h2>
        <p className="text-muted-foreground">
          Manage your profile and preferences
        </p>
      </div>

      <ProfileSettings />
    </main>
  );
};

export default TenantSettings;
