import React, { useState } from 'react';

const TutorOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    motivation: '',
    subjects: [{
      name: '',
      levels: []
    }],
    rightToWork: {
      hasRight: null,
      documentType: '',
      documentFile: null
    },
    dbsCheck: {
      hasDBS: null,
      fullName: '',
      certificateNumber: '',
      certificateFile: null
    }
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const qualificationLevels = ['GCSE', 'A-Level', 'Bachelor', 'Masters', 'PhD'];
  const documentTypes = [
    { value: 'passport', label: 'British/Irish Passport' },
    { value: 'brp', label: 'Biometric Residence Permit' },
    { value: 'visa', label: 'Work/Skilled Visa' },
    { value: 'settlement', label: 'EU Settlement Certificate' },
    { value: 'shareCode', label: 'Share Code' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index] = { ...newSubjects[index], [field]: value };
    setFormData(prev => ({ ...prev, subjects: newSubjects }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    switch (step) {
      case 1:
        if (!formData.motivation || formData.motivation.length > 250) {
          newErrors.motivation = 'Please provide a motivation (max 250 characters)';
        }
        if (!formData.subjects.some(s => s.name && s.levels.length > 0)) {
          newErrors.subjects = 'Please add at least one subject with qualification levels';
        }
        break;
      case 2:
        if (formData.rightToWork.hasRight === null) {
          newErrors.rightToWork = 'Please indicate your right to work status';
        }
        if (formData.rightToWork.hasRight && !formData.rightToWork.documentFile) {
          newErrors.rightToWorkDoc = 'Please upload proof of right to work';
        }
        if (formData.dbsCheck.hasDBS === null) {
          newErrors.dbsCheck = 'Please indicate your DBS check status';
        }
        if (formData.dbsCheck.hasDBS && (!formData.dbsCheck.certificateNumber || !formData.dbsCheck.certificateFile)) {
          newErrors.dbsDetails = 'Please provide complete DBS details and certificate';
        }
        break;
    }
    return newErrors;
  };

  const handleNextStep = () => {
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length === 0) {
      setCurrentStep(prev => prev + 1);
      setErrors({});
    } else {
      setErrors(stepErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
    } catch (error) {
      setErrors({ submit: 'Submission failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Tutor Profile</h1>
          <p className="text-gray-600">Join our community of expert educators</p>
        </div>

        <div className="mb-12">
          <div className="relative">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div
                style={{ width: `${(currentStep / 2) * 100}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-600 transition-all duration-500"
              />
            </div>
            <div className="flex justify-between">
              {[1, 2].map((step) => (
                <div key={step} className="relative">
                  <div
                    className={`w-10 h-10 mx-auto flex items-center justify-center rounded-full transition-all duration-500
                    ${currentStep >= step ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                  >
                    {currentStep > step ? (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-sm font-semibold">{step}</span>
                    )}
                  </div>
                  <div className="text-xs text-center mt-2 font-medium text-gray-600">
                    {step === 1 ? 'Basic Info' : 'Verification'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {currentStep === 1 && (
              <div className="space-y-8">
                <div>
                  <label className="text-gray-700 text-sm font-semibold mb-2 block">
                    Why do you want to be a tutor? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleChange}
                    maxLength={250}
                    rows={4}
                    className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200 transition-colors"
                    placeholder="Share your passion for teaching..."
                  />
                  <div className="flex justify-between mt-2">
                    <p className="text-sm text-red-600">{errors.motivation}</p>
                    <p className="text-sm text-gray-500">{formData.motivation.length}/250</p>
                  </div>
                </div>

                <div>
                  <label className="text-gray-700 text-sm font-semibold mb-4 block">
                    What subjects can you teach? <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-4">
                    {formData.subjects.map((subject, index) => (
                      <div key={index} className="p-6 rounded-lg bg-gray-50 border border-gray-200">
                        <input
                          type="text"
                          value={subject.name}
                          onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                          placeholder="Enter subject name"
                          className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200 mb-4"
                        />
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {qualificationLevels.map(level => (
                            <label key={level} className="flex items-center space-x-2 text-sm">
                              <input
                                type="checkbox"
                                checked={subject.levels.includes(level)}
                                onChange={(e) => {
                                  const newLevels = e.target.checked
                                    ? [...subject.levels, level]
                                    : subject.levels.filter(l => l !== level);
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
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        subjects: [...prev.subjects, { name: '', levels: [] }]
                      }))}
                      className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add another subject
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Right to Work Verification</h3>
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
                              checked={formData.rightToWork.hasRight === (option === 'Yes')}
                              onChange={() => handleChange({
                                target: { name: 'rightToWork.hasRight', value: option === 'Yes' }
                              })}
                              className="text-red-600 focus:ring-red-500"
                            />
                            <span className="ml-2">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {formData.rightToWork.hasRight && (
                      <div className="space-y-4">
                        <select
                          name="rightToWork.documentType"
                          value={formData.rightToWork.documentType}
                          onChange={handleChange}
                          className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
                        >
                          <option value="">Select document type</option>
                          {documentTypes.map(doc => (
                            <option key={doc.value} value={doc.value}>{doc.label}</option>
                          ))}
                        </select>
                        <div className="mt-2">
                          <input
                            type="file"
                            name="rightToWork.documentFile"
                            onChange={handleChange}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">DBS Check Information</h3>
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
                              checked={formData.dbsCheck.hasDBS === (option === 'Yes')}
                              onChange={() => handleChange({
                                target: { name: 'dbsCheck.hasDBS', value: option === 'Yes' }
                              })}
                              className="text-red-600 focus:ring-red-500"
                            />
                            <span className="ml-2">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {formData.dbsCheck.hasDBS && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-gray-700 text-sm font-semibold block">
                            Full Name as on Certificate <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="dbsCheck.fullName"
                            value={formData.dbsCheck.fullName}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
                          />
                        </div>
                        <div>
                          <label className="text-gray-700 text-sm font-semibold block">
                            Certificate Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="dbsCheck.certificateNumber"
                            value={formData.dbsCheck.certificateNumber}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-gray-700 text-sm font-semibold block">
                            Upload DBS Certificate <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="file"
                            name="dbsCheck.certificateFile"
                            onChange={handleChange}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                          />
                          <p className="mt-1 text-xs text-gray-500">
                            * Your DBS certificate will be deleted after verification
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-8 border-t border-gray-200">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
              ) : (
                <div />
              )}

              {currentStep < 2 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  Next
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TutorOnboarding;