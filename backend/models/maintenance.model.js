import mongoose from "mongoose";

const MaintenanceSchema = mongoose.Schema(
  {
    issueType: { type: String, required: true },
    requestName: { type: String, required: true },
    urgencyLevel: { type: String, required: true },
    description: { type: String, required: true },
    photo: { type: String, required: true },
    unitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
      required: true,
    },
    tenantUid: { type: String, required: true },
    landlordUid: { type: String, required: true },
    tenantName: { type: String, required: true },
    unitNumber: { type: String, required: true },
    status: { type: String, default: "Pending" },
    techNotes: { type: String },
  },
  { timestamps: true }
);

const Maintenance = mongoose.model("Maintenance", MaintenanceSchema);

export default Maintenance;
