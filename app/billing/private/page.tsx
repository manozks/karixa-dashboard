"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BillingStatsHeader from "@/components/BillingStatsHeader";

export default function PrivatePayBillingPage() {
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const router = useRouter();

  // Mock Data (Matches image_10ba03.png)
  const bills = [
    { id: 1, client: "Ella Martinez", invoice: "20", date: "03/15/2023", due: "03/15/2023", from: "03/15/2023", to: "03/15/2023", hours: "6.00", total: "120.00", paid: "120.00", by: "dintermill", img: 1 },
    { id: 2, client: "Mia Carter", invoice: "505", date: "07/22/2021", due: "07/22/2021", from: "07/22/2021", to: "07/22/2021", hours: "6.00", total: "120.00", paid: "120.00", by: "dintermill", img: 2 },
    { id: 3, client: "Mia Carter", invoice: "505", date: "11/05/2020", due: "11/05/2020", from: "11/05/2020", to: "11/05/2020", hours: "6.00", total: "120.00", paid: "120.00", by: "dintermill", img: 2 },
    { id: 4, client: "Mia Carter", invoice: "2121566", date: "01/30/2024", due: "01/30/2024", from: "01/30/2024", to: "01/30/2024", hours: "6.00", total: "120.00", paid: "120.00", by: "dintermill", img: 2 },
    { id: 5, client: "Mia Carter", invoice: "2121566", date: "09/12/2022", due: "09/12/2022", from: "09/12/2022", to: "09/12/2022", hours: "6.00", total: "120.00", paid: "120.00", by: "dintermill", img: 2 },
  ];

  return (
    <DashboardLayout>
      <div className="p-0 space-y-6 bg-gray-50 min-h-screen">
         {/* Header and Stats Cards */}
       <BillingStatsHeader />

        {/* Content Box */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm p-6">
           <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <h2 className="text-xl font-bold text-gray-800">Private Bill Generated</h2>
              <div className="flex gap-3 w-full md:w-auto">
                 <div className="relative flex-1 md:w-64"><i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i><input type="text" placeholder="Search Anything..." className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand" /></div>
                 <div className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white flex items-center gap-2"><i className="fa-regular fa-calendar"></i> 1 Apr-30Apr 2025</div>
                 <button onClick={() => setShowGenerateModal(true)} className="bg-[#0074D9] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-sm">Generate a Bill</button>
              </div>
           </div>

           {/* Table */}
           <div className="overflow-x-auto">
              <table className="w-full text-left text-xs whitespace-nowrap">
                 <thead className="bg-gray-50 text-gray-500 uppercase font-semibold">
                    <tr><th className="p-4 w-10"><input type="checkbox" /></th><th className="p-4">Client</th><th className="p-4">Invoice Number</th><th className="p-4">Invoice Date</th><th className="p-4">Due Date</th><th className="p-4">Service From Date</th><th className="p-4">Service To Date</th><th className="p-4">Hours</th><th className="p-4">Total Amount</th><th className="p-4">Paid Amount</th><th className="p-4">Billed By</th><th className="p-4 text-right"></th></tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {bills.map((item, i) => (
                       <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4"><input type="checkbox" /></td>
                          <td className="p-4 flex items-center gap-3"><img src={`https://i.pravatar.cc/150?img=${item.img}`} className="w-8 h-8 rounded-full" /> <span className="font-medium text-gray-800">{item.client}</span></td>
                          <td className="p-4 text-gray-600 text-center">{item.invoice}</td>
                          <td className="p-4 text-gray-600">{item.date}</td>
                          <td className="p-4 text-gray-600">{item.due}</td>
                          <td className="p-4 text-gray-600">{item.from}</td>
                          <td className="p-4 text-gray-600">{item.to}</td>
                          <td className="p-4 text-gray-600">{item.hours}</td>
                          <td className="p-4 text-gray-600">{item.total}</td>
                          <td className="p-4 text-gray-600">{item.paid}</td>
                          <td className="p-4 text-gray-600">{item.by}</td>
                          <td className="p-4 text-right flex items-center justify-end gap-2">
                             <button className="text-blue-500 hover:bg-blue-50 w-7 h-7 rounded-full flex items-center justify-center"><i className="fa-regular fa-eye"></i></button>
                             <button className="text-yellow-500 hover:bg-yellow-50 w-7 h-7 rounded-full flex items-center justify-center"><i className="fa-solid fa-check"></i></button>
                             <button className="text-green-500 hover:bg-green-50 w-7 h-7 rounded-full flex items-center justify-center"><i className="fa-solid fa-download"></i></button>
                             <button className="text-red-500 hover:bg-red-50 w-7 h-7 rounded-full flex items-center justify-center"><i className="fa-regular fa-trash-can"></i></button>
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
        {showGenerateModal && <GenerateBillModal onClose={() => setShowGenerateModal(false)} onGenerate={() => router.push('/billing/private/generated')} />}

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
// GENERATE BILL MODAL 
// =========================================================================
function GenerateBillModal({ onClose, onGenerate }: { onClose: () => void, onGenerate: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col animate-scale-up relative">
          <div className="flex justify-between items-center p-6 border-b border-gray-100"><h2 className="text-xl font-bold text-gray-800">Generate Bill</h2><button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button></div>
          <div className="p-6 space-y-4">
             <div className="space-y-1"><label className="text-xs font-medium text-gray-500">Patient</label><select className="w-full border rounded-lg p-2.5 text-sm bg-white text-gray-500 outline-none focus:border-brand"><option>Select</option></select></div>
             <div className="space-y-1"><label className="text-xs font-medium text-gray-500">Service Dates</label><div className="relative"><input className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-brand" placeholder="DD / MM / YYYY - DD / MM / YYYY" /><i className="fa-regular fa-calendar absolute right-3 top-3 text-gray-400"></i></div></div>
          </div>
          <div className="p-6 border-t flex justify-end"><button onClick={onGenerate} className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-lg">Generate</button></div>
       </div>
    </div>, document.body
  );
}