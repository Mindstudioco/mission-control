"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const activities = [
  { id: 1, user: "Sonny", action: "moved task", target: "Create briefing system → In Progress", time: "2m ago", initials: "SN", color: "bg-indigo-500" },
  { id: 2, user: "Catalina", action: "completed", target: "Q1 strategy deck", time: "15m ago", initials: "CT", color: "bg-pink-500" },
  { id: 3, user: "Daniela", action: "started", target: "Social content calendar", time: "1h ago", initials: "DL", color: "bg-amber-500" },
  { id: 4, user: "Sara", action: "reviewed", target: "SEO audit report", time: "2h ago", initials: "SR", color: "bg-emerald-500" },
];

type Tab = "all" | "tasks" | "system";

export default function ActivityFeed() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("all");

  if (collapsed) {
    return (
      <aside className="w-[60px] bg-[#f5f0ec] border-l border-[#e7e2de] flex flex-col items-center py-4">
        <button 
          onClick={() => setCollapsed(false)}
          className="p-2 hover:bg-white/60 rounded-lg mb-4 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-500" />
        </button>
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold">
          {activities.length}
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-[280px] bg-[#f5f0ec] border-l border-[#e7e2de] flex flex-col overflow-hidden">
      {/* Header con Toggle */}
      <div className="p-4 border-b border-[#e7e2de] flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-gray-900">Live Feed</h2>
          <p className="text-xs text-gray-500">Agent activity</p>
        </div>
        <button 
          onClick={() => setCollapsed(true)}
          className="p-1.5 hover:bg-white/60 rounded-lg transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#e7e2de]">
        {[
          { id: "all", label: "All" },
          { id: "tasks", label: "Tasks" },
          { id: "system", label: "System" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
              activeTab === tab.id ? "text-indigo-600 border-b-2 border-indigo-500" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Activity List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-3 p-2 rounded-lg hover:bg-white/50 transition-colors">
            <div className={`w-8 h-8 rounded-full ${activity.color} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
              {activity.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-700 leading-tight">
                <span className="font-semibold">{activity.user}</span>{" "}
                <span className="text-gray-500">{activity.action}</span>
              </p>
              <p className="text-xs text-gray-600 truncate">{activity.target}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-[#e7e2de]">
        <button className="w-full py-2 text-xs text-indigo-600 font-medium hover:underline">
          View full history
        </button>
      </div>
    </aside>
  );
}
