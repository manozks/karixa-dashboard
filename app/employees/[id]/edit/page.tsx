"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

// =========================================================================
// HELPER COMPONENTS (With defaultValue support)
// =========================================================================

function Accordion({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white mb-4 shadow-sm animate-fade-in">
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <h3 className="font-bold text-gray-800 text-sm">{title}</h3>
        <i className={`fa-solid fa-chevron-down text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100 p-6 border-t border-gray-100' : 'max-h-0 opacity-0 p-0 overflow-hidden'}`}>
        {children}
      </div>
    </div>
  );
}

function InputField({ label, placeholder, type = "text", defaultValue, disabled }: any) {
  return (
    <div className="space-y-1 w-full">
      <label className="text-xs font-medium text-gray-700">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder} 
        defaultValue={defaultValue} 
        disabled={disabled}
        className={`w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#0074D9] ${disabled ? 'bg-gray-100 text-gray-500' : ''}`} 
      />
    </div>
  );
}

function SelectInput({ label, options, defaultValue }: any) {
  return (
    <div className="space-y-1 w-full">
      <label className="text-xs font-medium text-gray-700">{label}</label>
      <select defaultValue={defaultValue} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white text-gray-700 outline-none focus:border-[#0074D9]">
        <option value="">Select</option>
        {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function DateInput({ label, defaultValue }: any) {
  return (
    <div className="space-y-1 w-full">
      <label className="text-xs font-medium text-gray-700">{label}</label>
      <input type="date" defaultValue={defaultValue} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#0074D9] text-gray-600" />
    </div>
  );
}

function RadioGroup({ label, options, name, defaultValue }: { label: string, options: string[], name: string, defaultValue?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-gray-700">{label}</label>
      <div className="flex flex-wrap gap-4">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer">
            <input 
                type="radio" 
                name={name} 
                defaultChecked={opt === defaultValue}
                className="w-4 h-4 text-[#0074D9] focus:ring-[#0074D9] border-gray-300" 
            />
            <span className="text-sm text-gray-600">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function StepIndicator({ num, label, sub, current }: any) {
   const active = current >= num;
   return (
      <div className={`flex items-center gap-3 transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-50'}`}>
         <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ${current === num ? 'bg-[#0074D9] text-white' : 'bg-blue-100 text-[#0074D9]'}`}>{num}</div>
         <div className="text-left hidden md:block">
            <p className={`text-sm font-bold ${current === num ? 'text-[#0074D9]' : 'text-gray-500'}`}>{label}</p>
            <p className="text-[10px] text-gray-400 font-medium">{sub}</p>
         </div>
      </div>
   )
}

// =========================================================================
// MAIN EDIT PAGE COMPONENT
// =========================================================================

export default function EditEmployeePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const params = useParams(); // Fetch ID from URL (e.g. /employees/123/edit)
  const [loading, setLoading] = useState(true);

  // Simulate Fetching Data
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = () => {
    // Logic to update employee would go here
    router.push('/employees');
  };

 

  return (
    <DashboardLayout>
       <div className="flex flex-col h-full bg-gray-50/50 p-0 pb-20">
          
          {/* Header */}
          <div className="mb-6 px-1 flex flex-col gap-2">
             <Link href="/employees" className="text-gray-500 text-sm hover:text-gray-800 flex items-center gap-2 w-fit">
                <i className="fa-solid fa-arrow-left"></i> Back
             </Link>
             <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Edit Employee: Olivia Thompson</h1>
                    <p className="text-sm text-gray-500 mt-1">Update personal details, role, and system access.</p>
                </div>
                <div className="text-right hidden md:block">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold border border-green-200">Active</span>
                </div>
             </div>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
             
             {/* Stepper */}
             <div className="bg-blue-50/50 rounded-xl p-6 mb-4 flex flex-col md:flex-row justify-between items-center gap-4 border border-blue-100/50">
                <StepIndicator num={1} label="Identity" sub="Personal Details" current={currentStep} />
                <div className="hidden md:block w-12 h-px bg-gray-300"></div>
                <StepIndicator num={2} label="Employment" sub="Role & Status" current={currentStep} />
                <div className="hidden md:block w-12 h-px bg-gray-300"></div>
                <StepIndicator num={3} label="Access" sub="System & Notes" current={currentStep} />
             </div>

             {/* Form Content */}
             <div className="space-y-6">
                
                {/* ================= STEP 1: IDENTITY ================= */}
                {currentStep === 1 && (
                   <div className="animate-slide-up space-y-4">
                      
                      {/* Section A */}
                      <Accordion title="Basic Information" defaultOpen={true}>
                         <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
                            <SelectInput label="Title" options={["Ms.", "Mrs.", "Mr.", "Dr."]} defaultValue="Ms." />
                            <InputField label="First Name*" defaultValue="Olivia" />
                            <InputField label="Middle Name" defaultValue="Grace" />
                            <InputField label="Last Name*" defaultValue="Thompson" />
                            <SelectInput label="Suffix" options={["None", "Jr.", "Sr."]} defaultValue="None" />
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                            <SelectInput label="Gender*" options={["Female", "Male", "Other"]} defaultValue="Female" />
                            <DateInput label="Date of Birth*" defaultValue="1990-05-15" />
                            <SelectInput label="Marital Status" options={["Single", "Married", "Divorced"]} defaultValue="Single" />
                            <InputField label="SSN* (Masked)" defaultValue="***-**-1234" disabled />
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                             <SelectInput label="Race" options={["Asian", "American indian", "African American or Black", "Hispanic or Latino", "White or Caucasian", "European American", "Multiracial", "Native Hawaiian",  "Pacific Islander", "Unknown"]} />
                             <SelectInput label="Primary Language" options={["English", "Mandarin", "Hindi", "Spanish", "French", "Modern Standard Arabic", "Portuguese", "Russian", "Bengali", "Urdu", "German", "Italian", "Japanese", "Nigerian Pidgin"]} />
                             <SelectInput label="Secondary Language" options={["English", "Mandarin", "Hindi", "Spanish", "French", "Modern Standard Arabic", "Portuguese", "Russian", "Bengali", "Urdu", "German", "Italian", "Japanese", "Nigerian Pidgin"]} />
                         </div>
                      </Accordion>

                      {/* Section B */}
                      <Accordion title="Contact Information">
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <InputField label="Mobile Phone*" defaultValue="(202) 555-0101" />
                            <InputField label="Home Phone" />
                            <InputField label="Personal Email*" defaultValue="olivia.thompson@email.com" type="email" />
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <InputField label="Street Address 1*" defaultValue="789 Pine Road" />
                            <InputField label="Street Address 2" defaultValue="Apt 202" />
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <InputField label="City*" defaultValue="Alexandria" />
                            <SelectInput label="State*" options={["VA", "MD", "DC"]} defaultValue="VA" />
                            <InputField label="Zip Code*" defaultValue="22314" />
                            <SelectInput label="County" options={["Fairfax", "Arlington"]} defaultValue="Fairfax" />
                         </div>
                      </Accordion>

                      {/* Section C */}
                      <Accordion title="Emergency Contact">
                         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <InputField label="Contact Name*" defaultValue="Mark Thompson" />
                            <SelectInput label="Relationship*" options={["Parent", "Spouse", "Sibling"]} defaultValue="Parent" />
                            <InputField label="Phone Number*" defaultValue="(202) 555-9999" />
                            <InputField label="Email (Optional)" />
                         </div>
                      </Accordion>
                   </div>
                )}

                {/* ================= STEP 2: EMPLOYMENT ================= */}
                {currentStep === 2 && (
                   <div className="animate-slide-up space-y-4">
                      
                      {/* Section A */}
                      <Accordion title="Role & Department" defaultOpen={true}>
                         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                            <InputField label="Employee ID*" defaultValue="CN-10001" disabled />
                            <SelectInput label="Department*" options={["Clinical", "HR", "Admin"]} defaultValue="Clinical" />
                            <InputField label="Job Title*" defaultValue="Senior Nurse" />
                            <SelectInput label="Supervisor*" options={["John Doe", "Jane Smith"]} defaultValue="Jane Smith" />
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <SelectInput label="Employment Status*" options={["Active", "Leave", "Terminated"]} defaultValue="Active" />
                            <SelectInput label="Employment Type*" options={["Full-Time", "Part-Time"]} defaultValue="Full-Time" />
                            <SelectInput label="Work Location" options={["Main Office", "Remote"]} defaultValue="Main Office" />
                            <InputField label="Region Code" defaultValue="NA-East" />
                         </div>
                      </Accordion>

                      {/* Section B */}
                      <Accordion title="Dates & Schedule">
                         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                            <DateInput label="Hire Date*" defaultValue="2023-02-01" />
                            <DateInput label="Start Date*" defaultValue="2023-02-05" />
                            <DateInput label="Review Date" defaultValue="2024-02-05" />
                            <DateInput label="Termination Date" />
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex gap-4">
                               <InputField label="Shift Start" type="time" defaultValue="08:30" />
                               <InputField label="Shift End" type="time" defaultValue="19:00" />
                            </div>
                            <SelectInput label="Time Zone" options={["EST", "CST", "PST"]} defaultValue="EST" />
                         </div>
                      </Accordion>

                      {/* Section C */}
                      <Accordion title="Compensation">
                         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <SelectInput label="Pay Type" options={["Hourly", "Salary"]} defaultValue="Hourly" />
                            <InputField label="Pay Rate ($)" defaultValue="45.00" />
                            <SelectInput label="Pay Frequency" options={["Bi-Weekly", "Weekly"]} defaultValue="Bi-Weekly" />
                            <InputField label="Payroll ID" defaultValue="PR-998877" />
                         </div>
                      </Accordion>
                   </div>
                )}

                {/* ================= STEP 3: ACCESS ================= */}
                {currentStep === 3 && (
                   <div className="animate-slide-up space-y-4">
                      
                      {/* Section A */}
                      <Accordion title="System Access" defaultOpen={true}>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <InputField label="System Username / Email*" defaultValue="olivia.thompson@agency.com" disabled />
                            <SelectInput label="System Role*" options={["Standard User", "Manager", "Admin"]} defaultValue="Standard User" />
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <RadioGroup label="Enable Portal Access" name="portal" options={["Yes", "No"]} defaultValue="Yes" />
                            <RadioGroup label="Two-Factor Auth" name="2fa" options={["Required", "Optional"]} defaultValue="Required" />
                            <RadioGroup label="Account Status" name="accStatus" options={["Active", "Suspended"]} defaultValue="Active" />
                         </div>
                      </Accordion>

                      {/* Section B */}
                      <Accordion title="Additional Notes">
                         <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-700">Internal Notes</label>
                            <textarea 
                               className="w-full border border-gray-200 rounded-lg p-3 text-sm h-32 resize-none focus:border-[#0074D9] outline-none" 
                               defaultValue="Certified in advanced CPR. Available for weekend shifts if needed."
                            ></textarea>
                         </div>
                      </Accordion>
                   </div>
                )}

             </div>

             {/* Footer Actions */}
             <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                {currentStep > 1 && (
                   <button 
                      onClick={() => setCurrentStep(prev => prev - 1)}
                      className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                   >
                      Back
                   </button>
                )}
                
                {currentStep < 3 ? (
                   <button 
                      onClick={() => setCurrentStep(prev => prev + 1)}
                      className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-lg transition-colors"
                   >
                      Next Step
                   </button>
                ) : (
                   <button 
                      onClick={handleSave}
                      className="bg-green-600 text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 shadow-lg transition-colors flex items-center gap-2"
                   >
                      <i className="fa-solid fa-check"></i> Save Changes
                   </button>
                )}
             </div>

          </div>
       </div>
    </DashboardLayout>
  );
}