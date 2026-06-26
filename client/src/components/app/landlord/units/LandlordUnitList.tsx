import LandlordUnitCardSkeleton from "@/components/app/landlord/units/LandlordUnitCardSkeleton";
import LandlordNoUnitsFound from "@/components/app/landlord/units/LandlordNoUnitsFound";
import LandlordUnitCard from "@/components/app/landlord/LandlordUnitCard";
import type { UnitType } from "@/types/unitTypes";

type LandlordUnitListProps = {
  isLoading: boolean;
  units: UnitType[] | undefined;
  emptyMessage: string;
  handleOpenModal: (unit: UnitType, type: "invite" | "details" | "lease") => void;
};

export function LandlordUnitList({
  isLoading,
  units,
  emptyMessage,
  handleOpenModal,
}: LandlordUnitListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <LandlordUnitCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!units || units.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <LandlordNoUnitsFound label={emptyMessage} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {units.map((item) => (
        <LandlordUnitCard
          key={item._id}
          item={item}
          handleOpenModal={handleOpenModal}
        />
      ))}
    </div>
  );
}
