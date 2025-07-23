import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Home,
  User,
  FileText,
  CalendarDays,
  CircleDollarSign,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
} from "lucide-react";
import useFetchData from "@/hooks/useFetchData";
import { useUserStore } from "@/store/useUserStore";
import LandlordUnitCard from "@/components/app/landlord/LandlordUnitCard";
import type { UnitType } from "@/types/unitTypes";
import { useNavigate } from "react-router-dom";
import { Loading } from "@/components/app/Loading";

export function LandlordUnits() {
  const navigate = useNavigate();
  const token = useUserStore((state) => state.userToken);
  const { data, loading, error } = useFetchData<UnitType[]>(
    "http://localhost:8080/api/unit",
    token
  );

  if (!data || loading) {
    return <Loading />;
  }

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Units</h2>
        <Button onClick={() => navigate("/landlord/unit/create")}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Unit
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid grid-cols-3 w-[400px] mb-6">
          <TabsTrigger value="all">All Units</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="occupied">Occupied</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.map((item) => (
              <LandlordUnitCard key={item._id} item={item} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="available">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data
              ?.filter((item) => item.status === "Available")
              .map((item) => (
                <LandlordUnitCard key={item._id} item={item} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="occupied">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data
              ?.filter((item) => item.status === "Occupied")
              .map((item) => (
                <LandlordUnitCard key={item._id} item={item} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
