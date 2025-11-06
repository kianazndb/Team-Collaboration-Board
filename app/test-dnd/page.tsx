"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const columns = [
  { id: "todo", title: "To Do" },
  { id: "doing", title: "Doing" },
  { id: "done", title: "Done" },
];

const tasks = [
  { id: 1, title: "Set up Supabase", status: "To Do" },
  { id: 2, title: "Build Board UI", status: "Doing" },
  { id: 3, title: "Integrate Drag & Drop", status: "Done" },
];

export default function BoardPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-zinc-800 dark:text-zinc-100">
        🧩 Team Collaboration Board
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => (
          <div
            key={col.id}
            className="bg-white dark:bg-zinc-800 rounded-2xl shadow p-4 flex flex-col"
          >
            <h2 className="font-semibold text-lg mb-4 text-zinc-900 dark:text-zinc-50">
              {col.title}
            </h2>

            <div className="flex flex-col gap-3 flex-grow">
              {tasks
                .filter((t) => t.status === col.title)
                .map((task) => (
                  <Card
                    key={task.id}
                    className="rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition"
                  >
                    <CardContent className="p-4">
                      <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                        {task.title}
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>

            <Button
              variant="outline"
              className="mt-4 w-full border-zinc-300 dark:border-zinc-700"
            >
              + Add Task
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
