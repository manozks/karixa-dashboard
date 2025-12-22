"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

// --- Types ---
interface User {
  id: string;
  name: string;
  role: string; // 'Employee' or 'CareGiver'
  image: string;
  lastMessage: string;
  time: string;
  online: boolean;
}

interface ChatMessage {
  id: string;
  sender: 'me' | 'other';
  text: string;
  time: string;
  image?: string;
}

interface EmailItem {
  id: string;
  subject: string;
  preview: string;
  sender: string;
  date: string;
}

// --- Mock Data ---
const users: User[] = [
  { id: '1', name: 'Isabella Anderson', role: 'Employee', image: 'https://i.pravatar.cc/150?img=1', lastMessage: 'Hi, just letting you know I\'ve arrived...', time: '8:00 PM', online: true },
  { id: '2', name: 'Sophia Johnson', role: 'Employee', image: 'https://i.pravatar.cc/150?img=5', lastMessage: 'Can you check the schedule for tomorrow?', time: '3:15 PM', online: true },
  { id: '3', name: 'Liam Smith', role: 'Employee', image: 'https://i.pravatar.cc/150?img=11', lastMessage: 'Traffic is a bit heavy, might be 5 min late.', time: '9:45 AM', online: true },
  { id: '4', name: 'Olivia Brown', role: 'CareGiver', image: 'https://i.pravatar.cc/150?img=20', lastMessage: 'Patient took medication on time.', time: '6:30 PM', online: true },
  { id: '5', name: 'Noah Davis', role: 'CareGiver', image: 'https://i.pravatar.cc/150?img=33', lastMessage: 'See you next week!', time: '11:05 AM', online: false },
  { id: '6', name: 'Ava Wilson', role: 'CareGiver', image: 'https://i.pravatar.cc/150?img=9', lastMessage: 'Report submitted.', time: '2:20 AM', online: false },
];

const messagesData: ChatMessage[] = [
  { id: '1', sender: 'other', text: 'Good morning! I\'ve just arrived at Charlotte White\'s residence. Everything looks good so far.', time: '12:40 AM', image: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', sender: 'other', text: 'She took her meds without any hesitation today. Also, I encouraged her to join the painting session later. She smiled and agreed.', time: '12:40 AM', image: 'https://i.pravatar.cc/150?img=1' },
  { id: '3', sender: 'me', text: 'Morning, Emma! Thanks for the update. Let know if she\'s ready for her morning medicine', time: '12:40 AM', image: 'https://i.pravatar.cc/150?img=12' },
  { id: '4', sender: 'me', text: 'That\'s great to hear! She\'s really opened up lately. Appreciate you encouraging those activities', time: '12:40 AM', image: 'https://i.pravatar.cc/150?img=12' },
  { id: '5', sender: 'me', text: 'Good morning! I\'ve just arrived at Charlotte White\'s residence. Everything looks good so far.', time: '12:40 AM', image: 'https://i.pravatar.cc/150?img=12' },
];

const emailData: EmailItem[] = [
  { id: '1', subject: 'Request for new billing', preview: 'Hey, Isabella, we have reviewed your work. There are few missed attendance so we couldn\'t issue new payment to you. Could you look into it and fill the attendance.', sender: 'Karixa Team', date: '23 Feb, 2025' },
  { id: '2', subject: 'Request for new billing', preview: 'Hey, Isabella, we have reviewed your work. There are few missed attendance so we couldn\'t issue new payment to you. Could you look into it and fill the attendance.', sender: 'Karixa Team', date: '23 Feb, 2025' },
  { id: '3', subject: 'Request for new billing', preview: 'Hey, Isabella, we have reviewed your work. There are few missed attendance so we couldn\'t issue new payment to you. Could you look into it and fill the attendance.', sender: 'Karixa Team', date: '23 Feb, 2025' },
];

export default function MessagePage() {
  const [selectedUserId, setSelectedUserId] = useState<string>('1');
  const [activeTab, setActiveTab] = useState<'chat' | 'emails'>('chat');
  
  // Sidebar states
  const [sidebarFilter, setSidebarFilter] = useState<'Employee' | 'CareGiver'>('Employee');

  const selectedUser = users.find(u => u.id === selectedUserId) || users[0];
  const filteredUsers = users.filter(u => u.role === sidebarFilter);

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-100px)] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* ================= LEFT SIDEBAR ================= */}
        <div className="w-80 border-r border-gray-100 flex flex-col h-full bg-white flex-shrink-0">
          
          {/* 1. Sidebar Header (Text + Icons) */}
          <div className="p-4 pb-2 flex justify-between items-center">
             <h2 className="text-lg font-bold text-gray-800">Message</h2>
             <div className="flex gap-3 text-gray-400">
                <button className="hover:text-gray-600"><i className="fa-regular fa-comment text-lg"></i></button>
                <button className="hover:text-gray-600"><i className="fa-regular fa-envelope text-lg"></i></button>
             </div>
          </div>

          {/* 2. Search */}
          <div className="px-4 pb-3">
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-gray-400 text-xs"></i>
              <input 
                type="text" 
                placeholder="Search Anything..." 
                className="w-full pl-8 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs focus:outline-none focus:border-brand placeholder-gray-400"
              />
            </div>
          </div>

          {/* 3. Filter Tabs (Employee / CareGiver) */}
          <div className="px-4 pb-2">
            <div className="flex bg-gray-50 p-1 rounded-lg">
              <button 
                onClick={() => setSidebarFilter('Employee')}
                className={`flex-1 py-1.5 text-xs font-medium rounded transition-all ${sidebarFilter === 'Employee' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}
              >
                Employee
              </button>
              <button 
                onClick={() => setSidebarFilter('CareGiver')}
                className={`flex-1 py-1.5 text-xs font-medium rounded transition-all ${sidebarFilter === 'CareGiver' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}
              >
                CareGiver
              </button>
            </div>
          </div>

          {/* 4. User List */}
          <div className="flex-1 overflow-y-auto">
            {filteredUsers.map((user) => (
              <div 
                key={user.id} 
                onClick={() => setSelectedUserId(user.id)}
                className={`flex gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition-colors ${selectedUserId === user.id ? 'bg-blue-50/40' : ''}`}
              >
                <div className="relative">
                  <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                  {user.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-brand border-2 border-white rounded-full"></span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className="text-sm font-semibold text-gray-800 truncate">{user.name}</h4>
                    <span className="text-[10px] text-gray-400">{user.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{user.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= RIGHT CONTENT AREA ================= */}
        <div className="flex-1 flex flex-col bg-white min-w-0">
          
          {/* 1. Active User Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="relative">
                 <img src={selectedUser.image} alt="Active" className="w-10 h-10 rounded-full object-cover" />
                 {selectedUser.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-brand border-2 border-white rounded-full"></span>}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm">{selectedUser.name}</h3>
                <p className="text-xs text-gray-400">Active Now</p>
              </div>
            </div>
            <div className="flex gap-4 text-gray-400">
               <i className="fa-solid fa-magnifying-glass hover:text-gray-600 cursor-pointer"></i>
               <i className="fa-solid fa-ellipsis-vertical hover:text-gray-600 cursor-pointer"></i>
            </div>
          </div>

          {/* 2. Main Tab Switcher (Chat vs Emails) */}
          <div className="px-6 py-2 border-b border-gray-50">
            <div className="flex bg-gray-50/80 p-1 rounded-lg">
              <button 
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'chat' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Chat
              </button>
              <button 
                onClick={() => setActiveTab('emails')}
                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'emails' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Emails
              </button>
            </div>
          </div>

          {/* 3. Content View */}
          <div className="flex-1 overflow-hidden relative">
            {activeTab === 'chat' ? (
              <ChatView />
            ) : (
              <EmailView />
            )}
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

// ================= SUB-COMPONENT: Chat View =================
function ChatView() {
  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messagesData.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.sender === 'me' ? 'flex-row-reverse' : ''}`}>
              <img src={msg.image} className="w-8 h-8 rounded-full self-end mb-1" />
              <div className={`max-w-[70%]`}>
                {/* Time Stamp Row */}
                <div className={`flex items-center gap-2 mb-1 ${msg.sender === 'me' ? 'justify-end' : ''}`}>
                   {msg.sender !== 'me' && <span className="text-xs font-semibold text-gray-700">Isabella Anderson</span>}
                   <span className="text-[10px] text-gray-400">{msg.time}</span>
                   {msg.sender === 'me' && <span className="text-xs font-semibold text-gray-700">You</span>}
                </div>
                {/* Message Bubble */}
                <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'me' 
                    ? 'bg-blue-50 text-gray-800 rounded-br-none' 
                    : 'bg-gray-100 text-gray-700 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Input Area */}
      <div className="p-4">
           <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-3 shadow-sm">
              <button className="text-gray-400 hover:text-gray-600 rotate-45"><i className="fa-solid fa-paperclip"></i></button>
              <button className="text-gray-400 hover:text-gray-600"><i className="fa-solid fa-microphone"></i></button>
              <input type="text" placeholder="Send your message..." className="flex-1 bg-transparent text-sm focus:outline-none text-gray-700 py-2" />
              <button className="bg-brand text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-darkblue transition-colors flex items-center gap-1">
                Send <i className="fa-solid fa-paper-plane text-[10px]"></i>
              </button>
           </div>
      </div>
    </div>
  );
}

// ================= SUB-COMPONENT: Email View =================
function EmailView() {
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  return (
    <div className="h-full flex flex-col relative bg-gray-50/30">
      
      {/* Email List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 pb-40"> 
        {emailData.map((mail) => (
          <div key={mail.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-gray-800 text-sm">{mail.subject}</h3>
              <span className="text-xs text-gray-400">{mail.date}</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{mail.preview}</p>
            <div className="mt-2 text-xs text-gray-500 font-medium">
              Thanks ! <br/> {mail.sender}
            </div>
          </div>
        ))}
        {/* Duplicate for scrolling demo */}
        {emailData.map((mail) => (
          <div key={`${mail.id}-dup`} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-gray-800 text-sm">{mail.subject}</h3>
              <span className="text-xs text-gray-400">{mail.date}</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{mail.preview}</p>
            <div className="mt-2 text-xs text-gray-500 font-medium">
              Thanks ! <br/> {mail.sender}
            </div>
          </div>
        ))}
      </div>

      {/* Collapsible Compose Section */}
      <div className={`absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out z-20 ${isComposeOpen ? 'h-[400px]' : 'h-[50px]'}`}>
        
        {/* Header Toggle */}
        <div 
          onClick={() => setIsComposeOpen(!isComposeOpen)} 
          className="h-[50px] flex items-center justify-between px-6 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <span className="text-sm font-semibold text-gray-700">Create Mail</span>
          <i className={`fa-solid fa-chevron-up transition-transform duration-300 ${isComposeOpen ? 'rotate-180' : ''} text-gray-400`}></i>
        </div>

        {/* Form Content */}
        {isComposeOpen && (
          <div className="p-6 pt-0 h-[350px] flex flex-col gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">To</label>
              <input type="email" defaultValue="isabella.anderson@gmail.com" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand text-gray-700" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Subject</label>
              <input type="text" placeholder="Enter your subject" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand text-gray-700" />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Message</label>
              <textarea placeholder="Enter your message" className="w-full h-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand resize-none text-gray-700"></textarea>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button className="text-gray-400 hover:text-gray-600"><i className="fa-solid fa-paperclip text-lg"></i></button>
              <button className="bg-brand text-white px-5 py-2 rounded-lg text-xs font-medium hover:bg-darkblue transition-colors flex items-center gap-2">
                Send <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}