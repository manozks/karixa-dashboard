"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

export default function UserRolePage() {
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock Data for Roles (image_e0a903.png)
  const roles = [
    { id: "super-user", name: "Super User", users: 5, desc: "All Admin Controls", sub: "Everything in a Cosmos account", third: "High-level administrators" },
    { id: "accounts", name: "Accounts Payable/Receiv...", users: 5, desc: "Most aspects of Cosmos, except f...", sub: "Billing staff", third: "" },
    { id: "relations", name: "Client and Emp Relations", users: 5, desc: "Most aspects of Cosmos, except f...", sub: "Office staff that oversee clients an...", third: "" },
    { id: "caregiver", name: "Caregiver Enhanced", users: 5, desc: "Cosmos Caregiver app", sub: "PCAs, CNAs, other caregivers", third: "" },
    { id: "professional", name: "Qualified Professional En...", users: 5, desc: "Nurses, physicians, therapists, etc.", sub: "Clinical operations (i.e. documenta...", third: "" },
  ];

  return (
    <DashboardLayout>
      <div className="p-0 space-y-6 bg-gray-50 min-h-screen">
        
        {/* Header */}
        <div>
           <h1 className="text-2xl font-bold text-gray-800">User Authentication Role</h1>
           <div className="text-sm text-gray-500">Dashboard / User Authentication Role</div>
        </div>

        {/* Search & Add Button */}
        <div className="flex justify-between items-center">
           <div className="relative w-64">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0074D9]" />
           </div>
           <button 
              onClick={() => setShowAddModal(true)}
              className="bg-[#0074D9] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#0062b8] transition-colors shadow-sm"
           >
              Add Role
           </button>
        </div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
           {roles.map((role) => (
              <div key={role.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow relative group">
                 <div className="flex justify-between items-start mb-2">
                    <div>
                       <h3 className="font-bold text-gray-800 text-sm truncate pr-1" title={role.name}>{role.name}</h3>
                       <p className="text-xs text-gray-500">{role.users} users</p>
                    </div>
                    <div className="flex gap-2">
                       {/* Navigate to Detail Page */}
                       <Link href={`/user-role/${role.id}`}>
                          <button className="w-6 h-6 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center hover:bg-blue-100 transition-colors">
                             <i className="fa-regular fa-eye text-[10px]"></i>
                          </button>
                       </Link>
                       
                    </div>
                 </div>
                 
                 <div className="space-y-2 mt-4">
                    <div className="flex items-start gap-2">
                       <i className="fa-solid fa-arrow-right-long text-gray-400 text-xs mt-1"></i>
                       <p className="text-xs text-gray-600 line-clamp-1">{role.desc}</p>
                    </div>
                    <div className="flex items-start gap-2">
                       <i className="fa-solid fa-arrow-right-long text-gray-400 text-xs mt-1"></i>
                       <p className="text-xs text-gray-600 line-clamp-1">{role.sub}</p>
                    </div>
                    {role.third && (
                       <div className="flex items-start gap-2">
                          <i className="fa-solid fa-arrow-right-long text-gray-400 text-xs mt-1"></i>
                          <p className="text-xs text-gray-600 line-clamp-1">{role.third}</p>
                       </div>
                    )}
                 </div>
              </div>
           ))}
        </div>

        {/* Modal Injection */}
        {showAddModal && <AddRoleModal onClose={() => setShowAddModal(false)} />}

      </div>
    </DashboardLayout>
  );
}

// =========================================================================
// ADD ROLE MODAL (Matches image_e0a9c0.png)
// =========================================================================
function AddRoleModal({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "unset"; }; }, []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] animate-scale-up relative">
          
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
             <h2 className="text-xl font-bold text-gray-800">Add new Role</h2>
             <button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400 hover:text-gray-600 transition-colors"></i></button>
          </div>

          <div className="p-8 overflow-y-auto bg-white">
             {/* Form Inputs */}
             <div className="space-y-4 mb-6">
                <div className="space-y-1.5">
                   <label className="text-sm font-medium text-gray-700">Report Name</label>
                   <input type="text" placeholder="Enter or Select" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brand" />
                </div>
                <div className="space-y-1.5">
                   <label className="text-sm font-medium text-gray-700">Add User</label>
                   <input type="text" placeholder="Enter or Select" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brand" />
                </div>
             </div>

             {/* Permissions Table */}
             <div className="mb-2"><span className="text-sm font-medium text-gray-700">Role Permissions</span></div>
             <div className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Header */}
                <div className="bg-white p-4 border-b border-gray-100 flex justify-between items-center">
                   <span className="text-sm font-medium text-gray-700">Super User</span>
                   <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input type="checkbox" className="rounded text-brand focus:ring-brand" /> Select all
                   </label>
                </div>
                
                {/* Rows */}
                <div className="divide-y divide-gray-50 bg-white">
                   {[
                      "Accounts Payable/Receivable",
                      "Client and Emp Relations",
                      "Caregiver Enhanced",
                      "Qualified Professional Enhanced"
                   ].map((item, i) => (
                      <div key={i} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                         <span className="text-sm text-gray-600 w-1/3">{item}</span>
                         <div className="flex gap-4 sm:gap-6 flex-wrap">
                            {['Read', 'Write', 'Create', 'Delete'].map(perm => (
                               <label key={perm} className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
                                  <input type="checkbox" className="rounded border-gray-300 text-brand focus:ring-brand" /> {perm}
                               </label>
                            ))}
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>

          <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-white rounded-b-2xl">
             <button onClick={onClose} className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
                Discard
             </button>
             <button onClick={onClose} className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-lg shadow-blue-900/10 transition-colors">
                Add Role
             </button>
          </div>

       </div>
    </div>, document.body
  );
}