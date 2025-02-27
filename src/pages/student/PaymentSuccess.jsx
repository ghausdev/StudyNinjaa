import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import StudentService from "../../services/studentService";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    // You could use the session_id to verify the payment status if needed
    console.log("Payment session ID:", sessionId);
  }, [sessionId]);

  const handleViewBookings = () => {
    // Determine which page to navigate to based on the payment type
    // You could store the payment type in localStorage when initiating the payment
    const paymentType = localStorage.getItem("paymentType");
    if (paymentType === "tutoring") {
      navigate("/student/tutoring-sessions");
    } else {
      navigate("/student/essays");
    }
    // Clean up
    localStorage.removeItem("paymentType");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-sm">
      <div className="text-center">
        <svg
          className="h-16 w-16 text-green-500 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mb-6">Your booking has been confirmed.</p>
        <button
          onClick={handleViewBookings}
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
        >
          View My Bookings
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
