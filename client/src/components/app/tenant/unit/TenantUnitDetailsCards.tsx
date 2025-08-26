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
import { FileText } from "lucide-react";
import { useState } from "react";
import { UnitDetailsModal } from "../../UnitDetailsModal";
import ExpiredLeaseContent from "../ExpiredLeaseContent";

const TenantUnitDetailsCards = ({
  unit,
  status,
}: {
  unit: UnitType | undefined;
  status: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Unit Details</CardTitle>
        <CardDescription>
          Basic information about your rental unit
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        {status === "expired" ? (
          <div className="flex-1">
            <ExpiredLeaseContent />
          </div>
        ) : unit ? (
          <div className="grid grid-cols-2 gap-y-2">
            <span className="text-muted-foreground">Unit Type</span>
            <span className="text-end">
              {unit.bedrooms} Bed, {unit.bathrooms} Bath {unit.type}
            </span>

            <span className="text-muted-foreground">Square Footage</span>
            <span className="text-end">{unit.size} sq ft</span>

            <span className="text-muted-foreground">Address</span>
            <span className="text-end">{unit.address}</span>

            <span className="text-muted-foreground">Amenities</span>
            <span className="text-end">{unit.amenities.join(", ")}</span>
          </div>
        ) : (
          <div className="text-center text-gray-500">No unit assigned.</div>
        )}
      </CardContent>
      {status === "expired" && unit && (
        <CardFooter className="flex text-end">
          <Button onClick={() => setIsModalOpen(true)} variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            View Unit Details
          </Button>
        </CardFooter>
      )}

      {isModalOpen && unit && (
        <UnitDetailsModal
          isModalOpen={isModalOpen}
          isCloseModal={() => setIsModalOpen(false)}
          unit={unit}
        />
      )}
    </Card>
  );
};

export default TenantUnitDetailsCards;
