import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String },
    role: { type: String },
    notifications: { type: Boolean },

    accountType: { type: String },
    numberOfProperties: { type: Number },

    unitId: { type: mongoose.Schema.Types.ObjectId, ref: "Unit" },
    moveInDate: { type: String },
    emergencyContact: { type: String },

    verification: {
      idFront: { type: String },
      idBack: { type: String },
      proofOfAddres: { type: String },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
