interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function DateInput({ label, className = "", ...props }: DateInputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <div className="relative">
        <input 
          type="date"
          className={`w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-all ${className}`}
          {...props}
        />
        {/* DELETE OR COMMENT OUT THE CODE BELOW */}
        {/* <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <i className="fa-regular fa-calendar"></i>
        </div> */}
      </div>
    </div>
  );
}