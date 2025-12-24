"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/ui/AuthLayout";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";  

export default function ForgotPasswordPage() {
  const router = useRouter(); // <--- 2. Initialize router

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add logic here to actually send the pin (API call)
    console.log("Sending pin code...");

    // 3. Navigate to the verification page
    router.push("/forgot-password/verify"); 
  };

  return (
    <AuthLayout>
   
      {/* Header */}
            <div className="text-center lg:text-left space-y-2">
                <h2 className="text-3xl font-bold text-gray-800">Forgot Password</h2>
                <p className="text-gray-500 text-sm">Enter your email or mobile number we'll send you a pin code.</p>
            </div>

            {/* Form Fields */}
            <form className="space-y-6" onSubmit={handleSubmit}>
                
                <InputField 
                    label="Email Address / Mobile Number" 
                    placeholder="Enter your email or number" 
                    type="text"
                />

                {/* Submit Button */}
                <Button type="button" onClick={() => router.push("/forgot-password/verify")}>Send Pin Code</Button>

                {/* Back to Sign In Link */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Back to Sign In <Link href="/signin" className="font-semibold text-gray-800 hover:text-brand">Contact your admin</Link>
                </p>

            </form>



                 </AuthLayout>
  );
}