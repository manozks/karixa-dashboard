"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

export default function CaregiverApplicantsPage() {
  const [showAddModal, setShowAddModal] = useState(false);

  // --- Sorting State ---
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  
  // Modals State
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<{name: string, phone: string} | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedEmailApplicant, setSelectedEmailApplicant] = useState<{name: string, email: string} | null>(null);

  // Mock Applicant Data
  const applicants = [
    { id: "APP-0142", name: "Sarah Jenkins", role: "HHA", phone: "(202) 555-0198", email: "sarah.j@email.com", experience: "3 Years", zone: "Columbus Area", appliedDate: "01 April, 2026", status: "Interviewing", img: 6 },
    { id: "APP-0143", name: "Marcus Johnson", role: "PCA", phone: "(202) 555-0144", email: "marcus.j@email.com", experience: "1 Year", zone: "Cleveland, Northeast Ohio", appliedDate: "28 March, 2026", status: "New", img: 7 },
    { id: "APP-0144", name: "Emily Chen", role: "CNA", phone: "(202) 555-0133", email: "emily.c@email.com", experience: "5+ Years", zone: "Cincinnati Area", appliedDate: "25 March, 2026", status: "Offer Extended", img: 8 },
    { id: "APP-0145", name: "David Miller", role: "RN", phone: "(202) 555-0122", email: "david.m@email.com", experience: "8 Years", zone: "Marietta , Southeast Ohio", appliedDate: "20 March, 2026", status: "Rejected", img: 9 },
    { id: "APP-0146", name: "Jessica Taylor", role: "HHA", phone: "(202) 555-0111", email: "jessica.t@email.com", experience: "2 Years", zone: "Columbus Area", appliedDate: "15 March, 2026", status: "Background Check", img: 5 },
  ];

  // --- Sorting Logic ---
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const sortedApplicants = [...applicants].sort((a: any, b: any) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const getSortIcon = (key: string) => {
    if (sortConfig?.key !== key) return <i className="fa-solid fa-sort text-gray-300"></i>;
    return sortConfig.direction === 'asc' 
      ? <i className="fa-solid fa-sort-up text-[#0074D9]"></i> 
      : <i className="fa-solid fa-sort-down text-[#0074D9]"></i>;
  };

  const handlePhoneClick = (app: any) => {
    setSelectedApplicant({ name: app.name, phone: app.phone });
    setShowSmsModal(true);
  };

  const handleEmailClick = (app: any) => {
    setSelectedEmailApplicant({ name: app.name, email: app.email });
    setShowEmailModal(true);
  };

  // --- CHECKBOX STATE ---
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedIds(sortedApplicants.map(app => app.id));
    else setSelectedIds([]);
  };

  const handleSelectRow = (id: string) => {
    if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(i => i !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  const isAllSelected = sortedApplicants.length > 0 && selectedIds.length === sortedApplicants.length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New": return "bg-blue-50 text-blue-600 border-blue-100";
      case "Interviewing": return "bg-purple-50 text-purple-600 border-purple-100";
      case "Offer Extended": return "bg-green-50 text-green-600 border-green-100";
      case "Background Check": return "bg-yellow-50 text-yellow-600 border-yellow-100";
      case "Rejected": return "bg-red-50 text-red-600 border-red-100";
      default: return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-0 space-y-6">
        
        {/* Header */}
        <div>
           <h1 className="text-2xl font-bold text-gray-800">Caregiver Applicants</h1>
           <div className="text-sm text-gray-500">Dashboard / Staff / Caregiver Applicants</div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
           <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative">
               <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
               <input 
                 type="text" 
                 placeholder="Search applicants..." 
                 className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0074D9] w-48"
               />
            </div>

            {/* Applicant Specific Dropdowns */}
            <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none cursor-pointer">
              <option>Stage</option>
              <option>New</option>
              <option>Interviewing</option>
              <option>Background Check</option>
              <option>Offer Extended</option>
              <option>Rejected</option>
            </select>
            <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none cursor-pointer">
              <option>Applied Role</option><option>PCA</option><option>CNA</option><option>HHA</option><option>RN</option>
            </select>
            <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none cursor-pointer">
              <option>Experience</option><option>0-1 Year</option><option>1-3 Years</option><option>3-5 Years</option><option>5+ Years</option>
            </select>
          </div>
           <div className="flex gap-2">
              <button onClick={() => setShowAddModal(true)} className="px-5 py-2 text-sm font-medium text-white bg-[#0074D9] rounded-lg hover:bg-[#0062b8] transition-colors shadow-sm">
                <i className="fa-solid fa-plus mr-2"></i> Add Applicant
              </button>
           </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-visible">
           <div className="overflow-visible"> 
               <table className="w-full text-left text-sm">
                 <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold border-b border-gray-100">
                    <tr>
                       <th className="p-4 w-10">
                          <input 
                             type="checkbox" 
                             className="w-4 h-4 rounded border-gray-300 text-[#0074D9] focus:ring-[#0074D9] cursor-pointer"
                             checked={isAllSelected}
                             onChange={handleSelectAll}
                          />
                       </th>
                       <th className="p-3 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('id')}>
                          <div className="flex items-center gap-2">SNO {getSortIcon('id')}</div>
                       </th>
                       <th className="p-3 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('name')}>
                          <div className="flex items-center gap-2">Applicant Name {getSortIcon('name')}</div>
                       </th>
                       <th className="p-3 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('id')}>
                          <div className="flex items-center gap-2">App ID {getSortIcon('id')}</div>
                       </th>
                       <th className="p-3 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('role')}>
                          <div className="flex items-center gap-2">Applied Role {getSortIcon('role')}</div>
                       </th>
                       <th className="p-3 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('phone')}>
                          <div className="flex items-center gap-2">Contact {getSortIcon('phone')}</div>
                       </th>
                       <th className="p-3 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('experience')}>
                          <div className="flex items-center gap-2">Experience {getSortIcon('experience')}</div>
                       </th>
                       <th className="p-3 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('zone')}>
                          <div className="flex items-center gap-2">Pref. Zone {getSortIcon('zone')}</div>
                       </th>
                       <th className="p-3 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('appliedDate')}>
                          <div className="flex items-center gap-2">Applied Date {getSortIcon('appliedDate')}</div>
                       </th>
                       <th className="p-3 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('status')}>
                          <div className="flex items-center gap-2">Stage {getSortIcon('status')}</div>
                       </th>
                       <th className="p-3 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                   {sortedApplicants.map((app, i) => (
                       <tr 
                          key={app.id} 
                          className={`transition-colors group relative z-0 hover:z-20 ${selectedIds.includes(app.id) ? 'bg-blue-50/30' : 'hover:bg-gray-50/50'}`}
                       >
                          <td className="p-4">
                             <input 
                                type="checkbox" 
                                className="w-4 h-4 rounded border-gray-300 text-[#0074D9] focus:ring-[#0074D9] cursor-pointer"
                                checked={selectedIds.includes(app.id)}
                                onChange={() => handleSelectRow(app.id)}
                             />
                          </td>
                          <td className="p-4 text-gray-500">{i + 1}</td>
                        <td className="p-4">
   <Link 
      href={`/caregiver-applicants/${app.id}`} 
      className="flex items-center gap-3 cursor-pointer hover:text-[#0074D9] transition-colors group"
   >
      <img src={`https://i.pravatar.cc/150?img=${app.img}`} alt={app.name} className="w-8 h-8 rounded-full object-cover" />
      <span className="font-medium text-gray-800 group-hover:text-[#0074D9] transition-colors">{app.name}</span>
   </Link>
</td>
                          <td className="p-4 text-gray-600">{app.id}</td>
                          <td className="p-4 font-medium text-gray-700">{app.role}</td>
                          <td className="p-4">
                             <button onClick={(e) => { e.stopPropagation(); handlePhoneClick(app); }} className="text-gray-600 hover:text-[#0074D9] hover:underline flex items-center gap-2" title="Send Message">
                                {app.phone}
                                <i className="fa-regular fa-comment-dots text-xs text-[#0074D9] opacity-0 group-hover:opacity-100 transition-opacity"></i>
                             </button>
                          </td>
                          <td className="p-4 text-gray-600">{app.experience}</td>
                          <td className="p-4 text-gray-600">{app.zone}</td>
                          <td className="p-4 text-gray-500">{app.appliedDate}</td>
                          <td className="p-4">
                             <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold border ${getStatusColor(app.status)}`}>
                                {app.status}
                             </span>
                          </td>
                          
                          {/* Actions */}
                          <td className="p-4 text-right overflow-visible">
                             <div className="flex justify-end gap-2">
                                {/* 1. View Applicant */}
                                <button className="relative group/tooltip w-7 h-7 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center hover:bg-blue-100 transition-colors">
                                   <i className="fa-regular fa-eye text-xs"></i>
                                   <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 hidden group-hover/tooltip:block w-max px-2 py-1 bg-gray-800 text-white text-[10px] rounded shadow-lg z-50 whitespace-nowrap font-normal">
                                      View Application
                                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                                   </div>
                                </button>

                                {/* 2. Send Email */}
                                <button onClick={() => handleEmailClick(app)} className="relative group/tooltip w-7 h-7 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center hover:bg-[#0074D9] hover:text-white transition-colors">
                                   <i className="fa-regular fa-envelope text-xs"></i>
                                   <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 hidden group-hover/tooltip:block w-max px-2 py-1 bg-gray-800 text-white text-[10px] rounded shadow-lg z-50 whitespace-nowrap font-normal">
                                      Email Applicant
                                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                                   </div>
                                </button>

                                {/* 3. Download Resume */}
                                <button className="relative group/tooltip w-7 h-7 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center hover:bg-purple-100 transition-colors">
                                   <i className="fa-solid fa-download text-xs"></i>
                                   <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 hidden group-hover/tooltip:block w-max px-2 py-1 bg-gray-800 text-white text-[10px] rounded shadow-lg z-50 whitespace-nowrap font-normal">
                                      Download Resume
                                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                                   </div>
                                </button>

                                {/* 4. Move Stage / Approve */}
                                <button className="relative group/tooltip w-7 h-7 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors">
                                   <i className="fa-solid fa-check text-xs"></i>
                                   <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 hidden group-hover/tooltip:block w-max px-2 py-1 bg-gray-800 text-white text-[10px] rounded shadow-lg z-50 whitespace-nowrap font-normal">
                                      Update Stage
                                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                                   </div>
                                </button>

                                {/* 5. Reject / Delete */}
                                <button className="relative group/tooltip w-7 h-7 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors">
                                   <i className="fa-solid fa-ban text-xs"></i>
                                   <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 hidden group-hover/tooltip:block w-max px-2 py-1 bg-gray-800 text-white text-[10px] rounded shadow-lg z-50 whitespace-nowrap font-normal">
                                      Reject Applicant
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
              <span>Showing 1 to 5 of 24 Applicants</span>
              <div className="flex gap-2"><button className="flex items-center gap-1 hover:text-[#0074D9]">Previous</button><button className="flex items-center gap-1 text-[#0074D9] font-medium">Next</button></div>
           </div>
        </div>

        {/* --- Modals --- */}
        {showAddModal && <AddApplicantModal onClose={() => setShowAddModal(false)} />}
        
        {showSmsModal && selectedApplicant && (
           <SmsModal recipient={selectedApplicant} onClose={() => setShowSmsModal(false)} />
        )}

        {showEmailModal && selectedEmailApplicant && (
           <EmailModal recipient={selectedEmailApplicant} onClose={() => setShowEmailModal(false)} />
        )}

      </div>
    </DashboardLayout>
  );
}

// =========================================================================
// EMAIL MODAL
// =========================================================================
function EmailModal({ recipient, onClose }: { recipient: { name: string, email: string }, onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "unset"; }; }, []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col animate-scale-up relative">
          <div className="flex justify-between items-center p-5 border-b border-gray-100">
             <div>
                <h2 className="text-lg font-bold text-gray-800">Email Applicant</h2>
                <p className="text-xs text-gray-500">To: <span className="font-semibold text-gray-700">{recipient.name}</span> ({recipient.email})</p>
             </div>
             <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 transition-colors"><i className="fa-solid fa-xmark"></i></button>
          </div>
          <div className="p-6 space-y-4">
             <div className="space-y-1">
                <label className="text-xs font-medium text-gray-600">Subject</label>
                <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#0074D9]" placeholder="Enter subject..." defaultValue="Update on your application" />
             </div>
             <div className="space-y-1">
                <label className="text-xs font-medium text-gray-600">Message</label>
                <textarea className="w-full border border-gray-200 rounded-lg p-3 text-sm h-40 resize-none outline-none focus:border-[#0074D9] placeholder:text-gray-300" placeholder="Type your email content here..."></textarea>
             </div>
             <div className="flex items-center gap-2">
                <input type="checkbox" id="cc-myself" className="rounded border-gray-300 text-[#0074D9] focus:ring-[#0074D9]" />
                <label htmlFor="cc-myself" className="text-xs text-gray-500">Send me a copy</label>
             </div>
          </div>
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
             <div><h2 className="text-lg font-bold text-gray-800">Message Applicant</h2><p className="text-xs text-gray-500">To: <span className="font-semibold text-gray-700">{recipient.name}</span> ({recipient.phone})</p></div>
             <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 transition-colors"><i className="fa-solid fa-xmark"></i></button>
          </div>
          <div className="p-5 space-y-4">
             <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Message</label><textarea className="w-full border border-gray-200 rounded-lg p-3 text-sm h-32 resize-none outline-none focus:border-[#0074D9] placeholder:text-gray-300" placeholder="Type your message here..." autoFocus></textarea></div>
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
// ADD APPLICANT MODAL (Adapted from Add Caregiver)
// =========================================================================
function AddApplicantModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);
  
  // States
  const [phones, setPhones] = useState([{ type: "Cell Phone", number: "", note: "" }]);
  const [emails, setEmails] = useState([{ type: "Personal", address: "", note: "" }]);
  const [documents, setDocuments] = useState([{ type: "Resume", title: "", file: null }]);
  
  const [referralSources, setReferralSources] = useState([
    { referredBy: "", detail: "", date: "", notes: "" }
  ]);

  useEffect(() => { setMounted(true); document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "unset"; }; }, []);
  if (!mounted) return null;

  // --- Handlers ---
  const addPhone = () => setPhones([...phones, { type: "Cell Phone", number: "", note: "" }]);
  const removePhone = (index: number) => setPhones(phones.filter((_, i) => i !== index));
  
  const addEmail = () => setEmails([...emails, { type: "Personal", address: "", note: "" }]);
  const removeEmail = (index: number) => setEmails(emails.filter((_, i) => i !== index));

  const addDocument = () => setDocuments([...documents, { type: "Document", title: "", file: null }]);
  const removeDocument = (index: number) => setDocuments(documents.filter((_, i) => i !== index));
  const updateDocument = (index: number, field: string, value: string) => {
    const updated = [...documents];
    // @ts-ignore
    updated[index][field] = value;
    setDocuments(updated);
  };

  const addReferralSource = () => setReferralSources([...referralSources, { referredBy: "", detail: "", date: "", notes: "" }]);
  const removeReferralSource = (index: number) => setReferralSources(referralSources.filter((_, i) => i !== index));
  const updateReferralSource = (index: number, field: string, value: string) => {
    const updated: any = [...referralSources];
    updated[index][field] = value;
    setReferralSources(updated);
  };

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

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-6xl shadow-2xl flex flex-col max-h-[95vh] animate-slide-up relative">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 relative">
             <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"><i className="fa-solid fa-xmark text-xl"></i></button>
             <h2 className="text-2xl font-bold text-gray-800">Manually Add Applicant</h2>
             <p className="text-sm text-gray-500">Enter an applicant's information manually into the recruitment pipeline.</p>
          </div>

          {/* Stepper */}
          <div className="bg-blue-50/50 py-6 border-b border-gray-100 flex justify-center">
             <div className="flex items-center gap-4">
                <StepIndicator num={1} label="Basic Information" sub="Personal details" current={step} />
                <div className="w-12 h-px bg-gray-300"></div>
                <StepIndicator num={2} label="Application Details" sub="Role and experience" current={step} />
                <div className="w-12 h-px bg-gray-300"></div>
                <StepIndicator num={3} label="Resumes & Files" sub="Upload CV/Docs" current={step} />
             </div>
          </div>

          {/* Form Content */}
          <div className="p-8 overflow-y-auto flex-1">
             {step === 1 && (
               <div className="animate-slide-up space-y-4">
      
                 <Accordion title="Basic Information" defaultOpen={true}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <SelectGroup label="Title" options={["None", "Mr.", "Mrs.", "Ms.", "Miss", "Mx.", "Dr."]} />
                      <InputGroup label="First Name*" placeholder="Enter First Name" />
                      <InputGroup label="Middle Name" placeholder="Enter Middle Name" />
                      <InputGroup label="Last Name*" placeholder="Enter Last Name" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <SelectGroup label="Gender" options={["Male", "Female", "Other", "Prefer Not to Say"]} />
                      <InputGroup label="Date of Birth" type="date" /> 
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 overflow-visible z-50 relative">
                      <StateIdInput label="State ID" tooltip="Optional for initial application." />
                      <StateIdInput label="Driver’s License" tooltip="Optional for initial application." />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4 overflow-visible">
                      <InputGroup label="Address Line 1" placeholder="Enter" />
                      <InputGroup label="Address Line 2" placeholder="Enter" />
                      <InputGroup label="Zip/Postal Code" placeholder="Enter" />
                      <SelectGroup label="City" options={["New York", "Los Angeles", "Chicago", "Columbus"]} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <SelectGroup label="State/Province" options={["Ohio", "California", "Texas", "Florida"]} />
                      <SelectGroup label="Country" options={["United States"]} />
                    </div>
                 </Accordion>

                 <Accordion title="Contact Numbers">
                    <div className="flex justify-end mb-2">
                       <button onClick={addPhone} className="text-[#0074D9] text-xs font-bold hover:underline flex items-center gap-1"><i className="fa-solid fa-plus"></i> Add Phone</button>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                       {phones.map((phone, index) => (
                          <div key={index} className="grid grid-cols-12 gap-4 items-end border-b border-gray-200 last:border-0 pb-3 last:pb-0">
                             <div className="col-span-2">
                                <SelectGroup label="Type" options={["Cell", "Home"]} />
                             </div>
                             <div className="col-span-4">
                                <InputGroup label="Number" placeholder="+1 (555) 000-0000" />
                             </div>
                             <div className="col-span-4">
                                <InputGroup label="Note" placeholder="e.g. Primary" />
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

                 <Accordion title="Email Addresses">
                    <div className="flex justify-end mb-2">
                       <button onClick={addEmail} className="text-[#0074D9] text-xs font-bold hover:underline flex items-center gap-1"><i className="fa-solid fa-plus"></i> Add Email</button>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                       {emails.map((email, index) => (
                          <div key={index} className="grid grid-cols-12 gap-4 items-end border-b border-gray-200 last:border-0 pb-3 last:pb-0">
                             <div className="col-span-2">
                                <SelectGroup label="Type" options={["Personal", "Work"]} />
                             </div>
                             <div className="col-span-4">
                                <InputGroup label="Email" placeholder="example@mail.com" />
                             </div>
                             <div className="col-span-4">
                                <InputGroup label="Note" placeholder="e.g. Primary" />
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
               </div>
             )}

             {step === 2 && (
                <div className="animate-slide-up space-y-4">
                   
                   <Accordion title="Application Details" defaultOpen={true}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4 overflow-visible z-50 relative">
                         <SelectGroup 
                            label="Applying For (Role)*" 
                            options={["PCA", "HHA", "CNA", "LPN", "RN", "Social Worker"]} 
                         />
                         <SelectGroup label="Application Stage" options={["New", "Interviewing", "Background Check", "Offer Extended"]} />
                         <InputGroup label="Application Date" type="date" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                         <SelectGroup label="Highest Qualification" options={["High School", "Certificate III", "Certificate IV", "Diploma", "Bachelor", "Masters"]} />
                         <SelectGroup label="Years of Experience" options={["0-1 Year", "1-3 Years", "3-5 Years", "5+ Years"]} />
                         <InputGroup label="Expected Pay Rate ($)" placeholder="e.g. 18.00 / hr" />
                      </div>
                   </Accordion>

                   <Accordion title="Availability & Preferences">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 overflow-visible z-10 relative">
                          <InputGroup label="Available to Start" type="date" />
                          <InputGroup 
                              label="Preferred Region / Zone" 
                              placeholder="e.g., North Zone, Columbus Metro" 
                          />
                      </div>
                      
                      <div className="mb-6">
                          <label className="text-xs text-gray-500 mb-2 block">Days Available</label>
                          <div className="flex gap-2 flex-wrap">
                          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(d => (
                              <button key={d} className="px-3 py-1 border rounded-full text-xs text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors">{d}</button>
                          ))}
                          </div>
                      </div>

                      <div>
                          <label className="text-xs text-gray-500 mb-2 block">Preferred Shift Time</label>
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
                                   {referralSources.length > 1 && (
                                      <button 
                                         onClick={() => removeReferralSource(index)} 
                                         className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors" 
                                         title="Remove Referral Source"
                                      >
                                         <i className="fa-regular fa-trash-can"></i>
                                      </button>
                                   )}
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                      <SelectGroup 
                                         label="Referred By" 
                                         options={["Another Agency", "Temporary Staffing Agency", "Employee Referral", "Online Ad", "Other"]}
                                         value={source.referredBy}
                                         onChange={(val: string) => updateReferralSource(index, 'referredBy', val)} 
                                      />
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

                   <Accordion title="Interviewer Notes">
                      <div className="space-y-1">
                         <label className="text-xs font-medium text-gray-700">Initial Assessment / Notes</label>
                         <textarea 
                            maxLength={8000}
                            className="w-full border border-gray-200 rounded-lg p-3 text-sm h-40 resize-none outline-none focus:border-[#0074D9] placeholder:text-gray-400"
                            placeholder="Type any preliminary thoughts, interview notes, or flags here..."
                         ></textarea>
                      </div>
                   </Accordion>

                </div>
             )}

             {step === 3 && (
               <div className="animate-slide-up space-y-6">
                   <div className="flex justify-between items-end mb-4">
                      <div>
                         <h3 className="font-bold text-gray-800 text-sm">Applicant Documents</h3>
                         <p className="text-xs text-gray-500 mt-1">Upload resume, cover letter, and preliminary certifications.</p>
                      </div>
                      <button 
                        onClick={addDocument} 
                        className="text-[#0074D9] text-xs font-bold hover:underline flex items-center gap-1 border border-[#0074D9] px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <i className="fa-solid fa-plus"></i> Add New File
                      </button>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {documents.map((doc, index) => (
                         <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-4 relative animate-fade-in group hover:border-[#0074D9] transition-colors">
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
                               <div className="flex gap-3">
                                  <div className="w-1/3">
                                     <label className="text-xs font-medium text-gray-700 mb-1 block">Type</label>
                                     <select 
                                        className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#0074D9] bg-white cursor-pointer"
                                        value={doc.type}
                                        onChange={(e) => updateDocument(index, 'type', e.target.value)}
                                     >
                                        <option value="Resume">Resume</option>
                                        <option value="Cover Letter">Cover Letter</option>
                                        <option value="Certification">Certification</option>
                                        <option value="Other">Other</option>
                                     </select>
                                  </div>
                                  <div className="flex-1">
                                     <label className="text-xs font-medium text-gray-700 mb-1 block">Document Title</label>
                                     <input 
                                        type="text" 
                                        placeholder="e.g. John_Doe_Resume_2026.pdf" 
                                        className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#0074D9] bg-white"
                                        value={doc.title}
                                        onChange={(e) => updateDocument(index, 'title', e.target.value)}
                                     />
                                  </div>
                               </div>

                               <div className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors h-32 border-gray-300 bg-white hover:bg-gray-50`}>
                                   <i className="fa-solid fa-cloud-arrow-up text-2xl text-gray-400 mb-2 opacity-70"></i>
                                   <p className="text-xs text-gray-600 text-center font-medium">Click to upload document</p>
                                   <p className="text-[10px] text-gray-400 mt-1">PDF, DOCX, PNG (Max 5MB)</p>
                               </div>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
             )}
          </div>

          <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-2xl">
             {step > 1 && <button onClick={() => setStep(step - 1)} className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 text-sm font-medium hover:bg-white transition-colors">Back</button>}
             {step < 3 ? <button onClick={() => setStep(step + 1)} className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-lg transition-colors">Next</button> : <button onClick={() => { console.log("Applicant Added"); onClose(); }} className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-lg transition-colors">Add Applicant</button>}
          </div>
       </div>
    </div>, document.body
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

function StepIndicator({ num, label, current, sub }: any) {
   const active = current >= num;
   return (
      <div className={`flex items-center gap-2 transition-opacity ${active ? 'opacity-100' : 'opacity-50'}`}>
         <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${current === num ? 'bg-[#0074D9] text-white' : 'bg-gray-200 text-gray-600'}`}>{num}</div>
         <div>
            <span className={`block text-sm font-bold ${current === num ? 'text-[#0074D9]' : 'text-gray-500'}`}>{label}</span>
            {sub && <span className="block text-[10px] text-gray-500">{sub}</span>}
         </div>
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