import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import Userinquiry from "./routes/inquiry.route.js";
import adminLogin from "./routes/admin.route.js";
import UserAdmission from "./routes/admission.route.js";
import certificate from "./routes/certificate.route.js";
import StudentAdmission from "./routes/studentAdmission.route.js";
import searchStudent from "./routes/searchStudent.route.js";
import newTraining from "./routes/newTraining.route.js";
import newService from "./routes/services.route.js";
import faqRoute from "./routes/faq.route.js";
import teamRoute from "./routes/team.route.js";
import reviewRoute from "./routes/review.route.js";
import blogRoute from "./routes/blog.route.js";

const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB Successfully!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB!", err);
  });

app.listen(3000, () => {
  console.log(`Server running on port 3000  !`);
});

app.use("/api/admin", adminLogin);
app.use("/api/backend", Userinquiry);
app.use("/api/backend2", UserAdmission);
app.use("/api/backend3", certificate);
app.use("/api/backend4", StudentAdmission);
app.use("/api/backend5", searchStudent);
app.use("/api/backend6", newTraining);
app.use("/api/backend7", newService);
app.use("/api/backend8", faqRoute);
app.use("/api/backend9", teamRoute);
app.use("/api/backend10", reviewRoute);
app.use("/api/backend11", blogRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
