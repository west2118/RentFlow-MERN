import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  User,
  Home,
  MoreVertical,
  CheckCircle2,
  DollarSign,
  Calendar,
  Building,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { UnitType } from "@/types/unitTypes";
import { formatDate } from "@/constants/formatDate";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LandlordTenantsTable = ({
  item,
  onViewLease,
}: {
  item: UnitType;
  onViewLease: () => void;
}) => {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p>{item?.tenantName}</p>
            <p className="text-sm text-muted-foreground">{item?.tenantGmail}</p>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center">{item?.name}</div>
      </TableCell>

      <TableCell>
        <div className="flex items-center">
          ${item?.lease?.rentAmount} - {item?.lease?.paymentSchedule}
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center">Unit {item?.unitNumber}</div>
      </TableCell>

      <TableCell>
        <div className="flex items-center">
          {item?.lease?.leaseEnd ? formatDate(item?.lease?.leaseEnd) : null}
        </div>
      </TableCell>

      <TableCell>
        <Badge variant="default">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Current
        </Badge>
      </TableCell>

      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onViewLease}>
              <Eye className="mr-1 h-4 w-4" />
              View Lease
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default LandlordTenantsTable;
