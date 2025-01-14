// MainLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Navbar userRole="PUBLIC" />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Nested routes rendered here */}
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;