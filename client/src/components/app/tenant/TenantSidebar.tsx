import { Button } from "@/components/ui/button";
import {
  Home,
  Wrench,
  DollarSign,
  FileText,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import { Link } from "react-router-dom";

const TenantSidebar = () => {
  return (
    <div className="w-64 bg-white border-r p-4 hidden md:block">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-primary">RentFlow</h1>
        <p className="text-sm text-muted-foreground">Tenant Dashboard</p>
      </div>

      <nav className="space-y-1">
        <Button
          asChild
          variant="ghost"
          className="w-full justify-start bg-accent">
          <Link to="/tenant">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Overview
          </Link>
        </Button>
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to="/tenant/unit">
            <Home className="h-4 w-4 mr-2" />
            My Unit
          </Link>
        </Button>

        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to="/tenant/maintenance">
            <Wrench className="h-4 w-4 mr-2" />
            Maintenance
          </Link>
        </Button>

        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to="/tenant/payments">
            <DollarSign className="h-4 w-4 mr-2" />
            Payments
          </Link>
        </Button>

        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to="/tenant/documents">
            <FileText className="h-4 w-4 mr-2" />
            Documents
          </Link>
        </Button>

        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to="/tenant/settings">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Link>
        </Button>
      </nav>
    </div>
  );
};

export default TenantSidebar;
