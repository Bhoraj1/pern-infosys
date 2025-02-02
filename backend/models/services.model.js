import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imagePath:{
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const ServiceModel = mongoose.model("Service", serviceSchema);
export default ServiceModel;
