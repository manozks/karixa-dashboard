"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/ui/AuthLayout";
import InputField from "@/components/ui/InputField";
import PhoneInput from "@/components/ui/PhoneInput"; // Import the new component
import Button from "@/components/ui/Button";

export default function SignUpPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API registration
    console.log("Registering user...");
    // Redirect to sign in page on success
    router.push("/signin");
  };

  return (
    // AuthLayout handles the left banner, logo, and footer placement
    <AuthLayout>
      
      {/* Header Section */}
      {/* Note: Following image text "Welcome Back" exactly, though unusual for sign up */}
      <div className="text-center lg:text-left space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
        <p className="text-gray-500 text-sm">Enter your email and password to access your account</p>
      </div>

      {/* Form Fields - Using slightly tighter spacing (space-y-5) to fit 5 fields comfortably */}
      <form className="space-y-5 mt-6" onSubmit={handleSubmit}>
        
        {/* Full Name */}
        <InputField 
            label="Full Name" 
            placeholder="Enter your name" 
            type="text"
        />

        {/* Email Address */}
        <InputField 
            label="Email Address" 
            placeholder="Enter your email" 
            type="email"
        />

        {/* Phone Number using new specialized component */}
        <PhoneInput 
            label="Phone"
        />

        {/* Password */}
        <InputField 
            label="Password" 
            placeholder="*****************" 
            isPassword={true} 
        />

        {/* Confirm Password */}
        <InputField 
            label="Confirm Password" 
            placeholder="*****************" 
            isPassword={true} 
        />

        {/* Sign Up Button */}
        {/* Added extra margin top for visual separation */}
        <Button type="submit" className="mt-2">Sign up</Button>

        {/* Login Link Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
            Have an account? <Link href="/signin" className="font-semibold text-gray-800 hover:text-brand">Login</Link>
        </p>

      </form>
    </AuthLayout>
  );
}