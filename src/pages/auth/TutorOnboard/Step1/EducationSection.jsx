import React from "react";

const EducationSection = ({ education, handleChange, errors }) => {
  // Calculate max and min dates for DOB
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 16,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0];
  const minDate = new Date(
    today.getFullYear() - 100,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0];

  // Helper function to handle A-level changes
  const handleALevelChange = (index, field, value) => {
    const updatedALevels = [...education.aLevels];
    updatedALevels[index] = {
      ...updatedALevels[index],
      [field]: value
    };
    
    handleChange({
      target: {
        name: 'aLevels',
        value: updatedALevels
      }
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">
        Personal & Education Details
      </h3>

      {/* Date of Birth */}
      <div>
        <label className="text-gray-700 text-sm font-semibold block">
          Date of Birth <span className="text-red-500">*</span>
        </label>
        <div className="mt-1">
          <input
            type="date"
            name="dateOfBirth"
            value={education.dateOfBirth}
            onChange={handleChange}
            max={maxDate}
            min={minDate}
            className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            You must be at least 16 years old to register as a tutor
          </p>
          {errors.dateOfBirth && (
            <p className="text-sm text-red-600 mt-1">{errors.dateOfBirth}</p>
          )}
        </div>
      </div>

      {/* University Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-gray-700 text-sm font-semibold block">
            University <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="university"
            value={education.university}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
            placeholder="Enter your university name"
          />
          {errors.university && (
            <p className="text-sm text-red-600 mt-1">{errors.university}</p>
          )}
        </div>

        <div>
          <label className="text-gray-700 text-sm font-semibold block">
            Course <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="course"
            value={education.course}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
            placeholder="Enter your course name"
          />
          {errors.course && (
            <p className="text-sm text-red-600 mt-1">{errors.course}</p>
          )}
        </div>
      </div>

      {/* University Document Upload */}
      <div>
        <label className="text-gray-700 text-sm font-semibold block">
          University ID/Enrollment Letter/UCAS Confirmation{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          name="universityDocument"
          onChange={handleChange}
          accept=".pdf,.jpg,.jpeg,.png"
          className="mt-1 w-full"
        />
        <p className="text-sm text-gray-500 mt-1">
          Please upload your university ID card, enrollment letter, or UCAS
          confirmation letter
        </p>
        {errors.universityDocument && (
          <p className="text-sm text-red-600 mt-1">
            {errors.universityDocument}
          </p>
        )}
      </div>

      {/* A-Levels */}
      <div>
        <label className="text-gray-700 text-sm font-semibold block">
          A-Level Results <span className="text-red-500">*</span>
        </label>
        {education.aLevels.map((aLevel, index) => (
          <div key={index} className="grid grid-cols-2 gap-4 mt-2">
            <input
              type="text"
              value={aLevel.subject}
              onChange={(e) => handleALevelChange(index, 'subject', e.target.value)}
              placeholder="Subject"
              className="rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
            />
            <input
              type="text"
              value={aLevel.grade}
              onChange={(e) => handleALevelChange(index, 'grade', e.target.value)}
              placeholder="Grade"
              className="rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            handleChange({
              target: {
                name: 'aLevels',
                value: [...education.aLevels, { subject: '', grade: '' }]
              }
            })
          }
          className="mt-2 text-sm text-red-600 hover:text-red-700"
        >
          + Add another A-Level
        </button>
        {errors.aLevels && (
          <p className="text-sm text-red-600 mt-1">{errors.aLevels}</p>
        )}
      </div>

      {/* Important Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-gray-700 text-sm font-semibold block">
            A-Levels Completion Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="aLevelsCompletionDate"
            value={education.aLevelsCompletionDate}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
          />
        </div>

        <div>
          <label className="text-gray-700 text-sm font-semibold block">
            University Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="universityStartDate"
            value={education.universityStartDate}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
          />
        </div>

        <div>
          <label className="text-gray-700 text-sm font-semibold block">
            Expected Graduation Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="expectedGraduationDate"
            value={education.expectedGraduationDate}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
          />
        </div>
      </div>
    </div>
  );
};

export default EducationSection;
