import mongoose from "mongoose";

const PaymentSchema = mongoose.Schema({
  leaseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lease",
    required: true,
  },
  unitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Unit",
    required: true,
  },
  landlordId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, required: true, default: "Pending" },
  lateFee: { type: Number, default: 0 },
  unitNumber: { type: String },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  datePaid: { type: String },
  method: { type: String },
});

const Payment = mongoose.model("Payment", PaymentSchema);

export default Payment;
