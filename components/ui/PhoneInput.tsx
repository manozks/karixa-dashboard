"use client";

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function PhoneInput({ label, className = "", ...props }: PhoneInputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {/* Label */}
      <label className="text-sm font-medium text-gray-600">{label}</label>
      
      <div className="relative flex items-center">
        {/* Prefix Span - Fixed +61 as shown in image */}
        <span className="absolute left-4 text-gray-500 text-sm pointer-events-none">
          +1
        </span>

        <input
          type="tel"
          // Added padding-left (pl-12) for the prefix and padding-right (pr-10) for the icon
          className={`w-full bg-gray-50 border border-gray-200 rounded-lg pl-12 pr-10 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-all placeholder-gray-400 ${className}`}
          placeholder="0000000000" // Placeholder matching image
          {...props}
        />

        {/* Phone Icon on the right */}
        <div className="absolute right-4 text-gray-400 pointer-events-none flex items-center">
             {/* Assuming FontAwesome is loaded */}
             <i className="fa-solid fa-phone-flip text-sm"></i>
        </div>
      </div>
    </div>
  );
}