"use client";

// Define the shape of a single reminder
export interface ReminderItem {
  id: string;
  day: string;       // e.g., "1 Apr"
  weekday: string;   // e.g., "Friday"
  title: string;     // e.g., "Liam Brown Daycare with Chloe"
  location: string;  // e.g., "Melbourne"
  time: string;      // e.g., "9 AM - 5 PM"
  highlight?: boolean; // If true, give it a blue background
}

interface UpcomingRemindersProps {
  reminders: ReminderItem[];
}

export default function UpcomingReminders({ reminders }: UpcomingRemindersProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-gray-800">Upcoming Reminder</h3>
        <div className="text-xs text-gray-500 border rounded px-2 py-1 flex items-center">
          <i className="fa-regular fa-calendar mr-1"></i> April 2025
        </div>
      </div>

      <div className="space-y-6 relative">
        {/* Vertical Line */}
        <div className="absolute left-[3.5rem] top-2 bottom-2 w-px bg-gray-100"></div>

        {/* Reminders List */}
        {reminders.map((item) => (
          <div key={item.id} className="flex gap-4 relative z-10 group">
            
            {/* Date Column */}
            <div className="w-12 text-center flex-shrink-0">
              <p className="text-xs font-bold text-brand">{item.day}</p>
              <p className="text-[10px] text-gray-400">{item.weekday}</p>
            </div>

            {/* Content Card */}
            <div 
              className={`flex-1 p-3 rounded-lg border transition-all ${
                item.highlight 
                  ? "bg-blue-50/50 border-blue-100" 
                  : "bg-white border-gray-100 hover:bg-gray-50"
              }`}
            >
              <h4 className="text-sm font-semibold text-gray-800">{item.title}</h4>
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                <span><i className="fa-solid fa-location-dot"></i> {item.location}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span>{item.time}</span>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}