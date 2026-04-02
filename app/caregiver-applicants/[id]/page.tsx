"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

// Mock Data (Matches your list page)
const mockApplicants = [
  { id: "APP-0142", name: "Sarah Jenkins", role: "HHA", phone: "(202) 555-0198", email: "sarah.j@email.com", experience: "3 Years", zone: "Columbus Area", appliedDate: "01 April, 2026", status: "Interviewing", img: 6, expectedPay: "$18.00/hr", availableStart: "15 April, 2026", referral: "Online Ad", notes: "Strong communication skills. Valid CPR certification.", address: "123 Main St, Columbus, OH 43215" },
  { id: "APP-0143", name: "Marcus Johnson", role: "PCA", phone: "(202) 555-0144", email: "marcus.j@email.com", experience: "1 Year", zone: "Cleveland, Northeast Ohio", appliedDate: "28 March, 2026", status: "New", img: 7, expectedPay: "$16.50/hr", availableStart: "Immediate", referral: "Employee Referral (Jane D.)", notes: "Eager to learn, available weekends.", address: "456 Lake Ave, Cleveland, OH 44114" },
  { id: "APP-0144", name: "Emily Chen", role: "CNA", phone: "(202) 555-0133", email: "emily.c@email.com", experience: "5+ Years", zone: "Cincinnati Area", appliedDate: "25 March, 2026", status: "Offer Extended", img: 8, expectedPay: "$22.00/hr", availableStart: "10 May, 2026", referral: "Temporary Staffing Agency", notes: "Excellent track record with dementia patients.", address: "789 River Rd, Cincinnati, OH 45202" },
  { id: "APP-0145", name: "David Miller", role: "RN", phone: "(202) 555-0122", email: "david.m@email.com", experience: "8 Years", zone: "Marietta , Southeast Ohio", appliedDate: "20 March, 2026", status: "Rejected", img: 9, expectedPay: "$35.00/hr", availableStart: "N/A", referral: "Other", notes: "Did not meet availability requirements.", address: "321 Oak St, Marietta, OH 45750" },
  { id: "APP-0146", name: "Jessica Taylor", role: "HHA", phone: "(202) 555-0111", email: "jessica.t@email.com", experience: "2 Years", zone: "Columbus Area", appliedDate: "15 March, 2026", status: "Background Check", img: 5, expectedPay: "$17.50/hr", availableStart: "01 May, 2026", referral: "Another Agency", notes: "Awaiting final background clearance.", address: "654 Pine Ln, Columbus, OH 43210" },
];

