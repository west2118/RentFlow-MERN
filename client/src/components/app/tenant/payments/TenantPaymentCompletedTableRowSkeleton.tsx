import { TableRow, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const TenantPaymentCompletedTableRowSkeleton = () => {
  return (
    <TableRow>
      {/* Date Paid */}
      <TableCell>
        <Skeleton className="h-4 w-28" />
      </TableCell>

      {/* Amount */}
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>

      {/* Late Fee */}
      <TableCell>
        <Skeleton className="h-4 w-16" />
      </TableCell>

      {/* Due Date */}
      <TableCell>
        <Skeleton className="h-4 w-28" />
      </TableCell>

      {/* Payment Method */}
      <TableCell>
        <Skeleton className="h-4 w-24" />
      </TableCell>

      {/* Status */}
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>

      {/* Actions */}
      <TableCell className="flex justify-end">
        <Skeleton className="h-9 w-28 rounded-md" />
      </TableCell>
    </TableRow>
  );
};

export default TenantPaymentCompletedTableRowSkeleton;
