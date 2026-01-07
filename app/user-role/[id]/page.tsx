"use client";

import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

export default function RoleDetailPage({ params }: { params: { id: string } }) {
  // Mock Users Data (Matches image_e0b42c.png)
  const users = [
    { name: "Sophia Garcia", email: "sophia@gmail.com", phone: "(202) 555-0198", date: "23 April, 2025", active: true, img: 1 },
    { name: "Emma Taylor", email: "emma@gmail.com", phone: "(202) 555-0147", date: "15 May, 2025", active: true, img: 2 },
    { name: "Ava Martinez", email: "ava@gmail.com", phone: "(202) 555-0123", date: "30 June, 2025", active: true, img: 3 },
    { name: "Lila Anderson", email: "lila@gmail.com", phone: "(202) 555-0189", date: "10 July, 2025", active: true, img: 4 },
    { name: "Zoe Johnson", email: "zoe@gmail.com", phone: "(202) 555-0165", date: "5 August, 2025", active: true, img: 5 },
    { name: "Mia Kim", email: "mia@gmail.com", phone: "(202) 555-0172", date: "12 September, 2025", active: true, img: 6 },
    { name: "Nora Smith", email: "nora@gmail.com", phone: "(202) 555-0154", date: "20 October, 2025", active: true, img: 7 },
    { name: "Chloe Patel", email: "chloe@gmail.com", phone: "(202) 555-0138", date: "1 November, 2025", active: true, img: 8 },
    { name: "Olivia Bennett", email: "olivia@gmail.com", phone: "(202) 555-0110", date: "25 December, 2025", active: true, img: 9 },
  ];

  return (
    <DashboardLayout>
      <div className="p-0 space-y-6 bg-gray-50 min-h-screen">
        
        {/* Back Button */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/user-role" className="hover:text-gray-800 flex items-center gap-1">
            <i className="fa-solid fa-chevron-left text-xs"></i> Back
          </Link>
        </div>

        <div className="flex flex-col xl:flex-row gap-6">
           
           {/* Sidebar: Role Info */}
           <div className="w-full xl:w-80 bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-fit">
              <div className="flex justify-between items-start mb-4">
                 <h2 className="text-lg font-bold text-gray-800">Client and Emp Relations</h2>
                 <div className="flex gap-2">
                    <button className="text-blue-500 hover:bg-blue-50 p-1.5 rounded"><i className="fa-regular fa-eye"></i></button>
                    <button className="text-yellow-500 hover:bg-yellow-50 p-1.5 rounded"><i className="fa-solid fa-pencil"></i></button>
                 </div>
              </div>
              <p className="text-xs text-gray-500 mb-6">5 users</p>
              
              <div className="space-y-3">
                 {[
                    "Most aspects of Cosmos, except f...",
                    "Office staff that oversee clients an...",
                    "High-level administrators",
                    "View and Edit Payouts"
                 ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                       <i className="fa-solid fa-arrow-right-long text-gray-400 text-xs mt-1"></i>
                       <p className="text-sm text-gray-600">{item}</p>
                    </div>
                 ))}
              </div>
           </div>

           {/* Main Content: User List */}
           <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                 <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                       <tr>
                          <th className="p-4 w-10"><input type="checkbox" className="rounded"/></th>
                          <th className="p-4">Client Name</th>
                          <th className="p-4">Email</th>
                          <th className="p-4">Phone Number</th>
                          <th className="p-4">Joined Date</th>
                          <th className="p-4 text-right"></th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                       {users.map((u, i) => (
                          <tr key={i} className="hover:bg-gray-50 transition-colors">
                             <td className="p-4"><input type="checkbox" className="rounded"/></td>
                             <td className="p-4 flex items-center gap-3">
                                <img src={`https://i.pravatar.cc/150?img=${u.img}`} className="w-8 h-8 rounded-full" />
                                <span className="font-medium text-gray-800">{u.name}</span>
                             </td>
                             <td className="p-4 text-gray-600">{u.email}</td>
                             <td className="p-4 text-gray-600">{u.phone}</td>
                             <td className="p-4 text-gray-600">{u.date}</td>
                             <td className="p-4 text-right">
                                {/* Toggle Switch */}
                                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                   <input type="checkbox" name="toggle" id={`toggle-${i}`} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-green-500 right-0"/>
                                   <label htmlFor={`toggle-${i}`} className="toggle-label block overflow-hidden h-5 rounded-full bg-green-500 cursor-pointer"></label>
                                </div>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>

        </div>
      </div>
    </DashboardLayout>
  );
}