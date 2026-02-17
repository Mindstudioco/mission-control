"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import KanbanColumn from "./KanbanColumn";
import { Plus } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "high" | "medium" | "low";
  assignee: string;
  status: string;
}

const columns = [
  { title: "📥 Backlog", status: "backlog" },
  { title: "📋 Todo", status: "todo" },
  { title: "🔄 Doing", status: "doing" },
  { title: "👀 Review", status: "review" },
  { title: "✅ Done", status: "done" },
];

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "tasks"),
      (snapshot) => {
        const tasksData: Task[] = [];
        snapshot.forEach((doc) => {
          tasksData.push({ id: doc.id, ...(doc.data() as Task) });
        });
        setTasks(tasksData);
        setLoading(false);
      },
      (error) => {
        console.error("Error: Permission denied", error);
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

  const getTasksByStatus = (status: string) =>
    tasks.filter((task) => task.status === status);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-x-auto">
      <div className="flex gap-6 min-w-max p-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column.status}
            title={column.title}
            status={column.status}
            tasks={getTasksByStatus(column.status)}
            onMoveTask={moveTask}
          />
        ))}
      </div>
    </div>
  );
}
