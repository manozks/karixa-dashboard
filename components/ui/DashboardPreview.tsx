"use client";

import { useState } from "react";

interface DashboardPreviewProps {
  imageSrc?: string; // Optional: Pass a different image if needed
}

export default function DashboardPreview({ imageSrc = "/images/dashboard-preview.png" }: DashboardPreviewProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="hidden lg:flex w-full rounded-t-xl overflow-hidden">
      {!hasError ? (
        <img
          src={imageSrc}
          alt="Dashboard Preview"
          className="w-full h-auto object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        // Fallback if image fails to load
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
          Dashboard Image Placeholder
        </div>
      )}
    </div>
  );
}