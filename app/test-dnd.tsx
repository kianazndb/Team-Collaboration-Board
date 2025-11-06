"use client";

import { DndContext, useDraggable } from "@dnd-kit/core";

function Draggable() {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-4 bg-blue-500 text-white rounded-lg shadow-md"
    >
      Drag me 🚀
    </button>
  );
}

export default function TestDnd() {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-100">
      <DndContext>
        <Draggable />
      </DndContext>
    </main>
  );
}
