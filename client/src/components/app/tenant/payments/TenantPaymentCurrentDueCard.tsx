import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatDate } from "@/constants/formatDate";
import type { PaymentType } from "@/types/paymentTypes";
import { CalendarDays, DollarSign } from "lucide-react";
import ExpiredLeaseContent from "../ExpiredLeaseContent";

const TenantPaymentCurrentDueCard = ({
  item,
  expired,
}: {
  item: PaymentType | undefined;
  expired: string;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Current Rent Due</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {expired !== "expired" ? (
          <>
            <div className="text-2xl font-bold">
              {item?.lateFee
                ? `$${item?.amount.toFixed(2)} + $${item?.lateFee.toFixed(2)}`
                : `$${item?.amount.toFixed(2)}`}
            </div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <CalendarDays className="h-4 w-4 mr-1" />
              Due {formatDate(item?.dueDate.toString()!)}
            </div>
          </>
        ) : (
          <ExpiredLeaseContent />
        )}
      </CardContent>
    </Card>
  );
};

export default TenantPaymentCurrentDueCard;
