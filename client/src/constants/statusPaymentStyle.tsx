import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

export const statusPaymentStyle = (status: string | undefined) => {
  switch (status) {
    case "Pending":
      return (
        <Badge variant="outline">
          <AlertCircle className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      );
    case "Paid":
      return (
        <Badge variant="default">
          <Clock className="h-3 w-3 mr-1" />
          Paid
        </Badge>
      );
    case "Overdue":
      return (
        <Badge variant="destructive">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Overdue
        </Badge>
      );
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};
