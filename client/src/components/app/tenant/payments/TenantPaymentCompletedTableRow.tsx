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
import { useNavigate } from "react-router-dom";
import { ReceiptModal } from "../../ReceiptModal";
import { useState } from "react";

const TenantPaymentCompletedTableRow = ({
  payment,
}: {
  payment: PaymentType;
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const token = useUserStore((state) => state.userToken);
  const { data } = useFetchData(
    `http://localhost:8080/api/receipt/${payment._id}`,
    token,
    [payment._id]
  );

  return (
    <TableRow>
      <TableCell>
        {data?.transactionDate && payment?.datePaid
          ? formatDate(data?.transactionDate.toString())
          : "N/A"}
      </TableCell>
      <TableCell>${payment?.amount.toFixed(2)}</TableCell>
      <TableCell>{formatDate(payment?.dueDate.toString())}</TableCell>
      <TableCell>
        {data?.method && !payment?.method ? data?.method : "N/A"}
      </TableCell>
      <TableCell>{statusPaymentStyle(payment?.status)}</TableCell>
      <TableCell>
        {payment?.status === "Paid" || (data && data?.status !== "Rejected") ? (
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="outline"
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
      <TableCell className="text-right">
        <Button variant="ghost" size="icon">
          <Download className="h-4 w-4" />
        </Button>
      </TableCell>

      {isModalOpen && (
        <ReceiptModal
          isModalOpen={isModalOpen}
          isCloseModal={() => setIsModalOpen(false)}
          payment={payment}
        />
      )}
    </TableRow>
  );
};

export default TenantPaymentCompletedTableRow;
