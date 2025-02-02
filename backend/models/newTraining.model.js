import mongoose from "mongoose";

const TrainingSchema = new mongoose.Schema({
  title: String,
  description: String,
  courseDuration: String,
  timeSlot: String,
  totalAmount: Number,
  level: String,
  instructorName: String,
  instructorBio: String,
  image: String,
  syllabus: [String],
});

const TrainingModel = mongoose.model("Training", TrainingSchema);

export default TrainingModel;
