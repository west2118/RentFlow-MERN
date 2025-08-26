import TenantMaintenanceHistoryCard from "@/components/app/tenant/maintenance/TenantMaintenanceHistoryCard";

const TenantMaintenanceRequest = () => {
  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Maintenance Requests</h2>
      </div>

      {/* Request History Table */}
      <TenantMaintenanceHistoryCard />
    </main>
  );
};

export default TenantMaintenanceRequest;
