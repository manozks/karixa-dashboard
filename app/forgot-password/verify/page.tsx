"use client";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/ui/AuthLayout";
import OtpInput from "@/components/ui/OtpInput";
import Button from "@/components/ui/Button";

export default function VerifyOtpPage() {
  const router = useRouter(); // <--- 2. Initialize router

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    
    // Add your verification logic here (e.g., API call)
    console.log("Verifying code...");

    // 3. Redirect to the next page (e.g., Reset Password or Dashboard)
    router.push("/reset-password"); 
  };

  return (
    <AuthLayout>
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">Verifiy your email address</h2>
        <p className="text-gray-500 text-sm">
          Enter the verification code we sent to <br /> mobile no or email address
        </p>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-6 mt-8">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600 block text-center">
            Enter Code
          </label>
          <OtpInput />
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 font-medium">02-00</span>
          <button type="button" className="font-semibold text-[#0084C7] hover:underline">
            Re-send Code
          </button>
        </div>

        {/* The button triggers the form's onSubmit */}
        <Button type="submit">Verify & Continue</Button>
      </form>
    </AuthLayout>
  );
}