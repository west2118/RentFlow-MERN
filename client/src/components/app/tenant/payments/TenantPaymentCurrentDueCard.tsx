import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatDate } from "@/constants/formatDate";
import type { PaymentType } from "@/types/paymentTypes";
import { CalendarDays, DollarSign } from "lucide-react";

const TenantPaymentCurrentDueCard = ({ item }: { item: PaymentType }) => {
  console.log(item);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Current Rent Due</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${item?.amount.toFixed(2)}</div>
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <CalendarDays className="h-4 w-4 mr-1" />
          Due {formatDate(item?.dueDate.toString())}
        </div>
      </CardContent>
    </Card>
  );
};

export default TenantPaymentCurrentDueCard;
