import React from 'react';

// Helper Component: StatsCard
// Ideally, this should be in its own file (e.g., components/StatsCard.tsx) if reused elsewhere.
const StatsCard = ({ title, value, sub, icon = "dollar" }: { title: string, value: string, sub: string, icon?: string }) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm relative">
      <div className="absolute top-5 right-5 text-gray-300 text-xl">
        {/* Using FontAwesome class based on 'icon' prop */}
        <i className={`fa-solid fa-${icon}-sign`}></i>
      </div>
      <p className="text-xs text-gray-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800 mb-1">{value}</h3>
      <p className="text-[10px] text-green-500 font-medium">{sub}</p>
    </div>
  );
};

export default function BillingStatsHeader() {
  return (
    <div className="space-y-6">
      {/* Page Title & Breadcrumb */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Billing/Payroll</h1>
        <div className="text-sm text-gray-500">Billing / Billing/Payroll</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Unpaid Claims" value="$11K" sub="+16% from last month" icon="dollar" />
        <StatsCard title="Unpaid Hours" value="$32K" sub="+16% from last month" icon="dollar" />
        <StatsCard title="Scheduled Hours" value="$4K" sub="+16% from last month" icon="dollar" />
        <StatsCard title="Worked Hours" value="$63K" sub="+16% from last month" icon="dollar" />
      </div>
    </div>
  );
}