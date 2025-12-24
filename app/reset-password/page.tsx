"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom"; // <--- Import this
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/ui/AuthLayout";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure we only render the portal on the client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Resetting password...");
    setShowSuccess(true);
  };

  return (
    <AuthLayout>
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">Create New Password</h2>
        <p className="text-gray-500 text-sm">
          Your new password must be different from previous <br /> used password.
        </p>
      </div>

      {/* Form Fields */}
      <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
        <InputField 
            label="New Password" 
            placeholder="*****************" 
            isPassword={true} 
        />
        <InputField 
            label="Confirm Password" 
            placeholder="*****************" 
            isPassword={true} 
        />
        <Button type="submit">Reset Password</Button>
      </form>

      {/* ================= SUCCESS MODAL POPUP (Using Portal) ================= */}
      {showSuccess && mounted && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm transition-opacity animate-fade-in">
          
          <div className="bg-white relative rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl transform transition-all scale-100 animate-slide-up">
            
            {/* Close Icon (Top Right) */}
            <button 
              onClick={() => setShowSuccess(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
               <i className="fa-solid fa-xmark text-lg"></i>
            </button>

            {/* Diamond Icon with Glow Animation */}
            <div className="flex justify-center mb-6 mt-2 relative">
                 {/* Outer Glow Ring */}
                 <div className="w-16 h-16 border-2 border-[#0084C7]/30 rounded-2xl rotate-45 absolute shadow-[0_0_30px_rgba(0,132,199,0.4)] animate-pulse"></div>
                 
                 {/* Inner Icon */}
                 <div className="w-16 h-16 rounded-2xl rotate-45 flex items-center justify-center relative z-10 bg-white">
                    <div className="w-8 h-8 border-2 border-[#003B5C] rounded-lg"></div>
                 </div>
            </div>

            {/* Content */}
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Successful password reset!
            </h3>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              You can now use your new password to login in to your account!
            </p>

            {/* Login Button */}
            <button 
              onClick={() => router.push("/signin")}
              className="w-full bg-[#1e293b] hover:bg-[#0f172a] text-white font-medium py-3.5 rounded-xl transition-colors shadow-lg shadow-gray-200"
            >
              Login
            </button>
            
          </div>
        </div>,
        document.body // <--- This forces the modal to attach to the body tag, fixing the gap issue
      )}

    </AuthLayout>
  );
}