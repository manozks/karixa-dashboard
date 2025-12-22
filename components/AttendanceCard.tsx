"use client";

import { useState } from "react";

export default function AttendanceCard() {
  // State to track active tab: 'employer' or 'caregiver'
  const [activeTab, setActiveTab] = useState<'employer' | 'caregiver'>('employer');

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-lg text-gray-800">Daily Attendance</h3>
        <div className="flex gap-2">
          <button className="text-xs bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">Import</button>
          <button className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-lg hover:bg-green-100 transition-colors">Save</button>
        </div>
      </div>
      <p className="text-xs text-gray-500 mb-6">Overview of attendance of {activeTab === 'employer' ? 'Employees' : 'Caregivers'}</p>

      {/* TABS HEADER */}
      <div className="flex gap-4 border-b border-gray-100 mb-4">
        <button 
          onClick={() => setActiveTab('employer')}
          className={`text-sm font-medium pb-2 transition-all ${
            activeTab === 'employer' 
              ? "text-gray-800 border-b-2 border-brand" 
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Employer
        </button>
        <button 
          onClick={() => setActiveTab('caregiver')}
          className={`text-sm font-medium pb-2 transition-all ${
            activeTab === 'caregiver' 
              ? "text-gray-800 border-b-2 border-brand" 
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Caregiver
        </button>
      </div>

      {/* TABLE CONTENT */}
      <div className="overflow-x-auto min-h-[200px]">
        <table className="min-w-full text-left text-sm whitespace-nowrap">
          <thead className="text-gray-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-2 py-3"></th>
              <th className="px-2 py-3 font-medium">ID</th>
              <th className="px-2 py-3 font-medium">Name</th>
              <th className="px-2 py-3 font-medium">Check In</th>
              <th className="px-2 py-3 font-medium">Check Out</th>
              <th className="px-2 py-3 font-medium">Status</th>
              <th className="px-2 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {/* CONDITIONAL RENDERING BASED ON TAB */}
            {activeTab === 'employer' ? (
              // EMPLOYER DATA
              <>
                <TableRow id="EN-10001" name="Ella Martinez" img="5" status="Present" />
                <TableRow id="EN-10002" name="Mia Carter" img="9" status="Present" />
                <TableRow id="EN-10003" name="Ava Robinson" img="13" status="Absent" />
              </>
            ) : (
              // CAREGIVER DATA (Different dummy data for demo)
              <>
                <TableRow id="CG-20401" name="Sarah Mitchell" img="32" status="Present" />
                <TableRow id="CG-20402" name="Dr. Alex Thompson" img="11" status="Present" />
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Helper Component for Table Row to keep code clean
function TableRow({ id, name, img, status }: { id: string, name: string, img: string, status: 'Present' | 'Absent' }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-2 py-3"><input type="checkbox" className="rounded text-brand border-gray-300" /></td>
      <td className="px-2 py-3 text-gray-500">{id}</td>
      <td className="px-2 py-3 flex items-center gap-2">
        <img src={`https://i.pravatar.cc/150?img=${img}`} alt={name} className="w-6 h-6 rounded-full" />
        <span className="font-medium text-gray-700">{name}</span>
      </td>
      <td className="px-2 py-3 text-gray-600">09:30 AM</td>
      <td className="px-2 py-3 text-gray-600">05:30 PM</td>
      <td className="px-2 py-3">
        <span className={`px-2 py-1 rounded text-xs font-medium ${status === 'Present' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>
          {status}
        </span>
      </td>
      <td className="px-2 py-3 text-gray-400 hover:text-gray-600 cursor-pointer">
        <i className="fa-regular fa-file-lines"></i>
      </td>
    </tr>
  );
}