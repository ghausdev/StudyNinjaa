// src/components/Step2/DBSCheckSection.jsx

import React from 'react';
import DBSApplication from './DBSApplication';

const DBSCheckSection = ({
  dbsCheck,
  renderDBSApplication,
  handleChange,
  errors
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Enhanced DBS Check
      </h3>
      <div className="space-y-4">
        <div>
          <label className="text-gray-700 text-sm font-semibold block">
            Do you have an enhanced DBS check? <span className="text-red-500">*</span>
          </label>
          <div className="mt-2 space-x-6">
            {['Yes', 'No'].map((option) => (
              <label key={option} className="inline-flex items-center">
                <input
                  type="radio"
                  name="dbsCheck.hasDBS"
                  checked={dbsCheck.hasDBS === (option === 'Yes')}
                  onChange={() => {
                    handleChange({
                      target: {
                        name: 'dbsCheck.hasDBS',
                        value: option === 'Yes'
                      }
                    });
                  }}
                  className="text-red-600 focus:ring-red-500"
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </div>
          {errors.dbsCheck && (
            <p className="text-sm text-red-600 mt-1">
              {errors.dbsCheck}
            </p>
          )}
        </div>

        {dbsCheck.hasDBS !== null && renderDBSApplication()}
      </div>
    </div>
  );
};

export default DBSCheckSection;
