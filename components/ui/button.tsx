import * as React from "react";

export function Button({
  children,
  className,
  onClick,
  variant = "default",
  type,
  disabled,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "outline";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) {
  const base =
    "px-4 py-2 text-sm font-medium rounded-full transition-colors focus:outline-none";
  const styles =
    variant === "outline"
      ? "border border-zinc-300 text-zinc-800 bg-transparent hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
      : "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200";
  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed"
    : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles} ${disabledStyles} ${className || ""}`}
    >
      {children}
    </button>
  );
}
