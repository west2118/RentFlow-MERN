import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/constants/formatDate";
import { statusPaymentStyle } from "@/constants/statusPaymentStyle";
import type { PaymentType } from "@/types/paymentTypes";
import { Bell, CalendarDays, CheckCircle2, MoreVertical } from "lucide-react";
import React from "react";

const LandlordPaymentDueTableRow = ({ item }: { item: PaymentType }) => {
  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">Unit {item?.unitNumber}</div>
        <div className="text-sm text-muted-foreground">{item?.tenantName}</div>
      </TableCell>
      <TableCell>${item?.amount}</TableCell>
      <TableCell>
        <div className="flex items-center">
          <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
          {formatDate(item?.dueDate.toString())}
        </div>
      </TableCell>
      <TableCell>{statusPaymentStyle(item?.status)}</TableCell>
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
    </TableRow>
  );
};

export default LandlordPaymentDueTableRow;
