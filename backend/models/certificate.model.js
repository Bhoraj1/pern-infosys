import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    certificateNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    issueDate: {
      type: Date,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    courseTime: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;
