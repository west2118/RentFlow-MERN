import mongoose from "mongoose";

const DocumentSchema = mongoose.Schema(
  {
    landlordUid: { type: String, required: true },
    tenantUid: { type: String, required: true },
    tenantFullName: { type: String, required: true },
    category: { type: String, required: true },
    unitNumber: { type: String, required: true },
    documents: [
      {
        name: { type: String, required: true },
        file: { type: String, required: true },
        size: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Document = mongoose.model("Document", DocumentSchema);

export default Document;
