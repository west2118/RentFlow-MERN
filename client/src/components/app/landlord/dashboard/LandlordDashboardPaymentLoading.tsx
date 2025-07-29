import React from "react";

const LandlordDashboardPaymentLoading = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <div className="h-4 w-28 rounded bg-muted animate-pulse" />
        <div className="h-3 w-24 rounded bg-muted animate-pulse" />
      </div>
      <div className="text-right space-y-1">
        <div className="h-4 w-16 rounded bg-muted animate-pulse ml-auto" />
        <div className="h-3 w-24 rounded bg-muted animate-pulse ml-auto" />
      </div>
    </div>
  );
};

export default LandlordDashboardPaymentLoading;
