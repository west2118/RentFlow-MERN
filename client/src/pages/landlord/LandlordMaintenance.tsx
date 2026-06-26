import { LandlordMaintenanceCard } from "@/components/app/landlord/maintenance/LandlordMaintenanceCard";

export function LandlordMaintenance() {
  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Maintenance Requests</h2>
      </div>

      <LandlordMaintenanceCard />
    </main>
  );
}
