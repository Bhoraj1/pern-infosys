import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import IntroSection from "./components/IntroSection.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import About from "./pages/About.jsx";
import VerifyCertificate from "./pages/Certificate.jsx";
import Blog from "./components/Blog.jsx";
import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminSignup from "./pages/Admin/AdminSignup.jsx";
import ServiceDetails from "./pages/ServiceDetail.jsx";
import UpdateStudent from "./pages/Admin/students/UpdateStudent.jsx";
import FAQ from "./components/FAQ.jsx";
import Facts from "./components/Facts.jsx";
import Teams from "./components/Teams.jsx";
import Services from "./components/Services.jsx";
import CoursesPage from "./components/CoursesPage.jsx";
import Review from "./components/Review.jsx";
import AllServices from "./pages/AllService.jsx";
import FAQForm from "./pages/Admin/FAQ/FAQ_Form";
import TeamForm from "./pages/Admin/Team/TeamForm.jsx";
import ReviewForm from "./pages/Admin/revieww/ReviewForm.jsx";
import BlogForm from "./pages/Admin/blog/BlogForm.jsx";
import ServicesForm from "./pages/Admin/service/ServicesForm.jsx";
import CourseTemplate from "./components/Courses/CourseTemplate.jsx";
import AddTrainingForm from "./pages/Admin/training/AddTrainingForm";
import BlogDetails from "./pages/BlogDetails.jsx";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Toaster />
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <IntroSection />
                  <CoursesPage />
                  <Services />
                  <Facts />
                  <Teams />
                  <Review />
                  <FAQ />
                </>
              }
            />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/course/:id" element={<CourseTemplate />} />
            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path="/AllServices" element={<AllServices />} />

            <Route path="/register/:id" element={<RegistrationPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/verify-certificate" element={<VerifyCertificate />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetails />} />

            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/update-training/:TrainingId"
                element={<AddTrainingForm />}
              />
              <Route
                path="/update-student/:studentId"
                element={<UpdateStudent />}
              />
              <Route path="/update-faq/:faqId" element={<FAQForm />} />
              <Route path="/update-teamMember/:teamId" element={<TeamForm />} />
              <Route path="/update-review/:reviewId" element={<ReviewForm />} />
              <Route path="/update-blog/:blogId" element={<BlogForm />} />

              <Route
                path="/update-service/:serviceId"
                element={<ServicesForm />}
              />
            </Route>
            <Route path="/admin">
              <Route path="login" element={<AdminLogin />} />
              <Route path="signup" element={<AdminSignup />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
