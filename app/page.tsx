import DashboardLayout from "@/components/DashboardLayout";
import WelcomeBanner from "@/components/WelcomeBanner";
import ScheduleTable, { ScheduleItem } from "@/components/ScheduleTable";
import ScheduleChart, { ChartData } from "@/components/ScheduleChart";
import AttendanceCard from "@/components/AttendanceCard";
import UpcomingReminders, { ReminderItem } from "@/components/UpcomingReminders";
import StatsCards from "@/components/StatsCards";

// Define your reminder data
const reminderData: ReminderItem[] = [
  {
    id: "1",
    day: "1 Apr",
    weekday: "Friday",
    title: "Liam Brown Daycare with Chloe",
    location: "New York City",
    time: "9 AM - 5 PM",
    highlight: true, // Highlight this one blue
  },
  {
    id: "2",
    day: "3 Apr",
    weekday: "Sunday",
    title: "Isabella Medical Meeting",
    location: "New York City",
    time: "10 AM - 4 PM",
    highlight: false,
  },
  {
    id: "3",
    day: "4 Apr",
    weekday: "Monday",
    title: "Liam Brown Daycare",
    location: "Ohio",
    time: "8 AM - 6 PM",
    highlight: false,
  },
];

// 1. Table Data

 const scheduleData: ScheduleItem[] = [
  {
    id: "1",
    clientName: "Sophia Johnson",
    clientImage: "https://i.pravatar.cc/150?img=32",
    caregiver: "Alex Thompson",
    checkIn: "09:00 AM",
    checkOut: "05:30 PM",
  },
  {
    id: "2",
    clientName: "Isabella Miller",
    clientImage: "https://i.pravatar.cc/150?img=44",
    caregiver: "Emily Carter",
    checkIn: "09:00 AM",
    checkOut: "05:30 PM",
  },
  {
    id: "3",
    clientName: "Ethan Brown",
    clientImage: "https://i.pravatar.cc/150?img=12",
    caregiver: "Sarah Mitchell",
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

      {/* STATS Section */}   
       <StatsCards />

      {/* ... Today's Schedule / Overall Schedule... */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
       {/* ... Today's Schedule... */}
       <ScheduleTable data={scheduleData} />

       {/* Chart Component (Clean and Reusable!) */}
        <ScheduleChart data={chartData} />
        </div>

         {/* ... Daily Attendance / Upcoming Reminder... */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* ... Daily Attendance... */}
          <AttendanceCard />

           {/* ... Daily Attendance... */}
          <UpcomingReminders reminders={reminderData} />

        </div>

 
      
    </DashboardLayout>
  );
}