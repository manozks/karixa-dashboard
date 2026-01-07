"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import DashboardLayout from "@/components/DashboardLayout";
import BillingStatsHeader from "@/components/BillingStatsHeader";
import Link from "next/link";

export default function InvoicePage() {
  const [activeTab, setActiveTab] = useState<"Generate Invoice" | "View Invoices">("View Invoices");
  
  // Modal States
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showPrintViewModal, setShowPrintViewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Mock Data: View Invoices 
  const invoices = [
    { id: 1, client: "Ava Johnson", invoice: "INVOICE-9398042", amount: "189.67", paid: "162.45", due: "03/15/2023", by: "Lucas Garcia", status: "Waiting for Payment", img: 1, adminImg: 11 },
    { id: 2, client: "Sophie Reynolds", invoice: "INVOICE-1234567", amount: "194.32", paid: "169.99", due: "07/22/2021", by: "Isabella Chen", status: "Generated", img: 2, adminImg: 12 },
    { id: 3, client: "Ethan Brooks", invoice: "INVOICE-7654321", amount: "178.90", paid: "100.12", due: "11/05/2020", by: "Mia Robinson", status: "Waiting for Payment", img: 3, adminImg: 13 },
    { id: 4, client: "Liam Thompson", invoice: "INVOICE-8901234", amount: "165.75", paid: "64.88", due: "01/30/2024", by: "Oliver Smith", status: "Waiting for Payment", img: 4, adminImg: 14 },
    { id: 5, client: "Noah Patel", invoice: "INVOICE-4567890", amount: "172.58", paid: "70.33", due: "09/12/2022", by: "Chloe Davis", status: "Waiting for Payment", img: 5, adminImg: 15 },
  ];

  // Mock Data: Generate Invoice 
  const generateList = [
    { id: 1, client: "Ava Johnson", balance: "7.00", payer: "Minnesota Department of Social Services", claim: "CLAM0921", adjDate: "03/15/2023", reason: "Deductible Amount", dosFrom: "03/15/2023", dosTo: "17/25/2023", code: "T2034", img: 1 },
    { id: 2, client: "Sophie Reynolds", balance: "2.00", payer: "Helping Hands Community Center", claim: "CLAM0765", adjDate: "07/22/2021", reason: "Generated", dosFrom: "07/22/2021", dosTo: "17/02/2021", code: "T3045", img: 2 },
    { id: 3, client: "Ethan Brooks", balance: "1.00", payer: "Bright Futures Support Network", claim: "CLAM0589", adjDate: "11/05/2020", reason: "Waiting for Payment", dosFrom: "11/05/2020", dosTo: "12/09/2020", code: "T4056", img: 3 },
    { id: 4, client: "Liam Thompson", balance: "2.00", payer: "Unity Care Alliance", claim: "CLAM0347", adjDate: "01/30/2024", reason: "Waiting for Payment", dosFrom: "01/30/2024", dosTo: "11/10/2024", code: "T5067", img: 4 },
    { id: 5, client: "Noah Patel", balance: "3.00", payer: "Compassionate Hearts Foundation", claim: "CLAM1182", adjDate: "09/12/2022", reason: "Waiting for Payment", dosFrom: "09/12/2022", dosTo: "11/23/2022", code: "T6078", img: 5 },
  ];

  // Handle Eye Click -> Detail Modal
  const handleEyeClick = (inv: any) => {
    setSelectedItem(inv);
    setShowDetailModal(true);
  };

  // Handle "View & Print" Click -> Switch to Print Modal
  const handleViewPrint = () => {
    setShowDetailModal(false);
    setTimeout(() => setShowPrintViewModal(true), 200); 
  };

  return (
    <DashboardLayout>
      <div className="p-0 space-y-6 bg-gray-50 min-h-screen">
        
              {/* Header and Stats Cards */}
                     <BillingStatsHeader />

        {/* Main Content Area */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm p-6">
           <h2 className="text-xl font-bold text-gray-800 mb-6">Invoice Statement</h2>
           
           {/* Controls */}
           <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
              
              {/* Toggle Tabs */}
              <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                 <button 
                    onClick={() => setActiveTab("Generate Invoice")}
                    className={`px-4 py-2 text-xs font-medium rounded-md transition-all ${activeTab === "Generate Invoice" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"}`}
                 >
                    Generate Invoice
                 </button>
                 <button 
                    onClick={() => setActiveTab("View Invoices")}
                    className={`px-4 py-2 text-xs font-medium rounded-md transition-all ${activeTab === "View Invoices" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"}`}
                 >
                    View Invoices
                 </button>
              </div>

              {/* Search & Date */}
              <div className="flex gap-3 w-full lg:w-auto">
                 <div className="relative flex-1 lg:w-64"><i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i><input type="text" placeholder="Search Anything..." className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg text-xs outline-none" /></div>
                 <div className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 bg-white flex items-center gap-2 whitespace-nowrap"><i className="fa-regular fa-calendar"></i> 1 Apr-30Apr 2025</div>
                 {activeTab === "Generate Invoice" && (
                    <button className="bg-[#0074D9] text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-[#0062b8] whitespace-nowrap">Generate Invoice</button>
                 )}
              </div>
           </div>

           {/* Table */}
           <div className="overflow-x-auto">
              <table className="w-full text-left text-xs whitespace-nowrap">
                 <thead className="bg-gray-50 text-gray-500 uppercase font-semibold">
                    {activeTab === "View Invoices" ? (
                       <tr>
                          <th className="p-4 w-10"><input type="checkbox" /></th>
                          <th className="p-4">Client</th>
                          <th className="p-4">Invoice</th>
                          <th className="p-4">Invoice Amount</th>
                          <th className="p-4">Paid Amount</th>
                          <th className="p-4">Due Date</th>
                          <th className="p-4">Generated By</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right"></th>
                       </tr>
                    ) : (
                       <tr>
                          <th className="p-4 w-10"><input type="checkbox" /></th>
                          <th className="p-4">Client</th>
                          <th className="p-4">Patient Balance</th>
                          <th className="p-4">Payer</th>
                          <th className="p-4">Claim#</th>
                          <th className="p-4">Adjustment Date</th>
                          <th className="p-4">Reason Code</th>
                          <th className="p-4">DOS From</th>
                          <th className="p-4">DOS To</th>
                          <th className="p-4">Procedure Code</th>
                       </tr>
                    )}
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {activeTab === "View Invoices" ? (
                       invoices.map((item, i) => (
                          <tr key={i} className="hover:bg-gray-50 transition-colors">
                             <td className="p-4"><input type="checkbox" /></td>
                             <td className="p-4 flex items-center gap-3"><img src={`https://i.pravatar.cc/150?img=${item.img}`} className="w-8 h-8 rounded-full" /> <span className="font-medium text-gray-800">{item.client}</span></td>
                             <td className="p-4 text-gray-600">{item.invoice}</td>
                             <td className="p-4 text-gray-600">{item.amount}</td>
                             <td className="p-4 text-gray-600">{item.paid}</td>
                             <td className="p-4 text-gray-600">{item.due}</td>
                             <td className="p-4 flex items-center gap-2"><img src={`https://i.pravatar.cc/150?img=${item.adminImg}`} className="w-6 h-6 rounded-full" /> <span className="text-gray-600">{item.by}</span></td>
                             <td className="p-4 text-gray-600">{item.status}</td>
                             <td className="p-4 text-right flex items-center justify-end gap-2">
                                <button onClick={() => handleEyeClick(item)} className="text-blue-500 hover:bg-blue-50 w-7 h-7 rounded-full flex items-center justify-center"><i className="fa-regular fa-eye text-xs"></i></button>
                                <button onClick={() => setShowDownloadModal(true)} className="text-green-500 hover:bg-green-50 w-7 h-7 rounded-full flex items-center justify-center"><i className="fa-solid fa-download text-xs"></i></button>
                                <button className="text-red-500 hover:bg-red-50 w-7 h-7 rounded-full flex items-center justify-center"><i className="fa-regular fa-trash-can text-xs"></i></button>
                             </td>
                          </tr>
                       ))
                    ) : (
                       generateList.map((item, i) => (
                          <tr key={i} className="hover:bg-gray-50 transition-colors">
                             <td className="p-4"><input type="checkbox" /></td>
                             <td className="p-4 flex items-center gap-3"><img src={`https://i.pravatar.cc/150?img=${item.img}`} className="w-8 h-8 rounded-full" /> <span className="font-medium text-gray-800">{item.client}</span></td>
                             <td className="p-4 text-gray-600">{item.balance}</td>
                             <td className="p-4 text-gray-600">{item.payer}</td>
                             <td className="p-4 text-gray-600">{item.claim}</td>
                             <td className="p-4 text-gray-600">{item.adjDate}</td>
                             <td className="p-4 text-gray-600">{item.reason}</td>
                             <td className="p-4 text-gray-600">{item.dosFrom}</td>
                             <td className="p-4 text-gray-600">{item.dosTo}</td>
                             <td className="p-4 text-gray-600">{item.code}</td>
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

        {/* --- MODALS --- */}
        {showDownloadModal && <DownloadModal onClose={() => setShowDownloadModal(false)} />}
        {showDetailModal && selectedItem && <InvoiceDetailModal inv={selectedItem} onViewPrint={handleViewPrint} onClose={() => setShowDetailModal(false)} />}
        {showPrintViewModal && selectedItem && <InvoicePrintModal inv={selectedItem} onClose={() => setShowPrintViewModal(false)} />}

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
// 1. DOWNLOAD MODAL (Matches image_0c7c2d.png)
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
// 2. INVOICE DETAIL MODAL (Matches image_0c77f1.png)
// =========================================================================
function InvoiceDetailModal({ inv, onViewPrint, onClose }: { inv: any, onViewPrint: () => void, onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl flex flex-col max-h-[90vh] animate-slide-up relative">
          <div className="flex justify-between items-center p-6 border-b border-gray-100"><h2 className="text-xl font-bold text-gray-800">Invoice Detail</h2><button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button></div>
          
          <div className="p-8 overflow-y-auto">
             <div className="grid grid-cols-4 gap-6 mb-6">
                <div><label className="text-xs text-gray-500 block mb-1">Claim ID</label><span className="text-sm font-medium text-gray-800">CLM032U34</span></div>
                <div><label className="text-xs text-gray-500 block mb-1">Services</label><span className="text-sm font-medium text-gray-800">INV923402</span></div>
                <div><label className="text-xs text-gray-500 block mb-1">Invoice Amount</label><span className="text-sm font-medium text-gray-800">103.00</span></div>
                <div><label className="text-xs text-gray-500 block mb-1">Paid Amount</label><span className="text-sm font-medium text-gray-800">0.00</span></div>
             </div>

             <div className="mb-6">
                <label className="text-xs text-gray-500 block mb-2">Reason Code</label>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs text-gray-600 leading-relaxed">
                   The benefit for this service is included in the payment/allowance for another service/procedure that has already been adjudicated. Usage: Refer to the 835 Healthcare Policy Identification Segment (loop 2110 Service Payment Information REF), if present.
                </div>
             </div>

             <div className="grid grid-cols-4 gap-4 text-xs text-gray-600 border-t border-gray-100 pt-4">
                <div>INVOICE-4567890</div>
                <div>172.58</div>
                <div>70.33</div>
                <div>09/12/2022</div>
             </div>
          </div>

          <div className="p-6 border-t flex justify-between items-center bg-gray-50 rounded-b-2xl">
             <button className="px-6 py-2.5 border border-red-200 text-red-600 rounded-lg text-xs font-medium hover:bg-red-50">Delete Invoice</button>
             <div className="flex gap-3">
                <button className="px-6 py-2.5 border border-blue-200 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-50">Mark As Paid</button>
                <button onClick={onViewPrint} className="px-6 py-2.5 bg-[#0074D9] text-white rounded-lg text-xs font-medium hover:bg-[#0062b8]">View & Print</button>
             </div>
          </div>
       </div>
    </div>, document.body
  );
}

// =========================================================================
// 3. INVOICE PRINT/VIEW MODAL (Matches image_0c786c.png)
// =========================================================================
function InvoicePrintModal({ inv, onClose }: { inv: any, onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[95vh] animate-slide-up relative">
          <div className="flex justify-between items-center p-6 border-b border-gray-100"><h2 className="text-xl font-bold text-gray-800">Invoice Details</h2><button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button></div>
          
          <div className="p-8 overflow-y-auto">
             <div className="flex gap-6 mb-8">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center p-2"><span className="text-xl font-bold text-gray-400">Logo</span></div>
                <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-xs flex-1">
                   <div><p className="text-gray-400 mb-1">Billed By</p><p className="font-bold text-[#0074D9]">Karixa Pvt. Ltd</p><p className="text-gray-500 mt-1"><span className="font-bold">ID:</span> P: 64543433</p><p className="text-gray-500">92374 Zane Ave N Ste 2014</p></div>
                   <div><p className="text-gray-400 mb-1">Paid To</p><p className="font-bold text-[#0074D9]">Frampton, Leah</p><p className="text-gray-500 mt-1"><span className="font-bold">ID:</span> P: 64543433</p><p className="text-gray-500">Minneapolis, Minnesota 55111</p></div>
                </div>
             </div>

             <div className="space-y-1 mb-6 text-xs">
                <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-500">Invoice No:</span><span className="font-bold text-gray-800">INV00034820</span></div>
                <div className="flex justify-between border-b border-gray-100 py-2"><span className="text-gray-500">Invoice Date:</span><span className="font-bold text-gray-800">12/09/2025</span></div>
                <div className="flex justify-between bg-blue-50 p-2 rounded text-blue-800 font-bold mt-2"><span>Total Due:</span><span>$ 120.00</span></div>
             </div>

             <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-4 gap-4 text-xs text-gray-500 font-medium border-b border-gray-200 pb-2 mb-2">
                   <div>Service</div><div>Reason Code</div><div>Invoice Amount</div><div>Paid Amount</div>
                </div>
                <div className="grid grid-cols-4 gap-4 text-xs text-gray-700">
                   <div>T1019</div>
                   <div className="leading-relaxed">The diagnosis is inconsistent with the patient's gender. Usage: Refer to the 835 healthcare Policy...</div>
                   <div>120.00</div>
                   <div>0.00</div>
                </div>
             </div>
          </div>

          <div className="p-6 border-t flex justify-end gap-3 bg-white rounded-b-2xl">
             <button className="px-6 py-2.5 border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-50">Print & Send Email</button>
             <button className="px-6 py-2.5 bg-[#0074D9] text-white rounded-lg text-xs font-medium hover:bg-[#0062b8]">Print & Send Fax</button>
          </div>
       </div>
    </div>, document.body
  );
}