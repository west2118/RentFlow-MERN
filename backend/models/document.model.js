import mongoose from "mongoose";

const DocumentSchema = mongoose.Schema(
  {
    landlordId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
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
