"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MultiSelectDropdown from "@/components/MultiSelectDropdown";

export default function EmployeePage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<{name: string, phone: string} | null>(null);
  
  // --- SORTING STATE ---
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // Mock Data
  const employees = [
    { id: "CN-10001", name: "Olivia Thompson", phone: "(202) 555-0101", shift: "8:30 AM | 7:00 PM", date: "Feb 01, 2023", status: "Active", img: 1 },
    { id: "CN-10002", name: "Alexander Smith", phone: "(202) 555-0102", shift: "10:00 AM | 5:30 PM", date: "Feb 01, 2023", status: "Active", img: 2 },
    { id: "CN-10003", name: "Amelia Robinson", phone: "(202) 555-0103", shift: "8:15 AM | 7:45 PM", date: "Feb 01, 2023", status: "Active", img: 3 },
    { id: "CN-10004", name: "Liam Harris", phone: "(202) 555-0104", shift: "7:45 AM | 6:15 PM", date: "Feb 01, 2023", status: "Active", img: 4 },
    { id: "CN-10005", name: "Charlotte White", phone: "(202) 555-0105", shift: "11:00 AM | 4:45 PM", date: "Feb 01, 2023", status: "Active", img: 5 },
  ];

  // --- SORTING LOGIC ---
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedEmployees = [...employees].sort((a: any, b: any) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const getSortIcon = (key: string) => {
    if (sortConfig?.key !== key) return <i className="fa-solid fa-sort text-gray-300 text-[10px]"></i>;
    return sortConfig.direction === 'asc' 
      ? <i className="fa-solid fa-sort-up text-[#0074D9] text-[10px]"></i> 
      : <i className="fa-solid fa-sort-down text-[#0074D9] text-[10px]"></i>;
  };

  // --- SMS HANDLER ---
  const handlePhoneClick = (emp: any) => {
    setSelectedEmployee({ name: emp.name, phone: emp.phone });
    setShowSmsModal(true);
  };

  return (
    <DashboardLayout>
      <div className="p-0 space-y-6">
        
        {/* Header */}
        <div>
           <h1 className="text-2xl font-bold text-gray-800">Employee</h1>
           <div className="text-sm text-gray-500">Dashboard / Employee</div>
        </div>

        {/* Controls */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
           {/* Filters */}
           <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <div className="relative">
               <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
               <input type="text" placeholder="Search..." className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand w-64" />
            </div>
            <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none cursor-pointer"><option>Status</option><option>Active</option></select>
            <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none cursor-pointer"><option>Supervisor</option></select>
            <button className="text-sm text-gray-400 hover:text-gray-600 border-l border-gray-200 pl-4 ml-2">| Clear Filter</button>
          </div>
           <button onClick={() => setShowAddModal(true)} className="px-5 py-2 text-sm font-medium text-white bg-[#0074D9] rounded-lg hover:bg-[#0062b8] transition-colors shadow-sm">Add Employee</button>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-visible shadow-sm">
           <div className="overflow-visible"> 
              <table className="w-full text-left text-sm">
                 <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold border-b border-gray-100">
                    <tr>
                       <th className="p-4 w-12"><input type="checkbox" className="rounded" /></th>
                       
                       <th className="p-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('id')}>
                          <div className="flex items-center gap-2">ID Number {getSortIcon('id')}</div>
                       </th>
                       <th className="p-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('name')}>
                          <div className="flex items-center gap-2">Name {getSortIcon('name')}</div>
                       </th>
                       <th className="p-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('phone')}>
                          <div className="flex items-center gap-2">Phone {getSortIcon('phone')}</div>
                       </th>
                       <th className="p-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('shift')}>
                          <div className="flex items-center gap-2">Schedule Shift {getSortIcon('shift')}</div>
                       </th>
                       <th className="p-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('date')}>
                          <div className="flex items-center gap-2">Reg. Date {getSortIcon('date')}</div>
                       </th>
                       <th className="p-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('status')}>
                          <div className="flex items-center gap-2">Status {getSortIcon('status')}</div>
                       </th>
                       <th className="p-4 text-right">Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {sortedEmployees.map((emp) => (
                       <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors group relative z-0 hover:z-20">
                          <td className="p-4"><input type="checkbox" className="rounded" /></td>
                          <td className="p-4 text-gray-600">{emp.id}</td>
                          <td className="p-4">
                             <Link href={`/employees/${emp.id}`} className="flex items-center gap-3 cursor-pointer hover:text-[#0074D9] transition-colors">
                                <img src={`https://i.pravatar.cc/150?img=${emp.img}`} alt={emp.name} className="w-8 h-8 rounded-full object-cover" />
                                <span className="font-medium text-gray-800">{emp.name}</span>
                             </Link>
                          </td>
                          
                          {/* Phone (Clickable for SMS) */}
                          <td className="p-4">
                             <button 
                                onClick={(e) => { e.stopPropagation(); handlePhoneClick(emp); }} 
                                className="text-gray-600 hover:text-[#0074D9] hover:underline flex items-center gap-2 group/phone"
                             >
                                {emp.phone}
                                <i className="fa-regular fa-comment-dots text-xs text-[#0074D9] opacity-0 group-hover/phone:opacity-100 transition-opacity"></i>
                             </button>
                          </td>

                          <td className="p-4 text-gray-800 font-medium">{emp.shift}</td>
                          <td className="p-4 text-gray-600">{emp.date}</td>
                          <td className="p-4"><span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">{emp.status}</span></td>
                          
                          {/* Actions with Tooltips */}
                          <td className="p-4 text-right overflow-visible">
                             <div className="flex justify-end gap-2">
                                <Link href={`/employees/${emp.id}`}>
                                   <button className="relative group/tooltip w-8 h-8 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 flex items-center justify-center transition-colors">
                                      <i className="fa-regular fa-eye text-xs"></i>
                                      <div className="absolute bottom-full right-0 mb-2 hidden group-hover/tooltip:block w-max px-2 py-1 bg-gray-800 text-white text-[10px] rounded shadow-lg z-50 whitespace-nowrap font-normal">
                                         Employee Profile
                                         <div className="absolute top-full right-3 border-4 border-transparent border-t-gray-800"></div>
                                      </div>
                                   </button>
                                </Link>
                                <button className="relative group/tooltip w-8 h-8 rounded-full bg-yellow-50 text-yellow-600 hover:bg-yellow-100 flex items-center justify-center transition-colors">
                                   <i className="fa-regular fa-calendar text-xs"></i>
                                </button>
                                <button className="relative group/tooltip w-8 h-8 rounded-full bg-green-50 text-green-600 hover:bg-green-100 flex items-center justify-center transition-colors">
                                   <i className="fa-solid fa-dollar-sign text-xs"></i>
                                </button>
                                <button className="relative group/tooltip w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors">
                                   <i className="fa-regular fa-trash-can text-xs"></i>
                                </button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           {/* Pagination Footer */}
           <div className="p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
              <span>Showing 1 to 10 of 1000 Results</span>
              <div className="flex gap-2"><button className="hover:text-brand">Previous</button><button className="text-brand font-medium">Next</button></div>
           </div>
        </div>

        {/* --- MODALS --- */}
        {showAddModal && <AddEmployeeModal onClose={() => setShowAddModal(false)} />}
        {showSmsModal && selectedEmployee && (
           <SmsModal recipient={selectedEmployee} onClose={() => setShowSmsModal(false)} />
        )}

      </div>
    </DashboardLayout>
  );
}

// =========================================================================
// SMS MODAL
// =========================================================================
function SmsModal({ recipient, onClose }: { recipient: { name: string, phone: string }, onClose: () => void }) {
   const [mounted, setMounted] = useState(false);
   useEffect(() => { setMounted(true); document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "unset"; }; }, []);
   if (!mounted) return null;

   return createPortal(
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
         <div className="bg-white rounded-xl w-full max-w-md shadow-2xl animate-scale-up relative overflow-hidden">
            <div className="bg-[#0074D9] p-4 flex justify-between items-center">
               <h3 className="text-white font-bold flex items-center gap-2"><i className="fa-regular fa-comment-dots"></i> Send Message</h3>
               <button onClick={onClose} className="text-white/80 hover:text-white"><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="p-6 space-y-4">
               <div>
                  <label className="text-xs text-gray-500 font-medium block mb-1">To</label>
                  <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
                     <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">{recipient.name.charAt(0)}</div>
                     <div>
                        <p className="text-sm font-bold text-gray-800">{recipient.name}</p>
                        <p className="text-xs text-gray-500">{recipient.phone}</p>
                     </div>
                  </div>
               </div>
               <div>
                  <label className="text-xs text-gray-500 font-medium block mb-1">Message</label>
                  <textarea className="w-full border border-gray-200 rounded-lg p-3 text-sm h-32 resize-none focus:border-[#0074D9] outline-none placeholder:text-gray-400" placeholder="Type your message here..."></textarea>
               </div>
               <button onClick={onClose} className="w-full bg-[#0074D9] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#0062b8] transition-colors shadow-lg">Send Message</button>
            </div>
         </div>
      </div>, document.body
   );
}

// =========================================================================
// HELPER COMPONENTS (For Add Employee Modal)
// =========================================================================

function Accordion({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white mb-4 shadow-sm animate-fade-in">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <h3 className="font-bold text-gray-800 text-sm">{title}</h3>
        <i className={`fa-solid fa-chevron-down text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100 p-6 border-t border-gray-100' : 'max-h-0 opacity-0 p-0 overflow-hidden'}`}>
        {children}
      </div>
    </div>
  );
}

function InputField({ label, placeholder, type = "text" }: any) {
  return (
    <div className="space-y-1 w-full">
      <label className="text-xs font-medium text-gray-700">{label}</label>
      <input type={type} placeholder={placeholder} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#0074D9]" />
    </div>
  );
}

function SelectInput({ label, options }: any) {
  return (
    <div className="space-y-1 w-full">
      <label className="text-xs font-medium text-gray-700">{label}</label>
      <select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white text-gray-600 outline-none focus:border-[#0074D9]">
        <option>Select</option>
        {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function DateInput({ label }: any) {
  return (
    <div className="space-y-1 w-full">
      <label className="text-xs font-medium text-gray-700">{label}</label>
      <input type="date" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#0074D9] text-gray-600" />
    </div>
  );
}

function RadioGroup({ label, options, name }: { label: string, options: string[], name: string }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-gray-700">{label}</label>
      <div className="flex flex-wrap gap-4">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name={name} className="w-4 h-4 text-[#0074D9] focus:ring-[#0074D9] border-gray-300" />
            <span className="text-sm text-gray-600">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function StepIndicator({ num, label, sub, current }: any) {
   const active = current >= num;
   return (
      <div className={`flex items-center gap-3 transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-50'}`}>
         <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ${current === num ? 'bg-[#0074D9] text-white' : 'bg-blue-100 text-[#0074D9]'}`}>{num}</div>
         <div className="text-left hidden md:block">
            <p className={`text-sm font-bold ${current === num ? 'text-[#0074D9]' : 'text-gray-500'}`}>{label}</p>
            <p className="text-[10px] text-gray-400 font-medium">{sub}</p>
         </div>
      </div>
   )
}

// =========================================================================
// MAIN ADD EMPLOYEE MODAL (UPDATED)
// =========================================================================

function AddEmployeeModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "unset"; }; }, []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-6xl shadow-2xl flex flex-col max-h-[95vh] animate-slide-up relative">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 bg-white rounded-t-2xl z-10">
             <div className="flex justify-between items-center mb-2">
                <button onClick={onClose} className="text-xs font-medium text-gray-500 hover:text-gray-800 flex items-center gap-1 transition-colors">
                  <i className="fa-solid fa-chevron-left text-[10px]"></i> Cancel
                </button>
                <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                  <i className="fa-solid fa-xmark text-xl text-gray-400"></i>
                </button>
             </div>
             <h2 className="text-2xl font-bold text-gray-800">Add New Employee</h2>
             <p className="text-sm text-gray-500">Create a new internal employee record.</p>
          </div>

          {/* Stepper */}
          <div className="bg-blue-50/50 py-5 border-b border-gray-100 flex justify-center sticky top-0 z-10">
             <div className="flex items-center gap-6 md:gap-12">
                <StepIndicator num={1} label="Identity" sub="Personal Details" current={step} />
                <div className="hidden md:block w-12 h-px bg-gray-300"></div>
                <StepIndicator num={2} label="Employment" sub="Role & Status" current={step} />
                <div className="hidden md:block w-12 h-px bg-gray-300"></div>
                <StepIndicator num={3} label="Access" sub="System & Notes" current={step} />
             </div>
          </div>

          {/* Form Content */}
          <div className="p-8 overflow-y-auto flex-1 custom-scrollbar bg-gray-50/30">
             
             {/* Step 1 */}
             {step === 1 && (
                <div className="animate-slide-up space-y-4">
                   <Accordion title="Basic Information" defaultOpen={true}>
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                          <SelectInput label="Title" options={["Mr.", "Mrs.", "Ms.", "Miss", "Dr."]} />
                          <InputField label="First Name*" placeholder="Jane" />
                          <InputField label="Middle Name" placeholder="Marie" />
                          <InputField label="Last Name*" placeholder="Doe" />
                          <SelectInput label="Suffix" options={["Jr.", "Sr.", "II", "III"]} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <SelectInput label="Gender*" options={["Male", "Female", "Other"]} />
                          <DateInput label="Date of Birth*" />
                          <SelectInput label="Marital Status" options={["Single", "Married", "Divorced"]} />
                          <InputField label="SSN* (Masked)" placeholder="XXX-XX-XXXX" />
                      </div>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                           <SelectInput label="Primary Language" options={["English", "Mandarin", "Hindi", "Spanish", "French", "Modern Standard Arabic", "Portuguese", "Russian", "Bengali", "Urdu", "German", "Italian", "Japanese", "Nigerian Pidgin"]} />
                           <SelectInput label="Secondary Language" options={["English", "Mandarin", "Hindi", "Spanish", "French", "Modern Standard Arabic", "Portuguese", "Russian", "Bengali", "Urdu", "German", "Italian", "Japanese", "Nigerian Pidgin"]} />
                           <SelectInput label="Race" options={["Asian", "American indian", "African American or Black", "Hispanic or Latino", "White or Caucasian", "European American", "Multiracial", "Native Hawaiian",  "Pacific Islander", "Unknown"]} />
                      </div>
                   </Accordion>
                   <Accordion title="Contact Information">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <InputField label="Mobile Phone*" placeholder="(555) 000-0000" />
                          <InputField label="Home Phone" placeholder="(555) 000-0000" />
                          <InputField label="Email*" placeholder="email@example.com" type="email" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <InputField label="Street Address 1*" placeholder="123 Main St" />
                          <InputField label="Street Address 2" placeholder="Apt, Suite" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <InputField label="City*" placeholder="Enter City" />
                          <SelectInput label="State*" options={["CA", "NY", "TX", "FL"]} />
                          <InputField label="Zip Code*" placeholder="12345" />
                          <SelectInput label="County" options={["County A", "County B"]} />
                      </div>
                   </Accordion>
                   <Accordion title="Emergency Contact">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <InputField label="Contact Name*" placeholder="Full Name" />
                          <SelectInput label="Relationship*" options={["Spouse", "Parent", "Child", "Friend"]} />
                          <InputField label="Phone Number*" placeholder="(555) 000-0000" />
                          <InputField label="Email" placeholder="contact@example.com" />
                      </div>
                   </Accordion>
                </div>
             )}

             {/* Step 2 */}
             {step === 2 && (
                <div className="animate-slide-up space-y-4">
                   <Accordion title="Role & Department" defaultOpen={true}>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <InputField label="Employee ID*" placeholder="EMP-001" />
                          <SelectInput label="Department*" options={["HR", "Billing", "Scheduling", "Clinical"]} />
                          <InputField label="Job Title*" placeholder="e.g. HR Coordinator" />
                          <SelectInput label="Supervisor*" options={["John Doe", "Jane Smith"]} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <SelectInput label="Employment Status*" options={["Active", "Onboarding", "Terminated"]} />
                          <SelectInput label="Employment Type*" options={["Full-Time", "Part-Time", "Contract"]} />
                          <SelectInput label="Work Location" options={["Main Office", "Remote"]} />
                          <InputField label="Region Code" placeholder="e.g. NA-East" />
                      </div>
                   </Accordion>
                   <Accordion title="Dates & Schedule">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <DateInput label="Hire Date*" />
                          <DateInput label="Start Date*" />
                          <DateInput label="Review Date" />
                          <DateInput label="Termination Date" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex gap-4">
                             <InputField label="Shift Start" type="time" />
                             <InputField label="Shift End" type="time" />
                          </div>
                          <SelectInput label="Time Zone" options={["EST", "CST", "PST"]} />
                      </div>
                   </Accordion>
                   <Accordion title="Compensation">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <SelectInput label="Pay Type" options={["Salary", "Hourly"]} />
                          <InputField label="Pay Rate ($)" placeholder="0.00" />
                          <SelectInput label="Pay Frequency" options={["Weekly", "Bi-Weekly"]} />
                          <InputField label="Payroll ID" placeholder="External ID" />
                      </div>
                   </Accordion>
                </div>
             )}

             {/* Step 3 */}
             {step === 3 && (
                <div className="animate-slide-up space-y-4">
                   <Accordion title="System Access" defaultOpen={true}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                          <InputField label="System Username / Email*" placeholder="jane.doe@company.com" />
                          <SelectInput label="System Role*" options={["Super Admin", "Manager", "View Only"]} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <RadioGroup label="Enable Portal Access" name="portal" options={["Yes", "No"]} />
                          <RadioGroup label="Two-Factor Auth" name="2fa" options={["Required", "Optional"]} />
                          <RadioGroup label="Account Status" name="accStatus" options={["Active", "Suspended"]} />
                      </div>
                   </Accordion>
                   <Accordion title="Additional Notes">
                      <div className="space-y-1">
                         <label className="text-xs font-medium text-gray-700">Internal Notes</label>
                         <textarea className="w-full border border-gray-200 rounded-lg p-3 text-sm h-32 resize-none focus:border-[#0074D9] outline-none" placeholder="Add notes..."></textarea>
                      </div>
                   </Accordion>
                </div>
             )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-2xl">
             {step > 1 && (
                <button onClick={() => setStep(prev => prev - 1)} className="px-6 py-2.5 border border-gray-200 bg-white text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Back</button>
             )}
             {step < 3 ? (
                <button onClick={() => setStep(prev => prev + 1)} className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-lg transition-all">Next Step</button>
             ) : (
                <button onClick={() => { console.log("Creating..."); onClose(); }} className="bg-[#0074D9] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-lg transition-all">Create Employee</button>
             )}
          </div>

       </div>
    </div>, document.body
  );
}