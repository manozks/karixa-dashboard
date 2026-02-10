"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

// =========================================================================
// MAIN PAGE COMPONENT
// =========================================================================
export default function ClientProfilePage() {
  const [activeTab, setActiveTab] = useState("General Info");

  const tabs = [
    "General Info", "Scheduled", "Caregivers", "Billing", "Note", 
    "ADLs", "Incidents", "Schedule Report", 
    "Service Authentication", "Trackable Document"
  ];

  return (
    <DashboardLayout>
       <div className="flex flex-col min-h-screen h-auto bg-gray-50 space-y-6 pb-20">
        
        {/* --- Breadcrumb --- */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/clients" className="hover:text-gray-800 flex items-center gap-1">
            <i className="fa-solid fa-chevron-left text-xs"></i> Back
          </Link>
          <span className="text-gray-300">|</span>
          <span>Client</span> / <span className="font-semibold text-gray-800">Client Profile</span>
        </div>

        {/* --- Top Section: Profile Card & Map --- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Profile Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
             <div className="flex flex-col md:flex-row gap-6">
              
                <div className="flex-1">
                   <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <img src="https://i.pravatar.cc/150?img=1" alt="Nina" className="w-20 h-20 rounded-full object-cover border-4 border-gray-50" />
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">Nina Mcintire</h2>
                        <p className="text-sm text-gray-500"><i className="fa-solid fa-location-dot mr-1"></i> 1509 Oakview Dr, McLean VA 22101</p>
                      </div>
                      <div className="flex gap-2">
                         <button className="w-8 h-8 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 flex items-center justify-center"><i className="fa-solid fa-download"></i></button>
                         <Link href="/clients/add" className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50">Edit</Link>
                         <button className="px-3 py-1.5 rounded-lg bg-[#0074D9] text-white text-sm font-medium hover:bg-[#0062b8]">Message</button>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-y-2 gap-x-8 mt-6 text-sm">
                      <div><span className="block text-gray-400 text-xs">Client ID</span><span className="font-medium text-gray-800">1322</span></div>
                      <div><span className="block text-gray-400 text-xs">Caregiver</span><span className="font-medium text-gray-800">Unassign</span></div>
                      <div><span className="block text-gray-400 text-xs">Mobile</span><span className="font-medium text-gray-800">(703) 981-7142</span></div>
                      <div><span className="block text-gray-400 text-xs">Emergency No.</span><span className="font-medium text-gray-800">(703) 981-7142</span></div>
                   </div>
                     {/* Signature Box */}
                <div className="relative">
                    <div className="absolute bottom-6 right-0 border border-dashed border-gray-300 rounded-lg p-2 w-24 h-16 flex items-center justify-center bg-gray-50">
                    <span className="text-[10px] text-gray-400 italic">Signature</span>
                </div>
                </div>
               </div>
          
             </div>
                        
              
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative min-h-[200px]">
             <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Map View Placeholder</span>
                <img src="/map-placeholder.png" className="w-full h-full object-cover opacity-50" onError={(e) => e.currentTarget.style.display='none'} /> 
             </div>
             <button className="absolute top-4 right-4 bg-[#0074D9] text-white text-xs px-3 py-1.5 rounded shadow-lg">View Nearest Caregiver</button>
          </div>
        </div>

        {/* --- TAB NAVIGATION --- */}
        <div className="w-full bg-white border-b border-gray-200 rounded-t-xl shadow-sm mt-4">
           <div className="w-full overflow-x-auto">
             <div className="flex gap-2  px-3 min-w-max">
                  {tabs.map((tab) => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 text-sm font-medium transition-all relative whitespace-nowrap px-1 ${
                        activeTab === tab ? "text-[#0074D9]" : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab}
                      {activeTab === tab && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0074D9] rounded-t-full"></span>}
                    </button>
                  ))}
              </div>
           </div>
        </div>

        {/* --- TAB CONTENT AREA --- */}
      <div className="bg-white rounded-b-xl shadow-sm border border-gray-100 border-t-0 p-6 min-h-[400px] client-space-mt">
           {renderTabContent(activeTab)}
        </div>

      </div>
    </DashboardLayout>
  );
}

// --- TAB RENDER HELPER ---
function renderTabContent(tab: string) {
  switch (tab) {
    case "General Info": return <GeneralInfoTab />;
    case "Scheduled": return <ScheduledTab />;
    case "Caregivers": return <CaregiversTab />;
    case "Billing": return <BillingTab />;
    case "Note": return <NoteTab />;
    case "ADLs": return <ADLTab />;
    case "Incidents": return <IncidentsTab />;
   /*  case "Medication": return <MedicationTab />; */
    case "Schedule Report": return <ScheduleReportTab />;
    case "Service Authentication": return <ServiceAuthTab />;
    case "Trackable Document": return <TrackableDocumentTab />;
    default: return <div className="text-gray-400 text-center py-20">Content for {tab} is coming soon...</div>;
  }
}

// =========================================================================
// 1. GENERAL INFO TAB
// =========================================================================
function GeneralInfoTab() {
  return (
    <div className="space-y-8 animate-fade-in">
       {/* Section 1 */}
       <div>
          <h3 className="font-bold text-gray-800 mb-4 text-sm">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             <InfoItem label="Name" value="Nina Mcintire" />
             <InfoItem label="DOB" value="24 Oct, 1953" />
             <InfoItem label="Gender" value="Female" />
             <InfoItem label="SSN" value="***-**-7142" />
             <InfoItem label="Phone/Mobile" value="(703) 981-7142" />
             <InfoItem label="Email Address" value="nina@gmail.com" />
             <InfoItem label="Language Spoken" value="English" />
             <InfoItem label="Street Address" value="1509 Oakview Dr." />
             <InfoItem label="City" value="McLean" />
             <InfoItem label="State" value="Ohio" />
             <InfoItem label="Zip Code" value="22101" />
          </div>
       </div>
       <div className="h-px bg-gray-100 w-full"></div>
       {/* Section 2 */}
       <div>
          <h3 className="font-bold text-gray-800 mb-4 text-sm">Primary Insurance</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             <InfoItem label="Insurance Provider Name" value="Amica Mutual Insurance" />
             <InfoItem label="Phone Number" value="98563-21470" />
             <InfoItem label="Policy Number" value="(703) 981-71-45" />
             <InfoItem label="Email" value="amica.roshan@amica.com" />
          </div>
       </div>
           <div className="h-px bg-gray-100 w-full"></div>
       {/* Section 3 */}
       <div>
          <h3 className="font-bold text-gray-800 mb-4 text-sm">Secondary Insurance</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             <InfoItem label="Insurance Provider Name" value="Amica Mutual Insurance" />
             <InfoItem label="Phone Number" value="98563-21470" />
             <InfoItem label="Policy Number" value="(703) 981-71-45" />
             <InfoItem label="Email" value="amica.roshan@amica.com" />
          </div>
       </div>
              <div className="h-px bg-gray-100 w-full"></div>
       {/* Section 3 */}
       <div>
          <h3 className="font-bold text-gray-800 mb-4 text-sm">Internal Use Only</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             <InfoItem label="Supervisor" value="Son Micle" />
             <InfoItem label="Insurance Provider  Status" value="Active" />
             <InfoItem label="Region Code" value="VA - 7149" />              
          </div>
           <div className="mt-2"></div>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             <InfoItem label="Service Start Date" value="31 Dec, 2024" />
             <InfoItem label="Preferred hours For Service" value="9 AM - 5 PM" />
             <InfoItem label="Medicaid, Number" value="A234567" />
             <InfoItem label="Referred By" value="N/A" />
             
          </div>
       </div>
       <div className="h-px bg-gray-100 w-full"></div>
       <h3 className="font-bold text-gray-800 text-sm">Emergency Contact Number</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             <InfoItem label="Full Name" value="Tim Vasko" />
             <InfoItem label="Relationship" value="Son" />
             <InfoItem label="Phone" value="(703)981 -71-45" />
                    
          </div>
    </div>
  );
}

