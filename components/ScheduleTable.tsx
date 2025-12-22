"use client";

// Define the shape of a single schedule item
export interface ScheduleItem {
  id: string;
  clientName: string;
  clientImage: string;
  caregiver: string;
  checkIn: string;
  checkOut: string;
}

interface ScheduleTableProps {
  data: ScheduleItem[];
}

export default function ScheduleTable({ data }: ScheduleTableProps) {
  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg text-gray-800">Today's Schedule</h3>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Search..." 
            className="border border-gray-200 rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-brand"
          />
          <button className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">
            <i className="fa-solid fa-filter text-gray-500 text-sm"></i>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium rounded-l-lg">Client Name</th>
              <th className="px-4 py-3 font-medium">Care Giver</th>
              <th className="px-4 py-3 font-medium">Check In</th>
              <th className="px-4 py-3 font-medium rounded-r-lg">Check Out</th>
              <th className="px-1 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {/* Loop through data to create rows dynamically */}
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-4 flex items-center gap-3">
                  <img src={item.clientImage} alt={item.clientName} className="w-8 h-8 rounded-full" />
                  <span className="font-medium text-gray-700">{item.clientName}</span>
                </td>
                <td className="px-4 py-4 text-gray-600">
                  <i className="fa-solid fa-user-doctor mr-2 text-gray-400"></i>
                  {item.caregiver}
                </td>
                <td className="px-4 py-4">
                  <span className="text-blue-600 bg-blue-50/50 px-2 py-1 rounded-md font-medium text-xs block text-center w-24">
                    {item.checkIn}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-red-500 bg-red-50/50 px-2 py-1 rounded-md font-medium text-xs block text-center w-24">
                    {item.checkOut}
                  </span>
                </td>
                <td className="px-1 py-4 text-gray-400 text-center cursor-pointer hover:text-gray-600">
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}