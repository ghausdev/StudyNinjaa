import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAVIGATION } from '../../constants/navigation';
import logo from '../../assets/logo.jpg';

const Sidebar = ({ userRole = 'STUDENT', isMobileOpen, onClose }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const navigation = NAVIGATION[userRole];
  if (!navigation) return null;

  const isActivePath = (path) => location.pathname === path;

  const iconBaseClass = 'w-6 h-6';

  const icons = {
    dashboard: (
      <svg className={iconBaseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    ),
    document: (
      <svg className={iconBaseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    upload: (
      <svg className={iconBaseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
    calendar: (
      <svg className={iconBaseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    user: (
      <svg className={iconBaseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    edit: (
      <svg className={iconBaseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    switch: (
      <svg className={iconBaseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    )
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <div
        className={`
          h-screen bg-white border-r border-gray-200 transition-all duration-300
          fixed lg:relative
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          left-0 top-0 z-40
        `}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-10 bg-white border border-gray-200 rounded-full p-1 shadow-md"
        >
          <svg
            className={`w-4 h-4 text-gray-600 transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className={`
          flex items-center justify-center h-16 border-b border-gray-200
          ${isCollapsed ? 'px-2' : 'px-6'}
        `}>
          <Link to="/" className="flex items-center">
            <img 
              src={logo} 
              alt="StudyNINJAA Logo" 
              className={`transition-all duration-300 ${isCollapsed ? 'h-8 w-8' : 'h-64 w-64'}`}
            />
          </Link>
        </div>

        <nav className="flex flex-col justify-between h-[calc(100vh-4rem)] px-4 py-6">
          <div className="space-y-2">
            {navigation.PRIMARY.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center px-3 py-2 rounded-lg transition-colors duration-200
                  ${isActivePath(item.path)
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <span className="flex-shrink-0">{icons[item.icon]}</span>
                {!isCollapsed && (
                  <span className="ml-3 text-sm font-medium">{item.name}</span>
                )}
              </Link>
            ))}
          </div>

          <div className="space-y-2 border-t border-gray-200 pt-4">
            {navigation.SECONDARY?.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center px-3 py-2 rounded-lg transition-colors duration-200
                  ${isActivePath(item.path)
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <span className="flex-shrink-0">{icons[item.icon]}</span>
                {!isCollapsed && (
                  <span className="ml-3 text-sm font-medium">{item.name}</span>
                )}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;