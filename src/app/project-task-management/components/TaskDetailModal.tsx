'use client';

import React, { useState } from 'react';
import {
  Calendar, Tag, MessageSquare, User, FolderOpen,
  Trash2, ExternalLink, Clock, AlertTriangle,
} from 'lucide-react';
import Modal, { ConfirmModal } from '@/components/ui/Modal';
import { PriorityBadge } from '@/components/ui/StatusBadge';
import StatusDropdown from './StatusDropdown';
import { type Task, type TaskStatus } from './mockData';
import Icon from '@/components/ui/AppIcon';


interface TaskDetailModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}

export default function TaskDetailModal({
  task,
  isOpen,
  onClose,
  onStatusChange,
  onDelete,
}: TaskDetailModalProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    onDelete(task.id);
    setConfirmDelete(false);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Task Details" size="lg">
        <div className="px-6 py-5 space-y-6">
          {/* Title + Overdue Banner */}
          {task.isOverdue && task.status !== 'done' && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-950/40 border border-red-800">
              <AlertTriangle size={14} className="text-red-400 flex-shrink-0" />
              <p className="text-xs text-red-400 font-medium">
                This task is overdue — was due {task.dueDate}
              </p>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-foreground leading-snug mb-3">{task.title}</h3>
            <div className="flex items-center gap-3 flex-wrap">
              <StatusDropdown
                taskId={task.id}
                currentStatus={task.status}
                onStatusChange={onStatusChange}
              />
              <PriorityBadge priority={task.priority} />
              {task.labels.map((label) => (
                <span
                  key={`detail-label-${task.id}-${label}`}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-xs border border-border"
                >
                  <Tag size={10} />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Description</h4>
            <p className="text-sm text-foreground leading-relaxed bg-muted/30 rounded-lg p-3 border border-border">
              {task.description || 'No description provided.'}
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: FolderOpen, label: 'Project', value: task.projectName },
              { icon: User, label: 'Assignee', value: task.assigneeName },
              { icon: Calendar, label: 'Due Date', value: task.dueDate, isOverdue: task.isOverdue && task.status !== 'done' },
              { icon: Clock, label: 'Created', value: task.createdDate },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={`detail-meta-${item.label}`} className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Icon size={13} className="text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{item.label}</span>
                  </div>
                  <p className={`text-sm font-medium pl-5 ${(item as { isOverdue?: boolean }).isOverdue ? 'text-red-400' : 'text-foreground'}`}>
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Comments placeholder */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare size={14} className="text-muted-foreground" />
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Comments ({task.commentCount})
              </h4>
            </div>
            {task.commentCount === 0 ? (
              <p className="text-xs text-muted-foreground pl-5">No comments yet — be the first to add context.</p>
            ) : (
              <div className="space-y-3">
                {Array.from({ length: Math.min(task.commentCount, 3) }).map((_, i) => {
                  const commentUsers = ['Rohan Lal', 'Priya Sharma', 'Arjun Mehta'];
                  const commentTexts = [
                    'Looking into this now — reproducing locally first.',
                    'Found the root cause. Will push a fix shortly.',
                    'PR is up for review: #247',
                  ];
                  return (
                    <div key={`comment-${task.id}-${i}`} className="flex items-start gap-2.5 pl-1">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span style={{ fontSize: '9px' }} className="font-bold text-white">
                          {commentUsers[i % commentUsers.length].split(' ').map((n) => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1 bg-muted/30 rounded-lg p-2.5 border border-border">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-foreground">{commentUsers[i % commentUsers.length]}</span>
                          <span className="text-xs text-muted-foreground">{i === 0 ? '2 hr ago' : i === 1 ? '1 hr ago' : '30 min ago'}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{commentTexts[i % commentTexts.length]}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {/* BACKEND INTEGRATION: Connect to real-time comment API here */}
            <div className="mt-3 pl-1">
              <textarea
                placeholder="Add a comment..."
                className="input-field text-xs resize-none"
                rows={2}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <button
              onClick={() => setConfirmDelete(true)}
              className="btn-ghost text-red-400 hover:text-red-300 hover:bg-red-950/30 gap-2 text-xs"
            >
              <Trash2 size={13} />
              Delete Task
            </button>
            <div className="flex items-center gap-2">
              <button onClick={onClose} className="btn-secondary text-sm">
                Close
              </button>
              <button className="btn-primary gap-2 text-sm">
                <ExternalLink size={13} />
                Open Full View
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={handleDelete}
        title="Delete Task"
        message={`"${task.title}" will be permanently deleted. This action cannot be undone.`}
        confirmLabel="Delete Task"
        isDestructive
      />
    </>
  );
}