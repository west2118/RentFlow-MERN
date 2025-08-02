import mongoose from "mongoose";

const LeaseSchema = mongoose.Schema(
  {
    unitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
      required: true,
    },
    landlordUid: { type: String, required: true },
    tenantUid: { type: String, default: null },
    leaseStart: { type: Date, required: true },
    leaseEnd: { type: Date, required: true },
    rentAmount: { type: Number, required: true },
    securityDeposit: { type: Number, required: true },
    paymentSchedule: {
      type: String,
      enum: ["Monthly", "Quarterly"],
      required: true,
      default: "Monthly",
    },
    notes: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    lateFee: {
      amount: { type: Number },
      afterDays: { type: Number },
    },
    documents: [
      {
        name: { type: String, required: true },
        file: { type: String, required: true },
        size: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Lease = mongoose.model("Lease", LeaseSchema);

export default Lease;
