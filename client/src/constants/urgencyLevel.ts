import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

export const urgencyLevel = [
  {
    value: "emergency",
    label: " Emergency (24hr response)",
    icon: AlertCircle,
    iconClass: "h-4 w-4 mr-2 text-destructive",
  },
  {
    value: "urgent",
    label: "Urgent (48hr response)",
    icon: Clock,
    iconClass: "h-4 w-4 mr-2 text-warning",
  },
  {
    value: "routine",
    label: "Routine (5-7 day response)",
    icon: CheckCircle2,
    iconClass: "h-4 w-4 mr-2 text-success",
  },
];
