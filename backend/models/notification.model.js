import mongoose from "mongoose";

const NotificationSchema = mongoose.Schema(
  {
    landlordUid: { type: String, required: true },
    tenantUid: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    type: { type: String, enum: ["Info", "Warning", "Urgent"], required: true },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;
