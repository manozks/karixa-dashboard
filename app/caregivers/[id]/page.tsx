"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

export default function CaregiverProfilePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("General Info"); // Default to General Info for testing

  const tabs = ["General Info", "Schedule", "Clients", "Attendance", "Notes"];

  return (
    <DashboardLayout>
      <div className="flex flex-col min-h-screen bg-gray-50/50 p-0 space-y-6 pb-20">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/caregivers" className="hover:text-gray-800 flex items-center gap-1"><i className="fa-solid fa-chevron-left text-xs"></i> Back</Link>
          <span className="text-gray-300">|</span>
          <span>Caregiver</span> / <span className="font-semibold text-gray-800">Caregiver Profile</span>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
           <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
              <div className="flex gap-6">
                 <img src="https://i.pravatar.cc/150?img=1" alt="Profile" className="w-20 h-20 rounded-full object-cover border-4 border-gray-50" />
                 <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-bold text-gray-800">Nina Mcintire</h1>
                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">Active</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Caregiver, PCA • <span className="font-medium text-gray-700">$32 / per hour</span></p>
                 </div>
              </div>
              <div className="flex gap-3">
                 <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"><i className="fa-solid fa-download mr-1"></i> Edit Profile</button>
                 <button className="px-4 py-2 bg-[#0074D9] text-white rounded-lg text-sm font-medium hover:bg-[#0062b8]">Message</button>
              </div>
           </div>

           {/* Info Grid */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 text-sm border-t border-gray-100 pt-6">
              <div><span className="block text-xs text-gray-400 mb-1">Caregiver ID</span><span className="font-medium text-gray-800">CG-20012</span></div>
              <div><span className="block text-xs text-gray-400 mb-1">Role</span><span className="font-medium text-gray-800">Registered Nurse</span></div>
              <div className="col-span-2">
                  <span className="block text-xs text-gray-400 mb-1">Qualification</span>
                  <div className="flex gap-2">
                      {['First Aid', 'Cert III', 'Cert IV', '+3'].map(q => <span key={q} className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium text-gray-600">{q}</span>)}
                  </div>
              </div>
              
              <div><span className="block text-xs text-gray-400 mb-1">Mobile</span><span className="font-medium text-gray-800">(703) 981-7142</span></div>
              <div><span className="block text-xs text-gray-400 mb-1">Emergency No.</span><span className="font-medium text-gray-800">(703) 981-7142</span></div>
              <div><span className="block text-xs text-gray-400 mb-1">Language Spoken</span><span className="font-medium text-gray-800">English</span></div>
           </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border-b border-gray-200 rounded-t-xl shadow-sm mt-4">
           <div className="flex overflow-x-auto px-6 gap-8 no-scrollbar">
              {tabs.map((tab) => (
                 <button 
                    key={tab} 
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? 'border-[#0074D9] text-[#0074D9]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                 >
                    {tab}
                 </button>
              ))}
           </div>
        </div>

        {/* Tab Content Area */}
        <div className="bg-white rounded-b-xl shadow-sm border border-gray-100 border-t-0 p-6 min-h-[400px] client-space-mt">
           {renderTabContent(activeTab)}
        </div>

      </div>
    </DashboardLayout>
  );
}

function renderTabContent(tab: string) {
  switch (tab) {
    case "Schedule": return <ScheduleTab />; 
    case "Clients": return <ClientsTab />; 
    case "General Info": return <GeneralInfoTab />;
    case "Attendance": return <AttendanceTab />; 
    case "Notes": return <NotesTab />;
    default: return <div className="text-center py-20 text-gray-400">Content for {tab} is coming soon...</div>;
  }
}

// =========================================================================
// GENERAL INFO TAB 
// =========================================================================
function GeneralInfoTab() {
  return (
    <div className="animate-fade-in space-y-8">
       {/* Basic Information */}
       <div>
          <h3 className="font-bold text-gray-800 mb-4 text-sm">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             <InfoItem label="Name" value="Nina Mcintire" />
             <InfoItem label="DOB" value="24 Oct, 1933" />
             <InfoItem label="Gender" value="Female" />
             <InfoItem label="Social Security Number (SSN)" value="(703) 981-7142" />
             <InfoItem label="Phone/Mobile" value="(703) 981-7142" />
             <InfoItem label="Email Address" value="nina@gmail.com" />
             <InfoItem label="Language Spoken" value="English" />
             <InfoItem label="City" value="McLean" />
             <InfoItem label="State" value="VA (Virginia)" />
             <InfoItem label="Zip Code" value="22101" />
             <div className="col-span-2"><InfoItem label="Street Address" value="1509 Oakview Dr." /></div>
          </div>
       </div>

       <div className="h-px bg-gray-100 w-full"></div>

       {/* Emergency Contact */}
       <div>
          <h3 className="font-bold text-gray-800 mb-4 text-sm">Emergency Contact Number</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             <InfoItem label="Full Name" value="Daniel Choi" />
             <InfoItem label="Relationship" value="Son" />
             <InfoItem label="Phone" value="(703)981 -71-45" />
             <InfoItem label="Alternative Phone" value="(703)981-71-45" />
          </div>
       </div>

       <div className="h-px bg-gray-100 w-full"></div>

       {/* Availability */}
       <div>
          <h3 className="font-bold text-gray-800 mb-4 text-sm">Availability & Assignment</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             <InfoItem label="Availability Start Date" value="24 Oct, 2024" />
             <InfoItem label="Assigned Region Shifts" value="Melbourne East" />
             <InfoItem label="Preferred shift" value="Evening" />
             <div className="col-span-2">
                <span className="block text-gray-400 text-xs mb-2">Days Available</span>
                <div className="flex gap-2 flex-wrap">
                   {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'].map(d => <span key={d} className="bg-gray-50 border border-gray-200 px-2 py-1 rounded text-xs text-gray-600">{d}</span>)}
                </div>
             </div>
          </div>
       </div>

       <div className="h-px bg-gray-100 w-full"></div>

       {/* Documents */}
       <div>
          <h3 className="font-bold text-gray-800 mb-4 text-sm">Document & Certification</h3>
          <div className="space-y-3">
             <DocItem label="Resume" file="Nina_resume.pdf" />
             <DocItem label="Police Check" file="Nina_police.pdf" />
             <DocItem label="First Aid Certficate" file="Nina_first aid.pdf" />
             <DocItem label="Covid-19 Vaccination" file="Nina_Covid-19.pdf" />
          </div>
       </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <span className="block text-gray-400 text-xs mb-1">{label}</span>
      <span className="font-medium text-gray-800 text-sm">{value}</span>
    </div>
  );
}

function DocItem({ label, file }: { label: string, file: string }) {
   return (
      <div className="flex items-center gap-2 text-sm">
         <span className="text-gray-500 w-40">{label}:</span>
         <span className="flex items-center gap-1 text-gray-800 font-medium"><i className="fa-solid fa-download text-gray-400 text-xs"></i> {file}</span>
      </div>
   )
}

// =========================================================================
// 1. SCHEDULE TAB 
// =========================================================================
function ScheduleTab() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="animate-fade-in space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Schedule</h3>
          <p className="text-sm text-gray-500 mt-1">23 April, 2025 | Sunday <span className="text-[#0074D9] font-medium">• Today</span></p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm text-sm text-gray-700">
            <i className="fa-regular fa-calendar text-gray-400 mr-2"></i> 23 Apr - 29 Apr, 2025 <i className="fa-solid fa-chevron-right ml-2 text-xs text-gray-400"></i>
          </div>
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2 text-sm font-medium text-gray-700 shadow-sm outline-none">
              <option>Monthly</option>
            </select>
            <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none"></i>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-[#0074D9] hover:bg-[#0062b8] text-white px-5 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors"
          >
            Create Visit
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
        <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50/50">
          {["Sun", "Mon", "Tue", "Wed", "Thru", "Fri", "Sat"].map((day) => (
            <div key={day} className="py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 divide-x divide-gray-100 divide-y">
          {[...Array(7)].map((_, i) => (
             <div key={i} className={`min-h-[120px] p-2 ${i > 2 ? 'bg-white' : 'bg-gray-50/30'}`}>
                <div className="text-right text-xs text-gray-400 mb-2">{23 + i}</div>
                {i > 3 && (
                   <div className="bg-[#28A745] text-white p-1.5 rounded-md shadow-sm text-[10px] mb-1">
                      <div className="font-bold">7 AM - 3 PM | 8 Hours</div>
                      <div className="opacity-90">Juan, Chinchu</div>
                   </div>
                )}
                {i === 2 && (
                   <div className="bg-[#D9A300] text-white p-1.5 rounded-md shadow-sm text-[10px] mb-1">
                      <div className="font-bold">7 AM - 3 PM | 8 Hours</div>
                      <div className="opacity-90">Juan, Chinchu</div>
                   </div>
                )}
             </div>
          ))}
        </div>
      </div>

      {/* Create Visit Modal */}
      {showModal && <CreateVisitModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

// --- CREATE VISIT MODAL (3-Step Wizard) ---
function CreateVisitModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "unset"; }; }, []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh] animate-slide-up relative">
          
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
             <h2 className="text-xl font-bold text-gray-800">Create Visit</h2>
             <button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button>
          </div>

          {/* Stepper */}
          <div className="pt-6 px-8 flex justify-center bg-gray-50/30 pb-4">
             <div className="flex items-center gap-4 bg-blue-50/50 px-6 py-2 rounded-full border border-blue-100">
                <div className={`flex items-center gap-2 ${step>=1?'text-[#0074D9]':'text-gray-400'}`}><span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step>=1 ? 'bg-[#0074D9] text-white' : 'bg-gray-200 text-gray-500'}`}>1</span> <span className="font-medium text-sm">Basic Information</span></div>
                <div className="w-8 h-px bg-gray-300"></div>
                <div className={`flex items-center gap-2 ${step>=2?'text-[#0074D9]':'text-gray-400'}`}><span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step>=2 ? 'bg-[#0074D9] text-white' : 'bg-gray-200 text-gray-500'}`}>2</span> <span className="font-medium text-sm">Accounting</span></div>
                <div className="w-8 h-px bg-gray-300"></div>
                <div className={`flex items-center gap-2 ${step>=3?'text-[#0074D9]':'text-gray-400'}`}><span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step>=3 ? 'bg-[#0074D9] text-white' : 'bg-gray-200 text-gray-500'}`}>3</span> <span className="font-medium text-sm">Complete</span></div>
             </div>
          </div>

          <div className="p-8 overflow-y-auto flex-1">
             {/* STEP 1: Basic Information  */}
             {step === 1 && (
                <div className="space-y-6 animate-slide-up">
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1"><label className="text-sm font-medium text-gray-700">Client</label><select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm text-gray-500"><option>Select or Enter</option></select></div>
                      <div className="space-y-1"><label className="text-sm font-medium text-gray-700">Employer</label><select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm text-gray-500"><option>Select or Enter</option></select></div>
                   </div>
                   <div className="grid grid-cols-3 gap-6">
                      <div className="space-y-1"><label className="text-sm font-medium text-gray-700">Start Date</label><div className="relative"><input type="text" placeholder="dd / mm / yyyy" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm"/><i className="fa-regular fa-calendar absolute right-3 top-3 text-gray-400"></i></div></div>
                      <div className="space-y-1"><label className="text-sm font-medium text-gray-700">Time</label><select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm text-gray-500"><option>Select Start Time</option></select></div>
                      <div className="space-y-1"><label className="text-sm font-medium text-gray-700 opacity-0">End</label><select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm text-gray-500"><option>Select End Time</option></select></div>
                   </div>
                   <div className="flex items-center gap-2"><input type="checkbox" className="rounded text-[#0074D9]" /><label className="text-sm text-gray-600">Flexible Time</label></div>
                   <div className="space-y-1"><label className="text-sm font-medium text-gray-700">Frequency</label><div className="flex gap-2"><select className="flex-1 border border-gray-200 rounded-lg p-2.5 text-sm text-gray-500"><option>Select</option></select><button className="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 border border-gray-200">Custom</button></div></div>
                   <div className="space-y-1"><label className="text-sm font-medium text-gray-700">Notes</label><textarea placeholder="Start typing..." className="w-full border border-gray-200 rounded-lg p-2.5 text-sm h-24 resize-none"></textarea></div>
                </div>
             )}

             {/* STEP 2: Accounting */}
             {step === 2 && (
                <div className="space-y-6 animate-slide-up">
                   <div className="space-y-1"><label className="text-sm font-medium text-gray-700">Service Type</label><input type="text" placeholder="Enter or Select" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm" /></div>
                   <div className="space-y-1"><label className="text-sm font-medium text-gray-700">Bill Rate Hourly</label><div className="flex gap-4"><select className="flex-1 border p-2.5 rounded-lg text-sm"><option>Select</option></select><input type="text" placeholder="Custom Bill Rate" className="flex-1 border p-2.5 rounded-lg text-sm" /></div></div>
                   <div className="space-y-1"><label className="text-sm font-medium text-gray-700">Pay Rate</label><div className="flex gap-4"><select className="flex-1 border p-2.5 rounded-lg text-sm"><option>Select</option></select><input type="text" placeholder="Custom Pay Rate" className="flex-1 border p-2.5 rounded-lg text-sm" /></div></div>
                </div>
             )}

             {/* STEP 3: Complete */}
             {step === 3 && (
                <div className="flex flex-col items-center justify-center h-full animate-scale-up py-8">
                   <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"><i className="fa-solid fa-check text-2xl text-green-600"></i></div>
                   <h3 className="text-xl font-bold text-gray-800">Schedule Created!</h3>
                </div>
             )}
          </div>

          <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
             {step === 1 && <button onClick={() => setStep(2)} className="px-6 py-2.5 bg-[#0074D9] text-white rounded-lg text-sm font-medium hover:bg-[#0062b8]">Continue</button>}
             {step === 2 && <><button onClick={() => setStep(1)} className="px-6 py-2.5 border rounded-lg text-sm hover:bg-white">Back</button><button onClick={() => setStep(3)} className="px-6 py-2.5 bg-[#0074D9] text-white rounded-lg text-sm">Schedule</button></>}
             {step === 3 && <button onClick={onClose} className="px-6 py-2.5 bg-[#0074D9] text-white rounded-lg text-sm">Finish</button>}
          </div>
       </div>
    </div>, document.body
  );
}

// =========================================================================
// 2. CLIENTS TAB 
// =========================================================================
function ClientsTab() {
  const [showModal, setShowModal] = useState(false);
  const clients = [
    { id: "01", name: "Olivia Thompson", shift: "8:30 AM | 7:00 PM", last: "22 April, 2025 | 8:00 AM", status: "Active", img: 1 },
    { id: "02", name: "Jack Williams", shift: "10:00 AM | 5:30 PM", last: "22 April, 2025 | 8:00 AM", status: "Active", img: 2 },
    { id: "03", name: "Amelia Robinson", shift: "8:15 AM | 7:45 PM", last: "22 April, 2025 | 8:00 AM", status: "Active", img: 3 },
  ];

  return (
    <div className="animate-fade-in space-y-6">
       <div className="flex justify-between items-center">
          <div className="relative w-64"><i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i><input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand" /></div>
          <button onClick={() => setShowModal(true)} className="bg-[#0074D9] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-sm">Assign Client</button>
       </div>
       <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm"><thead className="bg-gray-50 text-gray-500 text-xs uppercase"><tr><th className="p-4">SN</th><th className="p-4">Client Name</th><th className="p-4">Schedule Shift</th><th className="p-4">Last Visit</th><th className="p-4">Status</th><th className="p-4"></th></tr></thead>
             <tbody className="divide-y divide-gray-50">{clients.map((c, i) => (
                <tr key={i} className="hover:bg-gray-50">
                   <td className="p-4 text-gray-500">{c.id}</td>
                   {/* CLICKABLE CLIENT NAME */}
                   <td className="p-4">
                      <Link href="/clients/profile" className="flex items-center gap-3 font-medium text-gray-800 hover:text-[#0074D9]">
                         <img src={`https://i.pravatar.cc/150?img=${c.img}`} className="w-8 h-8 rounded-full" /> {c.name}
                      </Link>
                   </td>
                   <td className="p-4 text-gray-800">{c.shift}</td><td className="p-4 text-gray-600 font-medium">{c.last}</td><td className="p-4"><span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs border border-blue-100">{c.status}</span></td><td className="p-4 text-right"><button className="text-blue-500 bg-blue-50 w-6 h-6 rounded-full hover:bg-blue-100"><i className="fa-regular fa-eye text-xs"></i></button></td>
                </tr>))}
             </tbody>
          </table>
       </div>
       {showModal && <AssignClientModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

// --- ASSIGN CLIENT MODAL  ---
function AssignClientModal({ onClose }: { onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col animate-scale-up">
          <div className="flex justify-between items-center p-6 border-b border-gray-100"><h2 className="text-xl font-bold">Assign Client</h2><button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button></div>
          <div className="p-6 space-y-4">
             <div className="space-y-1"><label className="text-xs font-medium text-gray-700">Client</label><select className="w-full border rounded-lg p-2.5 text-sm bg-white text-gray-500"><option>Select or Enter</option></select></div>
             <div className="space-y-1"><label className="text-xs font-medium text-gray-700">Shift</label><div className="flex gap-2"><select className="flex-1 border rounded-lg p-2.5 text-sm text-gray-500"><option>Select Start Time</option></select><select className="flex-1 border rounded-lg p-2.5 text-sm text-gray-500"><option>Select End Time</option></select></div></div>
             <div className="space-y-1"><label className="text-xs font-medium text-gray-700">Notes</label><textarea className="w-full border rounded-lg p-2.5 text-sm h-24" placeholder="Start typing..."></textarea></div>
          </div>
          <div className="p-6 border-t flex justify-end gap-3"><button onClick={onClose} className="px-6 py-2.5 bg-[#0074D9] text-white rounded-lg text-sm font-medium hover:bg-[#0062b8] w-full">Request for Schedule</button></div>
       </div>
    </div>, document.body
  );
}

// =========================================================================
// 1. ATTENDANCE TAB 
// =========================================================================
function AttendanceTab() {
  const attendanceData = [
    { id: "01", client: "Nina Mcintire", date: "01 April, 2025 | Saturday", in: "09:00 AM", out: "5:30 PM", approved: "Admin", status: "Present" },
    { id: "02", client: "Nina Mcintire", date: "03 April, 2025 | Monday", in: "09:00 AM", out: "5:30 PM", approved: "Admin", status: "Present" },
    { id: "03", client: "Nina Mcintire", date: "04 April, 2025 | Tuesday", in: "09:00 AM", out: "5:30 PM", approved: "Admin", status: "Present" },
    { id: "04", client: "Nina Mcintire", date: "05 April, 2025 | Wednesday", in: "09:00 AM", out: "5:30 PM", approved: "Admin", status: "Present" },
    { id: "05", client: "Nina Mcintire", date: "06 April, 2025 | Thursday", in: "09:00 AM", out: "5:30 PM", approved: "Admin", status: "Present" },
  ];

  return (
    <div className="animate-fade-in space-y-6">
       <div className="flex justify-between items-center">
          <div className="flex gap-3 w-full md:w-auto">
             <div className="relative w-64"><i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i><input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand" /></div>
             <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white"><i className="fa-regular fa-calendar"></i> April 2025</div>
             <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white">Month <i className="fa-solid fa-chevron-down text-xs"></i></div>
          </div>
          <button className="bg-[#0074D9] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-sm">Download Attendance</button>
       </div>

       <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm"><thead className="bg-gray-50 text-gray-500 text-xs uppercase"><tr><th className="p-4">SN</th><th className="p-4">Client Name</th><th className="p-4">Date</th><th className="p-4">Check In</th><th className="p-4">Check Out</th><th className="p-4">Approved By</th><th className="p-4">Status</th><th className="p-4"></th></tr></thead>
             <tbody className="divide-y divide-gray-50">{attendanceData.map((a, i) => (
                <tr key={i} className="hover:bg-gray-50">
                   <td className="p-4 text-gray-500">{a.id}</td>
                   <td className="p-4 flex items-center gap-3"><img src="https://i.pravatar.cc/150?img=1" className="w-8 h-8 rounded-full" /><span className="font-medium text-gray-800">{a.client}</span></td>
                   <td className="p-4 text-gray-600">{a.date}</td><td className="p-4 text-gray-800 font-medium">{a.in}</td><td className="p-4 text-gray-800 font-medium">{a.out}</td><td className="p-4 text-gray-600">{a.approved}</td>
                   <td className="p-4"><span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium border border-blue-100 flex items-center gap-1 w-fit">{a.status} <i className="fa-solid fa-chevron-down text-[10px]"></i></span></td>
                   <td className="p-4 text-right text-blue-500"><i className="fa-regular fa-eye"></i></td>
                </tr>))}
             </tbody>
          </table>
       </div>
       <div className="flex justify-between items-center text-xs text-gray-500 pt-2"><span>Showing 1 to 10 of 1000 Results</span><div className="flex gap-2"><button className="hover:text-blue-600">Previous</button><button className="text-blue-600 font-medium">Next</button></div></div>
    </div>
  );
}

// =========================================================================
// 2. NOTES TAB & MODAL 
// =========================================================================
function NotesTab() {
  const [showModal, setShowModal] = useState(false);
  
  const notes = [
    { title: "Suffering with Headache", date: "23 Feb, 2025", author: "Rajesh Maharjan", desc: "Here is a dummy note that will come here that will be added by different users..." },
    { title: "Daily Diet Routine", date: "23 Feb, 2025", author: "Rajesh Maharjan", desc: "Here is a dummy note that will come here that will be added by different users..." },
    { title: "Suffering with Headache", date: "23 Feb, 2025", author: "Rajesh Maharjan", desc: "Here is a dummy note that will come here that will be added by different users..." },
    { title: "Daily Diet Routine", date: "23 Feb, 2025", author: "Rajesh Maharjan", desc: "Here is a dummy note that will come here that will be added by different users..." },
  ];

  return (
    <div className="animate-fade-in space-y-6">
       <div className="flex justify-between items-center">
          <div className="relative w-64"><i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i><input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand" /></div>
          <button onClick={() => setShowModal(true)} className="bg-[#0074D9] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-sm">Create A Note</button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {notes.map((n, i) => (
             <div key={i} className="bg-[#F8FAFC] border border-[#E2E8F0] p-5 rounded-xl hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#0074D9] text-sm mb-2">{n.title}</h4>
                <p className="text-xs text-gray-500 mb-4 line-clamp-3 leading-relaxed">{n.desc}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                   <div className="flex items-center gap-2"><img src="https://i.pravatar.cc/150?img=3" className="w-8 h-8 rounded-full border border-white shadow-sm" /><div className="text-[10px]"><div className="font-bold text-gray-700">{n.author}</div><div className="text-gray-400">Caregiver</div></div></div>
                   <span className="text-[10px] text-gray-400">{n.date}</span>
                </div>
             </div>
          ))}
       </div>
       {showModal && <CreateNoteModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

function CreateNoteModal({ onClose }: { onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl flex flex-col animate-scale-up relative">
          <div className="flex justify-between items-center p-6 border-b border-gray-100"><h2 className="text-xl font-bold">Notes</h2><button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button></div>
          <div className="p-6 space-y-4">
             <div className="space-y-1"><label className="text-xs text-gray-500">Title</label><input className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-brand" placeholder="Enter" /></div>
             <div className="space-y-1"><label className="text-xs text-gray-500">Notes</label><textarea className="w-full border rounded-lg p-2.5 text-sm h-32 outline-none focus:border-brand resize-none" placeholder="Start typing..."></textarea></div>
          </div>
          <div className="p-6 border-t flex justify-end gap-3"><button onClick={onClose} className="px-6 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50">Cancel</button><button className="px-6 py-2 bg-[#0074D9] text-white rounded-lg text-sm font-medium hover:bg-[#0062b8]">Create</button></div>
       </div>
    </div>, document.body
  );
}

