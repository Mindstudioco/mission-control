"use client";

import { useState } from "react";

const activities = [
  { id: 1, user: "Sonny", action: "created task", target: "Daily briefing automation", time: "2m ago", avatar: "SN", color: "bg-indigo-500" },
  { id: 2, user: "Catalina", action: "moved to", target: "In Progress", time: "5m ago", avatar: "CT", color: "bg-pink-500" },
  { id: 3, user: "Daniela", action: "completed", target: "Social post design", time: "12m ago", avatar: "DL", color: "bg-amber-500" },
  { id: 4, user: "Vivi", action: "commented on", target: "Q1 Strategy", time: "28m ago", avatar: "VV", color: "bg-violet-500" },
  { id: 5, user: "Esteban", action: "uploaded", target: "Brand assets v2", time: "1h ago", avatar: "EB", color: "bg-rose-500" },
  { id: 6, user: "Sara", action: "assigned to", target: "SEO audit", time: "2h ago", avatar: "SR", color: "bg-emerald-500" },
];

type Tab = "all" | "tasks" | "comments";

export default function ActivityFeed() {
  const [activeTab, setActiveTab] = useState<Tab>("all");

  const filteredActivities = activities.filter((a) => {
    if (activeTab === "tasks") return a.action.includes("task") || a.action.includes("moved") || a.action.includes("completed");
    if (activeTab === "comments") return a.action.includes("commented");
    return true;
  });

  return (
    <aside className="w-[280px] bg-[#f5f0ec] border-l border-[#e7e2de] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-[#e7e2de]">
        <h2 className="text-[14px] font-bold text-[#1a1a1a]">Live Feed</h2>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#e7e2de]">
        {[
          { id: "all", label: "All" },
          { id: "tasks", label: "Tasks" },
          { id: "comments", label: "Comments" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`flex-1 py-3 text-[12px] font-medium transition-colors ${
              activeTab === tab.id
                ? "text-[#1a1a1a] border-b-2 border-indigo-500"
                : "text-[#6b7280] hover:text-[#1a1a1a]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Activity List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="flex gap-3 group">
            <div className={`w-8 h-8 rounded-full ${activity.color} flex items-center justify-center text-white font-semibold text-[11px] flex-shrink-0`}>
              {activity.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] text-[#1a1a1a] leading-tight">
                <span className="font-semibold">{activity.user}</span>{" "}
                <span className="text-[#6b7280]">{activity.action}</span>{" "}
                <span className="font-medium">{activity.target}</span>
              </div>
              <div className="text-[11px] text-[#9ca3af] mt-0.5">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[#e7e2de]">
        <button className="w-full py-2 text-[12px] text-[#6366f1] font-medium hover:underline">
          View all activity
        </button>
      </div>
    </aside>
  );
}
