import { Suspense } from "react";
import LandlordPaymentHistorySummaryCards from "@/components/app/landlord/payment-history/LandlordPaymentHistorySummaryCards";
import LandlordPaymentHistoryTableCard from "@/components/app/landlord/payment-history/LandlordPaymentHistoryTableCard";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";
import { SummaryCardSkeletonGrid } from "@/components/app/shared/skeletons/SummaryCardSkeletonGrid";

export function LandlordPaymentHistory() {

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Payment History</h1>
          <p className="text-muted-foreground">
            Track all rent payments and transactions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <Suspense fallback={<SummaryCardSkeletonGrid />}>
        <LandlordPaymentHistorySummaryCards />
      </Suspense>

      {/* Payment History Table */}
      <LandlordPaymentHistoryTableCard />
    </div>
  );
}
