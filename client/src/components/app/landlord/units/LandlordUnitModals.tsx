import { InviteTenantModal } from "@/components/app/landlord/InviteTenantModal";
import { UnitDetailsModal } from "@/components/app/UnitDetailsModal";
import { LeaseDetailsModal } from "@/components/app/LeaseDetailsModal";
import type { UnitType } from "@/types/unitTypes";

type LandlordUnitModalsProps = {
  isModalOpenType: "invite" | "details" | "lease" | null;
  setIsModalOpenType: (type: "invite" | "details" | "lease" | null) => void;
  selectedUnit: UnitType | null;
};

export function LandlordUnitModals({
  isModalOpenType,
  setIsModalOpenType,
  selectedUnit,
}: LandlordUnitModalsProps) {
  if (!selectedUnit || !isModalOpenType) return null;

  return (
    <>
      {isModalOpenType === "invite" && (
        <InviteTenantModal
          isModalOpen
          isCloseModal={() => setIsModalOpenType(null)}
          unitId={selectedUnit._id}
        />
      )}

      {isModalOpenType === "details" && (
        <UnitDetailsModal
          isModalOpen
          isCloseModal={() => setIsModalOpenType(null)}
          unit={selectedUnit}
        />
      )}

      {isModalOpenType === "lease" && (
        <LeaseDetailsModal
          isModalOpen
          isCloseModal={() => setIsModalOpenType(null)}
          lease={selectedUnit.lease ?? null}
        />
      )}
    </>
  );
}
