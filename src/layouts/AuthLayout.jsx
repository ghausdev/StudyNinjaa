// AuthLayout.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
 

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          {/* Background Design Element */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-red-50 transform rotate-45"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-red-50 transform -rotate-45"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-2">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} StudyNINJAA. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-gray-900">
              Privacy Policy
            </Link>
            <span>&middot;</span>
            <Link to="/terms" className="hover:text-gray-900">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;