import { useState, useEffect } from "react";

export default function MultiSelectDropdown({ label, options }: { label: string, options: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!event.target.closest(`.multi-select-${label.replace(/\s/g, '')}`)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [label]);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      setSelected(selected.filter((item) => item !== option));
    } else {
      setSelected([...selected, option]);
    }
  };

  return (
    <div className={`space-y-1 relative multi-select-${label.replace(/\s/g, '')}`}>
      <label className="text-xs font-medium text-gray-700">{label}</label>
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center bg-white border border-gray-200 rounded-lg p-2.5 text-sm text-gray-600 focus:outline-none focus:border-[#0074D9] transition-colors"
        >
          <span className="truncate block max-w-[85%] text-left">
            {selected.length === 0
              ? "Select"
              : selected.join(", ")}
          </span>
          <i className={`fa-solid fa-chevron-down text-xs text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}></i>
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto custom-scrollbar animate-fade-in">
            {options.map((option, index) => (
              <label
                key={index}
                className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => toggleOption(option)}
                  className="w-4 h-4 rounded border-gray-300 text-[#0074D9] focus:ring-[#0074D9] cursor-pointer"
                />
                <span className="text-sm text-gray-700 select-none">{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}