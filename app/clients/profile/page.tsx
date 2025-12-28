"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

export default function ClientProfilePage() {
  const [activeTab, setActiveTab] = useState("General Info");

  const tabs = [
    "General Info", "Scheduled", "Caregivers", "Billing", "Note", 
    "ADL", "Incidents", "Medication", "Schedule Report", 
    "Service Authentication", "Trackable Document"
  ];

  return (
    <DashboardLayout>
      {/* FIX 1: Use min-h-screen and h-auto to allow scrolling */}
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
                         <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50">Edit</button>
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

        {/* --- TAB NAVIGATION (SAFE MODE) --- */}
        {/* FIX 2: Explicit width, white background, and overflow handling */}
        <div className="w-full bg-white border-b border-gray-200 rounded-t-xl shadow-sm mt-4">
           <div className="w-full overflow-x-auto">
              <div className="flex gap-2  px-3 min-w-max">
                  {tabs.map((tab) => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 text-sm font-medium transition-all relative whitespace-nowrap px-1 ${
                        activeTab === tab 
                          ? "text-[#0074D9]" 
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab}
                      {/* Active Blue Line */}
                      {activeTab === tab && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0074D9] rounded-t-full"></span>
                      )}
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

// --- Helper to Render Active Tab ---
function renderTabContent(tab: string) {
  switch (tab) {
    case "General Info": return <GeneralInfoTab />;
    case "Scheduled": return <ScheduledTab />;
    case "Caregivers": return <CaregiversTab />;
    case "Billing": return <BillingTab />;
    case "Note": return <NoteTab />;
    case "ADL": return <ADLTab />;
    case "Incidents": return <IncidentsTab />;
    case "Medication": return <MedicationTab />;
    case "Schedule Report": return <ScheduleReportTab />;
    case "Service Authentication": return <ServiceAuthTab />;
    default: return <div className="text-gray-400 text-center py-20">Content for {tab} is coming soon...</div>;
  }
}

// =========================================================================
// SUB-COMPONENTS (Tab Contents)
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
             <InfoItem label="SSN" value="(703) 981-7142" />
             <InfoItem label="Phone/Mobile" value="(703) 981-7142" />
             <InfoItem label="Email Address" value="nina@gmail.com" />
             <InfoItem label="Language Spoken" value="English" />
             <InfoItem label="Street Address" value="1509 Oakview Dr." />
             <InfoItem label="City" value="McLean" />
             <InfoItem label="State" value="VA (Virginia)" />
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
             <InfoItem label="Coordinator" value="Son Micle" />
             <InfoItem label="Insurance Provider  Status" value="Active" />
             <InfoItem label="Region Code" value="VA - 7149" />             
          </div>
           <div className="mt-2"></div>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             <InfoItem label="Assessment Start Date" value="31 Dec, 2024" />
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

function ScheduledTab() {
  const [showModal, setShowModal] = useState(false);

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
          {/* Date Picker */}
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

          {/* Add Button - Triggers Modal */}
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
            <EventCard color="yellow" time="7 AM - 3 PM | 8 Hours" staff="Juan, Chinchu" />
          </CalendarCell>
          
          {/* Green Events */}
          <CalendarCell date={23} isCurrentMonth={true}>
            <EventCard color="green" time="7 AM - 3 PM | 8 Hours" staff="Juan, Chinchu" />
          </CalendarCell>
          <CalendarCell date={24} isCurrentMonth={true}>
             <EventCard color="green" time="7 AM - 3 PM | 8 Hours" staff="Juan, Chinchu" />
          </CalendarCell>
          <CalendarCell date={25} isCurrentMonth={true}>
             <EventCard color="green" time="7 AM - 3 PM | 8 Hours" staff="Juan, Chinchu" />
          </CalendarCell>
          <CalendarCell date={26} isCurrentMonth={true}>
             <EventCard color="green" time="7 AM - 3 PM | 8 Hours" staff="Juan, Chinchu" />
          </CalendarCell>

          {/* Mixed Events */}
          <CalendarCell date={27} isCurrentMonth={true}>
             <EventCard color="green" time="7 AM - 3 PM | 8 Hours" staff="Juan, Chinchu" />
          </CalendarCell>
          <CalendarCell date={28} isCurrentMonth={true}>
             <EventCard color="blue" time="7 AM - 3 PM | 8 Hours" staff="Juan, Chinchu" />
          </CalendarCell>

          <CalendarCell date={29} isCurrentMonth={true} />
          <CalendarCell date={30} isCurrentMonth={true} />
          <CalendarCell date={1} isCurrentMonth={false} />
          <CalendarCell date={2} isCurrentMonth={false} />
          <CalendarCell date={3} isCurrentMonth={false} />

        </div>
      </div>

      {/* --- MODAL INJECTION --- */}
      {showModal && <CreateScheduleModal onClose={() => setShowModal(false)} />}
      
    </div>
  );
}

// --- 2. New Create Schedule Modal Component ---
function CreateScheduleModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 client-space-mt bg-gray-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Create Schedule</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="p-8 overflow-y-auto flex-1">
          
          {/* Stepper */}
          <div className="flex items-center justify-center mb-10 bg-blue-50/50 py-4 rounded-xl border border-blue-100/50">
             {/* Step 1 */}
             <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-[#0074D9] text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                <span className={`text-sm font-medium ${step >= 1 ? 'text-[#0074D9]' : 'text-gray-500'}`}>Basic Information</span>
             </div>
             <div className="w-16 h-px bg-gray-300 mx-4"></div>
             {/* Step 2 */}
             <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-[#0074D9] text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                <span className={`text-sm font-medium ${step >= 2 ? 'text-[#0074D9]' : 'text-gray-500'}`}>Accounting</span>
             </div>
             <div className="w-16 h-px bg-gray-300 mx-4"></div>
             {/* Step 3 */}
             <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 3 ? 'bg-[#0074D9] text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
                <span className={`text-sm font-medium ${step >= 3 ? 'text-[#0074D9]' : 'text-gray-500'}`}>Complete</span>
             </div>
          </div>

          {/* --- STEP 1 FORM --- */}
          {step === 1 && (
            <div className="space-y-6 animate-slide-up">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                     <label className="text-sm font-medium text-gray-700">Client</label>
                     <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-500 focus:outline-none focus:border-brand">
                        <option>Select or Enter</option>
                     </select>
                  </div>
                  <div className="space-y-1.5">
                     <label className="text-sm font-medium text-gray-700">Caregiver</label>
                     <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-500 focus:outline-none focus:border-brand">
                        <option>Select or Enter</option>
                     </select>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1.5">
                     <label className="text-sm font-medium text-gray-700">Start Date</label>
                     <div className="relative">
                        <input type="text" placeholder="dd / mm / yyyy" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand" />
                        <i className="fa-regular fa-calendar absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                     </div>
                  </div>
                  <div className="space-y-1.5">
                     <label className="text-sm font-medium text-gray-700">Time</label>
                     <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-500 focus:outline-none focus:border-brand">
                        <option>Select Start Time</option>
                     </select>
                  </div>
                  <div className="space-y-1.5">
                     <label className="text-sm font-medium text-gray-700 opacity-0">End</label>
                     <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-500 focus:outline-none focus:border-brand">
                        <option>Select End Time</option>
                     </select>
                  </div>
               </div>

               <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 text-brand rounded border-gray-300 focus:ring-brand" />
                  <label className="text-sm text-gray-600">Flexible Time</label>
               </div>

               <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Frequency</label>
                  <div className="flex gap-4">
                     <select className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-500 focus:outline-none focus:border-brand">
                        <option>Select</option>
                     </select>
                     <button className="bg-gray-100 text-gray-600 px-6 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-200">Custom</button>
                  </div>
               </div>

               <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Notes</label>
                  <textarea placeholder="Start typing..." className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm h-24 resize-none focus:outline-none focus:border-brand"></textarea>
               </div>
            </div>
          )}

          {/* --- STEP 2 FORM --- */}
          {step === 2 && (
            <div className="space-y-6 animate-slide-up">
               <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Service Type</label>
                  <input type="text" placeholder="Enter or Select" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand" />
               </div>

               <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Bill Rate Hourly</label>
                  <div className="flex gap-4">
                     <select className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-500 focus:outline-none focus:border-brand">
                        <option>Select</option>
                     </select>
                     <input type="text" placeholder="Custom Bill Rate" className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand" />
                  </div>
               </div>

               <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Pay Rate</label>
                  <div className="flex gap-4">
                     <select className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-500 focus:outline-none focus:border-brand">
                        <option>Select</option>
                     </select>
                     <input type="text" placeholder="Custom Pay Rate" className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand" />
                  </div>
               </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
           {step > 1 && (
             <button 
               onClick={() => setStep(step - 1)}
               className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 text-sm font-medium hover:bg-white transition-colors"
             >
               Back
             </button>
           )}
           
           {step < 2 ? (
             <button 
               onClick={() => setStep(step + 1)}
               className="bg-[#0074D9] hover:bg-[#0062b8] text-white px-8 py-2.5 rounded-lg text-sm font-medium shadow-lg shadow-blue-900/10 transition-colors"
             >
               Continue
             </button>
           ) : (
             <button 
               onClick={() => {
                 console.log("Schedule Created");
                 onClose();
               }}
               className="bg-[#0074D9] hover:bg-[#0062b8] text-white px-8 py-2.5 rounded-lg text-sm font-medium shadow-lg shadow-blue-900/10 transition-colors"
             >
               Schedule
             </button>
           )}
        </div>

      </div>
    </div>
  );
}

// --- Helper Components for Calendar ---
function CalendarCell({ date, isCurrentMonth, children }: any) {
  return (
    <div className={`min-h-[120px] p-2 relative group hover:bg-gray-50 transition-colors ${!isCurrentMonth ? 'bg-gray-50/30' : 'bg-white'}`}>
       <span className={`absolute top-2 right-3 text-xs font-medium ${isCurrentMonth ? 'text-gray-700' : 'text-gray-300'}`}>
         {date}
       </span>
       
       {/* Plus Icon on Hover (for empty cells) */}
       {!children && (
         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="w-6 h-6 rounded-full bg-blue-50 text-brand flex items-center justify-center text-xs">
              <i className="fa-solid fa-plus"></i>
            </button>
         </div>
       )}

       <div className="mt-6 space-y-1">
         {children}
       </div>
    </div>
  )
}

function EventCard({ color, time, staff }: { color: 'yellow' | 'green' | 'blue', time: string, staff: string }) {
  const styles = {
    yellow: "bg-[#D9A300] text-white", // Adjusted to match image gold/yellow
    green: "bg-[#28A745] text-white", // Adjusted to match image green
    blue: "bg-[#0074D9] text-white",
  };

  return (
    <div className={`${styles[color]} p-2 rounded-md shadow-sm text-[10px] leading-tight cursor-pointer hover:opacity-90 transition-opacity`}>
      <div className="font-bold mb-0.5">{time}</div>
      <div className="opacity-90 font-light">{staff}</div>
    </div>
  )
}
function CaregiversTab() {
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800">Caregivers List</h3>
      </div>
      <table className="w-full text-left border-collapse text-sm">
         <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
               <th className="p-3 rounded-l-lg">SN</th>
               <th className="p-3">Caregiver Name</th>
               <th className="p-3">Caregiver ID</th>
               <th className="p-3">Contact</th>
               <th className="p-3">Assignment Dates</th>
               <th className="p-3">Status</th>
               <th className="p-3 rounded-r-lg"></th>
            </tr>
         </thead>
         <tbody className="divide-y divide-gray-50">
            <tr>
               <td className="p-3">01</td>
               <td className="p-3 font-medium">Linda Thompson</td>
               <td className="p-3">Cl-10523</td>
               <td className="p-3">(415) 555-0145</td>
               <td className="p-3">15 May - 25 Jul, 2023</td>
               <td className="p-3"><span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-medium">Active</span></td>
               <td className="p-3 text-red-400 cursor-pointer"><i className="fa-regular fa-trash-can"></i></td>
            </tr>
            <tr>
               <td className="p-3">02</td>
               <td className="p-3 font-medium">Daniel Green</td>
               <td className="p-3">Cl-20475</td>
               <td className="p-3">(646) 555-3124</td>
               <td className="p-3">22 Jun - Oct, 2024</td>
               <td className="p-3"><span className="bg-green-50 text-green-600 px-2 py-1 rounded text-xs font-medium">Completed</span></td>
               <td className="p-3 text-red-400 cursor-pointer"><i className="fa-regular fa-trash-can"></i></td>
            </tr>
         </tbody>
      </table>
    </div>
  );
}

function NoteTab() {
  return (
    <div className="animate-fade-in">
       <div className="flex justify-between mb-6">
          <input type="text" placeholder="Search..." className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm w-64" />
          <button className="bg-[#0074D9] text-white px-4 py-2 rounded-lg text-sm font-medium">Create A Note</button>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <NoteCard title="Suffering with Headache" date="23 Feb, 2025" author="Rajesh Maharjan" color="blue" />
          <NoteCard title="Managing Chronic Pain" date="24 Feb, 2025" author="Anjali Prasad" color="green" />
          <NoteCard title="Post-Surgery Recovery" date="25 Feb, 2025" author="Michael Johnson" color="yellow" />
       </div>
    </div>
  );
}

function ADLTab() {
  return (
    <div className="animate-fade-in space-y-6">
       <div className="flex justify-between items-center">
          <div className="flex gap-4">
             <button className="px-4 py-1.5 rounded-full bg-white border border-gray-200 text-gray-700 text-sm font-medium shadow-sm">Care Plans</button>
             <button className="px-4 py-1.5 rounded-full text-gray-400 text-sm font-medium hover:bg-gray-50">Reports</button>
          </div>
          <button className="bg-[#0074D9] text-white px-4 py-2 rounded-lg text-sm font-medium">Add Care Plan</button>
       </div>
       
       <ADLSection title="Toilet/Elimination" items={["Assist with Commode", "Assist with Bed Pans"]} />
       <ADLSection title="Personal Care" items={["Assist with Bathing", "Assist with Dressing"]} />
       
       <div className="flex justify-end pt-4">
          <button className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium">Submit</button>
       </div>
    </div>
  );
}

function IncidentsTab() {
  const [showModal, setShowModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<any>(null);

  // Mock Data
  const incidents = [
    { id: 1, date: "01 April, 2025 | Saturday", time: "09:00 AM", caregiver: "Dr. Olivia Thompson", type: "Fall", location: "Bathroom", status: "Approved", description: "Patient slipped on wet floor.", action: "Assisted up, checked for injuries, none found." },
    { id: 2, date: "03 April, 2025 | Monday", time: "09:00 AM", caregiver: "Dr. Olivia Thompson", type: "Medication Error", location: "Bathroom", status: "Approved", description: "Missed morning dose.", action: "Administered dose late, noted in log." },
    { id: 3, date: "04 April, 2025 | Tuesday", time: "09:00 AM", caregiver: "Dr. Olivia Thompson", type: "Behavioral Issue", location: "Garden", status: "Approved", description: "Agitated behavior.", action: "Calmed patient down with conversation." },
    { id: 4, date: "05 April, 2025 | Wednesday", time: "09:00 AM", caregiver: "Dr. Olivia Thompson", type: "Fall", location: "Room", status: "Pending", description: "Tripped over rug.", action: "Pending review." },
  ];

  const handleClientClick = (incident: any) => {
    setSelectedIncident(incident);
    setShowModal(true);
  };

  return (
    <div className="animate-fade-in space-y-6">
       
       {/* --- Header & Controls --- */}
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h3 className="text-lg font-bold text-gray-800">Incidents</h3>
          <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors">
             Download Incidents
          </button>
       </div>

       {/* --- Filter Bar --- */}
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

       {/* --- Table --- */}
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
                         
                         {/* Client Name (Clickable Trigger) */}
                         <td className="p-4">
                            <button 
                                onClick={() => handleClientClick(item)}
                                className="flex items-center gap-3 group text-left w-full focus:outline-none"
                            >
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
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                               item.status === 'Approved' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
                            }`}>
                               {item.status}
                            </span>
                         </td>
                         <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                               <button className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 flex items-center justify-center transition-colors">
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
          <div className="p-4 border-t border-gray-100 flex justify-between items-center">
             <span className="text-xs text-gray-500">Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">1000</span> Results</span>
             <div className="flex items-center gap-2 text-xs font-medium">
                <button className="flex items-center gap-1 text-gray-500 hover:text-brand"><i className="fa-solid fa-chevron-left text-[10px]"></i> Previous</button>
                <button className="flex items-center gap-1 text-brand hover:text-blue-700 ml-2">Next <i className="fa-solid fa-chevron-right text-[10px]"></i></button>
             </div>
          </div>
       </div>

       {/* --- Render Popup Modal --- */}
       {showModal && selectedIncident && (
         <IncidentDetailModal 
            incident={selectedIncident} 
            onClose={() => setShowModal(false)} 
         />
       )}

    </div>
  );
}

// --- 2. New Incident Detail Modal (Using Portal) ---
function IncidentDetailModal({ incident, onClose }: { incident: any, onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden"; // Lock scroll
    return () => { document.body.style.overflow = "unset"; };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       
       <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] animate-slide-up relative">
          
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
             <div>
                <h2 className="text-xl font-bold text-gray-800">Incident Details</h2>
                <p className="text-sm text-gray-500 mt-1">Reviewing incident for <span className="text-[#0074D9] font-medium">Nina Mcintire</span></p>
             </div>
             <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                <i className="fa-solid fa-xmark text-lg"></i>
             </button>
          </div>

          {/* Body */}
          <div className="p-8 overflow-y-auto">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-1.5">
                   <label className="text-xs font-medium text-gray-500 uppercase">Incident Type</label>
                   <div className="text-sm font-semibold text-gray-800 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">{incident.type}</div>
                </div>
                <div className="space-y-1.5">
                   <label className="text-xs font-medium text-gray-500 uppercase">Status</label>
                   <div>
                     <span className={`inline-block px-3 py-1.5 rounded-lg text-xs font-semibold ${incident.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {incident.status}
                     </span>
                   </div>
                </div>
                <div className="space-y-1.5">
                   <label className="text-xs font-medium text-gray-500 uppercase">Date & Time</label>
                   <div className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                      <i className="fa-regular fa-calendar mr-2 text-gray-400"></i> {incident.date} at {incident.time}
                   </div>
                </div>
                <div className="space-y-1.5">
                   <label className="text-xs font-medium text-gray-500 uppercase">Location</label>
                   <div className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                      <i className="fa-solid fa-location-dot mr-2 text-gray-400"></i> {incident.location}
                   </div>
                </div>
             </div>

             <div className="mb-6">
                <label className="text-xs font-medium text-gray-500 uppercase mb-1.5 block">Caregiver Involved</label>
                <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl bg-gray-50/50">
                   <img src="https://i.pravatar.cc/150?img=12" alt="CG" className="w-10 h-10 rounded-full object-cover" />
                   <div>
                      <div className="text-sm font-bold text-gray-800">{incident.caregiver}</div>
                      <div className="text-xs text-gray-500">Caregiver ID: CG-8842</div>
                   </div>
                   <button className="ml-auto text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50">View Profile</button>
                </div>
             </div>

             <div className="space-y-6">
                <div className="space-y-1.5">
                   <label className="text-xs font-medium text-gray-500 uppercase">Description of Incident</label>
                   <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                      {incident.description || "No description provided."}
                   </p>
                </div>
                <div className="space-y-1.5">
                   <label className="text-xs font-medium text-gray-500 uppercase">Action Taken</label>
                   <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                      {incident.action || "No action recorded."}
                   </p>
                </div>
             </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
             <button onClick={onClose} className="px-5 py-2.5 border border-gray-200 rounded-lg text-gray-600 text-sm font-medium hover:bg-white transition-colors">
                Close
             </button>
             <button className="bg-[#0074D9] hover:bg-[#0062b8] text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-lg shadow-blue-900/10 transition-colors">
                Edit Details
             </button>
          </div>

       </div>
    </div>,
    document.body
  );
}

function MedicationTab() {
    return (
        <div className="animate-fade-in">
            <div className="flex justify-between mb-4"><h3 className="font-bold text-sm">Medication List</h3><button className="bg-[#0074D9] text-white px-4 py-2 rounded text-xs">Add Medication</button></div>
            <table className="w-full text-sm text-left"><thead className="bg-gray-50 text-xs text-gray-500 uppercase"><tr><th className="p-3">Medication</th><th className="p-3">Type</th><th className="p-3">Dose</th><th className="p-3">Freq</th></tr></thead>
            <tbody><tr><td className="p-3">Metformin</td><td className="p-3">Tablet</td><td className="p-3">500 mg</td><td className="p-3">Twice a day</td></tr></tbody></table>
        </div>
    )
}
function ScheduleReportTab() { return <div className="animate-fade-in"><h3 className="font-bold text-sm mb-4">Event History</h3><p className="text-gray-400 text-sm">No events found.</p></div> }
function ServiceAuthTab() { return <div className="animate-fade-in"><h3 className="font-bold text-sm mb-4">Service Authentication</h3><p className="text-gray-400 text-sm">No records found.</p></div> }
function BillingTab() { return <div className="flex flex-col items-center justify-center h-40 animate-fade-in"><h3 className="font-bold text-gray-800 text-lg">Needs to be Discuss</h3></div> }

// --- Reusable Small Components ---
function InfoItem({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <span className="block text-gray-400 text-xs mb-1">{label}</span>
      <span className="font-medium text-gray-800 text-sm">{value}</span>
    </div>
  );
}

function NoteCard({ title, date, author, color }: any) {
    return (
        <div className="border border-gray-100 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-bold text-blue-600 text-sm mb-2">{title}</h4>
            <p className="text-xs text-gray-500 mb-4 line-clamp-2">Here is a dummy note description...</p>
            <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                    <img src="https://i.pravatar.cc/150?img=3" className="w-6 h-6 rounded-full" />
                    <div className="text-[10px]">
                        <div className="font-bold text-gray-700">{author}</div>
                        <div className="text-gray-400">Caregiver</div>
                    </div>
                </div>
                <span className="text-[10px] text-gray-400">{date}</span>
            </div>
        </div>
    )
}

function ADLSection({ title, items }: { title: string, items: string[] }) {
    return (
        <div className="border border-gray-100 rounded-lg p-4">
            <h4 className="font-bold text-blue-600 text-sm mb-3 flex items-center gap-2">{title} <i className="fa-solid fa-pencil text-gray-400 text-xs"></i></h4>
            <div className="space-y-4">
                {items.map(item => (
                    <div key={item} className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                        <div>
                            <p className="font-medium text-sm text-gray-700">{item}</p>
                            <p className="text-xs text-gray-400">Description text...</p>
                        </div>
                        <div className="flex gap-1">
                            {['Sun','Mon','Tue','Wed','Thur','Fri','Sat'].map(d => (
                                <span key={d} className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded">{d}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}