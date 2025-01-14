// SettingsForm.js
import React, { useState } from 'react';
import { helpers } from '../../utils/helpers';

const SettingsForm = ({
  user,
  onSave,
  onCancel,
  loading = false
}) => {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    targetUniversity: user?.targetUniversity || '',
    targetCourse: user?.targetCourse || '',
    notifications: {
      email: user?.notifications?.email ?? true,
      sms: user?.notifications?.sms ?? false,
      essay_feedback: user?.notifications?.essay_feedback ?? true,
      interview_reminders: user?.notifications?.interview_reminders ?? true,
      marketing: user?.notifications?.marketing ?? false
    }
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox' && name.startsWith('notifications.')) {
      const notificationKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [notificationKey]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!helpers.isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (if provided)
    if (formData.phone && !/^\+?\d{10,14}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
        </div>
        <div className="p-4 space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm 
                  ${errors.firstName ? 'border-red-500' : 'border-gray-300'}
                  focus:border-red-500 focus:ring-red-500`}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm 
                  ${errors.lastName ? 'border-red-500' : 'border-gray-300'}
                  focus:border-red-500 focus:ring-red-500`}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Contact Fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
                <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm 
                  ${errors.email ? 'border-red-500' : 'border-gray-300'}
                  focus:border-red-500 focus:ring-red-500`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm 
                  ${errors.phone ? 'border-red-500' : 'border-gray-300'}
                  focus:border-red-500 focus:ring-red-500`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Academic Information */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="targetUniversity" className="block text-sm font-medium text-gray-700">
                Target University
              </label>
              <input
                type="text"
                id="targetUniversity"
                name="targetUniversity"
                value={formData.targetUniversity}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                  focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div>
              <label htmlFor="targetCourse" className="block text-sm font-medium text-gray-700">
                Target Course
              </label>
              <input
                type="text"
                id="targetCourse"
                name="targetCourse"
                value={formData.targetCourse}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                  focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="notifications.email"
                  name="notifications.email"
                  type="checkbox"
                  checked={formData.notifications.email}
                  onChange={handleChange}
                  className="h-4 w-4 text-red-600 rounded border-gray-300 
                    focus:ring-red-500"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="notifications.email" className="text-sm font-medium text-gray-700">
                  Email Notifications
                </label>
                <p className="text-sm text-gray-500">
                  Receive updates and notifications via email
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="notifications.sms"
                  name="notifications.sms"
                  type="checkbox"
                  checked={formData.notifications.sms}
                  onChange={handleChange}
                  className="h-4 w-4 text-red-600 rounded border-gray-300 
                    focus:ring-red-500"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="notifications.sms" className="text-sm font-medium text-gray-700">
                  SMS Notifications
                </label>
                <p className="text-sm text-gray-500">
                  Receive important updates via SMS
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="notifications.essay_feedback"
                  name="notifications.essay_feedback"
                  type="checkbox"
                  checked={formData.notifications.essay_feedback}
                  onChange={handleChange}
                  className="h-4 w-4 text-red-600 rounded border-gray-300 
                    focus:ring-red-500"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="notifications.essay_feedback" className="text-sm font-medium text-gray-700">
                  Essay Feedback
                </label>
                <p className="text-sm text-gray-500">
                  Get notified when your essays are reviewed
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="notifications.interview_reminders"
                  name="notifications.interview_reminders"
                  type="checkbox"
                  checked={formData.notifications.interview_reminders}
                  onChange={handleChange}
                  className="h-4 w-4 text-red-600 rounded border-gray-300 
                    focus:ring-red-500"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="notifications.interview_reminders" className="text-sm font-medium text-gray-700">
                  Interview Reminders
                </label>
                <p className="text-sm text-gray-500">
                  Receive reminders about upcoming interviews
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 
            hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm 
            text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none 
            focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 
            disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

export default SettingsForm;