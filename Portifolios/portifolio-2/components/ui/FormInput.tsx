import React from "react";

interface FormInputProps {
  type?: "text" | "url" | "email";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

/**
 * Input de formulário padronizado para edição inline
 */
const FormInput: React.FC<FormInputProps> = ({
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full bg-[#121318] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-yellow-500 focus:outline-none ${className}`}
    />
  );
};

export default FormInput;
