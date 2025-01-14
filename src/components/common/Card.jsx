// Card.js
import React from 'react';

const Card = ({
  children,
  title,
  subtitle,
  className = '',
  padding = 'normal',
  hover = false,
  onClick
}) => {
  const baseStyles = 'bg-white rounded-lg shadow-sm border border-gray-200';
  
  const paddingSizes = {
    none: '',
    small: 'p-4',
    normal: 'p-6',
    large: 'p-8'
  };

  const hoverStyles = hover 
    ? 'transition-transform duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer' 
    : '';

  return (
    <div 
      onClick={onClick}
      className={`
        ${baseStyles}
        ${paddingSizes[padding]}
        ${hoverStyles}
        ${className}
      `}
    >
      {title && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;