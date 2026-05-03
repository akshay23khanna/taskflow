'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { type TaskStatus } from './mockData';
import { TaskStatusBadge } from '@/components/ui/StatusBadge';

const statusOptions: TaskStatus[] = ['backlog', 'todo', 'in-progress', 'in-review', 'done', 'blocked'];

interface StatusDropdownProps {
  taskId: string;
  currentStatus: TaskStatus;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
}

export default function StatusDropdown({ taskId, currentStatus, onStatusChange }: StatusDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 group"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <TaskStatusBadge status={currentStatus} size="sm" />
        <ChevronDown
          size={11}
          className="text-muted-foreground group-hover:text-foreground transition-colors opacity-0 group-hover:opacity-100"
        />
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-1 z-30 w-36 bg-zinc-900 border border-border rounded-xl shadow-2xl py-1 animate-slide-up"
          role="listbox"
        >
          {statusOptions.map((status) => (
            <button
              key={`status-opt-${taskId}-${status}`}
              role="option"
              aria-selected={status === currentStatus}
              onClick={() => { onStatusChange(taskId, status); setOpen(false); }}
              className={`w-full flex items-center px-3 py-2 hover:bg-muted transition-colors ${
                status === currentStatus ? 'bg-primary/10' : ''
              }`}
            >
              <TaskStatusBadge status={status} size="sm" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}