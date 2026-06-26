import { LandlordTenantsCard } from "@/components/app/landlord/tenants/LandlordTenantsCard";

export function LandlordTenant() {
  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Tenant Management</h2>
      </div>

      <LandlordTenantsCard />

    </main>
  );
}
