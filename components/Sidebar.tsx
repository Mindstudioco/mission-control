"use client";

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
  return (
    <aside className="w-[260px] bg-[#f5f0ec] border-r border-[#e7e2de] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="text-[28px] text-center mb-2">🦅</div>
        <h1 className="text-[16px] font-bold text-center text-[#1a1a1a]">Mission Control</h1>
        <p className="text-[12px] text-[#6b7280] text-center">Nico & Agents</p>
      </div>

      {/* Agent Count */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.5px] text-[#9ca3af]">
          <span>All Agents</span>
          <span className="bg-[#faf6f3] px-2 py-1 rounded-full">{workingCount} active</span>
        </div>
      </div>

      {/* Agent List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-1.5">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="flex items-center gap-3 p-2.5 rounded-[10px] bg-white cursor-pointer transition-all hover:translate-x-1 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
          >
            <div className={`w-9 h-9 rounded-full ${agent.color} flex items-center justify-center text-white font-semibold text-[13px] flex-shrink-0`}>
              {agent.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[13px] text-[#1a1a1a] truncate">{agent.name}</div>
              <div className="text-[11px] text-[#6b7280] truncate">{agent.role}</div>
            </div>
            <div
              className={`w-2 h-2 rounded-full flex-shrink-0 ${
                agent.status === "working"
                  ? "bg-[#22c55e] shadow-[0_0_0_3px_rgba(34,197,94,0.2)]"
                  : "bg-[#9ca3af]"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[#e7e2de]">
        <div className="text-[11px] text-[#9ca3af] text-center">
          {agents.length} agents in roster
        </div>
      </div>
    </aside>
  );
}
