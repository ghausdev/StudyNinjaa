import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuth();
  const [step, setStep] = useState('login');
  const [formData, setFormData] = useState({ email: '', password: '', verificationCode: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [userId, setUserId] = useState(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      // Check if user is a tutor who hasn't completed onboarding
      if (user.role === 'tutor' && !user.onboardingCompleted) {
        navigate('/tutor-onboarding');
      } else {
        navigate(`/${user.role}/dashboard`);
      }
    }
  }, [isAuthenticated, user, navigate]);

  // Timer for resend code
  useEffect(() => {
    const storedExpiry = localStorage.getItem('2faResendExpiry');
    if (storedExpiry) {
      const remaining = Math.round((storedExpiry - Date.now()) / 1000);
      if (remaining > 0) setTimer(remaining);
    }
  }, []);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            localStorage.removeItem('2faResendExpiry');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Handle login (Step 1)
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!formData.email || !formData.password) {
      setErrors({ submit: 'Please fill in all fields' });
      return;
    }

    setLoading(true);
    try {
      const response = await AuthService.login(formData.email, formData.password);
      setUserId(response.userId);
      setStep('2fa');
    } catch (error) {
      setErrors({ submit: error.message || 'Login failed' });
    } finally {
      setLoading(false);
    }
  };

  // Handle 2FA verification (Step 2)
  const handle2FASubmit = async (e) => {
    e.preventDefault();
    if (!formData.verificationCode) {
      setErrors({ verificationCode: 'Verification code is required' });
      return;
    }

    setLoading(true);
    try {
      const response = await AuthService.verify2FA(userId, formData.verificationCode);
      
      // First update the auth context
      login(response.user, response.token);

      // Then handle navigation based on user type and onboarding status
      if (response.user.role === 'tutor' && !response.user.onboardingCompleted) {
        console.log('Redirecting to tutor onboarding...');
        navigate('/tutor-onboarding', { replace: true });
      } else {
        navigate(`/${response.user.role}/dashboard`, { replace: true });
      }
    } catch (error) {
      setErrors({ submit: error.message || 'Verification failed' });
    } finally {
      setLoading(false);
    }
  };

  // Handle resend 2FA code
  const handleResendCode = async () => {
    try {
      await AuthService.resend2FACode(formData.email);
      const expiry = Date.now() + 60000;
      localStorage.setItem('2faResendExpiry', expiry);
      setTimer(60);
    } catch (error) {
      setErrors({ submit: error.message || 'Failed to resend code' });
    }
  };

  return (
    <div className="w-full max-w-md">
      {step === '2fa' ? (
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Two-Factor Authentication</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please enter the verification code sent to your email
          </p>
          <form onSubmit={handle2FASubmit} className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                name="verificationCode"
                value={formData.verificationCode}
                onChange={(e) => setFormData({ ...formData, verificationCode: e.target.value })}
                className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-red-500 focus:ring-red-500 text-center text-xl"
                placeholder="000000"
                maxLength="6"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Verifying...
                </>
              ) : (
                'Verify Code'
              )}
            </button>
            <div className="text-sm text-center">
              <button
                type="button"
                onClick={handleResendCode}
                disabled={timer > 0}
                className="text-red-600 hover:text-red-700 disabled:text-gray-400"
              >
                {timer > 0 ? `Resend code in ${timer}s` : 'Resend Code'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">
            New to StudyNINJAA?{' '}
            <Link to="/register" className="font-medium text-red-600 hover:text-red-500">
              Sign up
            </Link>
          </p>

          <form onSubmit={handleLoginSubmit} className="mt-8 space-y-6">
            {errors.submit && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                {errors.submit}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email address</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-red-500 focus:ring-red-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-red-500 focus:ring-red-500"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-red-600 hover:text-red-500">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;