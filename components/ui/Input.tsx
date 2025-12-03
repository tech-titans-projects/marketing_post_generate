import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`
        w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white
        focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent
        transition-shadow duration-200
        ${className}
      `}
      {...props}
    />
  );
};
