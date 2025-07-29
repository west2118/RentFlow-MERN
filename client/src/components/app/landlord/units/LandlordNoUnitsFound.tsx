import { FileWarning } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LandlordNoUnitsFound = ({ label }: { label: string }) => {
  const navigate = useNavigate();

  return (
    <Card className="text-muted-foreground text-center gap-0 py-10">
      <CardHeader>
        <div className="flex flex-col items-center gap-2">
          <FileWarning className="w-10 h-10" />
          <CardTitle className="text-lg text-foreground">
            No Units Found
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">{label}</p>
        <Button onClick={() => navigate("/landlord/units/create")}>
          Add Unit
        </Button>
      </CardContent>
    </Card>
  );
};

export default LandlordNoUnitsFound;
