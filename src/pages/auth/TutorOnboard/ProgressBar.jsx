// src/components/ProgressBar.jsx

import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-12">
      <div className="relative">
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
          <div
            style={{ width: `${percentage}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-600 transition-all duration-500"
          />
        </div>
        <div className="flex justify-between">
          {[...Array(totalSteps)].map((_, index) => {
            const step = index + 1;
            return (
              <div key={step} className="relative">
                <div
                  className={`
                    w-10 h-10 mx-auto flex items-center justify-center rounded-full transition-all duration-500
                    ${currentStep >= step ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'}
                  `}
                >
                  {currentStep > step ? (
                    <svg
                      className="w-6 h-6"
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
                  ) : (
                    <span className="text-sm font-semibold">{step}</span>
                  )}
                </div>
                <div className="text-xs text-center mt-2 font-medium text-gray-600">
                  {step === 1 ? 'Basic Info' : step === 2 ? 'Verification' : `Step ${step}`}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