// =========================================================================
// 2. SCHEDULED TAB
// =========================================================================
// =========================================================================
// 2. SCHEDULED TAB
// =========================================================================
function ScheduledTab() {
  const [showModal, setShowModal] = useState(false); // For Create Schedule
  
  // States for Visit Summary / Approval flow
  const [showVisitSummary, setShowVisitSummary] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<any>(null);

  // Handler when an Event Card is clicked
  const handleEventClick = (date: number) => {
    // Mock data for the modal based on the click
    setSelectedVisit({
      id: date,
      caregiver: "Juan, Chinchu",
      location: "1509 Oakview Dr, McLean VA",
      date: `${date} April, 2025`,
      status: "Completed"
    });
    setShowVisitSummary(true);
  };

  // Switch from Visit Summary to Approval Note
  const handleApproveVisitClick = () => {
    setShowVisitSummary(false);
    setTimeout(() => setShowApprovalModal(true), 200);
  };

  return (
     <div className="animate-fade-in space-y-6 relative">
      
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Schedule</h3>
          <p className="text-sm text-gray-500 mt-1">
            23 April, 2025 | Sunday <span className="text-[#0074D9] font-medium">• Today</span>
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Date Picker (UI only for overview) */}
          <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
            <i className="fa-regular fa-calendar text-gray-400 mr-2"></i>
            <span className="text-sm font-medium text-gray-700">23 Apr - 29 Apr, 2025</span>
            <div className="flex ml-3 gap-1 border-l border-gray-200 pl-3">
               <button className="text-gray-400 hover:text-gray-600"><i className="fa-solid fa-chevron-left text-xs"></i></button>
               <button className="text-gray-400 hover:text-gray-600"><i className="fa-solid fa-chevron-right text-xs"></i></button>
            </div>
          </div>

          {/* View Select */}
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-brand">
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Daily</option>
            </select>
            <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none"></i>
          </div>

          {/* Add Button - Triggers Create Schedule Modal */}
          <button 
            onClick={() => setShowModal(true)}
            className="bg-[#0074D9] hover:bg-[#0062b8] text-white px-5 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors"
          >
            Add Schedule
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
        
        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50/50">
          {["Sun", "Mon", "Tue", "Wed", "Thru", "Fri", "Sat"].map((day) => (
            <div key={day} className="py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Body (Mocking April/May transition) */}
        <div className="grid grid-cols-7 divide-x divide-gray-100 divide-y">
          
          {/* Previous Month / Empty Slots */}
          {[30, 1, 2, 3, 4, 5].map((date, i) => (
             <CalendarCell key={`prev-${i}`} date={date} isCurrentMonth={i > 0} />
          ))}

          {/* Active Cells with Events */}
          <CalendarCell date={6} isCurrentMonth={true} />
          <CalendarCell date={7} isCurrentMonth={true} />
          <CalendarCell date={8} isCurrentMonth={true} />
          <CalendarCell date={9} isCurrentMonth={true} />
          <CalendarCell date={10} isCurrentMonth={true} />
          <CalendarCell date={11} isCurrentMonth={true} />
          <CalendarCell date={12} isCurrentMonth={true} />
          
          <CalendarCell date={13} isCurrentMonth={true} />
          <CalendarCell date={14} isCurrentMonth={true} />
          <CalendarCell date={15} isCurrentMonth={true} />
          <CalendarCell date={16} isCurrentMonth={true} />
          <CalendarCell date={17} isCurrentMonth={true} />
          <CalendarCell date={18} isCurrentMonth={true} />
          <CalendarCell date={19} isCurrentMonth={true} />

          <CalendarCell date={20} isCurrentMonth={true} />
          <CalendarCell date={21} isCurrentMonth={true} />
          
          {/* Yellow Event */}
          <CalendarCell date={22} isCurrentMonth={true}>
            <EventCard 
                color="yellow" 
                time="7 AM - 3 PM | 8 Hours" 
                staff="Juan, Chinchu" 
                onClick={() => handleEventClick(22)} 
            />
          </CalendarCell>
          
          {/* Green Events */}
          <CalendarCell date={23} isCurrentMonth={true}>
            <EventCard 
                color="green" 
                time="7 AM - 3 PM | 8 Hours" 
                staff="Juan, Chinchu" 
                onClick={() => handleEventClick(23)}
            />
          </CalendarCell>
          <CalendarCell date={24} isCurrentMonth={true}>
             <EventCard 
                color="green" 
                time="7 AM - 3 PM | 8 Hours" 
                staff="Juan, Chinchu" 
                onClick={() => handleEventClick(24)}
             />
          </CalendarCell>
          <CalendarCell date={25} isCurrentMonth={true}>
             <EventCard 
                color="green" 
                time="7 AM - 3 PM | 8 Hours" 
                staff="Juan, Chinchu" 
                onClick={() => handleEventClick(25)}
             />
          </CalendarCell>
          <CalendarCell date={26} isCurrentMonth={true}>
             <EventCard 
                color="green" 
                time="7 AM - 3 PM | 8 Hours" 
                staff="Juan, Chinchu" 
                onClick={() => handleEventClick(26)}
             />
          </CalendarCell>

          {/* Mixed Events */}
          <CalendarCell date={27} isCurrentMonth={true}>
             <EventCard 
                color="green" 
                time="7 AM - 3 PM | 8 Hours" 
                staff="Juan, Chinchu" 
                onClick={() => handleEventClick(27)}
             />
          </CalendarCell>
          <CalendarCell date={28} isCurrentMonth={true}>
             <EventCard 
                color="blue" 
                time="7 AM - 3 PM | 8 Hours" 
                staff="Juan, Chinchu" 
                onClick={() => handleEventClick(28)}
             />
          </CalendarCell>

          <CalendarCell date={29} isCurrentMonth={true} />
          <CalendarCell date={30} isCurrentMonth={true} />
          <CalendarCell date={1} isCurrentMonth={false} />
          <CalendarCell date={2} isCurrentMonth={false} />
          <CalendarCell date={3} isCurrentMonth={false} />

        </div>
      </div>

      {/* --- MODALS --- */}
      {showModal && <CreateScheduleModal onClose={() => setShowModal(false)} />}
      
      {/* Visit Summary Modal (Triggered by clicking an EventCard) */}
      {showVisitSummary && selectedVisit && (
         <VisitSummaryModal 
            report={selectedVisit} 
            onApprove={handleApproveVisitClick} 
            onClose={() => setShowVisitSummary(false)} 
         />
      )}

      {/* Approval Note Modal (Triggered from Visit Summary) */}
      {showApprovalModal && (
         <ApprovalNoteModal onClose={() => setShowApprovalModal(false)} />
      )}
      
    </div>
  );
}



// =========================================================================
// 3. CAREGIVERS TAB
// =========================================================================
function CaregiversTab() {
  return (
    <div className="animate-fade-in">
      <h3 className="font-bold text-gray-800 mb-4">Caregivers List</h3>
      <table className="w-full text-left text-sm">
         <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr><th className="p-3">SN</th><th className="p-3">Caregiver Name</th><th className="p-3">Caregiver ID</th><th className="p-3">Contact</th><th className="p-3">Assignment Dates</th><th className="p-3">Status</th><th className="p-3"></th></tr>
         </thead>
         <tbody className="divide-y divide-gray-50">
            <tr><td className="p-3">01</td><td className="p-3">Linda Thompson</td><td className="p-3">Cl-10523</td><td className="p-3">(415) 555-0145</td><td className="p-3">Feb 20 - Feb 25, 2025</td><td className="p-3 text-blue-600">Active</td><td><button className="w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors"><i className="fa-regular fa-trash-can text-xs"></i></button></td></tr>
            <tr><td className="p-3">02</td><td className="p-3">Daniel Green</td><td className="p-3">Cl-20475</td><td className="p-3">(415) 555-0123</td><td className="p-3">Feb 18 - Feb 22, 2025</td><td className="p-3 text-green-600">Completed</td><td><button className="w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors"><i className="fa-regular fa-trash-can text-xs"></i></button></td></tr>
            <tr><td className="p-3">03</td><td className="p-3">Sarah Johnson</td><td className="p-3">Cl-30125</td><td className="p-3">(415) 555-0167</td><td className="p-3">Feb 15 - Feb 20, 2025</td><td className="p-3 text-yellow-600">Pending</td><td><button className="w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors"><i className="fa-regular fa-trash-can text-xs"></i></button></td></tr>
            <tr><td className="p-3">04</td><td className="p-3">Michael Brown</td><td className="p-3">Cl-40236</td><td className="p-3">(415) 555-0189</td><td className="p-3">Feb 10 - Feb 15, 2025</td><td className="p-3 text-green-600">Completed</td><td><button className="w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors"><i className="fa-regular fa-trash-can text-xs"></i></button></td></tr>
            <tr><td className="p-3">05</td><td className="p-3">Emily Davis</td><td className="p-3">Cl-50347</td><td className="p-3">(415) 555-0198</td><td className="p-3">Feb 05 - Feb 10, 2025</td><td className="p-3 text-green-600">Completed</td><td><button className="w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors"><i className="fa-regular fa-trash-can text-xs"></i></button></td></tr>
         </tbody>
      </table>
    </div>
  );
}


// =========================================================================
// 4. NOTE TAB
// =========================================================================
function NoteTab() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<any>(null);

  const notes = [
    {
      id: 1,
      title: "Suffering with Headache",
      date: "23 Feb, 2025",
      author: "Rajesh Maharjan",
      role: "Caregiver",
      desc: "Here is a dummy note that will come here that will be added by different users or staffs or nurses taking care of the client. It will be detailed note so this note will be also used as references for future.",
      img: 3
    },
    {
      id: 2,
      title: "Managing Chronic Pain",
      date: "24 Feb, 2025",
      author: "Anjali Prasad",
      role: "Caregiver",
      desc: "Notes regarding the Client's experiences with chronic pain management strategies and their effectiveness over the past week.",
      img: 12
    },
    {
      id: 3,
      title: "Post-Surgery Recovery",
      date: "25 Feb, 2025",
      author: "Michael Johnson",
      role: "Caregiver",
      desc: "Detailed observations on recovery progress, pain levels, and mobility after surgery as documented by the recovery team.",
      img: 8
    },
    {
      id: 4,
      title: "Nutritional Assessment",
      date: "26 Feb, 2025",
      author: "Sarah Lee",
      role: "Caregiver",
      desc: "A comprehensive note evaluating the nutritional needs and dietary intake of the client to optimize healing and recovery.",
      img: 5
    },
    {
      id: 5,
      title: "Mental Health Check-In",
      date: "27 Feb, 2025",
      author: "Emily Chen",
      role: "Caregiver",
      desc: "Psychological assessment notes regarding the Client's mental well-being and coping strategies implemented during the visit.",
      img: 9
    },
    {
        id: 6,
        title: "Medication Review",
        date: "28 Feb, 2025",
        author: "David Smith",
        role: "Caregiver",
        desc: "Review and documentation of prescribed medications, dosages, and client adherence to ensure optimal therapeutic outcomes.",
        img: 7
    },
    {
        id: 7,
        title: "Physical Therapy Progress",
        date: "1 Mar, 2025",
        author: "Laura Davis",
        role: "Caregiver",
        desc: "Insights into the Client's physical therapy sessions, progress, and areas needing additional focus for recovery.",
        img: 2
    },
    {
        id: 8,
        title: "Follow-Up Appointment Summary",
        date: "2 Mar, 2025",
        author: "James Wilson",
        role: "Caregiver",
        desc: "Summary notes from the follow-up appointment detailing the Client's status, concerns addressed, and next steps.",
        img: 11
    },
    {
        id: 9,
        title: "Discharge Planning",
        date: "3 Mar, 2025",
        author: "Nisha Patel",
        role: "Caregiver",
        desc: "Notes outlining the discharge process, including recommendations for at-home care, follow-up appointments, and client education.",
        img: 15
    }
  ];

  return (
    <div className="animate-fade-in space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-64">
             <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
             <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-gray-100 border-none rounded-lg pl-9 pr-4 py-2 text-sm focus:ring-1 focus:ring-brand" 
             />
          </div>
          <button 
            onClick={() => setShowCreateModal(true)} 
            className="bg-[#0074D9] hover:bg-[#0062b8] text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
          >
             Create A Note
          </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {notes.map((note) => (
            <div key={note.id} onClick={() => setSelectedNote(note)} className="cursor-pointer h-full">
                <NoteCard 
                    title={note.title} 
                    date={note.date} 
                    author={note.author} 
                    role={note.role}
                    desc={note.desc} 
                    img={note.img}
                />
            </div>
          ))}
       </div>

       {showCreateModal && <CreateNoteModal onClose={() => setShowCreateModal(false)} />}
       {selectedNote && <ViewNoteModal note={selectedNote} onClose={() => setSelectedNote(null)} />}
    </div>
  );
}



// =========================================================================
// 5. ADL TAB
// =========================================================================
function ADLTab() {
  const [subTab, setSubTab] = useState("Care Plans");
  const [showCarePlanModal, setShowCarePlanModal] = useState(false);
  const [carePlanMode, setCarePlanMode] = useState<'create' | 'edit'>('create'); // State to track mode
  const [showReportModal, setShowReportModal] = useState(false);

  const handleOpenCreate = () => {
    setCarePlanMode('create');
    setShowCarePlanModal(true);
  };

  const handleOpenEdit = () => {
    setCarePlanMode('edit');
    setShowCarePlanModal(true);
  };

  return (
    <div className="animate-fade-in space-y-6">
       
       {/* Sub Tab Navigation */}
       <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
             <h3 className="text-lg font-bold text-gray-800 mb-2">Activity Daily</h3>
             <div className="flex bg-gray-100 p-1 rounded-lg">
                <button 
                   onClick={() => setSubTab("Care Plans")}
                   className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${subTab === "Care Plans" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >
                   Care Plans
                </button>
                <button 
                   onClick={() => setSubTab("Reports")}
                   className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${subTab === "Reports" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >
                   Reports
                </button>
             </div>
          </div>

          {/* Action Button Changes based on Sub Tab */}
          {subTab === "Care Plans" ? (
             <button onClick={handleOpenCreate} className="bg-[#0074D9] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0062b8] transition-colors">
                Add Care Plan
             </button>
          ) : (
             <button onClick={() => setShowReportModal(true)} className="bg-[#0074D9] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0062b8] transition-colors">
                Add Record
             </button>
          )}
       </div>

       {/* Sub Tab Content */}
       {subTab === "Care Plans" ? (
          /* Care Plans View */
          <div className="space-y-6 animate-fade-in">
             <ADLSection 
                title="Toilet/Elimination" 
                onEdit={handleOpenEdit} 
                items={[
                   { name: "Assist with Commode", desc: "To support individuals who are unable to walk to the toilet due to illness..." },
                   { name: "Assist with Bed Pans", desc: "To help individuals who are bedridden or have limited mobility..." }
                ]} 
             />
             <ADLSection 
                title="Personal Care" 
                onEdit={handleOpenEdit} 
                items={[
                   { name: "Assist with Bathing", desc: "To maintain cleanliness, promote comfort, prevent infections..." },
                   { name: "Assist with Dressing", desc: "To support individuals who cannot dress themselves due to age..." }
                ]} 
             />
             <ADLSection 
                title="Ambulating" 
                onEdit={handleOpenEdit} 
                items={[
                   { name: "Assist with Wheelchair", desc: "To safely support individuals who rely on a wheelchair..." },
                   { name: "Assist with Walking", desc: "To support individuals with limited mobility in walking safely..." }
                ]} 
             />
             <ADLSection 
                title="Nutrition" 
                onEdit={handleOpenEdit} 
                items={[
                   { name: "Meal Prepare", desc: "To safely support individuals who rely on a wheelchair..." },
                   { name: "Prepare Breakfast", desc: "To support individuals with limited mobility in walking..." }
                ]} 
             />
             <div className="flex justify-end pt-4">
               <button className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium">Submit</button>
             </div>
          </div>
       ) : (
          /* Reports View */
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm animate-fade-in">
             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                   <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                      <tr>
                         <th className="p-4">SN</th>
                         <th className="p-4">ADHC Name</th>
                         <th className="p-4">Start Care Date</th>
                         <th className="p-4">Transferring</th>
                         <th className="p-4">Medication</th>
                         <th className="p-4">Health Monitoring</th>
                         <th className="p-4">Post Date</th>
                         <th className="p-4 text-right">Action</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-50">
                      {[1,2,3,4,5].map((i) => (
                         <tr key={i} className="hover:bg-gray-50">
                            <td className="p-4 text-gray-500 text-xs">0{i}</td>
                            <td className="p-4 text-gray-800">Health Monitoring</td>
                            <td className="p-4 text-gray-600 text-xs">Feb 01, 2023</td>
                            <td className="p-4 text-gray-600 text-xs">Assistance daily as needed</td>
                            <td className="p-4 text-gray-600 text-xs">See Med-List</td>
                            <td className="p-4 text-gray-600 text-xs">Weekly Monitoring BP</td>
                            <td className="p-4 text-gray-600 text-xs">Feb 01, 2023</td>
                            <td className="p-4 text-right">
                               <div className="flex justify-end gap-2">
                                  <button className="text-gray-400 hover:text-blue-500"><i className="fa-solid fa-pen text-xs"></i></button>
                                  <button className="text-gray-400 hover:text-blue-500"><i className="fa-solid fa-download text-xs"></i></button>
                                  <button className="text-gray-400 hover:text-red-500"><i className="fa-regular fa-trash-can text-xs"></i></button>
                               </div>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
             <div className="p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                <span>Showing 1 to 10 of 1000 Results</span>
                <div className="flex gap-2"><button>Previous</button><button className="text-blue-600">Next</button></div>
             </div>
          </div>
       )}

       {/* Modals */}
       {showCarePlanModal && <CarePlanModal mode={carePlanMode} onClose={() => setShowCarePlanModal(false)} />}
       {showReportModal && <ReportModal onClose={() => setShowReportModal(false)} />}

    </div>
  );
}

// =========================================================================
// CARE PLAN MODAL (Matches image_cb0ddd.png & image_cb0a74.png)
// =========================================================================
function CarePlanModal({ mode, onClose }: { mode: 'create' | 'edit', onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "unset"; }; }, []);
  if (!mounted) return null;

  const isCreate = mode === 'create';

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] animate-slide-up relative">
          
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
             <h2 className="text-xl font-bold text-gray-800">{isCreate ? "Create a New Care Plan" : "Care Plan"}</h2>
             <button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button>
          </div>

          <div className="p-6 overflow-y-auto custom-scrollbar">
             <div className="space-y-5">
                
                {/* Extra fields for Create Mode (Service Provider, Goal) */}
                {isCreate && (
                   <>
                      <div className="space-y-1.5">
                         <label className="text-sm font-medium text-gray-700">Service Provider</label>
                         <select className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand text-gray-500">
                            <option>Select</option>
                              <option>Assist with Commode</option>  
                              <option>Assist with Bed Pans</option>
                              <option>Assist with Bathing</option>
                              <option>Assist with Dressing</option>
                         </select>
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-sm font-medium text-gray-700">Primary Goal</label>
                         <select className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand text-gray-500">
                            <option>Select</option>
                            <option>Toileting</option>
                            <option>Personal Care</option>
                            <option>Ambulation</option>
                         </select>
                      </div>
                   </>
                )}

                {/* Service Provided */}
                <div className="space-y-1.5">
                   <label className="text-sm font-medium text-gray-700">Service Provided</label>
                   <select className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand text-gray-800">
                      <option>{isCreate ? "Select" : "Assist with Commode"}</option>
                   </select>
                </div>

                {isCreate && <h4 className="text-xs font-bold text-gray-800 pt-2">Time by which goal Should be achieved</h4>}

                {/* Start Date */}
                <div className="space-y-1.5">
                   <label className="text-sm font-medium text-gray-700">Start Date</label>
                   {/* FIXED: Changed to type="date" and removed manual icon */}
                   <input 
                      type="date" 
                      className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand" 
                      defaultValue={isCreate ? "" : "2024-02-02"} 
                   />
                </div>

                {/* Ongoing Checkbox */}
                <div className="flex items-center gap-2">
                   <input type="checkbox" id="ongoing" className="w-4 h-4 text-brand rounded border-gray-300 focus:ring-brand" defaultChecked={!isCreate} />
                   <label htmlFor="ongoing" className="text-sm text-gray-700 font-medium">Continue & ongoing</label>
                </div>

                {/* End Date */}
                <div className="space-y-1.5">
                   <label className="text-sm font-medium text-gray-700">End Date</label>
                   <input 
                      type="date" 
                      className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand" 
                      defaultValue={isCreate ? "" : "2024-12-04"} 
                   />
                </div>

                {/* Repeats On (Moved below End Date for Edit mode per image, or kept consistent) */}
                <div className="space-y-1.5">
                   <label className="text-sm font-medium text-gray-700">Repeats on</label>
                   <div className="flex gap-2 flex-wrap">
                      {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => {
                         // Mock selection logic: Select Mon-Fri by default or based on edit
                         const isSelected = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(day);
                         return (
                            <button 
                               key={day} 
                               className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                                  isSelected 
                                     ? 'bg-green-50 text-green-700 border-green-200' 
                                     : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                               }`}
                            >
                               {day}
                            </button>
                         )
                      })}
                   </div>
                </div>

                {/* Add More Button (Only visible in Create Mode usually, or if list is editable) */}
                {isCreate && (
                   <button className="bg-blue-50 text-[#0074D9] px-4 py-2 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors">
                      Add More
                   </button>
                )}

             </div>
          </div>

          <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-2xl">
             <button onClick={onClose} className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 text-sm font-medium hover:bg-white">Cancel</button>
             <button onClick={onClose} className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium shadow-lg shadow-blue-900/10 hover:bg-[#0062b8]">Save</button>
          </div>
       </div>
    </div>, document.body
  );
}
function ReportModal({ onClose }: { onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col animate-scale-up relative">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
             <h2 className="text-xl font-bold text-gray-800">Reports</h2>
             <button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button>
          </div>
          <div className="p-6 space-y-5">
             <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">ADHC Name</label>
                <input type="text" placeholder="Enter" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brand" />
             </div>
             <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Start Date</label>
                {/* FIXED: Changed to type="date" */}
                <input type="date" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brand" />
             </div>
             <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Transferring</label>
                <input type="text" placeholder="Enter" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brand" />
             </div>
             <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Medication</label>
                <input type="text" placeholder="Enter" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brand" />
             </div>
             <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Health Monitoring</label>
                <input type="text" placeholder="Enter" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brand" />
             </div>
          </div>
          <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-2xl">
             <button onClick={onClose} className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium shadow-lg shadow-blue-900/10">Save</button>
          </div>
       </div>
    </div>, document.body
  );
}



// =========================================================================
// 1. MEDICATION TAB 
// =========================================================================
function MedicationTab() {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState<any>(null);

  
  const medicationList = [
    { id: 1, name: "Metformin", type: "Tablet", dose: "500 mg", freq: "Twice a day", startDate: "15 May, 2023" },
    { id: 2, name: "Lisinopril", type: "Capsule", dose: "250 mg", freq: "Twice a day", startDate: "22 June, 2024" },
    { id: 3, name: "Amoxicillin", type: "Tablet", dose: "10 mg", freq: "Once a day", startDate: "30 July, 2026" },
    { id: 4, name: "Atorvastatin", type: "Tablet", dose: "250 mg", freq: "3x Daily (7 days)", startDate: "09 August, 2027" },
  ];

  const handleNameClick = (med: any) => {
    setSelectedMedication(med);
    setShowDetailModal(true);
  };

  return (
    <div className="animate-fade-in space-y-6">
       
       {/* --- Medication List Header & Button --- */}
       <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Medication List</h3>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-[#0074D9] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#0062b8] transition-colors shadow-sm"
          >
            Add Medication
          </button>
       </div>

       {/* --- Table --- */}
       <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                   <tr>
                      <th className="p-4 w-16">SN</th>
                      <th className="p-4">Medication Name</th>
                      <th className="p-4">Type</th>
                      <th className="p-4">Dose</th>
                      <th className="p-4">Frequency</th>
                      <th className="p-4">Start Date</th>
                      <th className="p-4 text-right"></th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {medicationList.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                         <td className="p-4 text-gray-500">0{index + 1}</td>
                         
                         {/* CLICKABLE MEDICATION NAME */}
                         <td className="p-4">
                            <button 
                               onClick={() => handleNameClick(item)}
                               className="text-gray-800 font-medium hover:text-[#0074D9] transition-colors focus:outline-none"
                            >
                               {item.name}
                            </button>
                         </td>

                         <td className="p-4 text-gray-600">{item.type}</td>
                         <td className="p-4 text-gray-600">{item.dose}</td>
                         <td className="p-4 text-gray-600">{item.freq}</td>
                         <td className="p-4 text-gray-600">{item.startDate}</td>
                         
                         {/* Actions */}
                         <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                               <button 
                                  onClick={() => handleNameClick(item)}
                                  className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 flex items-center justify-center transition-colors"
                               >
                                  <i className="fa-regular fa-eye text-xs"></i>
                               </button>
                               <button className="w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors">
                                  <i className="fa-regular fa-trash-can text-xs"></i>
                               </button>
                            </div>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
             <span>Showing 1 to 10 of 1000 Results</span>
             <div className="flex gap-2 text-gray-600 font-medium">
                <button className="flex items-center gap-1 hover:text-brand"><i className="fa-solid fa-chevron-left text-[10px]"></i> Previous</button>
                <button className="flex items-center gap-1 text-brand hover:text-blue-700 ml-2">Next <i className="fa-solid fa-chevron-right text-[10px]"></i></button>
             </div>
          </div>
       </div>

       {/* --- MODALS --- */}
       {showDetailModal && selectedMedication && (
         <MedicationDetailModal 
            medication={selectedMedication} 
            onClose={() => setShowDetailModal(false)} 
         />
       )}

       {showAddModal && (
         <AddMedicationModal onClose={() => setShowAddModal(false)} />
       )}

    </div>
  );
}

// =========================================================================
// 2. MODAL COMPONENTS (Using Portals)
// =========================================================================

// --- A. MEDICATION DETAILS MODAL
function MedicationDetailModal({ medication, onClose }: { medication: any, onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "unset"; }; }, []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col animate-scale-up relative">
          
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
             <h2 className="text-xl font-bold text-gray-800">Medication</h2>
             <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <i className="fa-solid fa-xmark text-xl"></i>
             </button>
          </div>

          {/* Body */}
          <div className="p-6">
             {/* client Info Card */}
             <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                <div className="flex items-center gap-2 mb-2">
                   <h3 className="font-bold text-gray-800 text-lg">Nina Mcintire</h3>
                   <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded font-bold uppercase">Client</span>
                </div>
                <div className="text-xs text-gray-500 space-y-1">
                   <p>client Name : <span className="text-gray-700 font-medium">Medical History Form</span></p>
                   <p>Phone : <span className="text-gray-700 font-medium">(703) 981-7142</span></p>
                   <p>client ID : <span className="text-gray-700 font-medium">PI-100001</span></p>
                </div>
             </div>

             {/* Medication Details Grid */}
             <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                   <label className="text-xs text-gray-400 uppercase font-medium block mb-1">Medication Name</label>
                   <p className="font-bold text-gray-800 text-sm">{medication.name}</p>
                </div>
                <div>
                   <label className="text-xs text-gray-400 uppercase font-medium block mb-1">Type</label>
                   <p className="font-bold text-gray-800 text-sm">{medication.type}</p>
                </div>
                <div>
                   <label className="text-xs text-gray-400 uppercase font-medium block mb-1">Dosage</label>
                   <p className="font-bold text-gray-800 text-sm">{medication.dose}</p>
                </div>
                <div>
                   <label className="text-xs text-gray-400 uppercase font-medium block mb-1">Frequency</label>
                   <p className="font-bold text-gray-800 text-sm">{medication.freq}</p>
                </div>
                <div>
                   <label className="text-xs text-gray-400 uppercase font-medium block mb-1">Start Date</label>
                   <p className="font-bold text-gray-800 text-sm">{medication.startDate}</p>
                </div>
             </div>
          </div>
       </div>
    </div>, document.body
  );
}

// --- B. ADD MEDICATION (REPORTS)
function AddMedicationModal({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "unset"; }; }, []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col animate-scale-up relative">
          
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
             <h2 className="text-xl font-bold text-gray-800">Reports</h2>
             <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <i className="fa-solid fa-xmark text-xl"></i>
             </button>
          </div>

          {/* Form Body */}
          <div className="p-6 space-y-5">
             <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Medication Name</label>
                <input type="text" placeholder="Enter" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand" />
             </div>
             
             <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Medication Type</label>
                <select className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand text-gray-500">
                   <option>Select</option>
                   <option>Tablet</option>
                   <option>Capsule</option>
                   <option>Liquid</option>
                </select>
             </div>

             <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Dose</label>
                <input type="text" placeholder="Enter" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand" />
             </div>

             <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Frequency</label>
                <input type="text" placeholder="Enter" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand" />
             </div>

             <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Start Date</label>
                {/* FIXED: Changed to type="date" and removed manual icon */}
                <input type="date" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand" />
             </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-2xl">
             <button onClick={onClose} className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 text-sm font-medium hover:bg-white transition-colors">
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
// 4. BILLING TAB
// =========================================================================
function BillingTab() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  // Mock Data
  const billingRecords = [
    { id: "INV-2024-001", date: "01 April, 2025", payer: "Amica Mutual Insurance", service: "Personal Care", amount: "$450.00", status: "Paid" },
    { id: "INV-2024-002", date: "15 April, 2025", payer: "Private Pay", service: "Transportation", amount: "$120.00", status: "Pending" },
    { id: "INV-2024-003", date: "22 April, 2025", payer: "Medicaid", service: "Respite Care", amount: "$300.00", status: "Overdue" },
    { id: "INV-2024-004", date: "29 April, 2025", payer: "Amica Mutual Insurance", service: "Personal Care", amount: "$450.00", status: "Paid" },
  ];

  const handleViewClick = (invoice: any) => {
    setSelectedInvoice(invoice);
    setShowDetailModal(true);
  };

  return (
    <div className="animate-fade-in space-y-6">
       
       {/* --- Top Stats Section --- */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center justify-between">
             <div>
                <p className="text-xs text-blue-500 font-medium uppercase mb-1">Total Billed</p>
                <h3 className="text-2xl font-bold text-blue-700">$1,320.00</h3>
             </div>
             <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-500 shadow-sm">
                <i className="fa-solid fa-file-invoice-dollar"></i>
             </div>
          </div>
          <div className="bg-green-50 border border-green-100 p-4 rounded-xl flex items-center justify-between">
             <div>
                <p className="text-xs text-green-500 font-medium uppercase mb-1">Received</p>
                <h3 className="text-2xl font-bold text-green-700">$900.00</h3>
             </div>
             <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-500 shadow-sm">
                <i className="fa-solid fa-check"></i>
             </div>
          </div>
          <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex items-center justify-between">
             <div>
                <p className="text-xs text-orange-500 font-medium uppercase mb-1">Pending / Due</p>
                <h3 className="text-2xl font-bold text-orange-700">$420.00</h3>
             </div>
             <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-orange-500 shadow-sm">
                <i className="fa-regular fa-clock"></i>
             </div>
          </div>
       </div>

       {/* --- Header & Actions --- */}
       <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
          <h3 className="text-lg font-bold text-gray-800">Billing History</h3>
          <div className="flex gap-3 w-full md:w-auto">
             <div className="relative flex-1 md:w-64">
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                <input type="text" placeholder="Search Invoice..." className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-brand" />
             </div>
             <button 
                onClick={() => setShowAddModal(true)}
                className="bg-[#0074D9] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#0062b8] transition-colors shadow-sm whitespace-nowrap"
             >
                Generate Invoice
             </button>
          </div>
       </div>

       {/* --- Table --- */}
       <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                   <tr>
                      <th className="p-4">Invoice ID</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Payer</th>
                      <th className="p-4">Service</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Action</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {billingRecords.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                         <td className="p-4 font-medium text-gray-800">{item.id}</td>
                         <td className="p-4 text-gray-600">{item.date}</td>
                         <td className="p-4 text-gray-600">{item.payer}</td>
                         <td className="p-4 text-gray-600">{item.service}</td>
                         <td className="p-4 font-bold text-gray-800">{item.amount}</td>
                         <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium border ${
                               item.status === 'Paid' ? 'bg-green-50 text-green-600 border-green-100' : 
                               item.status === 'Pending' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                               'bg-red-50 text-red-600 border-red-100'
                            }`}>
                               {item.status}
                            </span>
                         </td>
                         <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                               <button onClick={() => handleViewClick(item)} className="text-blue-500 bg-blue-50 w-8 h-8 rounded-full hover:bg-blue-100 flex items-center justify-center transition-colors"><i className="fa-regular fa-eye text-xs"></i></button>
                               <button className="text-gray-500 bg-gray-50 w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors"><i className="fa-solid fa-download text-xs"></i></button>
                            </div>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
          <div className="p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
             <span>Showing 1 to 4 of 4 Results</span>
             <div className="flex gap-2"><button className="hover:text-brand">Previous</button><button className="text-brand font-medium">Next</button></div>
          </div>
       </div>

       {/* --- MODALS --- */}
       {showAddModal && <AddBillingModal onClose={() => setShowAddModal(false)} />}
       {showDetailModal && selectedInvoice && <BillingDetailModal invoice={selectedInvoice} onClose={() => setShowDetailModal(false)} />}

    </div>
  );
}

// --- ADD BILLING MODAL ---
function AddBillingModal({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "unset"; }; }, []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col animate-scale-up relative">
          
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
             <h2 className="text-xl font-bold text-gray-800">Generate Invoice</h2>
             <button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button>
          </div>

          <div className="p-6 space-y-5">
             {/* Payer Selection */}
             <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Payer</label>
                <select className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand text-gray-500">
                   <option>Select Payer</option>
                   <option>Amica Mutual Insurance</option>
                   <option>Medicaid</option>
                   <option>Private Pay</option>
                </select>
             </div>

             {/* Service Selection */}
             <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Service Type</label>
                <select className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand text-gray-500">
                   <option>Select Service</option>
                   <option>Personal Care</option>
                   <option>Transportation</option>
                   <option>Respite Care</option>
                </select>
             </div>

             {/* Date Picker */}
             <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Invoice Date</label>
                <input type="date" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand" />
             </div>

             {/* Amount */}
             <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Amount ($)</label>
                <input type="number" placeholder="0.00" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand" />
             </div>

             {/* Notes */}
             <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Notes</label>
                <textarea placeholder="Enter invoice notes..." className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm h-20 resize-none focus:outline-none focus:border-brand"></textarea>
             </div>
          </div>

          <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-2xl">
             <button onClick={onClose} className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 text-sm font-medium hover:bg-white transition-colors">Cancel</button>
             <button onClick={onClose} className="bg-[#0074D9] hover:bg-[#0062b8] text-white px-8 py-2.5 rounded-lg text-sm font-medium shadow-lg shadow-blue-900/10 transition-colors">Create Invoice</button>
          </div>
       </div>
    </div>, document.body
  );
}

// --- BILLING DETAIL MODAL ---
function BillingDetailModal({ invoice, onClose }: { invoice: any, onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "unset"; }; }, []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col animate-scale-up relative">
          
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
             <h2 className="text-xl font-bold text-gray-800">Invoice Details</h2>
             <button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button>
          </div>

          <div className="p-8 space-y-6 bg-gray-50/30">
             
             {/* Header */}
             <div className="flex justify-between items-start">
                <div>
                   <p className="text-xs text-gray-500 uppercase">Invoice ID</p>
                   <h3 className="text-lg font-bold text-[#0074D9]">{invoice.id}</h3>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
                   invoice.status === 'Paid' ? 'bg-green-100 text-green-700 border-green-200' : 
                   invoice.status === 'Pending' ? 'bg-blue-100 text-blue-700 border-blue-200' : 
                   'bg-red-100 text-red-700 border-red-200'
                }`}>
                   {invoice.status}
                </div>
             </div>

             {/* Details Grid */}
             <div className="bg-white p-4 rounded-xl border border-gray-200 grid grid-cols-2 gap-y-4 text-sm">
                <div>
                   <p className="text-xs text-gray-400">Payer</p>
                   <p className="font-medium text-gray-800">{invoice.payer}</p>
                </div>
                <div>
                   <p className="text-xs text-gray-400">Invoice Date</p>
                   <p className="font-medium text-gray-800">{invoice.date}</p>
                </div>
                <div>
                   <p className="text-xs text-gray-400">Service Provided</p>
                   <p className="font-medium text-gray-800">{invoice.service}</p>
                </div>
                <div>
                   <p className="text-xs text-gray-400">Amount</p>
                   <p className="font-bold text-gray-800 text-base">{invoice.amount}</p>
                </div>
             </div>

             {/* Summary */}
             <div className="border-t border-dashed border-gray-300 pt-4">
                <div className="flex justify-between items-center text-sm mb-2">
                   <span className="text-gray-500">Subtotal</span>
                   <span className="font-medium text-gray-800">{invoice.amount}</span>
                </div>
                <div className="flex justify-between items-center text-sm mb-2">
                   <span className="text-gray-500">Tax (0%)</span>
                   <span className="font-medium text-gray-800">$0.00</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold text-gray-800 mt-4 border-t border-gray-200 pt-3">
                   <span>Total</span>
                   <span>{invoice.amount}</span>
                </div>
             </div>
          </div>

          <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-white rounded-b-2xl">
             <button className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
                <i className="fa-solid fa-download"></i> Download
             </button>
             <button onClick={onClose} className="px-6 py-2.5 bg-[#0074D9] text-white rounded-lg text-sm font-medium hover:bg-[#0062b8]">Close</button>
          </div>
       </div>
    </div>, document.body
  );
}

function ScheduleReportTab() {
  const [showVisitSummary, setShowVisitSummary] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showCreateSchedule, setShowCreateSchedule] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  // Mock Data
  const reports = [
    { id: 1, caregiver: "Michael Jackson", location: "Melbourne, Australia", date: "22 May, 2025", status: "Active" },
    { id: 2, caregiver: "Liam Thompson", location: "Toronto, Canada", date: "22 June, 2024", status: "Completed" },
    { id: 3, caregiver: "Sophia Martinez", location: "Barcelona, Spain", date: "22 July, 2024", status: "Completed" },
    { id: 4, caregiver: "Ava Johnson", location: "Tokyo, Japan", date: "22 August, 2024", status: "Completed" },
  ];

  // Open Visit Summary (triggered by Caregiver Name click)
  const handleCaregiverClick = (report: any) => {
    setSelectedReport(report);
    setShowVisitSummary(true);
  };

  // Switch from Visit Summary to Approval Note
  const handleApproveVisitClick = () => {
    setShowVisitSummary(false);
    setTimeout(() => setShowApprovalModal(true), 200);
  };

  return (
    <div className="animate-fade-in space-y-6">
       
       {/* Header */}
       <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Schedule Report</h3>
          <button 
            onClick={() => setShowCreateSchedule(true)}
            className="bg-[#0074D9] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#0062b8] transition-colors shadow-sm"
          >
            Schedule
          </button>
       </div>

       {/* Filters */}
       <div className="flex gap-4">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 shadow-sm text-sm text-gray-600">
             <i className="fa-regular fa-calendar mr-2"></i> April 2025 (Apr 1 - 16)
          </div>
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 shadow-sm text-sm text-gray-600">
             Month <i className="fa-solid fa-chevron-down ml-2 text-xs"></i>
          </div>
       </div>

       {/* Table */}
       <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                   <tr>
                      <th className="p-4 w-16">SN</th>
                      <th className="p-4">Caregiver Name</th>
                      <th className="p-4">Visit Location</th>
                      <th className="p-4">Schedule Date</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right"></th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {reports.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                         <td className="p-4 text-gray-500">0{index + 1}</td>
                         {/* CLICKABLE CAREGIVER NAME */}
                         <td className="p-4">
                            <button onClick={() => handleCaregiverClick(item)} className="font-medium text-gray-800 hover:text-[#0074D9]">
                               {item.caregiver}
                            </button>
                         </td>
                         <td className="p-4 text-gray-600">{item.location}</td>
                         <td className="p-4 text-gray-600">{item.date}</td>
                         <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${item.status === 'Active' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                               {item.status}
                            </span>
                         </td>
                         <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                               <button className="text-blue-500 bg-blue-50 w-8 h-8 rounded-full hover:bg-blue-100 flex items-center justify-center"><i className="fa-regular fa-eye text-xs"></i></button>
                               <button className="text-yellow-500 bg-yellow-50 w-8 h-8 rounded-full hover:bg-yellow-100 flex items-center justify-center"><i className="fa-solid fa-pencil text-xs"></i></button>
                               <button className="text-red-500 bg-red-50 w-8 h-8 rounded-full hover:bg-red-100 flex items-center justify-center"><i className="fa-regular fa-trash-can text-xs"></i></button>
                            </div>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
          <div className="p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
             <span>Showing 1 to 10 of 1000 Results</span>
             <div className="flex gap-2"><button>Previous</button><button className="text-brand">Next</button></div>
          </div>
       </div>

       {/* --- MODALS --- */}
       {showVisitSummary && selectedReport && (
         <VisitSummaryModal report={selectedReport} onApprove={handleApproveVisitClick} onClose={() => setShowVisitSummary(false)} />
       )}

       {showApprovalModal && (
         <ApprovalNoteModal onClose={() => setShowApprovalModal(false)} />
       )}

       {showCreateSchedule && (
         <CreateScheduleModal onClose={() => setShowCreateSchedule(false)} />
       )}

    </div>
  );
}

// =========================================================================
// 2. MODAL COMPONENTS
// =========================================================================

// --- A. VISIT SUMMARY MODAL (Matches image_217a86.png) ---
function VisitSummaryModal({ report, onApprove, onClose }: { report: any, onApprove: () => void, onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "unset"; }; }, []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-6xl shadow-2xl flex flex-col max-h-[95vh] animate-slide-up relative">
          
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
             <h2 className="text-xl font-bold text-gray-800">Visit Summary</h2>
             <button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button>
          </div>

          {/* Body */}
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
                {/* Time Logs */}
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

                {/* Map */}
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

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-white">
             <button onClick={onClose} className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 text-sm font-medium hover:bg-gray-50">Back</button>
             <button onClick={onApprove} className="px-6 py-2.5 bg-[#0074D9] text-white rounded-lg text-sm font-medium hover:bg-[#0062b8]">Approve Visit</button>
          </div>
       </div>
    </div>, document.body
  );
}

// --- VIEW NOTE MODAL ---
function ViewNoteModal({ note, onClose }: { note: any, onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "unset"; }; }, []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl flex flex-col animate-scale-up relative overflow-hidden">
          
          <div className="flex justify-between items-start p-6 border-b border-gray-100">
             <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Notes</span>
                <h2 className="text-xl font-bold text-[#0074D9] mt-1">{note.title}</h2>
             </div>
             <button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400 hover:text-gray-600 transition-colors"></i></button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[60vh]">
             <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                {note.desc}
             </p>
          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-xs">
                    {note.author.charAt(0)}
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-700">{note.author}</span>
                    <span className="text-[10px] text-gray-400">{note.role}</span>
                </div>
             </div>
             <span className="text-xs text-gray-400 font-medium">{note.date}</span>
          </div>
       </div>
    </div>, document.body
  );
}

// --- B. APPROVAL NOTE MODAL (Matches image_218266.png) ---
function ApprovalNoteModal({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "unset"; }; }, []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col animate-scale-up relative">
          
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
             <h2 className="text-xl font-bold text-gray-800">Approval Note</h2>
             <button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button>
          </div>

          <div className="p-6 space-y-4">
             <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Approved By</label>
                <input type="text" placeholder="Enter or Select" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand" />
             </div>
             <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Approve Date</label>
                {/* FIXED: Changed to type="date" and removed manual icon */}
                <input type="date" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand" />
             </div>
             <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Approved Reason</label>
                <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand text-gray-500">
                   <option>Select</option>
                     <option>105 - Services
Provided Outside
the Home</option>
                     <option>300 - Phone Line
Not Reliant</option>
<option>312 -
Malfunctioning
Mobile /
Application</option>
                     <option>400 - Phone
Unavailable</option>
<option>905 - Attendant or
Assigned Failed to
call in</option>
                     
                </select>
             </div>
             <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Notes</label>
                <textarea placeholder="Start typing..." className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm h-24 resize-none focus:outline-none focus:border-brand"></textarea>
             </div>
             
             <div className="flex gap-6 pt-2">
                <div className="flex items-center gap-2">
                   <input type="radio" name="approvalType" className="w-4 h-4 text-brand" />
                   <label className="text-sm text-gray-600">Needs Approval</label>
                </div>
                <div className="flex items-center gap-2">
                   <input type="radio" name="approvalType" className="w-4 h-4 text-brand" defaultChecked />
                   <label className="text-sm text-gray-600">Approved for Billing & Payroll</label>
                </div>
             </div>
          </div>

          <div className="p-6 border-t border-gray-100 flex justify-end">
             <button onClick={onClose} className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-lg shadow-blue-900/10">
                Approved
             </button>
          </div>
       </div>
    </div>, document.body
  );
}


// --- C. CREATE SCHEDULE MODAL (3-STEP WIZARD) ---
function CreateScheduleModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "unset"; }; }, []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh] animate-slide-up relative">
          
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
             <h2 className="text-xl font-bold text-gray-800">Create Schedule</h2>
             <button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button>
          </div>

          <div className="pt-6 px-8 flex justify-center">
             {/* Stepper */}
             <div className="flex items-center">
                <div className={`flex items-center gap-2 ${step>=1?'text-[#0074D9]':'text-gray-400'}`}><span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step>=1 ? 'bg-[#0074D9] text-white' : 'bg-gray-200 text-gray-500'}`}>1</span> <span className="font-medium text-sm">Basic Information</span></div>
                <div className={`w-12 h-px mx-4 ${step>=2 ? 'bg-[#0074D9]' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center gap-2 ${step>=2?'text-[#0074D9]':'text-gray-400'}`}><span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step>=2 ? 'bg-[#0074D9] text-white' : 'bg-gray-200 text-gray-500'}`}>2</span> <span className="font-medium text-sm">Accounting</span></div>
                <div className={`w-12 h-px mx-4 ${step>=3 ? 'bg-[#0074D9]' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center gap-2 ${step>=3?'text-[#0074D9]':'text-gray-400'}`}><span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step>=3 ? 'bg-[#0074D9] text-white' : 'bg-gray-200 text-gray-500'}`}>3</span> <span className="font-medium text-sm">Complete</span></div>
             </div>
          </div>

          <div className="p-8 overflow-y-auto flex-1">
             {/* STEP 1: Basic Information */}
             {step === 1 && (
                <div className="space-y-6 animate-slide-up">
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1"><label className="text-sm font-medium text-gray-700">Client</label><select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm text-gray-500">
                        <option>Select or Enter</option>
                        <option>Nina Mcintire</option>
                        <option>Chen, Yueqiu</option>
                        <option>John Doe</option>  
                        </select></div>
                      <div className="space-y-1"><label className="text-sm font-medium text-gray-700">Caregiver</label><select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm text-gray-500">
                        <option>Select or Enter</option>
                        <option>Michael Jackson</option>
                        <option>Liam Thompson</option>
                        <option>Sophia Martinez</option>
                        </select></div>
                   </div>

                   {/* --- DATE & TIME PICKERS SECTION --- */}
                   <div className="grid grid-cols-3 gap-6">
                      
                      {/* Date Picker */}
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Start Date</label>
                        <input type="date" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-brand"/>
                      </div>

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
                   {/* ----------------------------------- */}

                   <div className="space-y-1"><label className="text-sm font-medium text-gray-700">Frequency</label><select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm text-gray-500">
                     <option>Select</option>
                     <option>One Time</option>
                     <option>Daily</option>
                     <option>Weekly</option>
                     <option>Bi-Weekly</option>
                     <option>Monthly</option>
                     </select></div>
                   <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Repeat Every</label>
                        <input type="date" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-brand"/>
                   </div>
                   <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Ends on</label>
                        <input type="date" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-brand"/>
                   </div>
                   <div className="space-y-1"><label className="text-sm font-medium text-gray-700">Notes</label><textarea placeholder="Start typing..." className="w-full border border-gray-200 rounded-lg p-2.5 text-sm h-24 resize-none"></textarea></div>
                </div>
             )}

             {/* STEP 2: Accounting */}
             {step === 2 && (
                <div className="space-y-6 animate-slide-up">
                   <div className="space-y-1"><label className="text-sm font-medium text-gray-700">Service Type</label><select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm text-gray-500">
                     <option>Select</option>
                     <option>Home Care</option>
                     <option>Transportation</option>
                     <option>Meal Delivery</option>
                     </select></div>
                   <div className="space-y-1"><label className="text-sm font-medium text-gray-700">Bill Rate Hourly</label><div className="flex gap-4"><select className="flex-1 border p-2.5 rounded-lg text-sm"><option>Select</option></select><input type="text" placeholder="Custom" className="flex-1 border p-2.5 rounded-lg text-sm" /></div></div>
                   <div className="space-y-1"><label className="text-sm font-medium text-gray-700">Pay Rate</label><div className="flex gap-4"><select className="flex-1 border p-2.5 rounded-lg text-sm"><option>Select</option></select><input type="text" placeholder="Custom" className="flex-1 border p-2.5 rounded-lg text-sm" /></div></div>
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

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
             {step === 1 && <button onClick={() => setStep(2)} className="px-6 py-2.5 bg-[#0074D9] text-white rounded-lg text-sm font-medium hover:bg-[#0062b8]">Continue</button>}
             {step === 2 && <><button onClick={() => setStep(1)} className="px-6 py-2.5 border rounded-lg text-sm">Back</button><button onClick={() => setStep(3)} className="px-6 py-2.5 bg-[#0074D9] text-white rounded-lg text-sm">Schedule</button></>}
             {step === 3 && <button onClick={onClose} className="px-6 py-2.5 bg-[#0074D9] text-white rounded-lg text-sm">Finish</button>}
          </div>
       </div>
    </div>, document.body
  );
}

