import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: null },
    notifications: { type: Boolean, default: null },
    verification: {
      idFront: { type: String, default: null },
      idBack: { type: String, default: null },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
