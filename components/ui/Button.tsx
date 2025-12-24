interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "outline";
}

export default function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  const baseStyles = "w-full py-3 rounded-lg font-medium text-sm transition-all duration-200 flex justify-center items-center";
  const variants = {
    primary: "bg-[#003B5C] hover:bg-[#002a42] text-white shadow-lg shadow-blue-900/20", // Dark blue from your image
    outline: "border border-gray-200 text-gray-600 hover:bg-gray-50",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}