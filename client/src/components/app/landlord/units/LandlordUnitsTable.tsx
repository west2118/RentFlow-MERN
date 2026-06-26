import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, X } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import type { UnitType } from "@/types/unitTypes";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/constants/fetchData";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LandlordUnitList } from "@/components/app/landlord/units/LandlordUnitList";
import { LandlordUnitModals } from "@/components/app/landlord/units/LandlordUnitModals";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/app/Pagination";
import { useDebounceInput } from "@/hooks/useDebounceInput";

type DataProps = {
  units: UnitType[];
  total: number;
  page: number;
  totalPages: number;
};

const TABS_CONFIG = [
  {
    value: "all",
    label: "All Units",
    emptyMessage:
      "You haven't added any units yet. Start by adding your first property to manage leases and tenants.",
  },
  {
    value: "available",
    label: "Available",
    emptyMessage:
      "No available units at the moment. All units are currently occupied.",
  },
  {
    value: "occupied",
    label: "Occupied",
    emptyMessage:
      "No occupied units right now. All units are currently available.",
  },
];

export function LandlordUnitsTable() {
  const [isModalOpenType, setIsModalOpenType] = useState<
    "invite" | "details" | "lease" | null
  >(null);
  const [selectedUnit, setSelectedUnit] = useState<UnitType | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounceInput(search);
  const tab = searchParams.get("tab") || "all";
  const [page, setPage] = useState(1);

  const setTab = (newTab: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("tab", newTab);
      return params;
    });
    setPage(1);
  };
  const limit = 6;

  const { data, isLoading } = useQuery<DataProps>({
    queryKey: ["landlord-units", page, limit, tab, debouncedSearch],
    queryFn: fetchData(
      `http://localhost:8080/api/unit?page=${page}&limit=${limit}${tab !== "all" ? `&status=${tab}` : ""
      }${debouncedSearch ? `&search=${debouncedSearch}` : ""}`
    ),
  });

  const handleOpenModal = (
    unit: UnitType,
    type: "invite" | "details" | "lease"
  ) => {
    setIsModalOpenType(type);
    setSelectedUnit(unit);
  };

  return (
    <>
      <Tabs value={tab} onValueChange={setTab}>
        <div className="flex items-start justify-between">
          <TabsList className="grid grid-cols-3 w-[400px] mb-6">
            {TABS_CONFIG.map((t) => (
              <TabsTrigger key={t.value} value={t.value}>
                {t.label}
              </TabsTrigger>
            ))}
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
      </Tabs>

      <LandlordUnitList
        isLoading={isLoading}
        units={data?.units}
        emptyMessage={
          TABS_CONFIG.find((t) => t.value === tab)?.emptyMessage || ""
        }
        handleOpenModal={handleOpenModal}
      />

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

      <LandlordUnitModals
        isModalOpenType={isModalOpenType}
        setIsModalOpenType={setIsModalOpenType}
        selectedUnit={selectedUnit}
      />
    </>
  );
}
