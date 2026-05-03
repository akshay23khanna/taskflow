import React from 'react';

type TaskStatus = 'backlog' | 'todo' | 'in-progress' | 'in-review' | 'done' | 'blocked';
type ProjectStatus = 'planning' | 'active' | 'on-hold' | 'completed' | 'archived';

const taskStatusConfig: Record<TaskStatus, { label: string; className: string; dot: string }> = {
  backlog: { label: 'Backlog', className: 'bg-zinc-800 text-zinc-400 border border-zinc-700', dot: 'bg-zinc-500' },
  todo: { label: 'Todo', className: 'bg-blue-950 text-blue-400 border border-blue-800', dot: 'bg-blue-400' },
  'in-progress': { label: 'In Progress', className: 'bg-violet-950 text-violet-400 border border-violet-800', dot: 'bg-violet-400' },
  'in-review': { label: 'In Review', className: 'bg-amber-950 text-amber-400 border border-amber-800', dot: 'bg-amber-400' },
  done: { label: 'Done', className: 'bg-green-950 text-green-400 border border-green-800', dot: 'bg-green-400' },
  blocked: { label: 'Blocked', className: 'bg-red-950 text-red-400 border border-red-800', dot: 'bg-red-400' },
};

const projectStatusConfig: Record<ProjectStatus, { label: string; className: string }> = {
  planning: { label: 'Planning', className: 'bg-zinc-800 text-zinc-400 border border-zinc-700' },
  active: { label: 'Active', className: 'bg-green-950 text-green-400 border border-green-800' },
  'on-hold': { label: 'On Hold', className: 'bg-amber-950 text-amber-400 border border-amber-800' },
  completed: { label: 'Completed', className: 'bg-blue-950 text-blue-400 border border-blue-800' },
  archived: { label: 'Archived', className: 'bg-zinc-800 text-zinc-400 border border-zinc-700' },
};

interface TaskStatusBadgeProps {
  status: TaskStatus;
  size?: 'sm' | 'md';
}

export function TaskStatusBadge({ status, size = 'md' }: TaskStatusBadgeProps) {
  const config = taskStatusConfig[status];
  return (
    <span className={`status-badge ${config.className} ${size === 'sm' ? 'text-xs px-1.5 py-0.5' : ''}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} flex-shrink-0`} />
      {config.label}
    </span>
  );
}

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
}

export function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
  const config = projectStatusConfig[status];
  return (
    <span className={`status-badge ${config.className}`}>
      {config.label}
    </span>
  );
}

type Priority = 'critical' | 'high' | 'medium' | 'low';

const priorityConfig: Record<Priority, { label: string; className: string; icon: string }> = {
  critical: { label: 'Critical', className: 'bg-red-950 text-red-400 border border-red-800', icon: '⚡' },
  high: { label: 'High', className: 'bg-orange-950 text-orange-400 border border-orange-800', icon: '↑' },
  medium: { label: 'Medium', className: 'bg-amber-950 text-amber-400 border border-amber-800', icon: '→' },
  low: { label: 'Low', className: 'bg-zinc-800 text-zinc-400 border border-zinc-700', icon: '↓' },
};

interface PriorityBadgeProps {
  priority: Priority;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const config = priorityConfig[priority];
  return (
    <span className={`priority-badge ${config.className}`}>
      <span className="text-xs">{config.icon}</span>
      {config.label}
    </span>
  );
}