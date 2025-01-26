// src/components/Step2/DBSApplication.jsx

import React from 'react';

const DBSApplication = ({ applicationDetails, handleChange }) => {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-700">
          We have partnered with uCheck, a company specializing in Enhanced DBS Checks,
          to ensure tutors can start working with students under 18. uCheck offers fast and
          reliable DBS check services. Once submitted, uCheck will guide you through the process.
        </p>
      </div>

      <div className="space-y-4">
        <input
          type="email"
          name="dbsCheck.applicationDetails.email"
          placeholder="Email Address"
          value={applicationDetails.email}
          onChange={handleChange}
          className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
        />
        <input
          type="text"
          name="dbsCheck.applicationDetails.fullName"
          placeholder="Full Name"
          value={applicationDetails.fullName}
          onChange={handleChange}
          className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
        />
        <input
          type="tel"
          name="dbsCheck.applicationDetails.phoneNumber"
          placeholder="Phone Number"
          value={applicationDetails.phoneNumber}
          onChange={handleChange}
          className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
        />

        <label className="flex items-start space-x-2">
          <input
            type="checkbox"
            name="dbsCheck.applicationDetails.agreementAccepted"
            checked={applicationDetails.agreementAccepted}
            onChange={handleChange}
            className="mt-1 rounded border-gray-300 text-red-600 focus:ring-red-500"
          />
          <span className="text-sm text-gray-600">
            By submitting this form, you agree that we will share your
            information with uCheck to process your Enhanced DBS Check application.
          </span>
        </label>
      </div>
    </div>
  );
};

export default DBSApplication;
