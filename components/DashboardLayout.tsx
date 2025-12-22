"use client";
import { usePathname } from 'next/navigation';
import { useState } from "react";
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isBillingOpen, setIsBillingOpen] = useState(false);

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
      // Close submenu when collapsing
      setIsBillingOpen(false); 
    }
  };

  const expandSidebar = () => {
    setIsCollapsed(false);
  };

  // Toggle Submenu (Billing)
  const toggleBillingMenu = () => {
    if (isCollapsed) {
      expandSidebar();
      // Small delay to allow expansion animation before showing menu
      setTimeout(() => setIsBillingOpen(true), 150);
    } else {
      setIsBillingOpen(!isBillingOpen);
    }
  };
const pathname = usePathname();
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
          fixed md:static inset-y-0 left-0 z-50 bg-brand text-white flex flex-col transition-all duration-300 shadow-xl md:shadow-none h-full
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${isCollapsed ? "w-20" : "w-64"}
         
        `}
      >
      

        {/* Logo Area */}
        <div 
          className={`h-16 flex items-center mt-3 transition-all duration-300 overflow-hidden whitespace-nowrap shrink-0 ${
            isCollapsed ? "justify-center px-0" : "px-6"
          }`}
        >
          {/* OPTION 1: Show Icon ONLY when collapsed (Mini Mode) */}
          {isCollapsed && (
            <i className="fa-solid fa-k text-2xl font-bold"></i>
          )}

          {/* OPTION 2: Show Text ONLY when expanded (Full Mode) */}
          {!isCollapsed && (
            <span className="tracking-wide opacity-100 transition-opacity duration-300 band-logo">
              <img src="/images/logo.png" alt="Karixa" className="" />
            </span>
          )}
        </div>

        

        {/* Scrollable Nav */}
        <div className="flex-1 overflow-y-auto py-4 space-y-1 overflow-x-hidden no-scrollbar pl-2">
         {/* Dashboard Link */}
          <Link 
            href="/" 
            className={`flex items-center px-6 py-3 transition-all group ${isCollapsed ? "justify-center" : ""} ${
              pathname === "/" 
                ? "bg-white/10 border-r-4 border-white text-white rounded-lg" // Active Style
                : "text-blue-100 hover:bg-white/10 hover:text-white border-r-4 border-transparent rounded-lg" // Inactive Style
            }`}
          >
            <i className="fa-solid fa-table-columns w-6 text-center text-lg"></i>
            {!isCollapsed && <span className="ml-3 font-medium whitespace-nowrap">Dashboard</span>}
          </Link>

          {/* Notification Link */}
          <Link 
            href="/notification" 
            className={`flex items-center px-6 py-3  relative ${isCollapsed ? "justify-center" : ""} ${
              pathname === "/notification" 
                ? "bg-white/10 border-r-4 border-white text-white rounded-lg" // Active Style
                : "text-blue-100 hover:bg-white/10 hover:text-white border-r-4 border-transparent rounded-lg" // Inactive Style
            }`}
          >
            <div className="relative">
              <i className="fa-regular fa-bell w-6 text-center text-lg"></i>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] h-4 w-4 flex items-center justify-center rounded-full md:hidden">13</span>
            </div>
            {!isCollapsed && (
              <>
                <span className="ml-3 whitespace-nowrap">Notification</span>
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">13</span>
              </>
            )}
          </Link>
          {/* Message */}
          <a href="#" className={`flex items-center rounded-lg px-6 py-3 text-blue-100 hover:bg-white/10 hover:text-white transition-all group ${isCollapsed ? "justify-center" : ""}`}>
            <i className="fa-regular fa-message w-6 text-center text-lg"></i>
            {!isCollapsed && <span className="ml-3 whitespace-nowrap">Message</span>}
          </a>

          {/* Group Label */}
          {!isCollapsed && <div className="pt-4 pb-2 text-xs font-semibold text-blue-200 uppercase tracking-wider px-6 truncate">Manage</div>}

          {/* Client */}
          <a href="#" className={`flex items-center rounded-lg px-6 py-3 text-blue-100 hover:bg-white/10 hover:text-white transition-all group ${isCollapsed ? "justify-center" : ""}`}>
            <i className="fa-regular fa-user w-6 text-center text-lg"></i>
            {!isCollapsed && <span className="ml-3 whitespace-nowrap">Client</span>}
          </a>

          {/* Employees */}
          <a href="#" className={`flex items-center rounded-lg px-6 py-3 text-blue-100 hover:bg-white/10 hover:text-white transition-all group ${isCollapsed ? "justify-center" : ""}`}>
            <i className="fa-solid fa-users w-6 text-center text-lg"></i>
            {!isCollapsed && <span className="ml-3 whitespace-nowrap">Employees</span>}
          </a>

          {/* Caregiver */}
          <a href="#" className={`flex items-center rounded-lg px-6 py-3 text-blue-100 hover:bg-white/10 hover:text-white transition-all group ${isCollapsed ? "justify-center" : ""}`}>
            <i className="fa-solid fa-user-nurse w-6 text-center text-lg"></i>
            {!isCollapsed && <span className="ml-3 whitespace-nowrap">Caregiver</span>}
          </a>

          {/* Schedule */}
          <a href="#" className={`flex items-center rounded-lg px-6 py-3 text-blue-100 hover:bg-white/10 hover:text-white transition-all group ${isCollapsed ? "justify-center" : ""}`}>
            <i className="fa-regular fa-calendar w-6 text-center text-lg"></i>
            {!isCollapsed && <span className="ml-3 whitespace-nowrap">Schedule</span>}
          </a>

          {/* Group Label */}
          {!isCollapsed && <div className="pt-4 pb-2 text-xs font-semibold text-blue-200 uppercase tracking-wider px-6 truncate">Data Analysis</div>}

          {/* Billing / Payroll Dropdown */}
          <div className="relative">
            <button 
              onClick={toggleBillingMenu}
              className={`w-full flex items-center rounded-lg px-6 py-3 text-blue-100 hover:bg-white/10 hover:text-white transition-all group focus:outline-none ${isCollapsed ? "justify-center" : ""}`}
            >
              <i className="fa-solid fa-file-invoice-dollar w-6 text-center text-lg"></i>
              {!isCollapsed && (
                <>
                  <span className="ml-3 whitespace-nowrap">Billing / Payroll</span>
                  <i className={`fa-solid fa-chevron-down ml-auto text-xs opacity-70 transition-transform duration-300 ${isBillingOpen ? "rotate-180" : ""}`}></i>
                </>
              )}
            </button>

            {/* Submenu */}
            {!isCollapsed && (
               <div className={`bg-black/10 transition-all duration-300 overflow-hidden ${isBillingOpen ? "max-h-40" : "max-h-0"}`}>
                  <a href="#" className="flex items-center px-6 py-2 pl-14 text-sm text-blue-100 hover:text-white hover:bg-white/5 transition-all">
                    <span className="opacity-90">Invoices</span>
                  </a>
                  <a href="#" className="flex items-center px-6 py-2 pl-14 text-sm text-blue-100 hover:text-white hover:bg-white/5 transition-all">
                    <span className="opacity-90">Payroll Run</span>
                  </a>
                  <a href="#" className="flex items-center px-6 py-2 pl-14 text-sm text-blue-100 hover:text-white hover:bg-white/5 transition-all">
                    <span className="opacity-90">Tax Documents</span>
                  </a>
               </div>
            )}
          </div>

          {/* Reports */}
          <a href="#" className={`flex items-center rounded-lg px-6 py-3 text-blue-100 hover:bg-white/10 hover:text-white transition-all group ${isCollapsed ? "justify-center" : ""}`}>
            <i className="fa-regular fa-file-lines w-6 text-center text-lg"></i>
            {!isCollapsed && <span className="ml-3 whitespace-nowrap">Reports</span>}
          </a>
        </div>

        {/* Footer Profile */}
        <div className="p-4 border-t border-white/10 whitespace-nowrap overflow-hidden shrink-0">
          <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}>
            <img src="/images/manoj.jpg" alt="User" className="w-9 h-9 rounded-full border-2 border-white/30 flex-shrink-0" />
            {!isCollapsed && (
              <div className="flex-1 min-w-0 transition-opacity duration-300">
                <p className="text-sm font-medium truncate">Manoj Sah</p>
                <p className="text-xs text-blue-200 truncate">manoj@karixa.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative w-full bg-brand p-2 ">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 flex-shrink-0 rounded-t-lg">
          <div className="flex items-center gap-4">
            
            {/* Toggle Button */}
            <button
              onClick={() => {
                // Check if mobile via width (or just toggle both logic, standard Tailwind handles visibility)
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
            <div className="hidden sm:flex items-center text-gray-400 bg-gray-50 rounded-lg px-3 py-2 border border-transparent focus-within:border-brand focus-within:bg-white transition-all">
              <i className="fa-solid fa-magnifying-glass mr-2"></i>
              <input type="text" placeholder="Search..." className="bg-transparent border-none focus:ring-0 text-sm w-48 lg:w-64 placeholder-gray-400 outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right mr-2">
              <p className="text-xs text-gray-500 font-medium">26 November, 2025 | 01:53 PM</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 relative p-2">
              <i className="fa-regular fa-bell text-xl"></i>
              <span className="absolute top-1 right-2 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>
            </button>
            <img src="/images/manoj.jpg" alt="Profile" className="h-8 w-8 rounded-full md:hidden" />
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