import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { helpers } from '../../utils/helpers';

const Login = ({ role }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState('login'); // 'login' or '2fa'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
    verificationCode: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30); // Countdown timer for resend code

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep('2fa');
    } catch (error) {
      setErrors({ submit: 'Invalid email or password' });
    } finally {
      setLoading(false);
    }
  };

  const handle2FASubmit = async (e) => {
    e.preventDefault();
    if (!formData.verificationCode) {
      setErrors({ verificationCode: 'Verification code is required' });
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const dashboardRoute = `/${role}/dashboard`;
      navigate(dashboardRoute);
    } catch (error) {
      setErrors({ submit: 'Invalid verification code' });
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setTimer(30);
    // Mock API call to resend code
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!helpers.isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  if (step === '2fa') {
    return (
      <div className="w-full max-w-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Two-Factor Authentication
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a verification code to your email
          </p>
          <p className="text-sm font-medium text-gray-800">
            {formData.email}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handle2FASubmit}>
          {errors.submit && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
              {errors.submit}
            </div>
          )}

          <div>
            <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
              Verification Code
            </label>
            <div className="mt-1">
              <input
                id="verificationCode"
                name="verificationCode"
                type="text"
                maxLength="6"
                value={formData.verificationCode}
                onChange={handleChange}
                className={`appearance-none block w-full px-3 py-2 border text-center text-2xl tracking-widest ${
                  errors.verificationCode ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500`}
                placeholder="000000"
              />
              {errors.verificationCode && (
                <p className="mt-1 text-sm text-red-600">{errors.verificationCode}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Verifying...
                </>
              ) : (
                'Verify Code'
              )}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              disabled={timer > 0}
              onClick={handleResendCode}
              className="text-sm font-medium text-red-600 hover:text-red-500 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              {timer > 0 ? `Resend code in ${timer}s` : 'Resend code'}
            </button>
            <p className="mt-2">
              <button
                type="button"
                onClick={() => setStep('login')}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                ← Back to login
              </button>
            </p>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          Welcome back
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-red-600 hover:text-red-500">
            Sign up
          </Link>
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleInitialSubmit}>
        {errors.submit && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
            {errors.submit}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`appearance-none block w-full px-3 py-2 border ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className={`appearance-none block w-full px-3 py-2 border ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <Link
            to="/forgot-password"
            className="text-sm font-medium text-red-600 hover:text-red-500"
          >
            Forgot your password?
          </Link>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;