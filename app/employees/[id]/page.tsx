"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

export default function EmployeeProfilePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("Contacts");

  const tabs = [
    "Contacts", "Documents", "Payroll", "Complains", 
    "Performance", "Trackable Licenses", "Employment History", "Reference"
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col min-h-screen bg-gray-50/50 p-0 space-y-6 pb-20">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/employees" className="hover:text-gray-800 flex items-center gap-1"><i className="fa-solid fa-chevron-left text-xs"></i> Back</Link>
          <span className="text-gray-300">|</span>
          <span>Employee</span> / <span className="font-semibold text-gray-800">Employee Profile</span>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
           <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
              <div className="flex gap-6">
                 <img src="https://i.pravatar.cc/150?img=5" alt="Profile" className="w-20 h-20 rounded-full object-cover border-4 border-gray-50" />
                 <div>
                    <h1 className="text-xl font-bold text-gray-800">Nina Mcintire</h1>
                    <p className="text-sm text-gray-500">Caregiver, PCA • <span className="font-medium text-gray-700">$32 / per hour</span></p>
                 </div>
              </div>
              <div className="flex gap-3">
                 <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"><i className="fa-solid fa-download mr-1"></i> Edit Profile</button>
                 <button className="px-4 py-2 bg-[#0074D9] text-white rounded-lg text-sm font-medium hover:bg-[#0062b8]">Message</button>
              </div>
           </div>

           {/* Info Grid */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 text-sm border-t border-gray-100 pt-6">
              <div><span className="block text-xs text-gray-400 mb-1">Name</span><span className="font-medium text-gray-800">Nina Mcintire</span></div>
              <div><span className="block text-xs text-gray-400 mb-1">Employee ID</span><span className="font-medium text-gray-800">322</span></div>
              <div><span className="block text-xs text-gray-400 mb-1">DOB</span><span className="font-medium text-gray-800">24 Oct, 1933</span></div>
              <div><span className="block text-xs text-gray-400 mb-1">Gender</span><span className="font-medium text-gray-800">Female</span></div>
              
              <div><span className="block text-xs text-gray-400 mb-1">Social Security Number</span><span className="font-medium text-gray-800">(703) 981-7142</span></div>
              <div><span className="block text-xs text-gray-400 mb-1">Phone/Mobile</span><span className="font-medium text-gray-800">(703) 981-7142</span></div>
              <div><span className="block text-xs text-gray-400 mb-1">Email Address</span><span className="font-medium text-gray-800">nina@gmail.com</span></div>
              <div><span className="block text-xs text-gray-400 mb-1">Language Spoken</span><span className="font-medium text-gray-800">English</span></div>

              <div><span className="block text-xs text-gray-400 mb-1">Street Address</span><span className="font-medium text-gray-800">1509 Oakview Dr.</span></div>
              <div><span className="block text-xs text-gray-400 mb-1">City</span><span className="font-medium text-gray-800">McLean</span></div>
              <div><span className="block text-xs text-gray-400 mb-1">State</span><span className="font-medium text-gray-800">VA (Virginia)</span></div>
              <div><span className="block text-xs text-gray-400 mb-1">Zip Code</span><span className="font-medium text-gray-800">22101</span></div>
           </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border-b border-gray-200 rounded-t-xl shadow-sm mt-4">
           <div className="flex overflow-x-auto px-6 gap-8">
              {tabs.map((tab) => (
                 <button 
                    key={tab} 
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? 'border-[#0074D9] text-[#0074D9]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                 >
                    {tab}
                 </button>
              ))}
           </div>
        </div>

        {/* Tab Content Area */}
        <div className="bg-white rounded-b-xl shadow-sm border border-gray-100 border-t-0 p-6 min-h-[400px] client-space-mt">
           {renderTabContent(activeTab)}
        </div>

      </div>
    </DashboardLayout>
  );
}

function renderTabContent(tab: string) {
  switch (tab) {
    case "Contacts": return <ContactsTab />;
    case "Documents": return <DocumentsTab />;
    case "Complains": return <ComplainsTab />;
    case "Trackable Licenses": return <TrackableLicensesTab />;
    case "Employment History": return <EmploymentHistoryTab />;
    case "Reference": return <ReferenceTab />;
    default: return <div className="text-center py-20 text-gray-400">Content for {tab} is coming soon...</div>;
  }
}

