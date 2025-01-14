// Input.js
import React from 'react';

const Input = ({
  type = 'text',
  label,
  error,
  required = false,
  disabled = false,
  className = '',
  placeholder = '',
  value,
  onChange,
  name,
  id,
  ...props
}) => {
  const inputId = id || name;
  
  const baseInputStyles = 'block w-full rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500';
  
  const stateStyles = {
    normal: 'border-gray-300 focus:border-red-500',
    error: 'border-red-500 focus:border-red-500',
    disabled: 'bg-gray-100 cursor-not-allowed opacity-75'
  };

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label 
          htmlFor={inputId}
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        type={type}
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`
          ${baseInputStyles}
          ${error ? stateStyles.error : stateStyles.normal}
          ${disabled ? stateStyles.disabled : ''}
          px-4 py-2 text-gray-900 placeholder-gray-400
        `}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;