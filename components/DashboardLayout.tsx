"use client";
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from "react";
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Dropdown States
  const [isBillingOpen, setIsBillingOpen] = useState(false);
  const [isStaffOpen, setIsStaffOpen] = useState(false); // New Staff State
  
  // Notification Dropdown
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Mock Notification Data
  const notifications = [
    { id: 1, title: "New Assignment", message: "You have been assigned a new client.", time: "5 min ago", read: false },
    { id: 2, title: "Report Generated", message: "Monthly attendance report is ready.", time: "1 hour ago", read: false },
    { id: 3, title: "System Update", message: "System maintenance scheduled for tonight.", time: "5 hours ago", read: true },
  ];

  const pathname = usePathname();

  // Auto-open Staff menu if we are on a staff-related page
  useEffect(() => {
    if (pathname.includes('/employees') || pathname.includes('/caregivers')) {
      setIsStaffOpen(true);
    }
  }, [pathname]);

  // Toggle Mobile Drawer
  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // Toggle Desktop Collapse
  const toggleDesktopSidebar = () => {
    if (isCollapsed) {
      expandSidebar();
    } else {
      setIsCollapsed(true);
      // Close all submenus when collapsing
      setIsBillingOpen(false); 
      setIsStaffOpen(false);
    }
  };

  const expandSidebar = () => {
    setIsCollapsed(false);
  };

  // Toggle Submenu (Billing)
  const toggleBillingMenu = () => {
    if (isCollapsed) {
      expandSidebar();
      setTimeout(() => setIsBillingOpen(true), 150);
    } else {
      setIsBillingOpen(!isBillingOpen);
    }
  };

  // Toggle Submenu (Staff)
  const toggleStaffMenu = () => {
    if (isCollapsed) {
      expandSidebar();
      setTimeout(() => setIsStaffOpen(true), 150);
    } else {
      setIsStaffOpen(!isStaffOpen);
    }
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen relative overflow-hidden">
      
      {/* MOBILE OVERLAY */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50 bg-[#0074D9] text-white flex flex-col transition-all duration-300 shadow-xl md:shadow-none h-full
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${isCollapsed ? "w-20" : "w-64"}
        `}
      >
        {/* Logo Area */}
        <Link
          href="/"
          className={`h-16 flex items-center mt-3 transition-all duration-300 overflow-hidden whitespace-nowrap shrink-0 ${
            isCollapsed ? "justify-center px-0" : "px-6"
          }`}
        >
          {isCollapsed && (
            <i className="fa-solid fa-k text-2xl font-bold"></i>
          )}
          {!isCollapsed && (
            <span className="tracking-wide opacity-100 transition-opacity duration-300 band-logo">
              <img src="/images/logo.png" alt="Karixa" className="" />
            </span>
          )}
        </Link>

        {/* Scrollable Nav */}
        <div className="flex-1 overflow-y-auto py-4 space-y-1 overflow-x-hidden no-scrollbar pl-2 pr-2">
          
          {/* Dashboard Link */}
          <Link 
            href="/" title='Dashboard' 
            className={`flex items-center px-4 py-3 transition-all group ${isCollapsed ? "justify-center" : ""} ${
              pathname === "/" 
                ? "bg-[#0085C9] border border-[#00629B] text-white rounded-lg" 
                : "text-blue-100 hover:bg-[#0085C9] hover:text-white border border-[transparent] rounded-lg"
            }`}
          >
            <i className="fa-solid fa-table-columns w-6 text-center text-lg"></i>
            {!isCollapsed && <span className="ml-3 font-medium whitespace-nowrap">Dashboard</span>}
          </Link>

          {/* Notification Link */}
          <Link href="/notification" title='Notification'
            className={`flex items-center px-4 py-3 transition-all group ${isCollapsed ? "justify-center" : ""} ${
              pathname === "/notification" 
                ? "bg-white/10 border border-[#00629B] text-white rounded-lg"
                : "text-blue-100 hover:bg-white/10 hover:text-white border border-transparent rounded-lg"
            }`}
          >
            <i className="fa-regular fa-bell w-6 text-center text-lg"></i>
            {!isCollapsed && <span className="ml-3 whitespace-nowrap">Notification</span>}
          </Link>

          {/* Message */}
          <Link href="/message" title='Message' className={`flex items-center px-4 py-3 transition-all group ${isCollapsed ? "justify-center" : ""} ${
              pathname === "/message" 
                ? "bg-white/10 border border-[#00629B] text-white rounded-lg"
                : "text-blue-100 hover:bg-white/10 hover:text-white border border-transparent rounded-lg"
            }`}>
            <i className="fa-regular fa-message w-6 text-center text-lg"></i>
            {!isCollapsed && <span className="ml-3 whitespace-nowrap">Message</span>}
          </Link>

          {/* Group Label */}
          {!isCollapsed && <div className="pt-4 pb-2 text-xs font-semibold text-blue-200 uppercase tracking-wider px-4 truncate">Manage</div>}

          {/* Client */}
          <Link href="/clients" title='Clients' className={`flex items-center px-4 py-3 transition-all group ${isCollapsed ? "justify-center" : ""} ${
              pathname.includes("/clients")
                ? "bg-white/10 border border-[#00629B] text-white rounded-lg"
                : "text-blue-100 hover:bg-white/10 hover:text-white border border-transparent rounded-lg"
            }`}>
            <i className="fa-regular fa-user w-6 text-center text-lg"></i>
            {!isCollapsed && <span className="ml-3 whitespace-nowrap">Clients</span>}
          </Link>

        {/* ========================================================= */}
          {/* NEW STAFF DROPDOWN (Employees | Caregivers | Applicants) */}
          {/* ========================================================= */}
          <div className="relative">
            <button 
              onClick={toggleStaffMenu}
              className={`w-full flex items-center rounded-lg px-4 py-3 outline-none transition-all group focus:outline-none ${isCollapsed ? "justify-center" : ""} ${
                pathname.includes('/employees') || pathname.includes('/caregivers') || pathname.includes('/caregivers-applicants')
                  ? "bg-white/10 text-white" 
                  : "text-blue-100 hover:bg-white/10 hover:text-white border border-transparent"
              }`}
            >
              <i className="fa-solid fa-users w-6 text-center text-lg"></i>
              {!isCollapsed && (
                <>
                  <span className="ml-3 whitespace-nowrap font-medium">Staff</span>
                  {/* Changed duration to 500ms for a slower, smoother arrow rotation */}
                  <i className={`fa-solid fa-chevron-down ml-auto text-xs opacity-70 transition-transform duration-500 ${isStaffOpen ? "rotate-180" : ""}`}></i>
                </>
              )}
            </button>

            {/* Staff Submenu - SMOOTH GRID TRANSITION */}
            {!isCollapsed && (
              <div 
                className={`grid transition-all duration-500 ease-in-out ${isStaffOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                {/* The inner container holds the actual height and hides overflow during the transition */}
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-1 pt-1 pb-1">
                    <Link 
                      href="/employees" 
                      title="Employees" 
                      className={`flex items-center py-2 pl-12 pr-4 transition-all rounded-lg ${
                        pathname.includes("/employees") ? "text-white font-medium bg-white/5" : "text-blue-200 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <i className="fa-solid fa-circle text-[6px] mr-3 opacity-50"></i>
                      <span className="whitespace-nowrap">Employees</span>
                    </Link>
                    
                    <Link 
                      href="/caregivers" 
                      title="Caregivers" 
                      className={`flex items-center py-2 pl-12 pr-4 transition-all rounded-lg ${
                        pathname.includes("/caregivers") && !pathname.includes("/caregivers-applicants") ? "text-white font-medium bg-white/5" : "text-blue-200 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <i className="fa-solid fa-circle text-[6px] mr-3 opacity-50"></i>
                      <span className="whitespace-nowrap">Caregivers</span>
                    </Link>
                    
                    <Link 
                      href="/caregiver-applicants" 
                      title="Caregivers Applicants" 
                      className={`flex items-center py-2 pl-12 pr-4 transition-all rounded-lg ${
                        pathname.includes("/caregiver-applicants") ? "text-white font-medium bg-white/5" : "text-blue-200 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <i className="fa-solid fa-circle text-[6px] mr-3 opacity-50"></i>
                      <span className="whitespace-nowrap">Caregivers Applicants</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* ========================================================= */}

          {/* Schedule */}
          <Link href="/schedule" title='Schedule' className={`flex items-center px-4 py-3 transition-all group ${isCollapsed ? "justify-center" : ""} ${
              pathname === "/schedule" 
                ? "bg-white/10 border border-[#00629B] text-white rounded-lg"
                : "text-blue-100 hover:bg-white/10 hover:text-white border border-transparent rounded-lg"
            }`}>
            <i className="fa-regular fa-calendar w-6 text-center text-lg"></i>
            {!isCollapsed && <span className="ml-3 whitespace-nowrap">Schedule</span>}
          </Link>

          {/* Attendance */}
          <Link href="/attendance" title='Attendance' className={`flex items-center px-4 py-3 transition-all group ${isCollapsed ? "justify-center" : ""} ${
              pathname === "/attendance" 
                ? "bg-white/10 border border-[#00629B] text-white rounded-lg"
                : "text-blue-100 hover:bg-white/10 hover:text-white border border-transparent rounded-lg"
            }`}>
            <i className="fa-solid fa-clipboard-user w-6 text-center text-lg"></i>
            {!isCollapsed && <span className="ml-3 whitespace-nowrap">Attendance</span>}
          </Link>

          {/* ========================================================= */}
          {/* NEW: CUSTOM FORMS TAB */}
          {/* ========================================================= */}
          <Link href="/forms/builder" title='Custom Forms' className={`flex items-center px-4 py-3 transition-all group ${isCollapsed ? "justify-center" : ""} ${
              pathname.includes("/forms") 
                ? "bg-white/10 border border-[#00629B] text-white rounded-lg"
                : "text-blue-100 hover:bg-white/10 hover:text-white border border-transparent rounded-lg"
            }`}>
            <i className="fa-solid fa-file-signature w-6 text-center text-lg"></i>
            {!isCollapsed && <span className="ml-3 whitespace-nowrap">Custom Forms</span>}
          </Link>

          {/* Group Label */}
          {!isCollapsed && <div className="pt-4 pb-2 text-xs font-semibold text-blue-200 uppercase tracking-wider px-4 truncate">Data Analysis</div>}

          {/* Billing / Payroll Dropdown */}
          <div className="relative">
            <button 
              onClick={toggleBillingMenu}
              className={`w-full flex items-center rounded-lg px-4 py-3 outline-none text-blue-100 hover:text-white hover:bg-white/10 transition-all group focus:outline-none ${isCollapsed ? "justify-center" : ""}`}
            >
              <i className="fa-solid fa-file-invoice-dollar w-6 text-center text-lg"></i>
              {!isCollapsed && (
                <>
                  <span className="ml-3 whitespace-nowrap">Billing / Payroll</span>
                  <i className={`fa-solid fa-chevron-down ml-auto text-xs opacity-70 transition-transform duration-300 ${isBillingOpen ? "rotate-180" : ""}`}></i>
                </>
              )}
            </button>
            {/* Submenu (Commented out in original but ready for use) */}
          </div>

          {/* Reports */}
          <Link href="#/reports" title='Reports' className={`flex items-center px-4 py-3 transition-all group ${isCollapsed ? "justify-center" : ""} ${
              pathname === "#/reports" 
                ? "bg-white/10 border border-[#00629B] text-white rounded-lg"
                : "text-blue-100 hover:bg-white/10 hover:text-white border border-transparent rounded-lg"
            }`}>
            <i className="fa-regular fa-file-lines w-6 text-center text-lg"></i>
            {!isCollapsed && <span className="ml-3 whitespace-nowrap">Reports</span>}
          </Link>
      
          {/* User Role */}
          <Link href="/user-role" title='User Role' className={`flex items-center px-4 py-3 transition-all group ${isCollapsed ? "justify-center" : ""} ${
              pathname === "/user-role" 
                ? "bg-white/10 border border-[#00629B] text-white rounded-lg"
                : "text-blue-100 hover:bg-white/10 hover:text-white border border-transparent rounded-lg"
            }`}>
            <i className="fa-regular fa-id-badge w-6 text-center text-lg"></i>
            {!isCollapsed && <span className="ml-3 whitespace-nowrap">User Role</span>}
          </Link>
        </div>

        {/* User Profile Dropdown Section */}
        <div className="p-3 mt-auto relative" ref={dropdownRef}>
          
          {/* Dropdown Menu (Opens Upwards) */}
          <div 
            className={`absolute bottom-full left-3 right-3 mb-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 origin-bottom transform ${
              isDropdownOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 translate-y-2 pointer-events-none"
            }`}
          >
            {/* Dropdown Header */}
            <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center gap-3">
              <img src="/images/manoj.jpg" alt="User" className="w-10 h-10 rounded-full border border-gray-200 object-cover" />
              <div className="overflow-hidden">
                <h4 className="text-sm font-bold text-gray-800 truncate">Manoj Sah</h4>
                <p className="text-xs text-gray-500 truncate">manoj@karixa.com</p>
              </div>
            </div>

            {/* Dropdown Links */}
            <div className="p-2 space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors text-left">
                <i className="fa-regular fa-user w-4 text-center"></i> View Profile
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors text-left">
                <i className="fa-solid fa-gear w-4 text-center"></i> Account Settings
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors text-left">
                <i className="fa-regular fa-bell w-4 text-center"></i> Notifications 
                <span className="ml-auto bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">2</span>
              </button>
            </div>

            {/* Logout */}
            <div className="p-2 border-t border-gray-100 bg-gray-50/50">
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors text-left font-medium">
                <i className="fa-solid fa-arrow-right-from-bracket w-4 text-center"></i> Logout
              </button>
            </div>
          </div>

          {/* User Trigger Button */}
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 border border-transparent ${
              isDropdownOpen ? "bg-[#00629B] border-white/20" : "bg-[#0085C9] border-[#00629B] hover:bg-[#007bbd]"
            }`}
          >
            <img src="/images/manoj.jpg" alt="User" className="w-9 h-9 rounded-full border-2 border-white/30 flex-shrink-0 object-cover" />
            
            {!isCollapsed && (
              <>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium truncate">Manoj Sah</p>
                  <p className="text-xs text-blue-200 truncate">manoj@karixa.com</p>
                </div>
                <i className={`fa-solid fa-chevron-down text-blue-200 text-xs transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}></i>
              </>
            )}
          </button>

        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative w-full bg-[#0074D9] p-2 ">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 flex-shrink-0 rounded-t-lg relative z-40">
          <div className="flex items-center gap-4">
            
            {/* Toggle Button */}
            <button
              onClick={() => {
                if (window.innerWidth < 768) {
                  toggleMobileSidebar();
                } else {
                  toggleDesktopSidebar();
                }
              }}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 focus:outline-none transition-colors"
            >
              <i className="fa-solid fa-bars text-xl"></i>
            </button>

            {/* Search */}
            <div className="hidden sm:flex items-center text-gray-400 bg-gray-50 rounded-lg px-3 py-2 border border-transparent focus-within:border-[#0074D9] focus-within:bg-white transition-all">
              <i className="fa-solid fa-magnifying-glass mr-2"></i>
              <input type="text" placeholder="Search..." className="bg-transparent border-none focus:ring-0 text-sm w-48 lg:w-64 placeholder-gray-400 outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right mr-2">
              <p className="text-xs text-gray-500 font-medium">26 November, 2025 | 01:53 PM</p>
            </div>
            
            {/* NOTIFICATION SECTION */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="text-gray-400 hover:text-gray-600 relative p-2 focus:outline-none"
              >
                <i className="fa-regular fa-bell text-xl"></i>
                <span className="absolute top-1 right-2 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>
              </button>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 origin-top-right animate-scale-up">
                  <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="text-sm font-bold text-gray-800">Notifications</h3>
                    <span className="text-xs text-[#0074D9] cursor-pointer hover:underline">Mark all as read</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div key={notif.id} className={`p-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${!notif.read ? 'bg-blue-50/30' : ''}`}>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className={`text-sm ${!notif.read ? 'font-bold text-gray-800' : 'font-medium text-gray-600'}`}>{notif.title}</h4>
                          <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{notif.time}</span>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-2">{notif.message}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 bg-gray-50 text-center border-t border-gray-100">
                    <Link href="/notification" className="text-xs font-medium text-[#0074D9] hover:underline block py-1">
                      View All Notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <img src="/images/manoj.jpg" alt="Profile" className="h-8 w-8 rounded-full md:hidden object-cover" />
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-4 bg-gray-50 rounded-b-lg">
          {children}
        </main>
      </div>
    </div>
  );
}