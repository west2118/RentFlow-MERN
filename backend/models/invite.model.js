import mongoose from "mongoose";

const InviteSchema = mongoose.Schema({
  landlordUid: { type: String, required: true },
  tenantName: { type: String, required: true },
  unitId: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  used: { type: Boolean, default: false },
  gmail: { type: String },
});

const Invite = mongoose.model("Invite", InviteSchema);

export default Invite;
