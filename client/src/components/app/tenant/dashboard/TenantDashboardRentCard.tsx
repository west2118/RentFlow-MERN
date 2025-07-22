import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, DollarSign } from "lucide-react";

const TenantDashboardRentCard = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Rent Status</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-xl font-bold mb-2">$1,200</div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted-foreground">Due Date</span>
          <span>June 1, 2023</span>
        </div>
        <div className="flex justify-between text-sm mb-3">
          <span className="text-muted-foreground">Status</span>
          <Badge variant="default">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Paid
          </Badge>
        </div>
        <Progress value={100} className="h-2" />
      </CardContent>
      <CardFooter>
        <Button className="w-full">Make Payment</Button>
      </CardFooter>
    </Card>
  );
};

export default TenantDashboardRentCard;
