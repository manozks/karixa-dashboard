"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EmployeePage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const router = useRouter();

  // Mock Data matching image_1e404b.png
  const employees = [
    { id: "CN-10001", name: "Olivia Thompson", phone: "(202) 555-0101", shift: "8:30 AM | 7:00 PM", date: "Feb 01, 2023", status: "Active", img: 1 },
    { id: "CN-10002", name: "Alexander Smith", phone: "(202) 555-0102", shift: "10:00 AM | 5:30 PM", date: "Feb 01, 2023", status: "Active", img: 2 },
    { id: "CN-10003", name: "Amelia Robinson", phone: "(202) 555-0103", shift: "8:15 AM | 7:45 PM", date: "Feb 01, 2023", status: "Active", img: 3 },
    { id: "CN-10004", name: "Liam Harris", phone: "(202) 555-0104", shift: "7:45 AM | 6:15 PM", date: "Feb 01, 2023", status: "Active", img: 4 },
    { id: "CN-10005", name: "Charlotte White", phone: "(202) 555-0105", shift: "11:00 AM | 4:45 PM", date: "Feb 01, 2023", status: "Active", img: 5 },
  ];

  return (
    <DashboardLayout>
      <div className="p-0 space-y-6">
        
        {/* Header */}
        <div>
           <h1 className="text-2xl font-bold text-gray-800">Employee</h1>
           <div className="text-sm text-gray-500">Dashboard / Employee</div>
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
               <option>Other</option>
            </select>
            
            <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none cursor-pointer">
              <option>Supervisor</option>
              <option>John Doe</option>
              <option>Jane Smith</option>
            </select>

            <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none cursor-pointer">
              <option>Type</option>
              <option>Caregiver</option>
              <option>Staff</option> 
            </select>

            <button className="text-sm text-gray-400 hover:text-gray-600 border-l border-gray-200 pl-4 ml-2">
              | Clear Filter
            </button>
          </div>

          {/* Right: Add Button */}
 <button 
                onClick={() => setShowAddModal(true)}
                className="px-5 py-2 text-sm font-medium text-white bg-[#0074D9] rounded-lg hover:bg-[#0062b8] transition-colors shadow-sm"
              >
                Add Employee
              </button>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
           <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                 <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                    <tr>
                       <th className="p-4 w-12"><input type="checkbox" className="rounded" /></th>
                       <th className="p-4">ID Number</th>
                       <th className="p-4">Name</th>
                       <th className="p-4">Phone</th>
                       <th className="p-4">Schedule Shift</th>
                       <th className="p-4">Reg. Date</th>
                       <th className="p-4">Status</th>
                       <th className="p-4 text-right">Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {employees.map((emp) => (
                       <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="p-4"><input type="checkbox" className="rounded" /></td>
                          <td className="p-4 text-gray-600">{emp.id}</td>
                          <td className="p-4">
                             <Link href={`/employees/${emp.id}`} className="flex items-center gap-3 cursor-pointer hover:text-[#0074D9] transition-colors">
                                <img src={`https://i.pravatar.cc/150?img=${emp.img}`} alt={emp.name} className="w-8 h-8 rounded-full object-cover" />
                                <span className="font-medium text-gray-800">{emp.name}</span>
                             </Link>
                          </td>
                          <td className="p-4 text-gray-600">{emp.phone}</td>
                          <td className="p-4 text-gray-800 font-medium">{emp.shift}</td>
                          <td className="p-4 text-gray-600">{emp.date}</td>
                          <td className="p-4">
                             <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
                                {emp.status}
                             </span>
                          </td>
                          <td className="p-4 text-right">
                             <div className="flex justify-end gap-2 transition-opacity">
                                <button className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 flex items-center justify-center"><i className="fa-regular fa-eye text-xs"></i></button>
                                <button className="w-8 h-8 rounded-full bg-yellow-50 text-yellow-600 hover:bg-yellow-100 flex items-center justify-center"><i className="fa-regular fa-calendar text-xs"></i></button>
                                <button className="w-8 h-8 rounded-full bg-green-50 text-green-600 hover:bg-green-100 flex items-center justify-center"><i className="fa-solid fa-dollar-sign text-xs"></i></button>
                                <button className="w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center"><i className="fa-regular fa-trash-can text-xs"></i></button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           <div className="p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
              <span>Showing 1 to 10 of 1000 Results</span>
              <div className="flex gap-2">
                 <button className="flex items-center gap-1 hover:text-brand">Previous</button>
                 <button className="flex items-center gap-1 text-brand font-medium">Next</button>
              </div>
           </div>
        </div>

        {/* Modal Injection */}
        {showAddModal && <AddEmployeeModal onClose={() => setShowAddModal(false)} />}

      </div>
    </DashboardLayout>
  );
}

// =========================================================================
// ADD EMPLOYEE MODAL (2-Step Wizard)
// =========================================================================
function AddEmployeeModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "unset"; }; }, []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl flex flex-col max-h-[95vh] animate-slide-up relative">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
             <div className="flex justify-between items-center">
                <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1"><i className="fa-solid fa-chevron-left text-xs"></i> Back</button>
                <button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button>
             </div>
             <h2 className="text-2xl font-bold text-gray-800 mt-2">Add New Employee</h2>
             <p className="text-sm text-gray-500">Fill in the employee's personal details to begin managing their care within the Agency Portal.</p>
          </div>

          {/* Stepper */}
          <div className="bg-blue-50/50 py-6 border-b border-gray-100 flex justify-center">
             <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 ${step === 1 ? 'opacity-100' : 'opacity-50'}`}>
                   <div className="w-8 h-8 rounded-full bg-[#0074D9] text-white flex items-center justify-center font-bold text-sm">1</div>
                   <div className="text-left"><p className="text-sm font-bold text-[#0074D9]">Basic Information</p><p className="text-[10px] text-gray-500">Provide information about client</p></div>
                </div>
                <div className="w-12 h-px bg-gray-300"></div>
                <div className={`flex items-center gap-2 ${step === 2 ? 'opacity-100' : 'opacity-50'}`}>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 2 ? 'bg-[#0074D9] text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                   <div className="text-left"><p className={`text-sm font-bold ${step === 2 ? 'text-[#0074D9]' : 'text-gray-500'}`}>Internal Use Only</p><p className="text-[10px] text-gray-500">Provide insurance detail of client</p></div>
                </div>
             </div>
          </div>

          {/* Form Content */}
          <div className="p-8 overflow-y-auto flex-1">
             {step === 1 ? (
                /* STEP 1: BASIC INFORMATION (Matching image_1e4752.png) */
                <div className="animate-slide-up space-y-6">
                   <h3 className="font-bold text-gray-800 text-sm">Basic Information</h3>
                   <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="space-y-1"><label className="text-xs font-medium text-gray-700">Title</label><select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white text-gray-500"><option>None</option><option>Mr.</option><option>Mrs.</option><option>Ms.</option><option>Miss</option><option>Mx.</option><option>Dr.</option></select></div>
                      <div className="space-y-1"><label className="text-xs font-medium text-gray-700">First Name*</label><input type="text" placeholder="Enter First Name" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm" /></div>
                         <div className="space-y-1"><label className="text-xs font-medium text-gray-700">Middle Name*</label><input type="text" placeholder="Enter Middle Name" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm" /></div>
                      <div className="space-y-1"><label className="text-xs font-medium text-gray-700">Last Name*</label><input type="text" placeholder="Enter Last Name" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm" /></div>
                        <div className="space-y-1"><label className="text-xs font-medium text-gray-700">Degree/Certification</label><select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white text-gray-500"><option>None</option><option>Jr.</option><option>Sr.</option><option>II</option><option>III</option><option>RN</option><option>LPN</option><option>CNA</option></select></div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1"><label className="text-xs font-medium text-gray-700">Gender*</label><select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white text-gray-500"><option>Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                      </select></div>
                      <div className="space-y-1"><label className="text-xs font-medium text-gray-700">Date of Birth*</label><input type="date" placeholder="dd / mm / yyyy" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm" /></div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1"><label className="text-xs font-medium text-gray-700">Phone Number</label><input type="text" placeholder="+1 (555) 000-0000" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm" /></div>
                      <div className="space-y-1"><label className="text-xs font-medium text-gray-700">Email</label><input type="email" placeholder="Enter email" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm" /></div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-1"><label className="text-xs font-medium text-gray-700">SSN</label><input type="text" placeholder="Enter SSN" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm" /></div>
                      <div className="space-y-1"><label className="text-xs font-medium text-gray-700">Primary Language</label><select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white text-gray-500">
                        <option>Select</option>
                        <option>English</option>
                        <option>Mandarin</option>
                        <option>Hindi</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>Modern Standard Arabic</option>
                        <option>Portuguese</option>
                        <option>Russian</option>
                        <option>Japanese</option>
                        <option>Bengali</option>
                        <option>Urdu</option>
                        <option>German</option>
                        <option>Italian</option>
                        <option>Nigerian Pidgin</option>                        
                        </select>
                        </div>
                      <div className="space-y-1"><label className="text-xs font-medium text-gray-700">Secondary Language</label><select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white text-gray-500">
                        <option>Select</option>
                        <option>American indian</option>
                        <option>Asian</option>
                        <option>Asian American</option>
                        <option>African American or Black</option>
                        <option>Hispanic or Latino</option>
                        <option>White or Caucasian</option>
                        <option>European. American</option>
                        <option>Multiracial</option>
                        <option>Native Hawaiian or Pacific Islander</option>
                        <option>Unknown</option>                                               
                        </select></div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1"><label className="text-xs font-medium text-gray-700">Address 1</label><input type="text" placeholder="Enter Address" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm" /></div>
                      <div className="space-y-1"><label className="text-xs font-medium text-gray-700">City</label><input type="text" placeholder="Enter City" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm" /></div>
                   </div>
                   
                   <h3 className="font-bold text-gray-800 text-sm pt-4">Emergency Contact Number</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1"><label className="text-xs font-medium text-gray-700">Full Name*</label><input type="text" placeholder="Enter" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm" /></div>
                      <div className="space-y-1"><label className="text-xs font-medium text-gray-700">Relationship*</label><input type="text" placeholder="Enter" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm" /></div>
                   </div>
                </div>
             ) : (
                /* STEP 2: INTERNAL USE ONLY (Matching image_1e9a5d.png) */
                <div className="animate-slide-up space-y-6">
                   <h3 className="font-bold text-gray-800 text-sm">Internal Use Only</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1"><label className="text-xs font-medium text-gray-700">Status*</label><select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white">
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>Pending</option>
                        </select></div>
                      <div className="space-y-1"><label className="text-xs font-medium text-gray-700">Supervisor*</label><select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white">
                        <option>Select</option>
                        <option>John Doe</option>
                        <option>Jane Smith</option>
                        </select></div>
                   </div>
                   <div className="space-y-1"><label className="text-xs font-medium text-gray-700">Region Code</label><input type="text" placeholder="Enter" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm" /></div>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-1"><label className="text-xs font-medium text-gray-700">Service Start Date</label><input type="date" placeholder="dd / mm / yyyy" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm" /></div>
                       {/* Start Time Picker */}
       <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Start Time</label>
                        <div className="relative">
                           <input type="time" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-brand" />
                           {/* Decorative Icon (Optional: depends on browser native support, added for style consistency) */}
                           <i className="fa-regular fa-clock absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none bg-white pl-2"></i>
                        </div>
                      </div>

      {/* End Time Picker */}
      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">End Time</label>
                        <div className="relative">
                           <input type="time" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-brand" />
                           <i className="fa-regular fa-clock absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none bg-white pl-2"></i>
                        </div>
                      </div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1"><label className="text-xs font-medium text-gray-700">User Type*</label><select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white text-gray-500">
                        <option>Select</option>
                        <option>Caregiver</option>
                        <option>Administrative Staff</option>
                        <option>Supervisor</option>
                        </select></div>
                      <div className="space-y-1"><label className="text-xs font-medium text-gray-700">Referred By</label><input type="text" placeholder="Enter" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm" /></div>
                   </div>
                </div>
             )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-2xl">
             {step === 1 ? (
                <button onClick={() => setStep(2)} className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-lg">Next</button>
             ) : (
                <>
                   <button onClick={() => setStep(1)} className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 text-sm font-medium hover:bg-white">Back</button>
                   <button onClick={onClose} className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-lg">Save</button>
                </>
             )}
          </div>

       </div>
    </div>, document.body
  );
}