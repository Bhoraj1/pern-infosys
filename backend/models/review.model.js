import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
});

const ReviewModel = mongoose.model("Review", reviewSchema);

export default ReviewModel;
