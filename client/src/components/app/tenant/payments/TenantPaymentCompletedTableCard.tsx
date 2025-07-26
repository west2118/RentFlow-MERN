import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { PaymentType } from "@/types/paymentTypes";
import TenantPaymentCompletedTableRow from "./TenantPaymentCompletedTableRow";
import TenantPaymentCompletedNoData from "./TenantPaymentCompletedNoData";

const TenantPaymentCompletedTableCard = ({ item }: { item: PaymentType[] }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Your past rent payments</CardDescription>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search payments..." className="pl-9" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date Paid</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead className="text-right">Receipt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {item.length > 0 ? (
              item?.map((payment) => (
                <TenantPaymentCompletedTableRow
                  key={payment._id}
                  payment={payment}
                />
              ))
            ) : (
              <TenantPaymentCompletedNoData
                numberOfSpan={6}
                label="No completed payments found"
              />
            )}
          </TableBody>
        </Table>
      </CardContent>
      {item?.length > 0 && (
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">3</span> of{" "}
            <span className="font-medium">12</span> payments
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default TenantPaymentCompletedTableCard;
