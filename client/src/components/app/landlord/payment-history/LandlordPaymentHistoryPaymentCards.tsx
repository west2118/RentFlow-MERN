import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react"; // optional for typing icons

const LandlordPaymentHistoryPaymentCards = ({
  totalCollectedAndPayments,
  title,
  icon: Icon,
  description,
}: {
  totalCollectedAndPayments: {
    totalCollected: number | undefined;
    totalPayment: number | undefined;
  };
  title: string;
  icon: LucideIcon;
  description: string;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon
          className={`h-4 w-4 ${
            title !== "Overdue Balance" ? "text-green-500" : "text-red-500"
          }`}
        />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          ${totalCollectedAndPayments?.totalCollected?.toFixed(2)}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          From {totalCollectedAndPayments?.totalPayment} {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default LandlordPaymentHistoryPaymentCards;
