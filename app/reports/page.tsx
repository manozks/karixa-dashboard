"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<"User List" | "Document List">("User List");
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null); // To store user for modal

  // Mock Data: User List
  const users = [
    { id: "0198", name: "Sophia Garcia", status: "Active", created: "Feb 01, 2023", img: 1 },
    { id: "0147", name: "Emma Taylor", status: "Inactive", created: "Mar 15, 2023", img: 2 },
    { id: "0123", name: "Ava Martinez", status: "Active", created: "Apr 20, 2023", img: 3 },
    { id: "0189", name: "Lila Anderson", status: "Inactive", created: "May 05, 2023", img: 4 },
    { id: "0165", name: "Zoe Johnson", status: "Active", created: "Jun 10, 2023", img: 5 },
    { id: "0172", name: "Mia Kim", status: "Inactive", created: "Jul 25, 2023", img: 6 },
    { id: "0154", name: "Nora Smith", status: "Active", created: "Aug 30, 2023", img: 7 },
  ];

  // Mock Data: Document List
  const documents = [
    { id: 1, name: "DMAS 302", reports: 9, clients: 2, desc: "-" },
    { id: 2, name: "DMAS 301", reports: 53, clients: 3, desc: "-" },
    { id: 3, name: "DMAS 97", reports: 14, clients: 2, desc: "-" },
    { id: 4, name: "DMAS 99", reports: 8, clients: 2, desc: "-" },
    { id: 5, name: "DMAS 225", reports: 92, clients: 2, desc: "-" },
    { id: 6, name: "DMAS 90", reports: 36, clients: 2, desc: "-" },
  ];

  const handleEyeClick = (user: any) => {
    setSelectedUser(user);
    setShowSummaryModal(true);
  };

  return (
    <DashboardLayout>
      <div className="p-0 space-y-6 bg-gray-50 min-h-screen">
        
        {/* Header */}
        <div>
           <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
           <div className="text-sm text-gray-500">Dashboard / Reports</div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
           {/* Tabs */}
           <div className="bg-gray-200 p-1 rounded-lg flex">
              <button 
                 onClick={() => setActiveTab("User List")}
                 className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === "User List" ? "bg-white text-gray-800 shadow-sm" : "text-gray-600"}`}
              >
                 User List
              </button>
              <button 
                 onClick={() => setActiveTab("Document List")}
                 className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === "Document List" ? "bg-white text-gray-800 shadow-sm" : "text-gray-600"}`}
              >
                 Document List
              </button>
           </div>

           {/* Buttons & Search */}
           <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                 <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                 <input type="text" placeholder="Search..." className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0074D9]" />
              </div>
              
              {/* This button triggers the Download Modal shown in image_b63303.png */}
              <button onClick={() => setShowDownloadModal(true)} className="bg-blue-50 text-[#0074D9] border border-blue-100 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 whitespace-nowrap">
                 Download Document
              </button>
              
              <button onClick={() => setShowCreateModal(true)} className="bg-[#0074D9] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0062b8] whitespace-nowrap">
                 Create Document
              </button>
           </div>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
           <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                 <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                    <tr>
                       {activeTab === "User List" ? (
                          <>
                             <th className="p-4">Client Name</th>
                             <th className="p-4">Client ID</th>
                             <th className="p-4">Status</th>
                             <th className="p-4">Created on</th>
                             <th className="p-4 text-right"></th>
                          </>
                       ) : (
                          <>
                             <th className="p-4">S.N.</th>
                             <th className="p-4">Document Name</th>
                             <th className="p-4">No. of Reports</th>
                             <th className="p-4">Clients</th>
                             <th className="p-4">Description</th>
                             <th className="p-4 text-right"></th>
                          </>
                       )}
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {activeTab === "User List" ? (
                       users.map((u, i) => (
                          <tr key={i} className="hover:bg-gray-50 transition-colors">
                             <td className="p-4">
                                <Link href={`/reports/user/${u.id}`} className="flex items-center gap-3 font-medium text-gray-800 hover:text-[#0074D9]">
                                   <img src={`https://i.pravatar.cc/150?img=${u.img}`} className="w-8 h-8 rounded-full" />
                                   {u.name}
                                </Link>
                             </td>
                             <td className="p-4 text-gray-600">{u.id}</td>
                             <td className="p-4"><span className={`px-2 py-1 rounded text-xs font-medium ${u.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{u.status}</span></td>
                             <td className="p-4 text-gray-600">{u.created}</td>
                             <td className="p-4 text-right flex justify-end gap-2">
                                {/* Eye Icon triggers ReportSummaryModal (image_b6243b.png) */}
                                <button onClick={() => handleEyeClick(u)} className="w-7 h-7 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center hover:bg-blue-100"><i className="fa-regular fa-eye text-xs"></i></button>
                                
                                {/* Download Icon triggers DownloadDocumentModal (image_b63303.png) */}
                                <button onClick={() => setShowDownloadModal(true)} className="w-7 h-7 bg-green-50 text-green-600 rounded-full flex items-center justify-center hover:bg-green-100"><i className="fa-solid fa-download text-xs"></i></button>
                             </td>
                          </tr>
                       ))
                    ) : (
                       documents.map((d, i) => (
                          <tr key={i} className="hover:bg-gray-50 transition-colors">
                             <td className="p-4 text-gray-500">{d.id}</td>
                             <td className="p-4"><Link href={`/reports/document/${d.id}`} className="font-medium text-gray-800 hover:text-[#0074D9]">{d.name}</Link></td>
                             <td className="p-4 text-gray-600">{d.reports}</td>
                             <td className="p-4"><div className="flex -space-x-2"><img src="https://i.pravatar.cc/150?img=10" className="w-6 h-6 rounded-full border border-white"/><img src="https://i.pravatar.cc/150?img=11" className="w-6 h-6 rounded-full border border-white"/><span className="w-6 h-6 rounded-full bg-green-100 border border-white flex items-center justify-center text-[10px] text-green-700 font-bold">+1</span></div></td>
                             <td className="p-4 text-gray-600">{d.desc}</td>
                             <td className="p-4 text-right flex justify-end gap-2">
                                <button className="w-7 h-7 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center hover:bg-blue-100"><i className="fa-regular fa-eye text-xs"></i></button>
                                <button className="w-7 h-7 bg-green-50 text-green-600 rounded-full flex items-center justify-center hover:bg-green-100"><i className="fa-solid fa-download text-xs"></i></button>
                                <button className="w-7 h-7 bg-red-50 text-red-500 rounded-full flex items-center justify-center hover:bg-red-100"><i className="fa-regular fa-trash-can text-xs"></i></button>
                             </td>
                          </tr>
                       ))
                    )}
                 </tbody>
              </table>
           </div>
           <div className="p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
              <span>Showing 1 to 10 of 1000 Results</span>
              <div className="flex gap-2"><button className="hover:text-blue-600">Previous</button><button className="text-blue-600 font-medium">Next</button></div>
           </div>
        </div>

        {/* Modals */}
        {showDownloadModal && <DownloadDocumentModal onClose={() => setShowDownloadModal(false)} />}
        {showCreateModal && <CreateDocumentModal onClose={() => setShowCreateModal(false)} onNext={() => { setShowCreateModal(false); setShowSummaryModal(true); }} />}
        {showSummaryModal && selectedUser && <ReportSummaryModal user={selectedUser} onClose={() => setShowSummaryModal(false)} />}

      </div>
    </DashboardLayout>
  );
}

// =========================================================================
// MODALS
// =========================================================================

// --- DOWNLOAD DOCUMENT MODAL (Matches image_b63303.png) ---
function DownloadDocumentModal({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col animate-scale-up relative">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
             <h2 className="text-xl font-bold text-gray-800">Download Documents</h2>
             <button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button>
          </div>
          <div className="p-6 space-y-5">
             <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-600">Document Type</label>
                <select className="w-full border border-gray-200 rounded-lg p-3 text-sm bg-white text-gray-500 outline-none focus:border-[#0074D9]">
                   <option>Select</option>
                   <option>DMAS 302</option>
                   <option>DMAS 301</option>
                </select>
             </div>
             <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-600">Date</label>
                <div className="relative">
                   <input 
                      type="date" 
                      placeholder="DD / MM / YYYY - DD / MM / YYYY" 
                      className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-500 outline-none focus:border-[#0074D9]" 
                   />
                   
                </div>
             </div>
          </div>
          <div className="p-6 border-t flex justify-end">
             <button onClick={onClose} className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-md transition-transform active:scale-95">
                Download
             </button>
          </div>
       </div>
    </div>, document.body
  );
}

// --- CREATE DOCUMENT MODAL ---
function CreateDocumentModal({ onClose, onNext }: { onClose: () => void, onNext: () => void }) {
  const [isCustomDate, setIsCustomDate] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col animate-scale-up relative">
          <div className="flex justify-between items-center p-6 border-b border-gray-100"><h2 className="text-xl font-bold">Create Documents</h2><button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button></div>
          <div className="p-6 space-y-4">
             <div className="flex justify-end items-center gap-2 text-xs text-gray-600 mb-2">
                <span>Default Date</span>
                <button onClick={() => setIsCustomDate(!isCustomDate)} className={`w-8 h-4 rounded-full p-0.5 transition-colors ${isCustomDate ? 'bg-green-500' : 'bg-gray-300'}`}><div className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform ${isCustomDate ? 'translate-x-4' : 'translate-x-0'}`}></div></button>
                <span>Custom Date</span>
             </div>
             {isCustomDate && <div className="space-y-1 animate-fade-in"><label className="text-xs text-gray-500">Date</label><div className="relative"><input type="date" className="w-full border rounded-lg p-2.5 text-sm" placeholder="DD / MM / YYYY" /></div></div>}
             <div className="space-y-1"><label className="text-xs text-gray-500">Client Name</label><select className="w-full border rounded-lg p-2.5 text-sm bg-white"><option>Select</option></select></div>
             <div className="space-y-1"><label className="text-xs text-gray-500">Document Type</label><select className="w-full border rounded-lg p-2.5 text-sm bg-white"><option>Select</option></select></div>
          </div>
          <div className="p-6 border-t flex justify-end"><button onClick={onNext} className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0062b8]">Create</button></div>
       </div>
    </div>, document.body
  );
}

// --- REPORT SUMMARY MODAL / USER DETAILS (Matches image_b6243b.png) ---
function ReportSummaryModal({ user, onClose }: { user: any, onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  // Mock list of reports for the selected user
  const reports = [
    { name: "DMAS 302", count: 9, date: "Feb 01, 2023" },
    { name: "DMAS 301", count: 53, date: "Mar 15, 2023" },
    { name: "DMAS 97", count: 14, date: "Apr 20, 2023" },
    { name: "DMAS 99", count: 8, date: "May 05, 2023" },
    { name: "DMAS 225", count: 92, date: "Jun 10, 2023" },
    { name: "DMAS 90", count: 36, date: "Jul 25, 2023" },
    { name: "DMAS 96", count: 45, date: "Aug 30, 2023" },
    { name: "DMAS 97 A/B", count: 81, date: "Sep 12, 2023" },
    { name: "Participant Care Plan", count: 22, date: "Oct 18, 2023" },
  ];

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl flex flex-col max-h-[90vh] animate-scale-up relative">
          
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
             <div className="flex items-center gap-4">
                <img src={`https://i.pravatar.cc/150?img=${user.img}`} alt="User" className="w-12 h-12 rounded-full border-2 border-gray-100" />
                <div>
                   <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">{user.status}</span>
                   </div>
                   <p className="text-xs text-gray-500">1509 Oakview Dr. I McLean VA 22101</p>
                </div>
             </div>
             
               <button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button>
          </div>

          {/* Table */}
          <div className="overflow-y-auto flex-1 p-0">
             <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold sticky top-0 z-10 border-b border-gray-200">
                   <tr>
                      <th className="p-4 pl-8">Document Name</th>
                      <th className="p-4">No. of Reports</th>
                      <th className="p-4 text-center"></th>
                      
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {reports.map((report, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                         <td className="p-4 pl-8 text-gray-700">{report.name}</td>
                         <td className="p-4 text-gray-600">{report.count}</td>
                         <td className="p-4 text-center">
                            <Link href={`/reports/user/${user.id}`} className="text-[#0074D9] bg-blue-50 px-3 py-1 rounded text-xs font-medium border border-blue-100 flex items-center justify-center gap-1 mx-auto hover:bg-blue-100">
                               <i className="fa-regular fa-eye"></i> View
                            </Link>
                         </td>
                         
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>


       </div>
    </div>, document.body
  );
}