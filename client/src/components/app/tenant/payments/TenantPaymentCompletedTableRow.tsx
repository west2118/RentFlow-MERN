import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { formatDate } from "@/constants/formatDate";
import { statusPaymentStyle } from "@/constants/statusPaymentStyle";
import type { PaymentType } from "@/types/paymentTypes";
import { CheckCircle2, Download } from "lucide-react";

const TenantPaymentCompletedTableRow = ({
  payment,
}: {
  payment: PaymentType;
}) => {
  return (
    <TableRow>
      <TableCell>{formatDate(payment?.datePaid!)}</TableCell>
      <TableCell>${payment?.amount}</TableCell>
      <TableCell>{formatDate(payment?.dueDate.toString())}</TableCell>
      <TableCell>{payment?.method}</TableCell>
      <TableCell>{statusPaymentStyle(payment?.status)}</TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="icon">
          <Download className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TenantPaymentCompletedTableRow;
