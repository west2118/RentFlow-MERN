export type LeaseType = {
  _id: string;
  unitId: string; // or mongoose.Types.ObjectId if you're using Mongoose
  landlordUid: string;
  leaseStart: string; // or Date
  leaseEnd: string; // or Date
  rentAmount: number;
  securityDeposit: number;
  paymentSchedule: "Monthly" | "Quarterly"; // assuming enum
  notes?: string;
  isActive: boolean;
  createdAt: string; // or Date
  updatedAt: string; // or Date
  __v: number;
  tenantUid: string;
};