// =========================================================================
// 1. CONTACTS TAB & MODAL
// =========================================================================
function ContactsTab() {
  const [showModal, setShowModal] = useState(false);
  const contacts = [
    { type: "Emergency Contact", phone: "5412452358", mobile: "(703)981-7142", name: "Tim Drake", relation: "Son", status: "Active" },
    { type: "Emergency Contact", phone: "5412452358", mobile: "(703)981-7142", name: "Tim Drake", relation: "Son", status: "Active" },
  ];

  return (
    <div className="animate-fade-in space-y-6">
       <div className="flex justify-between items-center">
          <div className="relative w-64"><i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i><input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand" /></div>
          <button onClick={() => setShowModal(true)} className="bg-[#0074D9] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-sm">Add Contact</button>
       </div>
       <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm"><thead className="bg-gray-50 text-gray-500 text-xs uppercase"><tr><th className="p-4 w-10"><input type="checkbox" /></th><th className="p-4">Contact Type</th><th className="p-4">Telephone</th><th className="p-4">Mobile</th><th className="p-4">Full Name</th><th className="p-4">Address</th><th className="p-4">Status</th><th className="p-4"></th></tr></thead>
             <tbody className="divide-y divide-gray-50">{contacts.map((c, i) => (<tr key={i} className="hover:bg-gray-50"><td className="p-4"><input type="checkbox" /></td><td className="p-4">{c.type}</td><td className="p-4">{c.phone}</td><td className="p-4">{c.mobile}</td><td className="p-4 font-medium">{c.name}</td><td className="p-4">N/A</td><td className="p-4"><span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs">{c.status}</span></td><td className="p-4 text-right"><button className="text-gray-400 mr-2"><i className="fa-solid fa-pen"></i></button><button className="text-red-400"><i className="fa-regular fa-trash-can"></i></button></td></tr>))}</tbody>
          </table>
       </div>
       {showModal && <CreateContactModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

function CreateContactModal({ onClose }: { onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] animate-slide-up">
          <div className="flex justify-between items-center p-6 border-b border-gray-100"><h2 className="text-xl font-bold">Create Contact</h2><button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button></div>
          <div className="p-6 overflow-y-auto space-y-4">
             <div className="grid grid-cols-2 gap-4"><div><label className="text-xs text-gray-500">First Name</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="Enter" /></div><div><label className="text-xs text-gray-500">Last Name</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="Enter" /></div></div>
             <div className="grid grid-cols-2 gap-4"><div><label className="text-xs text-gray-500">Telephone</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="Enter" /></div><div><label className="text-xs text-gray-500">Mobile</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="+61 000000000" /></div></div>
             <div className="grid grid-cols-2 gap-4"><div><label className="text-xs text-gray-500">Email Address</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="Enter" /></div><div><label className="text-xs text-gray-500">Relationship</label><select className="w-full border rounded-lg p-2 text-sm text-gray-500"><option>Select</option></select></div></div>
             <div className="grid grid-cols-2 gap-4"><div><label className="text-xs text-gray-500">Contact Type</label><select className="w-full border rounded-lg p-2 text-sm text-gray-500"><option>Select</option></select></div><div><label className="text-xs text-gray-500">Status</label><select className="w-full border rounded-lg p-2 text-sm text-gray-500"><option>Select</option></select></div></div>
             <div className="grid grid-cols-2 gap-4"><div><label className="text-xs text-gray-500">Street Address</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="Enter" /></div><div><label className="text-xs text-gray-500">City</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="Enter" /></div></div>
             <div className="grid grid-cols-2 gap-4"><div><label className="text-xs text-gray-500">State*</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="Enter" /></div><div><label className="text-xs text-gray-500">Zip Code*</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="Enter" /></div></div>
          </div>
          <div className="p-6 border-t flex justify-end gap-3"><button onClick={onClose} className="px-6 py-2 border rounded-lg text-sm">Cancel</button><button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm">Save</button></div>
       </div>
    </div>, document.body
  );
}

// =========================================================================
// 2. DOCUMENTS TAB & MODAL
// =========================================================================
function DocumentsTab() {
  const [showModal, setShowModal] = useState(false);
  const docs = [
    { name: "Ra's-Al Ghul", type: "Background Consent Form", by: "Education", date: "22 April, 2025", att: "(703)981-7142" },
    { name: "Ra's-Al Ghul", type: "Federal W-4", by: "Education", date: "23 April, 2025", att: "(703)981-7142" },
  ];

  return (
    <div className="animate-fade-in space-y-6">
       <div className="flex justify-between items-center">
          <div className="relative w-64"><i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i><input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand" /></div>
          <button onClick={() => setShowModal(true)} className="bg-[#0074D9] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-sm">Add Document</button>
       </div>
       <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm"><thead className="bg-gray-50 text-gray-500 text-xs uppercase"><tr><th className="p-4 w-10"><input type="checkbox" /></th><th className="p-4">Employee</th><th className="p-4">Document Type</th><th className="p-4">Added By</th><th className="p-4">Added on</th><th className="p-4">Attachment</th><th className="p-4 text-right"></th></tr></thead>
             <tbody className="divide-y divide-gray-50">{docs.map((d, i) => (<tr key={i} className="hover:bg-gray-50"><td className="p-4"><input type="checkbox" /></td><td className="p-4">{d.name}</td><td className="p-4">{d.type}</td><td className="p-4">{d.by}</td><td className="p-4">{d.date}</td><td className="p-4">{d.att}</td><td className="p-4 text-right"><button className="text-blue-500 hover:underline flex items-center gap-1 ml-auto"><i className="fa-solid fa-download"></i> Download</button></td></tr>))}</tbody>
          </table>
       </div>
       {showModal && <AddDocumentModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

function AddDocumentModal({ onClose }: { onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col animate-scale-up">
          <div className="flex justify-between items-center p-6 border-b border-gray-100"><h2 className="text-xl font-bold">Document</h2><button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button></div>
          <div className="p-6 space-y-4">
             <div className="space-y-1.5"><label className="text-sm font-medium text-gray-700">Document Type</label><select className="w-full border rounded-lg p-2.5 text-sm bg-white text-gray-500"><option>Select</option></select></div>
             <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50"><i className="fa-solid fa-cloud-arrow-up text-3xl text-gray-400 mb-2"></i><p className="text-xs text-gray-500">Drag and drop or click to upload file</p><p className="text-[10px] text-gray-400">pdf, word, png</p></div>
          </div>
          <div className="p-6 border-t flex justify-end gap-3"><button onClick={onClose} className="px-6 py-2 border rounded-lg text-sm">Cancel</button><button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm">Continue</button></div>
       </div>
    </div>, document.body
  );
}

// =========================================================================
// 3. COMPLAINS TAB & MODALS
// =========================================================================
function ComplainsTab() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<any>(null);

  const incidents = [
    { type: "Choking", date: "22 April, 2025 | 5:28:20 PM", status: "Approved", outcome: "Employee Terminated", client: "Adams Family" },
    { type: "Choking", date: "22 April, 2025 | 5:28:20 PM", status: "Approved", outcome: "Employee Terminated", client: "Adams Family" },
  ];

  const handleRowClick = (incident: any) => {
     setSelectedIncident(incident);
     setShowDetailModal(true);
  }

  return (
    <div className="animate-fade-in space-y-6">
       <div className="flex justify-between items-center">
          <div className="relative w-64"><i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i><input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand" /></div>
          <button onClick={() => setShowAddModal(true)} className="bg-[#0074D9] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-sm">Add Complaints</button>
       </div>
       <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm"><thead className="bg-gray-50 text-gray-500 text-xs uppercase"><tr><th className="p-4">Incident Type</th><th className="p-4">Incident Date</th><th className="p-4">Incident Status</th><th className="p-4">Incident Outcomes</th><th className="p-4">Client</th><th className="p-4 text-right"></th></tr></thead>
             <tbody className="divide-y divide-gray-50">{incidents.map((inc, i) => (<tr key={i} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleRowClick(inc)}><td className="p-4">{inc.type}</td><td className="p-4">{inc.date}</td><td className="p-4"><span className="bg-green-50 text-green-600 px-2 py-1 rounded text-xs">{inc.status}</span></td><td className="p-4">{inc.outcome}</td><td className="p-4">{inc.client}</td><td className="p-4 text-right"><div className="flex justify-end gap-2 text-gray-400"><i className="fa-regular fa-eye"></i><i className="fa-solid fa-pen"></i><i className="fa-regular fa-trash-can text-red-400"></i></div></td></tr>))}</tbody>
          </table>
       </div>
       {showAddModal && <AddComplaintModal onClose={() => setShowAddModal(false)} />}
       {showDetailModal && <ComplaintDetailModal incident={selectedIncident} onClose={() => setShowDetailModal(false)} />}
    </div>
  );
}

function AddComplaintModal({ onClose }: { onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh] animate-slide-up">
          <div className="flex justify-between items-center p-6 border-b border-gray-100"><h2 className="text-xl font-bold">Complains</h2><button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button></div>
          <div className="p-8 overflow-y-auto space-y-6">
             <div className="grid grid-cols-3 gap-6">
                <div><label className="text-xs text-gray-500 block mb-1">Incident Type</label><select className="w-full border rounded-lg p-2.5 text-sm"><option>Select</option></select></div>
                <div><label className="text-xs text-gray-500 block mb-1">Client</label><select className="w-full border rounded-lg p-2.5 text-sm"><option>Select</option></select></div>
                <div><label className="text-xs text-gray-500 block mb-1">Supervisor</label><select className="w-full border rounded-lg p-2.5 text-sm"><option>Select</option></select></div>
             </div>
             <div className="grid grid-cols-3 gap-6">
                <div><label className="text-xs text-gray-500 block mb-1">Incident Date</label><input className="w-full border rounded-lg p-2.5 text-sm" placeholder="dd/mm/yyyy" /></div>
                <div><label className="text-xs text-gray-500 block mb-1">Incident Status</label><select className="w-full border rounded-lg p-2.5 text-sm"><option>Select</option></select></div>
                <div><label className="text-xs text-gray-500 block mb-1">Incident Outcome</label><select className="w-full border rounded-lg p-2.5 text-sm"><option>Select</option></select></div>
             </div>
             <div className="grid grid-cols-3 gap-6">
                <div><label className="text-xs text-gray-500 block mb-1">Employee involved</label><select className="w-full border rounded-lg p-2.5 text-sm"><option>Select</option></select></div>
                <div><label className="text-xs text-gray-500 block mb-1">Employee Reporting</label><select className="w-full border rounded-lg p-2.5 text-sm"><option>Select</option></select></div>
                <div><label className="text-xs text-gray-500 block mb-1">Location</label><input className="w-full border rounded-lg p-2.5 text-sm" placeholder="Enter" /></div>
             </div>
             <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" /> Family Notified</label>
                <label className="flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" /> Physician Notified</label>
                <label className="flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" /> Injury</label>
             </div>
             <div className="grid grid-cols-2 gap-6">
                <div><label className="text-xs text-gray-500 block mb-1">What Happen</label><textarea className="w-full border rounded-lg p-2.5 text-sm h-24" placeholder="Start typing..."></textarea></div>
                <div><label className="text-xs text-gray-500 block mb-1">Action Taken</label><textarea className="w-full border rounded-lg p-2.5 text-sm h-24" placeholder="Start typing..."></textarea></div>
             </div>
             <div className="grid grid-cols-2 gap-6">
                <div><label className="text-xs text-gray-500 block mb-1">Super Visor Remark</label><textarea className="w-full border rounded-lg p-2.5 text-sm h-24" placeholder="Start typing..."></textarea></div>
                <div><label className="text-xs text-gray-500 block mb-1">Witness</label><textarea className="w-full border rounded-lg p-2.5 text-sm h-24" placeholder="Start typing..."></textarea></div>
             </div>
             <div className="grid grid-cols-2 gap-6">
                <div className="border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center rounded-xl"><i className="fa-solid fa-cloud-arrow-up text-gray-400 mb-2"></i><span className="text-xs text-gray-500">Employee Signature</span></div>
                <div className="border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center rounded-xl"><i className="fa-solid fa-cloud-arrow-up text-gray-400 mb-2"></i><span className="text-xs text-gray-500">Supervisor Signature</span></div>
             </div>
          </div>
          <div className="p-6 border-t flex justify-end gap-3"><button onClick={onClose} className="px-6 py-2 border rounded-lg text-sm">Cancel</button><button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm">Save Incident Report</button></div>
       </div>
    </div>, document.body
  );
}

function ComplaintDetailModal({ incident, onClose }: { incident: any, onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl flex flex-col max-h-[90vh] animate-slide-up">
          <div className="flex justify-between items-center p-6 border-b border-gray-100"><h2 className="text-xl font-bold">Complains</h2><button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button></div>
          <div className="p-8 overflow-y-auto grid grid-cols-2 gap-6">
             <div className="space-y-4">
                <div><span className="block text-xs text-gray-400">Employee Involved:</span><span className="text-sm font-medium">Ra's Al Ghul</span></div>
                <div><span className="block text-xs text-gray-400">Supervisor:</span><span className="text-sm font-medium">Abigal Jones</span></div>
                <div><span className="block text-xs text-gray-400">Physician Notified:</span><span className="text-sm font-medium bg-gray-100 px-2 py-0.5 rounded">False</span></div>
                <div><span className="block text-xs text-gray-400">Injury:</span><span className="text-sm font-medium bg-gray-100 px-2 py-0.5 rounded">True</span></div>
                <div><span className="block text-xs text-gray-400">Supervisor Remarks:</span><p className="text-sm text-gray-600 mt-1">Detailed remarks here...</p></div>
                <div><span className="block text-xs text-gray-400">Employee Signature:</span><div className="border border-gray-200 p-2 mt-1 rounded"><img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Signature_sample.svg" className="h-8 opacity-50" /></div></div>
             </div>
             <div className="space-y-4">
                <div><span className="block text-xs text-gray-400">Employee Reporting:</span><span className="text-sm font-medium">Abdul Joseph</span></div>
                <div><span className="block text-xs text-gray-400">Location:</span><span className="text-sm font-medium">123 Main St</span></div>
                <div><span className="block text-xs text-gray-400">Family Notified:</span><span className="text-sm font-medium bg-gray-100 px-2 py-0.5 rounded">False</span></div>
                <div><span className="block text-xs text-gray-400">Witness:</span><p className="text-sm text-gray-600 mt-1">None</p></div>
                <div><span className="block text-xs text-gray-400">Supervisor Signature:</span><div className="border border-gray-200 p-2 mt-1 rounded"><img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Signature_sample.svg" className="h-8 opacity-50" /></div></div>
             </div>
          </div>
          <div className="p-6 border-t flex justify-end gap-3"><span className="px-4 py-2 bg-green-100 text-green-700 rounded text-sm font-medium">Approved</span></div>
       </div>
    </div>, document.body
  );
}

// =========================================================================
// 1. TRACKABLE LICENSES TAB
// =========================================================================
function TrackableLicensesTab() {
  const [showModal, setShowModal] = useState(false);
  const licenses = [
    { name: "Driving License", id: "01", expiry: "22 April, 2025 | 5:28:20 PM", remark: "Renewal Required" },
    { name: "CPR Certificate", id: "02", expiry: "22 April, 2025 | 5:28:20 PM", remark: "Expired" },
  ];

  return (
    <div className="animate-fade-in space-y-6">
       <div className="flex justify-between items-center">
          <div className="relative w-64"><i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i><input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand" /></div>
          <button onClick={() => setShowModal(true)} className="bg-[#0074D9] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-sm">Add License</button>
       </div>
       <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm"><thead className="bg-gray-50 text-gray-500 text-xs uppercase"><tr><th className="p-4">Trackable Item Type</th><th className="p-4">Item Number</th><th className="p-4">Expiration Date</th><th className="p-4">Remark</th><th className="p-4 text-right"></th></tr></thead>
             <tbody className="divide-y divide-gray-50">{licenses.map((l, i) => (<tr key={i} className="hover:bg-gray-50"><td className="p-4 font-medium">{l.name}</td><td className="p-4">{l.id}</td><td className="p-4 font-medium">{l.expiry}</td><td className="p-4 text-gray-600">{l.remark}</td><td className="p-4 text-right"><button className="text-[#0074D9] flex items-center justify-end gap-1 ml-auto hover:underline"><i className="fa-solid fa-download"></i> Download</button></td></tr>))}</tbody>
          </table>
       </div>
       {showModal && <AddLicenseModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

function AddLicenseModal({ onClose }: { onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col animate-scale-up">
          <div className="flex justify-between items-center p-6 border-b border-gray-100"><h2 className="text-xl font-bold">Employee Trackable License</h2><button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button></div>
          <div className="p-6 space-y-4">
             <div className="grid grid-cols-2 gap-4"><div><label className="text-xs text-gray-500">Item Type</label><select className="w-full border rounded-lg p-2 text-sm"><option>Select</option></select></div><div><label className="text-xs text-gray-500">Item Number</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="Enter" /></div></div>
             <div className="grid grid-cols-2 gap-4"><div><label className="text-xs text-gray-500">Incident Date</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="dd / mm / yyyy" /></div><div><label className="text-xs text-gray-500">Remark</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="Enter" /></div></div>
             <div className="border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center rounded-xl bg-gray-50"><i className="fa-solid fa-cloud-arrow-up text-2xl text-gray-400 mb-2"></i><p className="text-xs text-gray-500">Drag and drop or click to upload file</p></div>
          </div>
          <div className="p-6 border-t flex justify-end gap-3"><button onClick={onClose} className="px-6 py-2 border rounded-lg text-sm">Cancel</button><button className="px-6 py-2 bg-[#0074D9] text-white rounded-lg text-sm">Save</button></div>
       </div>
    </div>, document.body
  );
}

// =========================================================================
// 2. EMPLOYMENT HISTORY TAB
// =========================================================================
function EmploymentHistoryTab() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<any>(null);

  const history = [
    { role: "Personal Care Assistant", company: "CareFirst Home Services", date: "Jan 2019 - Mar 2022", desc: "Provided personal care, assisted with mobility, medication reminders..." },
    { role: "Support Worker", company: "SilverAged Care", date: "May 2017 - Dec 2018", desc: "Provided personal care, assisted with mobility, medication reminders..." },
    { role: "Registered Nurse (RN)", company: "Evergreen Community Health", date: "Feb 2015 - Apr 2017", desc: "Provided personal care, assisted with mobility, medication reminders..." },
  ];

  return (
    <div className="animate-fade-in space-y-6">
       <div className="flex justify-end"><button onClick={() => setShowAddModal(true)} className="bg-[#0074D9] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-sm">Add Employment History</button></div>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {history.map((h, i) => (
             <div key={i} onClick={() => { setSelectedHistory(h); setShowDetailModal(true); }} className="bg-[#F0F7F7] border border-[#E0EFEF] p-5 rounded-xl cursor-pointer hover:shadow-md transition-shadow relative group">
                <div className="absolute top-4 right-4 text-gray-400"><i className="fa-solid fa-pen"></i></div>
                <h3 className="font-bold text-gray-800 text-sm mb-1">{h.role}</h3>
                <p className="text-xs text-gray-500 mb-1">{h.company}</p>
                <p className="text-[10px] text-gray-400 mb-3">{h.date}</p>
                <div className="text-xs text-gray-600"><span className="font-medium">Responsibility:</span><ul className="list-disc ml-4 mt-1 space-y-1"><li>{h.desc}</li></ul></div>
             </div>
          ))}
       </div>
       {showAddModal && <AddEmploymentModal onClose={() => setShowAddModal(false)} />}
       {showDetailModal && <EmploymentDetailModal history={selectedHistory} onClose={() => setShowDetailModal(false)} />}
    </div>
  );
}

function AddEmploymentModal({ onClose }: { onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col animate-scale-up">
          <div className="flex justify-between items-center p-6 border-b border-gray-100"><h2 className="text-xl font-bold">Add Employment History</h2><button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button></div>
          <div className="p-6 space-y-4">
             <div className="grid grid-cols-2 gap-4"><div><label className="text-xs text-gray-500">Enter Position</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="Enter" /></div><div><label className="text-xs text-gray-500">Company</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="Enter" /></div></div>
             <div className="grid grid-cols-2 gap-4"><div><label className="text-xs text-gray-500">Start Date</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="dd / mm / yyyy" /></div><div><label className="text-xs text-gray-500">End Date</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="dd / mm / yyyy" /></div></div>
             <div><label className="text-xs text-gray-500 block mb-1">Note</label><textarea className="w-full border rounded-lg p-2 text-sm h-24" placeholder="Start typing..."></textarea></div>
          </div>
          <div className="p-6 border-t flex justify-end gap-3"><button onClick={onClose} className="px-6 py-2 border rounded-lg text-sm">Cancel</button><button className="px-6 py-2 bg-[#0074D9] text-white rounded-lg text-sm">Save</button></div>
       </div>
    </div>, document.body
  );
}

function EmploymentDetailModal({ history, onClose }: { history: any, onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl flex flex-col animate-scale-up p-6 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400"><i className="fa-solid fa-xmark text-lg"></i></button>
          <h2 className="text-lg font-bold mb-1">Employment History</h2>
          <h3 className="text-xl font-bold text-gray-800 mb-1">{history.role}</h3>
          <p className="text-sm text-gray-500 mb-4">{history.company}<br/>{history.date}</p>
          <div className="text-sm text-gray-600"><span className="font-medium block mb-2">Responsibility:</span><ul className="list-disc ml-4 space-y-2"><li>Provided personal care, assisted with mobility, medication reminders, and companionship for elderly clients.</li></ul></div>
       </div>
    </div>, document.body
  );
}

// =========================================================================
// 3. REFERENCE TAB
// =========================================================================
function ReferenceTab() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRef, setSelectedRef] = useState<any>(null);

  const references = [
    { name: "Maria Hills", contact: "(323)432-2321", status: "Completed", date: "2024-11-15", notes: "Adams Family" },
    { name: "John Kerry", contact: "(323)432-2321", status: "Completed", date: "2024-11-15", notes: "Adams Family" },
    { name: "Tim Vasko", contact: "(323)432-2321", status: "Pending", date: "2024-11-15", notes: "Adams Family" },
    { name: "James", contact: "(323)432-2321", status: "Unresponsive", date: "2024-11-15", notes: "Adams Family" },
  ];

  return (
    <div className="animate-fade-in space-y-6">
       <div className="flex justify-between items-center">
          <div className="relative w-64"><i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i><input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand" /></div>
          <button onClick={() => setShowAddModal(true)} className="bg-[#0074D9] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-sm">Add reference</button>
       </div>
       <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm"><thead className="bg-gray-50 text-gray-500 text-xs uppercase"><tr><th className="p-4">Name</th><th className="p-4">Contact & Type</th><th className="p-4">Status</th><th className="p-4">Date Contacted</th><th className="p-4">Notes summary</th><th className="p-4"></th></tr></thead>
             <tbody className="divide-y divide-gray-50">{references.map((r, i) => (<tr key={i} className="hover:bg-gray-50"><td className="p-4">{r.name}</td><td className="p-4">{r.contact}</td><td className="p-4"><span className={`px-2 py-1 rounded text-xs border ${r.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' : r.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-red-50 text-red-700 border-red-200'}`}>{r.status}</span></td><td className="p-4">{r.date}</td><td className="p-4">{r.notes}</td><td className="p-4 text-right"><button onClick={() => { setSelectedRef(r); setShowEditModal(true); }} className="text-gray-400 hover:text-gray-600"><i className="fa-solid fa-pen"></i></button></td></tr>))}</tbody>
          </table>
       </div>
       {showAddModal && <AddReferenceModal onClose={() => setShowAddModal(false)} />}
       {showEditModal && <ReferenceDetailsModal reference={selectedRef} onClose={() => setShowEditModal(false)} />}
    </div>
  );
}

function AddReferenceModal({ onClose }: { onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl flex flex-col animate-scale-up">
          <div className="flex justify-between items-center p-6 border-b border-gray-100"><h2 className="text-xl font-bold">Reference</h2><button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button></div>
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
             <div className="grid grid-cols-2 gap-4"><div><label className="text-xs text-gray-500">Reference Type</label><select className="w-full border rounded-lg p-2 text-sm"><option>Select Type</option></select></div><div><label className="text-xs text-gray-500">Full Name</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="e.g. Jane Doe" /></div></div>
             <div className="grid grid-cols-2 gap-4"><div><label className="text-xs text-gray-500">Relationship to Employee</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="e.g. Former Manager" /></div><div><label className="text-xs text-gray-500">Company/Organization Name</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="Professional" /></div></div>
             <div className="grid grid-cols-2 gap-4"><div><label className="text-xs text-gray-500">Phone Number</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="(785) 123 2321" /></div><div><label className="text-xs text-gray-500">Email Address</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="e.g. email@example.com" /></div></div>
             <h3 className="font-bold text-sm text-gray-800 pt-2">Admin Vetting Details (Internal Use)</h3>
             <div className="grid grid-cols-3 gap-4"><div><label className="text-xs text-gray-500">Years Known</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="e.g. 3" /></div><div><label className="text-xs text-gray-500">Verification Status</label><select className="w-full border rounded-lg p-2 text-sm"><option>Pending</option></select></div><div><label className="text-xs text-gray-500">Date Contacted</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="dd / mm / yyyy" /></div></div>
             <div><label className="text-xs text-gray-500">Reference Notes</label><textarea className="w-full border rounded-lg p-2 text-sm h-24" placeholder="Start typing..."></textarea></div>
             <button className="text-[#0074D9] text-sm font-medium border border-[#0074D9] rounded-lg px-4 py-2 w-full flex items-center justify-center gap-2"><i className="fa-solid fa-plus"></i> Add Another Reference</button>
          </div>
          <div className="p-6 border-t flex justify-end gap-3"><button onClick={onClose} className="px-6 py-2 border rounded-lg text-sm">Back</button><button className="px-6 py-2 bg-[#0074D9] text-white rounded-lg text-sm">Save</button></div>
       </div>
    </div>, document.body
  );
}

function ReferenceDetailsModal({ reference, onClose }: { reference: any, onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col animate-scale-up">
          <div className="flex justify-between items-center p-6 border-b border-gray-100"><h2 className="text-xl font-bold">Reference Details</h2><button onClick={onClose}><i className="fa-solid fa-xmark text-xl text-gray-400"></i></button></div>
          <div className="p-6 space-y-4">
             <div className="grid grid-cols-2 gap-4"><div><label className="text-xs text-gray-500">Reference Type</label><select className="w-full border rounded-lg p-2 text-sm"><option>Professional</option></select></div><div><label className="text-xs text-gray-500">Full Name</label><input className="w-full border rounded-lg p-2 text-sm" defaultValue="Maria Rod" /></div></div>
             <div className="grid grid-cols-2 gap-4"><div><label className="text-xs text-gray-500">Verification Status</label><select className="w-full border rounded-lg p-2 text-sm"><option>Complete</option></select></div><div><label className="text-xs text-gray-500">Date Contacted</label><input className="w-full border rounded-lg p-2 text-sm" placeholder="dd / mm / yyyy" /></div></div>
             <div><label className="text-xs text-gray-500">Reference Notes</label><textarea className="w-full border rounded-lg p-2 text-sm h-24" placeholder="Start typing..."></textarea></div>
          </div>
          <div className="p-6 border-t flex justify-end gap-3"><button onClick={onClose} className="px-6 py-2 border rounded-lg text-sm">Back</button><button className="px-6 py-2 bg-[#0074D9] text-white rounded-lg text-sm">Update</button></div>
       </div>
    </div>, document.body
  );
}