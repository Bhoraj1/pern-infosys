import express from "express";
import dotenv from "dotenv";
import "./config/db.connect.js";
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
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());


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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
