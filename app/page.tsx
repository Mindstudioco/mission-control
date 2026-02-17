"use client";

import Sidebar from "@/components/Sidebar";
import KanbanBoard from "@/components/KanbanBoard";
import ActivityFeed from "@/components/ActivityFeed";

export default function Home() {
  return (
    <div className="flex h-screen bg-[#faf6f3] overflow-hidden">
      <Sidebar />
      <KanbanBoard />
      <ActivityFeed />
    </div>
  );
}
// Trigger redeploy Tue Feb 17 03:58:04 UTC 2026
