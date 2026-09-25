import React from "react";

interface FormGroupProps {
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
}

export function FormGroup({
  label,
  type,
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
}: FormGroupProps) {
  return (
    <div className="mb-4 text-left">
      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
        {label} {required && <span className="text-pink-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700/60 focus:border-purple-500 rounded-xl text-white placeholder-slate-500 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-purple-500/20"
      />
    </div>
  );
}
