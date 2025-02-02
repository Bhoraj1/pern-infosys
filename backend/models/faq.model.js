import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "FAQ title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
    },
    answer: {
      type: String,
      required: [true, "FAQ description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters long"],
    },
  },
  {
    timestamps: true,
  }
);

const FAQModel = mongoose.model("FAQ", faqSchema);

export default FAQModel;
