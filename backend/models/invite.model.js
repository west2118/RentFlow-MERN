import mongoose from "mongoose";

const InviteSchema = mongoose.Schema({
  unitId: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
  token: { type: String, require: true, unique: true },
  expiresAt: { type: Date, required: true },
  used: { type: Boolean, default: false },
  email: { type: String },
});

const Invite = mongoose.model("Invite", InviteSchema);

export default Invite;
