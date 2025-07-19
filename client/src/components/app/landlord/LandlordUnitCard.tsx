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
  Ruler,
  User,
} from "lucide-react";

type LandlordUnitCardProps = {
  item: UnitType;
};

const LandlordUnitCard = ({ item }: LandlordUnitCardProps) => {
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
          <Badge variant="secondary">Available</Badge>
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
              Sarah Johnson
            </div>
            <div className="flex items-center text-sm">
              <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
              Lease ends: 05/15/2025
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          <FileText className="h-4 w-4 mr-2" />
          Add Lease
        </Button>
        <Button size="sm">
          <User className="h-4 w-4 mr-2" />
          Assign Tenant
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LandlordUnitCard;
