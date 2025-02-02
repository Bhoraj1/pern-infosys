import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage.jsx";
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
import UpdateTraining from "./pages/Admin/training/UpdateTraining.jsx";
import UpdateStudent from "./pages/Admin/students/UpdateStudent.jsx";
import UpdateService from "./pages/Admin/service/UpdateService.jsx";
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
            <Route path="/course/:id" element={<CourseDetailPage />} />
            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path="/AllServices" element={<AllServices />} />

            <Route path="/register/:id" element={<RegistrationPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/verify-certificate" element={<VerifyCertificate />} />
            <Route path="/blog" element={<Blog />} />

            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/update-training/:id" element={<UpdateTraining />} />
              <Route
                path="/update-student/:studentId"
                element={<UpdateStudent />}
              />

              <Route path="/update-faq/:faqId" element={<FAQForm />} />
              <Route path="/update-teamMember/:teamId" element={<TeamForm />} />
              <Route path="/update-review/:reviewId" element={<ReviewForm />} />
              <Route path="/update-blog/:blogId" element={<BlogForm />} />

              <Route path="/update-service/:id" element={<UpdateService />} />
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
