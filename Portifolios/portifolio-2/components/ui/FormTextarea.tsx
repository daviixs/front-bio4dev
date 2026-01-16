import React from "react";

interface FormTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}

/**
 * Textarea padronizado para edição inline
 */
const FormTextarea: React.FC<FormTextareaProps> = ({
  value,
  onChange,
  placeholder,
  rows = 3,
  className = "",
}) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`w-full bg-[#121318] border border-white/10 rounded-lg px-3 py-2 text-gray-300 text-sm focus:border-yellow-500 focus:outline-none resize-none ${className}`}
    />
  );
};

export default FormTextarea;
