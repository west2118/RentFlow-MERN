import type { PaymentType } from "@/types/paymentTypes";
import { formatDistanceToNow, isToday, isTomorrow } from "date-fns";
import { CalendarCheck } from "lucide-react";
import React from "react";

const LandlordDashboardPaymentLatest = ({
  payment,
}: {
  payment: PaymentType;
}) => {
  const dueDate = new Date(payment?.dueDate);

  let dueLabel = "Due " + formatDistanceToNow(dueDate, { addSuffix: true });

  if (isToday(dueDate)) {
    dueLabel = "Due Today";
  } else if (isTomorrow(dueDate)) {
    dueLabel = "Due Tomorrow";
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">Unit {payment?.unitNumber}</p>
        <p className="text-sm text-muted-foreground">{payment?.tenantName}</p>
      </div>
      <div className="text-right">
        <p className="font-medium">${payment?.amount.toFixed(2)}</p>
        <p className="text-sm text-muted-foreground flex items-center">
          <CalendarCheck className="h-3 w-3 mr-1" />
          {dueLabel}
        </p>
      </div>
    </div>
  );
};

export default LandlordDashboardPaymentLatest;
