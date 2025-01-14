// LoadingSpinner.js
import React from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary',
  className = '' 
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colors = {
    primary: 'text-red-600',
    secondary: 'text-gray-600',
    white: 'text-white'
  };

  return (
    <div className="flex justify-center items-center">
      <svg
        className={`
          animate-spin
          ${sizes[size]}
          ${colors[color]}
          ${className}
        `}
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
    </div>
  );
};

// Loading State Wrapper Component
export const LoadingState = ({
  loading,
  children,
  spinnerSize = 'lg',
  spinnerColor = 'primary',
  overlay = false,
  center = true
}) => {
  if (!loading) return children;

  if (overlay) {
    return (
      <div className="relative">
        {children}
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
          <LoadingSpinner size={spinnerSize} color={spinnerColor} />
        </div>
      </div>
    );
  }

  return (
    <div className={center ? 'flex items-center justify-center min-h-[200px]' : ''}>
      <LoadingSpinner size={spinnerSize} color={spinnerColor} />
    </div>
  );
};

export default LoadingSpinner;