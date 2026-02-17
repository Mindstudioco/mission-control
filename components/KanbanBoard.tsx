"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, Filter, X, ChevronLeft, ChevronRight, Plus } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "high" | "medium" | "low" | "blocked";
  assignee?: string;
  status: string;
  tag?: string;
  objective?: string;
  outcome?: string;
}

const columns = [
  { title: "Backlog", status: "backlog" },
  { title: "To Do", status: "todo" },
  { title: "In Progress", status: "inprogress" },
  { title: "Review", status: "review" },
  { title: "Done", status: "done" },
];

const priorityConfig: Record<string, { label: string; border: string; badge: string }> = {
  high: { label: "HIGH", border: "border-l-orange-400", badge: "bg-orange-100 text-orange-700" },
  medium: { label: "MEDIUM", border: "border-l-blue-400", badge: "bg-blue-100 text-blue-700" },
  low: { label: "LOW", border: "border-l-gray-400", badge: "bg-gray-100 text-gray-700" },
  blocked: { label: "BLOCKED", border: "border-l-red-400", badge: "bg-red-100 text-red-700" },
};

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "tasks"),
      (snapshot) => {
        const tasksData: Task[] = [];
        snapshot.forEach((doc) => {
          tasksData.push({ ...(doc.data() as Task), id: doc.id });
        });
        setTasks(tasksData);
        setLoading(false);
      },
      () => setLoading(false)
    );
    return () => unsubscribe();
  }, []);

  const getTasksByStatus = (status: string) => {
    return tasks.filter((t) => {
      if (t.status !== status) return false;
      if (filter === "all") return true;
      return t.priority === filter;
    });
  };

  const moveTask = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "tasks", id), { status: newStatus });
      if (selectedTask?.id === id) {
        setSelectedTask({ ...selectedTask, status: newStatus });
      }
    } catch (e) {
      console.error("Move error:", e);
    }
  };

  const getNextStatus = (current: string) => {
    const idx = columns.findIndex((c) => c.status === current);
    return idx < columns.length - 1 ? columns[idx + 1].status : current;
  };

  const getPrevStatus = (current: string) => {
    const idx = columns.findIndex((c) => c.status === current);
    return idx > 0 ? columns[idx - 1].status : current;
  };

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center bg-[#faf6f3]">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </main>
    );
  }

  const activeCount = tasks.filter((t) => t.status !== "done").length;
  const queuedCount = tasks.filter((t) => t.status === "backlog" || t.status === "todo").length;


  return (
    <>
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#faf6f3]">
        <header className="bg-white px-7 py-5 border-b border-[#e7e2de] flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Mission Queue</h1>
            <p className="text-sm text-gray-500 mt-0.5">{tasks.length} objectives</p>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">7</div>
              <div className="text-xs text-gray-500 uppercase mt-1">Agents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{activeCount}</div>
              <div className="text-xs text-gray-500 uppercase mt-1">Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{queuedCount}</div>
              <div className="text-xs text-gray-500 uppercase mt-1">Queued</div>
            </div>
          </div>
        </header>

        <div className="px-7 py-3 bg-white/50 border-b border-[#e7e2de] flex items-center gap-4">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-xs text-gray-600 font-medium">Filter:</span>
          <div className="flex gap-2">
            {["all", "high", "blocked"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  filter === f ? "bg-indigo-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-x-auto overflow-y-hidden p-6">
          <div className="flex gap-5 h-full min-w-max">
            {columns.map((col) => {
              const colTasks = getTasksByStatus(col.status);
              return (
                <div key={col.status} className="w-[300px] flex flex-col">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-gray-300">
                    <span className="font-semibold text-sm text-gray-900">{col.title}</span>
                    <span className="bg-gray-200 px-2.5 py-1 rounded-full text-xs font-bold text-gray-700">
                      {colTasks.length}
                    </span>
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                    {colTasks.map((task) => {
                      const p = priorityConfig[task.priority] || priorityConfig.medium;
                      return (
                        <div
                          key={task.id}
                          onClick={() => setSelectedTask(task)}
                          className={`bg-white rounded-xl p-4 border-l-[3px] ${p.border} shadow-sm cursor-pointer hover:shadow-md transition-all`}
                        >
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${p.badge}`}>
                            {p.label}
                          </span>
                          <h3 className="font-semibold text-sm mt-2 text-gray-900">{task.title}</h3>
                          {task.description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{task.description}</p>}
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-[10px] text-gray-500">{task.assignee || "Unassigned"}</span>
                            {task.tag && <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded-full">{task.tag}</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>


      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedTask(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${(priorityConfig[selectedTask.priority] || priorityConfig.medium).badge}`}>
                {(priorityConfig[selectedTask.priority] || priorityConfig.medium).label}
              </span>
              <button onClick={() => setSelectedTask(null)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedTask.title}</h2>
            <p className="text-gray-600 mb-4">{selectedTask.description}</p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500 uppercase">Responsable:</span>
                <span className="text-sm text-gray-700">{selectedTask.assignee || "Unassigned"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500 uppercase">Status:</span>
                <span className="text-sm text-gray-700 capitalize">{selectedTask.status}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500 uppercase">Tag:</span>
                <span className="text-sm text-gray-700">{selectedTask.tag || "-"}</span>
              </div>
            </div>
            
            <div className="flex gap-2 mt-6">
              <button onClick={() => moveTask(selectedTask.id, getPrevStatus(selectedTask.status))} className="flex-1 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm font-medium flex items-center justify-center gap-1">
                <ChevronLeft className="w-4 h-4" /> Anterior
              </button>
              <button onClick={() => moveTask(selectedTask.id, getNextStatus(selectedTask.status))} className="flex-1 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 text-sm font-medium flex items-center justify-center gap-1">
                Siguiente <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
