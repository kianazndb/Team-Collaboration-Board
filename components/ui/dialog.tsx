"use client";

import React from "react";

export const Dialog = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
export const DialogTrigger = ({ 
  children, 
  asChild 
}: { 
  children: React.ReactNode;
  asChild?: boolean;
}) => {
  if (asChild && React.isValidElement(children)) {
    return children;
  }
  return <div>{children}</div>;
};
export const DialogContent = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
export const DialogHeader = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
export const DialogTitle = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
