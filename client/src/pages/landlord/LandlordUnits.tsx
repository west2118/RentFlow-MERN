import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import LandlordUnitCard from "@/components/app/landlord/LandlordUnitCard";
import type { UnitType } from "@/types/unitTypes";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/constants/fetchData";
import LandlordNoUnitsFound from "@/components/app/landlord/units/LandlordNoUnitsFound";
import LandlordUnitCardSkeleton from "@/components/app/landlord/units/LandlordUnitCardSkeleton";
import { useState } from "react";
import { InviteTenantModal } from "@/components/app/landlord/InviteTenantModal";
import { UnitDetailsModal } from "@/components/app/UnitDetailsModal";
import { LeaseDetailsModal } from "@/components/app/LeaseDetailsModal";
import type { LeaseType } from "@/types/leaseTypes";

export function LandlordUnits() {
  const navigate = useNavigate();
  const token = useUserStore((state) => state.userToken);
  const [isModalOpenType, setIsModalOpenType] = useState<
    "invite" | "details" | "lease" | null
  >(null);
  const [selectedUnit, setSelectedUnit] = useState<UnitType | null>(null);

  const { data, isLoading } = useQuery<UnitType[]>({
    queryKey: ["units"],
    queryFn: fetchData("http://localhost:8080/api/unit", token),
    enabled: !!token,
  });

  console.log("DATA: ", data);

  const handleOpenModal = (
    unit: UnitType,
    type: "invite" | "details" | "lease"
  ) => {
    setIsModalOpenType(type);
    setSelectedUnit(unit);
  };

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
            {isLoading ? (
              <>
                {[...Array(3)].map((_, index) => (
                  <LandlordUnitCardSkeleton key={index} />
                ))}
              </>
            ) : data && data?.length > 0 ? (
              data?.map((item) => (
                <LandlordUnitCard
                  key={item._id}
                  item={item}
                  handleOpenModal={handleOpenModal}
                />
              ))
            ) : (
              <LandlordNoUnitsFound
                label="You haven't added any units yet. Start by adding your first property
                        to manage leases and tenants."
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="available">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <>
                {[...Array(3)].map((_, index) => (
                  <LandlordUnitCardSkeleton key={index} />
                ))}
              </>
            ) : data &&
              data?.filter((item) => item.status === "Available").length > 0 ? (
              data
                ?.filter((item) => item.status === "Available")
                .map((item) => (
                  <LandlordUnitCard
                    key={item._id}
                    item={item}
                    handleOpenModal={handleOpenModal}
                  />
                ))
            ) : (
              <LandlordNoUnitsFound label="No available units at the moment. All units are currently occupied." />
            )}
          </div>
        </TabsContent>

        <TabsContent value="occupied">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <>
                {[...Array(3)].map((_, index) => (
                  <LandlordUnitCardSkeleton key={index} />
                ))}
              </>
            ) : data &&
              data?.filter((item) => item.status === "Occupied").length > 0 ? (
              data
                ?.filter((item) => item.status === "Occupied")
                .map((item) => (
                  <LandlordUnitCard
                    key={item._id}
                    item={item}
                    handleOpenModal={handleOpenModal}
                  />
                ))
            ) : (
              <LandlordNoUnitsFound label="No occupied units right now. All units are currently available." />
            )}
          </div>
        </TabsContent>
      </Tabs>

      {selectedUnit && isModalOpenType === "invite" && (
        <InviteTenantModal
          isModalOpen
          isCloseModal={() => setIsModalOpenType(null)}
          unitId={selectedUnit._id}
        />
      )}

      {selectedUnit && isModalOpenType === "details" && (
        <UnitDetailsModal
          isModalOpen
          isCloseModal={() => setIsModalOpenType(null)}
          unit={selectedUnit}
        />
      )}

      {selectedUnit && isModalOpenType === "lease" && (
        <LeaseDetailsModal
          isModalOpen
          isCloseModal={() => setIsModalOpenType(null)}
          lease={selectedUnit.lease ?? null}
        />
      )}
    </main>
  );
}
