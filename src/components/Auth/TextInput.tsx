import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface TextInputProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'tel';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  required?: boolean;
  showPasswordToggle?: boolean;
}

export function TextInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  name,
  id,
  required = false,
  showPasswordToggle = false,
}: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = showPasswordToggle && type === 'password' 
    ? (showPassword ? 'text' : 'password')
    : type;

  return (
    <div className="w-full">
      <label 
        htmlFor={id || name} 
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full px-4 py-3 rounded-lg bg-gray-100 border-0
            text-gray-900 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-0
            transition-all duration-200
            ${isFocused ? 'bg-white shadow-sm' : 'bg-gray-100'}
          `}
          aria-label={label}
        />
        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
