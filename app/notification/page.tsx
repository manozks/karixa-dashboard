"use client";

import DashboardLayout from "@/components/DashboardLayout";

// 1. Define the data shape
interface NotificationItem {
  id: string;
  userImage: string;
  message: string;
  time: string;
  highlight?: boolean; // For bold/highlighted text
}

// 2. Mock Data (Grouped by Date)
const todayData: NotificationItem[] = [
  { id: '1', userImage: 'https://i.pravatar.cc/150?img=5', message: 'Emma Johnson missed her 10:00 AM scheduled visit with Charlotte White.', time: 'Today | 2:08 PM' },
  { id: '2', userImage: 'https://i.pravatar.cc/150?img=11', message: 'A new visit has been scheduled for Liam Brown on April 28 at 9:00 AM with client Liam Harris.', time: 'Today | 2:08 PM' },
  { id: '3', userImage: 'https://i.pravatar.cc/150?img=9', message: 'Only 2 caregivers are available for tomorrow\'s morning shift. You may need to adjust the schedule.', time: 'Today | 2:08 PM' },
  { id: '4', userImage: 'https://i.pravatar.cc/150?img=32', message: 'Chloe Davis submitted a leave request for May 1-3. Awaiting approval.', time: 'Today | 2:08 PM' },
];

const yesterdayData: NotificationItem[] = [
  { id: '5', userImage: 'https://i.pravatar.cc/150?img=1', message: 'New client profile created: Anita Gurung (CL-10612). Assigned caregiver: Sarah Miller.', time: 'Today | 2:08 PM' },
  { id: '6', userImage: 'https://i.pravatar.cc/150?img=3', message: 'Client Henry Clarke has been reassigned from Emma Johnson to Liam Brown.', time: 'Today | 2:08 PM' },
  { id: '7', userImage: 'https://i.pravatar.cc/150?img=10', message: 'First Aid Certificate for Olivia Thompson expires in 3 days.', time: 'Today | 2:08 PM' },
  { id: '8', userImage: 'https://i.pravatar.cc/150?img=12', message: 'Updated medical report added for Charlotte White by Emma Johnson.', time: 'Today | 2:08 PM' },
];

const pastData: NotificationItem[] = [
    { id: '9', userImage: 'https://i.pravatar.cc/150?img=20', message: 'Admin (Anna Patel) logged in from a new device at 8:12 AM.', time: 'Today | 2:08 PM' },
    { id: '10', userImage: 'https://i.pravatar.cc/150?img=33', message: 'You\'ve successfully changed your email notification preferences.', time: 'Today | 2:08 PM' },
    { id: '11', userImage: 'https://i.pravatar.cc/150?img=50', message: 'Liam Brown checked in 15 minutes late for his scheduled visit with Henry Clarke.', time: 'Today | 2:08 PM' },
    { id: '12', userImage: 'https://i.pravatar.cc/150?img=5', message: 'Emma Johnson is scheduled to visit Charlotte White at 9:00 AM tomorrow.', time: 'Today | 2:08 PM' },
];

export default function NotificationPage() {
  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[calc(100vh-140px)]">
        
        {/* HEADER Section */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-800">Notification</h1>
          
          <div className="flex items-center gap-4">
            {/* Toggle Buttons */}
            <div className="flex bg-gray-50 rounded-lg p-1 border border-gray-200">
              <button className="px-4 py-1.5 text-sm font-medium bg-brand text-white rounded-md shadow-sm">General</button>
              <button className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700">Alerts</button>
            </div>
            {/* Settings Icon */}
            <button className="text-gray-400 hover:text-gray-600">
              <i className="fa-solid fa-gear text-lg"></i>
            </button>
          </div>
        </div>

        {/* LIST Section */}
        <div className="p-6 space-y-8">
            
            {/* Group: Today */}
            <NotificationGroup title="Today" items={todayData} />

            {/* Group: Yesterday */}
            <NotificationGroup title="Yesterday" items={yesterdayData} />

            {/* Group: 1 Day Ago */}
            <NotificationGroup title="1 Day Ago" items={pastData} />

        </div>
      </div>
    </DashboardLayout>
  );
}

// -- Helper Component for Groups --
function NotificationGroup({ title, items }: { title: string, items: NotificationItem[] }) {
    return (
        <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">{title}</h3>
            <div className="space-y-4">
                {items.map((item) => (
                    <div key={item.id} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors group cursor-pointer">
                        <img 
                            src={item.userImage} 
                            alt="User" 
                            className="w-10 h-10 rounded-full object-cover border border-gray-100 flex-shrink-0"
                        />
                        <div className="flex-1">
                            <p className="text-sm text-gray-700 leading-relaxed group-hover:text-brand transition-colors">
                                {item.message}
                            </p>
                        </div>
                        <span className="text-xs text-gray-400 whitespace-nowrap mt-1">{item.time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}