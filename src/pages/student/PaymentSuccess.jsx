import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import StudentService from "../../services/studentService";

const PaymentSuccess = () => {
 
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
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Your essay has been submitted successfully.
          </p>
          <button
            onClick={() => navigate("/student/essays")}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
          >
            View My Essays
          </button>
        </div>
      
    </div>
  );
};

export default PaymentSuccess;
