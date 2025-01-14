// Badge.js
import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  rounded = 'full',
  className = ''
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium';
  
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-red-100 text-red-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    
    // Outlined versions
    'outline-default': 'border border-gray-300 text-gray-800',
    'outline-primary': 'border border-red-500 text-red-800',
    'outline-success': 'border border-green-500 text-green-800',
    'outline-warning': 'border border-yellow-500 text-yellow-800',
    'outline-danger': 'border border-red-500 text-red-800',
    'outline-info': 'border border-blue-500 text-blue-800'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base'
  };

  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };

  return (
    <span
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${roundedStyles[rounded]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;