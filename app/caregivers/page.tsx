"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import MultiSelectSkills from "@/components/MultiSelect";
import MultiSelectDropdown from "@/components/MultiSelectDropdown";

export default function CaregiverPage() {
  const [showAddModal, setShowAddModal] = useState(false);

  

    // --- NEW: Sorting State ---
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  
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

   // --- Sorting Logic ---
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedCaregivers = [...caregivers].sort((a: any, b: any) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    
    // Handle nested or special sorts if needed, otherwise string compare
    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Updated Helper: Removed 'ml-1' as flex gap handles it now
  const getSortIcon = (key: string) => {
    if (sortConfig?.key !== key) return <i className="fa-solid fa-sort text-gray-300"></i>;
    return sortConfig.direction === 'asc' 
      ? <i className="fa-solid fa-sort-up text-[#0074D9]"></i> 
      : <i className="fa-solid fa-sort-down text-[#0074D9]"></i>;
  };

  const handlePhoneClick = (cg: any) => {
    setSelectedCaregiver({ name: cg.name, phone: cg.phone });
    setShowSmsModal(true);
  };

  // Handle Email Icon Click
  const handleEmailClick = (cg: any) => {
    setSelectedEmailCaregiver({ name: cg.name, email: cg.email });
    setShowEmailModal(true);
  };

  // --- 1. NEW: CHECKBOX STATE ---
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // ... (Keep existing Mock Data & Sorting Logic) ...

  // --- 2. NEW: CHECKBOX HANDLERS ---
  
  // Toggle All
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      // Select all visible (sorted) caregivers
      setSelectedIds(sortedCaregivers.map(cg => cg.id));
    } else {
      // Deselect all
      setSelectedIds([]);
    }
  };

  // Toggle Single Row
  const handleSelectRow = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Check if all are selected
  const isAllSelected = sortedCaregivers.length > 0 && selectedIds.length === sortedCaregivers.length;

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
            <MultiSelectSkills />

         
          </div>
           <div className="flex gap-2">
              <button onClick={() => setShowAddModal(true)} className="px-5 py-2 text-sm font-medium text-white bg-[#0074D9] rounded-lg hover:bg-[#0062b8] transition-colors shadow-sm">Add Caregiver</button>
           </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-visible">
           <div className="overflow-visible"> 
               <table className="w-full text-left text-sm">
                 <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold border-b border-gray-100">
                    <tr>
                     {/* --- NEW: MASTER CHECKBOX HEADER --- */}
                       <th className="p-4 w-10">
                          <input 
                             type="checkbox" 
                             className="w-4 h-4 rounded border-gray-300 text-[#0074D9] focus:ring-[#0074D9] cursor-pointer"
                             checked={isAllSelected}
                             onChange={handleSelectAll}
                          />
                       </th>
                       {/* ----------------------------------- */}
                       <th className="p-3 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('id')}>
                          <div className="flex items-center gap-2">SNO {getSortIcon('id')}</div>
                       </th>
                       <th className="p-3 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('name')}>
                          <div className="flex items-center gap-2">Name {getSortIcon('name')}</div>
                       </th>
                       <th className="p-3 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('id')}>
                          <div className="flex items-center gap-2">ID Number {getSortIcon('id')}</div>
                       </th>
                       <th className="p-3 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('role')}>
                          <div className="flex items-center gap-2">Type {getSortIcon('role')}</div>
                       </th>
                       <th className="p-3 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('phone')}>
                          <div className="flex items-center gap-2">Phone {getSortIcon('phone')}</div>
                       </th>
                       <th className="p-3">Assigned Client</th>
                       <th className="p-3 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('zone')}>
                          <div className="flex items-center gap-2">Assigned Zone {getSortIcon('zone')}</div>
                       </th>
                       <th className="p-3 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('nextShift')}>
                          <div className="flex items-center gap-2">Next Shift {getSortIcon('nextShift')}</div>
                       </th>
                       <th className="p-3 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('status')}>
                          <div className="flex items-center gap-2">Status {getSortIcon('status')}</div>
                       </th>
                       <th className="p-3 text-right"></th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                   {sortedCaregivers.map((cg, i) => (
                       <tr 
                          key={cg.id} 
                          className={`transition-colors group relative z-0 hover:z-20 ${selectedIds.includes(cg.id) ? 'bg-blue-50/30' : 'hover:bg-gray-50/50'}`}
                       >
                          {/* --- NEW: ROW CHECKBOX --- */}
                          <td className="p-4">
                             <input 
                                type="checkbox" 
                                className="w-4 h-4 rounded border-gray-300 text-[#0074D9] focus:ring-[#0074D9] cursor-pointer"
                                checked={selectedIds.includes(cg.id)}
                                onChange={() => handleSelectRow(cg.id)}
                             />
                          </td>
                          {/* ------------------------- */}

                          <td className="p-4 text-gray-500">{i + 1}</td>
                          <td className="p-4">
                             <Link href={`/caregivers/${cg.id}`} className="flex items-center gap-3 cursor-pointer hover:text-[#0074D9] transition-colors">
                                <img src={`https://i.pravatar.cc/150?img=${cg.img}`} alt={cg.name} className="w-8 h-8 rounded-full object-cover" />
                                <span className="font-medium text-gray-800">{cg.name}</span>
                             </Link>
                          </td>
                          <td className="p-4 text-gray-600">{cg.id}</td>
                          <td className="p-4 text-gray-600">{cg.role}</td>
                          <td className="p-4">
                             <button onClick={(e) => { e.stopPropagation(); handlePhoneClick(cg); }} className="text-gray-600 hover:text-[#0074D9] hover:underline flex items-center gap-2" title="Send Message">
                                {cg.phone}
                                <i className="fa-regular fa-comment-dots text-xs text-[#0074D9] opacity-0 group-hover:opacity-100 transition-opacity"></i>
                             </button>
                          </td>
                          <td className="p-4 overflow-visible">
                             <div className="flex -space-x-2 items-center relative">
                                {[{ name: "Jane Doe", img: 10 }, { name: "John Smith", img: 11 }].map((client, idx) => (
                                   <Link key={idx} href="/clients/profile" className="relative group/client cursor-pointer hover:z-50">
                                      <img src={`https://i.pravatar.cc/150?img=${client.img}`} className="w-6 h-6 rounded-full border border-white object-cover shadow-sm transition-transform group-hover/client:scale-110" alt={client.name} />
                                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-40 bg-white rounded-xl shadow-xl border border-gray-200 p-4 flex flex-col items-center hidden group-hover/client:flex z-50 animate-fade-in origin-bottom">
                                         <div className="absolute -bottom-3 left-0 w-full h-3 bg-transparent"></div>
                                         <img src={`https://i.pravatar.cc/150?img=${client.img}`} className="w-16 h-16 rounded-full object-cover border-4 border-gray-100 mb-2 shadow-sm" alt={client.name} />
                                         <span className="text-sm font-bold text-gray-800 text-center leading-tight mb-2">{client.name}</span>
                                         <span className="text-[10px] text-[#0074D9] font-bold bg-blue-50 px-3 py-1 rounded-full border border-blue-100 hover:bg-blue-100 transition-colors">View Profile</span>
                                         <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-gray-200 transform rotate-45"></div>
                                      </div>
                                   </Link>
                                ))}
                             </div>
                          </td>
                          <td className="p-4 text-gray-600">{cg.zone}</td>
                          <td className="p-4"><Link href={`/caregivers/${cg.id}`} className="text-gray-600 text-xs hover:text-[#0074D9] hover:underline">{cg.nextShift}</Link></td>
                          <td className="p-4"><span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">{cg.status}</span></td>
                         {/* Actions */}
<td className="p-4 text-right overflow-visible">
   <div className="flex justify-end gap-2">
      
      {/* 1. View Profile */}
      <Link href={`/caregivers/${cg.id}`}>
         {/* 'group/tooltip' isolates the hover to this button only */}
         <button className="relative group/tooltip w-7 h-7 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center hover:bg-blue-100 transition-colors">
            <i className="fa-regular fa-eye text-xs"></i>
            {/* Tooltip: 'group-hover/tooltip:block' ensures it only shows when THIS button is hovered */}
            <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 hidden group-hover/tooltip:block w-max px-2 py-1 bg-gray-800 text-white text-[10px] rounded shadow-lg z-50 whitespace-nowrap font-normal">
               Caregiver's Profile
               {/* Arrow */}
               <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
            </div>
         </button>
      </Link>

      {/* 2. Send Email */}
      <button 
         onClick={() => handleEmailClick(cg)} 
         className="relative group/tooltip w-7 h-7 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center hover:bg-[#0074D9] hover:text-white transition-colors"
      >
         <i className="fa-regular fa-envelope text-xs"></i>
         <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 hidden group-hover/tooltip:block w-max px-2 py-1 bg-gray-800 text-white text-[10px] rounded shadow-lg z-50 whitespace-nowrap font-normal">
            Send Email
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
         </div>
      </button>

      {/* 3. View Schedule */}
      <button className="relative group/tooltip w-7 h-7 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center hover:bg-yellow-100 transition-colors">
         <i className="fa-regular fa-calendar text-xs"></i>
         <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 hidden group-hover/tooltip:block w-max px-2 py-1 bg-gray-800 text-white text-[10px] rounded shadow-lg z-50 whitespace-nowrap font-normal">
            View Schedule
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
         </div>
      </button>

      {/* 4. Pay Rates */}
      <button className="relative group/tooltip w-7 h-7 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors">
         <i className="fa-solid fa-dollar-sign text-xs"></i>
         <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 hidden group-hover/tooltip:block w-max px-2 py-1 bg-gray-800 text-white text-[10px] rounded shadow-lg z-50 whitespace-nowrap font-normal">
            View Pay Rates
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
         </div>
      </button>

      {/* 5. Delete */}
      <button className="relative group/tooltip w-7 h-7 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors">
         <i className="fa-regular fa-trash-can text-xs"></i>
         <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 hidden group-hover/tooltip:block w-max px-2 py-1 bg-gray-800 text-white text-[10px] rounded shadow-lg z-50 whitespace-nowrap font-normal">
            Delete Caregiver
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
         </div>
      </button>

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
// ADD CAREGIVER MODAL (Updated Step 1 for Multiple Phone & Email)
// =========================================================================
function AddCaregiverModal({ onClose }: { onClose: () => void }) {
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
               <div className="animate-slide-up space-y-4">
      
      {/* 1. BASIC INFORMATION (Open by default) */}
      <Accordion title="Basic Information" defaultOpen={true}>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <SelectGroup label="Title" options={["None", "Mr.", "Mrs.", "Ms.", "Miss", "Mx.", "Dr."]} />
            <InputGroup label="First Name*" placeholder="Enter First Name" />
            <InputGroup label="Middle Name" placeholder="Enter Middle Name" />
            <InputGroup label="Last Name*" placeholder="Enter Last Name" />
         </div>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <SelectGroup label="Suffix" options={["None", "Jr.", "Sr.", "II", "III", "RN", "LPN", "CNA"]} />
            
            {/* Using your custom MultiSelect component here */}
         
            
            <SelectGroup label="Gender*" options={["Male", "Female", "Other"]} />
            <InputGroup label="Date of Birth*" type="date" /> 
            <InputGroup label="State ID" placeholder="Enter" />
             <InputGroup label="Driver’s License" placeholder="Enter" />
             <InputGroup label="PASSPORT" placeholder="Enter" />
             <InputGroup label="Military ID" placeholder="Enter" />
             <InputGroup label="USCIS ID" placeholder="Enter" />
         </div>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
            <InputGroup label="Social Security Number (SSN)" placeholder="Enter SSN number" />
             <SelectGroup label="Primary Language" options={["English", "Mandarin", "Hindi", "Spanish", "French", "Modern Standard Arabic", "Portuguese", "Russian", "Bengali", "Urdu", "German", "Italian", "Japanese", "Nigerian Pidgin"]} />

                      <MultiSelectDropdown label="Secondary Language" options={["English", "Mandarin", "Hindi", "Spanish", "French", "Modern Standard Arabic", "Portuguese", "Russian", "Bengali", "Urdu", "German", "Italian", "Japanese", "Nigerian Pidgin"]} />

                      <MultiSelectDropdown label="Race" options={["Asian", "American indian", "African American or Black", "Hispanic or Latino", "White or Caucasian", "European American", "Multiracial", "Native Hawaiian",  "Pacific Islander", "Unknown"]} />
         </div>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <InputGroup label="Address Line1" placeholder="Enter" />
            <InputGroup label="Address Line2" placeholder="Enter" />
            <InputGroup label="Zip/Postal Code*" placeholder="Enter" />
           <SelectGroup label="City" options={["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"]} />

                        <SelectGroup label="State/Province" options={["Los Angeles County", "Cook County", "Harris County", "Maricopa County", "San Diego County", "Orange County", "Miami-Dade County", "Dallas County", "Kings County", "Riverside County"]} />

                        <SelectGroup label="Country" options={["United States", "India", "China", "United Kingdom", "Germany", "France", "Brazil", "Canada", "Australia", "Italy"]} />
            <SelectGroup label="Role Type" options={["Caregiver", "Supervisor", "Manager"]} />
               <SelectGroup 
         label="Status" 
         options={[
            "Active", 
            "Inactive (Medical Leave)", 
            "Inactive (Personal Leave)", 
            "Inactive (No Shifts)", 
            "Terminated", 
            "Resigned", 
            "On Hold"
         ]} 
      />
            
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
                     <InputGroup label="Number" placeholder="+1 (555) 000-0000" />
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
                     <InputGroup label="Email" placeholder="example@mail.com" />
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
                                  <InputGroup 
                                    label="Full Name*" 
                                    placeholder="Enter full name" 
                                    value={contact.name}
                                    onChange={(e:any) => updateEmergencyContact(index, 'name', e.target.value)}
                                  />
                                  <InputGroup 
                                    label="Relationship*" 
                                    placeholder="e.g. Spouse, Parent" 
                                    value={contact.relation}
                                    onChange={(e:any) => updateEmergencyContact(index, 'relation', e.target.value)}
                                  />
                               </div>
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                  <InputGroup 
                                    label="Phone Number*" 
                                    placeholder="+1 (555) 000-0000" 
                                    value={contact.phone}
                                    onChange={(e:any) => updateEmergencyContact(index, 'phone', e.target.value)}
                                  />
                                  <InputGroup 
                                    label="Email Address*" 
                                    placeholder="example@mail.com" 
                                    value={contact.email}
                                    onChange={(e:any) => updateEmergencyContact(index, 'email', e.target.value)}
                                  />
                               </div>
                               <div>
                                  <InputGroup 
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

             {step === 2 && (
              /* STEP 2: PROFESSIONAL DETAIL */
                <div className="animate-slide-up space-y-4">
                   
                   {/* 1. PROFESSIONAL DETAILS (Open Default) */}
                   <Accordion title="Professional Details" defaultOpen={true}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                         <SelectGroup 
                            label="Caregiver Type" 
                            options={["DSP (Direct Service Professional)", "STNA (State Tested Nursing Assistant)", "LPN (Licensed Practical Nurse)", "RN ( Registered Nurse)", "SW (Social Worker)", "PT (Physical Therapist)", "OT (Occupational Therapist)", "SLP (Speech-Language Pathology)", "CM (Case Manager)"]} 
                         />
                         <InputGroup label="User Name" placeholder="CG-00023" />
                         <MultiSelectDropdown 
                            label="Skills" 
                            options={[
                               "DODD Medication Category 1", "DODD Medication Category 2", "DODD Medication Category 3",
                               "Vagus Nerve Stimulator (VNS) Certified", "Hoyer Lift", "Gait Belt Transfers", "Catheter Care",
                               "Licensed Driver", "Severe Behavior Experience", "Seizure Experience", "Dementia Care Experience",
                               "Wound Care Certified (LPNs & RNs only)"
                            ]} 
                         />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                         <SelectGroup label="Qualification" options={["Certificate III", "Certificate IV", "Diploma", "Bachelor"]} />
                         <InputGroup label="Years of Experience*" placeholder="Enter" />
                         <SelectGroup label="Pay Rate" options={["Hourly Rate ( calculated hourly)", "Daily Rate (a pay rate calculated daily regardless of hours worked)", "Salary (For salary, the hourly rate is multiplied by a standard number of weekly or bi-weekly hours)"]} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <InputGroup label="HIRE DATE" placeholder="Enter official hire date" type="date" />
                         {/* --- EVV ENABLED CHECKBOX --- */}
            <div className="flex items-center h-full pt-6">
              
               <label className="flex items-center gap-2 cursor-pointer group">
                  <input 
                     type="checkbox" 
                     className="w-5 h-5 text-[#0074D9] rounded border-gray-300 focus:ring-[#0074D9] cursor-pointer" 
                  />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-[#0074D9] transition-colors">
                     EVV Enabled
                  </span>
               </label>
            </div>
            {/* --------------------------- */}
                      </div>
                   </Accordion>

                   {/* 2. AVAILABILITY & ASSIGNMENT */}
                   <Accordion title="Availability & Assignment">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                         <InputGroup label="Availability Start Date" type="date" />
                         <InputGroup label="Assigned Region Shifts" placeholder="Enter" />
                      </div>
                      
                      <div className="mb-6">
                         <label className="text-xs text-gray-500 mb-2 block">Days Available</label>
                         <div className="flex gap-2 flex-wrap">
                            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(d => (
                               <button key={d} className="px-3 py-1 border rounded-full text-xs text-gray-600 hover:bg-gray-50 transition-colors">{d}</button>
                            ))}
                         </div>
                      </div>

                      <div>
                         <label className="text-xs text-gray-500 mb-2 block">Preferred Shift</label>
                         <div className="flex gap-6">
                            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"><input type="checkbox" className="rounded text-[#0074D9] focus:ring-[#0074D9]" /> Morning</label>
                            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"><input type="checkbox" className="rounded text-[#0074D9] focus:ring-[#0074D9]" /> Evening</label>
                            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"><input type="checkbox" className="rounded text-[#0074D9] focus:ring-[#0074D9]" /> Night</label>
                         </div>
                      </div>
                   </Accordion>

                   {/* 3. REFERRAL SOURCE (New Section) */}
                   <Accordion title="Referral Source">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <SelectGroup label="Referred By" options={["Another Agency", "Temporary Staffing Agency", "Employee Referral", "Online Ad", "Other"]} />
                         <InputGroup label="Referral Date" type="date" />
                         <InputGroup label="Notes" placeholder="Start Writing..." />
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

             {step === 3 && (
                /* STEP 3: DOCUMENTS */
              <div className="animate-slide-up space-y-6">
                   <div className="flex justify-between items-end mb-4">
                      <div>
                         <h3 className="font-bold text-gray-800 text-sm">Documents & Certifications</h3>
                         <p className="text-xs text-gray-500 mt-1">Upload individual documents or group them into folders.</p>
                      </div>
                      <button 
                        onClick={addDocument} 
                        className="text-[#0074D9] text-xs font-bold hover:underline flex items-center gap-1 border border-[#0074D9] px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <i className="fa-solid fa-plus"></i> Add New Item
                      </button>
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


function Accordion({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white mb-4 shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <h3 className="font-bold text-gray-800 text-sm">{title}</h3>
        <i className={`fa-solid fa-chevron-down text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>
      
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100 p-6' : 'max-h-0 opacity-0 p-0 overflow-hidden'}`}>
        {children}
      </div>
    </div>
  );
}