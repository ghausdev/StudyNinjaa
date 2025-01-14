// Navbar.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAVIGATION } from '../../constants/navigation';
import logo from '../../assets/logo.jpg';

const Navbar = ({ userRole = 'PUBLIC' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navigation = NAVIGATION[userRole] || NAVIGATION.PUBLIC;
  
  // Check if the current path matches the nav item path
  const isCurrentPath = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
                <img 
                  src={logo} 
                  alt="StudyNINJAA Logo" 
                  className="h-56 w-56"
                />
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`
                    inline-flex items-center px-1 pt-1 text-sm font-medium
                    ${isCurrentPath(item.path)
                      ? 'border-b-2 border-red-500 text-gray-900'
                      : 'text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700'}
                  `}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger Icon */}
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close Icon */}
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          {navigation.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`
                block pl-3 pr-4 py-2 text-base font-medium
                ${isCurrentPath(item.path)
                  ? 'bg-red-50 border-l-4 border-red-500 text-red-700'
                  : 'text-gray-500 hover:bg-gray-50 hover:border-l-4 hover:border-gray-300 hover:text-gray-700'}
              `}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;