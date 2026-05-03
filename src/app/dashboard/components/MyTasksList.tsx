'use client';

import React from 'react';
import { Clock, ArrowRight, CheckCircle2, Circle } from 'lucide-react';
import Link from 'next/link';
import { TaskStatusBadge, PriorityBadge } from '@/components/ui/StatusBadge';

interface MyTask {
  id: string;
  title: string;
  project: string;
  status: 'todo' | 'in-progress' | 'in-review' | 'done' | 'blocked';
  priority: 'critical' | 'high' | 'medium' | 'low';
  dueDate: string;
  isOverdue: boolean;
}

const myTasks: MyTask[] = [
  {
    id: 'mytask-001',
    title: 'Fix memory leak in WebSocket handler',
    project: 'API Gateway v3',
    status: 'in-progress',
    priority: 'critical',
    dueDate: 'May 2',
    isOverdue: true,
  },
  {
    id: 'mytask-002',
    title: 'Write unit tests for auth middleware',
    project: 'Auth Service',
    status: 'todo',
    priority: 'high',
    dueDate: 'May 3',
    isOverdue: false,
  },
  {
    id: 'mytask-003',
    title: 'Review PR: Add pagination to /tasks endpoint',
    project: 'API Gateway v3',
    status: 'in-review',
    priority: 'medium',
    dueDate: 'May 2',
    isOverdue: true,
  },
  {
    id: 'mytask-004',
    title: 'Update Terraform modules for new region',
    project: 'Infra Upgrade',
    status: 'blocked',
    priority: 'high',
    dueDate: 'May 4',
    isOverdue: false,
  },
  {
    id: 'mytask-005',
    title: 'Design token migration — button variants',
    project: 'Dashboard UI',
    status: 'in-progress',
    priority: 'medium',
    dueDate: 'May 5',
    isOverdue: false,
  },
  {
    id: 'mytask-006',
    title: 'Implement Kafka dead-letter queue handler',
    project: 'Data Pipeline',
    status: 'todo',
    priority: 'high',
    dueDate: 'May 6',
    isOverdue: false,
  },
];

export default function MyTasksList() {
  const openTaskCount = myTasks.filter((task) => task.status !== 'done').length;

  return (
    <div className="card-base p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">My Tasks</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Assigned to you · {openTaskCount} open</p>
        </div>
        <Link href="/project-task-management" className="btn-ghost text-xs gap-1">
          View all
          <ArrowRight size={12} />
        </Link>
      </div>

      <div className="space-y-2 overflow-y-auto max-h-[340px] scrollbar-thin pr-1">
        {myTasks.map((task) => (
          <div
            key={task.id}
            className={`group flex items-start gap-3 p-3 rounded-lg border transition-all duration-150 cursor-pointer ${
              task.isOverdue
                ? 'bg-red-950/20 border-red-900/40 hover:border-red-700/60' :'border-transparent hover:bg-muted/40 hover:border-border'
            }`}
          >
            <div className="mt-0.5 flex-shrink-0 text-muted-foreground group-hover:text-foreground transition-colors">
              {task.status === 'done' ? (
                <CheckCircle2 size={16} className="text-green-400" />
              ) : (
                <Circle size={16} />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground leading-snug line-clamp-1">{task.title}</p>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className="text-xs text-muted-foreground">{task.project}</span>
                <span className="text-muted-foreground/40 text-xs">·</span>
                <TaskStatusBadge status={task.status} size="sm" />
                <PriorityBadge priority={task.priority} />
              </div>
            </div>

            <div className={`flex items-center gap-1 flex-shrink-0 ml-2 ${task.isOverdue ? 'text-red-400' : 'text-muted-foreground'}`}>
              <Clock size={11} />
              <span className="text-xs font-medium">{task.dueDate}</span>
              {task.isOverdue && <span className="text-xs font-semibold text-red-400">!</span>}
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/project-task-management"
        className="flex items-center justify-center gap-1.5 mt-4 pt-4 border-t border-border text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        Manage all tasks
        <ArrowRight size={12} />
      </Link>
    </div>
  );
}
