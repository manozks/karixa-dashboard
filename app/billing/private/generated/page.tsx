"use client";

import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

export default function PrivateBillGeneratedPage() {
  return (
    <DashboardLayout>
      <div className="p-0 space-y-6 bg-gray-50 min-h-screen">
        
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link href="/billing/private" className="hover:text-gray-800 flex items-center gap-1"><i className="fa-solid fa-chevron-left text-xs"></i> Back</Link>
        </div>

        <h1 className="text-xl font-bold text-gray-800 mb-4">Private Bill Generated</h1>

        <div className="flex flex-col xl:flex-row gap-6">
           
           {/* Left: Service Details Table */}
           <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm h-fit">
              <table className="w-full text-left text-sm">
                 <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                    <tr><th className="p-4">Service Type</th><th className="p-4">Service Date</th><th className="p-4">Hours</th><th className="p-4">Charges</th></tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {[
                       { date: "01/18/2024", charge: "40.00" },
                       { date: "10/12/2021", charge: "40.00" },
                       { date: "11/09/2020", charge: "40.00" },
                       { date: "07/22/2025", charge: "40.00" },
                    ].map((row, i) => (
                       <tr key={i}>
                          <td className="p-4 text-gray-600">Personal Care</td>
                          <td className="p-4 text-gray-600">{row.date}</td>
                          <td className="p-4 text-gray-600">2.00</td>
                          <td className="p-4"><span className="border border-gray-200 rounded px-3 py-1 bg-white text-xs">{row.charge}</span></td>
                       </tr>
                    ))}
                 </tbody>
              </table>
              <div className="border-t border-gray-100 p-4">
                 <table className="w-full text-left text-xs">
                    <thead className="text-gray-500"><tr><th>Experience Category</th><th>Expense Date</th><th>Quantity</th><th>Amount</th></tr></thead>
                    <tbody><tr><td className="pt-2 text-gray-600">Personal Care</td><td></td><td></td><td></td></tr></tbody>
                 </table>
              </div>
           </div>

           {/* Right: Invoice Summary Card */}
           <div className="w-full xl:w-96 bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-fit">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Billing Invoice</h3>
              
              <div className="flex gap-4 mb-6">
                 <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center"><i className="fa-solid fa-leaf text-green-600"></i></div>
                 <div className="space-y-4 text-xs">
                    <div>
                       <p className="text-gray-400 mb-1">Billed By</p>
                       <p className="font-bold text-gray-800">Karixa Pvt. Ltd</p>
                       <p className="text-gray-500 mt-1">P: 64543433</p>
                       <p className="text-gray-500">92374 Zane Ave N Ste 2014</p>
                    </div>
                    <div>
                       <p className="text-gray-400 mb-1">Paid To</p>
                       <p className="font-bold text-gray-800">Frampton, Leah</p>
                       <p className="text-gray-500 mt-1">ID: 64543433</p>
                       <p className="text-gray-500">Minneapolis, Minnesota 55111</p>
                    </div>
                 </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-2 mb-6 text-sm">
                 <div className="flex justify-between"><span className="text-gray-500">Invoice No:</span><span className="font-bold text-gray-800">INV00034820</span></div>
                 <div className="flex justify-between"><span className="text-gray-500">Invoice Date:</span><span className="font-bold text-gray-800">12/09/2025</span></div>
                 <div className="border-t border-gray-200 my-2 pt-2 flex justify-between bg-blue-100 p-2 rounded"><span className="font-medium text-blue-800">Total Due:</span><span className="font-bold text-blue-800">$ 120.00</span></div>
              </div>

              <div className="flex flex-col gap-2">
                 <div className="flex gap-2">
                    <button className="flex-1 border border-gray-200 rounded-lg py-2 text-xs font-medium hover:bg-gray-50">Generate & Email</button>
                    <button className="flex-1 border border-gray-200 rounded-lg py-2 text-xs font-medium hover:bg-gray-50">Generate & Fax</button>
                 </div>
                 <button className="bg-[#0074D9] text-white w-full rounded-lg py-2 text-sm font-medium hover:bg-[#0062b8]">Generate</button>
              </div>
           </div>

        </div>
      </div>
    </DashboardLayout>
  );
}