import mongoose from "mongoose";

const UnitSchema = mongoose.Schema({
  name: { type: String, required: true },
  unitNumber: { type: String, required: true },
  floor: { type: Number, required: true },
  type: { type: String, required: true },
  bedrooms: {
    type: Number,
  },
  bathrooms: {
    type: Number,
  },
  size: { type: Number, required: true },
  address: { type: String, required: true },
  rentAmount: { type: Number, required: true },
  photos: { type: String, required: true },
  amenities: { type: [String], required: true },
  status: {
    type: String,
    enum: ["Available", "Occupied", "Under Maintenance"],
    required: true,
    default: "available",
  },
  notes: { type: String, required: true },
  landlordUid: { type: String, required: true },
  tenantUid: { type: String, default: null },
  leaseStart: { type: String },
  leaseEnd: { type: String },
});

const Unit = mongoose.model("Unit", UnitSchema);

export default Unit;
