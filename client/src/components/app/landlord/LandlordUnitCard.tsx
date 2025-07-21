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
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteTenantModal } from "./InviteTenantModal";
import { formatDate } from "@/constants/formatDate";

type LandlordUnitCardProps = {
  item: UnitType;
};

const LandlordUnitCard = ({ item }: LandlordUnitCardProps) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
        <div className="flex items-center text-sm">
          <Home className="h-4 w-4 mr-2 text-muted-foreground" />
          {item.address}
        </div>
        {item.status === "Available" ? (
          <>
            <div className="flex items-center text-sm">
              <CircleDollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
              ${item?.rentAmount}/month
            </div>
            <div className="flex items-center text-sm">
              <Ruler className="h-4 w-4 mr-2 text-muted-foreground" />
              Size: {item.size} sqm
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center text-sm">
              <User className="h-4 w-4 mr-2 text-muted-foreground" />
              {item.tenantName}
            </div>
            <div className="flex items-center text-sm">
              <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
              Lease ends: {item?.leaseEnd ? formatDate(item?.leaseEnd) : null}
            </div>
          </>
        )}
      </CardContent>
      <CardFooter
        className={`flex ${
          item.status === "Occupied" ? "justify-between" : "justify-end"
        }`}>
        {item?.status === "Occupied" ? (
          <>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              View Lease
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </>
        ) : item?.hasLease ? (
          <Button onClick={() => setIsModalOpen(true)} size="sm">
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
      </CardFooter>

      {isModalOpen && (
        <InviteTenantModal
          isModalOpen={isModalOpen}
          isCloseModal={() => setIsModalOpen(false)}
          unitId={item._id}
        />
      )}
    </Card>
  );
};

export default LandlordUnitCard;
