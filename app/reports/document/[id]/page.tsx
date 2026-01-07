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

  const reports = [
    { name: "Sophia Garcia", id: "0198", status: "Active", created: "Feb 01, 2023", last: "Feb 01, 2023", by: "Admin" },
    { name: "Emma Taylor", id: "0147", status: "Inactive", created: "Mar 15, 2023", last: "Mar 15, 2023", by: "Admin" },
    { name: "Ava Martinez", id: "0123", status: "Active", created: "Apr 20, 2023", last: "Apr 20, 2023", by: "Caregiver" },
  ];

  // Handle Edit Icon Click
  const handleEditClick = (report: any) => {
    setSelectedReport(report);
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
                 
                 {/* 1. Download Icon -> Modal */}
                 <button onClick={() => setShowDownloadModal(true)} className="w-8 h-8 border rounded flex items-center justify-center text-blue-500 hover:bg-blue-50 transition-colors">
                    <i className="fa-solid fa-download"></i>
                 </button>
                 
                 {/* 2. Settings Icon -> Modal */}
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
                             <i className="fa-regular fa-eye cursor-pointer hover:bg-blue-50 p-1 rounded"></i>
                             
                             {/* 3. Edit Icon -> Report Summary Modal */}
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
        {showReportSummaryModal && <ReportSummaryModal onClose={() => setShowReportSummaryModal(false)} />}

      </div>
    </DashboardLayout>
  );
}

// =========================================================================
// MODALS
// =========================================================================

// --- 1. DOWNLOAD MODAL (Matches image_df4f8e.png) ---
function DownloadModal({ onClose }: { onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl flex flex-col animate-scale-up relative">
          <div className="flex justify-between items-center p-6 border-b border-gray-100"><h2 className="text-xl font-bold text-gray-800">Download</h2><button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button></div>
          <div className="p-6 space-y-4">
             <div className="space-y-1"><label className="text-xs font-medium text-gray-500">Date</label><div className="relative"><input type="text" placeholder="DD / MM / YYYY - DD / MM / YYYY" className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500" /><i className="fa-regular fa-calendar absolute right-3 top-3 text-gray-400"></i></div></div>
          </div>
          <div className="p-6 border-t flex justify-end"><button onClick={onClose} className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0062b8]">Download</button></div>
       </div>
    </div>, document.body
  );
}

// --- 2. SETTINGS MODAL (Matches image_df530e.png) ---
function SettingsModal({ onClose }: { onClose: () => void }) {
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

// --- 3. REPORT SUMMARY MODAL (Matches image_dfb8cc.png) ---
function ReportSummaryModal({ onClose }: { onClose: () => void }) {
  const [isEditMode, setIsEditMode] = useState(false);

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh] animate-slide-up relative">
          <div className="flex justify-between items-center p-6 border-b border-gray-100"><h2 className="text-xl font-bold text-gray-800">Report Summary</h2><button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button></div>
          
          <div className="p-8 overflow-y-auto flex-1 bg-gray-50/30">
             <div className="text-center mb-6">
                <p className="text-xs text-gray-500 uppercase tracking-wider">DMAS 302</p>
                <h3 className="text-lg font-bold text-gray-800">Adult Day Health Care Daily Log</h3>
                <div className="flex justify-center items-center gap-2 mt-2">
                   <span className="text-xs text-gray-500">Edit Report</span>
                   <button onClick={() => setIsEditMode(!isEditMode)} className={`w-8 h-4 rounded-full p-0.5 transition-colors ${isEditMode ? 'bg-green-500' : 'bg-gray-300'}`}><div className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform ${isEditMode ? 'translate-x-4' : 'translate-x-0'}`}></div></button>
                   <span className="text-xs text-gray-500">Preview</span>
                </div>
             </div>

             <div className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-1"><label className="text-xs font-medium text-gray-500">Recipient Name</label><input className="w-full border p-2.5 rounded-lg text-sm bg-white" placeholder="Enter"/></div>
                   <div className="space-y-1"><label className="text-xs font-medium text-gray-500">Medical ID</label><input className="w-full border p-2.5 rounded-lg text-sm bg-white" placeholder="Enter"/></div>
                </div>

                <div>
                   <h4 className="text-xs font-bold text-gray-700 mb-2 uppercase">Daily Report</h4>
                   <div className="grid grid-cols-2 gap-4">
                      {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                         <div key={day} className="flex justify-between items-center bg-white border border-gray-200 p-3 rounded-lg">
                            <span className="text-sm text-gray-700">{day}</span>
                            <i className="fa-solid fa-chevron-down text-gray-400 text-xs"></i>
                         </div>
                      ))}
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-1"><label className="text-xs font-medium text-gray-500">Weekly Comment & Date</label><textarea className="w-full border p-2.5 rounded-lg text-sm bg-white h-24 resize-none" placeholder="Enter"></textarea></div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="border border-gray-200 bg-white rounded-lg p-4 flex flex-col items-center justify-center h-24"><img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Signature_sample.svg" className="h-8 opacity-50"/><span className="text-[10px] text-gray-400 mt-2">Recipient Signature</span></div>
                      <div className="border border-gray-200 bg-white rounded-lg p-4 flex flex-col items-center justify-center h-24"><img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Signature_sample.svg" className="h-8 opacity-50"/><span className="text-[10px] text-gray-400 mt-2">Staff Signature</span></div>
                   </div>
                </div>
             </div>
          </div>

          <div className="p-6 border-t flex justify-end gap-3"><button onClick={onClose} className="px-6 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50">Back</button><button className="px-6 py-2.5 bg-[#0074D9] text-white rounded-lg text-sm font-medium hover:bg-[#0062b8]">Save</button></div>
       </div>
    </div>, document.body
  );
}