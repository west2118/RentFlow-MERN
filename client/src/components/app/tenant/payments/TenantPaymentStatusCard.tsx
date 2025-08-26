import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { statusPaymentStyle } from "@/constants/statusPaymentStyle";
import { CalendarDays, CheckCircle2, Clock, DollarSign } from "lucide-react";
import ExpiredLeaseContent from "../ExpiredLeaseContent";

const TenantPaymentStatusCard = ({
  status,
  expired,
}: {
  status: string | undefined;
  expired: string;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {expired !== "expired" ? (
          <>
            {statusPaymentStyle(status)}
            <Progress
              value={status === "Paid" ? 100 : 0}
              className="h-2 mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {status === "Paid"
                ? "Payment paid"
                : status === "In Process"
                ? "The landlord is processing the payment"
                : "Not yet paid"}
            </p>
          </>
        ) : (
          <ExpiredLeaseContent />
        )}
      </CardContent>
    </Card>
  );
};

export default TenantPaymentStatusCard;
