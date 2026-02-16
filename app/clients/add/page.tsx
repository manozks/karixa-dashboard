"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import MultiSelectDropdown from "@/components/MultiSelectDropdown";
import Link from "next/link";
import { useRouter } from "next/navigation";

// =========================================================================
// HELPER COMPONENTS (Locally defined for self-contained code)
// =========================================================================

function Accordion({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white mb-4 shadow-sm animate-fade-in">
      <button 
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

function InputField({ label, placeholder, type = "text" }: any) {
  return (
    <div className="space-y-1 w-full">
      <label className="text-xs font-medium text-gray-700">{label}</label>
      <input type={type} placeholder={placeholder} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#0074D9]" />
    </div>
  );
}

function SelectInput({ label, options }: any) {
  return (
    <div className="space-y-1 w-full">
      <label className="text-xs font-medium text-gray-700">{label}</label>
      <select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white text-gray-500 outline-none focus:border-[#0074D9]">
        <option>Select</option>
        {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function DateInput({ label }: any) {
  return (
    <div className="space-y-1 w-full">
      <label className="text-xs font-medium text-gray-700">{label}</label>
      <input type="date" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#0074D9] text-gray-500" />
    </div>
  );
}

function RadioGroup({ label, options, name }: { label: string, options: string[], name: string }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-gray-700">{label}</label>
      <div className="flex flex-wrap gap-4">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name={name} className="w-4 h-4 text-[#0074D9] focus:ring-[#0074D9] border-gray-300" />
            <span className="text-sm text-gray-600">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function Checkbox({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
      <input type="checkbox" className="w-4 h-4 text-[#0074D9] rounded border-gray-300 focus:ring-[#0074D9]" />
      <span className="text-sm text-gray-700 font-medium">{label}</span>
    </label>
  );
}

function Toggle({ label }: { label: string }) {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setEnabled(!enabled)}>
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${enabled ? 'bg-[#0074D9]' : 'bg-gray-300'}`}>
        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-4' : 'translate-x-1'}`} />
      </div>
    </div>
  );
}

function FileUpload({ label }: { label: string }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-700">{label}</label>
      <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
        <i className="fa-solid fa-cloud-arrow-up text-gray-400 mb-1"></i>
        <span className="text-xs text-gray-500">Click to upload</span>
      </div>
    </div>
  );
}

function StepIndicator({ num, label, sub, current }: any) {
   const active = current >= num;
   return (
      <div className={`flex items-center gap-2 ${active ? 'opacity-100' : 'opacity-50'}`}>
         <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${current === num ? 'bg-[#0074D9] text-white shadow-lg' : 'bg-blue-100 text-[#0074D9]'}`}>{num}</div>
         <div className="text-left hidden md:block">
            <p className={`text-sm font-bold ${current === num ? 'text-[#0074D9]' : 'text-gray-500'}`}>{label}</p>
            <p className="text-[10px] text-gray-400">{sub}</p>
         </div>
      </div>
   )
}

// =========================================================================
// MAIN MODAL COMPONENT
// =========================================================================

export default function AddClientModal() {
  const [currentStep, setCurrentStep] = useState(1);
  const [mounted, setMounted] = useState(false);
  
  // 3. Initialize Router
  const router = useRouter();

  // 4. Handle Close Logic (Navigate back to clients list)
  const handleClose = () => {
    router.push('/clients'); 
  };

  useEffect(() => { setMounted(true); document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "unset"; }; }, []);
  if (!mounted) return null;
  
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       {/* Modal Container */}
       <div className="bg-white rounded-2xl w-full max-w-6xl shadow-2xl flex flex-col max-h-[90vh] animate-slide-up relative">
          
          {/* 1. Header */}
          <div className="p-6 border-b border-gray-100 relative bg-white rounded-t-2xl z-10">
           <button 
               type="button"
               onClick={(e) => { e.stopPropagation(); handleClose(); }} 
               className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 z-50 cursor-pointer"
             >
                <i className="fa-solid fa-xmark text-xl pointer-events-none"></i>
             </button>
             <h2 className="text-2xl font-bold text-gray-800">Add New Client</h2>
             <p className="text-sm text-gray-500 mt-1">Fill in the details to onboard a new client.</p>
          </div>

          {/* 2. Stepper (Progress Bar) */}
          <div className="bg-blue-50/50 py-4 border-b border-gray-100 flex justify-center sticky top-0 z-10">
             <div className="flex items-center gap-6 md:gap-12">
                <StepIndicator num={1} label="Identity" sub="Basic Info, Address, Emergency" current={currentStep} />
                <div className="hidden md:block w-12 h-px bg-gray-300"></div>
                <StepIndicator num={2} label="Payer" sub="Medicaid, MCO, Billing" current={currentStep} />
                <div className="hidden md:block w-12 h-px bg-gray-300"></div>
                <StepIndicator num={3} label="Service" sub="Tasks, Safety, Compliance" current={currentStep} />
             </div>
          </div>

          {/* 3. Scrollable Form Content */}
          <div className="p-8 overflow-y-auto flex-1 custom-scrollbar bg-gray-50/30">
             
             {/* ================= STEP 1: IDENTITY ================= */}
             {currentStep === 1 && (
                <div className="animate-slide-up space-y-4">
                   {/* Section A */}
                   <Accordion title="B asic Information" defaultOpen={true}>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                         <SelectInput label="Title" options={["None", "Mr.", "Mrs.", "Ms.", "Miss", "Mx.", "Dr."]} />
                         <InputField label="First Name*" placeholder="Enter" />
                         <InputField label="Middle Name" placeholder="Enter" />
                         <InputField label="Last Name*" placeholder="Enter" />
                         <InputField label="Preferred Name" placeholder="Enter" />
                         <SelectInput label="Suffix" options={["None", "Jr.", "Sr.", "II", "III", "RN", "LPN", "CNA"]} />
                         <SelectInput label="Gender*" options={["Male", "Female", "Other", "Prefer Not to Say"]} />
                         <SelectInput label="Marial Status" options={["Single", "Married", "Divorced", "Widowed"]} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">                         
                         <DateInput label="Date of Birth*" />
                         <InputField label="Client ID" placeholder="Auto-generated" disabled />
                         <InputField label="State ID" placeholder="Enter" />
                          <InputField label="Driver’s License" placeholder="Enter" />
                          <InputField label="PASSPORT" placeholder="Enter" />
                          <InputField label="Military ID" placeholder="Enter" />
                          <InputField label="USCIS ID" placeholder="Enter" />
                          <SelectInput label="Primary Language" options={["English", "Mandarin", "Hindi", "Spanish", "French", "Modern Standard Arabic", "Portuguese", "Russian", "Bengali", "Urdu", "German", "Italian", "Japanese", "Nigerian Pidgin"]} />
                          <MultiSelectDropdown label="Secondary Language" options={["English", "Mandarin", "Hindi", "Spanish", "French", "Modern Standard Arabic", "Portuguese", "Russian", "Bengali", "Urdu", "German", "Italian", "Japanese", "Nigerian Pidgin"]} />
                           <MultiSelectDropdown label="Race" options={["Asian", "American indian", "African American or Black", "Hispanic or Latino", "White or Caucasian", "European American", "Multiracial", "Native Hawaiian",  "Pacific Islander", "Unknown"]} />
                            
                           
      <InputField label="Occupation" placeholder="Enter Occupation" />
        <InputField label="SSN* (Medicaid only)" placeholder="XXX-XX-1234" />
 
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <SelectInput 
         label="Status" 
         options={[
            "Active",  
            "Inactive (Personal Leave)", 
            "Inactive (No Shifts)", 
          
            "On Hold"
         ]} 
      />
                         <InputField label="Phone*" placeholder="(555) 000-0000" />
                         <InputField label="Secondary Phone" placeholder="(555) 000-0000" />
                         <InputField label="Email" placeholder="example@email.com" type="email" />
                      </div>
                   </Accordion>

                   {/* Section B */}
                   <Accordion title="Address">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                         <InputField label="Street Address 1*" placeholder="123 Main St" />
                         <InputField label="Street Address 2" placeholder="Apt, Suite, Unit" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                         <InputField label="City*" placeholder="Enter City" />
                         <SelectInput label="State*" options={["Ohio", "Michigan", "Kentucky", "Indiana"]} />
                         <InputField label="Zip Code*" placeholder="12345" />
                         <SelectInput label="County*" options={["Franklin", "Cuyahoga", "Hamilton", "Summit"]} />
                      </div>
                   </Accordion>

                   {/* Section C */}
                   <Accordion title="Emergency Contact">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                         <InputField label="Contact Name*" placeholder="Full Name" />
                         <SelectInput label="Relationship*" options={["Spouse", "Daughter", "Son", "Friend", "Other"]} />
                         <InputField label="Phone*" placeholder="(555) 000-0000" />
                         <InputField label="Email" placeholder="email@example.com" type="email" />
                      </div>
                   </Accordion>

                   {/* Section D */}
                   <Accordion title="Funding Type">
                      <RadioGroup label="Select Funding Source" name="funding" options={["Medicaid Waiver", "Medicaid Managed Care (MCO)", "Private Pay"]} />
                   </Accordion>
                </div>
             )}

             {/* ================= STEP 2: PAYER ================= */}
             {currentStep === 2 && (
                <div className="animate-slide-up space-y-4">
                   {/* Section A */}
                   <Accordion title="Medicaid Details" defaultOpen={true}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                         <InputField label="Medicaid Number*" placeholder="Enter Number" />
                         <SelectInput label="Waiver Program*" options={["PASSPORT", "MyCare Ohio", "Ohio Home Care Waiver"]} />
                         <SelectInput label="MCO Name*" options={["CareSource", "Buckeye Health Plan", "Molina Healthcare"]} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                         <InputField label="Case Manager Name*" placeholder="Full Name" />
                         <InputField label="Case Manager Phone*" placeholder="(555) 000-0000" />
                         <InputField label="Case Manager Email" placeholder="email@agency.com" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <DateInput label="Eligibility Start Date*" />
                         <DateInput label="Eligibility End Date" />
                      </div>
                   </Accordion>

                   {/* Section B */}
                   <Accordion title="Responsible Party / Billing">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                         <InputField label="Responsible Party Name*" placeholder="Full Name" />
                         <SelectInput label="Relationship*" options={["Self", "Guardian", "Family Member"]} />
                         <InputField label="Billing Address*" placeholder="Full Address" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                         <InputField label="Phone*" placeholder="(555) 000-0000" />
                         <InputField label="Email" placeholder="billing@email.com" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                         <div className="col-span-2"><RadioGroup label="Rate Type*" name="rateType" options={["Hourly", "Daily", "Live-In Flat Rate"]} /></div>
                         <InputField label="Hourly Rate*" placeholder="$0.00" />
                         <SelectInput label="Billing Frequency*" options={["Weekly", "Bi-Weekly", "Monthly"]} />
                      </div>
                   </Accordion>
                </div>
             )}

             {/* ================= STEP 3: SERVICE ================= */}
             {currentStep === 3 && (
                <div className="animate-slide-up space-y-4">
                   {/* Section A */}
                   <Accordion title="Services Task" defaultOpen={true}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                         <SelectInput label="Service Type*" options={["Personal Care", "Homemaker", "Companion Care", "Respite"]} />
                         <InputField label="Authorized Weekly Hours*" placeholder="e.g., 20" type="number" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                         <DateInput label="Service Start Date*" />
                         <DateInput label="Service End Date" />
                      </div>
                      <div className="space-y-1">
                         <label className="text-xs font-medium text-gray-700">Notes</label>
                         <textarea className="w-full border border-gray-200 rounded-lg p-3 text-sm h-24 resize-none focus:border-[#0074D9] outline-none" placeholder="Enter service notes..."></textarea>
                      </div>
                   </Accordion>

                   {/* Section B */}
                   <Accordion title="Risk & Safety">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         <Checkbox label="Fall Risk" />
                         <Checkbox label="Dementia" />
                         <Checkbox label="Mobility Assistance" />
                         <Checkbox label="2-Person Assist" />
                         <Checkbox label="Behavioral Concerns" />
                         <Checkbox label="Pets in Home" />
                         <Checkbox label="Smoking in Home" />
                      </div>
                   </Accordion>

                   {/* Section C */}
                   <Accordion title="Compliance & Documents">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                         <Toggle label="HIPAA Consent Signed*" />
                         <Toggle label="Service Agreement Signed*" />
                         <Toggle label="Private Pay Agreement*" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <FileUpload label="ID Uploaded" />
                         <FileUpload label="Medicaid Card Uploaded" />
                      </div>
                   </Accordion>

                   {/* Section D */}
                   <Accordion title="Zone & Assignment">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                         <SelectInput label="Service Zone*" options={["Zone 1", "Zone 2", "Zone 3"]} />
                         <SelectInput label="Supervisor Assigned*" options={["John Doe", "Jane Smith"]} />
                      </div>
                      <RadioGroup label="Status*" name="status" options={["Active", "On Hold", "Pending Start", "Discharged"]} />
                   </Accordion>
                </div>
             )}

          </div>

          {/* 4. Footer Actions */}
        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-2xl">
             {currentStep > 1 && (
                <button 
                   onClick={() => setCurrentStep(prev => prev - 1)}
                   className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 text-sm font-medium hover:bg-white transition-colors"
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
                // Fixed: Link directly to /clients page
                <Link 
                   href="/clients"
                   className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-lg transition-colors flex items-center justify-center"
                >
                   Create Client
                </Link>
             )}
          </div>

       </div>
    </div>, document.body
  );
}