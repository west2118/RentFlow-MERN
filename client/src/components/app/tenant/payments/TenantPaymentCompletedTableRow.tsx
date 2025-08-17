import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { formatDate } from "@/constants/formatDate";
import { paymentValue } from "@/constants/paymentValue";
import { statusPaymentStyle } from "@/constants/statusPaymentStyle";
import type { PaymentType } from "@/types/paymentTypes";
import { Download, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TenantPaymentCompletedTableRow = ({
  payment,
  handleOpenModal,
}: {
  payment: PaymentType;
  handleOpenModal: (payment: PaymentType) => void;
}) => {
  const navigate = useNavigate();

  console.log("Row: ", payment);

  return (
    <TableRow>
      <TableCell>
        {payment?.datePaid ? formatDate(payment?.datePaid.toString()) : "-"}
      </TableCell>
      <TableCell>${payment?.amount.toFixed(2)}</TableCell>
      <TableCell>
        ${payment?.lateFee ? payment?.lateFee.toFixed(2) : Number(0).toFixed(2)}
      </TableCell>
      <TableCell>{formatDate(payment?.dueDate.toString())}</TableCell>
      <TableCell>
        {payment?.receipt?.status === "Accepted"
          ? paymentValue(payment?.receipt?.method)
          : "-"}
      </TableCell>
      <TableCell>{statusPaymentStyle(payment?.status)}</TableCell>
      <TableCell className="flex justify-end">
        {payment?.status === "Paid" ||
        (payment?.receipt && payment?.receipt.status !== "Rejected") ? (
          <Button
            onClick={() => handleOpenModal(payment)}
            variant="default"
            size="default"
            className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            View Receipt
          </Button>
        ) : (
          <Button
            onClick={() => navigate(`/tenant/make-payment/${payment._id}`)}
            variant="outline"
            size="default"
            className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Make Payment
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default TenantPaymentCompletedTableRow;
