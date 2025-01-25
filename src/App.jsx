import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

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
import EssayDetails from './components/essays/EssayDetails.jsx';
import TutorList from './pages/student/TutorList';
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

function App() {
    const { isAuthenticated, isStudent, isTutor, isAdmin } = useAuth();

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
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/tutoronboarding" element={<TutorOnboarding />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                     <Route path="/verify-email" element={<VerifyEmail />} />
                      <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
                </Route>

                {/* Student Routes */}
               <Route element = {<DashboardLayout role = "student" />} >
                   <Route
                        path="/student/dashboard"
                        element={
                            isAuthenticated && isStudent
                                ? <StudentDashboard />
                                : <Navigate to="/login" replace />
                        }
                    />
                    <Route
                        path="/student/essay-upload"
                        element={
                            isAuthenticated && isStudent
                                ? <EssayUpload />
                                : <Navigate to="/login" replace />
                        }
                    />
                    <Route
                        path="/student/essays"
                        element={
                            isAuthenticated && isStudent
                                ? <EssayList />
                                : <Navigate to="/login" replace />
                        }
                    />
                    <Route
                        path="/student/interviews"
                        element={
                            isAuthenticated && isStudent
                                ? <InterviewScheduler />
                                : <Navigate to="/login" replace />
                        }
                    />
                    <Route
                        path="/student/profile"
                        element={
                            isAuthenticated && isStudent
                                ? <StudentProfile />
                                : <Navigate to="/login" replace />
                        }
                    />
                    <Route
                        path="/student/essay/:essayId"
                        element={
                            isAuthenticated && isStudent
                                ? <EssayDetails />
                                : <Navigate to="/login" replace />
                        }
                    />
                    <Route
                        path="/student/tutor-list"
                        element={
                            isAuthenticated && isStudent
                                ? <TutorList />
                                : <Navigate to="/login" replace />
                        }
                    />
               </Route>


                {/* Tutor Routes */}
                  <Route element = {<DashboardLayout role = "tutor" />} >
                    <Route
                        path="/tutor/dashboard"
                        element={
                            isAuthenticated && isTutor
                                ? <TutorDashboard />
                                : <Navigate to="/login" replace />
                        }
                    />
                   <Route
                        path="/tutor/essay-pool"
                        element={
                            isAuthenticated && isTutor
                                ? <EssayPool />
                                : <Navigate to="/login" replace />
                        }
                    />
                    <Route
                        path="/tutor/chat/:essayId"
                        element={
                            isAuthenticated && isTutor
                                ? <TutorChat />
                                : <Navigate to="/login" replace />
                        }
                    />
                    <Route
                        path="/tutor/essay-feedback"
                        element={
                            isAuthenticated && isTutor
                                ? <EssayFeedback />
                                : <Navigate to="/login" replace />
                        }
                    />
                    <Route
                        path="/tutor/interviews"
                        element={
                             isAuthenticated && isTutor
                                ? <InterviewManagement />
                                : <Navigate to="/login" replace />
                         }
                    />
                    <Route
                        path="/tutor/profile"
                         element={
                            isAuthenticated && isTutor
                                ? <TutorProfile />
                                : <Navigate to="/login" replace />
                          }
                    />
              </Route>


                {/* Admin Routes */}
                <Route element = {<DashboardLayout role = "admin" />} >
                   <Route
                        path="/admin/dashboard"
                        element={
                            isAuthenticated && isAdmin
                                ? <AdminDashboard />
                                : <Navigate to="/login" replace />
                        }
                    />
                    <Route
                        path="/admin/users"
                        element={
                            isAuthenticated && isAdmin
                                ? <UserManagement />
                                : <Navigate to="/login" replace />
                        }
                    />
                    <Route
                        path="/admin/transactions"
                        element={
                            isAuthenticated && isAdmin
                                ? <TransactionManagement />
                                : <Navigate to="/login" replace />
                        }
                    />
                    <Route
                        path="/admin/content"
                         element={
                            isAuthenticated && isAdmin
                                ? <ContentManagement />
                                : <Navigate to="/login" replace />
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