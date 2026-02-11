"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

export default function CaregiverPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  
  // SMS Modal State
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [selectedCaregiver, setSelectedCaregiver] = useState<{name: string, phone: string} | null>(null);

  // Email Modal State (NEW)
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedEmailCaregiver, setSelectedEmailCaregiver] = useState<{name: string, email: string} | null>(null);

  // Mock Data (Added 'email' field for the modal)
  const caregivers = [
    { id: "CG-00012", name: "Olivia Thompson", role: "HHA", phone: "(202) 999-6969", email: "olivia.t@karixa.com", zone: "Cleveland, Northeast Ohio", nextShift: "22 April, 2025 | 8:00 AM", status: "Active", img: 1 },
    { id: "CG-00018", name: "Jack Williams", role: "CNA", phone: "(202) 999-6969", email: "jack.w@karixa.com", zone: "Columbus Area", nextShift: "22 April, 2025 | 8:00 AM", status: "Active", img: 2 },
    { id: "CG-00014", name: "Amelia Robinson", role: "PCA", phone: "(202) 999-6969", email: "amelia.r@karixa.com", zone: "Marietta , Southeast Ohio", nextShift: "22 April, 2025 | 8:00 AM", status: "Active", img: 3 },
    { id: "CG-00020", name: "Liam Harris", role: "HHA", phone: "(202) 999-6969", email: "liam.h@karixa.com", zone: "Cleveland, Northeast Ohio", nextShift: "22 April, 2025 | 8:00 AM", status: "Active", img: 4 },
    { id: "CG-00024", name: "Charlotte White", role: "CNA", phone: "(202) 999-6969", email: "charlotte.w@karixa.com", zone: "Columbus Area", nextShift: "22 April, 2025 | 8:00 AM", status: "Active", img: 5 },
  ];

  const handlePhoneClick = (cg: any) => {
    setSelectedCaregiver({ name: cg.name, phone: cg.phone });
    setShowSmsModal(true);
  };

  // Handle Email Icon Click
  const handleEmailClick = (cg: any) => {
    setSelectedEmailCaregiver({ name: cg.name, email: cg.email });
    setShowEmailModal(true);
  };

  return (
    <DashboardLayout>
      <div className="p-0 space-y-6">
        
        {/* Header */}
        <div>
           <h1 className="text-2xl font-bold text-gray-800">Caregiver</h1>
           <div className="text-sm text-gray-500">Dashboard / Caregiver</div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
           <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative">
               <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
               <input 
                 type="text" 
                 placeholder="Search..." 
                 className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand w-40"
               />
            </div>

            {/* Dropdowns */}
            <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none cursor-pointer">
              <option>Status</option><option>Active</option><option>Inactive</option><option>Other</option>
            </select>
            <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none cursor-pointer">
              <option>Supervisor</option><option>John Doe</option><option>Jane Smith</option>
            </select>
            <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none cursor-pointer">
              <option>Type</option><option>(PCA)</option><option>(CNA)</option><option>(HHA)</option>
            </select>
            <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none cursor-pointer">
              <option>Skills</option>
               <option>DODD Medication Category 1</option>
<option>DODD Medication Category 2</option>
<option>DODD Medication Category 3</option>
<option>Vagus Nerve Stimulator (VNS) Certified</option>
<option>Hoyer Lift</option>
<option>Gait Belt Transfers</option>
<option>Catheter Care</option>
<option>Licensed Driver</option>
<option>Severe Behavior Experience</option>
<option>Seizure Experience</option>
<option>Dementia Care Experience</option>
<option>Wound Care Certified (LPNs & RNs only)</option>             
            </select>

            <button className="text-sm text-gray-400 hover:text-gray-600 border-l border-gray-200 pl-4 ml-2">| Clear Filter</button>
          </div>
           <div className="flex gap-2">
              <button onClick={() => setShowAddModal(true)} className="px-5 py-2 text-sm font-medium text-white bg-[#0074D9] rounded-lg hover:bg-[#0062b8] transition-colors shadow-sm">Add Caregiver</button>
           </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-visible">
           <div className="overflow-visible"> 
              <table className="w-full text-left text-sm">
                 <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                    <tr>
                       <th className="p-4">SNO</th>
                       <th className="p-4">Name</th>
                       <th className="p-4">ID Number</th>
                       <th className="p-4">Type</th>
                       <th className="p-4">Phone</th>
                       <th className="p-4">Assigned Client</th>
                       <th className="p-4">Assigned Zone</th>
                       <th className="p-4">Next Shift</th>
                       <th className="p-4">Status</th>
                       <th className="p-4 text-right"></th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {caregivers.map((cg, i) => (
                       <tr key={cg.id} className="hover:bg-gray-50/50 transition-colors group relative z-0 hover:z-20">
                          <td className="p-4 text-gray-500">{i + 1}</td>
                          <td className="p-4">
                             <Link href={`/caregivers/${cg.id}`} className="flex items-center gap-3 cursor-pointer hover:text-[#0074D9] transition-colors">
                                <img src={`https://i.pravatar.cc/150?img=${cg.img}`} alt={cg.name} className="w-8 h-8 rounded-full object-cover" />
                                <span className="font-medium text-gray-800">{cg.name}</span>
                             </Link>
                          </td>
                          <td className="p-4 text-gray-600">{cg.id}</td>
                          <td className="p-4 text-gray-600">{cg.role}</td>
                          
                          {/* Phone Number Link */}
                          <td className="p-4">
                             <button 
                                onClick={(e) => { e.stopPropagation(); handlePhoneClick(cg); }}
                                className="text-gray-600 hover:text-[#0074D9] hover:underline flex items-center gap-2"
                                title="Send Message"
                             >
                                {cg.phone}
                                <i className="fa-regular fa-comment-dots text-xs text-[#0074D9] opacity-0 group-hover:opacity-100 transition-opacity"></i>
                             </button>
                          </td>

                          {/* ASSIGNED CLIENT HOVER */}
                          <td className="p-4 overflow-visible">
                             <div className="flex -space-x-2 items-center relative">
                                {[
                                   { name: "Jane Doe", img: 10 },
                                   { name: "John Smith", img: 11 }
                                ].map((client, idx) => (
                                   <Link 
                                      key={idx} 
                                      href="/clients/profile" 
                                      className="relative group/client cursor-pointer hover:z-50"
                                   >
                                      <img 
                                         src={`https://i.pravatar.cc/150?img=${client.img}`} 
                                         className="w-6 h-6 rounded-full border border-white object-cover shadow-sm transition-transform group-hover/client:scale-110" 
                                         alt={client.name} 
                                      />
                                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-40 bg-white rounded-xl shadow-xl border border-gray-200 p-4 flex flex-col items-center hidden group-hover/client:flex z-50 animate-fade-in origin-bottom">
                                         <img 
                                            src={`https://i.pravatar.cc/150?img=${client.img}`} 
                                            className="w-16 h-16 rounded-full object-cover border-4 border-gray-100 mb-2 shadow-sm" 
                                            alt={client.name} 
                                         />
                                         <span className="text-sm font-bold text-gray-800 text-center leading-tight mb-2">{client.name}</span>
                                         <span className="text-[10px] text-[#0074D9] font-bold bg-blue-50 px-3 py-1 rounded-full border border-blue-100">View Profile</span>
                                         <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-gray-200 transform rotate-45"></div>
                                      </div>
                                   </Link>
                                ))}
                             </div>
                          </td>

                          <td className="p-4 text-gray-600">{cg.zone}</td>
                          
                          {/* --- UPDATED: NEXT SHIFT LINK --- */}
                          <td className="p-4">
                             <Link 
                                href={`/caregivers/${cg.id}`} // Links to profile (schedule section)
                                className="text-gray-600 text-xs hover:text-[#0074D9] hover:underline"
                             >
                                {cg.nextShift}
                             </Link>
                          </td>
                          {/* -------------------------------- */}

                          <td className="p-4"><span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">{cg.status}</span></td>
                          
                          {/* Actions */}
                          <td className="p-4 text-right">
                             <div className="flex justify-end gap-2">
                                <button className="w-7 h-7 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center"><i className="fa-regular fa-eye text-xs"></i></button>
                                
                                {/* --- UPDATED: EMAIL ICON --- */}
                                <button 
                                   onClick={() => handleEmailClick(cg)}
                                   className="w-7 h-7 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center hover:bg-[#0074D9] hover:text-white transition-colors"
                                >
                                   <i className="fa-regular fa-envelope text-xs"></i>
                                </button>
                                {/* --------------------------- */}

                                <button className="w-7 h-7 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center"><i className="fa-regular fa-calendar text-xs"></i></button>
                                <button className="w-7 h-7 rounded-full bg-green-50 text-green-600 flex items-center justify-center"><i className="fa-solid fa-dollar-sign text-xs"></i></button>
                                <button className="w-7 h-7 rounded-full bg-red-50 text-red-500 flex items-center justify-center"><i className="fa-regular fa-trash-can text-xs"></i></button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           <div className="p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
              <span>Showing 1 to 10 of 1000 Results</span>
              <div className="flex gap-2"><button className="flex items-center gap-1 hover:text-brand">Previous</button><button className="flex items-center gap-1 text-brand font-medium">Next</button></div>
           </div>
        </div>

        {/* --- Modals --- */}
        {showAddModal && <AddCaregiverModal onClose={() => setShowAddModal(false)} />}
        
        {/* SMS Modal */}
        {showSmsModal && selectedCaregiver && (
           <SmsModal 
              recipient={selectedCaregiver} 
              onClose={() => setShowSmsModal(false)} 
           />
        )}

        {/* NEW: Email Modal */}
        {showEmailModal && selectedEmailCaregiver && (
           <EmailModal 
              recipient={selectedEmailCaregiver} 
              onClose={() => setShowEmailModal(false)} 
           />
        )}

      </div>
    </DashboardLayout>
  );
}

// =========================================================================
// NEW: EMAIL MODAL
// =========================================================================
function EmailModal({ recipient, onClose }: { recipient: { name: string, email: string }, onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "unset"; }; }, []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col animate-scale-up relative">
          
          {/* Header */}
          <div className="flex justify-between items-center p-5 border-b border-gray-100">
             <div>
                <h2 className="text-lg font-bold text-gray-800">Send Email</h2>
                <p className="text-xs text-gray-500">To: <span className="font-semibold text-gray-700">{recipient.name}</span> ({recipient.email})</p>
             </div>
             <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 transition-colors"><i className="fa-solid fa-xmark"></i></button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
             <div className="space-y-1">
                <label className="text-xs font-medium text-gray-600">Subject</label>
                <input 
                   type="text" 
                   className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#0074D9]"
                   placeholder="Enter subject..."
                />
             </div>
             <div className="space-y-1">
                <label className="text-xs font-medium text-gray-600">Message</label>
                <textarea 
                   className="w-full border border-gray-200 rounded-lg p-3 text-sm h-40 resize-none outline-none focus:border-[#0074D9] placeholder:text-gray-300"
                   placeholder="Type your email content here..."
                ></textarea>
             </div>
             <div className="flex items-center gap-2">
                <input type="checkbox" id="cc-myself" className="rounded border-gray-300 text-[#0074D9] focus:ring-[#0074D9]" />
                <label htmlFor="cc-myself" className="text-xs text-gray-500">Send me a copy</label>
             </div>
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-2xl">
             <button onClick={onClose} className="px-5 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-white transition-colors">Cancel</button>
             <button onClick={() => { console.log("Email Sent"); onClose(); }} className="px-5 py-2 bg-[#0074D9] text-white rounded-lg text-sm font-medium hover:bg-[#0062b8] transition-colors flex items-center gap-2">
                <i className="fa-regular fa-paper-plane"></i> Send Email
             </button>
          </div>

       </div>
    </div>, document.body
  );
}

