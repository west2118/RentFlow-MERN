import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TenantMaintenanceHistoryCard from "@/components/app/tenant/maintenance/TenantMaintenanceHistoryCard";
import { useNavigate } from "react-router-dom";

const TenantMaintenanceRequest = () => {
  const navigate = useNavigate();

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Maintenance Requests</h2>
        <Button onClick={() => navigate("/tenant/maintenance-request/create")}>
          <Plus className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </div>

      {/* Request History Table */}
      <TenantMaintenanceHistoryCard />

      {/* Active Requests */}
      {/* <TenantMaintenanceActiveRequestCard /> */}
    </main>
  );
};

export default TenantMaintenanceRequest;
