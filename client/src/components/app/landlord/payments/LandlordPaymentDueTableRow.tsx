import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/constants/formatDate";
import { statusPaymentStyle } from "@/constants/statusPaymentStyle";
import type { PaymentType } from "@/types/paymentTypes";
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  Eye,
  MoreVertical,
} from "lucide-react";
import React, { useState } from "react";
import { ReceiptModal } from "../../ReceiptModal";

const LandlordPaymentDueTableRow = ({ item }: { item: PaymentType }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  console.log(item);

  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">Unit {item?.unitNumber}</div>
        <div className="text-sm text-muted-foreground">{item?.tenantName}</div>
      </TableCell>
      <TableCell>
        {`$${item?.amount.toFixed(2)} + $${item?.lateFee!.toFixed(2)}`}
      </TableCell>
      <TableCell>
        <div className="flex items-center">
          <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
          {formatDate(item?.dueDate.toString())}
        </div>
      </TableCell>
      <TableCell>{statusPaymentStyle(item?.status)}</TableCell>
      <TableCell>
        <Button
          variant="default"
          size="default"
          disabled={item?.status === "Pending"}
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          View Receipt
        </Button>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end space-x-1">
          <Button variant="ghost" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>

      {isModalOpen && (
        <ReceiptModal
          isModalOpen={isModalOpen}
          isCloseModal={() => setIsModalOpen(false)}
          payment={item}
        />
      )}
    </TableRow>
  );
};

export default LandlordPaymentDueTableRow;
