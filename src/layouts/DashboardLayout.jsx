import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import { useAuth } from "../contexts/AuthContext"; // Import useAuth to check user role
import Dashboard from "../pages/student/Dashboard";
import EssayList from "../pages/student/EssayList";

const DashboardLayout = ({ role, userType = "student-tutor" }) => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [currentRole, setCurrentRole] = useState(role);
  const navigate = useNavigate();
  const {
    user,
    isAuthenticated,
    isStudent,
    isTutor,
    isAdmin,
    logout,
    profiles,
    checkAndUpdateProfiles,
  } = useAuth(); // Use useAuth to get user info
  const [isBothStudentAndTutor, setIsBothStudentAndTutor] = useState(false);

  const isStudentTutor = userType === "student-tutor";
  const userRole =
    currentRole === "tutor"
      ? "TUTOR"
      : currentRole === "admin"
      ? "ADMIN"
      : "STUDENT";

  // Update the handleRoleSwitch function
  const handleRoleSwitch = async (newRole) => {
    console.log("Switching to role:", newRole);

    // Store current role in localStorage to persist it
    localStorage.setItem("currentRole", newRole);
    setCurrentRole(newRole);

    if (newRole === "student" && profiles.student) {
      navigate("/student/dashboard", { replace: true });
    } else if (newRole === "tutor" && profiles.tutor) {
      navigate("/tutor/dashboard", { replace: true });
    }
  };

  // Add useEffect to initialize currentRole from localStorage
  useEffect(() => {
    console.log("🎭 DashboardLayout - Checking roles:", {
      savedRole: localStorage.getItem("currentRole"),
      userRole: user?.role,
      profiles,
      currentRole,
    });

    const savedRole = localStorage.getItem("currentRole");
    if (
      savedRole &&
      ((savedRole === "student" && profiles.student) ||
        (savedRole === "tutor" && profiles.tutor))
    ) {
      console.log("✅ Setting saved role:", savedRole);
      setCurrentRole(savedRole);
    } else if (user && user.role) {
      console.log("✅ Setting default role:", user.role);
      localStorage.setItem("currentRole", user.role);
      setCurrentRole(user.role);
    }
  }, [profiles, user]);

  // Update the authentication check useEffect
  useEffect(() => {
    console.log("🔒 DashboardLayout - Auth check:", {
      isAuthenticated,
      currentRole,
      hasStudentProfile: profiles.student,
      hasTutorProfile: profiles.tutor,
      isAdmin,
      user,
    });

    if (!isAuthenticated) {
      console.log("❌ Not authenticated, redirecting to login");
      navigate("/login");
    } else if (currentRole === "student" && !isStudent) {
      console.log("❌ No student access, redirecting to home");
      navigate("/");
    } else if (currentRole === "tutor" && !isTutor) {
      console.log("❌ No tutor access, redirecting to home");
      navigate("/");
    } else if (currentRole === "admin" && !isAdmin) {
      console.log("❌ Not admin, redirecting to home");
      navigate("/");
    }
  }, [isAuthenticated, isStudent, isTutor, isAdmin, navigate, currentRole]);

  // Handle logout
  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate("/login");
  };

  // Update the handleTutorButtonClick function
  const handleTutorButtonClick = async () => {
    try {
      const profileData = await checkAndUpdateProfiles();
      console.log("Profile data:", profileData);

      if (!profileData.tutor) {
        console.log("Redirecting to tutor onboarding");
        navigate("/tutor-onboarding");
      } else {
        console.log("Switching to tutor role");
        handleRoleSwitch("tutor");
      }
    } catch (error) {
      console.error("Error checking profiles:", error);
    }
  };

  useEffect(() => {
    const checkProfiles = async () => {
      try {
        const profileData = await checkAndUpdateProfiles();
        setIsBothStudentAndTutor(profileData.student && profileData.tutor);
      } catch (error) {
        console.error("Error checking profiles:", error);
      }
    };

    if (isAuthenticated) {
      checkProfiles();
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar
        userRole={userRole}
        isMobileOpen={showMobileSidebar}
        onClose={() => setShowMobileSidebar(false)}
      />

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            {/* Left side content */}
            <div>
              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileSidebar(true)}
                className="lg:hidden inline-flex items-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <span className="sr-only">Open menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>

            {/* Right side content */}
            <div className="flex items-center gap-4">
              {/* Role Switch Buttons (for student-tutor users) */}
              {isStudentTutor && (
                <div className="flex items-center bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => handleRoleSwitch("student")}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                      currentRole === "student"
                        ? "bg-white shadow-sm text-red-600 font-medium"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      Student
                    </div>
                  </button>
                  <button
                    onClick={handleTutorButtonClick}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                      currentRole === "tutor"
                        ? "bg-white shadow-sm text-red-600 font-medium"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15"
                        />
                      </svg>
                      {profiles.tutor ? "Tutor" : "Become a Tutor"}
                    </div>
                  </button>
                </div>
              )}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="">
          <div className="">
            <div className="min-h-[80vh]">
              <Outlet /> {/* Nested routes will be rendered here */}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4 text-center text-sm text-gray-500">
              © {new Date().getFullYear()} StudyNINJAA. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
