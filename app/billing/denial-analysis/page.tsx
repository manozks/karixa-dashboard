"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import DashboardLayout from "@/components/DashboardLayout";
import BillingStatsHeader from "@/components/BillingStatsHeader";
import Link from "next/link";

export default function DenialAnalysisPage() {
  const [activeTab, setActiveTab] = useState("All Claims");
  
  // Modal States
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showAdjustmentModal, setShowAdjustmentModal] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<any>(null);

  // Mock Data 
  const claims = [
    { id: 1, provider: "Ava Johnson", date: "03/15/2023", claim: "CLAM0921", client: "Lucas Garcia", dosFrom: "07/22/2024 3:30 PM", dosTo: "09/22/2024 2:30 PM", code: "T15469", ins: "North Star Community Support", billed: "345", paid: "145", denial: "200.00", dCode: "CR-10", status: "1/P", img: 1, cImg: 11 },
    { id: 2, provider: "Sophie Reynolds", date: "07/22/2021", claim: "CLAM0765", client: "Isabella Chen", dosFrom: "11/05/2025 9:15 AM", dosTo: "11/08/2025 11:45 AM", code: "T10576", ins: "Heartland Family Services", billed: "678", paid: "375", denial: "300.00", dCode: "CR-22", status: "1/P", img: 2, cImg: 12 },
    { id: 3, provider: "Ethan Brooks", date: "11/05/2020", claim: "CLAM0589", client: "Mia Robinson", dosFrom: "01/12/2026 2:45 PM", dosTo: "10/12/2026 9:15 AM", code: "T13319", ins: "Lakeside Wellness Center", billed: "912", paid: "712", denial: "200.00", dCode: "CR-64", status: "1/P", img: 3, cImg: 13 },
    { id: 4, provider: "Liam Thompson", date: "01/30/2024", claim: "CLAM0347", client: "Oliver Smith", dosFrom: "04/18/2023 11:00 AM", dosTo: "08/18/2023 4:00 PM", code: "T10433", ins: "Maplewood Social Services", billed: "234", paid: "200", denial: "34.00", dCode: "CR-97", status: "1/P", img: 4, cImg: 14 },
    { id: 5, provider: "Noah Patel", date: "09/12/2022", claim: "CLAM1182", client: "Chloe Davis", dosFrom: "09/30/2027 4:00 PM", dosTo: "11/03/2027 6:00 PM", code: "T10644", ins: "Riverbend Assistance Program", billed: "567", paid: "500", denial: "67.00", dCode: "CR-13", status: "1/P", img: 5, cImg: 15 },
  ];

  // Handle clicking the Denial Amount
  const handleDenialClick = (claim: any) => {
    setSelectedClaim(claim);
    setShowAdjustmentModal(true);
  };

  return (
    <DashboardLayout>
      <div className="p-0 space-y-6 bg-gray-50 min-h-screen">
        
      {/* Header and Stats Cards */}
                   <BillingStatsHeader />

        {/* Main Content Area */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm p-6">
           <h2 className="text-xl font-bold text-gray-800 mb-6">Denial Analysis Report</h2>
           
           {/* Controls */}
           <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
              
              {/* Tabs */}
              <div className="flex bg-gray-100 p-1 rounded-lg w-full lg:w-auto">
                 {["All Claims", "Partial Payment", "Decline Payment", "Duplicate Claims"].map(tab => (
                    <button 
                       key={tab}
                       onClick={() => setActiveTab(tab)}
                       className={`px-4 py-2 text-xs font-medium rounded-md transition-all whitespace-nowrap ${activeTab === tab ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"}`}
                    >
                       {tab}
                    </button>
                 ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3 w-full lg:w-auto">
                 <div className="relative flex-1 lg:w-34"><i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i><input type="text" placeholder="Search Anything..." className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-brand" /></div>
                 <div className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 bg-white flex items-center gap-2 whitespace-nowrap"><i className="fa-regular fa-calendar"></i> 1 Apr-30Apr 2025</div>
                 
                 {/* DOWNLOAD ICON */}
                 <button onClick={() => setShowDownloadModal(true)} className="bg-blue-50 text-blue-600 w-9 h-9 rounded-lg flex items-center justify-center hover:bg-blue-100 flex-shrink-0"><i className="fa-solid fa-download text-xs"></i></button>
                 
                 <button className="bg-[#0074D9] text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-[#0062b8] whitespace-nowrap">Mark As Adjustment</button>
              </div>
           </div>

           {/* Table */}
           <div className="overflow-x-auto">
              <table className="w-full text-left text-xs whitespace-nowrap">
                 <thead className="bg-gray-50 text-gray-500 uppercase font-semibold">
                    <tr>
                       <th className="p-4 w-10"><input type="checkbox" /></th>
                       <th className="p-4">Provider</th>
                       <th className="p-4">Denial Date</th>
                       <th className="p-4">Claim #</th>
                       <th className="p-4">Client Name</th>
                       <th className="p-4">DOS From</th>
                       <th className="p-4">DOS To</th>
                       <th className="p-4">Procedure Code</th>
                       <th className="p-4">Insurance</th>
                       <th className="p-4">Billed</th>
                       <th className="p-4">Paid</th>
                       <th className="p-4">Denial Amount</th>
                       <th className="p-4">Denial Code</th>
                       <th className="p-4">Claim Status</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {claims.map((item, i) => (
                       <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4"><input type="checkbox" /></td>
                          <td className="p-4 flex items-center gap-3"><img src={`https://i.pravatar.cc/150?img=${item.img}`} className="w-8 h-8 rounded-full" /><span className="font-medium text-gray-800">{item.provider}</span></td>
                          <td className="p-4 text-gray-600">{item.date}</td>
                          <td className="p-4 text-gray-600">{item.claim}</td>
                          <td className="p-4 flex items-center gap-2"><img src={`https://i.pravatar.cc/150?img=${item.cImg}`} className="w-6 h-6 rounded-full" /><span>{item.client}</span></td>
                          <td className="p-4 text-gray-600">{item.dosFrom}</td>
                          <td className="p-4 text-gray-600">{item.dosTo}</td>
                          <td className="p-4 text-gray-600">{item.code}</td>
                          <td className="p-4 text-gray-600 truncate max-w-[150px]" title={item.ins}>{item.ins}</td>
                          <td className="p-4 text-gray-600">{item.billed}</td>
                          <td className="p-4 text-gray-600">{item.paid}</td>
                          <td className="p-4">
                             {/* Clickable Denial Amount */}
                             <button onClick={() => handleDenialClick(item)} className="text-[#0074D9] font-medium hover:underline">{item.denial}</button>
                          </td>
                          <td className="p-4 text-gray-600">{item.dCode}</td>
                          <td className="p-4 text-gray-600">{item.status}</td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           
           <div className="p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
              <span>Showing 1 to 10 of 1000 Results</span>
              <div className="flex gap-2"><button className="hover:text-blue-600">Previous</button><button className="text-blue-600 font-medium">Next</button></div>
           </div>
        </div>

        {/* --- MODALS --- */}
        {showDownloadModal && <DownloadModal onClose={() => setShowDownloadModal(false)} />}
        {showAdjustmentModal && <ClaimAdjustmentModal claim={selectedClaim} onClose={() => setShowAdjustmentModal(false)} />}

      </div>
    </DashboardLayout>
  );
}

function StatsCard({ title, value, sub }: any) {
   return (
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm relative">
         <div className="absolute top-5 right-5 text-gray-300 text-xl"><i className="fa-solid fa-dollar-sign"></i></div>
         <p className="text-xs text-gray-500 mb-1">{title}</p>
         <h3 className="text-2xl font-bold text-gray-800 mb-1">{value}</h3>
         <p className="text-[10px] text-green-500 font-medium">{sub}</p>
      </div>
   )
}

// =========================================================================
// 1. DOWNLOAD MODAL 
// =========================================================================
function DownloadModal({ onClose }: { onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col animate-scale-up relative">
          <div className="flex justify-between items-center p-6 border-b border-gray-100"><h2 className="text-xl font-bold text-gray-800">Download</h2><button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button></div>
          <div className="p-6 space-y-4">
             <div className="space-y-1"><label className="text-xs font-medium text-gray-500">Date</label><div className="relative"><input type="text" placeholder="DD / MM / YYYY - DD / MM / YYYY" className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-brand" /><i className="fa-regular fa-calendar absolute right-3 top-3 text-gray-400"></i></div></div>
          </div>
          <div className="p-6 border-t flex justify-end"><button onClick={onClose} className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0062b8]">Download</button></div>
       </div>
    </div>, document.body
  );
}

// =========================================================================
// 2. CLAIM ADJUSTMENT MODAL 
// =========================================================================
function ClaimAdjustmentModal({ claim, onClose }: { claim: any, onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl flex flex-col max-h-[90vh] animate-slide-up relative">
          <div className="flex justify-between items-center p-6 border-b border-gray-100"><h2 className="text-xl font-bold text-gray-800">Claim Adjustment</h2><button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button></div>
          
          <div className="p-0 overflow-y-auto">
             <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                   <tr>
                      <th className="p-4">Group Code</th>
                      <th className="p-4 w-1/3">Reason Code</th>
                      <th className="p-4">Adjustment Amount</th>
                      <th className="p-4 text-center">Move to Patient Balance</th>
                      <th className="p-4 text-center">Write Off</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   <tr>
                      <td className="p-4 text-gray-600 align-top">CR-Correction and Reversal (no financial liability)</td>
                      <td className="p-4 text-gray-600 align-top">10- The diagnosis is inconsistent with the patient's gender. Usage: Refer to the 835 healthcare Policy identification segment (loop 2110 Service Payment Information REF), if present.</td>
                      <td className="p-4 align-top font-medium">6.00</td>
                      <td className="p-4 align-top text-center"><input type="checkbox" className="rounded" /></td>
                      <td className="p-4 align-top text-center"><input type="checkbox" className="rounded" /></td>
                   </tr>
                </tbody>
             </table>
          </div>

          <div className="bg-gray-200/50 p-4 border-t border-gray-200 grid grid-cols-6 gap-4 text-xs text-gray-600">
             <div className="flex items-center gap-2 col-span-2"><img src={`https://i.pravatar.cc/150?img=${claim?.img || 1}`} className="w-6 h-6 rounded-full" /><span className="font-bold">{claim?.provider || "Noah Patel"}</span></div>
             <div>{claim?.date || "09/12/2022"}</div>
             <div>{claim?.claim || "CLAM1182"}</div>
             <div className="flex items-center gap-2"><img src={`https://i.pravatar.cc/150?img=${claim?.cImg || 11}`} className="w-6 h-6 rounded-full" /><span>{claim?.client || "Chloe Davis"}</span></div>
             <div>Riverbend Assistance Program</div>
          </div>

          <div className="p-6 border-t flex justify-end gap-3"><button onClick={onClose} className="px-6 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50">Close</button><button className="px-6 py-2.5 bg-[#0074D9] text-white rounded-lg text-sm font-medium hover:bg-[#0062b8]">Save</button></div>
       </div>
    </div>, document.body
  );
}