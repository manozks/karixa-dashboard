"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import InputField from "@/components/ui/InputField"; // From previous steps
import PhoneInput from "@/components/ui/PhoneInput"; // From previous steps
import SelectInput from "@/components/ui/SelectInput";
import DateInput from "@/components/ui/DateInput";

export default function AddClientPage() {
  const [currentStep, setCurrentStep] = useState(1);

  // Helper to render the progress bar
  const renderStepper = () => (
    <div className="bg-blue-50/50 rounded-xl p-4 mb-8 flex flex-col md:flex-row justify-between items-center gap-4 border border-blue-100/50">
      
      {/* Step 1 */}
      <div className={`flex items-center gap-3 ${currentStep >= 1 ? 'opacity-100' : 'opacity-50'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep === 1 ? 'bg-[#0074D9] text-white shadow-lg shadow-blue-200' : 'bg-blue-100 text-[#0074D9]'}`}>1</div>
        <div>
          <h4 className={`text-sm font-bold ${currentStep === 1 ? 'text-[#0074D9]' : 'text-gray-500'}`}>Basic Information</h4>
          <p className="text-xs text-gray-400">Provide information about client</p>
        </div>
      </div>
      
      <div className="hidden md:block w-12 h-[1px] bg-gray-300"></div>

      {/* Step 2 */}
      <div className={`flex items-center gap-3 ${currentStep >= 2 ? 'opacity-100' : 'opacity-50'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep === 2 ? 'bg-[#0074D9] text-white shadow-lg shadow-blue-200' : 'bg-blue-100 text-[#0074D9]'}`}>2</div>
        <div>
          <h4 className={`text-sm font-bold ${currentStep === 2 ? 'text-[#0074D9]' : 'text-gray-500'}`}>Insurance</h4>
          <p className="text-xs text-gray-400">Provide insurance detail of client</p>
        </div>
      </div>

      <div className="hidden md:block w-12 h-[1px] bg-gray-300"></div>

      {/* Step 3 */}
      <div className={`flex items-center gap-3 ${currentStep >= 3 ? 'opacity-100' : 'opacity-50'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep === 3 ? 'bg-[#0074D9] text-white shadow-lg shadow-blue-200' : 'bg-blue-100 text-[#0074D9]'}`}>3</div>
        <div>
          <h4 className={`text-sm font-bold ${currentStep === 3 ? 'text-[#0074D9]' : 'text-gray-500'}`}>Internal Use Only</h4>
          <p className="text-xs text-gray-400">Provide insurance detail of client</p>
        </div>
      </div>

    </div>
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-gray-50/50 p-0">
        
        {/* Header with Back Button */}
        <div className="mb-6">
           <Link href="/clients" className="text-gray-500 text-sm hover:text-gray-800 flex items-center gap-2 mb-2">
             <i className="fa-solid fa-arrow-left"></i> Back
           </Link>
           <h1 className="text-2xl font-bold text-gray-800">Add New Client</h1>
           <p className="text-sm text-gray-500 mt-1 max-w-4xl leading-relaxed">
             Fill in the client's personal details to begin managing their care within the Agency Portal. Once added, you'll be able to assign caregivers, schedule visits, and track their service history easily.
           </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 flex-1">
          
          {/* Stepper */}
          {renderStepper()}

          {/* ================= STEP 1: BASIC INFORMATION ================= */}
          {currentStep === 1 && (
            <div className="animate-fade-in">
              <h3 className="font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <InputField label="First Name*" placeholder="Enter First name" />
                <InputField label="Last Name*" placeholder="Enter Last name" />
                
                <SelectInput label="Gender*" options={["Male", "Female", "Other"]} />
                <DateInput label="Date of Birth*" placeholder="dd/mm/yyyy" />

                <PhoneInput label="Phone Number" />
                <InputField label="Email" placeholder="Enter email address" type="email" />

                <InputField label="Social Security Number (SSN)" placeholder="Enter SSN number" />
                <SelectInput label="Primary Language" options={["English", "Spanish", "French"]} />

                <InputField label="Street Address 1" placeholder="Enter" />
                <InputField label="City" placeholder="Enter" />

                <InputField label="State*" placeholder="Enter" />
                <InputField label="Zip Code*" placeholder="Enter" />
                
                <SelectInput label="Street Address 2" options={["Apt", "Suite"]} />
                <InputField label="City" placeholder="Enter your email address" />
              </div>

              <h3 className="font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2">Emergency Contact Number</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <InputField label="Full Name*" placeholder="Enter" />
                <InputField label="Relation*" placeholder="Enter" />
                <PhoneInput label="Phone*" />
                <PhoneInput label="Alternative Phone" />
              </div>
            </div>
          )}

          {/* ================= STEP 2: INSURANCE ================= */}
          {currentStep === 2 && (
            <div className="animate-fade-in">
              <h3 className="font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2">Primary Insurance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <InputField label="Insurance Provider Name*" placeholder="Enter" />
                <InputField label="Policy Number*" placeholder="Enter" />
                <PhoneInput label="Phone" />
                <InputField label="Email" placeholder="Enter" type="email" />
              </div>

              <h3 className="font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2">Secondary Insurance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <InputField label="Insurance Provider Name*" placeholder="Enter" />
                <InputField label="Policy Number*" placeholder="Enter" />
                <PhoneInput label="Phone" />
                <InputField label="Email" placeholder="Enter" type="email" />
              </div>
            </div>
          )}

          {/* ================= STEP 3: INTERNAL USE ONLY ================= */}
          {currentStep === 3 && (
            <div className="animate-fade-in">
              <h3 className="font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2">Internal Use Only</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <SelectInput label="Status*" options={["Active", "Other", "Inactive"]} />
                <SelectInput label="Supervisor*" options={["John Doe", "Jane Smith"]} />
              </div>

              <div className="mb-6">
                <InputField label="Region Code" placeholder="Enter" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <DateInput label="Service Start Date" placeholder="dd/mm/yyyy" />
                <div className="flex gap-4">
                  {/* Start Time Picker */}
       <div className="flex-1">
                        <label className="text-sm font-medium text-gray-700">Start Time</label>
                        <div className="relative">
                           <input type="time" className="w-full border bg-gray-50 border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-brand" />
                           {/* Decorative Icon (Optional: depends on browser native support, added for style consistency) */}
                           <i className="fa-regular fa-clock absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none bg-white pl-2"></i>
                        </div>
                      </div>
     {/* End Time Picker */}
      <div className="flex-1">
                        <label className="text-sm font-medium text-gray-700">End Time</label>
                        <div className="relative">
                           <input type="time" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-brand" />
                           <i className="fa-regular fa-clock absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none bg-white pl-2"></i>
                        </div>
                      </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <InputField label="Medicaid" placeholder="Enter" />
                <InputField label="Referred By" placeholder="Enter" />
              </div>
            </div>
          )}


          {/* --- Navigation Buttons --- */}
          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-50">
            
            {/* Back Button (Hidden on Step 1) */}
            {currentStep > 1 && (
              <button 
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-8 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}

            {/* Next / Submit Button */}
            {currentStep < 3 ? (
              <button 
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="bg-[#0074D9] hover:bg-[#0062b8] text-white px-8 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-900/10"
              >
                Next
              </button>
            ) : (
              <Link href="/clients"
                onClick={() => console.log("Submit Form")}
                className="bg-[#0074D9] hover:bg-[#0062b8] text-white px-8 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-900/10"
              >
                Create a New Client
              </Link>
            )}

          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}