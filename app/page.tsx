"use client";

import { useEffect, useState } from "react";
import Board from "@/components/ui/kanban/Board";
import { Task } from "@/components/ui/kanban/types";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/tasks");
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Failed to load tasks: ${response.status}`);
        }
        const data = await response.json();
        const transformedTasks: Task[] = (data || []).map((task: any) => ({
          id: String(task.id),
          title: task.title || "",
          description: task.description || "",
          status: (task.status || "todo") as "todo" | "doing" | "done",
          order: task.position || 0,
        }));
        setTasks(transformedTasks);
      } catch (err: any) {
        setError(err.message || "Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    loadTasks();

    const channel = supabase
      .channel("tasks-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tasks" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setTasks((prev) => [
              ...prev,
              {
                id: String(payload.new.id),
                title: payload.new.title || "",
                description: payload.new.description || "",
                status: (payload.new.status || "todo") as "todo" | "doing" | "done",
                order: payload.new.position || 0,
              },
            ]);
          } else if (payload.eventType === "UPDATE") {
            setTasks((prev) =>
              prev.map((t) =>
                t.id === String(payload.new.id)
                  ? {
                      id: String(payload.new.id),
                      title: payload.new.title || "",
                      description: payload.new.description || "",
                      status: (payload.new.status || "todo") as "todo" | "doing" | "done",
                      order: payload.new.position || 0,
                    }
                  : t
              )
            );
          } else if (payload.eventType === "DELETE") {
            setTasks((prev) => prev.filter((t) => t.id !== String(payload.old.id)));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 text-black dark:text-white">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        🧩 Tasks from Supabase
      </h1>
      {loading ? (
        <p className="text-gray-500">Loading tasks...</p>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400">Error: {error}</p>
          <p className="text-sm text-red-500 dark:text-red-500 mt-2">
            Make sure your Supabase environment variables are set correctly.
          </p>
        </div>
      ) : (
        <Board initialTasks={tasks} />
      )}
    </main>
  );
}
