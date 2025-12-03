
import React from 'react';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label: React.FC<LabelProps> = ({ children, className, ...props }) => {
  return (
    <label
      className={`block text-sm font-medium text-text-secondary ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};
