"use client";

import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

export default function ClientReportPage({ params }: { params: { id: string } }) {
   
  const reports = [
    { name: "Sophia Garcia", id: "0198", status: "Active", created: "Feb 01, 2023", last: "Feb 01, 2023", by: "Admin" },
    { name: "Emma Taylor", id: "0147", status: "Inactive", created: "Mar 15, 2023", last: "Mar 15, 2023", by: "Admin" },
    { name: "Ava Martinez", id: "0123", status: "Active", created: "Apr 20, 2023", last: "Apr 20, 2023", by: "Caregiver" },
  ];

  return (
    <DashboardLayout>
      <div className="p-0 space-y-6 bg-gray-50 min-h-screen">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link href="/reports" className="hover:text-gray-800 flex items-center gap-1"><i className="fa-solid fa-chevron-left text-xs"></i> Back</Link>
        </div>

        {/* Profile Card Style Header */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
           <div className="flex items-center gap-4">
              <img src="https://i.pravatar.cc/150?img=1" className="w-16 h-16 rounded-full border-4 border-gray-50" />
              <div>
                 <h1 className="text-xl font-bold text-gray-800">Sophia Garcia <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded ml-2 align-middle">Active</span></h1>
                 <p className="text-sm text-gray-500">1509 Oakview Dr. I McLean VA 22101</p>
              </div>
           </div>
           <div className="grid grid-cols-3 gap-8 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div><p className="text-xs text-gray-400">Client ID</p><p className="font-bold">1322</p></div>
              <div><p className="text-xs text-gray-400">Mobile</p><p className="font-bold">(703) 981-7142</p></div>
              <div><p className="text-xs text-gray-400">Emergency</p><p className="font-bold">(703) 981-7142</p></div>
           </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
           <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-800">Document History</h3>
              <div className="relative"><input className="pl-8 pr-4 py-1.5 border rounded-lg text-xs" placeholder="Search..." /><i className="fa-solid fa-magnifying-glass absolute left-3 top-2 text-gray-400 text-xs"></i></div>
           </div>
           <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                 <tr><th className="p-4">Document Name</th><th className="p-4">Reports</th><th className="p-4">Created On</th><th className="p-4">Last Update</th><th className="p-4">Description</th><th className="p-4">Created By</th><th className="p-4"></th></tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                 {[1, 2, 3].map((i) => (
                    <tr key={i} className="hover:bg-gray-50">
                       <td className="p-4 font-medium">DMAS 302</td>
                       <td className="p-4 text-gray-600">9</td>
                       <td className="p-4 text-gray-600">Feb 01, 2023</td>
                       <td className="p-4 text-gray-600">Feb 19, 2023</td>
                       <td className="p-4 text-gray-600">-</td>
                       <td className="p-4"><span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs">Admin</span></td>
                       <td className="p-4 text-right flex justify-end gap-2 text-blue-500">
                          <i className="fa-regular fa-eye cursor-pointer hover:bg-blue-50 p-1 rounded"></i>
                          <i className="fa-solid fa-download cursor-pointer hover:bg-green-50 text-green-600 p-1 rounded"></i>
                          <i className="fa-regular fa-trash-can cursor-pointer hover:bg-red-50 text-red-500 p-1 rounded"></i>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </DashboardLayout>
  );
}