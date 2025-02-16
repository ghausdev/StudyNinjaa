// src/TutorOnboarding.jsx

import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import MotivationSection from "./Step1/MotivationSection";
import SubjectsSection from "./Step1/SubjectsSection";
import RightToWorkSection from "./Step2/RightToWorkSection";
import DBSCheckSection from "./Step2/DBSCheckSection";
import DBSApplication from "./Step2/DBSApplication";
import NavigationButtons from "./NavigationButtons";
import { fileToBase64 } from "./utils/fileUtils";
import AuthService from "../../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import ProfilePictureSection from "./Step1/ProfilePictureSection";
import EducationSection from "./Step1/EducationSection";

// Note: Ensure all components are correctly imported based on your file structure

const TutorOnboarding = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);

  // All fields initialized to avoid "uncontrolled input" warnings
  const [formData, setFormData] = useState({
    motivation: "",
    subjects: [
      {
        name: "",
        levels: [],
      },
    ],
    rightToWork: {
      hasRight: null, // true => yes, false => no, null => not chosen
      nationality: "",
      documentType: "",
      documentFile: null,
      niNumber: "",
      shareCode: "",
      dateOfBirth: "",
    },
    dbsCheck: {
      hasDBS: null,
      certificateFile: null,
      fullNameDBS: "",
      certificateNumber: "",
      startApplication: false,
      applicationDetails: {
        email: "",
        fullName: "",
        phoneNumber: "",
        agreementAccepted: false,
      },
    },
    profilePicture: null,
    university: "",
    course: "",
    aLevels: [{ subject: "", grade: "" }],
    aLevelsCompletionDate: "",
    universityStartDate: "",
    expectedGraduationDate: "",
    dateOfBirth: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Backend enum values for nationality
  const nationalityOptions = [
    { value: "BritishIrish", label: "British or Irish Citizen" },
    { value: "EuEeaSwiss", label: "EU, EEA, or Swiss Citizen" },
    { value: "NonEuEea", label: "Non-EU, EEA Citizen" },
  ];

  // Possible qualification levels
  const qualificationLevels = ["GCSE", "A-Level", "Bachelor", "Masters", "PhD"];

  // Frontend mapping for document types
  const documentTypes = {
    BritishIrish: [
      { value: "passport", label: "Passport (Expired Accepted)" },
      { value: "birth-cert", label: "UK Birth Certificate" },
      { value: "adoption-cert", label: "UK Adoption Certificate" },
    ],
    EuEeaSwiss: [{ value: "passport", label: "Passport (Must be in date)" }],
    NonEuEea: [
      { value: "brp", label: "Biometric Residence Permit (BRP)" },
      { value: "visa", label: "Valid Visa Document" },
    ],
  };

  // Handle ALL changes (no console logs here to avoid real-time data output)
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // Special handling for file inputs
    if (type === "file") {
      if (name === "profilePicture") {
        setFormData((prev) => ({
          ...prev,
          profilePicture: files[0], // Store the actual file object
        }));
      } else {
        // Handle other file inputs...
      }
      return;
    }

    // Handle other input types...
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error for this field if present
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Handle subject array changes
  const handleSubjectChange = (index, field, newValue) => {
    setFormData((prev) => {
      const updatedSubjects = [...prev.subjects];
      updatedSubjects[index] = { ...updatedSubjects[index], [field]: newValue };
      return { ...prev, subjects: updatedSubjects };
    });
  };

  // Add a new subject
  const addSubject = () => {
    setFormData((prev) => ({
      ...prev,
      subjects: [...prev.subjects, { name: "", levels: [] }],
    }));
  };

  // Validate Step 1
  const validateStep1 = () => {
    const errors = {};

    // Check profile picture first
    if (!formData.profilePicture) {
      errors.profilePicture = "Profile picture is required";
    }

    if (!formData.university) {
      errors.university = "University name is required";
    }

    if (!formData.course) {
      errors.course = "Course name is required";
    }

    // Validate A-Levels
    if (!formData.aLevels.some((al) => al.subject && al.grade)) {
      errors.aLevels = "At least one A-Level subject and grade is required";
    }

    // Validate dates
    if (!formData.aLevelsCompletionDate) {
      errors.aLevelsCompletionDate = "A-Levels completion date is required";
    }

    if (!formData.universityStartDate) {
      errors.universityStartDate = "University start date is required";
    }

    if (!formData.expectedGraduationDate) {
      errors.expectedGraduationDate = "Expected graduation date is required";
    }

    if (!formData.dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required";
    }

    return errors;
  };

  // Step-based validation
  const validateStep = (step) => {
    const newErrors = {};
    switch (step) {
      case 1:
        const step1Errors = validateStep1();
        if (Object.keys(step1Errors).length > 0) {
          newErrors.step1 = step1Errors;
        }
        break;

      case 2:
        const rtWorkErrors = validateRightToWork();
        if (Object.keys(rtWorkErrors).length > 0) {
          newErrors.rightToWork = rtWorkErrors;
        }

        // DBS validation
        if (formData.dbsCheck.hasDBS === null) {
          newErrors.dbsCheck = "Please indicate your DBS check status";
        } else if (formData.dbsCheck.hasDBS) {
          if (!formData.dbsCheck.fullNameDBS) {
            newErrors.dbsFullName =
              "Please enter your full name as it appears on DBS";
          }
          if (!formData.dbsCheck.certificateNumber) {
            newErrors.dbsCertificateNumber =
              "Please enter your DBS certificate number";
          }
          if (!formData.dbsCheck.certificateFile) {
            newErrors.dbsCertificateFile = "Please upload your DBS certificate";
          }
        } else if (formData.dbsCheck.startApplication) {
          const { email, fullName, phoneNumber, agreementAccepted } =
            formData.dbsCheck.applicationDetails;
          if (!email || !fullName || !phoneNumber || !agreementAccepted) {
            newErrors.dbsApplication =
              "Please complete all DBS application fields";
          }
        }
        break;
      default:
        break;
    }

    return newErrors;
  };

  // Right to Work validation
  const validateRightToWork = () => {
    const errors = {};
    const {
      hasRight,
      nationality,
      documentType,
      documentFile,
      niNumber,
      shareCode,
      dateOfBirth,
    } = formData.rightToWork;

    if (hasRight === null) {
      errors.hasRight = "Please indicate your right to work status";
      return errors;
    }

    if (hasRight === true) {
      if (!nationality) {
        errors.nationality = "Please select your nationality";
        return errors;
      }

      // British or Irish
      if (nationality === "BritishIrish") {
        if (!documentType) {
          errors.documentType =
            "Please select a document type (Passport/Birth Cert/Adoption Cert)";
        }
        if (
          ["birth-cert", "adoption-cert"].includes(documentType) &&
          !niNumber
        ) {
          errors.niNumber =
            "NI Number is required when uploading a birth or adoption certificate";
        }
        if (!documentFile) {
          errors.documentFile = "Please upload the required document";
        }
      }

      // EU/EEA/Swiss
      else if (nationality === "EuEeaSwiss") {
        if (!shareCode) {
          errors.shareCode = "Please enter your Share Code";
        }
        if (!dateOfBirth) {
          errors.dateOfBirth = "Please enter your Date of Birth";
        }
        if (!documentType) {
          errors.documentType =
            "Please select passport (in-date) for EU/EEA/Swiss";
        }
        if (!documentFile) {
          errors.documentFile = "Please upload your passport";
        }
      }

      // Non-EU/EEA
      else if (nationality === "NonEuEea") {
        if (!documentType) {
          errors.documentType = "Please select BRP or Visa Document";
        }
        if (!documentFile) {
          errors.documentFile = "Please upload your BRP or Visa document";
        }
      }
    }

    return errors;
  };

  const handleNextStep = () => {
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length === 0) {
      setCurrentStep((prev) => prev + 1);
      setErrors({});
    } else {
      setErrors(stepErrors);
    }
  };

  // Final submit handler:
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // Final validation before submission
      if (!formData.profilePicture) {
        throw new Error("Profile picture is required");
      }

      const response = await AuthService.submitTutorOnboarding(formData);

      // Update the user object with onboardingCompleted flag
      const updatedUser = {
        ...user,
        onboardingCompleted: true,
      };

      // Update local storage and context
      login(updatedUser, localStorage.getItem("token"));

      // Redirect to tutor dashboard
      navigate("/tutor/dashboard");
    } catch (error) {
      setErrors({
        submit: error.message || "Submission failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Conditionally render the DBS section
  const renderDBSApplication = () => {
    if (formData.dbsCheck.hasDBS) {
      // "Yes" => user already has DBS
      return (
        <div className="space-y-4">
          <div>
            <label className="text-gray-700 text-sm font-semibold block">
              Full Name (as it appears on DBS){" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="dbsCheck.fullNameDBS"
              value={formData.dbsCheck.fullNameDBS}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm font-semibold block">
              DBS Certificate Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="dbsCheck.certificateNumber"
              value={formData.dbsCheck.certificateNumber}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
              placeholder="Enter your DBS certificate number"
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm font-semibold block">
              Upload DBS Certificate <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name="dbsCheck.certificateFile"
              onChange={handleChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="mt-1 w-full"
            />
            <p className="text-sm text-gray-500 mt-1">
              Accepted formats: PDF, JPEG, PNG. Maximum size: 5MB
            </p>
          </div>
        </div>
      );
    }

    // If "No" => start or skip
    if (formData.dbsCheck.hasDBS === false) {
      if (!formData.dbsCheck.startApplication) {
        return (
          <div className="text-center">
            <p className="mb-4">
              Don't have an Enhanced DBS Check? You can either:
            </p>
            <div className="space-y-4">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    dbsCheck: { ...prev.dbsCheck, startApplication: true },
                  }))
                }
                className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-red-600 hover:bg-red-700"
              >
                Start DBS Application Now
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    dbsCheck: { ...prev.dbsCheck, startApplication: false },
                  }))
                }
                className="w-full inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                Continue Without DBS Check
              </button>
            </div>
          </div>
        );
      }

      // Starting a new application
      return (
        <DBSApplication
          applicationDetails={formData.dbsCheck.applicationDetails}
          handleChange={handleChange}
        />
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Tutor Profile
          </h1>
          <p className="text-gray-600">
            Join our community of expert educators
          </p>
        </div>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} totalSteps={2} />

        {/* Main Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* STEP 1: Motivation + Subjects */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <ProfilePictureSection
                  handleChange={handleChange}
                  errors={errors}
                />
                <EducationSection
                  education={formData}
                  handleChange={handleChange}
                  errors={errors}
                />
                <MotivationSection
                  motivation={formData.motivation}
                  handleChange={handleChange}
                  errors={errors}
                />
                <SubjectsSection
                  subjects={formData.subjects}
                  qualificationLevels={qualificationLevels}
                  handleSubjectChange={handleSubjectChange}
                  addSubject={addSubject}
                  errors={errors}
                />
              </div>
            )}

            {/* STEP 2: Right to Work + DBS */}
            {currentStep === 2 && (
              <div className="space-y-8">
                {/* Right to Work */}
                <RightToWorkSection
                  rightToWork={formData.rightToWork}
                  nationalityOptions={nationalityOptions}
                  documentTypes={documentTypes}
                  handleChange={handleChange}
                  errors={errors}
                />

                {/* Enhanced DBS Check */}
                <DBSCheckSection
                  dbsCheck={formData.dbsCheck}
                  renderDBSApplication={renderDBSApplication}
                  handleChange={handleChange}
                  errors={errors}
                />
              </div>
            )}

            {/* Navigation Buttons */}
            <NavigationButtons
              currentStep={currentStep}
              totalSteps={2}
              handleNextStep={handleNextStep}
              handlePreviousStep={() => setCurrentStep((prev) => prev - 1)}
              handleSubmit={handleSubmit}
              loading={loading}
            />
          </form>

          {errors.submit && (
            <p className="text-sm text-red-600 mt-4">{errors.submit}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorOnboarding;
