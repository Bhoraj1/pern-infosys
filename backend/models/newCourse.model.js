import mongoose from "mongoose";

const newCourseSchema = new mongoose.Schema({
  courseType: { type: String },
  timeSlot: { type: String },
  courseDuration: { type: String },
  totalAmount: { type: Number },
});

const newCourseModel = mongoose.model("NewCourse", newCourseSchema);

export default newCourseModel;
