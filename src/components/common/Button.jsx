// Button.js
import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className = ''
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 focus:ring-gray-500 text-gray-900',
    outline: 'border-2 border-red-600 hover:bg-red-50 focus:ring-red-500 text-red-600',
    danger: 'bg-red-500 hover:bg-red-600 focus:ring-red-400 text-white',
    ghost: 'hover:bg-gray-100 focus:ring-gray-500 text-gray-700'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${widthClass}
        ${disabledClass}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;