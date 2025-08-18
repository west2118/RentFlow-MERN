import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Search, X } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import LandlordUnitCard from "@/components/app/landlord/LandlordUnitCard";
import type { UnitType } from "@/types/unitTypes";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/constants/fetchData";
import LandlordNoUnitsFound from "@/components/app/landlord/units/LandlordNoUnitsFound";
import LandlordUnitCardSkeleton from "@/components/app/landlord/units/LandlordUnitCardSkeleton";
import { useEffect, useState } from "react";
import { InviteTenantModal } from "@/components/app/landlord/InviteTenantModal";
import { UnitDetailsModal } from "@/components/app/UnitDetailsModal";
import { LeaseDetailsModal } from "@/components/app/LeaseDetailsModal";
import type { LeaseType } from "@/types/leaseTypes";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/app/Pagination";
import { useDebounceInput } from "@/hooks/useDebounceInput";

type DataProps = {
  units: UnitType[];
  total: number;
  page: number;
  totalPages: number;
};

export function LandlordUnits() {
  const navigate = useNavigate();
  const token = useUserStore((state) => state.userToken);
  const [isModalOpenType, setIsModalOpenType] = useState<
    "invite" | "details" | "lease" | null
  >(null);
  const [selectedUnit, setSelectedUnit] = useState<UnitType | null>(null);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounceInput(search);
  const [tab, setTab] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data, isLoading } = useQuery<DataProps>({
    queryKey: ["units", page, limit, tab, debouncedSearch],
    queryFn: fetchData(
      `http://localhost:8080/api/unit?page=${page}&limit=${limit}${
        tab !== "all" ? `&status=${tab}` : ""
      }${debouncedSearch ? `&search=${debouncedSearch}` : ""}`,
      token
    ),
    enabled: !!token,
  });

  const handleOpenModal = (
    unit: UnitType,
    type: "invite" | "details" | "lease"
  ) => {
    setIsModalOpenType(type);
    setSelectedUnit(unit);
  };

  const renderUnits = (emptyMessage: string) => {
    if (isLoading) {
      return [...Array(3)].map((_, index) => (
        <LandlordUnitCardSkeleton key={index} />
      ));
    }

    if (!data || data?.units.length === 0) {
      return <LandlordNoUnitsFound label={emptyMessage} />;
    }

    return data?.units.map((item) => (
      <LandlordUnitCard
        key={item._id}
        item={item}
        handleOpenModal={handleOpenModal}
      />
    ));
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

      <Tabs defaultValue="all" onValueChange={setTab}>
        <div className="flex items-start justify-between">
          <TabsList className="grid grid-cols-3 w-[400px] mb-6">
            <TabsTrigger value="all">All Units</TabsTrigger>
            <TabsTrigger value="Available">Available</TabsTrigger>
            <TabsTrigger value="Occupied">Occupied</TabsTrigger>
          </TabsList>

          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search units..."
              className="pl-9 bg-white"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-black">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderUnits(
              "You haven't added any units yet. Start by adding your first property to manage leases and tenants."
            )}
          </div>
        </TabsContent>

        <TabsContent value="Available">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderUnits(
              "No available units at the moment. All units are currently occupied."
            )}
          </div>
        </TabsContent>

        <TabsContent value="Occupied">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderUnits(
              "No occupied units right now. All units are currently available."
            )}
          </div>
        </TabsContent>
      </Tabs>

      {data && data.units.length > 0 && (
        <div className="flex justify-between mt-8">
          <Pagination
            limit={limit}
            page={page}
            total={data?.total}
            totalPages={data?.totalPages}
            setPage={setPage}
          />
        </div>
      )}

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
