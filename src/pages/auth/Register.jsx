// Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { helpers } from '../../utils/helpers';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'tutor', // student or tutor

    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

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

    // Required field validations
    const requiredFields = ['firstName', 'lastName', 'email', 'password', 'confirmPassword'];
    requiredFields.forEach(field => {
      if (!formData[field]?.trim()) {
        newErrors[field] = `${helpers.capitalizeWords(field.replace(/([A-Z])/g, ' $1'))} is required`;
      }
    });

    // Email validation
    if (formData.email && !helpers.isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // // Password validation
    // if (formData.password) {
    //   if (formData.password.length < 8) {
    //     newErrors.password = 'Password must be at least 8 characters long';
    //   } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
    //     newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    //   }
    // }

    // // Confirm password validation
    // if (formData.password !== formData.confirmPassword) {
    //   newErrors.confirmPassword = 'Passwords do not match';
    // }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
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

    try {
      // Mock registration request
      await new Promise(resolve => setTimeout(resolve, 1500));
            
      // Redirect based on role
      if (formData.role === 'tutor') {
        console.log('Tutor onboarding');
        navigate('/tutoronboarding');
      } else {
        navigate('/login', { 
          state: { message: 'Registration successful! Please sign in.' }
        });
      }
     
    } catch (error) {
      setErrors({
        submit: 'Registration failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-red-600 hover:text-red-500">
            Sign in
          </Link>
        </p>
      </div>

      {/* Form */}
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {errors.submit && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
            {errors.submit}
          </div>
        )}

        <div className="space-y-6">
          {/* User Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">I am a</label>
            <div className="mt-2 grid grid-cols-2 gap-3">
              {['student', 'tutor'].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role }))}
                  className={`
                    ${formData.role === role
                      ? 'border-red-500 ring-2 ring-red-200 bg-red-50'
                      : 'border-gray-300 hover:border-gray-400'}
                    border rounded-lg p-4 flex flex-col items-center justify-center text-sm
                  `}
                >
                  <span className="capitalize font-medium">
                    {role}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.firstName ? 'border-red-300' : 'border-gray-300'
                } focus:border-red-500 focus:ring-red-500`}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.lastName ? 'border-red-300' : 'border-gray-300'
                } focus:border-red-500 focus:ring-red-500`}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              } focus:border-red-500 focus:ring-red-500`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password Fields */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.password ? 'border-red-300' : 'border-gray-300'
              } focus:border-red-500 focus:ring-red-500`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
              } focus:border-red-500 focus:ring-red-500`}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>


          {/* Terms and Conditions */}
          <div className="flex items-start">
            <input
              id="agreeToTerms"
              name="agreeToTerms"
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-900">
              I agree to the{' '}
              <Link to="/terms" className="text-red-600 hover:text-red-500">
                Terms and Conditions
              </Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-red-600 hover:text-red-500">
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-sm text-red-600">{errors.agreeToTerms}</p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;