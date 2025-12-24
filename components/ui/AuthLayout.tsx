"use client";

import DashboardPreview from "@/components/ui/DashboardPreview";
import AuthFooter from "@/components/ui/AuthFooter";
import Logo from "@/components/ui/Logo";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex bg-white font-sans">
      
      {/* ================= LEFT SECTION (Reused from Sign In) ================= */}
      {/* Hidden on mobile (lg:flex) */}
 <div className="hidden lg:flex w-1/2 bg-white p-3 relative overflow-hidden flex-col justify-between  text-white">
         
        
         {/* Dashboard Preview Image */}       
          <DashboardPreview />
         
       </div>

      {/* ================= RIGHT SECTION (Forgot Password Form) ================= */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 md:p-8 lg:p-10 h-screen overflow-y-auto">
        
        {/* 1. Logo Area */}
        <Logo />

      {/* Main Form Content */}
        <div className="w-full max-w-md mx-auto space-y-8 flex-1 flex flex-col justify-center">
          {children}
        </div>

        {/* 3. Footer Links */}
    <AuthFooter />

      </div>
    </div>
  );
}