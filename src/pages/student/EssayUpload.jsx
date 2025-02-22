import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { helpers } from "../../utils/helpers";
import { CONFIG } from "../../constants/config";
import StudentService from "../../services/studentService";
import { useAuth } from "../../contexts/AuthContext";

const EssayUpload = () => {
  const [file, setFile] = useState(null);
  const [markScheme, setMarkScheme] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    studentRequest: "Feedback Only",
    academicLevel: "GCSE",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef();
  const markSchemeInputRef = useRef();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length === 1) {
      validateAndSetFile(files[0]);
    }
  };

  const validateAndSetFile = (file) => {
    const errors = {};
    if (file.size > CONFIG.UPLOAD.MAX_FILE_SIZE) {
      errors.file = `File size must be less than ${helpers.formatFileSize(
        CONFIG.UPLOAD.MAX_FILE_SIZE
      )}`;
    }
    if (
      !helpers.isAllowedFileType(file.name, CONFIG.UPLOAD.ALLOWED_FILE_TYPES)
    ) {
      errors.file = `Allowed file types: ${CONFIG.UPLOAD.ALLOWED_FILE_TYPES.join(
        ", "
      )}`;
    }
    if (Object.keys(errors).length === 0) {
      setFile(file);
      setErrors({});
    } else {
      setErrors(errors);
    }
  };
  const validateAndSetMarkScheme = (file) => {
    const errors = {};
    if (file.size > CONFIG.UPLOAD.MAX_FILE_SIZE) {
      errors.markScheme = `File size must be less than ${helpers.formatFileSize(
        CONFIG.UPLOAD.MAX_FILE_SIZE
      )}`;
    }
    if (
      !helpers.isAllowedFileType(file.name, CONFIG.UPLOAD.ALLOWED_FILE_TYPES)
    ) {
      errors.markScheme = `Allowed file types: ${CONFIG.UPLOAD.ALLOWED_FILE_TYPES.join(
        ", "
      )}`;
    }
    if (Object.keys(errors).length === 0) {
      setMarkScheme(file);
      setErrors((prev) => ({ ...prev, markScheme: null }));
    } else {
      setErrors((prev) => ({ ...prev, markScheme: errors.markScheme }));
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };
  const handleMarkSchemeSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetMarkScheme(e.target.files[0]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    if (!formData.studentRequest) {
      newErrors.studentRequest = "Request type is required";
    }
    if (!formData.academicLevel) {
      newErrors.academicLevel = "Academic level is required";
    }
    if (!file) {
      newErrors.file = "Please upload a file";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    try {
      const uploadData = new FormData();
      uploadData.append("title", formData.title);
      uploadData.append("subject", formData.subject);
      uploadData.append("academicLevel", formData.academicLevel);
      uploadData.append("studentRequest", formData.studentRequest);
      uploadData.append("comments", formData.notes);
      uploadData.append("file", file);
      if (markScheme) {
        uploadData.append("markingScheme", markScheme);
      }

      console.log(formData);

      // Show initial loading state
      setUploadProgress(10);

      const response = await StudentService.uploadEssay(uploadData);

      if (response?.paymentUrl) {
        // Redirect to Stripe payment page
        window.location.href = response.paymentUrl;
      } else {
        setErrors({
          submit: "Failed to get payment link. Please try again.",
        });
      }
    } catch (error) {
      setErrors({
        submit: error?.message || "Failed to upload essay. Please try again.",
      });
      setUploadProgress(0);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };
  if (!isAuthenticated) {
    return (
      <div className="text-center text-red-500">
        Please Login to upload the Essay
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Upload Essay</h1>
        <p className="mt-1 text-sm text-gray-500">
          Upload your essay for review. Our tutors will provide detailed
          feedback within 48-72 hours.
        </p>
        <div className="mt-2 p-3 bg-yellow-50 rounded-md">
          <p className="text-sm text-yellow-700">
            <span className="font-medium">Important:</span> Please do not upload
            personal statements. This service is for academic essays only.
            Uploaded on: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {loading && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center">
              <div className="mb-4">
                <svg
                  className="animate-spin h-10 w-10 text-red-600 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
              <div className="text-gray-700 font-medium">
                Uploading Essay...
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-red-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                {uploadProgress}%
              </div>
            </div>
          </div>
        )}

        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-600">
            {errors.submit}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Essay Upload
          </h2>
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-lg p-6 text-center
      ${
        dragging
          ? "border-red-500 bg-red-50"
          : "border-gray-300 hover:border-gray-400"
      }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept={CONFIG.UPLOAD.ALLOWED_FILE_TYPES.join(",")}
              className="hidden"
            />

            {file ? (
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="mt-2 text-sm text-gray-900">{file.name}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {helpers.formatFileSize(file.size)}
                </p>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="mt-2 text-sm text-red-600 hover:text-red-500"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <div className="text-sm text-gray-600">
                  <button
                    type="button"
                    className="text-red-600 hover:text-red-500"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Upload a file
                  </button>
                  <span className="text-gray-500"> or drag and drop</span>
                </div>
                <p className="text-xs text-gray-500">
                  {CONFIG.UPLOAD.ALLOWED_FILE_TYPES.join(", ")} up to{" "}
                  {helpers.formatFileSize(CONFIG.UPLOAD.MAX_FILE_SIZE)}
                </p>
              </div>
            )}
          </div>
          {errors.file && (
            <p className="mt-2 text-sm text-red-600">{errors.file}</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Mark Scheme (Optional)
          </h2>
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <input
              type="file"
              ref={markSchemeInputRef}
              onChange={handleMarkSchemeSelect}
              accept={CONFIG.UPLOAD.ALLOWED_FILE_TYPES.join(",")}
              className="hidden"
            />

            {markScheme ? (
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="mt-2 text-sm text-gray-900">{markScheme.name}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {helpers.formatFileSize(markScheme.size)}
                </p>
                <button
                  type="button"
                  onClick={() => setMarkScheme(null)}
                  className="mt-2 text-sm text-red-600 hover:text-red-500"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <div className="text-sm text-gray-600">
                  <button
                    type="button"
                    className="text-red-600 hover:text-red-500"
                    onClick={() => markSchemeInputRef.current?.click()}
                  >
                    Upload mark scheme
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Optional: Upload the mark scheme to help tutors provide
                  targeted feedback
                </p>
              </div>
            )}
          </div>
          {errors.markScheme && (
            <p className="mt-2 text-sm text-red-600">{errors.markScheme}</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="text-lg font-medium text-gray-900">Essay Details</h2>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Essay Title
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.title ? "border-red-300" : "border-gray-300"
              } focus:border-red-500 focus:ring-red-500`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              Subject
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.subject ? "border-red-300" : "border-gray-300"
              } focus:border-red-500 focus:ring-red-500`}
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="studentRequest"
              className="block text-sm font-medium text-gray-700"
            >
              Request Type
              <span className="text-red-500">*</span>
            </label>
            <select
              id="studentRequest"
              name="studentRequest"
              value={formData.studentRequest}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.studentRequest ? "border-red-300" : "border-gray-300"
              } focus:border-red-500 focus:ring-red-500`}
            >
              <option value="Feedback Only">Feedback Only</option>
              <option value="Feedback and Model Answer">
                Feedback and Model Answer
              </option>
            </select>
            {errors.studentRequest && (
              <p className="mt-1 text-sm text-red-600">
                {errors.studentRequest}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="academicLevel"
              className="block text-sm font-medium text-gray-700"
            >
              Academic Level
              <span className="text-red-500">*</span>
            </label>
            <select
              id="academicLevel"
              name="academicLevel"
              value={formData.academicLevel}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.academicLevel ? "border-red-300" : "border-gray-300"
              } focus:border-red-500 focus:ring-red-500`}
            >
              <option value="GCSE">GCSE</option>
              <option value="A-Level">A-Level</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
            </select>
            {errors.academicLevel && (
              <p className="mt-1 text-sm text-red-600">
                {errors.academicLevel}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700"
            >
              Additional Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              value={formData.notes}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              placeholder="Any specific areas you'd like the reviewer to focus on..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {loading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V2.5"
                />
              </svg>
            ) : (
              "Upload Essay"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EssayUpload;
