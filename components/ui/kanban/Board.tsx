import React, { useState, useEffect } from "react";
import Column from "./Column";
import { TasksByColumn, Task } from "./types";
import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

const initial: TasksByColumn = {
  todo: [],
  doing: [],
  done: [],
};

type BoardProps = {
  initialTasks?: Task[];
};

export default function Board({ initialTasks = [] }: BoardProps) {
  const [tasksByColumn, setTasksByColumn] = useState<TasksByColumn>(initial);

  useEffect(() => {
    if (initialTasks.length > 0) {
      const grouped: TasksByColumn = {
        todo: initialTasks
          .filter((t) => t.status === "todo")
          .sort((a, b) => (a.order || 0) - (b.order || 0)),
        doing: initialTasks
          .filter((t) => t.status === "doing")
          .sort((a, b) => (a.order || 0) - (b.order || 0)),
        done: initialTasks
          .filter((t) => t.status === "done")
          .sort((a, b) => (a.order || 0) - (b.order || 0)),
      };
      setTasksByColumn(grouped);
    }
  }, [initialTasks]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const sourceColumnKey = (Object.keys(tasksByColumn) as (keyof TasksByColumn)[]).find((col) =>
      tasksByColumn[col].some((t) => t.id === activeId)
    ) as keyof TasksByColumn | undefined;

    if (!sourceColumnKey) return;

    const destinationColumnKey = (Object.keys(tasksByColumn) as (keyof TasksByColumn)[]).find(
      (col) => col === overId || tasksByColumn[col].some((t) => t.id === overId)
    ) as keyof TasksByColumn | undefined;

    if (!destinationColumnKey) return;

    const overIsTask = Object.values(tasksByColumn).flat().some((t) => t.id === overId);

    if (sourceColumnKey === destinationColumnKey && overIsTask) {
      const list = [...tasksByColumn[sourceColumnKey]];
      const oldIndex = list.findIndex((i) => i.id === activeId);
      const newIndex = list.findIndex((i) => i.id === overId);
      const newList = arrayMove(list, oldIndex, newIndex);
      setTasksByColumn((prev) => ({ ...prev, [sourceColumnKey]: newList }));
      return;
    }

    if (sourceColumnKey === destinationColumnKey) return;

    const taskToMove = tasksByColumn[sourceColumnKey].find((t) => t.id === activeId);
    if (!taskToMove) return;

    const newSource = tasksByColumn[sourceColumnKey].filter((t) => t.id !== activeId);
    const movedTask: Task = { ...taskToMove, status: destinationColumnKey };
    const newDestination = [
      ...tasksByColumn[destinationColumnKey],
      { ...movedTask, order: tasksByColumn[destinationColumnKey].length },
    ];

    setTasksByColumn((prev) => ({
      ...prev,
      [sourceColumnKey]: newSource,
      [destinationColumnKey]: newDestination,
    }));
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-6 p-4">
        <Column
          columnId="todo"
          title="To Do"
          tasks={tasksByColumn.todo}
          setTasksByColumn={setTasksByColumn}
        />
        <Column
          columnId="doing"
          title="Doing"
          tasks={tasksByColumn.doing}
          setTasksByColumn={setTasksByColumn}
        />
        <Column
          columnId="done"
          title="Done"
          tasks={tasksByColumn.done}
          setTasksByColumn={setTasksByColumn}
        />
      </div>
    </DndContext>
  );
}
