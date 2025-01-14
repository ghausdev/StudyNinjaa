// UploadForm.js
import React, { useState, useRef } from 'react';
import { helpers } from '../../utils/helpers';
import { CONFIG } from '../../constants/config';

const UploadForm = ({ onSubmit, loading = false }) => {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragging(true);
    } else if (e.type === 'dragleave') {
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

    // Check file size
    if (file.size > CONFIG.UPLOAD.MAX_FILE_SIZE) {
      errors.file = `File size must be less than ${helpers.formatFileSize(CONFIG.UPLOAD.MAX_FILE_SIZE)}`;
    }

    // Check file type
    if (!helpers.isAllowedFileType(file.name, CONFIG.UPLOAD.ALLOWED_FILE_TYPES)) {
      errors.file = `Allowed file types: ${CONFIG.UPLOAD.ALLOWED_FILE_TYPES.join(', ')}`;
    }

    if (Object.keys(errors).length === 0) {
      setFile(file);
      setErrors({});
    } else {
      setErrors(errors);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!file) errors.file = 'Please upload a file';

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // Submit form
    onSubmit({ ...formData, file });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Essay Title
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          } focus:border-red-500 focus:ring-red-500`}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      {/* Subject Input */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
          Subject
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.subject ? 'border-red-500' : 'border-gray-300'
          } focus:border-red-500 focus:ring-red-500`}
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
        )}
      </div>

      {/* File Upload Area */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Essay
          <span className="text-red-500">*</span>
        </label>
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-lg p-6 text-center
            ${dragging ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
          `}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept={CONFIG.UPLOAD.ALLOWED_FILE_TYPES.join(',')}
            className="hidden"
          />
          
          {file ? (
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-2 text-sm text-gray-900">{file.name}</p>
              <p className="mt-1 text-xs text-gray-500">{helpers.formatFileSize(file.size)}</p>
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
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
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
                {CONFIG.UPLOAD.ALLOWED_FILE_TYPES.join(', ')} up to {helpers.formatFileSize(CONFIG.UPLOAD.MAX_FILE_SIZE)}
              </p>
            </div>
          )}
        </div>
        {errors.file && (
          <p className="mt-1 text-sm text-red-600">{errors.file}</p>
        )}
      </div>

      {/* Notes Textarea */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Additional Notes
        </label>
        <textarea
          id="notes"
          rows={4}
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          placeholder="Any specific instructions or context for the reviewer..."
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className={`
            inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
            bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
            ${loading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {loading ? 'Uploading...' : 'Upload Essay'}
        </button>
        </div>
        </form>
        );
        }

export default UploadForm;