import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { UnitType } from "@/types/unitTypes";
import {
  CalendarDays,
  CircleDollarSign,
  FileText,
  Home,
  MoreVertical,
  Ruler,
  User,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteTenantModal } from "./InviteTenantModal";
import { formatDate } from "@/constants/formatDate";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UnitDetailsModal } from "../UnitDetailsModal";

type LandlordUnitCardProps = {
  item: UnitType;
  handleOpenModal: (
    unit: UnitType,
    type: "invite" | "details" | "lease"
  ) => void;
};

const LandlordUnitCard = ({ item, handleOpenModal }: LandlordUnitCardProps) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">Unit {item?.unitNumber}</CardTitle>
            <CardDescription>
              {Number(item?.bedrooms) >= 1 ? `${item?.bedrooms} Bed, ` : ""}
              {Number(item?.bathrooms) >= 1 ? `${item?.bathrooms} Bath ` : ""}
              {item?.type}
            </CardDescription>
          </div>
          <Badge
            variant={`${
              item.status === "Available" ? "secondary" : "default"
            }`}>
            {item?.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-start text-sm gap-2">
          <Home className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
          <span className="flex-1 break-words">{item.address}</span>
        </div>

        {item.status === "Available" ? (
          <>
            <div className="flex items-start text-sm gap-2">
              <CircleDollarSign className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <span className="flex-1">${item?.rentAmount}/month</span>
            </div>
            <div className="flex items-start text-sm gap-2">
              <Ruler className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <span className="flex-1">Size: {item.size} sqm</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-start text-sm gap-2">
              <User className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <span className="flex-1 break-words">{item.tenantName}</span>
            </div>
            <div className="flex items-start text-sm gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <span className="flex-1">
                Lease ends:{" "}
                {item?.lease?.leaseEnd
                  ? formatDate(item?.lease?.leaseEnd)
                  : null}
              </span>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="mt-auto flex justify-between">
        {item?.status === "Occupied" ? (
          <Button
            onClick={() => handleOpenModal(item, "lease")}
            variant="outline"
            size="sm">
            <FileText className="h-4 w-4 mr-2" />
            View Lease
          </Button>
        ) : item?.hasLease ? (
          <Button onClick={() => handleOpenModal(item, "invite")} size="sm">
            <User className="h-4 w-4 mr-2" />
            Assign Tenant
          </Button>
        ) : (
          <Button
            onClick={() => navigate(`/landlord/lease/create/${item._id}`)}
            variant="default"
            size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Add Lease
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleOpenModal(item, "details")}>
              <Eye className="mr-1 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`/landlord/unit/edit-unit/${item?._id}`)}>
              <Pencil className="mr-1 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash2 className="mr-1 h-4 w-4 text-red-500" />
              <span className="text-red-500">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

export default LandlordUnitCard;
