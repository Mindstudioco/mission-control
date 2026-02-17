"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const agents = [
  { id: "sonny", name: "Sonny", role: "COO / Orchestrator", initials: "SN", status: "working", color: "bg-indigo-500" },
  { id: "catalina", name: "Catalina", role: "Head of Marketing", initials: "CT", status: "working", color: "bg-pink-500" },
  { id: "sara", name: "Sara", role: "SEO & Content Manager", initials: "SR", status: "idle", color: "bg-emerald-500" },
  { id: "daniela", name: "Daniela", role: "Social Media Manager", initials: "DL", status: "working", color: "bg-amber-500" },
  { id: "alejandra", name: "Alejandra", role: "Community Lead", initials: "AJ", status: "idle", color: "bg-cyan-500" },
  { id: "vivi", name: "Vivi", role: "Creative Strategist", initials: "VV", status: "working", color: "bg-violet-500" },
  { id: "esteban", name: "Esteban", role: "Graphic Designer", initials: "EB", status: "idle", color: "bg-rose-500" },
];

const workingCount = agents.filter(a => a.status === "working").length;

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`${collapsed ? 'w-[70px]' : 'w-[260px]'} bg-[#f5f0ec] border-r border-[#e7e2de] flex flex-col overflow-hidden transition-all duration-300`}>
      {/* Header con Toggle */}
      <div className="p-4 pb-2 flex items-center justify-between">
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <span className="text-[24px]">🦅</span>
            <div>
              <h1 className="text-[14px] font-bold text-[#1a1a1a]">Mission Control</h1>
              <p className="text-[11px] text-[#6b7280]">COO Dashboard</p>
            </div>
          </div>
        ) : (
          <span className="text-[24px] mx-auto">🦅</span>
        )}
        {!collapsed && (
          <button 
            onClick={() => setCollapsed(true)}
            className="p-1.5 hover:bg-white/60 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          </button>
        )}
      </div>

      {/* Toggle cuando está colapsado */}
      {collapsed && (
        <button 
          onClick={() => setCollapsed(false)}
          className="p-2 mx-auto mb-2 hover:bg-white/60 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-500" />
        </button>
      )}

      {/* Agent Count */}
      {!collapsed && (
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-wide">
            <span>AGENTS</span>
            <span className="bg-white px-2 py-0.5 rounded-full text-gray-700">{workingCount} active</span>
          </div>
        </div>
      )}

      {/* Lista Agentes */}
      <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className={`flex items-center gap-3 p-2 rounded-lg bg-white/80 hover:bg-white cursor-pointer transition-all hover:shadow-sm ${collapsed ? 'justify-center' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full ${agent.color} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
              {agent.initials}
            </div>
            {!collapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[13px] text-gray-900 truncate">{agent.name}</div>
                  <div className="text-[10px] text-gray-500 truncate">{agent.role}</div>
                </div>
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${agent.status === "working" ? "bg-green-500" : "bg-gray-400"}`} />
              </>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      {!collapsed && (
        <div className="p-3 border-t border-[#e7e2de] text-center">
          <span className="text-[10px] text-gray-500 font-medium">{agents.length} agents in roster</span>
        </div>
      )}
    </aside>
  );
}
