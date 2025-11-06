import { NextResponse } from "next/server";
import { createClient } from "@/lib/subspace/server";

export async function GET() {
  try {
    const supabase = await createClient();
    
    // First, try to get all columns from the tasks table to see what exists
    // Query only basic columns that are most likely to exist
    const { data, error } = await supabase
      .from("tasks")
      .select("id, title, description, created_at")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Map the data to include default status if it doesn't exist
    const tasksWithStatus = (data || []).map((task: any) => ({
      ...task,
      status: task.status || "todo", // Default to "todo" if status doesn't exist
      position: task.position || task.id, // Use id as position if position doesn't exist
    }));

    return NextResponse.json(tasksWithStatus);
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}