export default function ApplicantProfilePage() {
  const params = useParams();
  const [mounted, setMounted] = useState(false);
  const [applicant, setApplicant] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    // Find the applicant by ID from the URL. Fallback to the first one if not found for demo purposes.
    const found = mockApplicants.find(a => a.id === params.id) || mockApplicants[0];
    setApplicant(found);
  }, [params.id]);

  if (!mounted || !applicant) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New": return "bg-blue-50 text-blue-600 border-blue-100";
      case "Interviewing": return "bg-purple-50 text-purple-600 border-purple-100";
      case "Offer Extended": return "bg-green-50 text-green-600 border-green-100";
      case "Background Check": return "bg-yellow-50 text-yellow-600 border-yellow-100";
      case "Rejected": return "bg-red-50 text-red-600 border-red-100";
      default: return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-gray-50/50 p-0 pb-20">
        
        {/* Header Section */}
        <div className="mb-6 px-1 flex flex-col gap-2">
           <Link href="/caregiver-applicants" className="text-gray-500 text-sm hover:text-[#0074D9] flex items-center gap-2 w-fit transition-colors">
              <i className="fa-solid fa-arrow-left"></i> Back to Applicants
           </Link>
           <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mt-2">
              <div>
                  <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    {applicant.name} 
                    <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold border ${getStatusColor(applicant.status)}`}>
                        {applicant.status}
                    </span>
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">Applicant ID: {applicant.id} | Applied on {applicant.appliedDate}</p>
              </div>
              
              {/* Top Actions */}
              <div className="flex items-center gap-2">
                 <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <i className="fa-regular fa-envelope"></i> Message
                 </button>
                 <button className="px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors flex items-center gap-2">
                    <i className="fa-solid fa-ban"></i> Reject
                 </button>
                 <button className="px-4 py-2 bg-[#0074D9] text-white rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-sm transition-colors flex items-center gap-2">
                    <i className="fa-solid fa-arrow-right-arrow-left"></i> Update Stage
                 </button>
              </div>
           </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN: Profile Summary Card */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Quick Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center relative overflow-hidden">
                <div className="w-24 h-24 rounded-full border-4 border-gray-50 mb-4 overflow-hidden shadow-sm">
                    <img src={`https://i.pravatar.cc/150?img=${applicant.img}`} alt={applicant.name} className="w-full h-full object-cover" />
                </div>
                <h2 className="text-lg font-bold text-gray-800">{applicant.name}</h2>
                <p className="text-[#0074D9] font-medium text-sm mb-4">{applicant.role} Applicant</p>
                
                <div className="w-full flex justify-center gap-2 mb-6">
                    <button className="w-10 h-10 rounded-full bg-blue-50 text-[#0074D9] flex items-center justify-center hover:bg-blue-100 transition-colors" title="Call">
                        <i className="fa-solid fa-phone"></i>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-blue-50 text-[#0074D9] flex items-center justify-center hover:bg-blue-100 transition-colors" title="Email">
                        <i className="fa-solid fa-envelope"></i>
                    </button>
                </div>

                <div className="w-full space-y-4 text-left border-t border-gray-100 pt-4">
                    <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Phone Number</p>
                        <p className="text-sm text-gray-800">{applicant.phone}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Email Address</p>
                        <p className="text-sm text-gray-800 break-words">{applicant.email}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Address</p>
                        <p className="text-sm text-gray-800">{applicant.address}</p>
                    </div>
                </div>
            </div>

            {/* Documents Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-800 text-sm">Applicant Files</h3>
                    <button className="text-xs text-[#0074D9] hover:underline">Upload</button>
                </div>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer">
                        <div className="flex items-center gap-3">
                            <i className="fa-regular fa-file-pdf text-red-500 text-lg"></i>
                            <div>
                                <p className="text-xs font-medium text-gray-800">Resume.pdf</p>
                                <p className="text-[10px] text-gray-400">1.2 MB</p>
                            </div>
                        </div>
                        <button className="text-gray-400 hover:text-[#0074D9]"><i className="fa-solid fa-download"></i></button>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer">
                        <div className="flex items-center gap-3">
                            <i className="fa-regular fa-file-word text-blue-500 text-lg"></i>
                            <div>
                                <p className="text-xs font-medium text-gray-800">Cover_Letter.docx</p>
                                <p className="text-[10px] text-gray-400">450 KB</p>
                            </div>
                        </div>
                        <button className="text-gray-400 hover:text-[#0074D9]"><i className="fa-solid fa-download"></i></button>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer">
                        <div className="flex items-center gap-3">
                            <i className="fa-solid fa-certificate text-yellow-500 text-lg"></i>
                            <div>
                                <p className="text-xs font-medium text-gray-800">CPR_Cert_2026.jpg</p>
                                <p className="text-[10px] text-gray-400">2.1 MB</p>
                            </div>
                        </div>
                        <button className="text-gray-400 hover:text-[#0074D9]"><i className="fa-solid fa-download"></i></button>
                    </div>
                </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Details & Edit Forms */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Application Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-gray-800 text-base">Application Details</h3>
                    <Link href={`/caregiver-applicants/${applicant.id}/edit`} className="text-[#0074D9] text-sm hover:underline font-medium">Edit Details</Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                    <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Applying For</p>
                        <p className="text-sm font-medium text-gray-800">{applicant.role}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Years of Experience</p>
                        <p className="text-sm font-medium text-gray-800">{applicant.experience}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Expected Pay Rate</p>
                        <p className="text-sm font-medium text-gray-800">{applicant.expectedPay}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Referral Source</p>
                        <p className="text-sm font-medium text-gray-800">{applicant.referral}</p>
                    </div>
                </div>
            </div>

            {/* Availability Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-800 text-base mb-6">Availability & Preferences</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 mb-6">
                    <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Available to Start</p>
                        <p className="text-sm font-medium text-gray-800">{applicant.availableStart}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Preferred Zone</p>
                        <p className="text-sm font-medium text-gray-800">{applicant.zone}</p>
                    </div>
                </div>

                <div className="mb-6">
                    <p className="text-xs font-medium text-gray-500 mb-2">Days Available</p>
                    <div className="flex gap-2 flex-wrap">
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(d => (
                            <span key={d} className="px-3 py-1 bg-blue-50 border border-blue-100 text-blue-700 rounded-full text-xs font-medium">{d}</span>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="text-xs font-medium text-gray-500 mb-2">Preferred Shifts</p>
                    <div className="flex gap-2 flex-wrap">
                        <span className="px-3 py-1 bg-gray-50 border border-gray-200 text-gray-700 rounded-full text-xs font-medium">Morning</span>
                        <span className="px-3 py-1 bg-gray-50 border border-gray-200 text-gray-700 rounded-full text-xs font-medium">Evening</span>
                    </div>
                </div>
            </div>

            {/* Interviewer Notes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-800 text-base">Interviewer Notes</h3>
                    <button className="text-xs text-[#0074D9] font-medium hover:underline">Add Note</button>
                </div>
                <div className="bg-yellow-50/50 border border-yellow-100 rounded-lg p-4">
                    <p className="text-sm text-gray-700 leading-relaxed">
                        {applicant.notes}
                    </p>
                    <div className="mt-3 pt-3 border-t border-yellow-200/50 flex justify-between items-center">
                        <span className="text-[10px] font-medium text-gray-500">Added by HR Manager</span>
                        <span className="text-[10px] text-gray-400">{applicant.appliedDate}</span>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}