// =========================================================================
// SMS MODAL
// =========================================================================
function SmsModal({ recipient, onClose }: { recipient: { name: string, phone: string }, onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "unset"; }; }, []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl flex flex-col animate-scale-up relative">
          <div className="flex justify-between items-center p-5 border-b border-gray-100">
             <div><h2 className="text-lg font-bold text-gray-800">Send Message</h2><p className="text-xs text-gray-500">To: <span className="font-semibold text-gray-700">{recipient.name}</span> ({recipient.phone})</p></div>
             <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 transition-colors"><i className="fa-solid fa-xmark"></i></button>
          </div>
          <div className="p-5 space-y-4">
             <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Message</label><textarea className="w-full border border-gray-200 rounded-lg p-3 text-sm h-32 resize-none outline-none focus:border-[#0074D9] placeholder:text-gray-300" placeholder="Type your message here..." autoFocus></textarea></div>
             <div className="flex items-center gap-2"><input type="checkbox" id="copy-email" className="rounded border-gray-300 text-[#0074D9] focus:ring-[#0074D9]" /><label htmlFor="copy-email" className="text-xs text-gray-500">Send copy to email</label></div>
          </div>
          <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-2xl">
             <button onClick={onClose} className="px-5 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-white transition-colors">Cancel</button>
             <button onClick={() => { console.log("Sent"); onClose(); }} className="px-5 py-2 bg-[#0074D9] text-white rounded-lg text-sm font-medium hover:bg-[#0062b8] transition-colors flex items-center gap-2"><i className="fa-regular fa-paper-plane"></i> Send</button>
          </div>
       </div>
    </div>, document.body
  );
}

