import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatDate } from "@/constants/formatDate";
import type { PaymentType } from "@/types/paymentTypes";
import { CalendarDays, DollarSign } from "lucide-react";

const TenantPaymentNextMonthCard = ({ item }: { item: PaymentType }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          Next Month Rent Due
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {item?.amount && item?.dueDate ? (
          <>
            <div className="text-2xl font-bold">${item.amount.toFixed(2)}</div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <CalendarDays className="h-4 w-4 mr-1" />
              {`Due ${formatDate(item.dueDate.toString())}`}
            </div>
          </>
        ) : (
          <div className="text-muted-foreground text-sm italic">
            No upcoming rent — lease may be complete
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TenantPaymentNextMonthCard;
