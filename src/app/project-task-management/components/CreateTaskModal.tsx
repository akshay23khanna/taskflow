'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, Plus } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { type Task, type TaskStatus, type Priority, teamMembers, projects } from './mockData';

interface CreateTaskFormData {
  title: string;
  description: string;
  projectId: string;
  assigneeId: string;
  priority: Priority;
  status: TaskStatus;
  dueDate: string;
  labels: string;
}

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (task: Task) => void;
  defaultProjectId: string | null;
}

export default function CreateTaskModal({
  isOpen,
  onClose,
  onCreate,
  defaultProjectId,
}: CreateTaskModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTaskFormData>({
    defaultValues: {
      projectId: defaultProjectId ?? projects[0].id,
      priority: 'medium',
      status: 'todo',
      assigneeId: teamMembers[0].id,
    },
  });

  // BACKEND INTEGRATION: Replace with real task creation API call
  const onSubmit = async (data: CreateTaskFormData) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    const assignee = teamMembers.find((m) => m.id === data.assigneeId) ?? teamMembers[0];
    const project = projects.find((p) => p.id === data.projectId) ?? projects[0];
    const labelArr = data.labels
      ? data.labels.split(',').map((l) => l.trim()).filter(Boolean)
      : [];

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: data.title,
      description: data.description,
      projectId: project.id,
      projectName: project.name,
      assigneeId: assignee.id,
      assigneeName: assignee.name,
      assigneeInitials: assignee.initials,
      assigneeColor: assignee.color,
      status: data.status,
      priority: data.priority,
      dueDate: data.dueDate ? new Date(data.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'No due date',
      createdDate: 'May 2, 2026',
      labels: labelArr,
      isOverdue: false,
      commentCount: 0,
    };

    setIsLoading(false);
    onCreate(newTask);
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Task" description="Add a new task to your project" size="md">
      <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 space-y-5" noValidate>
        {/* Title */}
        <div>
          <label htmlFor="task-title" className="block text-sm font-medium text-foreground mb-1.5">
            Task title <span className="text-red-400">*</span>
          </label>
          <input
            id="task-title"
            type="text"
            className={`input-field ${errors.title ? 'border-red-600 focus:ring-red-600' : ''}`}
            placeholder="e.g. Fix memory leak in WebSocket handler"
            {...register('title', {
              required: 'Task title is required',
              minLength: { value: 5, message: 'Title must be at least 5 characters' },
            })}
          />
          {errors.title && <p className="mt-1.5 text-xs text-red-400">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="task-description" className="block text-sm font-medium text-foreground mb-1.5">
            Description
          </label>
          <p className="text-xs text-muted-foreground mb-1.5">Provide context, acceptance criteria, or links</p>
          <textarea
            id="task-description"
            rows={3}
            className="input-field resize-none"
            placeholder="Describe the task, expected behavior, and any relevant context..."
            {...register('description')}
          />
        </div>

        {/* Project + Assignee */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="task-project" className="block text-sm font-medium text-foreground mb-1.5">
              Project <span className="text-red-400">*</span>
            </label>
            <select
              id="task-project"
              className={`input-field ${errors.projectId ? 'border-red-600' : ''}`}
              {...register('projectId', { required: 'Project is required' })}
            >
              {projects.map((p) => (
                <option key={`create-proj-${p.id}`} value={p.id}>{p.name}</option>
              ))}
            </select>
            {errors.projectId && <p className="mt-1.5 text-xs text-red-400">{errors.projectId.message}</p>}
          </div>

          <div>
            <label htmlFor="task-assignee" className="block text-sm font-medium text-foreground mb-1.5">
              Assignee <span className="text-red-400">*</span>
            </label>
            <select
              id="task-assignee"
              className="input-field"
              {...register('assigneeId', { required: true })}
            >
              {teamMembers.map((m) => (
                <option key={`create-member-${m.id}`} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Priority + Status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="task-priority" className="block text-sm font-medium text-foreground mb-1.5">
              Priority <span className="text-red-400">*</span>
            </label>
            <select
              id="task-priority"
              className="input-field"
              {...register('priority', { required: true })}
            >
              <option value="critical">⚡ Critical</option>
              <option value="high">↑ High</option>
              <option value="medium">→ Medium</option>
              <option value="low">↓ Low</option>
            </select>
          </div>

          <div>
            <label htmlFor="task-status" className="block text-sm font-medium text-foreground mb-1.5">
              Initial Status
            </label>
            <select
              id="task-status"
              className="input-field"
              {...register('status')}
            >
              <option value="backlog">Backlog</option>
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="in-review">In Review</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>

        {/* Due Date + Labels */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="task-due" className="block text-sm font-medium text-foreground mb-1.5">
              Due Date
            </label>
            <input
              id="task-due"
              type="date"
              className="input-field"
              {...register('dueDate')}
            />
          </div>

          <div>
            <label htmlFor="task-labels" className="block text-sm font-medium text-foreground mb-1.5">
              Labels
            </label>
            <p className="text-xs text-muted-foreground mb-1.5">Comma-separated, e.g. bug, backend</p>
            <input
              id="task-labels"
              type="text"
              className="input-field"
              placeholder="bug, backend, security"
              {...register('labels')}
            />
          </div>
        </div>

        {/* Required fields note */}
        <p className="text-xs text-muted-foreground">
          <span className="text-red-400">*</span> Required fields
        </p>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-border">
          <button
            type="button"
            onClick={() => { reset(); onClose(); }}
            className="btn-secondary"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary gap-2"
            disabled={isLoading}
            style={{ minWidth: '120px' }}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 size={14} className="animate-spin" />
                Creating...
              </span>
            ) : (
              <>
                <Plus size={14} />
                Create Task
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}