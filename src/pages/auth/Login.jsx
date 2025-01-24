import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState('login');
  const [formData, setFormData] = useState({ email: '', password: '', verificationCode: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [userId, setUserId] = useState(null);

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
      login(response.user, response.token);
      navigate(`/${response.user.role}/dashboard`);
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
    <div className="w-full max-w-md p-4">
      {step === '2fa' ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Two-Factor Authentication</h2>
          <form onSubmit={handle2FASubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                name="verificationCode"
                value={formData.verificationCode}
                onChange={(e) => setFormData({ ...formData, verificationCode: e.target.value })}
                className="w-full px-3 py-2 border rounded-md text-center text-xl"
                placeholder="000000"
                maxLength="6"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>
            <div className="text-sm">
              <button
                type="button"
                onClick={handleResendCode}
                disabled={timer > 0}
                className="text-red-600 hover:text-red-700 disabled:text-gray-400"
              >
                {timer > 0 ? `Resend in ${timer}s` : 'Resend Code'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome Back</h2>
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            <div className="text-sm">
              <Link to="/forgot-password" className="text-red-600 hover:text-red-700">
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      )}
      {errors.submit && (
        <div className="mt-4 p-3 text-red-700 bg-red-100 rounded-md">
          {errors.submit}
        </div>
      )}
    </div>
  );
};

export default Login;