"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

export default function ClientReportPage({ params }: { params: { id: string } }) {
  // Modal States
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showReportSummaryModal, setShowReportSummaryModal] = useState(false);
  
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [initialModalMode, setInitialModalMode] = useState<"edit" | "preview">("edit");

  // Mock Data
  const reports = [
    { id: 1, name: "DMAS 302", created: "Feb 01, 2023", updated: "Feb 04, 2023", expiry: "Feb 19, 2023", by: "Admin" },
    { id: 2, name: "DMAS 302", created: "Mar 08, 2023", updated: "March 10, 2023", expiry: "Mar 18, 2023", by: "Admin" },
    { id: 3, name: "DMAS 302", created: "Nov 10, 2023", updated: "Nov 13, 2023", expiry: "Nov 23, 2023", by: "Admin" },
    { id: 4, name: "DMAS 302", created: "Feb 05, 2023", updated: "Feb 09, 2023", expiry: "Feb 20, 2023", by: "Caregiver" },
    { id: 5, name: "DMAS 302", created: "Nov 10, 2023", updated: "Nov 15, 2023", expiry: "Nov 17, 2023", by: "Admin" },
    { id: 6, name: "DMAS 302", created: "Feb 22, 2023", updated: "Feb 24, 2023", expiry: "Feb 05, 2023", by: "Caregiver" },
    { id: 7, name: "DMAS 302", created: "Nov 19, 2023", updated: "Nov 20, 2023", expiry: "Nov 10, 2023", by: "Admin" },
    { id: 8, name: "DMAS 302", created: "Feb 20, 2023", updated: "Feb 21, 2023", expiry: "Feb 05, 2023", by: "Caregiver" },
  ];

  // 1. Handle Edit Icon Click -> Opens in "Edit" mode
  const handleEditClick = (report: any) => {
    setSelectedReport(report);
    setInitialModalMode("edit");
    setShowReportSummaryModal(true);
  };

  // 2. Handle Eye Icon Click -> Opens in "Preview" mode
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

        {/* Profile Header Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
           <div className="flex items-center gap-4 mb-6">
              <img src="https://i.pravatar.cc/150?img=5" className="w-16 h-16 rounded-full object-cover border-4 border-gray-100" />
              <div>
                 <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold text-gray-800">Sophia Garcia</h1>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">Active</span>
                 </div>
                 <p className="text-sm text-gray-500 mt-1">1509 Oakview Dr. I McLean VA 22101</p>
              </div>
           </div>
           
           <div className="grid grid-cols-4 gap-12 text-sm border-t border-gray-100 pt-6">
              <div><p className="text-xs text-gray-500 mb-1">Client ID</p><p className="font-bold text-gray-800">1322</p></div>
              <div><p className="text-xs text-gray-500 mb-1">Caregiver</p><p className="font-bold text-gray-800">Unassign</p></div>
              <div><p className="text-xs text-gray-500 mb-1">Mobile</p><p className="font-bold text-gray-800">(703) 981-7142</p></div>
              <div><p className="text-xs text-gray-500 mb-1">Emergency No.</p><p className="font-bold text-gray-800">(703) 981-7142</p></div>
           </div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center">
           <div className="relative w-64">
              <input 
                 className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-full outline-none focus:border-[#0074D9] bg-white" 
                 placeholder="Search..." 
              />
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
           </div>
           <div className="flex gap-3">
              <button 
                onClick={() => setShowDownloadModal(true)}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#0074D9] text-[#0074D9] hover:bg-blue-50 bg-white"
              >
                 <i className="fa-solid fa-download"></i>
              </button>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="bg-[#0074D9] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#0062b8]"
              >
                 Create Report
              </button>
           </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
           <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                 <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold border-b border-gray-100">
                    <tr>
                       <th className="p-4 pl-6">ID</th>
                       <th className="p-4">Document Name</th>
                       <th className="p-4">Created On</th>
                       <th className="p-4">Latest Update</th>
                       <th className="p-4">Expiry Date</th>
                       <th className="p-4">Created By</th>
                       <th className="p-4 pr-6"></th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {reports.map((r, i) => (
                       <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4 pl-6 text-gray-500">{r.id}</td>
                          <td className="p-4 font-medium text-gray-800">{r.name}</td>
                          <td className="p-4 text-gray-600">{r.created}</td>
                          <td className="p-4 text-gray-600">{r.updated}</td>
                          <td className="p-4 text-gray-600">{r.expiry}</td>
                          <td className="p-4">
                             <span className={`px-3 py-1 rounded-full text-xs font-medium border ${r.by === 'Admin' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-blue-50 text-[#0074D9] border-blue-100'}`}>
                                {r.by}
                             </span>
                          </td>
                          <td className="p-4 pr-6 text-right">
                             <div className="flex justify-end gap-2">
                                <button 
                                    onClick={() => handleEyeClick(r)}
                                    className="w-7 h-7 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors"
                                >
                                   <i className="fa-regular fa-eye text-xs"></i>
                                </button>
                                <button 
                                    onClick={() => handleEditClick(r)}
                                    className="w-7 h-7 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center hover:bg-yellow-100 transition-colors"
                                >
                                   <i className="fa-solid fa-pencil text-xs"></i>
                                </button>
                                <button onClick={() => setShowDownloadModal(true)} className="w-7 h-7 bg-green-50 text-green-600 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors">
                                   <i className="fa-solid fa-download text-xs"></i>
                                </button>
                                <button className="w-7 h-7 bg-red-50 text-red-500 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors">
                                   <i className="fa-regular fa-trash-can text-xs"></i>
                                </button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           <div className="p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
              <span>Showing <span className="font-bold text-gray-800">1</span> to <span className="font-bold text-gray-800">10</span> of <span className="font-bold text-[#0074D9]">1000</span> Results</span>
              <div className="flex gap-4 font-medium">
                 <button className="flex items-center gap-1 hover:text-[#0074D9] transition-colors"><i className="fa-solid fa-chevron-left text-[10px]"></i> Previous</button>
                 <button className="flex items-center gap-1 text-[#0074D9] transition-colors">Next <i className="fa-solid fa-chevron-right text-[10px]"></i></button>
              </div>
           </div>
        </div>

        {/* --- MODALS --- */}
        {showDownloadModal && <DownloadModal onClose={() => setShowDownloadModal(false)} />}
        {showCreateModal && <CreateReportModal onClose={() => setShowCreateModal(false)} />}
        
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
// 1. DOWNLOAD MODAL (Matches image_5c0745.png)
// =========================================================================
function DownloadModal({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col animate-scale-up relative">
          
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
             <h2 className="text-xl font-bold text-gray-800">Download</h2>
             <button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button>
          </div>

          <div className="p-6 space-y-5">
             <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Date</label>
                <div className="relative">
                   <input 
                      type="date" 
                      placeholder="DD / MM / YYYY - DD / MM / YYYY" 
                      className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-[#0074D9]" 
                   />
                   
                </div>
             </div>
          </div>

          <div className="p-6 border-t flex justify-end">
             <button onClick={onClose} className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-md">Download</button>
          </div>
       </div>
    </div>, document.body
  );
}

// =========================================================================
// 2. CREATE REPORT MODAL (Matches image_5c0b03.png)
// =========================================================================
function CreateReportModal({ onClose }: { onClose: () => void }) {
  const [isCustomDate, setIsCustomDate] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col animate-scale-up relative">
          
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
             <h2 className="text-xl font-bold text-gray-800">Create Report</h2>
             <button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button>
          </div>

          <div className="p-6 space-y-5">
             
             {/* Toggle for Date */}
             <div className="flex justify-end items-center gap-2 text-xs text-gray-600">
                <span>Default Date</span>
                <button 
                    onClick={() => setIsCustomDate(!isCustomDate)} 
                    className={`w-8 h-4 rounded-full p-0.5 transition-colors ${isCustomDate ? 'bg-green-500' : 'bg-gray-300'}`}
                >
                    <div className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform ${isCustomDate ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </button>
                <span>Custom Date</span>
             </div>

             {/* Date Input (Shown if Custom Date is active or simply always show input as per image design logic) */}
             <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Date</label>
                <div className="relative">
                   <input 
                      type="date" 
                      placeholder="DD / MM / YYYY - DD / MM / YYYY" 
                      className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-[#0074D9]" 
                   />
                  
                </div>
             </div>

             <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea 
                    className="w-full border border-gray-200 rounded-lg p-3 text-sm h-32 resize-none outline-none focus:border-[#0074D9]" 
                    placeholder="Start typing..."
                ></textarea>
             </div>
          </div>

          <div className="p-6 border-t flex justify-end">
             <button onClick={onClose} className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-md">Create</button>
          </div>
       </div>
    </div>, document.body
  );
}

// =========================================================================
// 3 & 4. REPORT SUMMARY MODAL (Handles Edit & Preview Modes)
// =========================================================================
function ReportSummaryModal({ onClose, initialMode }: { onClose: () => void, initialMode: "edit" | "preview" }) {
  const [isEditMode, setIsEditMode] = useState(initialMode === "edit");
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

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
       {/* Responsive width based on mode */}
       <div className={`bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-slide-up relative ${isEditMode ? 'w-full max-w-5xl' : 'w-full max-w-6xl'}`}>
          
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
             <h2 className="text-xl font-bold text-gray-800">Report Summary</h2>
             <button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button>
          </div>
          
          <div className="p-8 overflow-y-auto flex-1 bg-gray-50/30 custom-scrollbar">
             
             {/* Title & Toggle */}
             <div className="text-center mb-8">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">DMAS 302</p>
                <h3 className="text-xl font-bold text-gray-800">Adult Day Health Care Daily Log</h3>
                
                {/* Toggle Switch */}
                <div className="flex justify-center items-center gap-3 mt-3">
                   <span className={`text-xs font-medium cursor-pointer ${isEditMode ? 'text-gray-800' : 'text-gray-400'}`} onClick={() => setIsEditMode(true)}>Edit Report</span>
                   <button 
                      onClick={() => setIsEditMode(!isEditMode)} 
                      className={`w-10 h-5 rounded-full p-0.5 transition-colors relative ${!isEditMode ? 'bg-green-500' : 'bg-gray-300'}`}
                   >
                      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${!isEditMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
                   </button>
                   <span className={`text-xs font-medium cursor-pointer ${!isEditMode ? 'text-gray-800' : 'text-gray-400'}`} onClick={() => setIsEditMode(false)}>Preview</span>
                </div>
             </div>

             <div className="space-y-6">
                
                {/* Info Fields */}
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

                {/* --- EDIT MODE: ACCORDION --- */}
                {isEditMode && (
                    <div>
                        <h4 className="text-sm font-bold text-gray-700 mb-3">Daily Report</h4>
                        <div className="grid grid-cols-2 gap-4">
                            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                                <div key={day} className={`bg-white border border-gray-200 rounded-lg overflow-hidden transition-all ${expandedDay === day ? 'col-span-2 shadow-md' : ''}`}>
                                    <div 
                                        onClick={() => toggleDay(day)} 
                                        className="flex justify-between items-center p-3.5 cursor-pointer hover:bg-gray-50"
                                    >
                                        <span className={`text-sm font-medium ${expandedDay === day ? 'text-[#0074D9]' : 'text-gray-700'}`}>{day}</span>
                                        <i className={`fa-solid fa-chevron-down text-gray-400 text-xs transition-transform duration-300 ${expandedDay === day ? 'rotate-180' : ''}`}></i>
                                    </div>

                                    {expandedDay === day && (
                                        <div className="p-6 border-t border-gray-100 bg-gray-50/50 animate-fade-in">
                                            <div className="grid grid-cols-2 gap-6 mb-6">
                                                <div className="space-y-1"><label className="text-xs text-gray-500">Date</label><input type="date" className="w-full border rounded-lg p-2 text-sm bg-white" /></div>
                                                <div className="space-y-1"><label className="text-xs text-gray-500">Time-In</label><input type="text" placeholder="Enter" className="w-full border rounded-lg p-2 text-sm bg-white" /></div>
                                                <div className="space-y-1"><label className="text-xs text-gray-500">Time-Out</label><input type="text" placeholder="Enter" className="w-full border rounded-lg p-2 text-sm bg-white" /></div>
                                                <div className="space-y-1"><label className="text-xs text-gray-500">Hours</label><input type="text" placeholder="Enter" className="w-full border rounded-lg p-2 text-sm bg-white" /></div>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-y-3 gap-x-6 bg-white p-4 rounded-xl border border-gray-200">
                                                {activities.map(item => (
                                                    <label key={item} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#0074D9] focus:ring-[#0074D9]" /> {item}
                                                    </label>
                                                ))}
                                            </div>

                                            <div className="mt-6 flex justify-end">
                                                <button className="bg-[#0074D9] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-sm">Save Day</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- PREVIEW MODE: TABLE --- */}
                {!isEditMode && (
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                                <tr>
                                    <th className="p-3 pl-4">Activity</th>
                                    {weekDays.map(d => <th key={d} className="p-3 text-center w-12">{d}</th>)}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {activities.map((act, i) => (
                                    <tr key={i} className="hover:bg-gray-50">
                                        <td className="p-3 pl-4 text-gray-700 font-medium">{act}</td>
                                        {weekDays.map((d, j) => (
                                            <td key={j} className="p-3 text-center">
                                                {(i + j) % 3 !== 0 ? (
                                                    <i className="fa-solid fa-circle-check text-green-500 text-sm"></i>
                                                ) : (
                                                    <span className="text-gray-300 text-xs">-</span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Signatures Footer */}
                <div className={`grid gap-6 pt-4 ${isEditMode ? 'grid-cols-2 border-t border-gray-200' : 'grid-cols-2'}`}>
                   <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-500">Weekly Comment & Date</label>
                        {isEditMode ? (
                            <textarea className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white h-24 resize-none focus:outline-none focus:border-[#0074D9]" placeholder="Enter comments here..."></textarea>
                        ) : (
                            <div className="w-full bg-[#F8FAFC] border border-gray-100 rounded-lg p-4 text-sm text-gray-700 h-24 italic">
                                "This is Adult Day Health Care Daily Log comment section."
                            </div>
                        )}
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                          <label className="text-xs text-gray-500 text-center">Recipient Signature</label>
                          <div className="border border-gray-200 bg-white rounded-lg p-2 flex flex-col items-center justify-center h-20 text-center cursor-pointer hover:bg-gray-50">
                             <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Signature_sample.svg" className="h-6 opacity-60"/>
                          </div>
                          {!isEditMode && <p className="text-xs text-center font-bold text-gray-700">Rajesh Maharjan</p>}
                      </div>
                      <div className="flex flex-col gap-1">
                          <label className="text-xs text-gray-500 text-center">ADHC Staff Signature</label>
                          <div className="border border-gray-200 bg-white rounded-lg p-2 flex flex-col items-center justify-center h-20 text-center cursor-pointer hover:bg-gray-50">
                             <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Signature_sample.svg" className="h-6 opacity-60"/>
                          </div>
                          {!isEditMode && <p className="text-xs text-center font-bold text-gray-700">Fab Sechuri</p>}
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