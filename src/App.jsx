import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Common Pages
import Home from './pages/common/Home';
import About from './pages/common/About';
import Contact from './pages/common/Contact';

import FAQ from './pages/common/FAQ';
import Terms from './pages/common/Terms';
import Privacy from './pages/common/Privacy';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import TutorOnboarding from './pages/auth/TutorOnboarding';
import VerifyEmail from './pages/auth/VerifyEmail';
import ResetPassword from './pages/auth/ResetPassword';


// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import EssayUpload from './pages/student/EssayUpload';
import EssayList from './pages/student/EssayList';
import InterviewScheduler from './pages/student/InterviewScheduler';
import StudentProfile from './pages/student/Profile';

// Tutor Pages
import TutorDashboard from './pages/tutor/Dashboard';
import EssayFeedback from './pages/tutor/EssayFeedback';
import InterviewManagement from './pages/tutor/InterviewManagement';
import TutorProfile from './pages/tutor/Profile';
import EssayPool from './pages/tutor/EssayPool';
import TutorChat from './pages/tutor/TutorChat.jsx';


// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import TransactionManagement from './pages/admin/TransactionManagement';
import ContentManagement from './pages/admin/ContentManagement';


// Mock authentication state (replace with actual auth later)
const isAuthenticated = true;
const userRole = 'tutor'; // 'student', 'tutor', 'admin'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Route>

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login role={userRole} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tutoronboarding" element={<TutorOnboarding />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/reset-password/:resetToken" element={<ResetPassword />} />

        </Route>

        {/* Student Routes */}
        <Route element={<DashboardLayout role={userRole} />}>
          <Route
            path="/student/dashboard"
            element={
              isAuthenticated && userRole === 'student'
                ? <StudentDashboard />
                : <Navigate to="/login" />
            }
          />
          <Route
            path="/student/essay-upload"
            element={
              isAuthenticated && userRole === 'student'
                ? <EssayUpload />
                : <Navigate to="/login" />
            }
          />
          <Route
            path="/student/essays"
            element={
              isAuthenticated && userRole === 'student'
                ? <EssayList />
                : <Navigate to="/login" />
            }
          />
          <Route
            path="/student/interviews"
            element={
              isAuthenticated && userRole === 'student'
                ? <InterviewScheduler />
                : <Navigate to="/login" />
            }
          />
          <Route
            path="/student/profile"
            element={
              isAuthenticated && userRole === 'student'
                ? <StudentProfile />
                : <Navigate to="/login" />
            }
          />
        </Route>


        <Route element={<DashboardLayout role={userRole} />}>
          <Route
            path="/tutor/dashboard"
            element={
              isAuthenticated && userRole === 'tutor'
                ? <TutorDashboard />
                : <Navigate to="/login" />


            }
          />
          <Route
            path="/tutor/essay-pool"
            element={
              isAuthenticated && userRole === 'tutor'
                ? <EssayPool />
                : <Navigate to="/login" />


            }
          />
          <Route
            path="/tutor/chat/:essayId"
            element={
              isAuthenticated && userRole === 'tutor'
                ? <TutorChat />
                : <Navigate to="/login" />
            }
          />
          <Route
            path="/tutor/essay-feedback"
            element={
              isAuthenticated && userRole === 'tutor'
                ? <EssayFeedback />
                : <Navigate to="/login" />


            }
          />
          <Route
            path="/tutor/interviews"
            element={
              isAuthenticated && userRole === 'tutor'
                ? <InterviewManagement />
                : <Navigate to="/login" />


            }
          />
          <Route
            path="/tutor/profile"
            element={
              isAuthenticated && userRole === 'tutor'
                ? <TutorProfile />
                : <Navigate to="/login" />


            }
          />
        </Route>



        <Route element={<DashboardLayout role={userRole} />}>
          <Route
            path="/admin/dashboard"
            element={
              isAuthenticated && userRole === 'admin'
                ? <AdminDashboard />
                : <Navigate to="/login" />
            }
          />



          <Route
            path="/admin/users"
            element={
              isAuthenticated && userRole === 'admin'
                ? <UserManagement />
                : <Navigate to="/login" />
            }
          />
          <Route
            path="/admin/transactions"
            element={
              isAuthenticated && userRole === 'admin'
                ? <TransactionManagement />
                : <Navigate to="/login" />
            }
          />
          <Route
            path="/admin/content"
            element={
              isAuthenticated && userRole === 'admin'
                ? <ContentManagement />
                : <Navigate to="/login" />
            }
          />
        </Route>



        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;