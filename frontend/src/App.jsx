import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import IntroSection from "./components/IntroSection.jsx";
import Blog from "./components/Blog.jsx";
import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminSignup from "./pages/Admin/AdminSignup.jsx";
import CourseTemplate from "./pages/CourseTemplate.jsx";
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
import AddTrainingForm from "./pages/Admin/training/AddTrainingForm";
import BlogDetails from "./pages/BlogDetails.jsx";
import AdmissionForm from "./pages/Admin/students/AdmissionForm.jsx";
import ContactUs from "./components/ContactUs.jsx"


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
            <Route path="/AllServices" element={<AllServices />} />
            <Route path="/contactUs" element={<ContactUs />} />
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
                element={<AdmissionForm />}
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
