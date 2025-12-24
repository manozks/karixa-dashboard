"use client";

import Link from "next/link";

interface AuthFooterProps {
  className?: string;
}

export default function AuthFooter({ className = "" }: AuthFooterProps) {
  return (
    <div className={`flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 mt-8 gap-4 ${className}`}>
      <div className="flex gap-6">
        <Link href="#" className="hover:text-gray-600 transition-colors">
          Help & Support
        </Link>
        <Link href="#" className="hover:text-gray-600 transition-colors">
          Terms & Conditions
        </Link>
      </div>
      <p>Copyright@2025 karixa</p>
    </div>
  );
}