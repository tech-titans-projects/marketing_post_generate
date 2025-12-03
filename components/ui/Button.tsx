
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`
        py-3 px-6 bg-primary hover:bg-primary-light text-white font-bold 
        rounded-lg shadow-md transition-all duration-300 ease-in-out 
        transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 
        focus:ring-offset-2 focus:ring-primary-light
        disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
