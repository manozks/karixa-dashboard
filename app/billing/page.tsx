"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import BillingStatsHeader from "@/components/BillingStatsHeader";

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState("Ready To Bill");
  
  // Modal States
  const [showBillDetailModal, setShowBillDetailModal] = useState(false);
  const [showNotBillableModal, setShowNotBillableModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState<any>(null);

  // Mock Data
  const bills = [
    { id: 1, client: "Ella Martinez", sub: "20", payer: "Aging Resources", from: "03/15/2023", to: "01/18/2024", sch: "0.25 (1 Unit)", worked: "0.50 (2 Units)", start: "212.50", rem: "79", app: "0.75 (3 Units)", emp: "IOS user-G", amt: "0.00", status: "Ready", img: 1 },
    { id: 2, client: "Mia Carter", sub: "505", payer: "BCBS MN BLUE", from: "07/22/2021", to: "10/12/2021", sch: "0.25 (1 Unit)", worked: "0.50 (2 Units)", start: "212.50", rem: "79", app: "0.75 (3 Units)", emp: "IOS user-G", amt: "0.00", status: "Ready", img: 2 },
    { id: 3, client: "Ava Robinson", sub: "505", payer: "Aging Resources", from: "11/05/2020", to: "11/09/2020", sch: "0.25 (1 Unit)", worked: "0.50 (2 Units)", start: "237.50", rem: "111.5", app: "0.75 (3 Units)", emp: "IOS user-G", amt: "0.00", status: "Issue", img: 3 },
    { id: 4, client: "Lila Thomp", sub: "21", payer: "BCBS MN BLUE", from: "01/30/2024", to: "07/22/2025", sch: "0.25 (1 Unit)", worked: "0.50 (2 Units)", start: "237.50", rem: "79", app: "0.75 (3 Units)", emp: "IOS user-G", amt: "0.00", status: "Ready", img: 4 },
    { id: 5, client: "Zoe Williams", sub: "2121", payer: "Aging Resources", from: "09/12/2022", to: "09/30/2023", sch: "0.25 (1 Unit)", worked: "0.50 (2 Units)", start: "237.50", rem: "79", app: "0.75 (3 Units)", emp: "IOS user-G", amt: "0.00", status: "Issue", img: 5 },
  ];

  // Filter Data based on Tab
  const getFilteredData = () => {
    if (activeTab === "Not Billable") return bills.filter(b => b.status === "Issue");
    // For demo, "Ready To Bill" and "Generate Bill" use "Ready" status items
    return bills.filter(b => b.status === "Ready");
  };

  const handleEyeClick = (bill: any) => {
    setSelectedBill(bill);
    if (activeTab === "Not Billable") {
      setShowNotBillableModal(true);
    } else {
      setShowBillDetailModal(true);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-0 space-y-6 bg-gray-50 min-h-screen">
        
        {/* Header and Stats Cards */}
       <BillingStatsHeader />

        {/* Main Content Area */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm p-6">
           <h2 className="text-xl font-bold text-gray-800 mb-6">Billing</h2>
           
           {/* Controls */}
           <div className="flex flex-col xl:flex-row justify-between items-center gap-4 mb-6">
              {/* Tabs */}
              <div className="bg-gray-100 p-1 rounded-lg flex w-full xl:w-auto">
                 {["Ready To Bill", "Generate Bill", "Not Billable"].map(tab => (
                    <button 
                       key={tab}
                       onClick={() => setActiveTab(tab)}
                       className={`px-6 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${activeTab === tab ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"}`}
                    >
                       {tab}
                    </button>
                 ))}
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3 w-full xl:w-auto">
                 <div className="relative flex-1 xl:w-64">
                    <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                    <input type="text" placeholder="Search Anything..." className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0074D9]" />
                 </div>
                 <div className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white flex items-center gap-2"><i className="fa-regular fa-calendar"></i> 1 Apr-30Apr 2025</div>
                 <div className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white flex items-center gap-2">Month <i className="fa-solid fa-chevron-down text-xs"></i></div>
                 
                 {/* Dynamic Action Button */}
                 {activeTab === "Generate Bill" ? (
                    <>
                       <button className="bg-blue-50 text-[#0074D9] border border-blue-100 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100">Revert Ready to Bill</button>
                       <button className="bg-[#0074D9] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0062b8]">Bill Now</button>
                    </>
                 ) : (
                    <button className="bg-[#0074D9] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#0062b8]">Ready to Bill</button>
                 )}
              </div>
           </div>

           {/* Table */}
           <div className="overflow-x-auto">
              <table className="w-full text-left text-xs whitespace-nowrap">
                 <thead className="bg-gray-50 text-gray-500 uppercase font-semibold">
                    <tr>
                       <th className="p-2 w-5"><input type="checkbox" /></th>
                       <th className="p-4">Client</th>
                       <th className="p-4">Subscriber</th>
                       <th className="p-4">Payer</th>
                       <th className="p-4">Schedule From</th>
                       <th className="p-4">Schedule To</th>
                       <th className="p-4">Scheduled Hours</th>
                       <th className="p-4">Worked Hours</th>
                       <th className="p-4">Starting Units</th>
                       <th className="p-4">Remaining Units</th>
                       <th className="p-4">Approved</th>
                       <th className="p-4">Employee(s)</th>
                       <th className="p-4">Total Amount</th>
                       <th className="p-4 text-right"></th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {getFilteredData().map((item, i) => (
                       <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-2"><input type="checkbox" /></td>
                          <td className="p-4 flex items-center gap-3"><img src={`https://i.pravatar.cc/150?img=${item.img}`} className="w-8 h-8 rounded-full" /> <span className="font-medium text-gray-800">{item.client}</span></td>
                          <td className="p-4 text-gray-600 text-center">{item.sub}</td>
                          <td className="p-4 text-gray-600">{item.payer}</td>
                          <td className="p-4 text-gray-600">{item.from}</td>
                          <td className="p-4 text-gray-600">{item.to}</td>
                          <td className="p-4 text-gray-600">{item.sch}</td>
                          <td className="p-4 text-gray-600">{item.worked}</td>
                          <td className="p-4 text-gray-600">{item.start} <span className="text-gray-400">(850 Units)</span></td>
                          <td className="p-4 text-gray-600">{item.rem} <span className="text-gray-400">(316 Units)</span></td>
                          <td className="p-4 text-gray-600">{item.app}</td>
                          <td className="p-4 text-gray-600">{item.emp}</td>
                          <td className="p-4 text-gray-600">{item.amt}</td>
                          <td className="p-4 text-right flex items-center justify-end gap-2">
                             <button onClick={() => handleEyeClick(item)} className="w-7 h-7 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center hover:bg-blue-100"><i className="fa-regular fa-eye text-[10px]"></i></button>
                             {activeTab !== "Not Billable" && <span className="bg-green-50 text-green-600 px-2 py-1 rounded text-[10px] border border-green-100 whitespace-nowrap">{activeTab === "Generate Bill" ? "Bill Now" : "Ready to Bill"}</span>}
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
        {showBillDetailModal && selectedBill && <BillDetailModal bill={selectedBill} onClose={() => setShowBillDetailModal(false)} />}
        {showNotBillableModal && selectedBill && <NotBillableIssueModal bill={selectedBill} onClose={() => setShowNotBillableModal(false)} />}

      </div>
    </DashboardLayout>
  );
}

// =========================================================================
// HELPER COMPONENTS
// =========================================================================
function StatsCard({ title, value, sub, icon }: any) {
   return (
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm relative">
         <div className="absolute top-5 right-5 text-gray-300 text-xl"><i className={`fa-solid fa-${icon}-sign`}></i></div>
         <p className="text-xs text-gray-500 mb-1">{title}</p>
         <h3 className="text-2xl font-bold text-gray-800 mb-1">{value}</h3>
         <p className="text-[10px] text-green-500 font-medium">{sub}</p>
      </div>
   )
}

// =========================================================================
// 1. BILL DETAIL MODAL 
// =========================================================================
function BillDetailModal({ bill, onClose }: { bill: any, onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl flex flex-col max-h-[90vh] animate-slide-up relative">
          <div className="flex justify-between items-center p-6 border-b border-gray-100"><h2 className="text-xl font-bold text-gray-800">Bill Detail</h2><button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button></div>
          
          <div className="p-8 overflow-y-auto bg-gray-50/30">
             {/* Header Info */}
             <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 mb-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                <div><label className="text-xs text-gray-500 block mb-1">Service Auth</label><span className="font-bold text-[#0074D9]">94466688</span></div>
                <div><label className="text-xs text-gray-500 block mb-1">Units</label><span className="font-bold text-gray-800">10000.00</span></div>
                <div><label className="text-xs text-gray-500 block mb-1">Start Date</label><span className="font-bold text-gray-800">01 April, 2025</span></div>
                <div><label className="text-xs text-gray-500 block mb-1">End Date</label><span className="font-bold text-gray-800">01 May, 2025</span></div>
                <div><label className="text-xs text-gray-500 block mb-1">Company NPI</label><span className="font-bold text-[#0074D9]">1793629098</span></div>
                <div><label className="text-xs text-gray-500 block mb-1">Taxonomy</label><span className="font-bold text-gray-800">1345544</span></div>
                <div><label className="text-xs text-gray-500 block mb-1">Banked Hours</label><span className="font-bold text-gray-800">2459.52</span></div>
             </div>

             {/* Line Items Table */}
             <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                   <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                      <tr><th className="p-4">Service From</th><th className="p-4">Service To</th><th className="p-4">Worked Hours</th><th className="p-4">Service Rate</th><th className="p-4">Billing Amount</th><th className="p-4">Procedure Code</th><th className="p-4">Modifier</th></tr>
                   </thead>
                   <tbody className="divide-y divide-gray-50">
                      {[1,2].map(i => (
                         <tr key={i}>
                            <td className="p-4">03/15/2023</td>
                            <td className="p-4">01/18/2024</td>
                            <td className="p-4">3.50</td>
                            <td className="p-4">7</td>
                            <td className="p-4">$120</td>
                            <td className="p-4">T1019</td>
                            <td className="p-4">U6</td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>

          <div className="p-6 border-t flex justify-end gap-3 bg-white"><button onClick={onClose} className="px-6 py-2.5 border rounded-lg text-sm">Back</button><button className="px-6 py-2.5 bg-[#0074D9] text-white rounded-lg text-sm">Ready To Bill</button></div>
       </div>
    </div>, document.body
  );
}

// =========================================================================
// 2. NOT BILLABLE ISSUE MODAL 
// =========================================================================
function NotBillableIssueModal({ bill, onClose }: { bill: any, onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl flex flex-col max-h-[90vh] animate-slide-up relative">
          <div className="flex justify-between items-center p-6 border-b border-gray-100"><h2 className="text-xl font-bold text-gray-800">Not Billable Issue</h2><button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button></div>
          
          <div className="p-8 overflow-y-auto bg-gray-50/30">
             {/* Header Info */}
             <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 mb-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                <div><label className="text-xs text-gray-500 block mb-1">Service Auth</label><span className="font-bold text-[#0074D9]">94466688</span></div>
                <div><label className="text-xs text-gray-500 block mb-1">Units</label><span className="font-bold text-gray-800">10000.00</span></div>
                <div><label className="text-xs text-gray-500 block mb-1">Start Date</label><span className="font-bold text-gray-800">01 April, 2025</span></div>
                <div><label className="text-xs text-gray-500 block mb-1">End Date</label><span className="font-bold text-gray-800">01 May, 2025</span></div>
                <div><label className="text-xs text-gray-500 block mb-1">Company NPI</label><span className="font-bold text-[#0074D9]">1793629098</span></div>
                <div><label className="text-xs text-gray-500 block mb-1">Taxonomy</label><span className="font-bold text-gray-800">1345544</span></div>
                <div><label className="text-xs text-gray-500 block mb-1">Banked Hours</label><span className="font-bold text-gray-800">2459.52</span></div>
             </div>

             {/* Error Box */}
             <div className="bg-red-50 border border-red-100 p-4 rounded-xl mb-6 flex justify-between items-center">
                <div>
                   <h4 className="text-xs font-bold text-gray-500 mb-1">Missing Detail</h4>
                   <p className="text-sm font-bold text-red-600">Employee UMPI, Service Rate is 0</p>
                </div>
                <button className="bg-[#EF4444] text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-red-700 shadow-sm shadow-red-200">Redirect To Issues</button>
             </div>

             {/* Line Items Table */}
             <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                   <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                      <tr><th className="p-4">Service From</th><th className="p-4">Service To</th><th className="p-4">Worked Hours</th><th className="p-4">Service Rate</th><th className="p-4">Billing Amount</th><th className="p-4">Procedure Code</th><th className="p-4">Modifier</th></tr>
                   </thead>
                   <tbody className="divide-y divide-gray-50">
                      {[1,2,3].map(i => (
                         <tr key={i}>
                            <td className="p-4">03/15/2023</td>
                            <td className="p-4">01/18/2024</td>
                            <td className="p-4">3.50</td>
                            <td className="p-4">7</td>
                            <td className="p-4">$120</td>
                            <td className="p-4">T1019</td>
                            <td className="p-4">U6</td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
       </div>
    </div>, document.body
  );
}