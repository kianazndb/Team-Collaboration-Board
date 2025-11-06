import React from "react";
import { useDraggable } from "@dnd-kit/core";

type Props = {
  id: string;
  title: string;
};

export default function TaskCard({ id, title }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.6 : 1,
    cursor: "grab",
  } as React.CSSProperties;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white dark:bg-gray-700 rounded-lg p-3 shadow text-sm font-medium select-none"
    >
      {title}
    </div>
  );
}
