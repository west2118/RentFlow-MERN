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
  landlordUid: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, required: true, default: "Pending" },
  unitNumber: { type: String },
  tenantUid: { type: String },
  datePaid: { type: String },
  method: { type: String },
});

const Payment = mongoose.model("Payment", PaymentSchema);

export default Payment;
