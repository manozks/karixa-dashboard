"use client";

import { useState, useRef, useEffect } from "react";

const skillOptions = [
  "DODD Medication Category 1",
  "DODD Medication Category 2",
  "DODD Medication Category 3",
  "Vagus Nerve Stimulator (VNS) Certified",
  "Hoyer Lift",
  "Gait Belt Transfers",
  "Catheter Care",
  "Licensed Driver",
  "Severe Behavior Experience",
  "Seizure Experience",
  "Dementia Care Experience",
  "Wound Care Certified (LPNs & RNs only)"
];

export default function MultiSelectSkills() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle selection
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-64" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-[#0074D9]"
      >
        <span className="truncate">
          {selectedSkills.length > 0 
            ? `${selectedSkills.length} Skills Selected` 
            : "Skills"}
        </span>
        <i className={`fa-solid fa-chevron-down text-xs transition-transform ${isOpen ? "rotate-180" : ""}`}></i>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto custom-scrollbar">
          {skillOptions.map((skill, index) => (
            <label
              key={index}
              className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors text-sm text-gray-700"
            >
              <input
                type="checkbox"
                checked={selectedSkills.includes(skill)}
                onChange={() => toggleSkill(skill)}
                className="w-4 h-4 rounded border-gray-300 text-[#0074D9] focus:ring-[#0074D9]"
              />
              <span className="leading-snug">{skill}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}