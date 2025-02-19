// src/components/Step2/DBSCheckSection.jsx

import React from "react";
import DBSApplication from "./DBSApplication";

const DBSCheckSection = ({
  dbsCheck,
  renderDBSApplication,
  handleChange,
  errors,
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Enhanced DBS Check
      </h3>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Important Notice
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                An Enhanced DBS Check is mandatory for all tutors on our
                platform. Without a valid DBS check:
                <ul className="list-disc pl-5 mt-2">
                  <li>You can mark essays and provide written feedback</li>
                  <li>You cannot conduct live tutoring sessions</li>
                  <li>You cannot interact directly with students</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-gray-700 text-sm font-semibold block">
            Do you have an enhanced DBS check?{" "}
            <span className="text-red-500">*</span>
          </label>
          <div className="mt-2 space-x-6">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="dbsCheck.hasDBS"
                checked={dbsCheck.hasDBS === true}
                onChange={() => {
                  handleChange({
                    target: {
                      name: "dbsCheck.hasDBS",
                      value: true,
                    },
                  });
                }}
                className="text-red-600 focus:ring-red-500"
                required
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="dbsCheck.hasDBS"
                checked={dbsCheck.hasDBS === false}
                onChange={() => {
                  handleChange({
                    target: {
                      name: "dbsCheck.hasDBS",
                      value: false,
                    },
                  });
                }}
                className="text-red-600 focus:ring-red-500"
                required
              />
              <span className="ml-2">No</span>
            </label>
          </div>
          {errors.dbsCheck && (
            <p className="text-sm text-red-600 mt-1">{errors.dbsCheck}</p>
          )}
        </div>

        {dbsCheck.hasDBS !== null && renderDBSApplication()}
      </div>
    </div>
  );
};

export default DBSCheckSection;
