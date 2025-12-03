import React from 'react';

interface HeaderProps {
  onStartNew?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onStartNew }) => {
  return (
    <header className="bg-primary-dark shadow-md">
      <div className="container mx-auto px-4 lg:px-8 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            ✨ Marketing Copy Generator
          </h1>
          <p className="text-primary-light text-sm text-gray-200">
              Powered by Gemini AI
          </p>
        </div>
        {onStartNew && (
          <button
            onClick={onStartNew}
            className="bg-white text-primary-dark font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-dark focus:ring-white"
            aria-label="Start a new conversation"
          >
            Start New
          </button>
        )}
      </div>
    </header>
  );
};