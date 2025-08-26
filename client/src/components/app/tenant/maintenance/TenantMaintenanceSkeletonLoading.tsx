import { TableRow, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const TenantMaintenanceSkeletonLoading = () => {
  return (
    <TableRow>
      {/* Request Name */}
      <TableCell>
        <Skeleton className="h-4 w-32" />
      </TableCell>

      {/* Date */}
      <TableCell>
        <Skeleton className="h-4 w-24" />
      </TableCell>

      {/* Status */}
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>

      {/* Technician Notes */}
      <TableCell>
        <Skeleton className="h-4 w-48" />
      </TableCell>

      {/* Actions */}
      <TableCell className="text-right">
        <Skeleton className="h-8 w-8 rounded-md inline-block" />
      </TableCell>
    </TableRow>
  );
};

export default TenantMaintenanceSkeletonLoading;
