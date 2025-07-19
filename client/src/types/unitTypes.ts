export type UnitType = {
  _id?: string; // optional if not yet saved
  name: string;
  unitNumber: string;
  floor: number;
  type: string;
  bedrooms?: number;
  bathrooms?: number;
  size: number;
  address: string;
  rentAmount: number;
  photos: string;
  amenities: string[];
  status: "Available" | "Occupied" | "Under Maintenance";
  notes: string;
  landlordUid: string;
  tenantUid?: string | null;
  leaseStart?: string;
  leaseEnd?: string;
  createdAt?: string;
  updatedAt?: string;
};
