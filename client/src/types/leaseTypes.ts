export type LeaseType = {
  _id: string;
  unitId: string; // or mongoose.Types.ObjectId if you're using Mongoose
  landlordId: string;
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
  tenantId: string;
  lateFee: {
    amount: number;
    afterDays: number;
  };
  status?: string;
};
