import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

export const statusStyle = (status: string | undefined) => {
  switch (status) {
    case "Pending":
      return (
        <Badge variant="destructive">
          <AlertCircle className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      );
    case "In Progress":
      return (
        <Badge variant="outline">
          <Clock className="h-3 w-3 mr-1" />
          In Progress
        </Badge>
      );
    case "Completed":
      return (
        <Badge variant="default">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Completed
        </Badge>
      );
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};
