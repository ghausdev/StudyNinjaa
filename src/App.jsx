import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Common Pages
import Home from "./pages/common/Home";
import About from "./pages/common/About";
import Contact from "./pages/common/Contact";
import FAQ from "./pages/common/FAQ";
import Terms from "./pages/common/Terms";
import Privacy from "./pages/common/Privacy";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import TutorOnboarding from "./pages/auth/TutorOnboard/TutorOnboarding.jsx";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ResetPassword from "./pages/auth/ResetPassword";

// Student Pages
import StudentDashboard from "./pages/student/Dashboard";
import EssayUpload from "./pages/student/EssayUpload";
import EssayList from "./pages/student/EssayList";
import InterviewScheduler from "./pages/student/InterviewScheduler";
import StudentProfile from "./pages/student/Profile";
import EssayDetails from "./components/essays/EssayDetails.jsx";
import TutorList from "./pages/student/TutorList";
import PaymentSuccess from "./pages/student/PaymentSuccess";
import PaymentFailed from "./pages/student/PaymentFailed";
// Tutor Pages
import TutorDashboard from "./pages/tutor/Dashboard";
import EssayFeedback from "./pages/tutor/EssayFeedback";
import InterviewManagement from "./pages/tutor/InterviewManagement";
import TutorProfile from "./pages/tutor/Profile";
import EssayPool from "./pages/tutor/EssayPool";
import TutorChat from "./pages/tutor/TutorChat.jsx";
import TutoringProfile from "./pages/tutor/TutoringProfile";
import TutorChats from "./pages/tutor/TutorChats";
import TutorPaymentSuccess from "./pages/tutor/TutorPaymentSuccess";
import TutorPaymentFailed from "./pages/tutor/TutorPaymentFailed";
// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import TransactionManagement from "./pages/admin/TransactionManagement";
import ContentManagement from "./pages/admin/ContentManagement";
import StudentChats from "./pages/student/StudentChats";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Route>

          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/tutor-onboarding" element={<TutorOnboarding />} />

            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route
              path="/reset-password/:resetToken"
              element={<ResetPassword />}
            />
          </Route>

          {/* Student Routes */}
          <Route element={<DashboardLayout role="student" />}>
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/essay-upload" element={<EssayUpload />} />
            <Route path="/student/essays" element={<EssayList />} />
            <Route
              path="/student/interviews"
              element={<InterviewScheduler />}
            />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/student/essay/:essayId" element={<EssayDetails />} />
            <Route path="/student/tutor-list" element={<TutorList />} />
            <Route path="/student/chats" element={<StudentChats />} />
            <Route path="/payment-success/*" element={<PaymentSuccess />} />
            <Route path="/payment-failed/*" element={<PaymentFailed />} />
          </Route>

          {/* Tutor Routes */}
          <Route element={<DashboardLayout role="tutor" />}>
            <Route
              path="/tutor/*"
              element={
                <Routes>
                  <Route path="dashboard" element={<TutorDashboard />} />
                  <Route path="essay-pool" element={<EssayPool />} />
                  <Route path="chat/:essayId" element={<TutorChat />} />
                  <Route path="essay-feedback" element={<EssayFeedback />} />
                  <Route path="interviews" element={<InterviewManagement />} />
                  <Route path="profile" element={<TutorProfile />} />
                  <Route
                    path="tutoring-profile"
                    element={<TutoringProfile />}
                  />
                  <Route path="chats" element={<TutorChats />} />
                </Routes>
              }
            />
            <Route
              path="/tutor/payment-success"
              element={<TutorPaymentSuccess />}
            />
            <Route
              path="/tutor/payment-failed"
              element={<TutorPaymentFailed />}
            />
          </Route>

          {/* Admin Routes */}
          <Route element={<DashboardLayout role="admin" />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/tutors" element={<UserManagement />} />
            <Route
              path="/admin/transactions"
              element={<TransactionManagement />}
            />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
