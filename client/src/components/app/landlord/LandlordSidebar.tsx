import { Button } from "@/components/ui/button";
import {
  Home,
  LayoutGrid,
  Users,
  Wrench,
  DollarSign,
  FileText,
  Settings,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const LandlordSidebar = () => {
  const location = useLocation();
  const isPaymentsActive = location.pathname.includes("/landlord/payments") || location.pathname.includes("/landlord/payment-history");
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(isPaymentsActive);

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

        <div className="flex flex-col">
          <Button
            variant="ghost"
            className={`w-full justify-between ${isPaymentsActive ? "bg-muted" : ""}`}
            onClick={() => setIsPaymentsOpen(!isPaymentsOpen)}
          >
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              Payments
            </div>
            {isPaymentsOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>

          {isPaymentsOpen && (
            <div className="ml-6 flex flex-col space-y-1 mt-1">
              <Button asChild variant="ghost" className="w-full justify-start text-sm h-8">
                <Link to="/landlord/payments">Rent Due</Link>
              </Button>
              <Button asChild variant="ghost" className="w-full justify-start text-sm h-8">
                <Link to="/landlord/payment-history">History</Link>
              </Button>
            </div>
          )}
        </div>

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
