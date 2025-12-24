"use client";

import Link from "next/link";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import AuthLayout from "@/components/ui/AuthLayout"; 

export default function SignInPage() {
  return (
     <AuthLayout>

        {/* Header */}
            <div className="text-center lg:text-left space-y-2 mt-12">
                <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
                <p className="text-gray-500 text-sm">Enter your email and password to access your account</p>
            </div>

            {/* Form Fields */}
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                
                <InputField 
                    label="Username or Email" 
                    placeholder="Enter your email" 
                    type="email"
                />

                <InputField 
                    label="Password" 
                    placeholder="*****************" 
                    isPassword={true} 
                />

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#003B5C] focus:ring-[#003B5C]" />
                        <span className="text-sm text-gray-500 group-hover:text-gray-700">Remember Me</span>
                    </label>
                    <Link href="/forgot-password" className="text-sm text-brand font-medium hover:underline">
                        Forgot Password?
                    </Link>
                </div>

                {/* Submit Button */}
                <Button type="submit">Sign In</Button>

                {/* No Account Link */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have account? <Link href="/signup" className="font-semibold text-gray-800 hover:text-brand">Sign Up</Link>
                </p>

            </form>

     </AuthLayout>
  
  );
}