import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parentName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    courseDuration: {
      type: String,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    amountPaid: {
      type: Number,
      default: 0,
    },
    paymentMethod: {
      type: String,
      default: "Cash",
    },
  },
  { timestamps: true }
);

const admissionModel = mongoose.model("Admission", admissionSchema);

export default admissionModel;
