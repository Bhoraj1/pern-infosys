import admissionModel from "../models/admission.model.js";
import studentModel from "../models/studentAdmission.js";

const standardizeStudentFields = (student) => ({
  _id: student._id,
  name: student.name,
  phoneNumber: student.contactNumber,
  email: student.email,
  courseDuration: student.courseDuration,
  paymentMethod: student.billing?.paymentMethod,
  amountPaid: student.billing?.amountPaid,
  courseName: student.courseType,
  totalAmount: student.totalAmount,
  model: "student",
});

const standardizeAdmissionFields = (admissionStudent) => ({
  _id: admissionStudent._id,
  name: admissionStudent.name,
  phoneNumber: admissionStudent.number,
  email: admissionStudent.email,
  courseDuration: admissionStudent.courseDuration,
  paymentMethod: admissionStudent.paymentMethod,
  amountPaid: admissionStudent.amountPaid,
  courseName: admissionStudent.courseName,
  totalAmount: admissionStudent.totalAmount,
  model: "admission",
});

export const searchStudent = async (req, res, next) => {
  // console.log(req.params.key);
  try {
    const [students, admissionStudents] = await Promise.all([
      studentModel.find({
        $or: [{ contactNumber: { $regex: req.params.key, $options: "i" } }],
      }),
      admissionModel.find({
        $or: [{ number: { $regex: req.params.key, $options: "i" } }],
      }),
    ]);
    if (students.length === 0 && admissionStudents.length === 0) {
      return res
        .status(404)
        .json({ message: "No students found matching the search criteria." });
    }
    // Standardize both results
    const formattedStudents = students.map(standardizeStudentFields);
    const formattedAdmissionStudents = admissionStudents.map(
      standardizeAdmissionFields
    );

    // Combine both results into one array
    const combinedResults = [
      ...formattedStudents,
      ...formattedAdmissionStudents,
    ];
    return res.status(200).json(combinedResults);
  } catch (error) {
    next(error);
  }
};

export const updateBill = async (req, res, next) => {
  const { id } = req.params;
  // console.log(id);
  const updateData = req.body;

  try {
    let updatedRecord = await studentModel.findByIdAndUpdate(
      id,
      {
        $set: {
          "billing.paymentMethod": updateData.paymentMethod,
          "billing.amountPaid": updateData.amountPaid,
          "billing.studentName": updateData.studentName,
          "billing.studentNumber": updateData.studentNumber,
          name: updateData.name,
          contactNumber: updateData.phoneNumber,
          email: updateData.email,
          courseDuration: updateData.courseDuration,
          courseType: updateData.courseName,
        },
      },
      { new: true }
    );
    if (updatedRecord) {
      return res.status(200).json({
        message: "Bill updated successfully in student model",
        updatedRecord,
      });
    }

    updatedRecord = await admissionModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );
    if (updatedRecord) {
      return res.status(200).json({
        message: "Bill updated successfully in admission model",
        updatedRecord,
      });
    }

    return res.status(404).json({ message: "Record not found in any model" });
  } catch (error) {
    next(error);
  }
};
