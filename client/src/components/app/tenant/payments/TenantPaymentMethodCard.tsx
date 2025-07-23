import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CreditCard } from "lucide-react";

const TenantPaymentMethodCard = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Payment Method</CardTitle>
        <CreditCard className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-sm">VISA •••• 4242</div>
        <p className="text-xs text-muted-foreground mt-1">Expires 04/2025</p>
        <Button variant="link" size="sm" className="p-0 h-auto mt-2">
          Change Payment Method
        </Button>
      </CardContent>
    </Card>
  );
};

export default TenantPaymentMethodCard;
