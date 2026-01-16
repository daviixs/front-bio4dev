import React from "react";

interface LoadingSpinnerProps {
  message?: string;
}

/**
 * Componente de loading reutilizável
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading...",
}) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505]">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500" />
        <p className="text-gray-400 text-sm">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
