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
import { CheckCircle2, Download, Eye, LucideView, View } from "lucide-react";
import { Loading } from "../../Loading";
import { useUserStore } from "@/store/useUserStore";
import useFetchData from "@/hooks/useFetchData";

const TenantPaymentCompletedTableRow = ({
  payment,
}: {
  payment: PaymentType;
}) => {
  const token = useUserStore((state) => state.userToken);
  const { data, loading, error } = useFetchData(
    `http://localhost:8080/api/receipt/${payment._id}`,
    token,
    [payment._id]
  );

  console.log("Receipt: ", data);

  return (
    <TableRow>
      <TableCell>
        {data?.transactionDate && !payment?.datePaid
          ? formatDate(data?.transactionDate.toString())
          : formatDate(payment?.datePaid!)}
      </TableCell>
      <TableCell>${payment?.amount}</TableCell>
      <TableCell>{formatDate(payment?.dueDate.toString())}</TableCell>
      <TableCell>
        {data?.method && !payment?.method ? data?.method : payment?.method}
      </TableCell>
      <TableCell>{statusPaymentStyle(payment?.status)}</TableCell>
      <TableCell>
        {payment?.status === "Paid" || (data && data?.status !== "Rejected") ? (
          <Button
            variant="outline"
            size="default"
            className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            View Receipt
          </Button>
        ) : (
          <Button
            variant="outline"
            size="default"
            className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Make Payment
          </Button>
        )}
      </TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="icon">
          <Download className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TenantPaymentCompletedTableRow;
