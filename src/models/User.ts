import ROLE from "@/common/roles";
import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "email already exists"],
      required: [true, "email is required"],
    },
    username: {
      type: String,
      unique: [true, "user already exists"],
      required: [true, "username is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    birthday: {
      type: Date,
      required: [true, "birthday is required"],
    },
    role: {
      type: String,
      enum: ROLE.ROLES,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models?.User || mongoose.model("User", UserSchema);
