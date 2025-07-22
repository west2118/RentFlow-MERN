import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { UnitType } from "@/types/unitTypes";
import { Home } from "lucide-react";
import React from "react";

const TenantDashboardUnitCard = ({ unit }: { unit: UnitType }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">My Unit</CardTitle>
        <Home className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-xl font-bold">Unit {unit?.unitNumber}</div>
        <p className="text-sm text-muted-foreground">{unit?.address}</p>
        <div className="mt-2 text-sm">
          <p>
            {unit?.bedrooms} Bed, {unit?.bathrooms} Bath {unit?.type}
          </p>
          <p>{unit?.size} sq ft</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TenantDashboardUnitCard;
