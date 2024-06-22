import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isSocialLogin: { type: Boolean, default: false },
    username: { type: String, unique: false },
    fullName: { type: String },
    description: { type: String },
    profileImage: { type: String },
    isProfileInfoSet: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
