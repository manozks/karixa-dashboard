"use client";

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
      
      {/* Card 1 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Clients</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-2">106</h3>
          </div>
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
            <i className="fa-regular fa-user"></i>
          </div>
        </div>
        <p className="text-xs text-green-600 mt-4 font-medium flex items-center">
          <i className="fa-solid fa-arrow-trend-up mr-1"></i>
          +16% from last month
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Employee</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-2">21</h3>
          </div>
          <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
            <i className="fa-solid fa-user-tie"></i>
          </div>
        </div>
        <p className="text-xs text-green-600 mt-4 font-medium flex items-center">
          <i className="fa-solid fa-arrow-trend-up mr-1"></i>
          +2% from last month
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Caregiver</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-2">75</h3>
          </div>
          <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
            <i className="fa-solid fa-user-nurse"></i>
          </div>
        </div>
        <p className="text-xs text-green-600 mt-4 font-medium flex items-center">
          <i className="fa-solid fa-arrow-trend-up mr-1"></i>
          +9% from last month
        </p>
      </div>

      {/* Card 4 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Schedules</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-2">503</h3>
          </div>
          <div className="p-2 bg-pink-50 rounded-lg text-pink-600">
            <i className="fa-regular fa-calendar"></i>
          </div>
        </div>
        <p className="text-xs text-red-500 mt-4 font-medium flex items-center">
          <i className="fa-solid fa-arrow-trend-down mr-1"></i>
          10% from last month
        </p>
      </div>

    </div>
  );
}
