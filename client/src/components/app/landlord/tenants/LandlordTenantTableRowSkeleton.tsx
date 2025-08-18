import { TableRow, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export function LandlordTenantTableRowSkeleton() {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </TableCell>

      <TableCell>
        <Skeleton className="h-4 w-28" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-4 w-36" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-4 w-28" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-6 w-16 rounded-full" />
      </TableCell>

      <TableCell className="text-right">
        <Button variant="ghost" size="icon" disabled>
          <Skeleton className="h-4 w-4 rounded" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
