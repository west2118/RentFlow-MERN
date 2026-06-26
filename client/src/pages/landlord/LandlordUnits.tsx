import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LandlordUnitsTable } from "@/components/app/landlord/units/LandlordUnitsTable";

export function LandlordUnits() {
  const navigate = useNavigate();

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Units</h2>
        <Button onClick={() => navigate("/landlord/unit/create")}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Unit
        </Button>
      </div>

      <LandlordUnitsTable />
    </main>
  );
}
