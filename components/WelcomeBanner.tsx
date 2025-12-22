"use client";

interface WelcomeBannerProps {
  name: string;
  subtitle?: string; // Optional subtitle
}

export default function WelcomeBanner({ 
  name, 
  subtitle = "Here is what's happening with your care center today." // Default text
}: WelcomeBannerProps) {
  
  // Optional: Dynamic greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-800">
        {getGreeting()}, {name}!
      </h1>
      <p className="text-sm text-gray-500 mt-1">
        {subtitle}
      </p>
    </div>
  );
}