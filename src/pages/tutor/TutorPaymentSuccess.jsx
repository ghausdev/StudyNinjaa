import React from "react";
import { useNavigate } from "react-router-dom";

const TutorPaymentSuccess = () => {
  const navigate = useNavigate();

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
          Payment Received!
        </h2>
        <p className="text-gray-600 mb-6">
          Your payment has been processed successfully.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/tutor/essays")}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
          >
            View More Essays
          </button>
          <button
            onClick={() => navigate("/tutor/dashboard")}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorPaymentSuccess;
