// lib/subspace/addTask.ts
import { supabase } from "@/lib/subspace/client";

export async function addTask(title: string, description: string, status: string) {
  const { data, error } = await supabase
    .from("tasks")
    .insert([{ title, description, status }])
    .select();

  if (error) {
    console.error("❌ Error adding task:", error.message);
    throw error;
  }

  console.log("✅ Task added successfully:", data);
  return data;
}
