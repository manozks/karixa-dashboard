import DashboardLayout from "@/components/DashboardLayout";
import WelcomeBanner from "@/components/WelcomeBanner";
import ScheduleTable, { ScheduleItem } from "@/components/ScheduleTable";
import ScheduleChart, { ChartData } from "@/components/ScheduleChart"; // <--- Import

// 1. Table Data

 const scheduleData: ScheduleItem[] = [
  {
    id: "1",
    clientName: "Sophia Johnson",
    clientImage: "https://i.pravatar.cc/150?img=32",
    caregiver: "Dr. Alex Thompson",
    checkIn: "09:00 AM",
    checkOut: "05:30 PM",
  },
  {
    id: "2",
    clientName: "Isabella Miller",
    clientImage: "https://i.pravatar.cc/150?img=44",
    caregiver: "Dr. Emily Carter",
    checkIn: "09:00 AM",
    checkOut: "05:30 PM",
  },
  {
    id: "3",
    clientName: "Ethan Brown",
    clientImage: "https://i.pravatar.cc/150?img=12",
    caregiver: "Dr. Sarah Mitchell",
    checkIn: "09:00 AM",
    checkOut: "05:30 PM",
  },
];

// 2. Chart Data (Define bar heights here)
const chartData: ChartData[] = [
  { month: "Jan", clientHeight: "h-12", caregiverHeight: "h-20" },
  { month: "Feb", clientHeight: "h-8",  caregiverHeight: "h-32" },
  { month: "Mar", clientHeight: "h-24", caregiverHeight: "h-16" },
  { month: "Apr", clientHeight: "h-10", caregiverHeight: "h-8" },
  { month: "May", clientHeight: "h-20", caregiverHeight: "h-28" },
  { month: "Jun", clientHeight: "h-12", caregiverHeight: "h-24" },
  { month: "Jul", clientHeight: "h-16", caregiverHeight: "h-10" },
];


// Define your data here (or fetch it from an API later)




export default function Home() {
  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <WelcomeBanner name="Racine" />

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
            <i className="fa-solid fa-arrow-trend-up mr-1"></i> +16% from last month
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
            <i className="fa-solid fa-arrow-trend-up mr-1"></i> +2% from last month
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
            <i className="fa-solid fa-arrow-trend-up mr-1"></i> +9% from last month
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
            <i className="fa-solid fa-arrow-trend-down mr-1"></i> 10% from last month
          </p>
        </div>
      </div>
      
      {/* ... Today's Schedule / Overall Schedule... */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
       {/* ... Today's Schedule... */}
       <ScheduleTable data={scheduleData} />

       {/* Chart Component (Clean and Reusable!) */}
        <ScheduleChart data={chartData} />
        </div>

 
      
    </DashboardLayout>
  );
}