// =========================================================================
// 1. SERVICE AUTHENTICATION TAB (New Implementation)
// =========================================================================
function ServiceAuthTab() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEVVModal, setShowEVVModal] = useState(false);

  // Mock Data
  const services = [
    { payer: "Aging Resources", memberId: "4827361", auth: "9823745610", code: "T1219, UA", date: "03/15/2023", units: "$1500.00 (400 hrs.)", rate: "7.82", used: "$1500.00 (400 hrs.)", remaining: "$1500.00 (400 hrs.)" },
    { payer: "BCBS MN BLUE", memberId: "7391824", auth: "3748291056", code: "T1219, UA", date: "07/22/2021", units: "$1500.00 (420 hrs.)", rate: "9.025", used: "$1500.00 (420 hrs.)", remaining: "$1500.00 (420 hrs.)" },
    { payer: "Aging Resources", memberId: "5648392", auth: "5647382910", code: "T1219, UA", date: "11/05/2020", units: "$1500.00 (450 hrs.)", rate: "8.5", used: "$1500.00 (450 hrs.)", remaining: "$1500.00 (450 hrs.)" },
  ];

  return (
    <div className="animate-fade-in space-y-6">
       
       {/* Header */}
       <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Service Authentication</h3>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-[#0074D9] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#0062b8] transition-colors shadow-sm"
          >
            Add Service Authentication
          </button>
       </div>

       {/* Table */}
       <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
             <table className="w-full text-left text-xs whitespace-nowrap">
                <thead className="bg-gray-50 text-gray-500 uppercase font-semibold">
                   <tr>
                      <th className="p-4">Payer</th>
                      <th className="p-4">Member ID</th>
                      <th className="p-4">Service Auth</th>
                      <th className="p-4">Procedure & Modifier</th>
                      <th className="p-4">Dates</th>
                      <th className="p-4">Units</th>
                      <th className="p-4">Service Rate</th>
                      <th className="p-4">Used Units</th>
                      <th className="p-4">Total Hours Remaining</th>
                      <th className="p-4 text-center">Attachment</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {services.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                         <td className="p-4 text-gray-600">{item.payer}</td>
                         <td className="p-4 text-gray-600">{item.memberId}</td>
                         <td className="p-4 text-gray-600">{item.auth}</td>
                         <td className="p-4 text-gray-600">{item.code}</td>
                         <td className="p-4 text-gray-600">{item.date}</td>
                         <td className="p-4 text-gray-600">{item.units}</td>
                         <td className="p-4 text-gray-600">{item.rate}</td>
                         <td className="p-4 text-gray-600">{item.used}</td>
                         <td className="p-4 text-gray-600">{item.remaining}</td>
                         <td className="p-4 text-center">
                            <button 
                               onClick={() => setShowEVVModal(true)}
                               className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 flex items-center justify-center transition-colors mx-auto"
                            >
                               <i className="fa-solid fa-cloud-arrow-up text-xs"></i>
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

       {/* --- MODALS --- */}
       {showAddModal && <AddServiceAuthModal onClose={() => setShowAddModal(false)} />}
       {showEVVModal && <EVVDetailsModal onClose={() => setShowEVVModal(false)} />}

    </div>
  );
}

// =========================================================================
// 2. MODAL COMPONENTS
// =========================================================================

// --- A. ADD SERVICE AUTHENTICATION MODAL (Matches image_228109.png) ---
function AddServiceAuthModal({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "unset"; }; }, []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl flex flex-col max-h-[95vh] animate-slide-up relative">
          
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
             <h2 className="text-xl font-bold text-gray-800">Add Service Authentication</h2>
             <button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button>
          </div>

          {/* Body */}
          <div className="p-8 overflow-y-auto bg-gray-50/10">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">Payer</label><select className="w-full border p-2.5 rounded-lg text-sm bg-white"><option>Select</option></select></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">Member ID</label><input className="w-full border p-2.5 rounded-lg text-sm bg-white" placeholder="Enter" /></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">Insurance Type Code</label><select className="w-full border p-2.5 rounded-lg text-sm bg-white">
                  <option>Select</option>
                  <option>Medicare</option>
                  <option>Medicaid</option>
                  <option>Private Insurance</option>
                  <option>Workers compensation</option>
                  <option>Long-Term-care Insurance </option>
                  <option>Self-Pay / Uninsured</option>  
                  <option>Other Commercial PPO/HMO</option>
                  </select>
                  </div>
                
                <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">Claiming Factor</label>
                <select className="w-full border p-2.5 rounded-lg text-sm bg-white">
                  <option>Select</option>
                  <option>Medicare</option>
                  <option>Medicaid</option>
                  <option>Private Insurance</option>
                  </select></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">Group Id</label><input className="w-full border p-2.5 rounded-lg text-sm bg-white" placeholder="Enter #" /></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">Service Auth #</label><input className="w-full border p-2.5 rounded-lg text-sm bg-white" placeholder="Enter #" /></div>

                <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">Insurance #</label><select className="w-full border p-2.5 rounded-lg text-sm bg-white"><option>Select</option></select></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">Reference # (TAC)</label><input className="w-full border p-2.5 rounded-lg text-sm bg-white" placeholder="Enter #" /></div>
                <div className="flex items-center pt-6"><input type="checkbox" className="mr-2" /><label className="text-sm text-gray-600">Not Billable</label></div>
             </div>

             <div className="h-px bg-gray-200 my-6"></div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">Procedure Service Code</label><select className="w-full border p-2.5 rounded-lg text-sm bg-white"><option>Select</option></select></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">Modifier Code</label><select className="w-full border p-2.5 rounded-lg text-sm bg-white"><option>Select</option></select></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">Reimbursement Type</label><select className="w-full border p-2.5 rounded-lg text-sm bg-white"><option>Select</option></select></div>

                <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">Diagnosis Code</label><select className="w-full border p-2.5 rounded-lg text-sm bg-white"><option>Select</option></select></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">NPI</label><select className="w-full border p-2.5 rounded-lg text-sm bg-white"><option>Select</option></select></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">Taxonomy</label><select className="w-full border p-2.5 rounded-lg text-sm bg-white"><option>Select</option></select></div>

                <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">Usage Type</label><select className="w-full border p-2.5 rounded-lg text-sm bg-white"><option>Select</option></select></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">POS</label><select className="w-full border p-2.5 rounded-lg text-sm bg-white"><option>Select</option></select></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">Service Rate</label><input className="w-full border p-2.5 rounded-lg text-sm bg-white" placeholder="Enter" /></div>

                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-500">Dates</label>
                    <input type="date" className="w-full border p-2.5 rounded-lg text-sm bg-white" />
                </div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">Units</label><input className="w-full border p-2.5 rounded-lg text-sm bg-white" placeholder="Enter #" /></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">Frequency</label><select className="w-full border p-2.5 rounded-lg text-sm bg-white"><option>Select</option></select></div>
             </div>

             {/* Upload Area */}
             <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50">
                <i className="fa-solid fa-cloud-arrow-up text-3xl text-gray-400 mb-3"></i>
                <p className="text-sm text-gray-600">Drag and drop or click to upload file</p>
                <p className="text-xs text-gray-400 mt-1">Supported file type: pdf, word, png</p>
             </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-white">
             <button onClick={onClose} className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 text-sm font-medium hover:bg-gray-50">Cancel</button>
             <button onClick={onClose} className="px-6 py-2.5 bg-[#0074D9] text-white rounded-lg text-sm font-medium hover:bg-[#0062b8]">Save Service Auth</button>
          </div>
       </div>
    </div>, document.body
  );
}