// =========================================================================
// ADD CAREGIVER MODAL (Updated Step 2 & 3)
// =========================================================================
function AddCaregiverModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "unset"; }; }, []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-6xl shadow-2xl flex flex-col max-h-[95vh] animate-slide-up relative">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 relative">
             <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"><i className="fa-solid fa-xmark text-xl"></i></button>
             <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1 mb-2"><i className="fa-solid fa-chevron-left text-xs"></i> Back</button>
             <h2 className="text-2xl font-bold text-gray-800">Add New Caregiver</h2>
             <p className="text-sm text-gray-500">Fill in the caregiver's personal details to begin managing their care within the Agency Portal.</p>
          </div>

          {/* Stepper */}
          <div className="bg-blue-50/50 py-6 border-b border-gray-100 flex justify-center">
             <div className="flex items-center gap-4">
                <StepIndicator num={1} label="Basic Information" sub="Provide information about client" current={step} />
                <div className="w-12 h-px bg-gray-300"></div>
                <StepIndicator num={2} label="Professional Detail" sub="Provide more detail of caregiver" current={step} />
                <div className="w-12 h-px bg-gray-300"></div>
                <StepIndicator num={3} label="Documents & Certifications" sub="Provide detail document of caregiver" current={step} />
             </div>
          </div>

          {/* Form Content */}
          <div className="p-8 overflow-y-auto flex-1">
             {step === 1 && (
                <div className="animate-slide-up space-y-6">
                   <h3 className="font-bold text-gray-800 text-sm">Basic Information</h3>
                   <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <SelectGroup label="Title" options={["None", "Mr.", "Mrs.", "Ms.", "Miss", "Mx.", "Dr."]} />
                      <InputGroup label="First Name*" placeholder="Enter First Name" />
                      <InputGroup label="Middle Name" placeholder="Enter Middle Name" />
                      <InputGroup label="Last Name*" placeholder="Enter Last Name" />
                      <SelectGroup label="Suffix" options={["None", "Jr.", "Sr.", "II", "III", "RN", "LPN", "CNA"]} />
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <SelectGroup label="Gender*" options={["Male", "Female", "Other"]} />
                      <InputGroup label="Date of Birth*" type="date" /> 
                      <InputGroup label="Phone Number" placeholder="+1 000000000" />
                      <InputGroup label="Email" placeholder="Enter email address" />
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <InputGroup label="Social Security Number (SSN)" placeholder="Enter SSN number" />
                      <SelectGroup label="Primary Language" options={["English", "Mandarin", "Hindi", "Spanish", "French", "Modern Standard Arabic", "Portuguese", "Russian", "Bengali", "Urdu", "German", "Italian", "Japanese", "Nigerian Pidgin"]} />
                      <SelectGroup label="Secondary Language" options={["English", "Mandarin", "Hindi", "Spanish", "French", "Modern Standard Arabic", "Portuguese", "Russian", "Bengali", "Urdu", "German", "Italian", "Japanese", "Nigerian Pidgin"]} />
                      <SelectGroup label="Race" options={["Asian", "American indian", "African American or Black", "Hispanic or Latino", "White or Caucasian", "European American", "Multiracial", "Native Hawaiian",  "Pacific Islander", "Unknown"]} />
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <InputGroup label="Street Address" placeholder="Enter" />
                      <InputGroup label="City" placeholder="Enter" />
                      <InputGroup label="State*" placeholder="Enter" />
                      <InputGroup label="Zip Code*" placeholder="Enter" />
                   </div>
                </div>
             )}

             {step === 2 && (
                /* STEP 2: PROFESSIONAL DETAIL */
                <div className="animate-slide-up space-y-6">
                   <h3 className="font-bold text-gray-800 text-sm">Professional Details</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <SelectGroup label="Caregiver Type" options={["Personal Care Assistant (PCA)", "Certified Nursing Assistant (CNA)", "Home Health Aide (HHA)"]} />
                      <InputGroup label="Caregiver ID" placeholder="CG-00023" />
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <SelectGroup label="Qualification" options={["Certificate III", "Certificate IV", "Diploma", "Bachelor"]} />
                      <InputGroup label="Years of Experience*" placeholder="Enter" />
                   </div>
                   <InputGroup label="Hourly Charge" placeholder="Enter" />

                   <h3 className="font-bold text-gray-800 text-sm pt-4">Availability & Assignment</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputGroup label="Availability Start Date" type="date" />
                      <InputGroup label="Assigned Region Shifts" placeholder="Enter" />
                   </div>
                   
                   {/* Days Available */}
                   <div>
                      <label className="text-xs text-gray-500 mb-2 block">Days Available</label>
                      <div className="flex gap-2 flex-wrap">
                         {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(d => (
                            <button key={d} className="px-3 py-1 border rounded-full text-xs text-gray-600 hover:bg-gray-50 transition-colors">{d}</button>
                         ))}
                      </div>
                   </div>

                   {/* Preferred Shift */}
                   <div>
                      <label className="text-xs text-gray-500 mb-2 block">Preferred Shift</label>
                      <div className="flex gap-6">
                         <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"><input type="checkbox" className="rounded text-[#0074D9] focus:ring-[#0074D9]" /> Morning</label>
                         <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"><input type="checkbox" className="rounded text-[#0074D9] focus:ring-[#0074D9]" /> Evening</label>
                         <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"><input type="checkbox" className="rounded text-[#0074D9] focus:ring-[#0074D9]" /> Night</label>
                      </div>
                   </div>
                </div>
             )}

             {step === 3 && (
                /* STEP 3: DOCUMENTS */
                <div className="animate-slide-up space-y-6">
                   <h3 className="font-bold text-gray-800 text-sm">Document & Certification</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <UploadBox label="Upload CV" />
                      <UploadBox label="Police Check" />
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <UploadBox label="First Aid Certificate" />
                      <UploadBox label="COVID-19 Vaccination" />
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <UploadBox label="Drivers License" />
                      <UploadBox label="Other Certifications" />
                   </div>
                </div>
             )}
          </div>

          <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-2xl">
             {step > 1 && <button onClick={() => setStep(step - 1)} className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 text-sm font-medium hover:bg-white transition-colors">Back</button>}
             {step < 3 ? <button onClick={() => setStep(step + 1)} className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-lg transition-colors">Next</button> : <button onClick={() => { console.log("Saved"); onClose(); }} className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-lg transition-colors">Save</button>}
          </div>
       </div>
    </div>, document.body
  );
}

function StepIndicator({ num, label, sub, current }: any) {
   const active = current >= num;
   return (
      <div className={`flex items-center gap-2 ${active ? 'opacity-100' : 'opacity-50'}`}>
         <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${current === num ? 'bg-[#0074D9] text-white' : 'bg-gray-200 text-gray-600'}`}>{num}</div>
         <div className="text-left"><p className={`text-sm font-bold ${current === num ? 'text-[#0074D9]' : 'text-gray-500'}`}>{label}</p><p className="text-[10px] text-gray-500">{sub}</p></div>
      </div>
   )
}

function InputGroup({ label, placeholder, icon, type = "text" }: any) {
   return (
      <div className="space-y-1">
         <label className="text-xs font-medium text-gray-700">{label}</label>
         <div className="relative">
            <input type={type} placeholder={placeholder} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-brand" />
            {icon === 'calendar' && type !== 'date' && <i className="fa-regular fa-calendar absolute right-3 top-3 text-gray-400 pointer-events-none"></i>}
         </div>
      </div>
   )
}

function SelectGroup({ label, options }: { label: string, options?: string[] }) {
   return (
      <div className="space-y-1">
         <label className="text-xs font-medium text-gray-700">{label}</label>
         <select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white text-gray-500 outline-none focus:border-brand">
            <option value="">Select</option>
            {options?.map((opt, index) => <option key={index} value={opt}>{opt}</option>)}
         </select>
      </div>
   )
}

function UploadBox({ label }: any) {
   return (
      <div>
         <label className="text-xs text-gray-600 mb-1 block">{label}</label>
         <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50">
            <i className="fa-solid fa-cloud-arrow-up text-2xl text-gray-400 mb-2"></i>
            <p className="text-xs text-gray-500">Drag and drop or click to upload file</p>
         </div>
      </div>
   )
}