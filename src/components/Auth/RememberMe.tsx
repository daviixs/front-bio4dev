import React, { useState } from 'react';

interface RememberMeProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function RememberMe({ checked: controlledChecked, onChange }: RememberMeProps) {
  const [internalChecked, setInternalChecked] = useState(false);
  const checked = controlledChecked !== undefined ? controlledChecked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    if (onChange) {
      onChange(newChecked);
    } else {
      setInternalChecked(newChecked);
    }
  };

  return (
    <div className="flex items-center gap-2.5">
      <label className="relative inline-flex items-center cursor-pointer group">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className="sr-only peer"
          aria-label="Remember me"
        />
        {/* Switch Track */}
        <div className={`
          relative w-11 h-6 rounded-full transition-colors duration-200
          ${checked ? 'bg-blue-600' : 'bg-gray-300'}
          peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 peer-focus:ring-offset-2
        `}>
          {/* Switch Thumb */}
          <div className={`
            absolute top-[2px] left-[2px] 
            w-5 h-5 bg-white rounded-full
            transition-transform duration-200 ease-in-out
            ${checked ? 'translate-x-5' : 'translate-x-0'}
            shadow-sm
          `} />
        </div>
        <span className="text-sm text-gray-700 font-medium select-none">
          Remember me
        </span>
      </label>
    </div>
  );
}
