// src/components/Step1/MotivationSection.jsx

import React from 'react';

const MotivationSection = ({ motivation, handleChange, errors }) => {
  return (
    <div>
      <label className="text-gray-700 text-sm font-semibold mb-2 block">
        Why do you want to be a tutor? <span className="text-red-500">*</span>
      </label>
      <textarea
        name="motivation"
        value={motivation}
        onChange={handleChange}
        maxLength={250}
        rows={4}
        className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200 transition-colors"
        placeholder="Share your passion for teaching..."
      />
      <div className="flex justify-between mt-2">
        <p className="text-sm text-red-600">{errors.motivation}</p>
        <p className="text-sm text-gray-500">{motivation.length}/250</p>
      </div>
    </div>
  );
};

export default MotivationSection;
