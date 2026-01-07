"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import DashboardLayout from "@/components/DashboardLayout";
import BillingStatsHeader from "@/components/BillingStatsHeader";
import Link from "next/link";

export default function EVVPage() {
  const [activeTab, setActiveTab] = useState<"Send EVV Claims" | "EVV Report" | "EVV Claims">("Send EVV Claims");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // --- MOCK DATA ---

  // 1. Send EVV Claims Data 
  const sendEvvData = [
    { id: 1, provider: "Sophie Reynolds", total: 5, accepted: 0, rejected: 0, addedBy: "Admin", date: "03/15/2023", status: "Prepared", img: 1 },
    { id: 2, provider: "Ethan Garcia", total: 9, accepted: 0, rejected: 0, addedBy: "Admin", date: "07/22/2021", status: "Prepared", img: 2 },
    { id: 3, provider: "Noah Patel", total: 5, accepted: 0, rejected: 0, addedBy: "Admin", date: "11/05/2020", status: "Prepared", img: 3 },
    { id: 4, provider: "Liam Thompson", total: 3, accepted: 0, rejected: 0, addedBy: "Admin", date: "01/30/2024", status: "Prepared", img: 4 },
    { id: 5, provider: "Ava Johnson", total: 7, accepted: 0, rejected: 0, addedBy: "Admin", date: "09/12/2022", status: "Prepared", img: 5 },
  ];

  // 2. EVV Report Data 
  const evvReportData = [
    { id: 1, client: "Sophie Reynolds", caregiver: "Terry T. Edwards", from: "03/15/2023", to: "01/18/2024", hours: "3.50", code: "S51009", payer: "Aging Resources", provider: "Authentic Care", shift: 7, img: 1, cgImg: 11 },
    { id: 2, client: "Ethan Garcia", caregiver: "Paul G. Atreides", from: "07/22/2021", to: "10/12/2021", hours: "4.0", code: "S51009", payer: "BCBS MN BLUE", provider: "Authentic Care", shift: 20, img: 2, cgImg: 12 },
    { id: 3, client: "Noah Patel", caregiver: "Justin A. Currain", from: "11/05/2020", to: "11/09/2020", hours: "20.00", code: "S51009", payer: "Aging Resources", provider: "Authentic Care", shift: 12, img: 3, cgImg: 13 },
    { id: 4, client: "Liam Thompson", caregiver: "Liam Thompson", from: "01/30/2024", to: "07/22/2025", hours: "30.00", code: "S51009", payer: "BCBS MN BLUE", provider: "Authentic Care", shift: 40, img: 4, cgImg: 4 },
  ];

  // 3. EVV Claims Data 
  const evvClaimsData = [
    { id: 1, client: "Sophie Reynolds", claim: "CLM03555458NA", date: "03/15/2023", status: "Billiyo Internal Review", payer: "GDCH", charges: "164.34", paid: "0", workedFrom: "03/15/2023", workedTo: "03/15/2023", workedHours: "5.50 (22 Units)", employee: "Justin A Curran", img: 1 },
    { id: 2, client: "Ethan Garcia", claim: "CLM03555458NA", date: "07/22/2021", status: "Billiyo Internal Review", payer: "GDCH", charges: "231.34", paid: "0", workedFrom: "07/22/2021", workedTo: "07/22/2021", workedHours: "7.75 (22 units)", employee: "Justin A Curran", img: 2 },
    { id: 3, client: "Noah Patel", claim: "CLM03555458NA", date: "11/05/2020", status: "Billiyo Internal Review", payer: "GDCH", charges: "21.34", paid: "0", workedFrom: "11/05/2020", workedTo: "11/05/2020", workedHours: "0.75 (3.0 units)", employee: "Authentic Care", img: 3 },
  ];

  const handleEyeClick = (item: any) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  return (
    <DashboardLayout>
      <div className="p-0 space-y-6 bg-gray-50 min-h-screen">
        
              {/* Header and Stats Cards */}
              <BillingStatsHeader />

        {/* Main Content */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm p-6">
           <h2 className="text-xl font-bold text-gray-800 mb-6">EVV</h2>
           
           {/* Controls */}
           <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
              {/* Tabs */}
              <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-full lg:w-auto">
                 {["Send EVV Claims", "EVV Report", "EVV Claims"].map(tab => (
                    <button 
                       key={tab}
                       onClick={() => setActiveTab(tab as any)}
                       className={`px-4 py-2 text-xs font-medium rounded-md transition-all whitespace-nowrap flex-1 lg:flex-none ${activeTab === tab ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"}`}
                    >
                       {tab}
                    </button>
                 ))}
              </div>

              {/* Search & Date */}
              <div className="flex gap-3 w-full lg:w-auto">
                 <div className="relative flex-1 lg:w-64"><i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i><input type="text" placeholder="Search Anything..." className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg text-xs outline-none" /></div>
                 <div className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 bg-white flex items-center gap-2 whitespace-nowrap"><i className="fa-regular fa-calendar"></i> 1 Apr-30Apr 2025</div>
                 {/* Conditional Main Button */}
                 {activeTab === "Send EVV Claims" ? (
                    <button className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-xs font-medium hover:bg-gray-50 whitespace-nowrap">EVV Report</button>
                 ) : (
                    <button className="bg-[#0074D9] text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-[#0062b8] whitespace-nowrap">{activeTab === "EVV Report" ? "Send Claims" : "Rebill Claims"}</button>
                 )}
              </div>
           </div>

           {/* Table */}
           <div className="overflow-x-auto">
              <table className="w-full text-left text-xs whitespace-nowrap">
                 <thead className="bg-gray-50 text-gray-500 uppercase font-semibold">
                    {activeTab === "Send EVV Claims" && (
                       <tr><th className="p-4"><input type="checkbox" /></th><th className="p-4">Provider Name</th><th className="p-4">Total Schedules</th><th className="p-4">Accepted Successfully</th><th className="p-4">Rejected</th><th className="p-4">Added By</th><th className="p-4">Added On</th><th className="p-4">File Status</th><th className="p-4 text-right"></th></tr>
                    )}
                    {activeTab === "EVV Report" && (
                       <tr><th className="p-4"><input type="checkbox" /></th><th className="p-4">Client</th><th className="p-4">Caregiver</th><th className="p-4">From Date</th><th className="p-4">To Date</th><th className="p-4">Worked Hours</th><th className="p-4">Procedure Code</th><th className="p-4">Payer</th><th className="p-4">Provider</th><th className="p-4">Total Shift</th><th className="p-4 text-right"></th></tr>
                    )}
                    {activeTab === "EVV Claims" && (
                       <tr><th className="p-4"><input type="checkbox" /></th><th className="p-4">Client Name</th><th className="p-4">Claim#</th><th className="p-4">Claim Date</th><th className="p-4">Claim Status</th><th className="p-4">Payer</th><th className="p-4">Total Charges</th><th className="p-4">Paid Amount</th><th className="p-4">Worked From</th><th className="p-4">Worked To</th><th className="p-4">Worked Hours</th><th className="p-4">Employee</th><th className="p-4 text-right">Action</th></tr>
                    )}
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    
                    {/* SEND EVV CLAIMS ROWS */}
                    {activeTab === "Send EVV Claims" && sendEvvData.map((item, i) => (
                       <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4"><input type="checkbox" /></td>
                          <td className="p-4 flex items-center gap-3"><img src={`https://i.pravatar.cc/150?img=${item.img}`} className="w-8 h-8 rounded-full" /><span className="font-medium text-gray-800">{item.provider}</span></td>
                          <td className="p-4 text-gray-600">{item.total}</td>
                          <td className="p-4 text-gray-600">{item.accepted}</td>
                          <td className="p-4 text-gray-600">{item.rejected}</td>
                          <td className="p-4 text-gray-600"><span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-[10px]">{item.addedBy}</span></td>
                          <td className="p-4 text-gray-600">{item.date}</td>
                          <td className="p-4 text-gray-600">{item.status}</td>
                          <td className="p-4 text-right">
                             <button onClick={() => handleEyeClick(item)} className="text-blue-500 hover:bg-blue-50 w-7 h-7 rounded-full flex items-center justify-center"><i className="fa-regular fa-eye"></i></button>
                          </td>
                       </tr>
                    ))}

                    {/* EVV REPORT ROWS */}
                    {activeTab === "EVV Report" && evvReportData.map((item, i) => (
                       <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4"><input type="checkbox" /></td>
                          <td className="p-4 flex items-center gap-3"><img src={`https://i.pravatar.cc/150?img=${item.img}`} className="w-8 h-8 rounded-full" /><span className="font-medium text-gray-800">{item.client}</span></td>
                          <td className="p-4 flex items-center gap-2"><img src={`https://i.pravatar.cc/150?img=${item.cgImg}`} className="w-6 h-6 rounded-full" /><span>{item.caregiver}</span></td>
                          <td className="p-4 text-gray-600">{item.from}</td>
                          <td className="p-4 text-gray-600">{item.to}</td>
                          <td className="p-4 text-gray-600">{item.hours}</td>
                          <td className="p-4 text-gray-600">{item.code}</td>
                          <td className="p-4 text-gray-600">{item.payer}</td>
                          <td className="p-4 text-gray-600">{item.provider}</td>
                          <td className="p-4 text-gray-600">{item.shift}</td>
                          <td className="p-4 text-right flex items-center justify-end gap-2">
                             <button onClick={() => handleEyeClick(item)} className="text-blue-500 hover:bg-blue-50 w-7 h-7 rounded-full flex items-center justify-center"><i className="fa-regular fa-eye"></i></button>
                             <span className="bg-green-50 text-green-600 px-2 py-1 rounded text-[10px] border border-green-100 cursor-pointer">Send Claim</span>
                          </td>
                       </tr>
                    ))}

                    {/* EVV CLAIMS ROWS */}
                    {activeTab === "EVV Claims" && evvClaimsData.map((item, i) => (
                       <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4"><input type="checkbox" /></td>
                          <td className="p-4 flex items-center gap-3"><img src={`https://i.pravatar.cc/150?img=${item.img}`} className="w-8 h-8 rounded-full" /><span className="font-medium text-gray-800">{item.client}</span></td>
                          <td className="p-4 text-gray-600">{item.claim}</td>
                          <td className="p-4 text-gray-600">{item.date}</td>
                          <td className="p-4 text-gray-600">{item.status}</td>
                          <td className="p-4 text-gray-600">{item.payer}</td>
                          <td className="p-4 text-gray-600">{item.charges}</td>
                          <td className="p-4 text-gray-600">{item.paid}</td>
                          <td className="p-4 text-gray-600">{item.workedFrom}</td>
                          <td className="p-4 text-gray-600">{item.workedTo}</td>
                          <td className="p-4 text-gray-600">{item.workedHours}</td>
                          <td className="p-4 text-gray-600">{item.employee}</td>
                          <td className="p-4 text-right flex items-center justify-end gap-2">
                             <button onClick={() => handleEyeClick(item)} className="text-blue-500 hover:bg-blue-50 w-7 h-7 rounded-full flex items-center justify-center"><i className="fa-regular fa-eye"></i></button>
                             <span className="bg-green-50 text-green-600 px-2 py-1 rounded text-[10px] border border-green-100 cursor-pointer">Send Claim</span>
                          </td>
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

        {/* Modal */}
        {showDetailModal && selectedItem && <EVVDetailModal item={selectedItem} activeTab={activeTab} onClose={() => setShowDetailModal(false)} />}

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
// EVV DETAIL MODAL 
// =========================================================================
function EVVDetailModal({ item, activeTab, onClose }: { item: any, activeTab: string, onClose: () => void }) {
  // Use "Send EVV Claims" layout vs others based on the tab
  const isSendClaimTab = activeTab === "Send EVV Claims";

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-6xl shadow-2xl flex flex-col max-h-[90vh] animate-slide-up relative">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
             <h2 className="text-xl font-bold text-gray-800">{isSendClaimTab ? "EVV Details" : "EVV Details"}</h2>
             <button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button>
          </div>
          
          <div className="p-8 overflow-y-auto bg-gray-50/30">
             <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                   <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                      {isSendClaimTab ? (
                         // Headers for Send EVV Claims Details 
                         <tr><th className="p-4">Client</th><th className="p-4">Employee</th><th className="p-4">Claim Number</th><th className="p-4">D.O.S</th><th className="p-4">Worked Hours</th><th className="p-4">EVV Accepted</th><th className="p-4">EVV Status</th><th className="p-4">Tellus Status</th></tr>
                      ) : (
                         // Headers for Billing Details 
                         <tr><th className="p-4">Service From</th><th className="p-4">Service To</th><th className="p-4">Worked Hours</th><th className="p-4">Service Rate</th><th className="p-4">Billing Amount</th><th className="p-4">Procedure Code</th><th className="p-4">Modifier</th></tr>
                      )}
                   </thead>
                   <tbody className="divide-y divide-gray-50">
                      {isSendClaimTab ? (
                         // Rows for Send EVV Claims
                         [1,2,3,4,5].map(i => (
                            <tr key={i}>
                               <td className="p-4 flex items-center gap-2"><img src={`https://i.pravatar.cc/150?img=${i}`} className="w-6 h-6 rounded-full" /> Sophie Reynolds</td>
                               <td className="p-4 flex items-center gap-2"><img src={`https://i.pravatar.cc/150?img=${i+10}`} className="w-6 h-6 rounded-full" /> Noah Patel</td>
                               <td className="p-4 text-gray-600">CLM0439300</td>
                               <td className="p-4 text-gray-600">01 Apr, 2025</td>
                               <td className="p-4 text-gray-600">1.00</td>
                               <td className="p-4 text-gray-600">No</td>
                               <td className="p-4 text-gray-600">-</td>
                               <td className="p-4 text-gray-600">COMP</td>
                            </tr>
                         ))
                      ) : (
                         // Rows for Billing Details
                         [1,2,3,4].map(i => (
                            <tr key={i}>
                               <td className="p-4">03/15/2023</td>
                               <td className="p-4">01/18/2024</td>
                               <td className="p-4">3.50</td>
                               <td className="p-4">7</td>
                               <td className="p-4">$120</td>
                               <td className="p-4">T1019</td>
                               <td className="p-4">No Modifier Code</td>
                            </tr>
                         ))
                      )}
                   </tbody>
                </table>
             </div>
          </div>

          <div className="p-6 border-t flex justify-end gap-3 bg-white">
             <button onClick={onClose} className="px-6 py-2.5 border rounded-lg text-sm">Back</button>
             <button className="px-6 py-2.5 bg-[#0074D9] text-white rounded-lg text-sm">{isSendClaimTab ? "Send Claims" : "Ready To Bill"}</button>
          </div>
       </div>
    </div>, document.body
  );
}