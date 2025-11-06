"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("id, title, description");
      if (error) console.error(error);
      else setTasks(data || []);
    };

    loadTasks();
  }, []);

  return (
    <main className="p-8 text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">🧩 Tasks from Supabase</h1>
      <ul className="space-y-2">
        {tasks.map((t) => (
          <li key={t.id} className="border p-3 rounded-lg bg-white/10">
            <p className="font-semibold">{t.title}</p>
            <p className="text-sm opacity-80">{t.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
