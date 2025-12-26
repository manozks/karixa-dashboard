"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout"; // Assuming you have this from previous steps
import Link from "next/link"; 

// --- Types ---
interface Client {
  id: string;
  name: string;
  avatar: string;
  shiftStart: string;
  shiftEnd: string;
  caregiver: {
    name: string;
    role: string;
    avatar: string;
  };
  checkIn: string;
  checkOut: string;
}

// --- Mock Data ---
const clientsData: Client[] = [
  { id: '1', name: 'Nina Mcintire', avatar: 'https://i.pravatar.cc/150?img=1', shiftStart: '8:30 AM', shiftEnd: '7:00 PM', caregiver: { name: 'Dr. Emily Carter', role: 'Doctor', avatar: 'https://i.pravatar.cc/150?img=5' }, checkIn: '09:00 AM', checkOut: '05:30 PM' },
  { id: '2', name: 'Jack Williams', avatar: 'https://i.pravatar.cc/150?img=11', shiftStart: '10:00 AM', shiftEnd: '5:30 PM', caregiver: { name: 'Dr. Sophia Wilson', role: 'Doctor', avatar: 'https://i.pravatar.cc/150?img=9' }, checkIn: '09:00 AM', checkOut: '05:30 PM' },
  { id: '3', name: 'Amelia Robinson', avatar: 'https://i.pravatar.cc/150?img=24', shiftStart: '8:15 AM', shiftEnd: '7:45 PM', caregiver: { name: 'Dr. Daniel Brown', role: 'Doctor', avatar: 'https://i.pravatar.cc/150?img=13' }, checkIn: '09:00 AM', checkOut: '05:30 PM' },
  { id: '4', name: 'Liam Harris', avatar: 'https://i.pravatar.cc/150?img=33', shiftStart: '7:45 AM', shiftEnd: '6:15 PM', caregiver: { name: 'Dr. Michael Thompson', role: 'Doctor', avatar: 'https://i.pravatar.cc/150?img=12' }, checkIn: '09:00 AM', checkOut: '05:30 PM' },
  { id: '5', name: 'Charlotte White', avatar: 'https://i.pravatar.cc/150?img=44', shiftStart: '11:00 AM', shiftEnd: '4:45 PM', caregiver: { name: 'Dr. Olivia Martinez', role: 'Doctor', avatar: 'https://i.pravatar.cc/150?img=20' }, checkIn: '09:00 AM', checkOut: '05:30 PM' },
  { id: '6', name: 'Noah Mitchell', avatar: 'https://i.pravatar.cc/150?img=51', shiftStart: '9:00 AM', shiftEnd: '6:00 PM', caregiver: { name: 'Dr. Jessica Lee', role: 'Doctor', avatar: 'https://i.pravatar.cc/150?img=30' }, checkIn: '09:00 AM', checkOut: '05:30 PM' },
  { id: '7', name: 'Zoe Anderson', avatar: 'https://i.pravatar.cc/150?img=52', shiftStart: '9:30 AM', shiftEnd: '6:32 PM', caregiver: { name: 'Dr. Sarah Patel', role: 'Doctor', avatar: 'https://i.pravatar.cc/150?img=35' }, checkIn: '09:00 AM', checkOut: '05:30 PM' },
  { id: '8', name: 'Benjamin Taylor', avatar: 'https://i.pravatar.cc/150?img=53', shiftStart: '9:30 AM', shiftEnd: '6:32 PM', caregiver: { name: 'Dr. David Kim', role: 'Doctor', avatar: 'https://i.pravatar.cc/150?img=59' }, checkIn: '09:00 AM', checkOut: '05:30 PM' },
  { id: '9', name: 'Isla Wright', avatar: 'https://i.pravatar.cc/150?img=54', shiftStart: '9:30 AM', shiftEnd: '6:32 PM', caregiver: { name: 'Dr. Brian Chen', role: 'Doctor', avatar: 'https://i.pravatar.cc/150?img=60' }, checkIn: '09:00 AM', checkOut: '05:30 PM' },
  { id: '10', name: 'Ethan Martin', avatar: 'https://i.pravatar.cc/150?img=55', shiftStart: '9:30 AM', shiftEnd: '6:32 PM', caregiver: { name: 'Dr. James Anderson', role: 'Doctor', avatar: 'https://i.pravatar.cc/150?img=68' }, checkIn: '09:00 AM', checkOut: '05:30 PM' },
];

