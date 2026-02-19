"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MultiSelectDropdown from "@/components/MultiSelectDropdown";
import MultiSelectInput from "@/components/ui/MultiSelectInput";

export default function EmployeePage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<{name: string, phone: string} | null>(null);
  
  // --- SORTING STATE ---
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // Mock Data
  const employees = [
    { id: "EM-10001", name: "Olivia Thompson", phone: "(202) 555-0101", shift: "8:30 AM | 7:00 PM", date: "Feb 01, 2023", status: "Active", img: 1 },
    { id: "EM-10002", name: "Alexander Smith", phone: "(202) 555-0102", shift: "10:00 AM | 5:30 PM", date: "Feb 01, 2023", status: "Active", img: 2 },
    { id: "EM-10003", name: "Amelia Robinson", phone: "(202) 555-0103", shift: "8:15 AM | 7:45 PM", date: "Feb 01, 2023", status: "Active", img: 3 },
    { id: "EM-10004", name: "Liam Harris", phone: "(202) 555-0104", shift: "7:45 AM | 6:15 PM", date: "Feb 01, 2023", status: "Active", img: 4 },
    { id: "EM-10005", name: "Charlotte White", phone: "(202) 555-0105", shift: "11:00 AM | 4:45 PM", date: "Feb 01, 2023", status: "Active", img: 5 },
  ];

  // --- SORTING LOGIC ---
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedEmployees = [...employees].sort((a: any, b: any) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const getSortIcon = (key: string) => {
    if (sortConfig?.key !== key) return <i className="fa-solid fa-sort text-gray-300 text-[10px]"></i>;
    return sortConfig.direction === 'asc' 
      ? <i className="fa-solid fa-sort-up text-[#0074D9] text-[10px]"></i> 
      : <i className="fa-solid fa-sort-down text-[#0074D9] text-[10px]"></i>;
  };

  // --- SMS HANDLER ---
  const handlePhoneClick = (emp: any) => {
    setSelectedEmployee({ name: emp.name, phone: emp.phone });
    setShowSmsModal(true);
  };

  return (
    <DashboardLayout>
      <div className="p-0 space-y-6">
        
        {/* Header */}
        <div>
           <h1 className="text-2xl font-bold text-gray-800">Employee</h1>
           <div className="text-sm text-gray-500">Dashboard / Employee</div>
        </div>

        {/* Controls */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
           {/* Filters */}
           <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <div className="relative">
               <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
               <input type="text" placeholder="Search..." className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand w-64" />
            </div>
            <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none cursor-pointer"><option>Status</option><option>Active</option></select>
            <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none cursor-pointer"><option>Supervisor</option></select>
            <button className="text-sm text-gray-400 hover:text-gray-600 border-l border-gray-200 pl-4 ml-2">| Clear Filter</button>
          </div>
           <button onClick={() => setShowAddModal(true)} className="px-5 py-2 text-sm font-medium text-white bg-[#0074D9] rounded-lg hover:bg-[#0062b8] transition-colors shadow-sm">Add Employee</button>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-visible shadow-sm">
           <div className="overflow-visible"> 
              <table className="w-full text-left text-sm">
                 <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold border-b border-gray-100">
                    <tr>
                       <th className="p-4 w-12"><input type="checkbox" className="rounded" /></th>
                       
                       <th className="p-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('id')}>
                          <div className="flex items-center gap-2">ID Number {getSortIcon('id')}</div>
                       </th>
                       <th className="p-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('name')}>
                          <div className="flex items-center gap-2">Name {getSortIcon('name')}</div>
                       </th>
                       <th className="p-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('phone')}>
                          <div className="flex items-center gap-2">Phone {getSortIcon('phone')}</div>
                       </th>
                       <th className="p-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('shift')}>
                          <div className="flex items-center gap-2">Schedule Shift {getSortIcon('shift')}</div>
                       </th>
                       <th className="p-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('date')}>
                          <div className="flex items-center gap-2">Reg. Date {getSortIcon('date')}</div>
                       </th>
                       <th className="p-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('status')}>
                          <div className="flex items-center gap-2">Status {getSortIcon('status')}</div>
                       </th>
                       <th className="p-4 text-right">Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {sortedEmployees.map((emp) => (
                       <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors group relative z-0 hover:z-20">
                          <td className="p-4"><input type="checkbox" className="rounded" /></td>
                          <td className="p-4 text-gray-600">{emp.id}</td>
                          <td className="p-4">
                             <Link href={`/employees/${emp.id}`} className="flex items-center gap-3 cursor-pointer hover:text-[#0074D9] transition-colors">
                                <img src={`https://i.pravatar.cc/150?img=${emp.img}`} alt={emp.name} className="w-8 h-8 rounded-full object-cover" />
                                <span className="font-medium text-gray-800">{emp.name}</span>
                             </Link>
                          </td>
                          
                          {/* Phone (Clickable for SMS) */}
                          <td className="p-4">
                             <button 
                                onClick={(e) => { e.stopPropagation(); handlePhoneClick(emp); }} 
                                className="text-gray-600 hover:text-[#0074D9] hover:underline flex items-center gap-2 group/phone"
                             >
                                {emp.phone}
                                <i className="fa-regular fa-comment-dots text-xs text-[#0074D9] opacity-0 group-hover/phone:opacity-100 transition-opacity"></i>
                             </button>
                          </td>

                          <td className="p-4 text-gray-800 font-medium">{emp.shift}</td>
                          <td className="p-4 text-gray-600">{emp.date}</td>
                          <td className="p-4"><span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">{emp.status}</span></td>
                          
                          {/* Actions with Tooltips */}
                          <td className="p-4 text-right overflow-visible">
                             <div className="flex justify-end gap-2">
                                <Link href={`/employees/${emp.id}`}>
                                   <button className="relative group/tooltip w-8 h-8 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 flex items-center justify-center transition-colors">
                                      <i className="fa-regular fa-eye text-xs"></i>
                                      <div className="absolute bottom-full right-0 mb-2 hidden group-hover/tooltip:block w-max px-2 py-1 bg-gray-800 text-white text-[10px] rounded shadow-lg z-50 whitespace-nowrap font-normal">
                                         Employee Profile
                                         <div className="absolute top-full right-3 border-4 border-transparent border-t-gray-800"></div>
                                      </div>
                                   </button>
                                </Link>
                                <button className="relative group/tooltip w-8 h-8 rounded-full bg-yellow-50 text-yellow-600 hover:bg-yellow-100 flex items-center justify-center transition-colors">
                                   <i className="fa-regular fa-calendar text-xs"></i>
                                </button>
                                <button className="relative group/tooltip w-8 h-8 rounded-full bg-green-50 text-green-600 hover:bg-green-100 flex items-center justify-center transition-colors">
                                   <i className="fa-solid fa-dollar-sign text-xs"></i>
                                </button>
                                <button className="relative group/tooltip w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors">
                                   <i className="fa-regular fa-trash-can text-xs"></i>
                                </button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           {/* Pagination Footer */}
           <div className="p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
              <span>Showing 1 to 10 of 1000 Results</span>
              <div className="flex gap-2"><button className="hover:text-brand">Previous</button><button className="text-brand font-medium">Next</button></div>
           </div>
        </div>

        {/* --- MODALS --- */}
        {showAddModal && <AddEmployeeModal onClose={() => setShowAddModal(false)} />}
        {showSmsModal && selectedEmployee && (
           <SmsModal recipient={selectedEmployee} onClose={() => setShowSmsModal(false)} />
        )}

      </div>
    </DashboardLayout>
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
         <div className="bg-white rounded-xl w-full max-w-md shadow-2xl animate-scale-up relative overflow-hidden">
            <div className="bg-[#0074D9] p-4 flex justify-between items-center">
               <h3 className="text-white font-bold flex items-center gap-2"><i className="fa-regular fa-comment-dots"></i> Send Message</h3>
               <button onClick={onClose} className="text-white/80 hover:text-white"><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="p-6 space-y-4">
               <div>
                  <label className="text-xs text-gray-500 font-medium block mb-1">To</label>
                  <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
                     <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">{recipient.name.charAt(0)}</div>
                     <div>
                        <p className="text-sm font-bold text-gray-800">{recipient.name}</p>
                        <p className="text-xs text-gray-500">{recipient.phone}</p>
                     </div>
                  </div>
               </div>
               <div>
                  <label className="text-xs text-gray-500 font-medium block mb-1">Message</label>
                  <textarea className="w-full border border-gray-200 rounded-lg p-3 text-sm h-32 resize-none focus:border-[#0074D9] outline-none placeholder:text-gray-400" placeholder="Type your message here..."></textarea>
               </div>
               <button onClick={onClose} className="w-full bg-[#0074D9] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#0062b8] transition-colors shadow-lg">Send Message</button>
            </div>
         </div>
      </div>, document.body
   );
}

// =========================================================================
// HELPER COMPONENTS (For Add Employee Modal)
// =========================================================================

function Accordion({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className={`border border-gray-200 rounded-xl bg-white mb-4 shadow-sm animate-fade-in ${isOpen ? 'overflow-visible' : 'overflow-hidden'}`}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left ${isOpen ? 'rounded-t-xl' : 'rounded-xl'}`}
      >
        <h3 className="font-bold text-gray-800 text-sm">{title}</h3>
        <i className={`fa-solid fa-chevron-down text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100 p-6 border-t border-gray-100 overflow-visible' : 'max-h-0 opacity-0 p-0 overflow-hidden'}`}
      >
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
      <select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white text-gray-600 outline-none focus:border-[#0074D9]">
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
      <input type="date" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#0074D9] text-gray-600" />
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
// MAIN ADD EMPLOYEE MODAL (UPDATED)
// =========================================================================

function AddEmployeeModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);

    // 1. Phone Numbers State
    const [phones, setPhones] = useState([{ type: "Cell Phone", number: "", note: "" }]);
    
    // 2. Email Addresses State
    const [emails, setEmails] = useState([{ type: "Work", address: "", note: "" }]);
  
    // 3. Emergency Contacts State (NEW)
    const [emergencyContacts, setEmergencyContacts] = useState([
      { name: "", relation: "", phone: "", email: "", address: "" }
    ]);

      // NEW: State for Step 3 (Dynamic Documents with Type)
      const [documents, setDocuments] = useState([
        { type: "Document", title: "", file: null } 
      ]);

  useEffect(() => { setMounted(true); document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "unset"; }; }, []);
  if (!mounted) return null;

   // --- Handlers ---
  const addPhone = () => setPhones([...phones, { type: "Cell Phone", number: "", note: "" }]);
  const removePhone = (index: number) => setPhones(phones.filter((_, i) => i !== index));
  
  const addEmail = () => setEmails([...emails, { type: "Work", address: "", note: "" }]);
  const removeEmail = (index: number) => setEmails(emails.filter((_, i) => i !== index));

  // Emergency Contact Handlers
  const addEmergencyContact = () => setEmergencyContacts([...emergencyContacts, { name: "", relation: "", phone: "", email: "", address: "" }]);
  const removeEmergencyContact = (index: number) => setEmergencyContacts(emergencyContacts.filter((_, i) => i !== index));
  const updateEmergencyContact = (index: number, field: string, value: string) => {
    const updated = [...emergencyContacts];
    // @ts-ignore
    updated[index][field] = value;
    setEmergencyContacts(updated);
  };

 // NEW: Document Handlers
  const addDocument = () => setDocuments([...documents, { type: "Document", title: "", file: null }]);
  const removeDocument = (index: number) => setDocuments(documents.filter((_, i) => i !== index));
  
  const updateDocument = (index: number, field: string, value: string) => {
    const updated = [...documents];
    // @ts-ignore
    updated[index][field] = value;
    setDocuments(updated);
  };


  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-6xl shadow-2xl flex flex-col max-h-[95vh] animate-slide-up relative">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 bg-white rounded-t-2xl z-10">
             <div className="flex justify-between items-center mb-2">
                <button onClick={onClose} className="text-xs font-medium text-gray-500 hover:text-gray-800 flex items-center gap-1 transition-colors">
                  <i className="fa-solid fa-chevron-left text-[10px]"></i> Cancel
                </button>
                <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                  <i className="fa-solid fa-xmark text-xl text-gray-400"></i>
                </button>
             </div>
             <h2 className="text-2xl font-bold text-gray-800">Add New Employee</h2>
             <p className="text-sm text-gray-500">Create a new internal employee record.</p>
          </div>

          {/* Stepper */}
          <div className="bg-blue-50/50 py-5 border-b border-gray-100 flex justify-center sticky top-0 z-10">
             <div className="flex items-center gap-6 md:gap-12">
                <StepIndicator num={1} label="Identity" sub="Personal Details" current={step} />
                <div className="hidden md:block w-12 h-px bg-gray-300"></div>
                <StepIndicator num={2} label="Employment" sub="Role & Status" current={step} />
                <div className="hidden md:block w-12 h-px bg-gray-300"></div>
                <StepIndicator num={3} label="Access" sub="System & Notes" current={step} />
             </div>
          </div>

          {/* Form Content */}
          <div className="p-8 overflow-y-auto flex-1 custom-scrollbar bg-gray-50/30">
             
             {/* Step 1 */}
             {step === 1 && (
                <div className="animate-slide-up space-y-4">
                   <Accordion title="Basic Information" defaultOpen={true}>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <SelectInput label="Title" options={["Mr.", "Mrs.", "Ms.", "Miss", "Dr."]} />
                          <InputField label="First Name*" placeholder="Jane" />
                          <InputField label="Middle Name" placeholder="Marie" />
                          <InputField label="Last Name*" placeholder="Doe" />
                         
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                         <SelectInput label="Suffix" options={["Jr.", "Sr.", "II", "III"]} />
                          <SelectInput label="Gender*" options={["Male", "Female", "Other"]} />
                          <DateInput label="Date of Birth*" />
                          <SelectInput label="Marital Status" options={["Single", "Married", "Divorced"]} />
                         
                      </div>
                       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                         <InputField label="SSN* (Masked)" placeholder="XXX-XX-XXXX" />
                           <SelectInput label="Primary Language" options={["English", "Mandarin", "Hindi", "Spanish", "French", "Modern Standard Arabic", "Portuguese", "Russian", "Bengali", "Urdu", "German", "Italian", "Japanese", "Nigerian Pidgin"]} />
                           <MultiSelectDropdown label="Secondary Language" options={["English", "Mandarin", "Hindi", "Spanish", "French", "Modern Standard Arabic", "Portuguese", "Russian", "Bengali", "Urdu", "German", "Italian", "Japanese", "Nigerian Pidgin"]} />
                           <MultiSelectDropdown label="Race" options={["Asian", "American indian", "African American or Black", "Hispanic or Latino", "White or Caucasian", "European American", "Multiracial", "Native Hawaiian",  "Pacific Islander", "Unknown"]} />
                      </div>
                   </Accordion>
               
      {/* 2. PHONE NUMBERS (Collapsed by default) */}
      <Accordion title="Phone Numbers">
         <div className="flex justify-end mb-2">
            <button onClick={addPhone} className="text-[#0074D9] text-xs font-bold hover:underline flex items-center gap-1"><i className="fa-solid fa-plus"></i> Add Phone</button>
         </div>
         <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
            {phones.map((phone, index) => (
               <div key={index} className="grid grid-cols-12 gap-4 items-end border-b border-gray-200 last:border-0 pb-3 last:pb-0">
                  <div className="col-span-2">
                     <label className="text-xs font-medium text-gray-500 mb-1 block">Type</label>
                     <select className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:border-[#0074D9] outline-none">
                        <option>Cell</option><option>Home</option><option>Work</option>
                     </select>
                  </div>
                  <div className="col-span-3">
                     <InputField label="Number" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div className="col-span-5">
                     <label className="text-xs font-medium text-gray-500 mb-1 block">Note</label>
                     <input type="text" maxLength={100} placeholder="Max 100 chars" className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:border-[#0074D9] outline-none" />
                  </div>
                  <div className="col-span-2 flex justify-end gap-2 pb-1">
                     {phones.length > 1 && (
                        <button onClick={() => removePhone(index)} className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-500 rounded hover:bg-red-100"><i className="fa-regular fa-trash-can text-xs"></i></button>
                     )}
                  </div>
               </div>
            ))}
         </div>
      </Accordion>

      {/* 3. EMAIL ADDRESSES (Collapsed by default) */}
      <Accordion title="Email Addresses">
         <div className="flex justify-end mb-2">
            <button onClick={addEmail} className="text-[#0074D9] text-xs font-bold hover:underline flex items-center gap-1"><i className="fa-solid fa-plus"></i> Add Email</button>
         </div>
         <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
            {emails.map((email, index) => (
               <div key={index} className="grid grid-cols-12 gap-4 items-end border-b border-gray-200 last:border-0 pb-3 last:pb-0">
                  <div className="col-span-2">
                     <label className="text-xs font-medium text-gray-500 mb-1 block">Type</label>
                     <select className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:border-[#0074D9] outline-none">
                        <option>Work</option><option>Personal</option>
                     </select>
                  </div>
                  <div className="col-span-3">
                     <InputField label="Email" placeholder="example@mail.com" />
                  </div>
                  <div className="col-span-5">
                     <label className="text-xs font-medium text-gray-500 mb-1 block">Note</label>
                     <input type="text" maxLength={100} placeholder="Max 100 chars" className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:border-[#0074D9] outline-none" />
                  </div>
                  <div className="col-span-2 flex justify-end gap-2 pb-1">
                     {emails.length > 1 && (
                        <button onClick={() => removeEmail(index)} className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-500 rounded hover:bg-red-100"><i className="fa-regular fa-trash-can text-xs"></i></button>
                     )}
                  </div>
               </div>
            ))}
         </div>
      </Accordion>

      {/* 4. EMERGENCY CONTACTS (NEW SECTION) */}
                   <Accordion title="Emergency Contacts">
                      <div className="flex justify-end mb-2">
                         <button onClick={addEmergencyContact} className="text-[#0074D9] text-xs font-bold hover:underline flex items-center gap-1"><i className="fa-solid fa-plus"></i> Add Contact</button>
                      </div>
                      <div className="space-y-4">
                         {emergencyContacts.map((contact, index) => (
                            <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-5 relative animate-fade-in">
                               {emergencyContacts.length > 1 && (
                                  <button 
                                    onClick={() => removeEmergencyContact(index)} 
                                    className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors"
                                    title="Remove Contact"
                                  >
                                     <i className="fa-regular fa-trash-can"></i>
                                  </button>
                               )}
                               
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                  <InputField 
                                    label="Full Name*" 
                                    placeholder="Enter full name" 
                                    value={contact.name}
                                    onChange={(e:any) => updateEmergencyContact(index, 'name', e.target.value)}
                                  />
                                  <InputField 
                                    label="Relationship*" 
                                    placeholder="e.g. Spouse, Parent" 
                                    value={contact.relation}
                                    onChange={(e:any) => updateEmergencyContact(index, 'relation', e.target.value)}
                                  />
                               </div>
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                  <InputField 
                                    label="Phone Number*" 
                                    placeholder="+1 (555) 000-0000" 
                                    value={contact.phone}
                                    onChange={(e:any) => updateEmergencyContact(index, 'phone', e.target.value)}
                                  />
                                  <InputField 
                                    label="Email Address*" 
                                    placeholder="example@mail.com" 
                                    value={contact.email}
                                    onChange={(e:any) => updateEmergencyContact(index, 'email', e.target.value)}
                                  />
                               </div>
                               <div>
                                  <InputField 
                                    label="Physical Address (Optional)" 
                                    placeholder="Enter street address, city, state, zip" 
                                    value={contact.address}
                                    onChange={(e:any) => updateEmergencyContact(index, 'address', e.target.value)}
                                  />
                               </div>
                            </div>
                         ))}
                      </div>
                   </Accordion>
                </div>
             )}

             {/* Step 2 */}
             {step === 2 && (
                <div className="animate-slide-up space-y-4">
                   <Accordion title="Role & Department" defaultOpen={true}>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <InputField label="Employee ID*" placeholder="EMP-001" />
                          <SelectInput label="Department*" options={["HR", "Billing", "Scheduling", "Clinical"]} />
                          <InputField label="Job Title*" placeholder="e.g. HR Coordinator" />
                          <SelectInput label="Supervisor*" options={["John Doe", "Jane Smith"]} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <SelectInput label="Employment Status*" options={["Active", "Onboarding", "Terminated"]} />
                          <SelectInput label="Employment Type*" options={["Full-Time", "Part-Time", "Contract"]} />
                          <SelectInput label="Work Location" options={["Main Office", "Remote"]} />
                          <InputField label="Region Code" placeholder="e.g. NA-East" />
                      </div>
                   </Accordion>
                   <Accordion title="Dates & Schedule">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <DateInput label="Hire Date*" />
                          <DateInput label="Start Date*" />
                          <DateInput label="Review Date" />
                          <DateInput label="Termination Date" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex gap-4">
                             <InputField label="Shift Start" type="time" />
                             <InputField label="Shift End" type="time" />
                          </div>
                          <SelectInput label="Time Zone" options={["EST", "CST", "PST"]} />
                      </div>
                   </Accordion>
                   <Accordion title="Compensation">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <SelectInput label="Pay Type" options={["Salary", "Hourly"]} />
                          <InputField label="Pay Rate ($)" placeholder="0.00" />
                          <SelectInput label="Pay Frequency" options={["Weekly", "Bi-Weekly"]} />
                          <InputField label="Payroll ID" placeholder="External ID" />
                      </div>
                   </Accordion>
                               {/* 3. REFERRAL SOURCE (New Section) */}
                   <Accordion title="Referral Source">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <SelectInput label="Referred By" options={["Another Agency", "Temporary Staffing Agency", "Employee Referral", "Online Ad", "Other"]} />
                         <InputField label="Referral Date" type="date" />
                         <InputField label="Notes" placeholder="Start Writing..." />
                      </div>
                   </Accordion>

                   {/* 4. NOTES (New Section) */}
                   <Accordion title="Notes">
                      <div className="space-y-1">
                         <label className="text-xs font-medium text-gray-700">Additional Notes</label>
                         <textarea 
                            maxLength={8000}
                            className="w-full border border-gray-200 rounded-lg p-3 text-sm h-40 resize-none outline-none focus:border-[#0074D9] placeholder:text-gray-400"
                            placeholder="Type any necessary notes here..."
                         ></textarea>
                         <p className="text-[10px] text-gray-400 text-right">Max 8000 characters</p>
                      </div>
                   </Accordion>

                </div>
             )}

             {/* Step 3 */}
             {step === 3 && (
                <div className="animate-slide-up space-y-4">
                   <Accordion title="System Access" defaultOpen={true}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                          <InputField label="System Username / Email*" placeholder="jane.doe@company.com" />
                          <SelectInput label="System Role*" options={["Super Admin", "Manager", "View Only"]} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <RadioGroup label="Enable Portal Access" name="portal" options={["Yes", "No"]} />
                          <RadioGroup label="Two-Factor Auth" name="2fa" options={["Required", "Optional"]} />
                          <RadioGroup label="Account Status" name="accStatus" options={["Active", "Suspended"]} />
                      </div>
                   </Accordion>
                     {/* 2. DOCUMENTS & CERTIFICATIONS (New Section) */}
                     <Accordion title="Documents & Certifications">
                        <div className="flex justify-end mb-2">
                           <button onClick={addDocument} className="text-[#0074D9] text-xs font-bold hover:underline flex items-center gap-1"><i className="fa-solid fa-plus"></i> Add Document</button>
                        </div>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {documents.map((doc, index) => (
                         <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-4 relative animate-fade-in group hover:border-[#0074D9] transition-colors">
                            
                            {/* Delete Button */}
                            {documents.length > 1 && (
                               <button 
                                  onClick={() => removeDocument(index)}
                                  className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white shadow-sm z-10"
                                  title="Remove Item"
                               >
                                  <i className="fa-regular fa-trash-can"></i>
                               </button>
                            )}

                            <div className="space-y-3">
                               {/* Row 1: Type & Title */}
                               <div className="flex gap-3">
                                  <div className="w-1/3">
                                     <label className="text-xs font-medium text-gray-700 mb-1 block">Type</label>
                                     <select 
                                        className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#0074D9] bg-white cursor-pointer"
                                        value={doc.type}
                                        onChange={(e) => updateDocument(index, 'type', e.target.value)}
                                     >
                                        <option value="Document">Document</option>
                                        <option value="Folder">Folder</option>
                                     </select>
                                  </div>
                                  <div className="flex-1">
                                     <label className="text-xs font-medium text-gray-700 mb-1 block">
                                        {doc.type === 'Folder' ? 'Folder Name' : 'Document Title'}
                                     </label>
                                     <input 
                                        type="text" 
                                        placeholder={doc.type === 'Folder' ? "e.g. Medical Records" : "e.g. CPR Cert"} 
                                        className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#0074D9] bg-white"
                                        value={doc.title}
                                        onChange={(e) => updateDocument(index, 'title', e.target.value)}
                                     />
                                  </div>
                               </div>

                               {/* Row 2: Upload Area (Visual changes based on type) */}
                               <div className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors h-32 ${doc.type === 'Folder' ? 'border-blue-200 bg-blue-50/30 hover:bg-blue-50' : 'border-gray-300 bg-white hover:bg-gray-50'}`}>
                                  {doc.type === 'Folder' ? (
                                     <>
                                        <i className="fa-regular fa-folder-open text-3xl text-[#0074D9] mb-2"></i>
                                        <p className="text-xs text-[#0074D9] font-medium text-center">Click to upload files to folder</p>
                                        <p className="text-[10px] text-blue-400 mt-1">Supports multiple files</p>
                                     </>
                                  ) : (
                                     <>
                                        <i className="fa-solid fa-cloud-arrow-up text-2xl text-gray-400 mb-2 opacity-70"></i>
                                        <p className="text-xs text-gray-600 text-center font-medium">Click to upload document</p>
                                        <p className="text-[10px] text-gray-400 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                                     </>
                                  )}
                               </div>
                            </div>
                         </div>
                      ))}
                      
                      {/* Add Button Placeholder Card */}
                      <button 
                        onClick={addDocument}
                        className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 hover:border-[#0074D9] transition-all min-h-[200px] text-gray-400 hover:text-[#0074D9]"
                      >
                         <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
                            <i className="fa-solid fa-plus text-lg"></i>
                         </div>
                         <span className="text-sm font-medium">Add New Item</span>
                      </button>
                   </div>
                        
                       
                   </Accordion>  
                   <Accordion title="Additional Notes">
                      <div className="space-y-1">
                         <label className="text-xs font-medium text-gray-700">Internal Notes</label>
                         <textarea className="w-full border border-gray-200 rounded-lg p-3 text-sm h-32 resize-none focus:border-[#0074D9] outline-none" placeholder="Add notes..."></textarea>
                      </div>
                   </Accordion>
                </div>
             )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-2xl">
             {step > 1 && (
                <button onClick={() => setStep(prev => prev - 1)} className="px-6 py-2.5 border border-gray-200 bg-white text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Back</button>
             )}
             {step < 3 ? (
                <button onClick={() => setStep(prev => prev + 1)} className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-lg transition-all">Next Step</button>
             ) : (
                <button onClick={() => { console.log("Creating..."); onClose(); }} className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-lg transition-all">Create Employee</button>
             )}
          </div>

       </div>
    </div>, document.body
  );
}