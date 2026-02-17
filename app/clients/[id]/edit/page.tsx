"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

// =========================================================================
// HELPER COMPONENTS (Updated to accept defaultValue/checked)
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
      <select defaultValue={defaultValue} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white text-gray-800 outline-none focus:border-[#0074D9]">
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

function Checkbox({ label, defaultChecked }: { label: string, defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
      <input type="checkbox" defaultChecked={defaultChecked} className="w-4 h-4 text-[#0074D9] rounded border-gray-300 focus:ring-[#0074D9]" />
      <span className="text-sm text-gray-700 font-medium">{label}</span>
    </label>
  );
}

function Toggle({ label, defaultChecked }: { label: string, defaultChecked?: boolean }) {
  const [enabled, setEnabled] = useState(defaultChecked || false);
  return (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setEnabled(!enabled)}>
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${enabled ? 'bg-[#0074D9]' : 'bg-gray-300'}`}>
        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-4' : 'translate-x-1'}`} />
      </div>
    </div>
  );
}

function FileUpload({ label, fileName }: { label: string, fileName?: string }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-700">{label}</label>
      <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
        {fileName ? (
            <>
                <i className="fa-solid fa-file-pdf text-red-500 mb-1 text-xl"></i>
                <span className="text-xs text-gray-800 font-medium">{fileName}</span>
                <span className="text-[10px] text-gray-400">Click to replace</span>
            </>
        ) : (
            <>
                <i className="fa-solid fa-cloud-arrow-up text-gray-400 mb-1"></i>
                <span className="text-xs text-gray-500">Click to upload</span>
            </>
        )}
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
// MAIN EDIT PAGE COMPONENT
// =========================================================================

export default function EditClientPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const params = useParams(); // To get the ID (e.g., /clients/123/edit)
  
  // Mock Data State (Simulating fetching data)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
        setLoading(false);
    }, 500);
  }, []);

  const handleSave = () => {
    // Logic to save data would go here
    router.push('/clients'); 
  };

  

  return (
    <DashboardLayout>
       <div className="flex flex-col h-full bg-gray-50/50 p-0 pb-20">
          
          {/* Header */}
          <div className="mb-6 px-1 flex flex-col gap-2">
             <Link href="/clients" className="text-gray-500 text-sm hover:text-gray-800 flex items-center gap-2 w-fit">
                <i className="fa-solid fa-arrow-left"></i> Back
             </Link>
             <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Edit Client: Jane Doe</h1>
                    <p className="text-sm text-gray-500 mt-1">Update client information, insurance, and service details.</p>
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
                <StepIndicator num={1} label="Identity" sub="Basic Info, Address, Emergency" current={currentStep} />
                <div className="hidden md:block w-12 h-px bg-gray-300"></div>
                <StepIndicator num={2} label="Payer" sub="Insurance & Billing" current={currentStep} />
                <div className="hidden md:block w-12 h-px bg-gray-300"></div>
                <StepIndicator num={3} label="Service" sub="Tasks, Safety, Compliance" current={currentStep} />
             </div>

             {/* Form Content */}
             <div className="space-y-6">
                
                {/* ================= STEP 1: IDENTITY ================= */}
                {currentStep === 1 && (
                   <div className="animate-slide-up space-y-4">
                      {/* Section A */}
                      <Accordion title="Basic Information" defaultOpen={true}>
                         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                            <SelectInput label="Title" options={["None", "Mr.", "Mrs.", "Ms.", "Dr."]} defaultValue="Mrs." />
                            <InputField label="First Name*" defaultValue="Jane" />
                            <InputField label="Middle Name" defaultValue="Marie" />
                            <InputField label="Last Name*" defaultValue="Doe" />
                            <InputField label="Preferred Name" defaultValue="Janie" />
                            <SelectInput label="Suffix" options={["None", "Jr.", "Sr."]} defaultValue="None" />
                            <SelectInput label="Gender*" options={["Male", "Female", "Other"]} defaultValue="Female" />
                            <SelectInput label="Marital Status" options={["Single", "Married", "Widowed"]} defaultValue="Married" />
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">                         
                            <DateInput label="Date of Birth*" defaultValue="1955-04-12" />
                            <InputField label="Client ID" defaultValue="CL-2024-001" disabled />
                            <InputField label="State ID" defaultValue="OH-123456" />
                            <InputField label="SSN* (Masked)" defaultValue="***-**-9999" disabled />
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <SelectInput label="Status" options={["Active", "Inactive", "On Hold"]} defaultValue="Active" />
                            <InputField label="Phone*" defaultValue="(555) 123-4567" />
                            <InputField label="Secondary Phone" />
                            <InputField label="Email" defaultValue="jane.doe@email.com" type="email" />
                         </div>
                      </Accordion>

                      {/* Section B */}
                      <Accordion title="Address">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                            <InputField label="Street Address 1*" defaultValue="456 Maple Avenue" />
                            <InputField label="Street Address 2" defaultValue="Apt 4B" />
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <InputField label="City*" defaultValue="Columbus" />
                            <SelectInput label="State*" options={["Ohio", "Michigan"]} defaultValue="Ohio" />
                            <InputField label="Zip Code*" defaultValue="43215" />
                            <SelectInput label="County*" options={["Franklin", "Cuyahoga"]} defaultValue="Franklin" />
                         </div>
                      </Accordion>

                      {/* Section C */}
                      <Accordion title="Emergency Contact">
                         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <InputField label="Contact Name*" defaultValue="Robert Doe" />
                            <SelectInput label="Relationship*" options={["Spouse", "Son"]} defaultValue="Spouse" />
                            <InputField label="Phone*" defaultValue="(555) 987-6543" />
                            <InputField label="Email" />
                         </div>
                      </Accordion>
                      
                      <Accordion title="Funding Type">
                         <RadioGroup label="Select Funding Source" name="funding" options={["Medicaid Waiver", "MCO", "Private Pay"]} defaultValue="Medicaid Waiver" />
                      </Accordion>
                   </div>
                )}

                {/* ================= STEP 2: PAYER ================= */}
                {currentStep === 2 && (
                   <div className="animate-slide-up space-y-4">
                      {/* Section A */}
                      <Accordion title="Medicaid Details" defaultOpen={true}>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <InputField label="Medicaid Number*" defaultValue="1234567890" />
                            <SelectInput label="Waiver Program*" options={["PASSPORT", "MyCare Ohio"]} defaultValue="PASSPORT" />
                            <SelectInput label="MCO Name*" options={["CareSource", "Molina"]} defaultValue="CareSource" />
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <InputField label="Case Manager Name*" defaultValue="Sarah Smith" />
                            <InputField label="Case Manager Phone*" defaultValue="(555) 555-0101" />
                            <InputField label="Case Manager Email" defaultValue="s.smith@agency.gov" />
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DateInput label="Eligibility Start Date*" defaultValue="2023-01-01" />
                            <DateInput label="Eligibility End Date" />
                         </div>
                      </Accordion>

                      {/* Section B */}
                      <Accordion title="Responsible Party / Billing">
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <InputField label="Responsible Party Name*" defaultValue="Robert Doe" />
                            <SelectInput label="Relationship*" options={["Spouse"]} defaultValue="Spouse" />
                            <InputField label="Billing Address*" defaultValue="Same as Client" />
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="col-span-2"><RadioGroup label="Rate Type*" name="rateType" options={["Hourly", "Daily"]} defaultValue="Hourly" /></div>
                            <InputField label="Hourly Rate*" defaultValue="$24.50" />
                            <SelectInput label="Billing Frequency*" options={["Weekly", "Monthly"]} defaultValue="Weekly" />
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
                            <SelectInput label="Service Type*" options={["Personal Care", "Homemaker"]} defaultValue="Personal Care" />
                            <InputField label="Authorized Weekly Hours*" defaultValue="20" type="number" />
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <DateInput label="Service Start Date*" defaultValue="2023-01-15" />
                            <DateInput label="Service End Date" />
                         </div>
                         <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-700">Notes</label>
                            <textarea className="w-full border border-gray-200 rounded-lg p-3 text-sm h-24 resize-none focus:border-[#0074D9] outline-none" defaultValue="Client prefers morning shifts." />
                         </div>
                      </Accordion>

                      {/* Section B */}
                      <Accordion title="Risk & Safety">
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Checkbox label="Fall Risk" defaultChecked={true} />
                            <Checkbox label="Dementia" />
                            <Checkbox label="Mobility Assistance" defaultChecked={true} />
                            <Checkbox label="Pets in Home" />
                         </div>
                      </Accordion>

                      {/* Section C */}
                      <Accordion title="Compliance & Documents">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <Toggle label="HIPAA Consent Signed*" defaultChecked={true} />
                            <Toggle label="Service Agreement Signed*" defaultChecked={true} />
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FileUpload label="ID Uploaded" fileName="driver_license.pdf" />
                            <FileUpload label="Medicaid Card Uploaded" fileName="medicaid_card.jpg" />
                         </div>
                      </Accordion>

                      {/* Section D */}
                      <Accordion title="Zone & Assignment">
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <SelectInput label="Service Zone*" options={["Zone 1", "Zone 2"]} defaultValue="Zone 1" />
                            <SelectInput label="Supervisor Assigned*" options={["John Doe", "Jane Smith"]} defaultValue="John Doe" />
                         </div>
                         <RadioGroup label="Status*" name="status" options={["Active", "On Hold"]} defaultValue="Active" />
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