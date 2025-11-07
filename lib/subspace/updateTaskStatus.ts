import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function addTask(title: string) {
  const { data, error } = await supabase.from("tasks").insert([
    {
      title,
      status: "todo",
      order: 0,
    },
  ]);
  if (error) console.error("Add task error:", error);
  return data;
}

export async function updateTaskStatus(id: string, newStatus: string) {
  const { error } = await supabase
    .from("tasks")
    .update({ status: newStatus })
    .eq("id", id);
  if (error) console.error("Update task error:", error);
}
