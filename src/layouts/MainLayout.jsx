// MainLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navigation */}
      <header className="relative z-50">
        <Navbar userRole="PUBLIC" />
      </header>

      {/* Main Content */}
      <main className="flex-grow relative z-0 -mt-8">
        {/* Nested routes rendered here */}
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
