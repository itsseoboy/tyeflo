"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClipboardBarProps {
  items: string[];
  copied: boolean;
  onRemoveLast: () => void;
  onClear: () => void;
  onCopyAll: () => void;
}

export function ClipboardBar({ items, copied, onClear, onCopyAll }: ClipboardBarProps) {
  if (items.length === 0) return null;

  return (
    <div className="sticky bottom-0 z-40 pb-3">
      <div>
        <button type="button" onClick={onCopyAll}
          className={cn("block w-full rounded-2xl border-2 bg-card p-3 text-left shadow-lg transition-all",
            copied ? "border-primary bg-primary/5" : "border-primary shadow-glow")}
          aria-label="Click to copy all fonts">
          <div className="mb-1 flex items-center gap-1.5">
            <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-primary text-primary-foreground")}>Editor</span>
            <span className="text-[11px] text-muted-foreground">{items.length} font{items.length > 1 ? "s" : ""} copied</span>
            <span className="ml-auto text-[11px] font-medium text-primary">{copied ? "Copied!" : "Click anywhere to copy"}</span>
          </div>
          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto">
            {items.map((it, i) => (
              <span key={i} className={cn("shrink-0 whitespace-nowrap rounded-lg px-2 py-1 text-sm",
                i === 0 ? "bg-primary/10 font-medium text-foreground" : "bg-muted text-muted-foreground")} dir="auto">
                {it.slice(0, 24)}{it.length > 24 ? "…" : ""}
              </span>
            ))}
          </div>
        </button>

        <div className="mt-2 flex justify-center">
          <button type="button" onClick={onClear}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:bg-destructive/10 hover:text-destructive"
            aria-label="Clear editor and remove all copied fonts">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
