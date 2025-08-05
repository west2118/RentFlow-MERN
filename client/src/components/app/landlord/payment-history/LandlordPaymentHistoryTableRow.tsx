import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/constants/formatDate";
import { statusPaymentStyle } from "@/constants/statusPaymentStyle";
import type { PaymentType } from "@/types/paymentTypes";
import { Calendar, CheckCircle2, Download } from "lucide-react";
import React from "react";

const LandlordPaymentHistoryTableRow = ({
  payment,
}: {
  payment: PaymentType;
}) => {
  console.log(payment);

  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          {formatDate(payment.dueDate.toString())}
        </div>
      </TableCell>
      <TableCell>{payment.tenantName}</TableCell>
      <TableCell>Unit {payment.unitNumber}</TableCell>
      <TableCell>${payment.amount.toFixed(2)}</TableCell>
      <TableCell>
        {payment?.datePaid ? formatDate(payment?.datePaid?.toString()) : "-"}
      </TableCell>
      <TableCell>{payment?.receipt ? payment?.receipt.method : "-"}</TableCell>
      <TableCell>
        <span className="inline-flex items-center gap-1 text-green-600">
          {statusPaymentStyle(payment?.status)}
        </span>
      </TableCell>
      <TableCell>
        <Button disabled={payment?.status !== "Paid"} variant="ghost" size="sm">
          <Download className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default LandlordPaymentHistoryTableRow;