export default function ClientsPage() {
  const [selectedClients, setSelectedClients] = useState<string[]>([]);

  // Toggle Checkbox logic
  const toggleSelect = (id: string) => {
    if (selectedClients.includes(id)) {
      setSelectedClients(selectedClients.filter(c => c !== id));
    } else {
      setSelectedClients([...selectedClients, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedClients.length === clientsData.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(clientsData.map(c => c.id));
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-gray-50/50 p-0 space-y-6 ">
        
        {/* --- Header Section --- */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Clients</h1>
          <p className="text-sm text-gray-400">Dashboard / <span className="text-gray-600 font-medium">Clients</span></p>
        </div>

        {/* --- Controls / Filter Bar --- */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Left: Search & Filters */}
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            {/* Search */}
            <div className="relative">
               <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
               <input 
                 type="text" 
                 placeholder="Search..." 
                 className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand w-64"
               />
            </div>

            {/* Dropdowns */}
            <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none cursor-pointer">
              <option>Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            
            <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none cursor-pointer">
              <option>Coordinate</option>
            </select>

            <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none cursor-pointer">
              <option>Schedule</option>
            </select>

            <button className="text-sm text-gray-400 hover:text-gray-600 border-l border-gray-200 pl-4 ml-2">
              | Clear Filter
            </button>
          </div>

          {/* Right: Add Button */}
         <Link 
  href="/clients/add" 
  className="bg-[#0074D9] hover:bg-[#0062b8] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors inline-block"
>
  Add Clients
</Link>
        </div>

        {/* --- Table Section --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 w-10">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-brand focus:ring-brand"
                      checked={selectedClients.length === clientsData.length}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client Name</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Schedule Shift</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Caregiver</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Check In</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Check Out</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {clientsData.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-300 text-brand focus:ring-brand"
                        checked={selectedClients.includes(client.id)}
                        onChange={() => toggleSelect(client.id)}
                      />
                    </td>
                    
                    {/* Client Name */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={client.avatar} alt={client.name} className="w-9 h-9 rounded-full object-cover" />
                        <span className="text-sm font-medium text-gray-800">{client.name}</span>
                      </div>
                    </td>

                    {/* Shift */}
                    <td className="p-4">
                      <span className="text-sm text-gray-600">{client.shiftStart} I {client.shiftEnd}</span>
                    </td>

                    {/* Caregiver */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={client.caregiver.avatar} alt={client.caregiver.name} className="w-9 h-9 rounded-full object-cover" />
                        <div>
                          <div className="text-sm font-medium text-gray-800">{client.caregiver.name}</div>
                          <div className="text-xs text-blue-400">{client.caregiver.role}</div>
                        </div>
                      </div>
                    </td>

                    {/* Check In */}
                    <td className="p-4">
                      <span className="px-2 py-1 bg-gray-50 border border-gray-100 rounded text-xs text-gray-600 font-medium">
                        {client.checkIn}
                      </span>
                    </td>

                    {/* Check Out */}
                    <td className="p-4">
                      <span className="px-2 py-1 bg-gray-50 border border-gray-100 rounded text-xs text-gray-600 font-medium">
                        {client.checkOut}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        {/* Eye Button */}
                        <button className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 flex items-center justify-center transition-colors">
                          <i className="fa-regular fa-eye text-xs"></i>
                        </button>
                        {/* Calendar Button */}
                        <button className="w-8 h-8 rounded-full bg-yellow-50 text-yellow-500 hover:bg-yellow-100 flex items-center justify-center transition-colors">
                          <i className="fa-regular fa-calendar text-xs"></i>
                        </button>
                        {/* Money Button */}
                        <button className="w-8 h-8 rounded-full bg-green-50 text-green-500 hover:bg-green-100 flex items-center justify-center transition-colors">
                          <i className="fa-solid fa-dollar-sign text-xs"></i>
                        </button>
                        {/* Trash Button */}
                        <button className="w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors">
                          <i className="fa-regular fa-trash-can text-xs"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- Pagination --- */}
          <div className="p-4 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-xs text-gray-500">
              Showing <span className="font-medium text-gray-700">1</span> to <span className="font-medium text-gray-700">10</span> of <span className="font-medium text-gray-700">1000</span> Results
            </span>
            
            <div className="flex items-center gap-1">
              <button className="px-3 py-1 text-xs font-medium text-gray-500 hover:text-gray-700 flex items-center gap-1">
                <i className="fa-solid fa-chevron-left text-[10px]"></i> Previous
              </button>
              <div className="flex items-center gap-1 mx-2">
                <button className="w-7 h-7 rounded-lg bg-brand text-white text-xs font-medium flex items-center justify-center">1</button>
                <button className="w-7 h-7 rounded-lg hover:bg-gray-50 text-gray-600 text-xs font-medium flex items-center justify-center">2</button>
                <button className="w-7 h-7 rounded-lg hover:bg-gray-50 text-gray-600 text-xs font-medium flex items-center justify-center">3</button>
                <span className="text-gray-400 text-xs">...</span>
                <button className="w-7 h-7 rounded-lg hover:bg-gray-50 text-gray-600 text-xs font-medium flex items-center justify-center">10</button>
              </div>
              <button className="px-3 py-1 text-xs font-medium text-brand hover:text-darkblue flex items-center gap-1">
                Next <i className="fa-solid fa-chevron-right text-[10px]"></i>
              </button>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}