// --- B. EVV DETAILS MODAL (Matches image_2284ee.png) ---
function EVVDetailsModal({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "unset"; }; }, []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl flex flex-col max-h-[90vh] animate-slide-up relative">
          
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
             <h2 className="text-xl font-bold text-gray-800">EVV Details</h2>
             <button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button>
          </div>

          <div className="p-0 overflow-y-auto">
             <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                   <tr>
                      <th className="p-4">Service From</th>
                      <th className="p-4">Service To</th>
                      <th className="p-4">Worked Hours</th>
                      <th className="p-4">Service Rate</th>
                      <th className="p-4">Billing Amount</th>
                      <th className="p-4">Procedure Code</th>
                      <th className="p-4">Modifier</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {[1,2,3,4].map((i) => (
                      <tr key={i} className="hover:bg-gray-50">
                         <td className="p-4">03/15/2023</td>
                         <td className="p-4">01/18/2024</td>
                         <td className="p-4">3.50</td>
                         <td className="p-4">7</td>
                         <td className="p-4">$120</td>
                         <td className="p-4">T1019</td>
                         <td className="p-4">No Modifier Code</td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>

          <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-white">
             <button onClick={onClose} className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 text-sm font-medium hover:bg-gray-50">Back</button>
             <button onClick={onClose} className="px-6 py-2.5 bg-[#0074D9] text-white rounded-lg text-sm font-medium hover:bg-[#0062b8]">Ready To Bill</button>
          </div>
       </div>
    </div>, document.body
  );
}
// =========================================================================
// 8. MODAL COMPONENTS (Portals)
// =========================================================================



function CreateNoteModal({ onClose }: { onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col">
          <div className="p-6 border-b flex justify-between"><h2 className="text-xl font-bold">Notes</h2><button onClick={onClose}>✕</button></div>
          <div className="p-6 space-y-4"><input className="w-full border p-2 rounded" placeholder="Title" /><textarea className="w-full border p-2 rounded h-32" placeholder="Note..." /></div>
          <div className="p-6 border-t flex justify-end gap-3"><button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded">Create</button></div>
       </div>
    </div>, document.body
  );
}


// =========================================================================
// 1. INCIDENTS TAB (Requested Feature)
// =========================================================================
function IncidentsTab() {
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<any>(null);

  // Mock Data
  const incidents = [
    { id: 1, date: "01 April, 2025 | Saturday", time: "09:00 AM", caregiver: "Dr. Olivia Thompson", type: "Fall", location: "Bathroom", status: "Approved", description: "client slipped on a wet floor while attempting to use the bathroom. No severe injury noted, mild bruising on the elbow.", action: "First aid administered. Doctor informed. Wet floor cleaned immediately to prevent further accidents." },
    { id: 2, date: "03 April, 2025 | Monday", time: "09:00 AM", caregiver: "Dr. Olivia Thompson", type: "Medication Error", location: "Bathroom", status: "Approved", description: "Missed morning dose due to client refusal.", action: "Administered dose late and logged the refusal." },
    { id: 3, date: "04 April, 2025 | Tuesday", time: "09:00 AM", caregiver: "Dr. Olivia Thompson", type: "Behavioral Issue", location: "Garden", status: "Approved", description: "client became agitated during the walk.", action: "Calmed client down with conversation and returned to room." },
    { id: 4, date: "05 April, 2025 | Wednesday", time: "09:00 AM", caregiver: "Dr. Olivia Thompson", type: "Fall", location: "Room", status: "Pending", description: "Tripped over rug.", action: "Pending review." },
  ];

  // Open Incident Modal
  const handleClientClick = (incident: any) => {
    setSelectedIncident(incident);
    setShowIncidentModal(true);
  };

  // Logic: Decline -> Close Incident Modal -> Open Create Visit Modal
  const handleDecline = () => {
    setShowIncidentModal(false);
    // Small timeout to make the transition smoother
    setTimeout(() => {
        setShowVisitModal(true);
    }, 200);
  };

  return (
    <div className="animate-fade-in space-y-6">
       
       {/* Header */}
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h3 className="text-lg font-bold text-gray-800">Incidents</h3>
          <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors">
             Download Incidents
          </button>
       </div>

       {/* Filters */}
       <div className="flex gap-4 items-center">
          <div className="relative w-64">
             <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
             <input type="text" placeholder="Search..." className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-brand" />
          </div>
          <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
             <i className="fa-regular fa-calendar text-gray-400 mr-2"></i>
             <span className="text-sm font-medium text-gray-700">April 2025</span>
             <div className="flex ml-3 gap-1 border-l border-gray-200 pl-3">
               <button className="text-gray-400 hover:text-gray-600"><i className="fa-solid fa-chevron-left text-xs"></i></button>
               <button className="text-gray-400 hover:text-gray-600"><i className="fa-solid fa-chevron-right text-xs"></i></button>
            </div>
          </div>
       </div>

       {/* Table */}
       <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase font-semibold">
                   <tr>
                      <th className="p-4 w-16">SN</th>
                      <th className="p-4">Client Name</th>
                      <th className="p-4">Date of Incident</th>
                      <th className="p-4">Time</th>
                      <th className="p-4">Caregiver Involved</th>
                      <th className="p-4">Types of Incident</th>
                      <th className="p-4">Location</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Action</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {incidents.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                         <td className="p-4 text-gray-500">0{index + 1}</td>
                         {/* CLICKABLE CLIENT NAME */}
                         <td className="p-4">
                            <button onClick={() => handleClientClick(item)} className="flex items-center gap-3 group text-left w-full focus:outline-none">
                               <img src="https://i.pravatar.cc/150?img=1" alt="Client" className="w-8 h-8 rounded-full object-cover ring-2 ring-white group-hover:ring-brand transition-all" />
                               <span className="font-medium text-gray-800 group-hover:text-[#0074D9] transition-colors">Nina Mcintire</span>
                            </button>
                         </td>
                         <td className="p-4 text-gray-600 font-medium">{item.date}</td>
                         <td className="p-4 text-gray-600">{item.time}</td>
                         <td className="p-4">
                            <div className="flex items-center gap-3">
                               <img src={`https://i.pravatar.cc/150?img=${20 + index}`} alt="CG" className="w-8 h-8 rounded-full object-cover" />
                               <span className="text-gray-700">{item.caregiver}</span>
                            </div>
                         </td>
                         <td className="p-4 text-gray-800 font-medium">{item.type}</td>
                         <td className="p-4 text-gray-600">{item.location}</td>
                         <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${item.status === 'Approved' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                               {item.status}
                            </span>
                         </td>
                         <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                               <button className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 flex items-center justify-center transition-colors"><i className="fa-regular fa-eye text-xs"></i></button>
                               <button className="w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors"><i className="fa-regular fa-trash-can text-xs"></i></button>
                            </div>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
          {/* Pagination */}
          <div className="p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
             <span>Showing 1 to 10 of 1000 Results</span>
             <div className="flex gap-2"><button className="hover:text-brand">Previous</button><button className="text-brand font-medium">Next</button></div>
          </div>
       </div>

       {/* --- RENDER MODALS --- */}
       {showIncidentModal && selectedIncident && (
         <IncidentDetailModal 
            incident={selectedIncident} 
            onDecline={handleDecline} 
            onClose={() => setShowIncidentModal(false)} 
         />
       )}

       {showVisitModal && (
         <CreateVisitModal onClose={() => setShowVisitModal(false)} />
       )}

    </div>
  );
}

// =========================================================================
// 2. MODAL COMPONENTS (Using Portals)
// =========================================================================

// --- A. INCIDENT DETAILS MODAL (Triggers Create Visit on Decline) ---
function IncidentDetailModal({ incident, onDecline, onClose }: { incident: any, onDecline: () => void, onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "unset"; }; }, []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl flex flex-col max-h-[90vh] animate-slide-up relative">
          
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
             <h2 className="text-xl font-bold text-gray-800">Incidents</h2>
             <button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button>
          </div>

          <div className="p-8 overflow-y-auto">
             <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100 mb-6">
                 <h3 className="text-lg font-bold text-gray-800 mb-4">{incident.clientName || 'Nina Mcintire'}</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">client Name:</span> <span className="font-medium text-gray-800">Nina Mcintire</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">client ID:</span> <span className="font-medium text-gray-800">PI-100001</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Caregiver Involved:</span> <span className="font-medium text-gray-800">{incident.caregiver}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Date of Incident:</span> <span className="font-medium text-gray-800">April 26, 2025</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Incident Time:</span> <span className="font-medium text-gray-800">10:30 AM</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Type of Incident:</span> <span className="font-medium text-gray-800">{incident.type}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Location:</span> <span className="font-medium text-gray-800">{incident.location}</span></div>
                 </div>
             </div>

             <div className="space-y-6">
                <div>
                   <h4 className="text-sm font-bold text-gray-700 mb-2">1. Description of Incident:</h4>
                   <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <span className="font-semibold text-gray-700">Ans:</span> {incident.description}
                   </p>
                </div>
                <div>
                   <h4 className="text-sm font-bold text-gray-700 mb-2">2. Immediate Action Taken:</h4>
                   <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <span className="font-semibold text-gray-700">Ans:</span> {incident.action}
                   </p>
                </div>
             </div>
          </div>

          <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
             {/* DECLINE BUTTON TRIGGERS THE NEXT MODAL */}
             <button onClick={onDecline} className="px-6 py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                Decline
             </button>
             <button onClick={onClose} className="px-6 py-2.5 bg-[#E6F4FF] text-[#0074D9] border border-blue-100 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                Approved
             </button>
          </div>
       </div>
    </div>, document.body
  );
}

// --- B. CREATE VISIT MODAL (The target of Decline button) ---
function CreateVisitModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "unset"; }; }, []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-6xl shadow-2xl flex flex-col max-h-[95vh] animate-slide-up relative">
          
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
             <h2 className="text-xl font-bold text-gray-800">Create Visit</h2>
             <button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button>
          </div>
          
          {/* Stepper */}
          <div className="pt-6 px-8">
             <div className="flex items-center justify-center">
                <div className={`flex items-center gap-2 ${step>=1?'text-[#0074D9]':'text-gray-400'}`}><span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step>=1 ? 'bg-[#0074D9] text-white' : 'bg-gray-200 text-gray-500'}`}>1</span> <span className="font-medium text-sm">Basic Information</span></div>
                <div className={`w-16 h-px mx-4 ${step>=2 ? 'bg-[#0074D9]' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center gap-2 ${step>=2?'text-[#0074D9]':'text-gray-400'}`}><span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step>=2 ? 'bg-[#0074D9] text-white' : 'bg-gray-200 text-gray-500'}`}>2</span> <span className="font-medium text-sm">Accounting</span></div>
                <div className={`w-16 h-px mx-4 ${step>=3 ? 'bg-[#0074D9]' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center gap-2 ${step>=3?'text-[#0074D9]':'text-gray-400'}`}><span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step>=3 ? 'bg-[#0074D9] text-white' : 'bg-gray-200 text-gray-500'}`}>3</span> <span className="font-medium text-sm">Complete</span></div>
             </div>
          </div>

          {/* Body */}
        <div className="p-8 overflow-y-auto flex-1">
             
             {/* STEP 1: BASIC INFORMATION (Matching Image 12fe3e.png) */}
             {step === 1 && (
                <div className="space-y-6 animate-slide-up">
                   {/* Row 1: Client & Employer */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                         <label className="text-sm font-medium text-gray-700">Client</label>
                         <select className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand text-gray-500">
                            <option>Select or Enter</option>
                         </select>
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-sm font-medium text-gray-700">Employer</label>
                         <select className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand text-gray-500">
                            <option>Select or Enter</option>
                         </select>
                      </div>
                   </div>

                   {/* Row 2: Start Date & Time */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                         <label className="text-sm font-medium text-gray-700">Start Date</label>
                         {/* FIXED: Changed to type="date" and removed manual icon */}
                         <input type="date" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand" />
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-sm font-medium text-gray-700">Time</label>
                         <div className="flex gap-4">
                            <select className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand text-gray-500">
                               <option>Select Start Time</option>
                            </select>
                            <select className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand text-gray-500">
                               <option>Select End Time</option>
                            </select>
                         </div>
                      </div>
                   </div>

                   {/* Row 3: Flexible Time */}
                   <div className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-brand rounded border-gray-300 focus:ring-brand" />
                      <label className="text-sm text-gray-600">Flexible Time</label>
                   </div>

                   {/* Row 4: Frequency */}
                   <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">Frequency</label>
                      <select className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand text-gray-500">
                         <option>Select</option>
                      </select>
                   </div>

                   {/* Row 5: Repeat & Occurrence */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                         <label className="text-sm font-medium text-gray-700">Repeat Every</label>
                         {/* FIXED: Changed to type="date" and removed manual icon */}
                         <input type="date" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand" />
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-sm font-medium text-gray-700">Repeats on</label>
                         <div className="flex gap-2">
                            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                               <button key={day} className="px-2 py-1 border border-gray-200 rounded text-xs text-gray-500 hover:bg-gray-50">
                                  {day}
                               </button>
                            ))}
                         </div>
                      </div>
                   </div>

                   {/* Row 6: Ends on & Occurrence Times */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                         <label className="text-sm font-medium text-gray-700">Ends on</label>
                         {/* FIXED: Changed to type="date" and removed manual icon */}
                         <input type="date" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand" />
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-sm font-medium text-gray-700">Occurrence Times</label>
                         <select className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand text-gray-500">
                            <option>Select</option>
                         </select>
                      </div>
                   </div>

                   {/* Row 7: Never End */}
                   <div className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-brand rounded border-gray-300 focus:ring-brand" />
                      <label className="text-sm text-gray-600">Never End</label>
                   </div>

                   {/* Row 8: Notes */}
                   <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">Notes</label>
                      <textarea placeholder="Start typing..." className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm h-24 resize-none focus:outline-none focus:border-brand"></textarea>
                   </div>
                </div>
             )}

             {/* STEP 2: ACCOUNTING */}
             {step === 2 && (
                <div className="max-w-2xl mx-auto space-y-6 animate-slide-up">
                   <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">Service Type</label>
                      <input type="text" placeholder="e.g. Personal Care" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand" />
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">Bill Rate Hourly</label>
                      <div className="flex gap-4">
                         <select className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm"><option>Standard ($25/hr)</option></select>
                         <input type="text" placeholder="Custom" className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm" />
                      </div>
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">Pay Rate Hourly</label>
                      <div className="flex gap-4">
                         <select className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm"><option>Standard ($15/hr)</option></select>
                         <input type="text" placeholder="Custom" className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm" />
                      </div>
                   </div>
                </div>
             )}

             {/* STEP 3: COMPLETE */}
             {step === 3 && (
                <div className="flex flex-col items-center justify-center h-full animate-scale-up py-10">
                   <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <i className="fa-solid fa-check text-4xl text-green-600"></i>
                   </div>
                   <h3 className="text-2xl font-bold text-gray-800 mb-2">Visit Created Successfully!</h3>
                   <p className="text-gray-500 text-center max-w-md">The visit has been logged and the schedule has been updated accordingly.</p>
                </div>
             )}

          </div>

          <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
             {step === 1 && (
                <>
                   <button onClick={onClose} className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 text-sm font-medium hover:bg-white">Cancel</button>
                   <button onClick={() => setStep(2)} className="px-6 py-2.5 bg-[#1e293b] text-white rounded-lg text-sm font-medium hover:bg-[#0f172a]">Continue</button>
                </>
             )}
             {step === 2 && (
                <>
                   <button onClick={() => setStep(1)} className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 text-sm font-medium hover:bg-white">Back</button>
                   <button onClick={() => setStep(3)} className="px-6 py-2.5 bg-[#1e293b] text-white rounded-lg text-sm font-medium hover:bg-[#0f172a]">Continue</button>
                </>
             )}
             {step === 3 && (
                <button onClick={onClose} className="px-8 py-2.5 bg-[#0074D9] text-white rounded-lg text-sm font-medium hover:bg-[#0062b8]">Finish</button>
             )}
          </div>
       </div>
    </div>, document.body
  );
}

// =========================================================================
// 9. HELPER COMPONENTS
// =========================================================================
function InfoItem({ label, value }: { label: string, value: string }) {
  return (
    <div><span className="block text-gray-400 text-xs mb-1">{label}</span><span className="font-medium text-gray-800 text-sm">{value}</span></div>
  );
}

function NoteCard({ title, date, author, role, desc, img }: any) {
    return (
        <div className="border border-blue-100 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-all h-full flex flex-col border-l-4 border-l-[#0074D9]">
            <h4 className="font-bold text-[#0074D9] text-sm mb-2">{title}</h4>
            <p className="text-xs text-gray-500 mb-4 line-clamp-4 flex-1 leading-relaxed">{desc}</p>
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                <div className="flex items-center gap-2">
                    <img src={`https://i.pravatar.cc/150?img=${img}`} className="w-8 h-8 rounded-full object-cover" alt={author} />
                    <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-gray-800 leading-tight">{author}</span>
                        <span className="text-[9px] text-gray-400">{role}</span>
                    </div>
                </div>
                <span className="text-[10px] text-gray-400 font-medium">{date}</span>
            </div>
        </div>
    )
}

