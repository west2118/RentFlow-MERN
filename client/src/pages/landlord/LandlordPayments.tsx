import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import LandlordPaymentRentDueCard from "@/components/app/landlord/payments/LandlordPaymentRentDueCard";
import { LandlordPaymentsSummaryCards } from "@/components/app/landlord/payments/LandlordPaymentsSummaryCards";

export function LandlordPayments() {
  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Payments</h2>
        <div className="flex space-x-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Record Payment
          </Button>
        </div>
      </div>

      <LandlordPaymentsSummaryCards />

      {/* Rent Due List */}
      <LandlordPaymentRentDueCard />
    </main>
  );
}
