"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import DashboardLayout from "@/components/DashboardLayout";


export default function SchedulePage() {
  // State for View Mode (Clients vs Caregiver)
  const [viewMode, setViewMode] = useState<"Clients" | "Caregiver">("Clients");
  
  // Modal States
  const [showCreateVisit, setShowCreateVisit] = useState(false);
  const [showVisitSummary, setShowVisitSummary] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Mock Data for Lists
  const clients = [
    { id: "125635", name: "Marcus Tan", img: 1 },
    { id: "125636", name: "Sophia Lee", img: 2 },
    { id: "125637", name: "Liam Chen", img: 3 },
    { id: "125642", name: "Ava Garcia", img: 4 },
    { id: "125643", name: "Ethan Smith", img: 5 },
    { id: "125644", name: "Noah Williams", img: 6 },
    { id: "125645", name: "Emma Brown", img: 7 },
  ];

  const caregivers = [
    { id: "CG-125634", name: "Dr. Jaxon Smith", img: 12 },
    { id: "CG-125635", name: "Dr. Liam Johnson", img: 11 },
    { id: "CG-125636", name: "Dr. Sarah Thompson", img: 10 },
    { id: "CG-125637", name: "Dr. Alex Martinez", img: 9 },
  ];

  // Logic to open Summary Modal when an event is clicked
  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setShowVisitSummary(true);
  };

  // Logic to proceed from Summary to Approval
  const handleApproveClick = () => {
    setShowVisitSummary(false);
    setTimeout(() => setShowApprovalModal(true), 200);
  };

  return (
    <DashboardLayout>
      {/* RESPONSIVE LAYOUT CONTAINER:
         - Mobile/Tablet: min-h-screen, flex-col (Stacks vertically), auto height (Scrolls body)
         - Desktop (lg): h-screen, overflow-hidden (Fixed height, internal scrolling)
      */}
      <div className="flex flex-col min-h-screen lg:h-screen bg-gray-50/50 p-4 lg:p-0 lg:overflow-hidden pb-24 lg:pb-6">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col space-y-4 mb-4 flex-shrink-0">
           <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-800">Schedule</h1>
              <p className="text-xs text-gray-500">Dashboard / Schedule</p>
           </div>

           {/* Controls Bar */}
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-3 rounded-xl border border-gray-200 shadow-sm gap-4">
              
              {/* Toggle Switch */}
              <div className="flex bg-gray-100 p-1 rounded-lg w-full md:w-auto">
                 <button 
                    onClick={() => setViewMode("Clients")}
                    className={`flex-1 md:flex-none px-6 py-2 text-sm font-medium rounded-md transition-all ${viewMode === "Clients" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"}`}
                 >
                    Clients
                 </button>
                 <button 
                    onClick={() => setViewMode("Caregiver")}
                    className={`flex-1 md:flex-none px-6 py-2 text-sm font-medium rounded-md transition-all ${viewMode === "Caregiver" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"}`}
                 >
                    Caregiver
                 </button>
              </div>

              {/* Legend - Hidden on small mobile, visible on lg */}
              <div className="hidden xl:flex gap-4 text-[10px] items-center flex-wrap">
                 <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Scheduled</span>
                 <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-300"></span> Unassigned</span>
                 <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> Completed</span>
                 <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Verified</span>
                 <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-black"></span> Missed</span>
                 <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Cancelled</span>
              </div>
           </div>
        </div>

        {/* --- Main Content Split --- */}
        {/* Mobile: Flex-col (stacked), Desktop: Flex-row (side-by-side) */}
        <div className="flex flex-col lg:flex-row flex-1 gap-6 lg:overflow-hidden">
           
           {/* Left Sidebar (List) */}
           {/* Mobile: w-full, h-80 (scrollable area). Desktop: w-80, h-full */}
           <div className="w-full lg:w-80 flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex-shrink-0 h-96 lg:h-full">
              <div className="p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
                 <h3 className="font-bold text-gray-800 mb-3">{viewMode === "Clients" ? "All Clients List" : "All Caregiver List"}</h3>
                 <div className="relative">
                    <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                    <input type="text" placeholder="Search Anything..." className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-xs outline-none focus:border-brand" />
                 </div>
              </div>
              <div className="overflow-y-auto flex-1 p-2 space-y-2">
                 {(viewMode === "Clients" ? clients : caregivers).map((item) => (
                    <div key={item.id} className="p-3 border border-gray-100 rounded-lg hover:bg-blue-50 hover:border-blue-100 cursor-pointer transition-colors group">
                       <div className="flex items-center gap-3">
                          <img src={`https://i.pravatar.cc/150?img=${item.img}`} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                             <h4 className="text-sm font-bold text-gray-800">{item.name}</h4>
                             <p className="text-[10px] text-gray-500">ID: {item.id}</p>
                          </div>
                       </div>
                       <div className="flex justify-between mt-3 text-gray-400 group-hover:text-blue-500">
                          <i className="fa-regular fa-eye text-xs"></i>
                          <i className="fa-regular fa-message text-xs"></i>
                          <i className="fa-regular fa-calendar text-xs"></i>
                          <i className="fa-solid fa-dollar-sign text-xs"></i>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Right Side (Calendar) */}
           <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden h-[600px] lg:h-auto">
              
              {/* Calendar Toolbar */}
              <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white sticky left-0">
                 <div>
                    <h3 className="font-bold text-gray-800 text-sm md:text-base">23 April, 2025 | Wednesday <span className="text-[#0074D9]">• Today</span></h3>
                 </div>
                 <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap">
                       <i className="fa-regular fa-calendar mr-2"></i> 23 Apr - 29 Apr <i className="fa-solid fa-chevron-right ml-2"></i>
                    </div>
                    <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium bg-white outline-none"><option>Monthly</option></select>
                    <button 
                       onClick={() => setShowCreateVisit(true)}
                       className="bg-[#0074D9] text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-[#0062b8] ml-auto sm:ml-0"
                    >
                       Create Visit
                    </button>
                 </div>
              </div>

              {/* Calendar Grid Container */}
              {/* On mobile: overflow-x-auto allows horizontal scrolling for the grid */}
              <div className="flex-1 overflow-auto bg-gray-50">
                 <div className="min-w-[800px] h-full flex flex-col bg-white">
                    {/* Days Header */}
                    <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50/50 sticky top-0 z-10">
                        {["Sun", "Mon", "Tue", "Wed", "Thru", "Fri", "Sat"].map(d => (
                            <div key={d} className="py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">{d}</div>
                        ))}
                    </div>
                    
                    {/* Grid Body */}
                    <div className="grid grid-cols-7 divide-x divide-gray-100 divide-y flex-1">
                        {[...Array(35)].map((_, i) => {
                        const date = i > 2 ? i - 2 : 30 + i; 
                        return (
                            <div key={i} className="p-2 min-h-[120px] hover:bg-gray-50 transition-colors relative flex flex-col">
                                <div className="text-right text-xs text-gray-400 mb-2">{date}</div>
                                
                                {/* Mock Events */}
                                {i === 24 && (
                                    <div onClick={() => handleEventClick({id: 1})} className="bg-[#D9A300] text-white p-1.5 rounded shadow-sm text-[10px] cursor-pointer hover:opacity-90 mb-1 animate-fade-in">
                                    <div className="font-bold truncate">7 AM - 3 PM | 8 Hours</div>
                                    <div className="truncate">Juan, Chinchu</div>
                                    </div>
                                )}
                                {i === 25 && (
                                    <div onClick={() => handleEventClick({id: 2})} className="bg-[#28A745] text-white p-1.5 rounded shadow-sm text-[10px] cursor-pointer hover:opacity-90 mb-1 animate-fade-in">
                                    <div className="font-bold truncate">7 AM - 3 PM | 8 Hours</div>
                                    <div className="truncate">Juan, Chinchu</div>
                                    </div>
                                )}
                                {(i === 26 || i === 27) && (
                                    <div onClick={() => handleEventClick({id: 3})} className="bg-[#28A745] text-white p-1.5 rounded shadow-sm text-[10px] cursor-pointer hover:opacity-90 mb-1 animate-fade-in">
                                    <div className="font-bold truncate">7 AM - 3 PM | 8 Hours</div>
                                    <div className="truncate">Juan, Chinchu</div>
                                    </div>
                                )}
                                {i === 33 && (
                                    <div onClick={() => handleEventClick({id: 4})} className="bg-[#0074D9] text-white p-1.5 rounded shadow-sm text-[10px] cursor-pointer hover:opacity-90 mb-1 animate-fade-in">
                                    <div className="font-bold truncate">7 AM - 3 PM | 8 Hours</div>
                                    <div className="truncate">Juan, Chinchu</div>
                                    </div>
                                )}
                            </div>
                        )
                        })}
                    </div>
                 </div>
              </div>
           </div>

        </div>

        {/* --- MODALS --- */}
        {showCreateVisit && <CreateVisitModal onClose={() => setShowCreateVisit(false)} />}
        {showVisitSummary && <VisitSummaryModal onApprove={handleApproveClick} onClose={() => setShowVisitSummary(false)} />}
        {showApprovalModal && <ApprovalNoteModal onClose={() => setShowApprovalModal(false)} />}

      </div>
    </DashboardLayout>
  );
}

// =========================================================================
// 1. CREATE VISIT MODAL (3-Step Wizard) - Responsive
// =========================================================================
function CreateVisitModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh] animate-slide-up relative mx-4">
          <div className="flex justify-between items-center p-6 border-b border-gray-100"><h2 className="text-xl font-bold text-gray-800">Create Visit</h2><button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button></div>
          
          {/* Responsive Stepper */}
          <div className="pt-6 px-4 md:px-8 flex justify-center bg-gray-50/30 pb-4">
             <div className="flex items-center gap-2 md:gap-4 bg-blue-50/50 px-4 py-2 rounded-full border border-blue-100 min-w-max">
                <div className={`flex items-center gap-2 ${step>=1?'text-[#0074D9]':'text-gray-400'}`}><span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step>=1 ? 'bg-[#0074D9] text-white' : 'bg-gray-200 text-gray-500'}`}>1</span> <span className="font-medium text-xs md:text-sm">Basic Info</span></div>
                <div className="w-4 md:w-8 h-px bg-gray-300"></div>
                <div className={`flex items-center gap-2 ${step>=2?'text-[#0074D9]':'text-gray-400'}`}><span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step>=2 ? 'bg-[#0074D9] text-white' : 'bg-gray-200 text-gray-500'}`}>2</span> <span className="font-medium text-xs md:text-sm">Accounting</span></div>
                <div className="w-4 md:w-8 h-px bg-gray-300"></div>
                <div className={`flex items-center gap-2 ${step>=3?'text-[#0074D9]':'text-gray-400'}`}><span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step>=3 ? 'bg-[#0074D9] text-white' : 'bg-gray-200 text-gray-500'}`}>3</span> <span className="font-medium text-xs md:text-sm">Complete</span></div>
             </div>
          </div>

          <div className="p-6 md:p-8 overflow-y-auto flex-1">
             {step === 1 && (
                <div className="space-y-6 animate-slide-up">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1"><label className="text-sm font-medium text-gray-700">Client</label><select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm text-gray-500"><option>Select or Enter</option></select></div>
                      <div className="space-y-1"><label className="text-sm font-medium text-gray-700">Employer</label><select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm text-gray-500"><option>Select or Enter</option></select></div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-1"><label className="text-sm font-medium text-gray-700">Start Date</label><input type="date" placeholder="dd/mm/yyyy" className="w-full border rounded-lg p-2.5 text-sm"/></div>
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
                   <div className="flex items-center gap-2"><input type="checkbox" /><label className="text-sm text-gray-600">Flexible Time</label></div>
                   <div className="space-y-1"><label className="text-sm font-medium text-gray-700">Frequency</label><div className="flex gap-2"><select className="flex-1 border rounded-lg p-2.5 text-sm"><option>Select</option></select><button className="px-4 border rounded-lg text-sm bg-gray-50">Custom</button></div></div>
                   <div className="space-y-1"><label className="text-sm font-medium text-gray-700">Notes</label><textarea className="w-full border rounded-lg p-2.5 text-sm h-20" placeholder="Start typing..."></textarea></div>
                </div>
             )}
             {step === 2 && (
                <div className="space-y-6 animate-slide-up">
                   <div className="space-y-1"><label className="text-xs font-medium text-gray-700">Service Type</label><input className="w-full border rounded-lg p-2.5 text-sm" placeholder="Enter or Select"/></div>
                   <div className="space-y-1"><label className="text-xs font-medium text-gray-700">Bill Rate Hourly</label><div className="flex gap-4"><select className="flex-1 border rounded-lg p-2.5 text-sm"><option>Select</option></select><input className="flex-1 border rounded-lg p-2.5 text-sm" placeholder="Custom"/></div></div>
                   <div className="space-y-1"><label className="text-xs font-medium text-gray-700">Pay Rate</label><div className="flex gap-4"><select className="flex-1 border rounded-lg p-2.5 text-sm"><option>Select</option></select><input className="flex-1 border rounded-lg p-2.5 text-sm" placeholder="Custom"/></div></div>
                </div>
             )}
             {step === 3 && <div className="flex flex-col items-center justify-center h-full py-10"><div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl mb-4"><i className="fa-solid fa-check"></i></div><h3 className="text-xl font-bold">Success!</h3></div>}
          </div>

          <div className="p-6 border-t flex justify-end gap-3 bg-gray-50/50">
             {step === 1 && <button onClick={() => setStep(2)} className="px-6 py-2.5 bg-[#0074D9] text-white rounded-lg text-sm font-medium">Continue</button>}
             {step === 2 && <><button onClick={() => setStep(1)} className="px-6 py-2.5 border rounded-lg text-sm">Back</button><button onClick={() => setStep(3)} className="px-6 py-2.5 bg-[#0074D9] text-white rounded-lg text-sm font-medium">Schedule</button></>}
             {step === 3 && <button onClick={onClose} className="px-6 py-2.5 bg-[#0074D9] text-white rounded-lg text-sm font-medium">Finish</button>}
          </div>
       </div>
    </div>, document.body
  );
}

// =========================================================================
// 2. VISIT SUMMARY MODAL
// =========================================================================
function VisitSummaryModal({ onApprove, onClose }: { onApprove: () => void, onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-6xl shadow-2xl flex flex-col max-h-[95vh] animate-slide-up relative mx-4">
          <div className="flex justify-between items-center p-6 border-b border-gray-100"><h2 className="text-xl font-bold">Visit Summary</h2><button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button></div>
          <div className="p-6 md:p-8 overflow-y-auto bg-gray-50/30">
             <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-center mb-6"><p className="text-sm text-blue-800 font-medium">Early Clock in - Early Clock out</p><p className="text-xs text-blue-600">16 June, 2025 | Tuesday • 11:30 AM - 2:00 PM</p></div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50/50 border border-green-100 p-4 rounded-xl relative"><span className="absolute top-4 right-4 text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold uppercase">Client</span><div className="flex items-center gap-3 mb-2"><img src="https://i.pravatar.cc/150?img=1" className="w-10 h-10 rounded-full" /><h3 className="font-bold text-gray-800">Chen, Yueqiu</h3></div><p className="text-xs text-gray-500">2231 Colts Neck RD 412</p></div>
                <div className="bg-white border border-gray-200 p-4 rounded-xl relative"><span className="absolute top-4 right-4 text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-bold uppercase">Caregiver</span><div className="flex items-center gap-3 mb-2"><img src="https://i.pravatar.cc/150?img=12" className="w-10 h-10 rounded-full" /><h3 className="font-bold text-gray-800">Surles, Michael</h3></div><p className="text-xs text-gray-500">Specialist: PCA</p></div>
             </div>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                   <div><h4 className="text-xs font-bold text-gray-700 uppercase mb-3">Arrival</h4><div className="text-xs space-y-2"><div className="flex justify-between"><span>Scheduled</span><span className="font-medium">11:30 AM</span></div><div className="flex justify-between"><span>Corrected</span><span className="bg-white border px-2 py-1 rounded">11:21 AM</span></div></div></div>
                   <div><h4 className="text-xs font-bold text-gray-700 uppercase mb-3">Departure</h4><div className="text-xs space-y-2"><div className="flex justify-between"><span>Scheduled</span><span className="font-medium">11:30 AM</span></div><div className="flex justify-between"><span>Corrected</span><span className="bg-white border px-2 py-1 rounded">11:21 AM</span></div></div></div>
                </div>
                <div className="bg-white p-2 rounded-xl border h-40 relative"><img src="/map-placeholder.png" className="opacity-50 w-full h-full object-cover" /><span className="absolute bottom-2 left-2 bg-yellow-50 text-[10px] px-2 py-1 border border-yellow-200 rounded text-yellow-700">Needs Approval</span></div>
             </div>
             <div><h4 className="text-sm font-bold text-gray-800 mb-3">Completed Tasks</h4><div className="grid grid-cols-2 sm:grid-cols-4 gap-4">{['Bathing', 'Mouth Care', 'Dressing', 'Meal Prep'].map(t => <div key={t} className="flex items-center gap-2"><div className="w-4 h-4 bg-[#0074D9] rounded flex items-center justify-center"><i className="fa-solid fa-check text-white text-[10px]"></i></div><span className="text-xs text-gray-600">{t}</span></div>)}</div></div>
          </div>
          <div className="p-6 border-t flex justify-end gap-3 bg-white"><button onClick={onClose} className="px-6 py-2.5 border rounded-lg text-sm">Back</button><button onClick={onApprove} className="px-6 py-2.5 bg-[#0074D9] text-white rounded-lg text-sm">Approve Visit</button></div>
       </div>
    </div>, document.body
  );
}

// =========================================================================
// 3. APPROVAL NOTE MODAL
// =========================================================================
function ApprovalNoteModal({ onClose }: { onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col animate-scale-up mx-4">
          <div className="flex justify-between items-center p-6 border-b border-gray-100"><h2 className="text-xl font-bold">Approval Note</h2><button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button></div>
          <div className="p-6 space-y-4">
             <div className="space-y-1"><label className="text-xs font-medium text-gray-500">Approved By</label><input className="w-full border rounded-lg p-2.5 text-sm" placeholder="Enter"/></div>
             <div className="space-y-1"><label className="text-xs font-medium text-gray-500">Date</label><input type="date" className="w-full border rounded-lg p-2.5 text-sm" placeholder="dd/mm/yyyy"/></div>
             <div className="space-y-1"><label className="text-xs font-medium text-gray-500">Reason</label><select className="w-full border rounded-lg p-2.5 text-sm"><option>Select</option></select></div>
             <div className="space-y-1"><label className="text-xs font-medium text-gray-500">Notes</label><textarea className="w-full border rounded-lg p-2.5 text-sm h-24" placeholder="Type..."></textarea></div>
             <div className="flex gap-4 pt-2"><label className="flex gap-2 text-sm"><input type="radio" name="app" /> Needs Approval</label><label className="flex gap-2 text-sm"><input type="radio" name="app" defaultChecked /> Approved for Billing</label></div>
          </div>
          <div className="p-6 border-t flex justify-end"><button onClick={onClose} className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium">Approved</button></div>
       </div>
    </div>, document.body
  );
}