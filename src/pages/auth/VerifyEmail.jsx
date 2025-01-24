import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const { state } = location;

  // Timer and local storage logic
  useEffect(() => {
    const storedExpiry = localStorage.getItem('emailVerificationExpiry');
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
            localStorage.removeItem('emailVerificationExpiry');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const startTimer = () => {
    const expiry = Date.now() + 60000; // 1 minute
    localStorage.setItem('emailVerificationExpiry', expiry);
    setTimer(60);
  };

  const handleResend = async () => {
    try {
      const response = await AuthService.resendVerificationCode(state?.email);
      console.log(response); 
      setErrors({ submit: response.message });   
  
    } catch (error) {
      setErrors({ submit: error.message || 'Failed to resend code' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await AuthService.verifyEmail(state?.email, code);
      localStorage.removeItem('emailVerificationExpiry');
      navigate('/login', {
        state: { message: 'Email verified successfully! Please login' }
      });
    } catch (error) {
      setErrors({ submit: error.message || 'Verification failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-4">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          Verify Your Email
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          We've sent a verification code to
        </p>
        <p className="text-sm font-medium text-gray-800">
          {state?.email}
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`appearance-none block w-full px-3 py-2 border text-center text-2xl tracking-widest ${
                errors.code ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500`}
              placeholder="000000"
            />
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
              'Verify Email'
            )}
          </button>
        </div>

        <div className="text-center">
          <button
            type="button"
            disabled={timer > 0}
            onClick={handleResend}
            className="text-sm font-medium text-red-600 hover:text-red-500 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            {timer > 0 ? `Resend code in ${timer}s` : 'Resend code'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyEmail;