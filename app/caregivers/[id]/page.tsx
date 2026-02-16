"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

export default function CaregiverProfilePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("General Info");

  const tabs = ["General Info", "Schedule", "Clients", "Attendance", "Service Notes", "Certificates & Documents", "Contacts Address", "Reference"];

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
                 <Link 
  href={`/caregivers//edit`} 
  className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center transition-colors"
>
  {/* Changed from fa-download to fa-pen */}
  <i className="fa-solid fa-pen mr-2 text-xs"></i> Edit Profile
</Link>
                 <button className="px-4 py-2 bg-[#0074D9] text-white rounded-lg text-sm font-medium hover:bg-[#0062b8]">Message</button>
              </div>
           </div>

           {/* Info Grid */}
           <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8 text-sm border-t border-gray-100 pt-6">
              <div><span className="block text-xs text-gray-400 mb-1">Caregiver ID</span><span className="font-medium text-gray-800">CG-20012</span></div>
              <div><span className="block text-xs text-gray-400 mb-1">Type</span><span className="font-medium text-gray-800">Personal Care Assistant (PCA)</span></div>
           {/*    <div className="col-span-2">
                  <span className="block text-xs text-gray-400 mb-1">Qualification</span>
                  <div className="flex gap-2">
                      {['First Aid', 'Cert III', 'Cert IV', '+3'].map(q => <span key={q} className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium text-gray-600">{q}</span>)}
                  </div>
              </div> */}
              
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

// --- Tab Render Helper ---
function renderTabContent(tab: string) {
  switch (tab) {
    case "General Info": return <GeneralInfoTab />;
    case "Schedule": return <ScheduleTab />; 
    case "Clients": return <ClientsTab />; 
    case "Attendance": return <AttendanceTab />; 
    case "Service Notes": return <NotesTab />;
    case "Certificates & Documents": return <CertificatesTab />;
    case "Contacts Address": return <ContactsTab />;
     case "Reference": return <ReferenceTab />;
    default: return <div className="text-center py-20 text-gray-400">Content for {tab} is coming soon...</div>;
  }
}

// =========================================================================
// 1. GENERAL INFO TAB 
// =========================================================================
function GeneralInfoTab() {
  return (
    <div className="animate-fade-in space-y-8">
       {/* Basic Information */}
       <div>
          <h3 className="font-bold text-gray-800 mb-4 text-sm">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <InfoItem label="Salutation" value="Ms." />
             <InfoItem label="Name" value="Nina Mcintire" />
             <InfoItem label="DOB" value="24 Oct, 1933" />             
             <InfoItem label="Gender" value="Female" />
             <InfoItem label="Marital Status" value="Married" />
             <InfoItem label="Skills" value="Catheter Care" />
             <InfoItem label="Qualification" value="Certificate III in Individual Support" />
             <InfoItem label="Years of Experience" value="5 Years" />
             <InfoItem label="User Name" value="John KK" />
             <InfoItem label="Hourly Charge" value="$32 / per hour" />
             <InfoItem label="Caregiver Type" value="Full Time" />
             <InfoItem label="Hire Date" value="12 Jan, 2020" />
             <InfoItem label="Role Type" value="Caregiver" />
             <InfoItem label="Social Security Number (SSN)" value="(***) ***-7142" />
             <InfoItem label="State ID" value="D-123-456-7890" />
             <InfoItem label="Driver’s License" value="D-123-456-7890" />
             <InfoItem label="PASSPORT" value="D-123-456-7890" />
             <InfoItem label="Military ID" value="D-123-456-7890" />
             <InfoItem label="USCIS ID" value="D-123-456-7890" />
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
// 2. SCHEDULE TAB (Fixed: Now calls CreateVisitModal correctly)
// =========================================================================
function ScheduleTab() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showVisitSummary, setShowVisitSummary] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<any>(null);

  // Define the grid data
  const calendarDays = [
    { date: 30, type: 'prev' }, 
    { date: 1, type: 'next' }, { date: 2, type: 'next' }, { date: 3, type: 'next' }, { date: 4, type: 'next' }, { date: 5, type: 'next' },
    { date: 6, type: 'current' }, { date: 7, type: 'current' }, { date: 8, type: 'current' }, { date: 9, type: 'current' }, { date: 10, type: 'current' }, { date: 11, type: 'current' }, { date: 12, type: 'current' },
    { date: 13, type: 'current' }, { date: 14, type: 'current' }, { date: 15, type: 'current' }, { date: 16, type: 'current' }, { date: 17, type: 'current' }, { date: 18, type: 'current' }, { date: 19, type: 'current' },
    { date: 20, type: 'current' }, { date: 21, type: 'current' }, 
    { 
      date: 22, 
      type: 'current', 
      event: { color: 'yellow', time: '7 AM - 3 PM | 8 Hours', staff: 'Juan, Chinchu' } 
    },
    { 
      date: 23, 
      type: 'current', 
      event: { color: 'green', time: '7 AM - 3 PM | 8 Hours', staff: 'Juan, Chinchu' } 
    },
    { 
      date: 24, 
      type: 'current', 
      event: { color: 'green', time: '7 AM - 3 PM | 8 Hours', staff: 'Juan, Chinchu' } 
    },
    { 
      date: 25, 
      type: 'current', 
      event: { color: 'green', time: '7 AM - 3 PM | 8 Hours', staff: 'Juan, Chinchu' } 
    },
    { 
      date: 26, 
      type: 'current', 
      event: { color: 'green', time: '7 AM - 3 PM | 8 Hours', staff: 'Juan, Chinchu' } 
    },
    { 
      date: 27, 
      type: 'current', 
      event: { color: 'green', time: '7 AM - 3 PM | 8 Hours', staff: 'Juan, Chinchu' } 
    },
    { 
      date: 28, 
      type: 'current', 
      event: { color: 'blue', time: '7 AM - 3 PM | 8 Hours', staff: 'Juan, Chinchu' } 
    },
    { date: 29, type: 'current' }, { date: 30, type: 'current' }, 
    { date: 1, type: 'next' }, { date: 2, type: 'next' }, { date: 3, type: 'next' }
  ];

  // Handle Event Click
  const handleEventClick = (day: any) => {
    setSelectedVisit({
      date: `${day.date} April, 2025`,
      time: day.event.time,
      caregiver: day.event.staff,
      status: "Completed",
      location: "1509 Oakview Dr, McLean VA"
    });
    setShowVisitSummary(true);
  };

  return (
    <div className="animate-fade-in space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Schedule</h3>
          <p className="text-sm text-gray-500 mt-1 font-medium">23 April, 2025 | Sunday <span className="text-[#0074D9] ml-1">• Today</span></p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Date Navigator */}
          <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm h-10">
            <i className="fa-regular fa-calendar text-gray-400 mr-2"></i>
            <span className="text-sm font-medium text-gray-700 mr-3">23 Apr - 29 Apr, 2025</span>
            <div className="flex gap-1 border-l border-gray-200 pl-2">
               <button className="text-gray-400 hover:text-gray-600 px-1"><i className="fa-solid fa-chevron-left text-xs"></i></button>
               <button className="text-gray-400 hover:text-gray-600 px-1"><i className="fa-solid fa-chevron-right text-xs"></i></button>
            </div>
          </div>

          {/* View Dropdown */}
          <div className="relative">
            <select className="h-10 pl-4 pr-8 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white focus:outline-none focus:border-brand appearance-none cursor-pointer">
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Daily</option>
            </select>
            <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none"></i>
          </div>

          {/* Create Button */}
          <button 
            onClick={() => setShowCreateModal(true)}
            className="h-10 bg-[#0074D9] hover:bg-[#0062b8] text-white px-5 rounded-lg text-sm font-bold shadow-sm transition-colors"
          >
            Create Visit
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
        
        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-gray-200 bg-[#F8FAFC]">
          {["Sun", "Mon", "Tue", "Wed", "Thru", "Fri", "Sat"].map((day) => (
            <div key={day} className="py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">{day}</div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 divide-x divide-gray-100 divide-y border-b border-gray-100">
          {calendarDays.map((day, i) => (
             <div key={i} className={`min-h-[140px] p-2 relative group transition-colors ${day.type !== 'current' ? 'bg-gray-50/30' : 'bg-white hover:bg-gray-50'}`}>
                {/* Date Number */}
                <span className={`absolute top-3 right-3 text-xs font-semibold ${day.type !== 'current' ? 'text-gray-300' : 'text-gray-500'}`}>
                   {day.date}
                </span>

                {/* Event Card */}
                <div className="pt-6 h-full flex flex-col justify-center">
                   {day.event ? (
                      <div 
                         onClick={() => handleEventClick(day)}
                         className={`
                            p-2.5 rounded-md text-[11px] text-white shadow-sm cursor-pointer hover:opacity-90 hover:shadow-md transition-all transform hover:-translate-y-0.5
                            ${day.event.color === 'yellow' ? 'bg-[#D9A300]' : 
                              day.event.color === 'green' ? 'bg-[#28A745]' : 
                              day.event.color === 'blue' ? 'bg-[#0056B3]' : 'bg-gray-500'}
                         `}
                      >
                         <div className="font-bold mb-0.5">{day.event.time}</div>
                         <div className="opacity-90">{day.event.staff}</div>
                      </div>
                   ) : (
                      /* Hover Plus Icon for empty cells */
                      <div 
                        onClick={() => setShowCreateModal(true)}
                        className="h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-gray-300 hover:text-[#0074D9]"
                      >
                         <i className="fa-solid fa-plus text-xl"></i>
                      </div>
                   )}
                </div>
             </div>
          ))}
        </div>
      </div>

      {/* --- MODALS --- */}
      {/* FIXED: Using CreateVisitModal instead of CreateScheduleModal */}
      {showCreateModal && <CreateVisitModal onClose={() => setShowCreateModal(false)} />}
      
      {showVisitSummary && selectedVisit && (
         <VisitSummaryModal 
            report={selectedVisit} 
            onApprove={() => setShowVisitSummary(false)} 
            onClose={() => setShowVisitSummary(false)} 
         />
      )}

    </div>
  );
}

// --- VISIT SUMMARY MODAL ---
function VisitSummaryModal({ report, onApprove, onClose }: { report: any, onApprove: () => void, onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "unset"; }; }, []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-6xl shadow-2xl flex flex-col max-h-[95vh] animate-slide-up relative">
          
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
             <h2 className="text-xl font-bold text-gray-800">Visit Summary</h2>
             <button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button>
          </div>

          <div className="p-8 overflow-y-auto bg-gray-50/30">
             {/* Blue Banner */}
             <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-center mb-6">
                <p className="text-sm text-blue-800 font-medium">Early Clock in - Early Clock out</p>
                <p className="text-xs text-blue-600">16 June, 2025 | Tuesday &nbsp; • &nbsp; 11:30 AM - 2:00 PM</p>
             </div>

             {/* Info Cards */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50/50 border border-green-100 p-4 rounded-xl relative">
                   <span className="absolute top-4 right-4 text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold uppercase">Client</span>
                   <div className="flex items-center gap-3 mb-2">
                      <img src="https://i.pravatar.cc/150?img=1" className="w-10 h-10 rounded-full" />
                      <h3 className="font-bold text-gray-800">Chen, Yueqiu</h3>
                   </div>
                   <div className="text-xs text-gray-500 grid grid-cols-2 gap-2">
                      <p>Phone: (703)981-7142</p> <p>Code: T1019</p>
                      <p className="col-span-2">Location: 2231 Colts Neck RD 412</p>
                   </div>
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded-xl relative">
                   <span className="absolute top-4 right-4 text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-bold uppercase">Caregiver</span>
                   <div className="flex items-center gap-3 mb-2">
                      <img src="https://i.pravatar.cc/150?img=12" className="w-10 h-10 rounded-full" />
                      <h3 className="font-bold text-gray-800">Surles, Michael Jackson</h3>
                   </div>
                   <div className="text-xs text-gray-500 grid grid-cols-2 gap-2">
                      <p>Phone: (703)981-7142</p> <p>Email: surless@icloud.com</p>
                      <p className="col-span-2">Specialist: PCA</p>
                   </div>
                </div>
             </div>

             {/* Times & Map Section */}
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2 space-y-6">
                   <div className="grid grid-cols-2 gap-8">
                      <div>
                         <h4 className="text-xs font-bold text-gray-700 uppercase mb-3">Arrival</h4>
                         <div className="space-y-3 text-xs">
                            <div className="flex justify-between"><span className="text-gray-500">Scheduled</span><span className="font-medium">06/16/2020 | 11:30 AM</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">Corrected</span><span className="font-medium bg-white border px-2 py-1 rounded">06/16/2020 11:21 AM</span></div>
                         </div>
                      </div>
                      <div>
                         <h4 className="text-xs font-bold text-gray-700 uppercase mb-3">Departure</h4>
                         <div className="space-y-3 text-xs">
                            <div className="flex justify-between"><span className="text-gray-500">Scheduled</span><span className="font-medium">06/16/2020 | 11:30 AM</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">Corrected</span><span className="font-medium bg-white border px-2 py-1 rounded">06/16/2020 11:21 AM</span></div>
                         </div>
                      </div>
                   </div>
                   <div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-4">
                      <div className="text-center"><p className="text-xs text-gray-500">Scheduled Time</p><p className="font-bold text-sm bg-white border rounded p-1 mt-1">2 Hrs 30 Mins</p></div>
                      <div className="text-center"><p className="text-xs text-gray-500">Visit Time</p><p className="font-bold text-sm bg-white border rounded p-1 mt-1">2 Hrs 30 Mins</p></div>
                      <div className="text-center"><p className="text-xs text-gray-500">Billable Time</p><p className="font-bold text-sm bg-white border rounded p-1 mt-1">2 Hrs 30 Mins</p></div>
                   </div>
                </div>

                <div className="bg-white p-2 rounded-xl border border-gray-200 h-48 relative overflow-hidden">
                   <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                      <img src="/map-placeholder.png" className="opacity-50 w-full h-full object-cover" />
                      <span className="absolute text-xs font-bold bg-white px-2 py-1 rounded shadow">GPS / Geo Fench</span>
                   </div>
                   <div className="absolute bottom-2 left-2 bg-yellow-50 text-yellow-700 text-[10px] px-2 py-1 rounded border border-yellow-200">Needs Approval</div>
                </div>
             </div>

             {/* Completed Tasks */}
             <div>
                <h4 className="text-sm font-bold text-gray-800 mb-3">Completed Tasks</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   {['Bathing', 'Mouth Care', 'Dressing', 'Assist with commode', 'Assist with urinal', 'Assist with bedpan', 'Meal Prep', 'Assist with feeding', 'Prepare Breakfast', 'Housework', 'Shopping', 'Provide Medication'].map((task) => (
                      <div key={task} className="flex items-center gap-2">
                         <div className="w-4 h-4 bg-[#0074D9] rounded flex items-center justify-center"><i className="fa-solid fa-check text-white text-[10px]"></i></div>
                         <span className="text-xs text-gray-600">{task}</span>
                      </div>
                   ))}
                </div>
             </div>
          </div>

          <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-white">
             <button onClick={onClose} className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 text-sm font-medium hover:bg-gray-50">Back</button>
             <button onClick={onApprove} className="px-6 py-2.5 bg-[#0074D9] text-white rounded-lg text-sm font-medium hover:bg-[#0062b8]">Approve Visit</button>
          </div>
       </div>
    </div>, document.body
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
             {step === 1 && (
                <div className="space-y-6 animate-slide-up">
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1"><label className="text-sm font-medium text-gray-700">Client</label><select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm text-gray-500"><option>Select or Enter</option></select></div>
                      <div className="space-y-1"><label className="text-sm font-medium text-gray-700">Employer</label><select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm text-gray-500"><option>Select or Enter</option></select></div>
                   </div>
                   <div className="grid grid-cols-3 gap-6">
                      <div className="space-y-1"><label className="text-sm font-medium text-gray-700">Start Date</label><div className="relative"><input type="date" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm"/></div></div>
                        {/* Start Time Picker */}
       <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Start Time</label>
                        <div className="relative">
                           <input type="time" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-brand" />
                           {/* Decorative Icon (Optional: depends on browser native support, added for style consistency) */}
                           <i className="fa-regular fa-clock absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none bg-white pl-2"></i>
                        </div>
                      </div>
                        {/* End Time Picker */}
      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">End Time</label>
                        <div className="relative">
                           <input type="time" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-brand" />
                           <i className="fa-regular fa-clock absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none bg-white pl-2"></i>
                        </div>
                      </div>
                   </div>
                   <div className="flex items-center gap-2"><input type="checkbox" className="rounded text-[#0074D9]" /><label className="text-sm text-gray-600">Flexible Time</label></div>
                   <div className="space-y-1"><label className="text-sm font-medium text-gray-700">Frequency</label><div className="flex gap-2"><select className="flex-1 border border-gray-200 rounded-lg p-2.5 text-sm text-gray-500"><option>Select</option></select><button className="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 border border-gray-200">Custom</button></div></div>
                   <div className="space-y-1"><label className="text-sm font-medium text-gray-700">Notes</label><textarea placeholder="Start typing..." className="w-full border border-gray-200 rounded-lg p-2.5 text-sm h-24 resize-none"></textarea></div>
                </div>
             )}

             {step === 2 && (
                <div className="space-y-6 animate-slide-up">
                   <div className="space-y-1"><label className="text-sm font-medium text-gray-700">Service Type</label><input type="text" placeholder="Enter or Select" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm" /></div>
                   <div className="space-y-1"><label className="text-sm font-medium text-gray-700">Bill Rate Hourly</label><div className="flex gap-4"><select className="flex-1 border p-2.5 rounded-lg text-sm"><option>Select</option></select><input type="text" placeholder="Custom Bill Rate" className="flex-1 border p-2.5 rounded-lg text-sm" /></div></div>
                   <div className="space-y-1"><label className="text-sm font-medium text-gray-700">Pay Rate</label><div className="flex gap-4"><select className="flex-1 border p-2.5 rounded-lg text-sm"><option>Select</option></select><input type="text" placeholder="Custom Pay Rate" className="flex-1 border p-2.5 rounded-lg text-sm" /></div></div>
                </div>
             )}

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
             <div className="space-y-1">
               <div className="grid grid-cols-2 gap-6">
            {/* Start Time Picker */}  
           <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700">Start Date</label>
            <div className="relative">
                           <input type="time" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-brand" />
                           {/* Decorative Icon (Optional: depends on browser native support, added for style consistency) */}
                           <i className="fa-regular fa-clock absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none bg-white pl-2"></i>
                        </div>
            </div>
           
            {/* End Time Picker */}
           <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700">End Time</label>
            <div className="relative">
                           <input type="time" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-brand" />
                           <i className="fa-regular fa-clock absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none bg-white pl-2"></i>
                        </div>
            </div>
            
                        
              
               </div>
               </div>
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

// =========================================================================
// 1. TRACKABLE DOCUMENT TAB (New Implementation)
// =========================================================================
function CertificatesTab() {
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock Data 
  const documents = [
    { id: "01XBY4", type: "Driving License", mode: "Trackable", created: "22 April, 2025 | 5:28:20 PM", expiry: "22 July, 2025 | 5:28:20 PM", remark: "This is Driving License Document", status: "Active" },
    { id: "01XBY4", type: "CPR Certificate", mode: "Untrackable", created: "22 April, 2025 | 5:28:20 PM", expiry: "22 July, 2025 | 5:28:20 PM", remark: "This is CPR Medical Document", status: "Expired" },
  ];

  return (
    <div className="animate-fade-in space-y-6">
       
       {/* Header */}
       <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Certificates & Documents</h3>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-[#0074D9] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#0062b8] transition-colors shadow-sm"
          >
            Add Certificates/Documents
          </button>
       </div>

       {/* Table */}
       <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
             <table className="w-full text-left text-xs whitespace-nowrap">
                <thead className="bg-gray-50 text-gray-500 uppercase font-semibold">
                   <tr>
                      <th className="p-4">Document Number</th>
                      <th className="p-4">Document Type</th>
                      <th className="p-4">Document Mode</th>
                      <th className="p-4">Created On</th>
                      <th className="p-4">Expiry Date</th>
                      <th className="p-4">Remark</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right"></th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {documents.map((doc, index) => (
                      <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                         <td className="p-4 text-gray-600">{doc.id}</td>
                         <td className="p-4 font-medium text-gray-800">{doc.type}</td>
                         <td className="p-4">
                            <span className={`px-2 py-1 rounded text-[10px] font-medium ${doc.mode === 'Trackable' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                               {doc.mode}
                            </span>
                         </td>
                         <td className="p-4 text-gray-600">{doc.created}</td>
                         <td className="p-4 text-gray-600">{doc.expiry}</td>
                         <td className="p-4 text-gray-600 max-w-[200px] truncate">{doc.remark}</td>
                         <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-[10px] font-medium border ${doc.status === 'Active' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                               {doc.status}
                            </span>
                         </td>
                         <td className="p-4 text-right">
                            <button className="text-[#0074D9] hover:text-blue-700 font-medium flex items-center justify-end gap-2">
                               <i className="fa-solid fa-download"></i> Download
                            </button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
          <div className="p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
             <span>Showing 1 to 10 of 1000 Results</span>
             <div className="flex gap-2"><button className="hover:text-brand">Previous</button><button className="text-brand font-medium">Next</button></div>
          </div>
       </div>

       {/* --- MODAL --- */}
       {showAddModal && <AddDocumentModal onClose={() => setShowAddModal(false)} />}

    </div>
  );
}

// =========================================================================
// 2. MODAL COMPONENTS
// =========================================================================

// --- A. ADD DOCUMENT MODAL ---
function AddDocumentModal({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "unset"; }; }, []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl max-w-3xl shadow-2xl flex flex-col animate-scale-up relative">
          
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
             <h2 className="text-xl font-bold text-gray-800">Certificates & Documents</h2>
             <button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button>
          </div>

          {/* Body */}
          
          <div className="p-6 overflow-y-auto space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div><label className="text-sm font-medium text-gray-700">Document Name</label>
                <input type="text" placeholder="Enter" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand" /></div>
               <div><label className="text-sm font-medium text-gray-700">Document Type</label>
                <select className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand text-gray-500">
                   <option>Select</option>
                   <option>State ID</option>
                   <option>Driver’s License</option>
                   <option>PASSPORT</option>
                   <option>Military ID</option>
                   <option>USCIS ID</option>
                   <option>ODA-Approved Core Training </option>
                   <option>CPR/First Aid Certified (Exp: 04-04-2027)</option>
                   <option>Alzheimer's/Dementia Training - Ohio Curriculum</option>
                   <option>Incident Reporting Training</option>
                   <option>HIPAA/Confidentiality Training</option>
                   <option>Abuse/Neglect Prevention Training</option>
                   <option>Infection Control/Universal Precautions</option>
                   <option>Choke Prevention & Food Safety</option>
                </select></div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div> <label className="text-sm font-medium text-gray-700">Remark</label>
                <input type="text" placeholder="Enter" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand" /></div>
               <div>  <label className="text-sm font-medium text-gray-700">Issued Date</label>
                {/* FIXED: Changed to type="date" and removed manual icon */}
                <input type="date" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand" /></div>
             </div>
              <div className="grid grid-cols-1 md:grid-cols-1gap-4">
               <div> <label className="text-sm font-medium text-gray-700">Expiry Date</label>
                {/* FIXED: Changed to type="date" and removed manual icon */}
                <input type="date" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand" /></div>
              
             </div>
            


             {/* Upload Area */}
             <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Upload File</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                   <i className="fa-solid fa-cloud-arrow-up text-2xl text-gray-400 mb-2"></i>
                   <p className="text-xs text-gray-600 text-center">Drag and drop or click to upload file</p>
                   <p className="text-[10px] text-gray-400 mt-1">Supported file type: pdf, word, png</p>
                </div>
             </div>

             <div className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 text-brand rounded border-gray-300 focus:ring-brand" />
                <label className="text-sm text-gray-700">Is the document Trackable? Check if Yes</label>
             </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-white rounded-b-2xl">
             <button onClick={onClose} className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
                Cancel
             </button>
             <button onClick={onClose} className="bg-[#0074D9] hover:bg-[#0062b8] text-white px-8 py-2.5 rounded-lg text-sm font-medium shadow-lg shadow-blue-900/10 transition-colors">
                Save
             </button>
          </div>

       </div>
    </div>, document.body
  );
}

// =========================================================================
// 1. CONTACTS TAB & MODAL
// =========================================================================
function ContactsTab() {
  const [showModal, setShowModal] = useState(false);
  const contacts = [
    { type: "Emergency Contact", phone: "5412452358", mobile: "(703)981-7142", name: "Tim Drake", relation: "Son", status: "Active" },
    { type: "Emergency Contact", phone: "5412452358", mobile: "(703)981-7142", name: "Tim Drake", relation: "Son", status: "Active" },
  ];

  return (
    <div className="animate-fade-in space-y-6">
       <div className="flex justify-between items-center">
          <div className="relative w-64"><i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i><input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand" /></div>
          <button onClick={() => setShowModal(true)} className="bg-[#0074D9] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-sm">Add Contact</button>
       </div>
       <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm"><thead className="bg-gray-50 text-gray-500 text-xs uppercase"><tr><th className="p-4 w-10"><input type="checkbox" /></th><th className="p-4">Contact Type</th><th className="p-4">Telephone</th><th className="p-4">Mobile</th><th className="p-4">Full Name</th><th className="p-4">Address</th><th className="p-4">Status</th><th className="p-4"></th></tr></thead>
             <tbody className="divide-y divide-gray-50">{contacts.map((c, i) => (<tr key={i} className="hover:bg-gray-50"><td className="p-4"><input type="checkbox" /></td><td className="p-4">{c.type}</td><td className="p-4">{c.phone}</td><td className="p-4">{c.mobile}</td><td className="p-4 font-medium">{c.name}</td><td className="p-4">N/A</td><td className="p-4"><span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs">{c.status}</span></td><td className="p-4 text-right"><button className="text-gray-400 mr-2"><i className="fa-solid fa-pen"></i></button><button className="text-red-400"><i className="fa-regular fa-trash-can"></i></button></td></tr>))}</tbody>
          </table>
       </div>
       {showModal && <CreateContactModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

function CreateContactModal({ onClose }: { onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] animate-slide-up">
          <div className="flex justify-between items-center p-6 border-b border-gray-100"><h2 className="text-xl font-bold">Create Contact Address</h2><button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button></div>
          <div className="p-6 overflow-y-auto space-y-4">
             <div className="grid grid-cols-2 gap-4"><div><label className="text-xs text-gray-500">First Name</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="Enter" /></div><div><label className="text-xs text-gray-500">Last Name</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="Enter" /></div></div>
             <div className="grid grid-cols-2 gap-4"><div><label className="text-xs text-gray-500">Telephone</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="Enter" /></div><div><label className="text-xs text-gray-500">Mobile</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="+1 000000000" /></div></div>
             <div className="grid grid-cols-2 gap-4"><div><label className="text-xs text-gray-500">Email Address</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="Enter" /></div><div><label className="text-xs text-gray-500">Relationship</label><select className="w-full border rounded-lg p-2 text-sm text-gray-500">
               <option>Select</option>
               <option>Parent</option>
               <option>Sibling</option>
               <option>Child</option>
               <option>Relative</option>
               <option>Friend</option>
               </select></div></div>
             <div className="grid grid-cols-2 gap-4"><div><label className="text-xs text-gray-500">Contact Type</label><select className="w-full border rounded-lg p-2 text-sm text-gray-500">
               <option>Select</option>
               <option>Emergency Contact</option>
               <option>Primary Contact</option>
               <option>Secondary Contact</option>  
               </select></div><div><label className="text-xs text-gray-500">Status</label><select className="w-full border rounded-lg p-2 text-sm text-gray-500">
                  <option>Select</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Others</option>
                  </select></div></div>
             <div className="grid grid-cols-2 gap-4"><div><label className="text-xs text-gray-500">Street Address</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="Enter" /></div><div><label className="text-xs text-gray-500">City</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="Enter" /></div></div>
             <div className="grid grid-cols-2 gap-4"><div><label className="text-xs text-gray-500">State*</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="Enter" /></div><div><label className="text-xs text-gray-500">Zip Code*</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="Enter" /></div></div>
          </div>
          <div className="p-6 border-t flex justify-end gap-3"><button onClick={onClose} className="px-6 py-2 border rounded-lg text-sm">Cancel</button><button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm">Save</button></div>
       </div>
    </div>, document.body
  );
}

// =========================================================================
// 3. REFERENCE TAB
// =========================================================================
function ReferenceTab() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRef, setSelectedRef] = useState<any>(null);

  const references = [
    { name: "Maria Hills", contact: "(323)432-2321", status: "Completed", date: "2024-11-15", notes: "Adams Family" },
    { name: "John Kerry", contact: "(323)432-2321", status: "Completed", date: "2024-11-15", notes: "Adams Family" },
    { name: "Tim Vasko", contact: "(323)432-2321", status: "Pending", date: "2024-11-15", notes: "Adams Family" },
    { name: "James", contact: "(323)432-2321", status: "Unresponsive", date: "2024-11-15", notes: "Adams Family" },
  ];

  return (
    <div className="animate-fade-in space-y-6">
       <div className="flex justify-between items-center">
          <div className="relative w-64"><i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i><input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand" /></div>
          <button onClick={() => setShowAddModal(true)} className="bg-[#0074D9] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-sm">Add reference</button>
       </div>
       <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm"><thead className="bg-gray-50 text-gray-500 text-xs uppercase"><tr><th className="p-4">Name</th><th className="p-4">Contact & Type</th><th className="p-4">Status</th><th className="p-4">Date Contacted</th><th className="p-4">Notes summary</th><th className="p-4"></th></tr></thead>
             <tbody className="divide-y divide-gray-50">{references.map((r, i) => (<tr key={i} className="hover:bg-gray-50">
               <td className="p-4">{r.name}</td>
               <td className="p-4">{r.contact}</td>
               <td className="p-4"><span className={`px-2 py-1 rounded text-xs border ${r.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' : r.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-red-50 text-red-700 border-red-200'}`}>{r.status}</span></td>
               <td className="p-4">{r.date}</td><td className="p-4">{r.notes}</td><td className="p-4 text-right"><button onClick={() => { setSelectedRef(r); setShowEditModal(true); }} className="text-gray-400 hover:text-gray-600"><i className="fa-solid fa-pen"></i></button></td></tr>))}</tbody>
          </table>
       </div>
       {showAddModal && <AddReferenceModal onClose={() => setShowAddModal(false)} />}
       {showEditModal && <ReferenceDetailsModal reference={selectedRef} onClose={() => setShowEditModal(false)} />}
    </div>
  );
}

function AddReferenceModal({ onClose }: { onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl flex flex-col animate-scale-up">
          <div className="flex justify-between items-center p-6 border-b border-gray-100"><h2 className="text-xl font-bold">Reference</h2><button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button></div>
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
             <div className="grid grid-cols-2 gap-4"><div><label className="text-xs text-gray-500">Reference Type</label><select className="w-full border rounded-lg p-2 text-sm">
               <option>Select Type</option>
               <option>Professional</option>
               <option>Personal</option>
               </select></div><div><label className="text-xs text-gray-500">Full Name</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="e.g. Jane Doe" /></div></div>
             <div className="grid grid-cols-2 gap-4"><div><label className="text-xs text-gray-500">Relationship to Employee</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="e.g. Former Manager" /></div><div><label className="text-xs text-gray-500">Company/Organization Name</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="Professional" /></div></div>
             <div className="grid grid-cols-2 gap-4"><div><label className="text-xs text-gray-500">Phone Number</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="(785) 123 2321" /></div><div><label className="text-xs text-gray-500">Email Address</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="e.g. email@example.com" /></div></div>
             <h3 className="font-bold text-sm text-gray-800 pt-2">Admin Vetting Details (Internal Use)</h3>
             <div className="grid grid-cols-3 gap-4"><div><label className="text-xs text-gray-500">Years Known</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="e.g. 3" /></div><div><label className="text-xs text-gray-500">Verification Status</label><select className="w-full border rounded-lg p-2 text-sm">
               <option>Pending</option>
               <option>Complete</option>
               <option>Not Verified</option>
               </select></div><div><label className="text-xs text-gray-500">Date Contacted</label><input type="date" className="w-full border rounded-lg p-2 text-sm" placeholder="dd / mm / yyyy" /></div></div>
             <div><label className="text-xs text-gray-500">Reference Notes</label><textarea className="w-full border rounded-lg p-2 text-sm h-24" placeholder="Start typing..."></textarea></div>
             <button className="text-[#0074D9] text-sm font-medium border border-[#0074D9] rounded-lg px-4 py-2 w-full flex items-center justify-center gap-2"><i className="fa-solid fa-plus"></i> Add Another Reference</button>
          </div>
          <div className="p-6 border-t flex justify-end gap-3"><button onClick={onClose} className="px-6 py-2 border rounded-lg text-sm">Back</button><button className="px-6 py-2 bg-[#0074D9] text-white rounded-lg text-sm">Save</button></div>
       </div>
    </div>, document.body
  );
}

function ReferenceDetailsModal({ reference, onClose }: { reference: any, onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col animate-scale-up">
          <div className="flex justify-between items-center p-6 border-b border-gray-100"><h2 className="text-xl font-bold">Reference Details</h2><button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button></div>
          <div className="p-6 space-y-4">
             <div className="grid grid-cols-2 gap-4"><div><label className="text-xs text-gray-500">Reference Type</label><select className="w-full border rounded-lg p-2 text-sm">
               <option>Professional</option>
               <option>Personal</option>
               </select>
               </div><div><label className="text-xs text-gray-500">Full Name</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="e.g. Jane Doe" /></div></div>
             <div className="grid grid-cols-2 gap-4"><div><label className="text-xs text-gray-500">Verification Status</label><select className="w-full border rounded-lg p-2 text-sm">
               <option>Complete</option>
               <option>Not Verified</option>
               <option>Pending</option>
               </select></div><div><label className="text-xs text-gray-500">Date Contacted</label><input type="date" className="w-full border rounded-lg p-2 text-sm" placeholder="dd / mm / yyyy" /></div></div>
             <div><label className="text-xs text-gray-500">Reference Notes</label><textarea className="w-full border rounded-lg p-2 text-sm h-24" placeholder="Start typing..."></textarea></div>
          </div>
          <div className="p-6 border-t flex justify-end gap-3"><button onClick={onClose} className="px-6 py-2 border rounded-lg text-sm">Back</button><button className="px-6 py-2 bg-[#0074D9] text-white rounded-lg text-sm">Update</button></div>
       </div>
    </div>, document.body
  );
}