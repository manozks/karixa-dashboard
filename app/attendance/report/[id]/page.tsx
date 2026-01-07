"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function MonthlyAttendancePage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const type = searchParams.get("type"); // "Employee" or "CareGiver"
  
  const [showNotesModal, setShowNotesModal] = useState(false);

  // Mock daily data
  const logs = [
    { date: "1 April, 2025", checkIn: "8:00 AM", checkOut: "4:00 PM", hours: "8 hrs", status: "Present" },
    { date: "2 April, 2025", checkIn: "8:00 AM", checkOut: "4:00 PM", hours: "8 hrs", status: "Present" },
    { date: "3 April, 2025", checkIn: "-", checkOut: "-", hours: "-", status: "Sick Leave" },
    { date: "4 April, 2025", checkIn: "8:00 AM", checkOut: "4:00 PM", hours: "8 hrs", status: "Present" },
  ];

  return (
    <DashboardLayout>
      <div className="p-0 space-y-6 bg-gray-50 min-h-screen">
        
        {/* Back Button */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/attendance/report" className="hover:text-gray-800 flex items-center gap-1"><i className="fa-solid fa-chevron-left text-xs"></i> Back</Link>
        </div>

        {/* Profile & Stats Header */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 flex flex-col xl:flex-row gap-6">
           <div className="flex items-center gap-4 border-r border-gray-100 pr-6 min-w-[250px]">
              <img src="https://i.pravatar.cc/150?img=12" className="w-16 h-16 rounded-full" />
              <div>
                 <h1 className="text-xl font-bold text-gray-800">Ella Martinez</h1>
                 <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs font-medium">{type === "CareGiver" ? "Caregiver" : "Employee"}</span>
              </div>
           </div>
           
           <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border border-gray-100 rounded-lg p-4">
                 <div className="flex justify-between mb-2"><span className="text-xs text-gray-500">Total Hours</span><i className="fa-solid fa-file text-gray-300"></i></div>
                 <h3 className="text-2xl font-bold text-gray-800">23 Hrs</h3>
                 <p className="text-[10px] text-green-500">+16% from last month</p>
              </div>
              <div className="border border-gray-100 rounded-lg p-4">
                 <div className="flex justify-between mb-2"><span className="text-xs text-gray-500">Regular</span><i className="fa-solid fa-file text-gray-300"></i></div>
                 <h3 className="text-2xl font-bold text-gray-800">23 Hrs</h3>
                 <p className="text-[10px] text-green-500">+16% from last month</p>
              </div>
              <div className="border border-gray-100 rounded-lg p-4">
                 <div className="flex justify-between mb-2"><span className="text-xs text-gray-500">Over Time</span><i className="fa-solid fa-file text-gray-300"></i></div>
                 <h3 className="text-2xl font-bold text-gray-800">0 Hrs</h3>
                 <p className="text-[10px] text-green-500">+16% from last month</p>
              </div>
              <div className="border border-gray-100 rounded-lg p-4">
                 <div className="flex justify-between mb-2"><span className="text-xs text-gray-500">Holiday</span><i className="fa-solid fa-file text-gray-300"></i></div>
                 <h3 className="text-2xl font-bold text-gray-800">220 Hrs</h3>
                 <p className="text-[10px] text-green-500">+16% from last month</p>
              </div>
           </div>
        </div>

        {/* Detailed Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
           <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">Monthly Detailed Attendance</h3>
              <div className="flex gap-3">
                 <div className="relative w-48"><i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i><input type="text" placeholder="Search..." className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg text-xs outline-none" /></div>
                 <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-xs font-medium">Download <i className="fa-solid fa-chevron-down ml-1"></i></button>
              </div>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                 <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                    <tr>
                       <th className="p-4 w-10"><input type="checkbox" /></th>
                       <th className="p-4">Date</th>
                       <th className="p-4">Check In</th>
                       <th className="p-4">Check Out</th>
                       <th className="p-4">Work Hours</th>
                       <th className="p-4">Overtime</th>
                       <th className="p-4">Double</th>
                       <th className="p-4">Status</th>
                       <th className="p-4 text-right"></th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {logs.map((log, i) => (
                       <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4"><input type="checkbox" /></td>
                          <td className="p-4 text-gray-600">{log.date}</td>
                          <td className="p-4 text-gray-800 font-medium">{log.checkIn}</td>
                          <td className="p-4 text-gray-800 font-medium">{log.checkOut}</td>
                          <td className="p-4 text-gray-600">{log.hours === '-' ? '-' : '16 hrs'}</td>
                          <td className="p-4 text-gray-600">{log.hours}</td>
                          <td className="p-4 text-gray-600">N/A</td>
                          <td className="p-4">
                             <span className={`px-2 py-1 rounded-full text-xs font-medium ${log.status === 'Present' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>
                                {log.status}
                             </span>
                          </td>
                          <td className="p-4 text-right">
                             <button onClick={() => setShowNotesModal(true)} className="text-gray-500 hover:text-blue-600 text-xs flex items-center justify-end gap-1">
                                <i className="fa-regular fa-note-sticky"></i> Notes
                             </button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {/* Modal */}
        {showNotesModal && <NotesModal onClose={() => setShowNotesModal(false)} />}

      </div>
    </DashboardLayout>
  );
}

// =========================================================================
// NOTES MODAL (Matches image_b6e96c.png)
// =========================================================================
function NotesModal({ onClose }: { onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl p-6 relative animate-scale-up">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><i className="fa-solid fa-xmark text-lg"></i></button>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Notes</h2>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
             <div className="flex justify-between items-start mb-2">
                <div>
                   <h4 className="font-bold text-gray-800 text-sm">Nina Mcintire</h4>
                   <p className="text-xs text-gray-500">Carer</p>
                </div>
                <span className="text-[10px] text-gray-400">01 April, 2025 | Saturday</span>
             </div>
             <p className="text-sm text-gray-600 leading-relaxed">
                Here is a dummy note that will come here that will be added by different users or staffs or nurses taking care of the client. It will be detailed note so this note will be also used as references for future.
             </p>
          </div>
       </div>
    </div>, document.body
  );
}