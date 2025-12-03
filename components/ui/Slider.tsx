
import React from 'react';

type SliderProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Slider: React.FC<SliderProps> = ({ className, ...props }) => {
  return (
    <input
      type="range"
      className={`
        w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:w-5
        [&::-webkit-slider-thumb]:h-5
        [&::-webkit-slider-thumb]:bg-primary
        [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:shadow-md
        [&::-moz-range-thumb]:w-5
        [&::-moz-range-thumb]:h-5
        [&::-moz-range-thumb]:bg-primary
        [&::-moz-range-thumb]:rounded-full
        [&::-moz-range-thumb]:border-0
        ${className}
      `}
      {...props}
    />
  );
};
