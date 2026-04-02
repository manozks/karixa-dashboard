"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

// --- Mock Data ---
const mockForms = [
  { id: "FRM-1001", name: "Daily ADL & Time Record", category: "Timesheet", evv: true, updated: "24 April, 2026", status: "Active" },
  { id: "FRM-1002", name: "Incident & Accident Report", category: "Compliance", evv: false, updated: "18 April, 2026", status: "Active" },
  { id: "FRM-1003", name: "Client Intake Assessment", category: "Clinical", evv: false, updated: "10 April, 2026", status: "Draft" },
  { id: "FRM-1004", name: "Mileage & Travel Log", category: "Timesheet", evv: false, updated: "05 April, 2026", status: "Active" },
  { id: "FRM-1005", name: "Medication Administration Record", category: "Clinical", evv: true, updated: "01 April, 2026", status: "Archived" },
];

export default function FormsPage() {
  const [mounted, setMounted] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  // --- Sorting Logic ---
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const sortedForms = [...mockForms].sort((a: any, b: any) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const getSortIcon = (key: string) => {
    if (sortConfig?.key !== key) return <i className="fa-solid fa-sort text-gray-300"></i>;
    return sortConfig.direction === 'asc' 
      ? <i className="fa-solid fa-sort-up text-[#0074D9]"></i> 
      : <i className="fa-solid fa-sort-down text-[#0074D9]"></i>;
  };

  // --- Checkbox Handlers ---
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedIds(sortedForms.map(f => f.id));
    else setSelectedIds([]);
  };

  const handleSelectRow = (id: string) => {
    if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(i => i !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  const isAllSelected = sortedForms.length > 0 && selectedIds.length === sortedForms.length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-50 text-green-600 border-green-100";
      case "Draft": return "bg-yellow-50 text-yellow-600 border-yellow-100";
      case "Archived": return "bg-gray-50 text-gray-500 border-gray-200";
      default: return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-0 space-y-6 pb-20">
        
        {/* Header */}
        <div>
           <h1 className="text-2xl font-bold text-gray-800">Custom Forms</h1>
           <div className="text-sm text-gray-500">Dashboard / Manage / Custom Forms</div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
           <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative">
               <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
               <input 
                 type="text" 
                 placeholder="Search forms..." 
                 className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0074D9] w-48 lg:w-64"
               />
            </div>

            {/* Dropdowns */}
            <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none cursor-pointer">
              <option value="">All Categories</option>
              <option value="Timesheet">Timesheet</option>
              <option value="Clinical">Clinical</option>
              <option value="Compliance">Compliance</option>
              <option value="Intake">Intake</option>
            </select>
            <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none cursor-pointer">
              <option value="">Status</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
           <div className="flex gap-2">
              <Link href="/forms/builder" className="px-5 py-2 text-sm font-medium text-white bg-[#0074D9] rounded-lg hover:bg-[#0062b8] transition-colors shadow-sm flex items-center gap-2">
                <i className="fa-solid fa-plus"></i> Create New Form
              </Link>
           </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-visible">
           <div className="overflow-x-auto overflow-y-visible"> 
               <table className="w-full text-left text-sm min-w-[800px]">
                 <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold border-b border-gray-100">
                    <tr>
                       <th className="p-4 w-10">
                          <input 
                             type="checkbox" 
                             className="w-4 h-4 rounded border-gray-300 text-[#0074D9] focus:ring-[#0074D9] cursor-pointer"
                             checked={isAllSelected}
                             onChange={handleSelectAll}
                          />
                       </th>
                       <th className="p-3 w-16">SNO</th>
                       <th className="p-3 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('id')}>
                          <div className="flex items-center gap-2">Form ID {getSortIcon('id')}</div>
                       </th>
                       <th className="p-3 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('name')}>
                          <div className="flex items-center gap-2">Form Name {getSortIcon('name')}</div>
                       </th>
                       <th className="p-3 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('category')}>
                          <div className="flex items-center gap-2">Category {getSortIcon('category')}</div>
                       </th>
                       <th className="p-3 cursor-pointer hover:bg-gray-100 transition-colors text-center" onClick={() => handleSort('evv')}>
                          <div className="flex items-center justify-center gap-2">EVV Linked {getSortIcon('evv')}</div>
                       </th>
                       <th className="p-3 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('updated')}>
                          <div className="flex items-center gap-2">Last Updated {getSortIcon('updated')}</div>
                       </th>
                       <th className="p-3 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('status')}>
                          <div className="flex items-center gap-2">Status {getSortIcon('status')}</div>
                       </th>
                       <th className="p-3 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                   {sortedForms.map((form, i) => (
                       <tr 
                          key={form.id} 
                          className={`transition-colors group relative z-0 hover:z-20 ${selectedIds.includes(form.id) ? 'bg-blue-50/30' : 'hover:bg-gray-50/50'}`}
                       >
                          <td className="p-4">
                             <input 
                                type="checkbox" 
                                className="w-4 h-4 rounded border-gray-300 text-[#0074D9] focus:ring-[#0074D9] cursor-pointer"
                                checked={selectedIds.includes(form.id)}
                                onChange={() => handleSelectRow(form.id)}
                             />
                          </td>
                          <td className="p-4 text-gray-500">{i + 1}</td>
                          <td className="p-4 font-mono text-gray-500 text-xs">{form.id}</td>
                          <td className="p-4">
                             <Link href="/forms/builder" className="font-bold text-gray-800 hover:text-[#0074D9] transition-colors flex items-center gap-2">
                                <i className="fa-regular fa-file-lines text-gray-400"></i> {form.name}
                             </Link>
                          </td>
                          <td className="p-4 text-gray-600">{form.category}</td>
                          <td className="p-4 text-center">
                             {form.evv ? (
                               <span className="text-[#0074D9] bg-blue-50 px-2 py-1 rounded text-xs font-bold border border-blue-100"><i className="fa-solid fa-check mr-1"></i> Yes</span>
                             ) : (
                               <span className="text-gray-400 text-xs">-</span>
                             )}
                          </td>
                          <td className="p-4 text-gray-500">{form.updated}</td>
                          <td className="p-4">
                             <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold border ${getStatusColor(form.status)}`}>
                                {form.status}
                             </span>
                          </td>
                          
                          {/* Actions */}
                          <td className="p-4 text-right overflow-visible">
                             <div className="flex justify-end gap-2">
                                {/* 1. Edit (Routes to builder) */}
                                <Link href="/forms/builder">
                                   <button className="relative group/tooltip w-7 h-7 rounded-full bg-blue-50 text-[#0074D9] flex items-center justify-center hover:bg-blue-100 transition-colors">
                                      <i className="fa-solid fa-pen text-xs"></i>
                                      <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 hidden group-hover/tooltip:block w-max px-2 py-1 bg-gray-800 text-white text-[10px] rounded shadow-lg z-50 whitespace-nowrap font-normal">
                                         Edit Form
                                         <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                                      </div>
                                   </button>
                                </Link>

                                {/* 2. Duplicate */}
                                <button className="relative group/tooltip w-7 h-7 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors">
                                   <i className="fa-regular fa-copy text-xs"></i>
                                   <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 hidden group-hover/tooltip:block w-max px-2 py-1 bg-gray-800 text-white text-[10px] rounded shadow-lg z-50 whitespace-nowrap font-normal">
                                      Duplicate Form
                                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                                   </div>
                                </button>

                                {/* 3. Download PDF Template */}
                                <button className="relative group/tooltip w-7 h-7 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center hover:bg-purple-100 transition-colors">
                                   <i className="fa-solid fa-download text-xs"></i>
                                   <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 hidden group-hover/tooltip:block w-max px-2 py-1 bg-gray-800 text-white text-[10px] rounded shadow-lg z-50 whitespace-nowrap font-normal">
                                      Download Blank PDF
                                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                                   </div>
                                </button>

                                {/* 4. Archive/Delete */}
                                <button className="relative group/tooltip w-7 h-7 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors">
                                   <i className="fa-solid fa-trash text-xs"></i>
                                   <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 hidden group-hover/tooltip:block w-max px-2 py-1 bg-gray-800 text-white text-[10px] rounded shadow-lg z-50 whitespace-nowrap font-normal">
                                      Delete Form
                                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                                   </div>
                                </button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           <div className="p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
              <span>Showing 1 to 5 of 12 Forms</span>
              <div className="flex gap-2"><button className="flex items-center gap-1 hover:text-[#0074D9]">Previous</button><button className="flex items-center gap-1 text-[#0074D9] font-medium">Next</button></div>
           </div>
        </div>

      </div>
    </DashboardLayout>
  );
}