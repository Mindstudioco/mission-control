"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot, updateDoc, doc, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, Filter, PlusCircle } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "high" | "medium" | "low" | "blocked";
  assignee?: string;
  status: string;
  tag?: string;
  created_at?: string;
}

const columns = [
  { title: "Backlog / Inbox", status: "backlog", color: "bg-gray-400" },
  { title: "To Do", status: "todo", color: "bg-blue-500" },
  { title: "In Progress", status: "inprogress", color: "bg-indigo-500" },
  { title: "Review", status: "review", color: "bg-purple-500" },
  { title: "Done", status: "done", color: "bg-green-500" },
];

const demoTasks: Task[] = [
  { id: "1", title: "Setup Firebase Hosting", description: "Deploy Kanban to production", priority: "high", status: "done", assignee: "Sonny", tag: "Infrastructure" },
  { id: "2", title: "Create Agent Briefing System", description: "Daily automated reports", priority: "high", status: "inprogress", assignee: "Sonny", tag: "Operations" },
  { id: "3", title: "Connect Vercel Auto-deploy", description: "CI/CD pipeline", priority: "high", status: "review", assignee: "Sonny", tag: "DevOps" },
  { id: "4", title: "Design Social Media Strategy", description: "Q1 content calendar", priority: "medium", status: "todo", assignee: "Catalina", tag: "Marketing" },
  { id: "5", title: "SEO Audit", description: "Technical analysis", priority: "blocked", status: "backlog", assignee: "Sara", tag: "SEO" },
  { id: "6", title: "Brand Assets v3", description: "Update logo pack", priority: "medium", status: "inprogress", assignee: "Esteban", tag: "Design" },
  { id: "7", title: "Community Engagement Report", description: "Weekly metrics", priority: "low", status: "backlog", assignee: "Alejandra", tag: "Community" },
];

const priorityConfig = {
  high: { label: "HIGH", color: "bg-orange-100 text-orange-700 border-orange-200", border: "border-l-orange-400" },
  medium: { label: "MEDIUM", color: "bg-blue-100 text-blue-700 border-blue-200", border: "border-l-blue-400" },
  low: { label: "LOW", color: "bg-gray-100 text-gray-700 border-gray-200", border: "border-l-gray-400" },
  blocked: { label: "BLOCKED", color: "bg-red-100 text-red-700 border-red-200", border: "border-l-red-400" },
};

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(demoTasks);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "tasks"),
      (snapshot) => {
        const tasksData: Task[] = [];
        snapshot.forEach((doc) => {
          tasksData.push({ ...(doc.data() as Task), id: doc.id });
        });
        if (tasksData.length > 0) {
          setTasks(tasksData);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Firebase error:", error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const moveTask = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "tasks", id), {
        status: newStatus,
        updated_at: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error moving task:", error);
    }
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter((task) => task.status === status);
  };

  const activeCount = tasks.filter(t => t.status !== "done").length;
  const inQueue = tasks.filter(t => t.status === "backlog" || t.status === "todo").length;

  if (loading) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        <p className="mt-4 text-sm text-gray-500">Loading Mission Control...</p>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
      {/* Header */}
      <header className="bg-white px-7 py-5 border-b border-[#e7e2de] flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-[#1a1a1a]">Mission Queue</h1>
          <p className="text-[13px] text-[#6b7280] mt-0.5">
            {tasks.length} objectives across {columns.length} stages
          </p>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-center">
            <div className="text-[24px] font-bold text-[#1a1a1a]">7</div>
            <div className="text-[11px] text-[#9ca3af] uppercase tracking-wider mt-1">Agents</div>
          </div>
          <div className="text-center">
            <div className="text-[24px] font-bold text-[#22c55e]">{activeCount}</div>
            <div className="text-[11px] text-[#9ca3af] uppercase tracking-wider mt-1">Active</div>
          </div>
          <div className="text-center">
            <div className="text-[24px] font-bold text-[#6366f1]">{inQueue}</div>
            <div className="text-[11px] text-[#9ca3af] uppercase tracking-wider mt-1">Queued</div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="px-7 py-3 bg-white/50 border-b border-[#e7e2de] flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#9ca3af]" />
          <span className="text-[12px] text-[#6b7280]">Filter:</span>
        </div>
        <div className="flex gap-2">
          {["all", "high", "blocked"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                filter === f
                  ? "bg-indigo-500 text-white"
                  : "bg-[#f5f0ec] text-[#6b7280] hover:bg-[#e7e2de]"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden p-6">
        <div className="flex gap-5 h-full min-w-max">
          {columns.map((column) => {
            const columnTasks = getTasksByStatus(column.status);
            const filteredTasks = filter === "all"
              ? columnTasks
              : columnTasks.filter(t => t.priority === filter);

            return (
              <div key={column.status} className="w-[300px] flex flex-col min-h-0">
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-[#e7e2de]">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[14px] text-[#1a1a1a]">{column.title}</span>
                    <span className="bg-[#f5f0ec] px-2.5 py-1 rounded-full text-[12px] font-bold text-[#6b7280]">
                      {filteredTasks.length}
                    </span>
                  </div>
                </div>

                {/* Tasks */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`bg-white rounded-xl p-4 border-l-[3px] shadow-[0_1px_3px_rgba(0,0,0,0.05)] cursor-pointer transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover