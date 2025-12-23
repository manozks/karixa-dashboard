"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

// --- Types ---
interface User {
  id: string;
  name: string;
  role: string;
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
];

const emailData: EmailItem[] = [
  { id: '1', subject: 'Request for new billing', preview: 'Hey, Isabella, we have reviewed your work...', sender: 'Cosmos Care Team', date: '23 Feb, 2025' },
  { id: '2', subject: 'Request for new billing', preview: 'There are few missed attendance so we...', sender: 'Cosmos Care Team', date: '23 Feb, 2025' },
];

export default function MessagePage() {
  const [selectedUserId, setSelectedUserId] = useState<string>('1');
  const [activeTab, setActiveTab] = useState<'chat' | 'emails'>('chat');
  const [sidebarFilter, setSidebarFilter] = useState<'Employee' | 'CareGiver'>('Employee');
  const [showMobileChat, setShowMobileChat] = useState(false);

  // --- Modal State ---
  // 'mail' = Envelope Icon Clicked | 'chat' = Chat Icon Clicked | null = Closed
  const [activeModal, setActiveModal] = useState<'mail' | 'chat' | null>(null);

  const selectedUser = users.find(u => u.id === selectedUserId) || users[0];
  const filteredUsers = users.filter(u => u.role === sidebarFilter);

  const handleUserClick = (id: string) => {
    setSelectedUserId(id);
    setShowMobileChat(true);
  };

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-100px)] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
        
        {/* ================= LEFT SIDEBAR ================= */}
        <div className={`
            w-full md:w-80 flex-col h-full bg-white flex-shrink-0 border-r border-gray-100
            ${showMobileChat ? 'hidden md:flex' : 'flex'}
        `}>
          
          {/* 1. Sidebar Header (With Triggers) */}
          <div className="p-4 pb-2 flex justify-between items-center">
             <h2 className="text-lg font-bold text-gray-800">Message</h2>
             <div className="flex gap-3 text-gray-400">
                {/* CHAT TRIGGER */}
                <button onClick={() => setActiveModal('chat')} className="hover:text-gray-600 transition-colors">
                  <i className="fa-regular fa-comment text-lg"></i>
                </button>
                {/* MAIL TRIGGER */}
                <button onClick={() => setActiveModal('mail')} className="hover:text-gray-600 transition-colors">
                  <i className="fa-regular fa-envelope text-lg"></i>
                </button>
             </div>
          </div>

          {/* 2. Search */}
          <div className="px-4 pb-3">
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-gray-400 text-xs"></i>
              <input type="text" placeholder="Search Anything..." className="w-full pl-8 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs focus:outline-none focus:border-brand placeholder-gray-400" />
            </div>
          </div>

          {/* 3. Filter Tabs */}
          <div className="px-4 pb-2">
            <div className="flex bg-gray-50 p-1 rounded-lg">
              <button onClick={() => setSidebarFilter('Employee')} className={`flex-1 py-1.5 text-xs font-medium rounded transition-all ${sidebarFilter === 'Employee' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}>Employee</button>
              <button onClick={() => setSidebarFilter('CareGiver')} className={`flex-1 py-1.5 text-xs font-medium rounded transition-all ${sidebarFilter === 'CareGiver' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}>CareGiver</button>
            </div>
          </div>

          {/* 4. User List */}
          <div className="flex-1 overflow-y-auto">
            {filteredUsers.map((user) => (
              <div key={user.id} onClick={() => handleUserClick(user.id)} className={`flex gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition-colors ${selectedUserId === user.id ? 'bg-blue-50/40' : ''}`}>
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
        <div className={`
            flex-1 flex-col bg-white min-w-0 h-full
            ${!showMobileChat ? 'hidden md:flex' : 'flex'}
        `}>
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-gray-50 shrink-0">
            <div className="flex items-center gap-3">
              <button onClick={() => setShowMobileChat(false)} className="md:hidden text-gray-500 hover:text-gray-800 mr-1">
                <i className="fa-solid fa-arrow-left text-lg"></i>
              </button>
              <div className="relative">
                 <img src={selectedUser.image} alt="Active" className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover" />
                 {selectedUser.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-brand border-2 border-white rounded-full"></span>}
              </div>
              <div className="overflow-hidden">
                <h3 className="font-bold text-gray-800 text-sm truncate max-w-[150px] md:max-w-xs">{selectedUser.name}</h3>
                <p className="text-xs text-gray-400">Active Now</p>
              </div>
            </div>
            <div className="flex gap-4 text-gray-400">
               <i className="fa-solid fa-magnifying-glass hover:text-gray-600 cursor-pointer"></i>
               <i className="fa-solid fa-ellipsis-vertical hover:text-gray-600 cursor-pointer"></i>
            </div>
          </div>

          {/* Main Tab Switcher */}
          <div className="px-4 md:px-6 py-2 border-b border-gray-50 shrink-0">
            <div className="flex bg-gray-50/80 p-1 rounded-lg">
              <button onClick={() => setActiveTab('chat')} className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'chat' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}>Chat</button>
              <button onClick={() => setActiveTab('emails')} className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'emails' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}>Emails</button>
            </div>
          </div>

          {/* Content View */}
          <div className="flex-1 overflow-hidden relative w-full">
            {activeTab === 'chat' ? <ChatView /> : <EmailView />}
          </div>
        </div>

        {/* ================= MODAL COMPONENT (Rendered conditionally) ================= */}
        {activeModal && (
          <ComposeModal 
            type={activeModal} 
            onClose={() => setActiveModal(null)} 
          />
        )}

      </div>
    </DashboardLayout>
  );
}

// ==========================================
// SUB-COMPONENT: Compose Modal (POPUP)
// ==========================================
function ComposeModal({ type, onClose }: { type: 'mail' | 'chat', onClose: () => void }) {
  const isMail = type === 'mail';
  const title = isMail ? "Create mail" : "Create Message";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 pb-2">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <i className="fa-solid fa-times text-lg"></i>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          
          {/* TO Field  */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500 ml-1">To</label>
            <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2 flex flex-wrap gap-2 min-h-[42px]">
               {/* Dummy Tags matching your image */}
               <span className="bg-gray-200/80 text-gray-700 text-xs px-2 py-1 rounded-md flex items-center gap-1 border border-gray-300">
                  isabella.anderson@gmail.com <i className="fa-solid fa-times hover:text-red-500 cursor-pointer"></i>
               </span>
               <span className="bg-gray-200/80 text-gray-700 text-xs px-2 py-1 rounded-md flex items-center gap-1 border border-gray-300">
                  michael.johnson@yahoo.com <i className="fa-solid fa-times hover:text-red-500 cursor-pointer"></i>
               </span>
               {/* Input for typing more */}
               <input type="text" className="bg-transparent text-sm focus:outline-none flex-1 min-w-[100px]" placeholder="" />
            </div>
          </div>

                
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-500 ml-1">Subject</label>
              <input 
                type="text" 
                placeholder="Enter your subject" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-all placeholder-gray-400"
              />
            </div>
       

          {/* Message */}
          <div className="space-y-1.5">
           
            <label className="text-xs font-medium text-gray-500 ml-1">Message</label>
            <textarea 
              placeholder="Enter your message" 
              className="w-full h-32 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-all resize-none placeholder-gray-400"
            ></textarea>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 pt-2 flex justify-between items-center">
          <label className="flex items-center gap-2 cursor-pointer group">
             <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-brand focus:ring-brand" />
             <span className="text-xs text-gray-500 group-hover:text-gray-700 select-none">Send in Message as well</span>
          </label>
          
          <button className="bg-brand hover:bg-darkblue text-white px-8 py-2.5 rounded-xl font-medium text-sm transition-all shadow-lg shadow-brand/30">
            Send
          </button>
        </div>

      </div>
    </div>
  );
}

// ================= SUB-COMPONENTS (ChatView & EmailView - Same as before) =================
function ChatView() {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {messagesData.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.sender === 'me' ? 'flex-row-reverse' : ''}`}>
              <img src={msg.image} className="w-8 h-8 rounded-full self-end mb-1 shrink-0" />
              <div className={`max-w-[75%] md:max-w-[70%]`}>
                <div className={`flex items-center gap-2 mb-1 ${msg.sender === 'me' ? 'justify-end' : ''}`}>
                   {msg.sender !== 'me' && <span className="hidden md:inline text-xs font-semibold text-gray-700">Isabella Anderson</span>}
                   <span className="text-[10px] text-gray-400">{msg.time}</span>
                </div>
                <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'me' ? 'bg-blue-50 text-gray-800 rounded-br-none' : 'bg-gray-100 text-gray-700 rounded-bl-none'}`}>{msg.text}</div>
              </div>
            </div>
          ))}
      </div>
      <div className="p-4 shrink-0">
           <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 flex items-center gap-2 md:gap-3 shadow-sm">
              <button className="text-gray-400 hover:text-gray-600 rotate-45"><i className="fa-solid fa-paperclip"></i></button>
              <input type="text" placeholder="Type a message..." className="flex-1 bg-transparent text-sm focus:outline-none text-gray-700 py-2 min-w-0" />
              <button className="bg-brand text-white px-3 md:px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-darkblue transition-colors flex items-center gap-1 shrink-0">Send <i className="fa-solid fa-paper-plane text-[10px]"></i></button>
           </div>
      </div>
    </div>
  );
}

function EmailView() {
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  return (
    <div className="h-full flex flex-col relative bg-gray-50/30 w-full">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 pb-32 md:pb-40"> 
        {emailData.map((mail) => (
          <div key={mail.id} className="bg-white p-4 md:p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-gray-800 text-sm">{mail.subject}</h3>
              <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{mail.date}</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 md:line-clamp-none">{mail.preview}</p>
            <div className="mt-2 text-xs text-gray-500 font-medium">Thanks ! <br/> {mail.sender}</div>
          </div>
        ))}
      </div>
      <div className={`absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out z-20 w-full ${isComposeOpen ? 'h-[90%] md:h-[400px]' : 'h-[50px]'}`}>
        <div onClick={() => setIsComposeOpen(!isComposeOpen)} className="h-[50px] flex items-center justify-between px-6 cursor-pointer hover:bg-gray-50 transition-colors">
          <span className="text-sm font-semibold text-gray-700">Create Mail</span>
          <i className={`fa-solid fa-chevron-up transition-transform duration-300 ${isComposeOpen ? 'rotate-180' : ''} text-gray-400`}></i>
        </div>
        {isComposeOpen && (
          <div className="p-4 md:p-6 pt-0 h-[calc(100%-50px)] flex flex-col gap-3">
            <div><label className="text-xs text-gray-500 mb-1 block">To</label><input type="email" defaultValue="isabella.anderson@gmail.com" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand text-gray-700" /></div>
            <div><label className="text-xs text-gray-500 mb-1 block">Subject</label><input type="text" placeholder="Enter your subject" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand text-gray-700" /></div>
            <div className="flex-1"><label className="text-xs text-gray-500 mb-1 block">Message</label><textarea placeholder="Enter your message" className="w-full h-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand resize-none text-gray-700"></textarea></div>
            <div className="flex justify-between items-center mt-1 shrink-0"><button className="text-gray-400 hover:text-gray-600"><i className="fa-solid fa-paperclip text-lg"></i></button><button className="bg-brand text-white px-5 py-2 rounded-lg text-xs font-medium hover:bg-darkblue transition-colors flex items-center gap-2">Send <i className="fa-solid fa-paper-plane"></i></button></div>
          </div>
        )}
      </div>
    </div>
  );
}