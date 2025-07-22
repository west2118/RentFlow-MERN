import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/constants/formatDate";
import type { LeaseType } from "@/types/leaseTypes";
import { FileText } from "lucide-react";

const TenantDashboardLeaseCard = ({ lease }: { lease: LeaseType }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Lease Information</CardTitle>
        <FileText className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Start Date</span>
          <span>{formatDate(lease?.leaseStart)}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">End Date</span>
          <span>{formatDate(lease?.leaseEnd)}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Monthly Rent</span>
          <span>${lease?.rentAmount}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Payment Schedule</span>
          <span>{lease?.paymentSchedule}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Lease
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TenantDashboardLeaseCard;
