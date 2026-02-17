"use client";

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "high" | "medium" | "low";
  assignee: string;
  status: string;
}

interface TaskCardProps {
  task: Task;
  onMove: (id: string, newStatus: string) => void;
}

const priorityColors = {
  high: "text-orange-500 border-orange-500",
  medium: "text-blue-500 border-blue-500",
  low: "text-green-500 border-green-500",
};

const priorityLabels = { high: "HIGH", medium: "MED", low: "LOW" };

const emojis: Record<string, string> = {
  Sonny: "🦅",
  Catalina: "🎯",
  Sara: "🔍",
  Daniela: "📱",
  Alejandra: "💬",
  Vivi: "💡",
  Esteban: "🎨",
};

export default function TaskCard({ task, onMove }: TaskCardProps) {
  const getNextAction = () => {
    const actions: Record<string, { label: string; next: string }> = {
      backlog: { label: "➡️ Todo", next: "todo" },
      todo: { label: "▶️ Iniciar", next: "doing" },
      doing: { label: "✓ Review", next: "review" },
      review: { label: "✅ Done", next: "done" },
    };
    return actions[task.status];
  };

  const action = getNextAction();

  return (
    <div
      className={`bg-card border-l-4 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow ${
        priorityColors[task.priority]
      }`}
    >
      <div
        className={`text-xs font-bold mb-2 ${
          priorityColors[task.priority].split(" ")[0]
        }`}
      >
        {priorityLabels[task.priority]}
      </div>
      <h3 className="font-semibold text-foreground mb-2">{task.title}</h3>
      {task.description && (
        <p className="text-sm text-gray-400 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          {emojis[task.assignee] || "📋"} {task.assignee}
        </span>
        {action && (
          <button
            onClick={() => onMove(task.id, action.next)}
            className="text-xs px-3 py-1 bg-accent/20 hover:bg-accent/30 rounded-full transition-colors"
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}
