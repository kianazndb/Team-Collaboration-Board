import React from "react";
import { Task, TasksByColumn } from "./types";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

type ColumnProps = {
  columnId: keyof TasksByColumn;
  title: string;
  tasks: Task[];
  setTasksByColumn: React.Dispatch<React.SetStateAction<TasksByColumn>>;
};

export default function Column({ columnId, title, tasks }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: columnId });

  return (
    <div ref={setNodeRef} className="rounded border p-3 bg-gray-50 dark:bg-gray-800">
      <h3 className="mb-3 font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
      <div className="space-y-2">
        {tasks.map((t) => (
          <TaskCard key={t.id} id={t.id} title={t.title} />
        ))}
      </div>
    </div>
  );
}
