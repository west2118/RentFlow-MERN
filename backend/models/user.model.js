import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String },
    notifications: { type: Boolean },

    accountType: { type: String },
    numberOfProperties: { type: Number },

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