function CalendarCell({ date, isCurrentMonth, children }: any) {
  return (
    <div className={`min-h-[100px] p-2 border-b border-r ${!isCurrentMonth ? 'bg-gray-50' : 'bg-white'}`}>
       <div className="text-right text-xs mb-2">{date}</div>
       {children}
    </div>
  )
}

function EventCard({ color, time, staff, onClick }: { color: string, time: string, staff: string, onClick?: () => void }) {
  const bg = color === 'yellow' ? 'bg-yellow-500' : color === 'green' ? 'bg-green-500' : 'bg-blue-500';
  return (
    <div 
      onClick={(e) => {
        e.stopPropagation(); // Prevent bubbling if the cell itself has a click
        if (onClick) onClick();
      }} 
      className={`${bg} text-white p-1 rounded text-[10px] mb-1 cursor-pointer hover:opacity-90 transition-opacity shadow-sm`}
    >
      {time}<br/>{staff}
    </div>
  )
}

function ADLSection({ title, items, onEdit }: { title: string, items: {name:string, desc:string}[], onEdit: () => void }) {
    return (
        <div className="border border-gray-100 rounded-lg p-4 bg-white">
            <h4 className="font-bold text-[#0074D9] text-sm mb-3 flex items-center gap-2">
                {title} 
                <button onClick={onEdit} className="text-gray-400 hover:text-blue-600 transition-colors"><i className="fa-solid fa-pencil text-xs"></i></button>
            </h4>
            <div className="space-y-4">
                {items.map((item, i) => (
                    <div key={i} className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-50 pb-3 last:border-0 last:pb-0 gap-2">
                        <div>
                            <p className="font-medium text-sm text-gray-800">{item.name}</p>
                            <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{item.desc}</p>
                        </div>
                        <div className="flex gap-1 flex-wrap">
                            {['Sun','Mon','Tue','Wed','Thur','Fri','Sat'].map(d => (
                                <span key={d} className="text-[10px] px-2 py-0.5 bg-blue-50 text-[#0074D9] rounded font-medium">{d}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


// =========================================================================
// 1. TRACKABLE DOCUMENT TAB (New Implementation)
// =========================================================================
function TrackableDocumentTab() {
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
          <h3 className="text-lg font-bold text-gray-800">Trackable Document</h3>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-[#0074D9] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#0062b8] transition-colors shadow-sm"
          >
            Add Document
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
       <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col animate-scale-up relative">
          
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
             <h2 className="text-xl font-bold text-gray-800">Trackable Document</h2>
             <button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-5">
             <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Document Type</label>
                <select className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand text-gray-500">
                   <option>Select</option>
                   <option>Physician's Order</option>
                   <option>Client Consent Form</option>
                   <option>Insurance Card</option>
                  
                </select>
             </div>

             <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Remark</label>
                <input type="text" placeholder="Enter" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand" />
             </div>

             <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Issued Date</label>
                {/* FIXED: Changed to type="date" and removed manual icon */}
                <input type="date" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand" />
             </div>

             <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Expiry Date</label>
                {/* FIXED: Changed to type="date" and removed manual icon */}
                <input type="date" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand" />
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