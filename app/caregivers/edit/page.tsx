"use client";

import { useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EditCaregiverPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);

  // --- 1. STATE MANAGEMENT (Pre-filled with Mock Data) ---
  
  // Step 1 Data
  const [basicInfo, setBasicInfo] = useState({
    title: "Ms.", firstName: "Nina", middleName: "", lastName: "Mcintire", suffix: "",
    gender: "Female", dob: "1983-10-24", ssn: "***-**-7142",
    race: ["White"], primaryLang: ["English"], secondaryLang: ["Spanish"],
    address1: "1509 Oakview Dr", address2: "", city: "McLean", state: "Virginia", zip: "22101", country: "USA",
    stateId: "V1234567", stateIdIssueState: "VA", driversLicense: "D7654321", driversLicenseState: "VA", passport: "P987654321", militaryId: "", uscisId: ""
  });

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

  // Step 2 Data
  const [professional, setProfessional] = useState({
    types: ["PCA", "HHA"], id: "CG-20012", skills: ["Catheter Care", "Gait Belt Transfers"],
    qualification: "Certificate III", experience: "5", payRate: "Hourly Rate", hireDate: "2020-01-12",
    availStart: "2024-10-24", region: "Melbourne East", 
    notes: "Nina is a very dedicated caregiver with extensive experience in dementia care."
  });

  // NEW: Referral Sources Array State
  const [referralSources, setReferralSources] = useState([
    { referredBy: "Employee Referral", detail: "Sarah J.", date: "2019-12-15", notes: "Highly recommended." }
  ]);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  // --- HANDLERS ---

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

  // NEW: Referral Sources Handlers
  const addReferralSource = () => setReferralSources([...referralSources, { referredBy: "", detail: "", date: "", notes: "" }]);
  const removeReferralSource = (i: number) => setReferralSources(referralSources.filter((_, idx) => idx !== i));
  const updateReferralSource = (i: number, field: string, val: string) => { 
    const n: any = [...referralSources]; 
    n[i][field] = val; 
    setReferralSources(n); 
  };

  // Helper to define conditional labels based on dropdown selection
  const getReferralDetailLabel = (type: string) => {
    switch (type) {
      case "Another Agency":
      case "Temporary Staffing Agency": return "Agency Name*";
      case "Employee Referral": return "Employee Name*";
      case "Online Ad": return "Platform / Website*";
      case "Other": return "Please Specify*";
      default: return null;
    }
  };

  // Generic Field Handler
  const handleBasicChange = (field: string, val: any) => setBasicInfo({ ...basicInfo, [field]: val });
  const handleProfChange = (field: string, val: any) => setProfessional({ ...professional, [field]: val });

  return (
    <DashboardLayout>
    <div className="flex flex-col h-full bg-gray-50/50 p-0 pb-20">
        
        {/* Header Section */}
        <div className="mb-6">
           <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Link href={`/caregivers/${params.id}`} className="hover:text-gray-800 flex items-center gap-1">
                 <i className="fa-solid fa-chevron-left text-xs"></i> Back
              </Link>
           </div>
           <h1 className="text-2xl font-bold text-gray-800">Edit Caregiver Profile</h1>
           <p className="text-sm text-gray-500 mt-1">Update {basicInfo.firstName}'s personal details, professional information, and documents.</p>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              
           {/* Wizard Stepper */}
          <div className="bg-blue-50/50 rounded-xl p-6 mb-4 flex flex-col md:flex-row justify-between items-center gap-4 border border-blue-100/50">
              <StepIndicator num={1} label="Basic Information" current={step} onClick={() => setStep(1)} />
              <div className="hidden md:block w-12 h-px bg-gray-300"></div>
              <StepIndicator num={2} label="Professional Detail" current={step} onClick={() => setStep(2)} />
              <div className="hidden md:block w-12 h-px bg-gray-300"></div>
              <StepIndicator num={3} label="Documents" current={step} onClick={() => setStep(3)} />
           </div>
      
           <div className="">
              <div className="space-y-6">
                 
                 {/* ================= STEP 1: BASIC INFO ================= */}
                 {step === 1 && (
                    <div className="animate-fade-in space-y-4">
                       <Accordion title="Basic Information" defaultOpen={true}>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                             <SelectGroup label="Title" value={basicInfo.title} options={["Ms.", "Mr.", "Mrs.", "Dr."]} onChange={(v:string)=>handleBasicChange('title', v)} />
                             <InputGroup label="First Name" value={basicInfo.firstName} onChange={(e:any)=>handleBasicChange('firstName', e.target.value)} />
                             <InputGroup label="Middle Name" value={basicInfo.middleName} onChange={(e:any)=>handleBasicChange('middleName', e.target.value)} />
                             <InputGroup label="Last Name" value={basicInfo.lastName} onChange={(e:any)=>handleBasicChange('lastName', e.target.value)} />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 overflow-visible">
                            <SelectGroup 
                              label="Suffix" 
                              value={basicInfo.suffix} 
                              options={["Jr.", "Sr.", "III"]} 
                              onChange={(v:string) => handleBasicChange('suffix', v)} 
                            />

                            <StateIdInput 
                              label="State ID" 
                              tooltip="For EVV aggregators, this field will be used to enter state / Caregiver ID's or Caregiver NPI."
                              stateValue={basicInfo.stateIdIssueState} 
                              idValue={basicInfo.stateId}
                              onStateChange={(e:any) => handleBasicChange('stateIdIssueState', e.target.value)}
                              onIdChange={(e:any) => handleBasicChange('stateId', e.target.value)}
                            />

                            <StateIdInput 
                              label="Driver’s License" 
                              tooltip="Select the US state that issued the license along with the license number."
                              stateValue={basicInfo.driversLicenseState} 
                              idValue={basicInfo.driversLicense}
                              onStateChange={(e:any) => handleBasicChange('driversLicenseState', e.target.value)}
                              onIdChange={(e:any) => handleBasicChange('driversLicense', e.target.value)}
                            />

                            <InputGroup 
                              label="PASSPORT" 
                              value={basicInfo.passport} 
                              placeholder="Enter" 
                              onChange={(e:any) => handleBasicChange('passport', e.target.value)} 
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                             <InputGroup label="Military ID" value={basicInfo.militaryId} placeholder="Enter" onChange={(e:any)=>handleBasicChange('militaryId', e.target.value)} />
                             <InputGroup label="USCIS ID" value={basicInfo.uscisId} placeholder="Enter" onChange={(e:any)=>handleBasicChange('uscisId', e.target.value)} />
                             <SelectGroup label="Gender" value={basicInfo.gender} options={["Male", "Female", "Other"]} onChange={(v:string)=>handleBasicChange('gender', v)} />
                             <InputGroup label="Date of Birth" type="date" value={basicInfo.dob} onChange={(e:any)=>handleBasicChange('dob', e.target.value)} />
                          </div>
                         
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 overflow-visible z-50 relative">
                             <InputGroup label="SSN" value={basicInfo.ssn} onChange={(e:any)=>handleBasicChange('ssn', e.target.value)} />
                             <MultiSelectDropdown label="Race" selectedItems={basicInfo.race} options={["Asian", "American indian", "African American or Black", "Hispanic or Latino", "White or Caucasian", "European American", "Multiracial", "Native Hawaiian",  "Pacific Islander", "Unknown"]} onChange={(vals) => handleBasicChange('race', vals)} />
                             <SelectGroup label="Primary Language" value={basicInfo.primaryLang[0] || ""} options={["English", "Mandarin", "Hindi", "Spanish", "French", "Modern Standard Arabic", "Portuguese", "Russian", "Bengali", "Urdu", "German", "Italian", "Japanese", "Nigerian Pidgin"]} onChange={(v:string) => handleBasicChange('primaryLang', [v])} />
                             <MultiSelectDropdown label="Secondary Language" selectedItems={basicInfo.secondaryLang} options={["English", "Mandarin", "Hindi", "Spanish", "French", "Modern Standard Arabic", "Portuguese", "Russian", "Bengali", "Urdu", "German", "Italian", "Japanese", "Nigerian Pidgin"]} onChange={(vals) => handleBasicChange('secondaryLang', vals)} />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                             <InputGroup label="Address Line 1" value={basicInfo.address1} onChange={(e:any)=>handleBasicChange('address1', e.target.value)} />
                             <InputGroup label="City" value={basicInfo.city} onChange={(e:any)=>handleBasicChange('city', e.target.value)} />
                             <SelectGroup label="State" value={basicInfo.state} options={["Virginia", "Maryland", "DC", "Ohio"]} onChange={(v:string)=>handleBasicChange('state', v)} />
                             <InputGroup label="Zip Code" value={basicInfo.zip} onChange={(e:any)=>handleBasicChange('zip', e.target.value)} />
                          </div>
                       </Accordion>

                       <Accordion title="Phone Numbers">
                          <div className="flex justify-end mb-2"><button onClick={addPhone} className="text-[#0074D9] text-xs font-bold hover:underline flex items-center gap-1"><i className="fa-solid fa-plus"></i> Add Phone</button></div>
                          <div className="space-y-3">
                             {phones.map((p, i) => (
                                <div key={i} className="grid grid-cols-12 gap-4 items-end border-b border-gray-100 pb-3">
                                   <div className="col-span-2"><SelectGroup label="Type" value={p.type} options={["Cell Phone", "Home Phone", "Work Phone"]} onChange={(v:string)=>updatePhone(i, 'type', v)} /></div>
                                   <div className="col-span-3"><InputGroup label="Number" value={p.number} onChange={(e:any)=>updatePhone(i, 'number', e.target.value)} /></div>
                                   <div className="col-span-5"><InputGroup label="Note" value={p.note} onChange={(e:any)=>updatePhone(i, 'note', e.target.value)} /></div>
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
                                   <div className="col-span-2"><SelectGroup label="Type" value={e.type} options={["Personal", "Work"]} onChange={(v:string)=>updateEmail(i, 'type', v)} /></div>
                                   <div className="col-span-3"><InputGroup label="Email" value={e.address} onChange={(evt:any)=>updateEmail(i, 'address', evt.target.value)} /></div>
                                   <div className="col-span-5"><InputGroup label="Note" value={e.note} onChange={(evt:any)=>updateEmail(i, 'note', evt.target.value)} /></div>
                                   <div className="col-span-2 flex justify-end pb-1">{emails.length > 1 && <button onClick={()=>removeEmail(i)} className="text-red-500 hover:bg-red-50 p-2 rounded"><i className="fa-regular fa-trash-can"></i></button>}</div>
                                </div>
                             ))}
                          </div>
                       </Accordion>

                       <Accordion title="Emergency Contacts">
                          <div className="flex justify-end mb-2"><button onClick={addContact} className="text-[#0074D9] text-xs font-bold hover:underline flex items-center gap-1"><i className="fa-solid fa-plus"></i> Add Contact</button></div>
                          <div className="space-y-4">
                             {emergencyContacts.map((c, i) => (
                                <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-4 relative animate-fade-in">
                                   {emergencyContacts.length > 1 && <button onClick={()=>removeContact(i)} className="absolute top-4 right-4 text-red-400 hover:text-red-600"><i className="fa-regular fa-trash-can"></i></button>}
                                   <div className="grid grid-cols-2 gap-4 mb-2">
                                      <InputGroup label="Name" value={c.name} onChange={(e:any)=>updateContact(i, 'name', e.target.value)} />
                                      <InputGroup label="Relationship" value={c.relation} onChange={(e:any)=>updateContact(i, 'relation', e.target.value)} />
                                   </div>
                                   <div className="grid grid-cols-2 gap-4">
                                      <InputGroup label="Phone" value={c.phone} onChange={(e:any)=>updateContact(i, 'phone', e.target.value)} />
                                      <InputGroup label="Email" value={c.email} onChange={(e:any)=>updateContact(i, 'email', e.target.value)} />
                                   </div>
                                </div>
                             ))}
                          </div>
                       </Accordion>
                    </div>
                 )}

                 {/* ================= STEP 2: PROFESSIONAL ================= */}
                 {step === 2 && (
                    <div className="animate-fade-in space-y-4">
                       <Accordion title="Professional Details" defaultOpen={true}>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4 overflow-visible z-50 relative">
                             <MultiSelectDropdown label="Caregiver Type" selectedItems={professional.types} options={["PCA", "HHA", "CNA", "LPN", "RN"]} onChange={(vals)=>handleProfChange('types', vals)} />
                             <InputGroup label="Caregiver ID" value={professional.id} onChange={(e:any)=>handleProfChange('id', e.target.value)} />
                             <MultiSelectDropdown label="Skills" selectedItems={professional.skills} options={["DODD Medication Category 1", "DODD Medication Category 2", "DODD Medication Category 3",
                               "Vagus Nerve Stimulator (VNS) Certified", "Hoyer Lift", "Gait Belt Transfers", "Catheter Care",
                               "Licensed Driver", "Severe Behavior Experience", "Seizure Experience", "Dementia Care Experience",
                               "Wound Care Certified (LPNs & RNs only)"]} onChange={(vals)=>handleProfChange('skills', vals)} />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                             <SelectGroup label="Qualification" value={professional.qualification} options={["Certificate III", "Certificate IV"]} onChange={(v:string)=>handleProfChange('qualification', v)} />
                             <InputGroup label="Years Experience" value={professional.experience} onChange={(e:any)=>handleProfChange('experience', e.target.value)} />
                             <SelectGroup label="Pay Rate" value={professional.payRate} options={["Hourly Rate ( calculated hourly)", "Daily Rate (a pay rate calculated daily regardless of hours worked)", "Salary (For salary, the hourly rate is multiplied by a standard number of weekly or bi-weekly hours)"]} onChange={(v:string)=>handleProfChange('payRate', v)} />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                             <InputGroup label="Hire Date" type="date" value={professional.hireDate} onChange={(e:any)=>handleProfChange('hireDate', e.target.value)} />
                             <div className="flex items-center h-full pt-6">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                   <input type="checkbox" className="w-5 h-5 text-[#0074D9] rounded border-gray-300 focus:ring-[#0074D9] cursor-pointer" />
                                   <span className="text-sm font-medium text-gray-700 group-hover:text-[#0074D9] transition-colors">EVV Enabled</span>
                                </label>
                             </div>
                          </div>
                       </Accordion>

                       <Accordion title="Availability & Assignment">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 overflow-visible z-10 relative">
                             <InputGroup label="Availability Start Date" type="date" value={professional.availStart} onChange={(e:any)=>handleProfChange('availStart', e.target.value)} />
                             <InputGroup 
                                label="Assigned Region Shifts" 
                                placeholder="e.g., North Zone, Columbus Metro"
                                tooltip="Specify the geographical zone, county, or district where this caregiver is assigned to work (e.g., 'North Zone', 'Columbus Metro'). This helps schedulers quickly match the caregiver to clients in the same vicinity." 
                                value={professional.region} 
                                onChange={(e:any)=>handleProfChange('region', e.target.value)} 
                             />
                          </div>
                          <div className="mb-6">
                             <label className="text-xs text-gray-500 mb-2 block">Days Available</label>
                             <div className="flex gap-2 flex-wrap">
                                {['Monday','Tuesday','Wednesday','Thursday','Friday'].map(d => (
                                   <button key={d} className="px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 rounded-full text-xs font-medium">{d}</button>
                                ))}
                                {['Saturday','Sunday'].map(d => (
                                   <button key={d} className="px-3 py-1 border rounded-full text-xs text-gray-600 hover:bg-gray-50">{d}</button>
                                ))}
                             </div>
                          </div>
                          <div>
                              <label className="text-xs text-gray-500 mb-2 block">Preferred Shift</label>
                              <div className="flex gap-6">
                                 <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                     <input type="checkbox" className="rounded text-[#0074D9] focus:ring-[#0074D9]" /> Morning
                                 </label>
                                 <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                     <input type="checkbox" className="rounded text-[#0074D9] focus:ring-[#0074D9]" /> Evening
                                 </label>
                                 <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                     <input type="checkbox" className="rounded text-[#0074D9] focus:ring-[#0074D9]" /> Night
                                 </label>
                              </div>
                          </div>
                       </Accordion>

                       {/* --- UPDATED: REFERRAL SOURCES --- */}
                       <Accordion title="Referral Sources">
                          <div className="flex justify-end mb-2">
                             <button 
                                onClick={addReferralSource} 
                                className="text-[#0074D9] text-xs font-bold hover:underline flex items-center gap-1"
                             >
                                <i className="fa-solid fa-plus"></i> Add Referral Source
                             </button>
                          </div>
                          
                          <div className="space-y-4">
                             {referralSources.map((source, index) => {
                                const detailLabel = getReferralDetailLabel(source.referredBy);
                                
                                return (
                                   <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-5 relative animate-fade-in">
                                      {/* Remove Button */}
                                      {referralSources.length > 1 && (
                                         <button 
                                            onClick={() => removeReferralSource(index)} 
                                            className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors" 
                                            title="Remove Referral Source"
                                         >
                                            <i className="fa-regular fa-trash-can"></i>
                                         </button>
                                      )}

                                      {/* Top Row: Dropdown + Conditional Field */}
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                         <SelectGroup 
                                            label="Referred By" 
                                            options={["Another Agency", "Temporary Staffing Agency", "Employee Referral", "Online Ad", "Other"]}
                                            value={source.referredBy}
                                            onChange={(val: string) => updateReferralSource(index, 'referredBy', val)} 
                                         />
                                         
                                         {/* Conditional Detail Field */}
                                         {detailLabel ? (
                                            <InputGroup 
                                               label={detailLabel} 
                                               placeholder={`Enter ${detailLabel.replace('*', '').toLowerCase()}`}
                                               value={source.detail}
                                               onChange={(e: any) => updateReferralSource(index, 'detail', e.target.value)} 
                                            />
                                         ) : (
                                            <div className="hidden md:block"></div> 
                                         )}
                                      </div>

                                      {/* Bottom Row: Date & Notes */}
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                         <InputGroup 
                                            label="Referral Date" 
                                            type="date" 
                                            value={source.date}
                                            onChange={(e: any) => updateReferralSource(index, 'date', e.target.value)} 
                                         />
                                         <InputGroup 
                                            label="Notes" 
                                            placeholder="Start Writing..." 
                                            value={source.notes}
                                            onChange={(e: any) => updateReferralSource(index, 'notes', e.target.value)} 
                                         />
                                      </div>
                                   </div>
                                );
                             })}
                          </div>
                       </Accordion>

                       <Accordion title="Notes">
                          <div className="space-y-1">
                             <label className="text-xs font-medium text-gray-700">Additional Notes</label>
                             <textarea 
                                maxLength={8000}
                                className="w-full border border-gray-200 rounded-lg p-3 text-sm h-40 resize-none outline-none focus:border-[#0074D9]"
                                value={professional.notes}
                                onChange={(e)=>handleProfChange('notes', e.target.value)}
                             ></textarea>
                             <p className="text-[10px] text-gray-400 text-right">{professional.notes.length}/8000</p>
                          </div>
                       </Accordion>
                    </div>
                 )}

                 {/* ================= STEP 3: DOCUMENTS ================= */}
                 {step === 3 && (
                    <div className="animate-fade-in space-y-6">
                       <h3 className="font-bold text-gray-800 text-sm">Document & Certification</h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <UploadBox label="Upload CV" uploaded={true} fileName="Nina_CV.pdf" />
                          <UploadBox label="Police Check" uploaded={true} fileName="Police_Check_2024.pdf" />
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <UploadBox label="First Aid Certificate" />
                          <UploadBox label="COVID-19 Vaccination" uploaded={true} fileName="Vax_Cert.pdf" />
                       </div>
                    </div>
                 )}

              </div>

              {/* Footer Actions */}
              <div className="p-2 flex justify-end items-end mt-4">
                 <div className="flex gap-3">
                    {step > 1 && (
                       <button onClick={() => setStep(step - 1)} className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-white transition-colors">
                          Back
                       </button>
                    )}
                    {step < 3 ? (
                       <button onClick={() => setStep(step + 1)} className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-lg transition-colors">
                          Next
                       </button>
                    ) : (
                       <button onClick={() => router.push(`/caregivers/${params.id}`)} className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-lg transition-colors">
                          Save Changes
                       </button>
                    )}
                 </div>
              </div>

           </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

// =========================================================================
// HELPER COMPONENTS
// =========================================================================

function Accordion({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className={`border border-gray-200 rounded-xl bg-white mb-4 shadow-sm animate-fade-in relative ${isOpen ? 'overflow-visible z-40' : 'overflow-hidden z-10'}`}>
      <button 
        type="button" 
        onClick={() => setIsOpen(!isOpen)} 
        className={`w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left relative z-20 ${isOpen ? 'rounded-t-xl' : 'rounded-xl'}`}
      >
        <h3 className="font-bold text-gray-800 text-sm">{title}</h3>
        <i className={`fa-solid fa-chevron-down text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>
      <div className={`transition-all duration-300 ease-in-out relative z-10 ${isOpen ? 'max-h-[2000px] opacity-100 p-6 border-t border-gray-100 overflow-visible' : 'max-h-0 opacity-0 p-0 overflow-hidden'}`}>
        {children}
      </div>
    </div>
  );
}

function StepIndicator({ num, label, current, onClick }: any) {
   const active = current >= num;
   return (
      <div onClick={onClick} className={`flex items-center gap-2 cursor-pointer transition-opacity ${active ? 'opacity-100' : 'opacity-50'}`}>
         <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${current === num ? 'bg-[#0074D9] text-white' : 'bg-gray-200 text-gray-600'}`}>{num}</div>
         <span className={`text-sm font-bold ${current === num ? 'text-[#0074D9]' : 'text-gray-500'}`}>{label}</span>
      </div>
   )
}

function InputGroup({ label, placeholder, type = "text", value, onChange, tooltip }: any) {
   return (
      <div className="space-y-3 w-full overflow-visible relative">
         {label && (
            <div className="flex items-center gap-1.5">
               <label className="text-xs font-medium text-gray-700">{label}</label>
               {tooltip && (
                  <div className="relative group/tooltip flex items-center">
                     <i className="fa-solid fa-circle-question text-[#0074D9] text-xs cursor-help"></i>
                     <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover/tooltip:block w-64 p-2.5 bg-gray-800 text-white text-[10px] rounded-lg shadow-xl z-[100] whitespace-normal leading-relaxed text-center font-normal">
                        {tooltip}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-800"></div>
                     </div>
                  </div>
               )}
            </div>
         )}
         <input 
            type={type} 
            placeholder={placeholder} 
            value={value} 
            onChange={onChange} 
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#0074D9]" 
         />
      </div>
   )
}

function SelectGroup({ label, value, options, onChange }: any) {
   return (
      <div className="space-y-1 w-full">
         {label && <label className="text-xs font-medium text-gray-700">{label}</label>}
         <select value={value} onChange={(e) => onChange && onChange(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white text-gray-700 outline-none focus:border-[#0074D9]">
            <option value="">Select</option>
            {options?.map((opt:string, i:number) => <option key={i} value={opt}>{opt}</option>)}
         </select>
      </div>
   )
}

function MultiSelectDropdown({ label, options, selectedItems = [], onChange }: { label: string, options: string[], selectedItems?: string[], onChange?: (items: string[]) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: any) => { if (ref.current && !ref.current.contains(event.target)) setIsOpen(false); };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    let newSelected;
    if (selectedItems.includes(option)) newSelected = selectedItems.filter((item) => item !== option);
    else newSelected = [...selectedItems, option];
    if (onChange) onChange(newSelected);
  };

  return (
    <div className={`space-y-1 relative ${isOpen ? 'z-[100]' : 'z-10'}`} ref={ref}>
      <label className="text-xs font-medium text-gray-700">{label}</label>
      <div className="relative">
        <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center bg-white border border-gray-200 rounded-lg p-2.5 text-sm text-gray-600 focus:outline-none focus:border-[#0074D9]">
          <span className="truncate block max-w-[90%] text-left">{selectedItems.length === 0 ? "Select" : selectedItems.join(", ")}</span>
          <i className={`fa-solid fa-chevron-down text-xs text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}></i>
        </button>
        {isOpen && (
          <div className="absolute z-[100] mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto custom-scrollbar">
            {options.map((opt, index) => (
              <label key={index} className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0">
                <input type="checkbox" checked={selectedItems.includes(opt)} onChange={() => toggleOption(opt)} className="w-4 h-4 rounded text-[#0074D9] focus:ring-[#0074D9]" />
                <span className="text-sm text-gray-700">{opt}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function UploadBox({ label, uploaded, fileName }: any) {
   return (
      <div>
         <label className="text-xs text-gray-600 mb-1 block">{label}</label>
         <div className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-colors ${uploaded ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}`}>
            {uploaded ? (
               <>
                  <i className="fa-solid fa-file-circle-check text-2xl text-green-500 mb-2"></i>
                  <p className="text-xs text-green-700 font-medium">{fileName}</p>
                  <button className="text-[10px] text-red-500 hover:underline mt-1">Remove</button>
               </>
            ) : (
               <>
                  <i className="fa-solid fa-cloud-arrow-up text-2xl text-gray-400 mb-2"></i>
                  <p className="text-xs text-gray-500">Click to upload</p>
               </>
            )}
         </div>
      </div>
   )
}

function StateIdInput({ label, tooltip, stateValue, idValue, onStateChange, onIdChange }: any) {
  return (
    <div className="space-y-1 w-full overflow-visible">
      <div className="flex items-center gap-1.5">
        <label className="text-xs font-medium text-gray-700">{label}</label>
        {tooltip && (
          <div className="relative group/tooltip flex items-center">
            <i className="fa-solid fa-circle-question text-[#0074D9] text-xs cursor-help"></i>
            <div className="absolute top-full left-[-10px] mt-2 hidden group-hover/tooltip:block w-64 p-2.5 bg-gray-800 text-white text-[10px] rounded-lg shadow-xl z-[100] whitespace-normal leading-relaxed text-left font-normal">
              {tooltip}
              <div className="absolute bottom-full left-[14px] border-4 border-transparent border-b-gray-800"></div>
            </div>
          </div>
        )}
      </div>

      <div className="flex border border-gray-200 rounded-lg focus-within:border-[#0074D9] transition-colors bg-white">
        <select
          value={stateValue}
          onChange={onStateChange}
          className="w-[75px] bg-gray-50 border-r border-gray-200 p-2.5 text-sm text-gray-600 rounded-l-lg outline-none cursor-pointer focus:text-gray-900"
        >
          <option value="">State</option>
          <option value="OH">OH</option>
          <option value="CA">CA</option>
          <option value="NY">NY</option>
          <option value="FL">FL</option>
          <option value="TX">TX</option>
          <option value="VA">VA</option>
        </select>
        <input
          type="text"
          placeholder="Enter ID"
          value={idValue}
          onChange={onIdChange}
          className="flex-1 p-2.5 text-sm outline-none rounded-r-lg w-full min-w-0"
        />
      </div>
    </div>
  );
}