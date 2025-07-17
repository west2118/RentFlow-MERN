import { Button } from "@/components/ui/button";
import {
  Home,
  LayoutGrid,
  Users,
  Wrench,
  DollarSign,
  FileText,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

const LandlordSidebar = () => {
  return (
    <div className="w-64 bg-white border-r p-4 hidden md:block">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-primary">RentFlow</h1>
        <p className="text-sm text-muted-foreground">Landlord Dashboard</p>
      </div>

      <nav className="space-y-1">
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to="/landlord">
            <Home className="h-4 w-4 mr-2" />
            Overview
          </Link>
        </Button>

        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to="/landlord/units">
            <LayoutGrid className="h-4 w-4 mr-2" />
            My Units
          </Link>
        </Button>

        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to="/landlord/tenants">
            <Users className="h-4 w-4 mr-2" />
            Tenants
          </Link>
        </Button>

        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to="/landlord/maintenance">
            <Wrench className="h-4 w-4 mr-2" />
            Maintenance
          </Link>
        </Button>

        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to="/landlord/payments">
            <DollarSign className="h-4 w-4 mr-2" />
            Payments
          </Link>
        </Button>

        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to="/landlord/documents">
            <FileText className="h-4 w-4 mr-2" />
            Documents
          </Link>
        </Button>

        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to="/landlord/settings">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Link>
        </Button>
      </nav>
    </div>
  );
};

export default LandlordSidebar;
