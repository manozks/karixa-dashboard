"use client";

import { useState, useRef, useEffect } from "react";

interface MultiSelectInputProps {
  label: string;
  options: string[];
  placeholder?: string;
  defaultSelected?: string[];
  onChange?: (selected: string[]) => void;
}

export default function MultiSelectInput({ 
  label, 
  options, 
  placeholder = "Select options...", 
  defaultSelected = [],
  onChange 
}: MultiSelectInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(defaultSelected);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleOption = (option: string) => {
    let newSelected;
    if (selected.includes(option)) {
      newSelected = selected.filter((item) => item !== option);
    } else {
      newSelected = [...selected, option];
    }
    setSelected(newSelected);
    if (onChange) onChange(newSelected);
  };

  const removeOption = (e: React.MouseEvent, option: string) => {
    e.stopPropagation(); // Prevent dropdown from toggling when clicking the 'x'
    const newSelected = selected.filter((item) => item !== option);
    setSelected(newSelected);
    if (onChange) onChange(newSelected);
  };

  return (
    <div className="space-y-1 w-full relative" ref={dropdownRef}>
      <label className="text-xs font-medium text-gray-700">{label}</label>
      
      {/* Input / Trigger */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`min-h-[42px] w-full border rounded-lg p-1.5 text-sm bg-white cursor-pointer flex flex-wrap gap-1.5 items-center transition-colors ${
          isOpen ? "border-[#0074D9] ring-1 ring-blue-100" : "border-gray-200 hover:bg-gray-50"
        }`}
      >
        {selected.length === 0 ? (
          <span className="text-gray-400 pl-1">{placeholder}</span>
        ) : (
          selected.map((item) => (
            <span 
              key={item} 
              className="flex items-center gap-1 bg-blue-50 text-[#0074D9] px-2 py-1 rounded text-xs font-medium border border-blue-100 animate-fade-in"
            >
              {item}
              <button 
                type="button"
                onClick={(e) => removeOption(e, item)}
                className="hover:bg-blue-200 text-blue-500 rounded-full w-4 h-4 flex items-center justify-center transition-colors"
              >
                <i className="fa-solid fa-xmark text-[10px]"></i>
              </button>
            </span>
          ))
        )}
        
        {/* Dropdown Arrow */}
        <div className="ml-auto text-gray-400 pr-1">
          <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto animate-slide-up">
          {options.map((option) => (
            <label 
              key={option} 
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
            >
              <input 
                type="checkbox" 
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
                className="w-4 h-4 text-[#0074D9] rounded border-gray-300 focus:ring-[#0074D9] cursor-pointer"
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}