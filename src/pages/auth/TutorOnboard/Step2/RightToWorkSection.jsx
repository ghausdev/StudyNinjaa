import React from 'react';

const RightToWorkSection = ({
  rightToWork,
  nationalityOptions,
  documentTypes,
  handleChange,
  errors
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Right to Work Verification
      </h3>
      <div className="space-y-4">
        <div>
          <label className="text-gray-700 text-sm font-semibold block">
            Do you have the right to work in the UK? <span className="text-red-500">*</span>
          </label>
          <div className="mt-2 space-x-6">
            {['Yes', 'No'].map((option) => (
              <label key={option} className="inline-flex items-center">
                <input
                  type="radio"
                  name="rightToWork.hasRight"
                  checked={rightToWork.hasRight === (option === 'Yes')}
                  onChange={() =>
                    handleChange({
                      target: {
                        name: 'rightToWork.hasRight',
                        value: option === 'Yes'
                      }
                    })
                  }
                  className="text-red-600 focus:ring-red-500"
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </div>
          {errors.rightToWork?.hasRight && (
            <p className="text-sm text-red-600 mt-1">
              {errors.rightToWork.hasRight}
            </p>
          )}
        </div>

        {rightToWork.hasRight && (
          <>
            <div>
              <label className="text-gray-700 text-sm font-semibold block">
                Please select the nationality that appears on your passport <span className="text-red-500">*</span>
              </label>
              <select
                name="rightToWork.nationality"
                value={rightToWork.nationality}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
              >
                <option value="">Select nationality</option>
                {nationalityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.rightToWork?.nationality && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.rightToWork.nationality}
                </p>
              )}
            </div>

            {rightToWork.nationality && (
              <div className="space-y-6 mt-4">
                <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-700">
                  <h4 className="font-semibold mb-2">Document Requirements:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Entire document must be visible, including all edges</li>
                    <li>High-quality image with no blurriness or shadows</li>
                    <li>All text must be clearly legible</li>
                    <li>Accepted formats: PDF, JPEG, PNG</li>
                    <li>Maximum file size: 5MB</li>
                    {rightToWork.nationality === 'BritishIrish' && (
                      <li>Note: Expired passports are accepted for British or Irish citizens</li>
                    )}
                    {rightToWork.nationality === 'EuEeaSwiss' && (
                      <li>Note: Passport must be in date (not expired)</li>
                    )}
                    {rightToWork.nationality === 'NonEuEea' && (
                      <li>Please upload a valid BRP or Visa (in date)</li>
                    )}
                  </ul>
                </div>

                {documentTypes[rightToWork.nationality] && (
                  <>
                    <label className="text-gray-700 text-sm font-semibold block">
                      Select Document Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="rightToWork.documentType"
                      value={rightToWork.documentType}
                      onChange={handleChange}
                      className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
                    >
                      <option value="">-- Choose an option --</option>
                      {documentTypes[rightToWork.nationality].map((doc) => (
                        <option key={doc.value} value={doc.value}>
                          {doc.label}
                        </option>
                      ))}
                    </select>
                    {errors.rightToWork?.documentType && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.rightToWork.documentType}
                      </p>
                    )}
                  </>
                )}

                {rightToWork.nationality === 'BritishIrish' && (
                  <div>
                    <label className="text-gray-700 text-sm font-semibold block">
                      National Insurance Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="rightToWork.niNumber"
                      value={rightToWork.niNumber}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
                      placeholder="Enter your NI number"
                    />
                    {errors.rightToWork?.niNumber && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.rightToWork.niNumber}
                      </p>
                    )}
                  </div>
                )}

                {rightToWork.nationality === 'EuEeaSwiss' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-700 text-sm font-semibold block">
                        Share Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="rightToWork.shareCode"
                        value={rightToWork.shareCode}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
                        placeholder="Enter your Right to Work share code"
                      />
                      {errors.rightToWork?.shareCode && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.rightToWork.shareCode}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-gray-700 text-sm font-semibold block">
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="rightToWork.dateOfBirth"
                        value={rightToWork.dateOfBirth}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
                      />
                      {errors.rightToWork?.dateOfBirth && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.rightToWork.dateOfBirth}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {rightToWork.nationality === 'NonEuEea' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-700 text-sm font-semibold block">
                        Share Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="rightToWork.shareCode"
                        value={rightToWork.shareCode}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
                        placeholder="Enter your Right to Work share code"
                      />
                      {errors.rightToWork?.shareCode && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.rightToWork.shareCode}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-gray-700 text-sm font-semibold block">
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="rightToWork.dateOfBirth"
                        value={rightToWork.dateOfBirth}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
                      />
                      {errors.rightToWork?.dateOfBirth && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.rightToWork.dateOfBirth}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {rightToWork.documentType && (
                  <div className="mt-4">
                    <label className="text-gray-700 text-sm font-semibold block">
                      Upload Your Document <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name="rightToWork.documentFile"
                      onChange={handleChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="mt-1 w-full"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Accepted formats: PDF, JPEG, PNG. Maximum size: 5MB
                    </p>
                    {errors.rightToWork?.documentFile && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.rightToWork.documentFile}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RightToWorkSection;