import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { UnitType } from "@/types/unitTypes";

const TenantUnitDetailsCards = ({ unit }: { unit: UnitType }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Unit Details</CardTitle>
        <CardDescription>
          Basic information about your rental unit
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Unit Type</span>
          <span className="text-end">
            {unit?.bedrooms} Bed, {unit?.bathrooms} Bath {unit?.type}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Address</span>
          <span className="text-end">{unit?.address}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Square Footage</span>
          <span className="text-end">{unit?.size} sq ft</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Amenities</span>
          <span className="text-end">{unit?.amenities.join(", ")}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TenantUnitDetailsCards;
