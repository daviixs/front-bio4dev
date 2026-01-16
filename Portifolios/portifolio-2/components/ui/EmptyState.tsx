import React from "react";

interface EmptyStateProps {
  message?: string;
}

/**
 * Componente para estados vazios (sem dados)
 */
const EmptyState: React.FC<EmptyStateProps> = ({
  message = "No data available",
}) => {
  return <p className="text-gray-400 text-center py-8">{message}</p>;
};

export default EmptyState;
