"use client";

import { useState } from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isPassword?: boolean;
}

export default function InputField({ label, isPassword = false, className = "", ...props }: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <div className="relative">
        <input
          type={isPassword ? (showPassword ? "text" : "password") : props.type || "text"}
          className={`w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-all ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <i className="fa-regular fa-eye-slash"></i>
            ) : (
              <i className="fa-regular fa-eye"></i>
            )}
          </button>
        )}
      </div>
    </div>
  );
}