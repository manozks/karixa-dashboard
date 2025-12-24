"use client";

import Link from "next/link";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import AuthFooter from "@/components/ui/AuthFooter";
import Logo from "@/components/ui/Logo";   

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen w-full flex bg-white font-sans">
      
      {/* ================= LEFT SECTION (Reused from Sign In) ================= */}
      {/* Hidden on mobile (lg:flex) */}
     <div className="hidden lg:flex w-1/2 bg-white p-3 relative overflow-hidden flex-col justify-between  text-white">
        
       
        {/* Dashboard Preview Image */}
       
             {/* Replace src with your actual dashboard screenshot asset */}
            <div className="hidden lg:flex w-full rounded-t-xl overflow-hidden">
                <img src="/images/dashboard-preview.png" // <--- PUT YOUR DASHBOARD IMAGE HERE
                    alt="Dashboard Preview" className="w-full h-auto object-cover rounded-lg"
                    // If you don't have an image yet, this placeholder mimics it:
                    onError={(e) => {
                        e.currentTarget.style.display='none';
                        e.currentTarget.parentElement!.innerHTML = '<div class="h-64 bg-gray-100 flex items-center justify-center text-gray-400 text-xs">Dashboard Image Placeholder</div>'
                    }}
                />
            </div>
        
      </div>

      {/* ================= RIGHT SECTION (Forgot Password Form) ================= */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 md:p-8 lg:p-10 h-screen overflow-y-auto">
        
        {/* 1. Logo Area */}
     <Logo />

        {/* 2. Form Container */}
        <div className="w-full max-w-md mx-auto space-y-8">
            
            {/* Header */}
            <div className="text-center lg:text-left space-y-2">
                <h2 className="text-3xl font-bold text-gray-800">Forgot Password</h2>
                <p className="text-gray-500 text-sm">Enter your email or mobile number we'll send you a pin code.</p>
            </div>

            {/* Form Fields */}
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                
                <InputField 
                    label="Email Address / Mobile Number" 
                    placeholder="Enter your email or number" 
                    type="text"
                />

                {/* Submit Button */}
                <Button type="submit">Send Pin Code</Button>

                {/* Back to Sign In Link */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Back to Sign In <Link href="/signin" className="font-semibold text-gray-800 hover:text-brand">Contact your admin</Link>
                </p>

            </form>
        </div>

        {/* 3. Footer Links */}
    <AuthFooter />

      </div>
    </div>
  );
}