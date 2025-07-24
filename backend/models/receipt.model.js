import mongoose from "mongoose";

const ReceiptSchema = mongoose.Schema(
  {
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    tenantUid: { type: String, required: true },
    landlordUid: { type: String, required: true },
    leaseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lease",
      required: true,
    },
    amountPaid: { type: Number, required: true },
    accountNumber: { type: String, required: true },
    fileUrl: { type: String, required: true },
    transactionDate: { type: Date, required: true },
    status: { type: String, default: "Pending" },
    notes: { type: Date },
  },
  { timestamps: true }
);

const Receipt = mongoose.model("Receipt", ReceiptSchema);

export default Receipt;
