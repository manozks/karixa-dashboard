"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

export default function AttendancePage() {
  const [activeTab, setActiveTab] = useState<"Employee" | "CareGiver">("Employee");

  const employees = [
    { id: "EN-10001", name: "Ella Martinez", in: "09:30 PM", out: "05:30 PM", approved: "Admin", status: "Present", img: 1 },
    { id: "EN-10002", name: "Mia Carter", in: "09:30 PM", out: "05:30 PM", approved: "Admin", status: "Present", img: 2 },
    { id: "EN-10003", name: "Ava Robinson", in: "09:30 PM", out: "05:30 PM", approved: "Admin", status: "Absent", img: 3 },
  ];

  const caregivers = [
    { id: "CG-10001", name: "Dr. Sophia Garcia", in: "09:00 PM", out: "05:30 PM", approved: "Admin", status: "Present", img: 4 },
    { id: "CG-10002", name: "Dr. Emma Taylor", in: "09:00 PM", out: "05:30 PM", approved: "Admin", status: "Present", img: 5 },
  ];

  const data = activeTab === "Employee" ? employees : caregivers;

  return (
    <DashboardLayout>
      <div className="p-0 space-y-6 bg-gray-50 min-h-screen">
        
        {/* Header */}
        <div>
           <h1 className="text-2xl font-bold text-gray-800">Attendance</h1>
           <div className="text-sm text-gray-500">Dashboard / Attendance</div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative">
              <div className="absolute top-6 right-6 text-gray-400"><i className="fa-regular fa-calendar-check"></i></div>
              <p className="text-sm text-gray-500 mb-1">Present Summary</p>
              <h2 className="text-3xl font-bold text-gray-800">21</h2>
              <p className="text-xs text-green-600 mt-1">+16% from last month</p>
           </div>
           <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative">
              <div className="absolute top-6 right-6 text-gray-400"><i className="fa-regular fa-calendar-xmark"></i></div>
              <p className="text-sm text-gray-500 mb-1">Absent Summary</p>
              <h2 className="text-3xl font-bold text-gray-800">75</h2>
              <p className="text-xs text-green-600 mt-1">+16% from last month</p>
           </div>
           <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative">
              <div className="absolute top-6 right-6 text-gray-400"><i className="fa-regular fa-clock"></i></div>
              <p className="text-sm text-gray-500 mb-1">Leave Summary</p>
              <h2 className="text-3xl font-bold text-gray-800">503</h2>
              <p className="text-xs text-green-600 mt-1">+16% from last month</p>
           </div>
        </div>

        {/* Report Banner */}
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4">
           <div>
              <h3 className="text-[#0074D9] font-bold text-lg">Attendance Report</h3>
              <p className="text-sm text-gray-600">Quickly view and track monthly or Weekly or Biweekly employee attendance.</p>
           </div>
           <Link href="/attendance/report">
              <button className="bg-[#0074D9] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0062b8] transition-colors">
                 View Attendance Report
              </button>
           </Link>
        </div>

        {/* Daily Attendance Section */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
           <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-col gap-2">
                 <h3 className="text-lg font-bold text-gray-800">Daily Attendance</h3>
                 {/* Tabs */}
                 <div className="flex bg-gray-100 p-1 rounded-lg w-fit">
                    <button onClick={() => setActiveTab("Employee")} className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === "Employee" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"}`}>Employee</button>
                    <button onClick={() => setActiveTab("CareGiver")} className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === "CareGiver" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"}`}>CareGiver</button>
                 </div>
              </div>
              
              <div className="flex gap-3">
                 <button className="border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">Import Attendance</button>
                 <button className="bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-100">Save Attendance</button>
              </div>
           </div>

           {/* Table */}
           <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                 <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                    <tr>
                       <th className="p-4 w-10"><input type="checkbox" /></th>
                       <th className="p-4">ID</th>
                       <th className="p-4">Name</th>
                       <th className="p-4">Check In</th>
                       <th className="p-4">Check Out</th>
                       <th className="p-4">Approved By</th>
                       <th className="p-4">Status</th>
                       <th className="p-4 text-right"></th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {data.map((item, i) => (
                       <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4"><input type="checkbox" /></td>
                          <td className="p-4 text-gray-500">{item.id}</td>
                          <td className="p-4 flex items-center gap-3">
                             <img src={`https://i.pravatar.cc/150?img=${item.img}`} className="w-8 h-8 rounded-full" />
                             <span className="font-medium text-gray-800">{item.name}</span>
                          </td>
                          <td className="p-4"><span className="bg-white border px-3 py-1 rounded text-gray-600 text-xs">{item.in}</span></td>
                          <td className="p-4"><span className="bg-white border px-3 py-1 rounded text-gray-600 text-xs">{item.out}</span></td>
                          <td className="p-4 text-gray-600">{item.approved}</td>
                          <td className="p-4">
                             <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${item.status === 'Present' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                                {item.status} <i className="fa-solid fa-chevron-down text-[10px]"></i>
                             </span>
                          </td>
                          <td className="p-4 text-right text-gray-400 cursor-pointer"><i className="fa-regular fa-note-sticky"></i> Notes</td>
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