import mongoose from "mongoose";

const admissionFormSchema = new mongoose.Schema(
  {
    name: { type: String },
    dob: { type: Date },
    contactNumber: { type: String },
    email: { type: String },
    address: { type: String },
    timeSlot: { type: String },
    courseType: { type: String },
    courseDuration: { type: String },
    educationBackground: { type: String },
    parentName: { type: String },
    parentNumber: { type: String },
    parentRelationship: { type: String },
    totalAmount: { type: Number },
    billing: {
      totalAmount: { type: Number },
      studentName: { type: String },
      studentNumber: { type: String },
      paymentMethod: { type: String },
      amountPaid: { type: Number },
      billingDate: { type: Date },
      remainingAmount: { type: Number },
     
     
    },
  },

  { timestamps: true }
);

const studentModel = mongoose.model("AdmissionForm", admissionFormSchema);

export default studentModel;
