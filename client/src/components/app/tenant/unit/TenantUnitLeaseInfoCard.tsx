import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/constants/formatDate";
import type { LeaseType } from "@/types/leaseTypes";
import { Download, FileText } from "lucide-react";
import { useState } from "react";
import { LeaseDetailsModal } from "../../LeaseDetailsModal";

const TenantUnitLeaseInfoCard = ({ lease }: { lease: LeaseType }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lease Information</CardTitle>
        <CardDescription>Your current rental agreement details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Lease Start</span>
          <span className="text-end">{formatDate(lease?.leaseStart)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Lease End</span>
          <span className="text-end">{formatDate(lease?.leaseEnd)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Monthly Rent</span>
          <span className="text-end">${lease?.rentAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Security Deposit</span>
          <span className="text-end">${lease?.securityDeposit.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Payment Schedule</span>
          <span className="text-end">{lease?.paymentSchedule}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Late Fee</span>
          <span>
            ${lease?.lateFee?.amount.toFixed(2)} after{" "}
            {lease?.lateFee?.afterDays} days
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => setIsModalOpen(true)} variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          View Full Lease
        </Button>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </CardFooter>

      {isModalOpen && (
        <LeaseDetailsModal
          isModalOpen={isModalOpen}
          isCloseModal={() => setIsModalOpen(false)}
          lease={lease}
        />
      )}
    </Card>
  );
};

export default TenantUnitLeaseInfoCard;
