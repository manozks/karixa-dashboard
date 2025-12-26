interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
}

export default function SelectInput({ label, options, className = "", ...props }: SelectInputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <select 
        className={`w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-all appearance-none ${className}`}
        {...props}
      >
        <option value="" disabled selected>Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}