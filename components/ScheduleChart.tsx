"use client";

// Define the shape of the data
export interface ChartData {
  month: string;
  clientHeight: string;     // Tailwind class (e.g., 'h-12') or specific height
  caregiverHeight: string;  // Tailwind class (e.g., 'h-20')
}

interface ScheduleChartProps {
  title?: string;
  dateRange?: string;
  data: ChartData[];
}

export default function ScheduleChart({ 
  title = "Overall Schedule", 
  dateRange = "Feb 2024 - Jun 2025", 
  data 
}: ScheduleChartProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-bold text-lg text-gray-800">{title}</h3>
        <button className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-500">
          {dateRange}
        </button>
      </div>

      {/* Legend */}
      <div className="flex justify-end gap-4 text-xs mb-4">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500"></span> Client
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span> Caregiver
        </div>
      </div>

      {/* Chart Bars Area */}
      <div className="flex-1 flex items-end justify-between gap-2 h-48 px-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col gap-1 items-center w-full group">
            {/* Green Bar (Client) */}
            <div 
              className={`w-2 bg-green-500 rounded-t opacity-80 group-hover:opacity-100 transition-all ${item.clientHeight}`}
            ></div>
            
            {/* Blue Bar (Caregiver) */}
            <div 
              className={`w-2 bg-blue-500 rounded-t opacity-80 group-hover:opacity-100 transition-all ${item.caregiverHeight}`}
            ></div>
            
            {/* Month Label */}
            <span className="text-[10px] text-gray-400 mt-1">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}