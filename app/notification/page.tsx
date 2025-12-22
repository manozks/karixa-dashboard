"use client";

import { useState } from "react"; // <--- 1. Import useState
import DashboardLayout from "@/components/DashboardLayout";

// 1. Define the data shape
interface NotificationItem {
  id: string;
  userImage: string;
  message: string;
  time: string;
  type: 'general' | 'alert'; // <--- 2. Add type to distinguish notifications
}

// 3. Mock Data (Mixed Types)
const allNotifications: NotificationItem[] = [
  // Today
  { id: '1', type: 'alert', userImage: 'https://i.pravatar.cc/150?img=5', message: 'Emma Johnson missed her 10:00 AM scheduled visit with Charlotte White.', time: 'Today | 2:08 PM' },
  { id: '2', type: 'general', userImage: 'https://i.pravatar.cc/150?img=11', message: 'A new visit has been scheduled for Liam Brown on April 28 at 9:00 AM with client Liam Harris.', time: 'Today | 2:08 PM' },
  { id: '3', type: 'alert', userImage: 'https://i.pravatar.cc/150?img=9', message: 'Only 2 caregivers are available for tomorrow\'s morning shift. You may need to adjust the schedule.', time: 'Today | 2:08 PM' },
  { id: '4', type: 'general', userImage: 'https://i.pravatar.cc/150?img=32', message: 'Chloe Davis submitted a leave request for May 1-3. Awaiting approval.', time: 'Today | 2:08 PM' },
  
  // Yesterday
  { id: '5', type: 'general', userImage: 'https://i.pravatar.cc/150?img=1', message: 'New client profile created: Anita Gurung (CL-10612). Assigned caregiver: Sarah Miller.', time: 'Yesterday | 9:00 AM' },
  { id: '6', type: 'general', userImage: 'https://i.pravatar.cc/150?img=3', message: 'Client Henry Clarke has been reassigned from Emma Johnson to Liam Brown.', time: 'Yesterday | 1:30 PM' },
  { id: '7', type: 'alert', userImage: 'https://i.pravatar.cc/150?img=10', message: 'First Aid Certificate for Olivia Thompson expires in 3 days.', time: 'Yesterday | 4:15 PM' },
  
  // Past
  { id: '9', type: 'alert', userImage: 'https://i.pravatar.cc/150?img=20', message: 'Admin (Anna Patel) logged in from a new device at 8:12 AM.', time: '2 Days Ago' },
  { id: '10', type: 'general', userImage: 'https://i.pravatar.cc/150?img=33', message: 'You\'ve successfully changed your email notification preferences.', time: '3 Days Ago' },
];

export default function NotificationPage() {
  // 4. State for Active Tab
  const [activeTab, setActiveTab] = useState<'general' | 'alert'>('general');

  // 5. Filter Data based on Active Tab
  const filteredData = allNotifications.filter(item => item.type === activeTab);

  // 6. Group filtered data by Time (Simple logic for demo)
  // In a real app, you'd parse dates. Here we just split by the string 'time' or manual groups.
  const todayItems = filteredData.filter(item => item.time.includes('Today'));
  const yesterdayItems = filteredData.filter(item => item.time.includes('Yesterday'));
  const pastItems = filteredData.filter(item => !item.time.includes('Today') && !item.time.includes('Yesterday'));

  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[calc(100vh-140px)]">
        
        {/* HEADER Section */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-800">Notification</h1>
          
          <div className="flex items-center gap-4">
            {/* Toggle Buttons */}
            <div className="flex bg-gray-50 rounded-lg p-1 border border-gray-200">
              <button 
                onClick={() => setActiveTab('general')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md shadow-sm transition-all ${
                  activeTab === 'general' ? 'bg-brand text-white' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                General
              </button>
              <button 
                onClick={() => setActiveTab('alert')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md shadow-sm transition-all ${
                  activeTab === 'alert' ? 'bg-brand text-white' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                Alerts
              </button>
            </div>
            {/* Settings Icon */}
            <button className="text-gray-400 hover:text-gray-600">
              <i className="fa-solid fa-gear text-lg"></i>
            </button>
          </div>
        </div>

        {/* LIST Section */}
        <div className="p-6 space-y-8">
            
            {/* Show Empty State if no items */}
            {filteredData.length === 0 && (
              <div className="text-center py-10 text-gray-400">
                <i className="fa-regular fa-bell-slash text-4xl mb-3"></i>
                <p>No notifications found.</p>
              </div>
            )}

            {/* Render Groups only if they have items */}
            {todayItems.length > 0 && <NotificationGroup title="Today" items={todayItems} />}
            {yesterdayItems.length > 0 && <NotificationGroup title="Yesterday" items={yesterdayItems} />}
            {pastItems.length > 0 && <NotificationGroup title="Older" items={pastItems} />}

        </div>
      </div>
    </DashboardLayout>
  );
}

// -- Helper Component --
function NotificationGroup({ title, items }: { title: string, items: NotificationItem[] }) {
    return (
        <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">{title}</h3>
            <div className="space-y-0">
                {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors group cursor-pointer border-b border-gray-200 last:border-0">
                        <div className="relative">
                            <img 
                                src={item.userImage} 
                                alt="User" 
                                className="w-10 h-10 rounded-full object-cover border border-gray-100 flex-shrink-0"
                            />
                            {/* Optional: Add a small icon badge for alerts */}
                            {item.type === 'alert' && (
                                <span className="absolute -bottom-1 -right-1 bg-red-100 text-red-600 text-[8px] w-4 h-4 flex items-center justify-center rounded-full border border-white">
                                    <i className="fa-solid fa-exclamation"></i>
                                </span>
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-700 inline-block align-middle leading-relaxed group-hover:text-brand transition-colors">
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