"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import DashboardLayout from "@/components/DashboardLayout";
import BillingStatsHeader from "@/components/BillingStatsHeader";
import Link from "next/link";

// 1. Define Interface to handle both data shapes
interface ClaimData {
  id: number;
  client: string;
  claimId: string;
  date: string;
  payer: string;
  charge: string;
  paid: string;
  from: string;
  to: string;
  sch: string;
  worked: string;
  emp: string;
  img: number;
  // Optional properties specific to one tab or the other
  schedule?: string; 
  status?: string;
}

export default function ClaimReportPage() {
  const [activeTab, setActiveTab] = useState<"All Claims" | "Void Claims">("All Claims");
  
  // Modal States
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showNotBillableModal, setShowNotBillableModal] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<any>(null);

  // Mock Data: All Claims (Matches image_b60742.png)
  const allClaims: ClaimData[] = [
    { id: 1, client: "Ella Martinez", claimId: "CLM05-9876543", date: "03/15/2023", payer: "Aging Resources", schedule: "03/15/2023", charge: "57.89", paid: "57.89", from: "01/18/2024", to: "01/18/2024", sch: "0.25 (1 Unit)", worked: "0.50 (2 Units)", emp: "IOS user-G", img: 1 },
    { id: 2, client: "Mia Carter", claimId: "CLM05-1234567", date: "07/22/2021", payer: "BCBS MN BLUE Plus Medicaid", schedule: "07/22/2021", charge: "23.45", paid: "23.45", from: "10/12/2021", to: "10/12/2021", sch: "0.25 (1 Unit)", worked: "0.50 (2 Units)", emp: "IOS user-G", img: 2 },
    { id: 3, client: "Mia Carter", claimId: "CLM05-7654321", date: "11/05/2020", payer: "Aging Resources", schedule: "11/05/2020", charge: "88.76", paid: "88.76", from: "11/09/2020", to: "11/09/2020", sch: "0.25 (1 Unit)", worked: "0.50 (2 Units)", emp: "IOS user-G", img: 2 },
    { id: 4, client: "Mia Carter", claimId: "CLM05-2345678", date: "01/30/2024", payer: "BCBS MN BLUE Plus Medicaid", schedule: "01/30/2024", charge: "32.10", paid: "32.10", from: "07/22/2025", to: "07/22/2025", sch: "0.25 (1 Unit)", worked: "0.50 (2 Units)", emp: "IOS user-G", img: 2 },
    { id: 5, client: "Mia Carter", claimId: "CLM05-8765432", date: "09/12/2022", payer: "Aging Resources", schedule: "09/12/2022", charge: "99.99", paid: "99.99", from: "09/30/2023", to: "09/30/2023", sch: "0.25 (1 Unit)", worked: "0.50 (2 Units)", emp: "IOS user-G", img: 2 },
  ];

  // Mock Data: Void Claims (Matches image_b60e07.png)
  const voidClaims: ClaimData[] = [
    { id: 1, client: "Ella Martinez", claimId: "CLM05-9876543", date: "03/15/2023", status: "Claim is Paid (834)", charge: "57.89", payer: "Aging Resources", paid: "57.89", from: "03/15/2023", to: "03/15/2023", sch: "0.25 (1 Unit)", worked: "40.00", emp: "Doe Jan", img: 1 },
    { id: 2, client: "Mia Carter", claimId: "CLM05-1234567", date: "07/22/2021", status: "07/22/2021", charge: "23.45", payer: "BCBS MN BLUE Plus Medicaid", paid: "23.45", from: "07/22/2021", to: "07/22/2021", sch: "0.25 (1 Unit)", worked: "40.00", emp: "Doe Jan", img: 2 },
    { id: 3, client: "Mia Carter", claimId: "CLM05-7654321", date: "11/05/2020", status: "11/05/2020", charge: "88.76", payer: "Aging Resources", paid: "88.76", from: "11/05/2020", to: "11/05/2020", sch: "0.25 (1 Unit)", worked: "40.00", emp: "Doe Jan", img: 2 },
    { id: 4, client: "Mia Carter", claimId: "CLM05-2345678", date: "01/30/2024", status: "01/30/2024", charge: "32.10", payer: "BCBS MN BLUE Plus Medicaid", paid: "32.10", from: "01/30/2024", to: "01/30/2024", sch: "0.25 (1 Unit)", worked: "40.00", emp: "Doe Jan", img: 2 },
    { id: 5, client: "Mia Carter", claimId: "CLM05-8765432", date: "09/12/2022", status: "09/12/2022", charge: "99.99", payer: "Aging Resources", paid: "99.99", from: "09/12/2022", to: "09/12/2022", sch: "0.25 (1 Unit)", worked: "40.00", emp: "Doe Jan", img: 2 },
  ];

  // Handle Eye Click (Only for Void Claims as requested)
  const handleEyeClick = (claim: any) => {
    setSelectedClaim(claim);
    setShowNotBillableModal(true);
  };

  const data = activeTab === "All Claims" ? allClaims : voidClaims;

  return (
    <DashboardLayout>
      <div className="p-0 space-y-6 bg-gray-50 min-h-screen">
         {/* Header and Stats Cards */}
       <BillingStatsHeader />

        {/* Main Content Area */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm p-6">
           <h2 className="text-xl font-bold text-gray-800 mb-6">Claim Report</h2>
           
           {/* Controls: Actions & Search */}
           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
              
              {/* Action Buttons Group */}
              <div className="flex flex-wrap gap-2">
                 <button className={`bg-red-50 text-red-600 border border-red-100 px-4 py-2 rounded-lg text-xs font-medium hover:bg-red-100 ${activeTab==="Void Claims" ? "" : "opacity-50"}`}>Rebill Claim</button>
                 <button className="bg-gray-50 text-gray-600 border border-gray-200 px-4 py-2 rounded-lg text-xs font-medium hover:bg-gray-100">Replace Claim</button>
                 <button className="bg-blue-50 text-blue-600 border border-blue-100 px-4 py-2 rounded-lg text-xs font-medium hover:bg-blue-100">Void Claims</button>
                 <button className="bg-yellow-50 text-yellow-600 border border-yellow-100 px-4 py-2 rounded-lg text-xs font-medium hover:bg-yellow-100">Claim Status Report</button>
                 <button className="bg-green-50 text-green-600 border border-green-100 px-4 py-2 rounded-lg text-xs font-medium hover:bg-green-100">Claim Note</button>
              </div>

              {/* Search & Date */}
              <div className="flex gap-3 w-full lg:w-auto">
                 <div className="relative flex-1 lg:w-48"><i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i><input type="text" placeholder="Search Anything..." className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg text-xs outline-none" /></div>
                 <div className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 bg-white flex items-center gap-2 whitespace-nowrap"><i className="fa-regular fa-calendar"></i> 1 Apr-30Apr 2025</div>
                 {/* DOWNLOAD BUTTON */}
                 <button onClick={() => setShowDownloadModal(true)} className="bg-blue-50 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-blue-100 flex-shrink-0"><i className="fa-solid fa-download text-xs"></i></button>
              </div>
           </div>

           {/* Tabs */}
           <div className="flex gap-2 mb-4 bg-gray-100 p-1 rounded-lg w-fit">
              <button onClick={() => setActiveTab("All Claims")} className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === "All Claims" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"}`}>All Claims</button>
              <button onClick={() => setActiveTab("Void Claims")} className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === "Void Claims" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"}`}>Void Claims</button>
           </div>

           {/* Table */}
           <div className="overflow-x-auto">
              <table className="w-full text-left text-xs whitespace-nowrap">
                 <thead className="bg-gray-50 text-gray-500 uppercase font-semibold">
                    <tr>
                       <th className="p-4 w-10"><input type="checkbox" /></th>
                       <th className="p-4">Client</th>
                       <th className="p-4">Claim ID</th>
                       <th className="p-4">Claim Date</th>
                       {activeTab === "Void Claims" && <th className="p-4">Claim Status</th>}
                       {activeTab === "Void Claims" && <th className="p-4">Total Charge</th>}
                       <th className="p-4">Payer</th>
                       {activeTab === "All Claims" && <th className="p-4">Schedule From</th>}
                       {activeTab === "All Claims" && <th className="p-4">Total Charge</th>}
                       <th className="p-4">Paid Amount</th>
                       <th className="p-4">{activeTab === "All Claims" ? "Worked From" : "Schedule From"}</th>
                       <th className="p-4">{activeTab === "All Claims" ? "Worked To" : "Schedule To"}</th>
                       <th className="p-4">Scheduled Hours</th>
                       <th className="p-4">{activeTab === "All Claims" ? "Worked Hours" : "Worked Hours"}</th>
                       <th className="p-4">Employee(s)</th>
                       {activeTab === "Void Claims" && <th className="p-4"></th>}
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {data.map((item, i) => (
                       <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4"><input type="checkbox" /></td>
                          <td className="p-4 flex items-center gap-3"><img src={`https://i.pravatar.cc/150?img=${item.img}`} className="w-8 h-8 rounded-full" /> <span className="font-medium text-gray-800">{item.client}</span></td>
                          <td className="p-4 text-gray-600">{item.claimId}</td>
                          <td className="p-4 text-gray-600">{item.date}</td>
                          {activeTab === "Void Claims" && <td className="p-4 text-gray-600">{item.status}</td>}
                          {activeTab === "Void Claims" && <td className="p-4 text-gray-600">{item.charge}</td>}
                          <td className="p-4 text-gray-600">{item.payer}</td>
                          {activeTab === "All Claims" && <td className="p-4 text-gray-600">{item.schedule}</td>}
                          {activeTab === "All Claims" && <td className="p-4 text-gray-600">{item.charge}</td>}
                          <td className="p-4 text-gray-600">{item.paid}</td>
                          <td className="p-4 text-gray-600">{item.from}</td>
                          <td className="p-4 text-gray-600">{item.to}</td>
                          <td className="p-4 text-gray-600">{item.sch}</td>
                          <td className="p-4 text-gray-600">{item.worked}</td>
                          <td className="p-4 text-gray-600">{item.emp}</td>
                          {activeTab === "Void Claims" && (
                             <td className="p-4 text-right">
                                <button onClick={() => handleEyeClick(item)} className="text-blue-500 hover:bg-blue-50 w-6 h-6 rounded-full flex items-center justify-center"><i className="fa-regular fa-eye text-xs"></i></button>
                             </td>
                          )}
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
        {showNotBillableModal && selectedClaim && <NotBillableIssueModal claim={selectedClaim} onClose={() => setShowNotBillableModal(false)} />}

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
             <div className="space-y-1"><label className="text-xs font-medium text-gray-500">Date</label><div className="relative"><input type="text" placeholder="DD / MM / YYYY - DD / MM / YYYY" className="w-full border rounded-lg p-2.5 text-sm" /><i className="fa-regular fa-calendar absolute right-3 top-3 text-gray-400"></i></div></div>
          </div>
          <div className="p-6 border-t flex justify-end"><button onClick={onClose} className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0062b8]">Download</button></div>
       </div>
    </div>, document.body
  );
}

// =========================================================================
// 2. NOT BILLABLE ISSUE MODAL 
// =========================================================================
function NotBillableIssueModal({ claim, onClose }: { claim: any, onClose: () => void }) {
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