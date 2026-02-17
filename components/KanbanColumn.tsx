"use client";

import TaskCard from "./TaskCard";

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "high" | "medium" | "low";
  assignee: string;
  status: string;
}

interface KanbanColumnProps {
  title: string;
  status: string;
  tasks: Task[];
  onMoveTask: (id: string, newStatus: string) => void;
}

export default function KanbanColumn({
  title,
  status,
  tasks,
  onMoveTask,
}: KanbanColumnProps) {
  return (
    <div className="flex-shrink-0 w-80">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
        <h2 className="font-semibold text-foreground">{title}</h2>
        <span className="bg-border text-xs px-3 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onMove={onMoveTask} />
        ))}
      </div>
    </div>
  );
}
