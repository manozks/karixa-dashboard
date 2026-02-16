"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

// --- Components (Internal for this file or imports) ---
import InputField from "@/components/ui/InputField"; 
import SelectInput from "@/components/ui/SelectInput";
import DateInput from "@/components/ui/DateInput";

// 1. Accordion Component
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

// 2. Radio Group Helper
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

// 3. Checkbox Helper
function Checkbox({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
      <input type="checkbox" className="w-4 h-4 text-[#0074D9] rounded border-gray-300 focus:ring-[#0074D9]" />
      <span className="text-sm text-gray-700 font-medium">{label}</span>
    </label>
  );
}

// 4. Toggle Helper
function Toggle({ label }: { label: string }) {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <button 
        onClick={() => setEnabled(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? 'bg-[#0074D9]' : 'bg-gray-200'}`}
      >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  );
}

// 5. File Upload Helper
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

export default function AddClientPage() {
  const [currentStep, setCurrentStep] = useState(1);

  // Helper to render the progress bar
  const renderStepper = () => (
    <div className="bg-blue-50/50 rounded-xl p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-4 border border-blue-100/50">
      {/* Step 1 */}
      <div className={`flex items-center gap-3 ${currentStep >= 1 ? 'opacity-100' : 'opacity-50'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep === 1 ? 'bg-[#0074D9] text-white shadow-lg' : 'bg-blue-100 text-[#0074D9]'}`}>1</div>
        <div>
          <h4 className={`text-sm font-bold ${currentStep === 1 ? 'text-[#0074D9]' : 'text-gray-600'}`}>Identity & Demographics</h4>
          <p className="text-xs text-gray-400">Basic Info, Address, Emergency</p>
        </div>
      </div>
      <div className="hidden md:block w-12 h-[1px] bg-gray-300"></div>

      {/* Step 2 */}
      <div className={`flex items-center gap-3 ${currentStep >= 2 ? 'opacity-100' : 'opacity-50'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep === 2 ? 'bg-[#0074D9] text-white shadow-lg' : 'bg-blue-100 text-[#0074D9]'}`}>2</div>
        <div>
          <h4 className={`text-sm font-bold ${currentStep === 2 ? 'text-[#0074D9]' : 'text-gray-600'}`}>Payer & Billing</h4>
          <p className="text-xs text-gray-400">Medicaid, MCO, Billing</p>
        </div>
      </div>
      <div className="hidden md:block w-12 h-[1px] bg-gray-300"></div>

      {/* Step 3 */}
      <div className={`flex items-center gap-3 ${currentStep >= 3 ? 'opacity-100' : 'opacity-50'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep === 3 ? 'bg-[#0074D9] text-white shadow-lg' : 'bg-blue-100 text-[#0074D9]'}`}>3</div>
        <div>
          <h4 className={`text-sm font-bold ${currentStep === 3 ? 'text-[#0074D9]' : 'text-gray-600'}`}>Service Setup</h4>
          <p className="text-xs text-gray-400">Tasks, Safety, Compliance</p>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-gray-50/50 p-0 pb-20">
        
        {/* Header */}
        <div className="mb-6 px-1">
           <Link href="/clients" className="text-gray-500 text-sm hover:text-gray-800 flex items-center gap-2 mb-2">
             <i className="fa-solid fa-arrow-left"></i> Back
           </Link>
           <h1 className="text-2xl font-bold text-gray-800">Add New Client</h1>
           <p className="text-sm text-gray-500 mt-1">Complete the 3-step process to onboard a new client.</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          
          {renderStepper()}

          {/* ================= STEP 1: CLIENT IDENTITY & DEMOGRAPHICS ================= */}
          {currentStep === 1 && (
            <div className="animate-slide-up space-y-4">
              
              {/* Section A: Basic Information */}
              <Accordion title="Basic Information" defaultOpen={true}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                   <InputField label="First Name*" placeholder="Enter First Name" />
                   <InputField label="Middle Name" placeholder="Enter Middle Name" />
                   <InputField label="Last Name*" placeholder="Enter Last Name" />
                   <InputField label="Preferred Name" placeholder="Enter Preferred Name" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                   <RadioGroup label="Gender*" name="gender" options={["Male", "Female", "Other", "Prefer Not to Say"]} />
                   <DateInput label="Date of Birth*" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                   <InputField label="SSN* (Medicaid only) Masked" placeholder="XXX-XX-1234" />
                   <InputField label="Phone*" placeholder="(555) 000-0000" />
                   <InputField label="Secondary Phone" placeholder="(555) 000-0000" />
                   <InputField label="Email" placeholder="example@email.com" type="email" />
                </div>
              </Accordion>

              {/* Section B: Address */}
              <Accordion title="Address">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <InputField label="Street Address 1*" placeholder="123 Main St" />
                    <InputField label="Street Address 2" placeholder="Apt, Suite, Unit" />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <InputField label="City*" placeholder="Enter City" />
                    <SelectInput label="State*" options={["Ohio", "Michigan", "Kentucky", "Indiana"]} />
                    <InputField label="Zip Code*" placeholder="12345" />
                    <SelectInput label="County*" options={["Franklin", "Cuyahoga", "Hamilton", "Summit", "Lucas", "Montgomery", "Stark", "Butler", "Lorain", "Mahoning"]} />
                 </div>
              </Accordion>

              {/* Section C: Emergency Contact */}
              <Accordion title="Emergency Contact">
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <InputField label="Contact Name*" placeholder="Full Name" />
                    <SelectInput label="Relationship*" options={["Spouse", "Daughter", "Son", "Legal Guardian", "Power of Attorney", "Friend", "Other"]} />
                    <InputField label="Phone*" placeholder="(555) 000-0000" />
                    <InputField label="Email" placeholder="email@example.com" type="email" />
                 </div>
              </Accordion>

              {/* Section D: Funding Type */}
              <Accordion title="Funding Type">
                 <RadioGroup label="Select Funding Source" name="funding" options={["Medicaid Waiver", "Medicaid Managed Care (MCO)", "Private Pay"]} />
              </Accordion>

            </div>
          )}

          {/* ================= STEP 2: MEDICAID OR MCO ================= */}
          {currentStep === 2 && (
            <div className="animate-slide-up space-y-4">
              
              {/* Section A: Medicaid Details */}
              <Accordion title="Medicaid Details" defaultOpen={true}>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <InputField label="Medicaid Number*" placeholder="Enter Number" />
                    <SelectInput label="Waiver Program*" options={["PASSPORT", "MyCare Ohio", "Ohio Home Care Waiver", "DODD Individual Options", "SELF Waiver", "Level One Waiver"]} />
                    <SelectInput label="MCO Name*" options={["CareSource", "Buckeye Health Plan", "Molina Healthcare", "UnitedHealthcare Community Plan"]} />
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

              {/* Section B: Responsible Party / Billing */}
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
                    <SelectInput label="Invoice Delivery Method*" options={["Email", "Mail", "Portal Only"]} />
                 </div>
              </Accordion>

            </div>
          )}

          {/* ================= STEP 3: SERVICE SETUP ================= */}
          {currentStep === 3 && (
            <div className="animate-slide-up space-y-4">
              
              {/* Section A: Services Task */}
              <Accordion title="Services Task" defaultOpen={true}>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <SelectInput label="Service Type*" options={["Personal Care", "Homemaker", "Companion Care", "Respite", "Transportation", "Adult Day Support"]} />
                    <InputField label="Authorized Weekly Hours* (Medicaid)" placeholder="e.g., 20" type="number" />
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

              {/* Section B: Risk & Safety */}
              <Accordion title="Risk & Safety (Operationally Critical)">
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Checkbox label="Fall Risk" />
                    <Checkbox label="Dementia" />
                    <Checkbox label="Mobility Assistance Required" />
                    <Checkbox label="Requires 2-Person Assist" />
                    <Checkbox label="Behavioral Concerns" />
                    <Checkbox label="Pets in Home" />
                    <Checkbox label="Smoking in Home" />
                 </div>
              </Accordion>

              {/* Section C: Compliance & Documents */}
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

              {/* Section D: Zone & Assignment */}
              <Accordion title="Zone & Assignment">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <SelectInput label="Service Zone*" options={["Zone 1 (North)", "Zone 2 (South)", "Zone 3 (East)", "Zone 4 (West)"]} />
                    <SelectInput label="Supervisor Assigned*" options={["John Doe", "Jane Smith", "Emily White"]} />
                 </div>
                 <RadioGroup label="Status*" name="status" options={["Active", "On Hold", "Pending Start", "Discharged"]} />
              </Accordion>

            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
             {currentStep > 1 ? (
                <button 
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
             ) : <div></div>}

             {currentStep < 3 ? (
                <button 
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="bg-[#0074D9] hover:bg-[#0062b8] text-white px-8 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-900/10"
                >
                  Next Step
                </button>
             ) : (
                <Link href="/clients" className="bg-[#0074D9] hover:bg-[#0062b8] text-white px-8 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-900/10">
                  Create Client
                </Link>
             )}
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}