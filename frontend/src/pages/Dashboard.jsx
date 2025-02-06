import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DashInquiryUsers from "../components/DashInquiryUsers";
import DashSidebar from "./DashSidebar";
import DashProfile from "../components/DashProfile";
import Admissions from "../components/Admissions";
import AdmissionForm from "./Admin/students/AdmissionForm";
import StudentManagementDashboard from "./Admin/students/StudentManagementDashboard";
import CertificateForm from "./Admin/CertificateForm";
import BillForm from "./Admin/BillForm";
import CreateBill from "./CreateBill";
import AdmissionBill from "./Admin/students/AdmissionBill";
import ServicesDash from "./Admin/service/ServiceDash";
import ServicesForm from "./Admin/service/ServicesForm";
import AddTrainingForm from "./Admin/training/AddTrainingForm";
import FAQForm from "./Admin/FAQ/FAQ_Form";
import FAQ_Dash from "./Admin/FAQ/FAQ_Dash";
import TeamForm from "./Admin/Team/TeamForm";
import TeamDash from "./Admin/Team/TeamDash";
import ReviewForm from "./Admin/revieww/ReviewForm";
import BlogForm from "./Admin/blog/BlogForm";
import BlogDash from "./Admin/blog/BlogDash";
import ReviewDash from "./Admin/revieww/ReviewDash";
import TrainingDash from "./Admin/training/TrainingDash";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="flex flex-col mt-14 md:flex-row min-h-screen">
      <div className="md:w-[20%] ">
        <DashSidebar />
      </div>
      <div className="w-full sm:w-[80%] sm:mx-auto">
        {tab === "" && (
          <div className="flex flex-col justify-center items-center w-full h-full bg-white ">
            <DashProfile />
          </div>
        )}

        {tab === "inquiry-user" && <DashInquiryUsers />}
        {tab === "admissions" && <Admissions />}
        {tab === "certificate-form" && <CertificateForm />}
        {tab === "admission-form" && <AdmissionForm />}
        {tab === "admission-bill" && <AdmissionBill />}
        {tab === "student-dahsboard" && <StudentManagementDashboard />}
        {tab === "create-billing" && <BillForm />}
        {tab === "bill" && <CreateBill />}
        {tab === "add-training" && <AddTrainingForm />}
        {tab === "all-training" && <TrainingDash />}
        {tab === "service-form" && <ServicesForm />}
        {tab === "services" && <ServicesDash />}

        {tab === "add-faq" && <FAQForm />}
        {tab === "faq-dash" && <FAQ_Dash />}

        {tab === "add-team" && <TeamForm />}
        {tab === "team-dash" && <TeamDash />}
        {tab === "add-review" && <ReviewForm />}
        {tab === "review-dash" && <ReviewDash />}
        {tab === "blog-form" && <BlogForm />}
        {tab === "blog-dash" && <BlogDash />}
      </div>
    </div>
  );
}
