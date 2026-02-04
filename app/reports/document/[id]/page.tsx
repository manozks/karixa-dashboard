"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

export default function SpecificDocumentPage({ params }: { params: { id: string } }) {
  // Modal States
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showReportSummaryModal, setShowReportSummaryModal] = useState(false);
  
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [initialModalMode, setInitialModalMode] = useState<"edit" | "preview">("edit");

  const reports = [
    { name: "Sophia Garcia", id: "0198", status: "Active", created: "Feb 01, 2023", last: "Feb 01, 2023", by: "Admin" },
    { name: "Emma Taylor", id: "0147", status: "Inactive", created: "Mar 15, 2023", last: "Mar 15, 2023", by: "Admin" },
    { name: "Ava Martinez", id: "0123", status: "Active", created: "Apr 20, 2023", last: "Apr 20, 2023", by: "Caregiver" },
  ];

  // 1. Handle Edit Icon Click -> Opens in "Edit" mode (Accordion View)
  const handleEditClick = (report: any) => {
    setSelectedReport(report);
    setInitialModalMode("edit");
    setShowReportSummaryModal(true);
  };

  // 2. Handle Eye Icon Click -> Opens in "Preview" mode (Table View)
  const handleEyeClick = (report: any) => {
    setSelectedReport(report);
    setInitialModalMode("preview");
    setShowReportSummaryModal(true);
  };

  return (
    <DashboardLayout>
      <div className="p-0 space-y-6 bg-gray-50 min-h-screen">
        
        {/* Back Button */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link href="/reports" className="hover:text-gray-800 flex items-center gap-1"><i className="fa-solid fa-chevron-left text-xs"></i> Back</Link>
        </div>

        {/* Document Header */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm p-6">
           <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">DMAS-302</h2>
              <div className="flex gap-2">
                 <button onClick={() => setShowDownloadModal(true)} className="w-8 h-8 border rounded flex items-center justify-center text-blue-500 hover:bg-blue-50 transition-colors">
                    <i className="fa-solid fa-download"></i>
                 </button>
                 <button onClick={() => setShowSettingsModal(true)} className="w-8 h-8 border rounded flex items-center justify-center text-blue-500 hover:bg-blue-50 transition-colors">
                    <i className="fa-solid fa-gear"></i>
                 </button>
                 <button className="bg-[#0074D9] text-white px-4 py-1.5 rounded text-sm hover:bg-[#0062b8]">Create Document</button>
              </div>
           </div>

           <div className="relative mb-4 w-64">
              <input className="pl-8 pr-4 py-1.5 border rounded-lg text-xs w-full outline-none focus:border-blue-500" placeholder="Search..." />
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-2 text-gray-400 text-xs"></i>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                 <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                    <tr><th className="p-4">Client Name</th><th className="p-4">Client ID</th><th className="p-4">Status</th><th className="p-4">Created On</th><th className="p-4">Last Update</th><th className="p-4">Last Update By</th><th className="p-4"></th></tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {reports.map((r, i) => (
                       <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4 flex items-center gap-2"><img src={`https://i.pravatar.cc/150?img=${i+20}`} className="w-6 h-6 rounded-full" /> {r.name}</td>
                          <td className="p-4 text-gray-600">{r.id}</td>
                          <td className="p-4"><span className={`px-2 py-0.5 rounded text-xs ${r.status==='Active'?'bg-green-50 text-green-600':'bg-red-50 text-red-600'}`}>{r.status}</span></td>
                          <td className="p-4 text-gray-600">{r.created}</td>
                          <td className="p-4 text-gray-600">{r.last}</td>
                          <td className="p-4"><span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs">{r.by}</span></td>
                          <td className="p-4 text-right flex justify-end gap-2 text-blue-500">
                             {/* Eye Icon -> Preview Mode */}
                             <i onClick={() => handleEyeClick(r)} className="fa-regular fa-eye cursor-pointer hover:bg-blue-50 p-1 rounded"></i>
                             
                             {/* Edit Icon -> Edit Mode */}
                             <i onClick={() => handleEditClick(r)} className="fa-solid fa-pen cursor-pointer hover:bg-blue-50 p-1 rounded"></i>
                             
                             <i className="fa-regular fa-trash-can text-red-500 cursor-pointer hover:bg-red-50 p-1 rounded"></i>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {/* --- MODALS --- */}
        {showDownloadModal && <DownloadModal onClose={() => setShowDownloadModal(false)} />}
        {showSettingsModal && <SettingsModal onClose={() => setShowSettingsModal(false)} />}
        
        {/* Pass the initial mode (edit vs preview) to the modal */}
        {showReportSummaryModal && (
            <ReportSummaryModal 
                onClose={() => setShowReportSummaryModal(false)} 
                initialMode={initialModalMode} 
            />
        )}

      </div>
    </DashboardLayout>
  );
}

// =========================================================================
// MODALS
// =========================================================================

// --- REPORT SUMMARY MODAL (Handles both Edit and Preview modes) ---
function ReportSummaryModal({ onClose, initialMode }: { onClose: () => void, initialMode: "edit" | "preview" }) {
  const [isEditMode, setIsEditMode] = useState(initialMode === "edit");
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  // Toggle Accordion in Edit Mode
  const toggleDay = (day: string) => {
    if (expandedDay === day) {
        setExpandedDay(null);
    } else {
        setExpandedDay(day);
    }
  };

  const activities = ['Toileting', 'Ambulation/ Transfer', 'Eating/ Feeding', 'Meals / Snack', 'Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Appetizers', 'Beverages', 'Supervision'];
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       {/* Width adjusts based on mode to match images */}
       <div className={`bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-slide-up relative ${isEditMode ? 'w-full max-w-4xl' : 'w-full max-w-4xl'}`}>
          
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
             <h2 className="text-xl font-bold text-gray-800">Report Summary</h2>
             <button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button>
          </div>
          
          <div className="p-8 overflow-y-auto flex-1 bg-gray-50/30 custom-scrollbar">
             
             {/* Header with Toggle */}
             <div className="text-center mb-8">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">DMAS 302</p>
                <h3 className="text-xl font-bold text-gray-800">Adult Day Health Care Daily Log</h3>
                
                {/* Toggle Switch */}
                <div className="flex justify-center items-center gap-3 mt-3">
                   <span className={`text-xs font-medium ${isEditMode ? 'text-gray-800' : 'text-gray-400'}`}>Edit Report</span>
                   <button 
                      onClick={() => setIsEditMode(!isEditMode)} 
                      className={`w-10 h-5 rounded-full p-0.5 transition-colors relative ${!isEditMode ? 'bg-green-500' : 'bg-gray-300'}`}
                   >
                      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${!isEditMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
                   </button>
                   <span className={`text-xs font-medium ${!isEditMode ? 'text-gray-800' : 'text-gray-400'}`}>Preview</span>
                </div>
             </div>

             <div className="space-y-6">
                
                {/* Basic Info */}
                <div className={`grid gap-6 ${isEditMode ? 'grid-cols-2' : 'grid-cols-3'}`}>
                   <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-500">Recipient Name</label>
                        {isEditMode ? (
                            <input className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:border-[#0074D9]" placeholder="Enter"/>
                        ) : (
                            <p className="text-sm font-bold text-gray-800">Rajesh Maharjan</p>
                        )}
                   </div>
                   <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-500">Medical ID</label>
                        {isEditMode ? (
                            <input className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:border-[#0074D9]" placeholder="Enter"/>
                        ) : (
                            <p className="text-sm font-bold text-gray-800">XC14R56</p>
                        )}
                   </div>
                   {!isEditMode && (
                       <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-500">Report Date</label>
                            <p className="text-sm font-bold text-gray-800">12 Apr, 2025 - 19 Apr, 2025</p>
                       </div>
                   )}
                </div>

                {/* --- EDIT MODE: ACCORDION VIEW (image_c3cb39.png) --- */}
                {isEditMode && (
                    <div>
                        <h4 className="text-sm font-bold text-gray-700 mb-3">Daily Report</h4>
                        <div className="grid grid-cols-2 gap-4">
                            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                                <div key={day} className={`bg-white border border-gray-200 rounded-lg overflow-hidden transition-all ${expandedDay === day ? 'col-span-2' : ''}`}>
                                    <div 
                                        onClick={() => toggleDay(day)} 
                                        className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50"
                                    >
                                        <span className="text-sm font-medium text-gray-700">{day}</span>
                                        <i className={`fa-solid fa-chevron-down text-gray-400 text-xs transition-transform ${expandedDay === day ? 'rotate-180' : ''}`}></i>
                                    </div>

                                    {expandedDay === day && (
                                        <div className="p-6 border-t border-gray-100 bg-gray-50/50 animate-fade-in">
                                            <div className="grid grid-cols-2 gap-6 mb-4">
                                                <div className="space-y-1"><label className="text-xs text-gray-500">Date</label><input type="date" className="w-full border rounded-lg p-2 text-sm bg-white" /></div>
                                                <div className="space-y-1"><label className="text-xs text-gray-500">Time-In</label><input type="text" placeholder="Enter" className="w-full border rounded-lg p-2 text-sm bg-white" /></div>
                                                <div className="space-y-1"><label className="text-xs text-gray-500">Time-Out</label><input type="text" placeholder="Enter" className="w-full border rounded-lg p-2 text-sm bg-white" /></div>
                                                <div className="space-y-1"><label className="text-xs text-gray-500">Hours</label><input type="text" placeholder="Enter" className="w-full border rounded-lg p-2 text-sm bg-white" /></div>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                                                {activities.map(item => (
                                                    <label key={item} className="flex items-center gap-2 text-sm text-gray-700">
                                                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#0074D9] focus:ring-[#0074D9]" /> {item}
                                                    </label>
                                                ))}
                                            </div>

                                            <div className="mt-6 flex justify-end">
                                                <button className="bg-[#0074D9] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#0062b8]">Save</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- PREVIEW MODE: TABLE VIEW (image_c3d588.png) --- */}
                {!isEditMode && (
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                                <tr>
                                    <th className="p-3 pl-4">Activity</th>
                                    {weekDays.map(d => <th key={d} className="p-3 text-center w-16">{d}</th>)}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {activities.slice(0, 8).map((act, i) => (
                                    <tr key={i} className="hover:bg-gray-50">
                                        <td className="p-3 pl-4 text-gray-700">{act}</td>
                                        {weekDays.map((d, j) => (
                                            <td key={j} className="p-3 text-center">
                                                {/* Mock Logic: Show tick for some, dash for others */}
                                                {(i + j) % 3 !== 0 ? (
                                                    <i className="fa-solid fa-circle-check text-green-500"></i>
                                                ) : (
                                                    <span className="text-gray-300">-</span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Footer Section (Signatures & Comments) */}
                <div className={`grid gap-6 pt-4 ${isEditMode ? 'grid-cols-2 border-t border-gray-200' : 'grid-cols-2'}`}>
                   <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-500">Weekly Comment & Date</label>
                        {isEditMode ? (
                            <textarea className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white h-24 resize-none focus:outline-none focus:border-[#0074D9]" placeholder="Enter"></textarea>
                        ) : (
                            <div className="w-full bg-[#F8FAFC] border border-gray-100 rounded-lg p-4 text-sm text-gray-700 h-24">
                                This is Adult Day Health Care Daily Log
                            </div>
                        )}
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                      {/* Recipient Signature */}
                      <div className="flex flex-col gap-1">
                          <label className="text-xs text-gray-500 text-center pt-2">Recipient Signature</label>
                          <div className="border border-gray-200 bg-white rounded-lg p-2 flex flex-col items-center justify-center h-20 text-center cursor-pointer hover:bg-gray-50">
                             <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Signature_sample.svg" className="h-6 opacity-70"/>
                          </div>
                          {!isEditMode && <p className="text-xs text-center font-medium text-gray-700">Rajesh Maharjan</p>}
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-500 mt-2">Recipient Name</label>
                            <input className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:border-[#0074D9]" placeholder="Enter" />
                          </div>
                         
                      </div>

                      {/* Staff Signature */}
                      <div className="flex flex-col gap-1">
                          <label className="text-xs text-gray-500 text-center pt-2">ADHC Staff Signature</label>
                          <div className="border border-gray-200 bg-white rounded-lg p-2 flex flex-col items-center justify-center h-20 text-center cursor-pointer hover:bg-gray-50">
                             <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Signature_sample.svg" className="h-6 opacity-70"/>
                          </div>
                          {!isEditMode && <p className="text-xs text-center font-medium text-gray-700">Fab Sechuri</p>}
                               <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-500 mt-2">Staff Name</label>
                            <input className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:border-[#0074D9]" placeholder="Enter" />
                          </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="p-6 border-t flex justify-end gap-3 bg-white rounded-b-2xl">
             <button onClick={onClose} className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">Back</button>
             <button className="px-6 py-2.5 bg-[#0074D9] text-white rounded-lg text-sm font-medium hover:bg-[#0062b8]">Save</button>
          </div>
       </div>
    </div>, document.body
  );
}

// ... (Other Modals: DownloadModal, SettingsModal remain unchanged from previous response)
function DownloadModal({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl flex flex-col animate-scale-up relative">
          <div className="flex justify-between items-center p-6 border-b border-gray-100"><h2 className="text-xl font-bold text-gray-800">Download</h2><button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button></div>
          <div className="p-6 space-y-4">
             <div className="space-y-1"><label className="text-xs font-medium text-gray-500">Date</label><div className="relative"><input type="date" placeholder="DD / MM / YYYY - DD / MM / YYYY" className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500" /></div></div>
          </div>
          <div className="p-6 border-t flex justify-end"><button onClick={onClose} className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0062b8]">Download</button></div>
       </div>
    </div>, document.body
  );
}

function SettingsModal({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col animate-scale-up relative">
          <div className="flex justify-between items-center p-6 border-b border-gray-100"><h2 className="text-xl font-bold text-gray-800">Setting</h2><button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button></div>
          <div className="p-6 space-y-6">
             <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Days</label>
                <div className="flex flex-wrap gap-2">
                   {['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'].map(d => <span key={d} className={`px-3 py-1 rounded-full text-xs font-medium border cursor-pointer ${d==='Sunday'||d==='Monday'?'bg-green-50 text-green-700 border-green-200':'bg-white text-gray-500 border-gray-200'}`}>{d}</span>)}
                </div>
             </div>
             <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Document Type</label>
                <div className="grid grid-cols-3 gap-y-3 gap-x-2">
                   {['Toileting', 'Ambulation/Transfer', 'Eating/Feeding', 'Meals/Snack', 'Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Appetizers', 'Beverages', 'Supervision'].map(t => (
                      <label key={t} className="flex items-center gap-2 text-xs text-gray-600"><input type="checkbox" className="rounded" /> {t}</label>
                   ))}
                </div>
                <button className="text-blue-500 text-xs font-medium mt-3">+ Add More</button>
             </div>
             <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Weekly Comment</label>
                <textarea className="w-full border border-gray-200 rounded-lg p-3 text-sm h-24 resize-none outline-none focus:border-blue-500" placeholder="Enter Weekly Comment"></textarea>
             </div>
          </div>
          <div className="p-6 border-t flex justify-end"><button onClick={onClose} className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0062b8]">Confirm</button></div>
       </div>
    </div>, document.body
  );
}