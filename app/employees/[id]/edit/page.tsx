"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import MultiSelectDropdown from "@/components/MultiSelectDropdown";

// =========================================================================
// HELPER COMPONENTS
// =========================================================================

function Accordion({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className={`border border-gray-200 rounded-xl bg-white mb-4 shadow-sm animate-fade-in ${isOpen ? 'overflow-visible' : 'overflow-hidden'}`}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)} 
        className={`w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left ${isOpen ? 'rounded-t-xl' : 'rounded-xl'}`}
      >
        <h3 className="font-bold text-gray-800 text-sm">{title}</h3>
        <i className={`fa-solid fa-chevron-down text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100 p-6 border-t border-gray-100 overflow-visible' : 'max-h-0 opacity-0 p-0 overflow-hidden'}`}>
        {children}
      </div>
    </div>
  );
}

// Added value and onChange support for dynamic lists
function InputField({ label, placeholder, type = "text", defaultValue, value, onChange, disabled }: any) {
  return (
    <div className="space-y-1 w-full">
      <label className="text-xs font-medium text-gray-700">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder} 
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#0074D9] ${disabled ? 'bg-gray-100 text-gray-500' : ''}`} 
      />
    </div>
  );
}

// Added value and onChange support for dynamic lists
function SelectInput({ label, options, defaultValue, value, onChange }: any) {
  return (
    <div className="space-y-1 w-full">
      <label className="text-xs font-medium text-gray-700">{label}</label>
      <select 
        defaultValue={defaultValue} 
        value={value}
        onChange={onChange}
        className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white text-gray-700 outline-none focus:border-[#0074D9]"
      >
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

// UploadBox component added to fix reference error in Step 3
function UploadBox({ label, uploaded, fileName }: any) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-700">{label}</label>
      <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
        {uploaded && fileName ? (
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
  const params = useParams(); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = () => {
    router.push('/employees');
  };

  const [phones, setPhones] = useState([
    { type: "Cell Phone", number: "(703) 981-7142", note: "Primary" },
    { type: "Home Phone", number: "(703) 555-0199", note: "Evening only" }
  ]);

  const [emails, setEmails] = useState([
    { type: "Personal", address: "nina.m@gmail.com", note: "Primary" },
    { type: "Work", address: "nina@agency.com", note: "" }
  ]);

  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: "Daniel Choi", relation: "Son", phone: "(703) 981-7145", email: "daniel@gmail.com", address: "Same as above" }
  ]);

   // Dynamic Lists Handlers
  const addPhone = () => setPhones([...phones, { type: "Cell Phone", number: "", note: "" }]);
  const removePhone = (i: number) => setPhones(phones.filter((_, idx) => idx !== i));
  const updatePhone = (i: number, field: string, val: string) => { const n = [...phones]; (n[i] as any)[field] = val; setPhones(n); };

  const addEmail = () => setEmails([...emails, { type: "Work", address: "", note: "" }]);
  const removeEmail = (i: number) => setEmails(emails.filter((_, idx) => idx !== i));
  const updateEmail = (i: number, field: string, val: string) => { const n = [...emails]; (n[i] as any)[field] = val; setEmails(n); };

  const addContact = () => setEmergencyContacts([...emergencyContacts, { name: "", relation: "", phone: "", email: "", address: "" }]);
  const removeContact = (i: number) => setEmergencyContacts(emergencyContacts.filter((_, idx) => idx !== i));
  const updateContact = (i: number, field: string, val: string) => { const n = [...emergencyContacts]; (n[i] as any)[field] = val; setEmergencyContacts(n); };


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
                      
                      <Accordion title="Basic Information" defaultOpen={true}>
                         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                            <SelectInput label="Title" options={["Ms.", "Mrs.", "Mr.", "Dr."]} defaultValue="Ms." />
                            <InputField label="First Name*" defaultValue="Olivia" />
                            <InputField label="Middle Name" defaultValue="Grace" />
                            <InputField label="Last Name*" defaultValue="Thompson" />
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                            <SelectInput label="Suffix" options={["None", "Jr.", "Sr."]} defaultValue="None" />
                            <SelectInput label="Gender*" options={["Female", "Male", "Other"]} defaultValue="Female" />
                            <DateInput label="Date of Birth*" defaultValue="1990-05-15" />
                            <SelectInput label="Marital Status" options={["Single", "Married", "Divorced"]} defaultValue="Single" />
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <InputField label="SSN* (Masked)" defaultValue="***-**-1234" disabled />
                             <MultiSelectDropdown label="Race" options={["Asian", "American indian", "African American or Black", "Hispanic or Latino", "White or Caucasian", "European American", "Multiracial", "Native Hawaiian",  "Pacific Islander", "Unknown"]} />
                             <SelectInput label="Primary Language" options={["English", "Mandarin", "Hindi", "Spanish", "French", "Modern Standard Arabic", "Portuguese", "Russian", "Bengali", "Urdu", "German", "Italian", "Japanese", "Nigerian Pidgin"]} />
                             <MultiSelectDropdown label="Secondary Language" options={["English", "Mandarin", "Hindi", "Spanish", "French", "Modern Standard Arabic", "Portuguese", "Russian", "Bengali", "Urdu", "German", "Italian", "Japanese", "Nigerian Pidgin"]} />
                         </div>
                      </Accordion>

                      <Accordion title="Phone Numbers">
                          <div className="flex justify-end mb-2"><button onClick={addPhone} className="text-[#0074D9] text-xs font-bold hover:underline flex items-center gap-1"><i className="fa-solid fa-plus"></i> Add Phone</button></div>
                          <div className="space-y-3">
                             {phones.map((p, i) => (
                                <div key={i} className="grid grid-cols-12 gap-4 items-end border-b border-gray-100 pb-3">
                                   <div className="col-span-2"><SelectInput label="Type" value={p.type} options={["Cell Phone", "Home Phone", "Work Phone"]} onChange={(e:any)=>updatePhone(i, 'type', e.target.value)} /></div>
                                   <div className="col-span-3"><InputField label="Number" value={p.number} onChange={(e:any)=>updatePhone(i, 'number', e.target.value)} /></div>
                                   <div className="col-span-5"><InputField label="Note" value={p.note} onChange={(e:any)=>updatePhone(i, 'note', e.target.value)} /></div>
                                   <div className="col-span-2 flex justify-end pb-1">{phones.length > 1 && <button onClick={()=>removePhone(i)} className="text-red-500 hover:bg-red-50 p-2 rounded"><i className="fa-regular fa-trash-can"></i></button>}</div>
                                </div>
                             ))}
                          </div>
                       </Accordion>

                       <Accordion title="Email Addresses">
                          <div className="flex justify-end mb-2"><button onClick={addEmail} className="text-[#0074D9] text-xs font-bold hover:underline flex items-center gap-1"><i className="fa-solid fa-plus"></i> Add Email</button></div>
                          <div className="space-y-3">
                             {emails.map((e, i) => (
                                <div key={i} className="grid grid-cols-12 gap-4 items-end border-b border-gray-100 pb-3">
                                   <div className="col-span-2"><SelectInput label="Type" value={e.type} options={["Personal", "Work"]} onChange={(e:any)=>updateEmail(i, 'type', e.target.value)} /></div>
                                   <div className="col-span-3"><InputField label="Email" value={e.address} onChange={(e:any)=>updateEmail(i, 'address', e.target.value)} /></div>
                                   <div className="col-span-5"><InputField label="Note" value={e.note} onChange={(e:any)=>updateEmail(i, 'note', e.target.value)} /></div>
                                   <div className="col-span-2 flex justify-end pb-1">{emails.length > 1 && <button onClick={()=>removeEmail(i)} className="text-red-500 hover:bg-red-50 p-2 rounded"><i className="fa-regular fa-trash-can"></i></button>}</div>
                                </div>
                             ))}
                          </div>
                       </Accordion>

                       <Accordion title="Emergency Contacts">
                          <div className="flex justify-end mb-2"><button onClick={addContact} className="text-[#0074D9] text-xs font-bold hover:underline flex items-center gap-1"><i className="fa-solid fa-plus"></i> Add Contact</button></div>
                          <div className="space-y-4">
                             {emergencyContacts.map((c, i) => (
                                <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-4 relative">
                                   {emergencyContacts.length > 1 && <button onClick={()=>removeContact(i)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><i className="fa-regular fa-trash-can"></i></button>}
                                   <div className="grid grid-cols-2 gap-4 mb-2">
                                      <InputField label="Name" value={c.name} onChange={(e:any)=>updateContact(i, 'name', e.target.value)} />
                                      <InputField label="Relationship" value={c.relation} onChange={(e:any)=>updateContact(i, 'relation', e.target.value)} />
                                   </div>
                                   <div className="grid grid-cols-2 gap-4">
                                      <InputField label="Phone" value={c.phone} onChange={(e:any)=>updateContact(i, 'phone', e.target.value)} />
                                      <InputField label="Email" value={c.email} onChange={(e:any)=>updateContact(i, 'email', e.target.value)} />
                                   </div>
                                </div>
                             ))}
                          </div>
                       </Accordion>
                   </div>
                )}

                {/* ================= STEP 2: EMPLOYMENT ================= */}
                {currentStep === 2 && (
                   <div className="animate-slide-up space-y-4">
                      
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

                      <Accordion title="Compensation">
                         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <SelectInput label="Pay Type" options={["Hourly", "Salary"]} defaultValue="Hourly" />
                            <InputField label="Pay Rate ($)" defaultValue="45.00" />
                            <SelectInput label="Pay Frequency" options={["Bi-Weekly", "Weekly"]} defaultValue="Bi-Weekly" />
                            <InputField label="Payroll ID" defaultValue="PR-998877" />
                         </div>
                      </Accordion>

                      <Accordion title="Referral Source">
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                             <SelectInput label="Referred By" options={["Employee Referral", "Agency", "Ad"]} defaultValue="Agency" />   
                             <InputField label="Referral Date" type="date" defaultValue="2023-01-10" />
                             <InputField label="Notes" defaultValue="Referred via external recruiter." />
                         </div>
                      </Accordion>

                      <Accordion title="Notes">
                         <div className="space-y-1">
                             <label className="text-xs font-medium text-gray-700">Additional Notes</label>
                             <textarea 
                                maxLength={8000}
                                className="w-full border border-gray-200 rounded-lg p-3 text-sm h-40 resize-none outline-none focus:border-[#0074D9]"
                                defaultValue="Excellent performance during probationary period."
                             ></textarea>
                         </div>
                      </Accordion>

                   </div>
                )}

                {/* ================= STEP 3: ACCESS ================= */}
                {currentStep === 3 && (
                   <div className="animate-slide-up space-y-4">
                      
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

                      <Accordion title="Document & Certification">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <UploadBox label="Upload CV" uploaded={true} fileName="Nina_CV.pdf" />
                            <UploadBox label="Police Check" uploaded={true} fileName="Police_Check_2024.pdf" />
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <UploadBox label="First Aid Certificate" />
                            <UploadBox label="COVID-19 Vaccination" uploaded={true} fileName="Vax_Cert.pdf" />
                         </div>
                      </Accordion>

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