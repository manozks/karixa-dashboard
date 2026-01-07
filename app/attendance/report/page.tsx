"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

export default function AttendanceReportPage() {
  const [activeTab, setActiveTab] = useState<"Employee" | "CareGiver">("Employee");
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  const employees = [
    { id: "EN-10001", name: "Ella Martinez", dept: "Internal Medicine", total: "368 hrs", worked: "251 Hrs", col5: "16 hrs", col6: "8 hrs", col7: "8 hrs" },
    { id: "EN-10002", name: "Mia Carter", dept: "Dermatology", total: "368 hrs", worked: "120 Hrs", col5: "8 hrs", col6: "7 hrs", col7: "8 hrs" },
  ];

  const caregivers = [
    { id: "CG-10001", name: "Dr. Mia Patel", dept: "N/A", total: "368 hrs", worked: "251 Hrs", col5: "16 hrs", col6: "257 hrs", col7: "-" }, // col6 = Approved Hours
    { id: "CG-10002", name: "Dr. Sophia King", dept: "N/A", total: "368 hrs", worked: "120 Hrs", col5: "8 hrs", col6: "47 hrs", col7: "-" },
  ];

  const data = activeTab === "Employee" ? employees : caregivers;

  return (
    <DashboardLayout>
      <div className="p-0 space-y-6 bg-gray-50 min-h-screen">
        
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link href="/attendance" className="hover:text-gray-800 flex items-center gap-1"><i className="fa-solid fa-chevron-left text-xs"></i> Back</Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-visible shadow-sm">
           <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                 <h2 className="text-xl font-bold text-gray-800 mb-4">{activeTab === "Employee" ? "Employee Report" : "Caregiver Report"}</h2>
                 <div className="flex bg-gray-100 p-1 rounded-lg w-fit">
                    <button onClick={() => setActiveTab("Employee")} className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === "Employee" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"}`}>Employee</button>
                    <button onClick={() => setActiveTab("CareGiver")} className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === "CareGiver" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"}`}>CareGiver</button>
                 </div>
              </div>

              <div className="flex gap-3">
                 <div className="relative w-48"><i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i><input type="text" placeholder="Search Anything..." className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg text-xs outline-none" /></div>
                 <div className="border border-gray-200 rounded-lg px-3 py-2 text-xs flex items-center gap-2 text-gray-600"><i className="fa-regular fa-calendar"></i> 1 Apr - 30 Apr 2025</div>
                 
                 {/* Download Dropdown */}
                 <div className="relative">
                    <button onClick={() => setShowDownloadMenu(!showDownloadMenu)} className="bg-blue-50 text-[#0074D9] border border-blue-100 px-4 py-2 rounded-lg text-xs font-medium hover:bg-blue-100 flex items-center gap-2">
                       <i className="fa-solid fa-download"></i> Download <i className="fa-solid fa-chevron-down"></i>
                    </button>
                    {showDownloadMenu && (
                       <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-lg shadow-xl z-50 py-1 animate-fade-in">
                          <button className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50">Print</button>
                          <button className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50">Export as CSV</button>
                          <button className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50">Download as PDF</button>
                       </div>
                    )}
                 </div>
              </div>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                 <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                    <tr>
                       <th className="p-4 w-10"><input type="checkbox" /></th>
                       <th className="p-4">ID</th>
                       <th className="p-4">Name</th>
                       {activeTab === "Employee" && <th className="p-4">Department</th>}
                       <th className="p-4">Total Hours</th>
                       <th className="p-4">Hour Worked</th>
                       <th className="p-4">{activeTab === "Employee" ? "Vacations" : "Recepe Hours"}</th>
                       <th className="p-4">{activeTab === "Employee" ? "Sick Leave" : "Approved Hours"}</th>
                       {activeTab === "Employee" && <th className="p-4">Holiday</th>}
                       <th className="p-4"></th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {data.map((item, i) => (
                       <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4"><input type="checkbox" /></td>
                          <td className="p-4 text-gray-500">{item.id}</td>
                          <td className="p-4">
                             {/* Clicking Name goes to Detailed Page */}
                             <Link href={`/attendance/report/${item.id}?type=${activeTab}`} className="flex items-center gap-3 font-medium text-gray-800 hover:text-[#0074D9]">
                                <img src={`https://i.pravatar.cc/150?img=${i + 10}`} className="w-8 h-8 rounded-full" />
                                {item.name}
                             </Link>
                          </td>
                          {activeTab === "Employee" && <td className="p-4 text-gray-600">{(item as any).dept}</td>}
                          <td className="p-4 text-gray-800 font-medium">{item.total}</td>
                          <td className="p-4 text-gray-600">{item.worked}</td>
                          <td className="p-4 text-gray-600">{item.col5}</td>
                          <td className="p-4 text-gray-600">{item.col6}</td>
                          {activeTab === "Employee" && <td className="p-4 text-gray-600">{(item as any).col7}</td>}
                          <td className="p-4 text-blue-500 text-right"><i className="fa-regular fa-eye"></i></td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}