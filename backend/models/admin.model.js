import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "employee", "employeeL2", "super_admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const adminModel = mongoose.model("admin", adminSchema);

export default adminModel;
