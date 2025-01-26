// src/components/Step1/SubjectsSection.jsx

import React from 'react';

const SubjectsSection = ({ subjects, qualificationLevels, handleSubjectChange, addSubject, errors }) => {
  return (
    <div>
      <label className="text-gray-700 text-sm font-semibold mb-4 block">
        What subjects can you teach? <span className="text-red-500">*</span>
      </label>
      <div className="space-y-4">
        {subjects.map((subject, index) => (
          <div
            key={index}
            className="p-6 rounded-lg bg-gray-50 border border-gray-200"
          >
            <input
              type="text"
              value={subject.name}
              onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
              placeholder="Enter subject name"
              className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200 mb-4"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {qualificationLevels.map((level) => (
                <label key={level} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={subject.levels.includes(level)}
                    onChange={(e) => {
                      const newLevels = e.target.checked
                        ? [...subject.levels, level]
                        : subject.levels.filter((l) => l !== level);
                      handleSubjectChange(index, 'levels', newLevels);
                    }}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span>{level}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addSubject}
          className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add another subject
        </button>
      </div>
      {errors.subjects && (
        <p className="text-sm text-red-600 mt-2">{errors.subjects}</p>
      )}
    </div>
  );
};

export default SubjectsSection;
