"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

// --- Types ---
type FormComponent = {
  id: string;
  type: string;
  label: string;
  required: boolean;
  evvCode?: string;
  conditionalLogic?: boolean;
};

export default function CustomFormBuilderPage() {
  // Responsive Mobile Tab State
  const [activeMobileTab, setActiveMobileTab] = useState<'palette' | 'canvas' | 'properties'>('canvas');

  // Form Canvas State
  const [formElements, setFormElements] = useState<FormComponent[]>([
    { id: "field_medicaid_id", type: "medicaid_id", label: "Client Medicaid ID", required: true },
    { id: "field_adl_bathing", type: "adl_matrix", label: "Bathing Assistance", required: true, evvCode: "T1019" },
    { id: "field_refusal_reason", type: "text_area", label: "Reason for Refusal", required: false, conditionalLogic: true },
    { id: "field_dual_sig", type: "dual_signature", label: "Visit Verification Signatures", required: true }
  ]);

  // Selected Component for the Property Editor
  const [activeElementId, setActiveElementId] = useState<string>("field_adl_bathing");
  const activeElement = formElements.find(el => el.id === activeElementId);

  // --- Handlers ---

  const handleElementClick = (id: string) => {
    setActiveElementId(id);
    setActiveMobileTab('properties'); 
  };

  const handleCopy = (e: any, element: FormComponent) => {
    e.stopPropagation();
    const newId = `field_${Date.now()}`;
    const newElement = { ...element, id: newId };
    setFormElements([...formElements, newElement]);
    setActiveElementId(newId);
  };

  const handleDelete = (e: any, id: string) => {
    e.stopPropagation();
    const filtered = formElements.filter(el => el.id !== id);
    setFormElements(filtered);
    if (activeElementId === id) {
      setActiveElementId(filtered.length > 0 ? filtered[0].id : "");
    }
  };

  const addComponent = (type: string, label: string) => {
    const newId = `field_${Date.now()}`;
    setFormElements([...formElements, { id: newId, type, label, required: false }]);
    setActiveElementId(newId);
    setActiveMobileTab('properties');
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    const label = e.dataTransfer.getData("label");
    if (type && label) {
      addComponent(type, label);
    }
  };

  const updateActiveElement = (field: string, value: any) => {
    setFormElements(formElements.map(el => el.id === activeElementId ? { ...el, [field]: value } : el));
  };

  return (
    <DashboardLayout>
      {/* 
        Absolute Inset-0 breaks out of the Dashboard padding 
        to create a perfect full-screen, scroll-free app layout.
      */}
     <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-50/50 p-0 -m-2 sm:-m-6 lg:-m-4">
        
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center shrink-0 gap-4">
           <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                 <Link href="/forms" className="hover:text-[#0074D9] flex items-center gap-1 transition-colors">
                    <i className="fa-solid fa-arrow-left text-xs"></i> Back to Forms
                 </Link>
                 <span>/</span>
                 <span>Builder</span>
              </div>
              <h1 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                 Ohio Daily ADL Form
                 <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold border bg-green-50 text-green-600 border-green-100 hidden sm:inline-block">
                    EVV Enabled
                 </span>
              </h1>
           </div>
           
           <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-1 md:pb-0">
              <button className="whitespace-nowrap px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                 <i className="fa-solid fa-desktop"></i> <span className="hidden sm:inline">Preview</span>
              </button>
              <button className="whitespace-nowrap px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                 <i className="fa-regular fa-file-pdf"></i> <span className="hidden sm:inline">PDF Mapper</span>
              </button>
              <button className="whitespace-nowrap px-5 py-2 bg-[#0074D9] text-white rounded-lg text-sm font-medium hover:bg-[#0062b8] shadow-sm transition-colors flex items-center gap-2">
                 <i className="fa-solid fa-cloud-arrow-up"></i> Save
              </button>
           </div>
        </div>

        {/* 3-Pane Builder Workspace (Responsive) */}
        <div className="flex flex-1 overflow-hidden relative">
          
          {/* LEFT PANE: Component Palette */}
          <div className={`${activeMobileTab === 'palette' ? 'flex' : 'hidden'} lg:flex w-full lg:w-72 bg-white border-r border-gray-200 flex-col shrink-0 h-full`}>
             {/* Fixed Header */}
             <div className="p-4 border-b border-gray-100 bg-gray-50 shrink-0">
                <h3 className="font-bold text-gray-800 text-sm">Component Palette</h3>
                <p className="text-xs text-gray-500 mt-1">Drag or click to add fields.</p>
             </div>
             
             {/* Scrollable Content */}
             <div className="p-4 space-y-6 flex-1 overflow-y-auto">
                <div>
                   <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Standard Fields</h4>
                   <div className="space-y-2">
                      <DraggableComponent type="short_text" icon="fa-font" label="Short Text" onAdd={addComponent} />
                      <DraggableComponent type="text_area" icon="fa-align-left" label="Paragraph Area" onAdd={addComponent} />
                      <DraggableComponent type="dropdown" icon="fa-list-ul" label="Dropdown Select" onAdd={addComponent} />
                      <DraggableComponent type="date" icon="fa-calendar-days" label="Date Picker" onAdd={addComponent} />
                   </div>
                </div>

                <div>
                   <h4 className="text-xs font-bold text-[#0074D9] uppercase tracking-wider mb-3">Ohio / EVV</h4>
                   <div className="space-y-2">
                      <DraggableComponent type="medicaid_id" icon="fa-id-card" label="Medicaid ID" special onAdd={addComponent} />
                      <DraggableComponent type="adl_matrix" icon="fa-wheelchair" label="ADL/IADL Matrix" special onAdd={addComponent} />
                      <DraggableComponent type="mileage" icon="fa-car" label="Mileage Tracker" special onAdd={addComponent} />
                      <DraggableComponent type="dual_signature" icon="fa-file-signature" label="Dual-Signature Pad" special onAdd={addComponent} />
                   </div>
                </div>

                <div>
                   <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Layout</h4>
                   <div className="space-y-2">
                      <DraggableComponent type="header" icon="fa-heading" label="Section Header" onAdd={addComponent} />
                      <DraggableComponent type="divider" icon="fa-minus" label="Divider Line" onAdd={addComponent} />
                   </div>
                </div>
             </div>
          </div>

          {/* CENTER PANE: Canvas (WYSIWYG) */}
          <div className={`${activeMobileTab === 'canvas' ? 'flex' : 'hidden'} lg:flex flex-1 bg-gray-100 overflow-y-auto p-4 sm:p-8 justify-center relative h-full`}>
             <div className="max-w-3xl w-full">
                
                <div 
                  className="bg-white rounded-xl shadow-md border border-gray-200 min-h-[800px] flex flex-col relative overflow-hidden pb-10"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                   
                   <div className="bg-[#0074D9] text-white p-6">
                      <h2 className="text-2xl font-bold">Daily ADL & Time Record</h2>
                      <p className="text-blue-100 text-sm mt-1">Ohio OAC 5160-46-04 Compliant</p>
                   </div>

                   <div className="p-4 sm:p-6 space-y-4">
                      {formElements.map((element) => (
                         <div 
                           key={element.id}
                           onClick={() => handleElementClick(element.id)}
                           className={`relative p-4 rounded-lg border-2 transition-all cursor-pointer group ${activeElementId === element.id ? 'border-[#0074D9] bg-blue-50/20' : 'border-transparent hover:border-gray-200 hover:bg-gray-50'}`}
                         >
                            {/* Hover Actions (Copy & Delete) */}
                            <div className={`absolute -top-3 right-2 flex gap-1 ${activeElementId === element.id ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'} transition-opacity z-10`}>
                               <button onClick={(e) => handleCopy(e, element)} className="w-6 h-6 bg-white border border-gray-200 rounded shadow-sm text-gray-500 hover:text-[#0074D9] flex items-center justify-center" title="Copy"><i className="fa-solid fa-copy text-[10px]"></i></button>
                               <button onClick={(e) => handleDelete(e, element.id)} className="w-6 h-6 bg-white border border-gray-200 rounded shadow-sm text-gray-500 hover:text-red-500 flex items-center justify-center" title="Delete"><i className="fa-solid fa-trash text-[10px]"></i></button>
                            </div>

                            {/* Label & Badges */}
                            {element.type !== 'divider' && element.type !== 'header' && (
                               <div className="flex items-center justify-between mb-2">
                                  <label className="text-sm font-bold text-gray-800">
                                     {element.label} {element.required && <span className="text-red-500">*</span>}
                                  </label>
                                  
                                  <div className="flex gap-2">
                                     {element.conditionalLogic && <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded flex items-center gap-1"><i className="fa-solid fa-code-branch"></i> Logic</span>}
                                     {element.evvCode && <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded flex items-center gap-1"><i className="fa-solid fa-satellite-dish"></i> EVV: {element.evvCode}</span>}
                                  </div>
                               </div>
                            )}

                            {/* Dynamic Element Renders */}
                            {element.type === 'short_text' && <input readOnly type="text" placeholder="Short text input..." className="w-full border border-gray-300 rounded p-2.5 text-sm bg-white cursor-not-allowed" />}
                            {element.type === 'text_area' && <textarea readOnly placeholder="Enter detailed notes here..." className="w-full border border-gray-300 rounded p-2.5 text-sm h-20 bg-white cursor-not-allowed resize-none"></textarea>}
                            {element.type === 'dropdown' && <select disabled className="w-full border border-gray-300 rounded p-2.5 text-sm bg-white cursor-not-allowed"><option>Select option...</option></select>}
                            {element.type === 'date' && <input readOnly type="date" className="w-full border border-gray-300 rounded p-2.5 text-sm bg-white cursor-not-allowed" />}
                            {element.type === 'medicaid_id' && <input readOnly type="text" placeholder="___-___-____" className="w-full border border-gray-300 rounded p-2.5 text-sm bg-white cursor-not-allowed" />}
                            
                            {element.type === 'header' && <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2 pt-2">{element.label}</h3>}
                            {element.type === 'divider' && <hr className="border-gray-200 my-4" />}

                            {element.type === 'adl_matrix' && (
                               <div className="border border-gray-200 rounded overflow-hidden">
                                  <div className="bg-gray-50 p-2 border-b border-gray-200 text-xs font-medium text-gray-500 flex justify-between">
                                     <span>Task</span><span>Status</span>
                                  </div>
                                  <div className="p-3 bg-white flex justify-between items-center text-sm">
                                     <span className="text-gray-700">Example Task</span>
                                     <select disabled className="border border-gray-300 rounded p-1.5 text-xs bg-gray-50 cursor-not-allowed">
                                        <option>Select Status...</option>
                                     </select>
                                  </div>
                               </div>
                            )}

                            {element.type === 'mileage' && (
                               <div className="flex gap-4">
                                  <input readOnly type="number" placeholder="Start Odometer" className="w-1/2 border border-gray-300 rounded p-2.5 text-sm bg-white cursor-not-allowed" />
                                  <input readOnly type="number" placeholder="End Odometer" className="w-1/2 border border-gray-300 rounded p-2.5 text-sm bg-white cursor-not-allowed" />
                               </div>
                            )}

                            {element.type === 'dual_signature' && (
                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div className="border-2 border-dashed border-gray-300 rounded-lg h-24 flex flex-col items-center justify-center bg-gray-50">
                                     <i className="fa-solid fa-signature text-gray-400 text-xl mb-1"></i>
                                     <span className="text-[10px] text-gray-500">Caregiver Signature</span>
                                  </div>
                                  <div className="border-2 border-dashed border-gray-300 rounded-lg h-24 flex flex-col items-center justify-center bg-gray-50">
                                     <i className="fa-solid fa-signature text-gray-400 text-xl mb-1"></i>
                                     <span className="text-[10px] text-gray-500">Client Signature</span>
                                  </div>
                               </div>
                            )}
                         </div>
                      ))}
                   </div>
                   
                   <div className="mx-4 sm:mx-6 mt-4 border-2 border-dashed border-blue-200 rounded-lg h-20 flex items-center justify-center bg-blue-50/50 text-blue-400 text-sm font-medium pointer-events-none">
                      Drag and drop new component here
                   </div>

                </div>
             </div>
          </div>

          {/* RIGHT PANE: Property Editor */}
          <div className={`${activeMobileTab === 'properties' ? 'flex' : 'hidden'} lg:flex w-full lg:w-80 bg-white border-l border-gray-200 flex-col shrink-0 shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.05)] z-20 relative h-full`}>
             {/* Fixed Header */}
             <div className="p-4 border-b border-gray-100 bg-gray-50 shrink-0">
                <h3 className="font-bold text-gray-800 text-sm">Field Properties</h3>
                <p className="text-xs text-gray-500 mt-1">Configure the selected component.</p>
             </div>

             {/* Scrollable Content */}
             <div className="flex-1 overflow-y-auto">
               {activeElement ? (
                  <div key={activeElement.id} className="p-5 space-y-6">
                     
                     {/* General Settings */}
                     <div>
                        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">General</h4>
                        <div className="space-y-4">
                           <div>
                              <label className="text-xs font-medium text-gray-700 block mb-1">Field Label</label>
                              <input 
                                type="text" 
                                value={activeElement.label} 
                                onChange={(e) => updateActiveElement('label', e.target.value)}
                                className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:border-[#0074D9] outline-none" 
                              />
                           </div>
                           <div>
                              <label className="text-xs font-medium text-gray-700 block mb-1">Data Binding ID</label>
                              <input readOnly type="text" value={activeElement.id} className="w-full border border-gray-200 rounded-lg p-2 text-sm bg-gray-50 text-gray-500 outline-none font-mono cursor-not-allowed" />
                           </div>
                           
                           {activeElement.type !== 'divider' && activeElement.type !== 'header' && (
                              <div className="flex items-center justify-between pt-2">
                                 <label className="text-sm font-medium text-gray-700 cursor-pointer" htmlFor="req">Required Field</label>
                                 <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                      type="checkbox" 
                                      id="req"
                                      className="sr-only peer" 
                                      checked={activeElement.required} 
                                      onChange={(e) => updateActiveElement('required', e.target.checked)}
                                    />
                                    <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0074D9]"></div>
                                 </label>
                              </div>
                           )}
                        </div>
                     </div>

                     <hr className="border-gray-100" />

                     {/* EVV Mapping Section */}
                     <div>
                        <div className="flex justify-between items-center mb-3">
                           <h4 className="text-[11px] font-bold text-[#0074D9] uppercase tracking-wider">EVV & Compliance</h4>
                           <i className="fa-solid fa-satellite-dish text-[#0074D9] text-xs"></i>
                        </div>
                        
                        {activeElement.type === 'adl_matrix' ? (
                           <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 space-y-3">
                              <div>
                                 <label className="text-xs font-medium text-blue-900 block mb-1">Ohio Service Code</label>
                                 <select 
                                   value={activeElement.evvCode || ""} 
                                   onChange={(e) => updateActiveElement('evvCode', e.target.value)}
                                   className="w-full border border-blue-200 rounded p-2 text-xs focus:border-[#0074D9] outline-none text-gray-700 bg-white"
                                 >
                                    <option value="">None</option>
                                    <option value="T1019">T1019 - Personal Care</option>
                                    <option value="S5125">S5125 - Attendant Care</option>
                                    <option value="T1001">T1001 - Nursing Assessment</option>
                                 </select>
                              </div>
                           </div>
                        ) : (
                           <p className="text-xs text-gray-400 italic">EVV mapping not applicable for this field type.</p>
                        )}
                     </div>

                  </div>
               ) : (
                  <div className="p-6 flex flex-col items-center justify-center h-full text-center min-h-[300px]">
                     <i className="fa-solid fa-arrow-pointer text-gray-300 text-3xl mb-3"></i>
                     <p className="text-sm text-gray-500">Select a field on the canvas to edit its properties.</p>
                  </div>
               )}
             </div>
          </div>

        </div>

        {/* Mobile Tab Navigation */}
        <div className="lg:hidden flex bg-white border-t border-gray-200 shrink-0">
           <button onClick={() => setActiveMobileTab('palette')} className={`flex-1 py-3 text-xs font-bold flex flex-col items-center gap-1 ${activeMobileTab === 'palette' ? 'text-[#0074D9] bg-blue-50/30' : 'text-gray-500'}`}><i className="fa-solid fa-shapes text-lg"></i> Add Field</button>
           <button onClick={() => setActiveMobileTab('canvas')} className={`flex-1 py-3 text-xs font-bold flex flex-col items-center gap-1 ${activeMobileTab === 'canvas' ? 'text-[#0074D9] bg-blue-50/30' : 'text-gray-500 border-x border-gray-100'}`}><i className="fa-solid fa-file-lines text-lg"></i> Canvas</button>
           <button onClick={() => setActiveMobileTab('properties')} className={`flex-1 py-3 text-xs font-bold flex flex-col items-center gap-1 ${activeMobileTab === 'properties' ? 'text-[#0074D9] bg-blue-50/30' : 'text-gray-500'}`}><i className="fa-solid fa-sliders text-lg"></i> Edit Field</button>
        </div>

      </div>
    </DashboardLayout>
  );
}

// =========================================================================
// HELPER COMPONENTS
// =========================================================================

function DraggableComponent({ type, icon, label, special, onAdd }: { type: string, icon: string, label: string, special?: boolean, onAdd: (type: string, label: string) => void }) {
   return (
      <div 
         draggable
         onDragStart={(e) => { 
           e.dataTransfer.setData("type", type); 
           e.dataTransfer.setData("label", label); 
         }}
         onClick={() => onAdd(type, label)}
         className={`flex items-center gap-3 p-3 rounded-lg border cursor-grab hover:shadow-md transition-all ${special ? 'border-[#0074D9]/30 bg-blue-50/20 hover:border-[#0074D9]' : 'border-gray-200 bg-white hover:border-gray-300'}`}
      >
         <div className={`w-8 h-8 rounded bg-gray-50 flex items-center justify-center shrink-0 ${special ? 'text-[#0074D9]' : 'text-gray-500'}`}>
            <i className={`fa-solid ${icon}`}></i>
         </div>
         <span className="text-sm font-medium text-gray-700 leading-tight">{label}</span>
         <i className="fa-solid fa-plus ml-auto text-gray-400 text-xs lg:hidden"></i>
         <i className="fa-solid fa-grip-vertical ml-auto text-gray-300 text-xs hidden lg:block"></i>
      </div>
   )
}