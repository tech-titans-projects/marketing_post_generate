
import React from 'react';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select: React.FC<SelectProps> = ({ children, className, ...props }) => {
  return (
    <select
      className={`
        w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
        focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent
        transition-shadow duration-200 appearance-none bg-white
        ${className}
      `}
      {...props}
    >
      {children}
    </select>
  );
};
