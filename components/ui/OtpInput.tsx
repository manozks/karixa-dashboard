"use client";

import { useState, useRef, KeyboardEvent, ChangeEvent } from "react";

interface OtpInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
}

export default function OtpInput({ length = 6, onComplete }: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return; // Only allow numbers

    const newOtp = [...otp];
    // Allow only one digit per input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Trigger onComplete if all fields are filled
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length && onComplete) {
      onComplete(combinedOtp);
    }

    // Move to next input if value is entered
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move to previous input on Backspace if current is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleFocus = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <div className="flex gap-3 justify-between">
      {otp.map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={otp[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={handleFocus}
          className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-lg text-center font-bold text-lg text-gray-800 focus:outline-none focus:border-[#0084C7] focus:ring-1 focus:ring-[#0084C7]/20 transition-all"
        />
      ))}
    </div>
  );
}