import React from "react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  actionHref?: string;
}

/**
 * Componente de estado de erro reutilizável
 */
const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Profile not found",
  message = "This profile does not exist or is not published yet.",
  actionLabel = "Go back home",
  actionHref = "/",
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white px-6">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-gray-400 mb-8">{message}</p>
        <a
          href={actionHref}
          className="inline-block px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
        >
          {actionLabel}
        </a>
      </div>
    </div>
  );
};

export default ErrorState;
