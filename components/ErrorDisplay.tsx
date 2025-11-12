
import React from 'react';

interface ErrorDisplayProps {
  message: string;
  onDismiss: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onDismiss }) => (
  <div className="w-full max-w-2xl bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg relative mb-6 animate-fade-in" role="alert">
    <strong className="font-bold">Error: </strong>
    <span className="block sm:inline">{message}</span>
    <button onClick={onDismiss} className="absolute top-0 bottom-0 right-0 px-4 py-3">
      <span className="text-2xl font-thin">&times;</span>
    </button>
  </div>
);
