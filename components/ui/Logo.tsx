import Link from "next/link";

export default function Logo() {
  return (
       <div className="flex justify-start">
            <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-brand transition-colors"> <img src="/images/logo.png" alt="Karixa" className="h-[77px] w-auto" /></Link>
        </div>
  );
}