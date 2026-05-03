'use client';

import React, { useState, useMemo } from 'react';
import {
  Search, Filter, ChevronUp, ChevronDown, ChevronsUpDown,
  Trash2, Edit3, Eye, Plus, X, CheckSquare, Square,
  SlidersHorizontal,
} from 'lucide-react';
import { type Task, type TaskStatus, type Priority, teamMembers, projects } from './mockData';
import { PriorityBadge } from '@/components/ui/StatusBadge';

import { ConfirmModal } from '@/components/ui/Modal';
import StatusDropdown from './StatusDropdown';
import Icon from '@/components/ui/AppIcon';


type SortKey = 'title' | 'projectName' | 'assigneeName' | 'priority' | 'status' | 'dueDate' | 'createdDate';
type SortDir = 'asc' | 'desc';

const priorityOrder: Record<Priority, number> = { critical: 0, high: 1, medium: 2, low: 3 };
const statusOrder: Record<TaskStatus, number> = { blocked: 0, 'in-progress': 1, 'in-review': 2, todo: 3, backlog: 4, done: 5 };

interface TaskTableSectionProps {
  tasks: Task[];
  selectedProjectId: string | null;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onDeleteTask: (taskId: string) => void;
  onBulkDelete: (taskIds: string[]) => void;
  onOpenDetail: (task: Task) => void;
  onCreateTask: () => void;
}

export default function TaskTableSection({
  tasks,
  selectedProjectId,
  onStatusChange,
  onDeleteTask,
  onBulkDelete,
  onOpenDetail,
  onCreateTask,
}: TaskTableSectionProps) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'all'>('all');
  const [filterPriority, setFilterPriority] = useState<Priority | 'all'>('all');
  const [filterAssignee, setFilterAssignee] = useState<string>('all');
  const [sortKey, setSortKey] = useState<SortKey>('dueDate');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmBulkDelete, setConfirmBulkDelete] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = useMemo(() => {
    let result = [...tasks];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.projectName.toLowerCase().includes(q) ||
          t.assigneeName.toLowerCase().includes(q) ||
          t.labels.some((l) => l.toLowerCase().includes(q))
      );
    }
    if (filterStatus !== 'all') result = result.filter((t) => t.status === filterStatus);
    if (filterPriority !== 'all') result = result.filter((t) => t.priority === filterPriority);
    if (filterAssignee !== 'all') result = result.filter((t) => t.assigneeId === filterAssignee);

    result.sort((a, b) => {
      let valA: string | number = '';
      let valB: string | number = '';
      if (sortKey === 'priority') { valA = priorityOrder[a.priority]; valB = priorityOrder[b.priority]; }
      else if (sortKey === 'status') { valA = statusOrder[a.status]; valB = statusOrder[b.status]; }
      else { valA = (a[sortKey] as string).toLowerCase(); valB = (b[sortKey] as string).toLowerCase(); }
      if (valA < valB) return sortDir === 'asc' ? -1 : 1;
      if (valA > valB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return result;
  }, [tasks, search, filterStatus, filterPriority, filterAssignee, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
    setPage(1);
  };

  const toggleRow = (id: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedRows.size === paginated.length) setSelectedRows(new Set());
    else setSelectedRows(new Set(paginated.map((t) => t.id)));
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronsUpDown size={13} className="opacity-40" />;
    return sortDir === 'asc' ? <ChevronUp size={13} /> : <ChevronDown size={13} />;
  };

  const projectName = selectedProjectId
    ? projects.find((p) => p.id === selectedProjectId)?.name ?? 'Project' :'All Tasks';

  const activeFilters = [
    filterStatus !== 'all' && `Status: ${filterStatus}`,
    filterPriority !== 'all' && `Priority: ${filterPriority}`,
    filterAssignee !== 'all' && `Assignee: ${teamMembers.find((m) => m.id === filterAssignee)?.name}`,
  ].filter(Boolean) as string[];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border flex-shrink-0">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div>
            <h2 className="text-base font-semibold text-foreground">{projectName}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {filtered.length} task{filtered.length !== 1 ? 's' : ''}
              {search || activeFilters.length > 0 ? ' matching filters' : ' total'}
            </p>
          </div>
          <button onClick={onCreateTask} className="btn-primary gap-2 text-sm flex-shrink-0">
            <Plus size={15} />
            Create Task
          </button>
        </div>

        {/* Search + Filter Bar */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search tasks, projects, labels..."
              className="input-field pl-9 text-sm py-2"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={13} />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilters((f) => !f)}
            className={`btn-secondary gap-2 text-sm py-2 flex-shrink-0 ${showFilters ? 'border-primary/40 text-primary' : ''}`}
          >
            <SlidersHorizontal size={14} />
            Filters
            {activeFilters.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                {activeFilters.length}
              </span>
            )}
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-3 p-3 rounded-xl bg-muted border border-border flex flex-wrap gap-3 animate-slide-up">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => { setFilterStatus(e.target.value as TaskStatus | 'all'); setPage(1); }}
                className="input-field py-1.5 text-xs min-w-[130px]"
              >
                <option value="all">All statuses</option>
                <option value="backlog">Backlog</option>
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="in-review">In Review</option>
                <option value="done">Done</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">Priority</label>
              <select
                value={filterPriority}
                onChange={(e) => { setFilterPriority(e.target.value as Priority | 'all'); setPage(1); }}
                className="input-field py-1.5 text-xs min-w-[120px]"
              >
                <option value="all">All priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">Assignee</label>
              <select
                value={filterAssignee}
                onChange={(e) => { setFilterAssignee(e.target.value); setPage(1); }}
                className="input-field py-1.5 text-xs min-w-[140px]"
              >
                <option value="all">All members</option>
                {teamMembers.map((m) => (
                  <option key={`filter-member-${m.id}`} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
            {activeFilters.length > 0 && (
              <div className="flex items-end">
                <button
                  onClick={() => { setFilterStatus('all'); setFilterPriority('all'); setFilterAssignee('all'); setPage(1); }}
                  className="btn-ghost text-xs gap-1 py-1.5"
                >
                  <X size={12} />
                  Clear filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Active Filter Chips */}
        {activeFilters.length > 0 && !showFilters && (
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {activeFilters.map((f) => (
              <span key={`chip-${f}`} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs border border-primary/20">
                {f}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bulk Action Bar */}
      {selectedRows.size > 0 && (
        <div className="px-6 py-2 bg-primary/5 border-b border-primary/20 flex items-center gap-4 flex-shrink-0 animate-slide-up">
          <span className="text-sm font-medium text-primary">
            {selectedRows.size} task{selectedRows.size > 1 ? 's' : ''} selected
          </span>
          <button
            onClick={() => setConfirmBulkDelete(true)}
            className="btn-danger gap-1.5 py-1.5 text-xs"
          >
            <Trash2 size={13} />
            Delete selected
          </button>
          <button
            onClick={() => setSelectedRows(new Set())}
            className="btn-ghost text-xs gap-1"
          >
            <X size={12} />
            Deselect
          </button>
        </div>
      )}

      {/* Table */}
      <div className="flex-1 overflow-auto scrollbar-thin">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
              <Search size={22} className="text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">No tasks found</p>
              <p className="text-xs text-muted-foreground mt-1">
                {search || activeFilters.length > 0
                  ? 'Try adjusting your search or filters' :'Create your first task to get started'}
              </p>
            </div>
            {!search && activeFilters.length === 0 && (
              <button onClick={onCreateTask} className="btn-primary gap-2 text-sm">
                <Plus size={14} />
                Create Task
              </button>
            )}
          </div>
        ) : (
          <table className="w-full min-w-[900px]">
            <thead className="sticky top-0 bg-card border-b border-border z-10">
              <tr>
                <th className="px-4 py-3 w-10">
                  <button onClick={toggleAll} className="text-muted-foreground hover:text-foreground transition-colors">
                    {selectedRows.size === paginated.length && paginated.length > 0
                      ? <CheckSquare size={15} className="text-primary" />
                      : <Square size={15} />}
                  </button>
                </th>
                {([
                  { key: 'title', label: 'Task' },
                  { key: 'projectName', label: 'Project' },
                  { key: 'assigneeName', label: 'Assignee' },
                  { key: 'priority', label: 'Priority' },
                  { key: 'status', label: 'Status' },
                  { key: 'dueDate', label: 'Due Date' },
                  { key: 'createdDate', label: 'Created' },
                ] as { key: SortKey; label: string }[]).map((col) => (
                  <th
                    key={`th-${col.key}`}
                    className="table-header-cell"
                    onClick={() => handleSort(col.key)}
                  >
                    <span className="flex items-center gap-1">
                      {col.label}
                      <SortIcon col={col.key} />
                    </span>
                  </th>
                ))}
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider text-right w-24">
                  Labels
                </th>
                <th className="px-4 py-3 w-24" />
              </tr>
            </thead>
            <tbody>
              {paginated.map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  isSelected={selectedRows.has(task.id)}
                  onToggle={() => toggleRow(task.id)}
                  onStatusChange={onStatusChange}
                  onDelete={() => setConfirmDeleteId(task.id)}
                  onView={() => onOpenDetail(task)}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {filtered.length > 0 && (
        <div className="px-6 py-3 border-t border-border flex items-center justify-between flex-shrink-0 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              Showing {Math.min((page - 1) * pageSize + 1, filtered.length)}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}
            </span>
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
              className="input-field py-1 text-xs w-24"
            >
              {[10, 20, 50].map((n) => (
                <option key={`pagesize-${n}`} value={n}>{n} per page</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(1)}
              disabled={page === 1}
              className="btn-ghost px-2 py-1 text-xs disabled:opacity-40"
            >
              «
            </button>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="btn-ghost px-2 py-1 text-xs disabled:opacity-40"
            >
              ‹
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
              return (
                <button
                  key={`page-${pageNum}`}
                  onClick={() => setPage(pageNum)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    page === pageNum
                      ? 'bg-primary text-white' :'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="btn-ghost px-2 py-1 text-xs disabled:opacity-40"
            >
              ›
            </button>
            <button
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              className="btn-ghost px-2 py-1 text-xs disabled:opacity-40"
            >
              »
            </button>
          </div>
        </div>
      )}

      {/* Confirm Delete Single */}
      <ConfirmModal
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={() => { if (confirmDeleteId) { onDeleteTask(confirmDeleteId); setConfirmDeleteId(null); } }}
        title="Delete Task"
        message="This task will be permanently deleted. This action cannot be undone."
        confirmLabel="Delete Task"
        isDestructive
      />

      {/* Confirm Bulk Delete */}
      <ConfirmModal
        isOpen={confirmBulkDelete}
        onClose={() => setConfirmBulkDelete(false)}
        onConfirm={() => { onBulkDelete(Array.from(selectedRows)); setSelectedRows(new Set()); setConfirmBulkDelete(false); }}
        title={`Delete ${selectedRows.size} Tasks`}
        message={`You are about to permanently delete ${selectedRows.size} tasks. This cannot be undone.`}
        confirmLabel={`Delete ${selectedRows.size} Tasks`}
        isDestructive
      />
    </div>
  );
}

interface TaskRowProps {
  task: Task;
  isSelected: boolean;
  onToggle: () => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onDelete: () => void;
  onView: () => void;
}

function TaskRow({ task, isSelected, onToggle, onStatusChange, onDelete, onView }: TaskRowProps) {
  const [hovering, setHovering] = useState(false);
  const [tooltipAction, setTooltipAction] = useState<string | null>(null);

  return (
    <tr
      className={`border-b border-border transition-colors duration-100 ${
        isSelected ? 'bg-primary/5' : hovering ? 'bg-muted/40' : ''
      } ${task.isOverdue && task.status !== 'done' ? 'border-l-2 border-l-red-600' : ''}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => { setHovering(false); setTooltipAction(null); }}
    >
      <td className="px-4 py-3 w-10">
        <button onClick={onToggle} className="text-muted-foreground hover:text-foreground transition-colors">
          {isSelected ? <CheckSquare size={15} className="text-primary" /> : <Square size={15} />}
        </button>
      </td>
      <td className="table-cell max-w-[240px]">
        <div>
          <button
            onClick={onView}
            className="text-sm text-foreground hover:text-primary transition-colors text-left font-medium line-clamp-1"
          >
            {task.title}
          </button>
          {task.isOverdue && task.status !== 'done' && (
            <span className="text-xs text-red-400 font-medium">Overdue</span>
          )}
        </div>
      </td>
      <td className="table-cell">
        <span className="text-xs text-muted-foreground">{task.projectName}</span>
      </td>
      <td className="table-cell">
        <div className="flex items-center gap-2">
          <div
            className={`w-6 h-6 rounded-full bg-gradient-to-br ${task.assigneeColor} flex items-center justify-center flex-shrink-0`}
          >
            <span className="text-xs font-bold text-white" style={{ fontSize: '9px' }}>{task.assigneeInitials}</span>
          </div>
          <span className="text-xs text-muted-foreground truncate max-w-[80px]">{task.assigneeName.split(' ')[0]}</span>
        </div>
      </td>
      <td className="table-cell">
        <PriorityBadge priority={task.priority} />
      </td>
      <td className="table-cell">
        <StatusDropdown
          taskId={task.id}
          currentStatus={task.status}
          onStatusChange={onStatusChange}
        />
      </td>
      <td className="table-cell">
        <span className={`text-xs font-tabular ${task.isOverdue && task.status !== 'done' ? 'text-red-400 font-medium' : 'text-muted-foreground'}`}>
          {task.dueDate}
        </span>
      </td>
      <td className="table-cell">
        <span className="text-xs text-muted-foreground font-tabular">{task.createdDate}</span>
      </td>
      <td className="table-cell text-right">
        <div className="flex items-center justify-end gap-1 flex-wrap max-w-[120px] ml-auto">
          {task.labels.slice(0, 2).map((label) => (
            <span
              key={`label-${task.id}-${label}`}
              className="px-1.5 py-0.5 rounded-md bg-muted text-muted-foreground text-xs border border-border"
            >
              {label}
            </span>
          ))}
          {task.labels.length > 2 && (
            <span className="text-xs text-muted-foreground">+{task.labels.length - 2}</span>
          )}
        </div>
      </td>
      <td className="table-cell w-24">
        <div className={`flex items-center gap-1 justify-end transition-opacity duration-150 ${hovering ? 'opacity-100' : 'opacity-0'}`}>
          {[
            { icon: Eye, action: 'view', label: 'View task details', onClick: onView },
            { icon: Edit3, action: 'edit', label: 'Edit task', onClick: onView },
            { icon: Trash2, action: 'delete', label: 'Delete task — cannot be undone', onClick: onDelete },
          ].map((btn) => {
            const Icon = btn.icon;
            return (
              <div
                key={`action-${task.id}-${btn.action}`}
                className="relative"
                onMouseEnter={() => setTooltipAction(btn.action)}
                onMouseLeave={() => setTooltipAction(null)}
              >
                <button
                  onClick={btn.onClick}
                  className={`p-1.5 rounded-md transition-colors duration-150 ${
                    btn.action === 'delete'
                      ? 'text-muted-foreground hover:text-red-400 hover:bg-red-950/40' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  aria-label={btn.label}
                >
                  <Icon size={13} />
                </button>
                {tooltipAction === btn.action && (
                  <div className="tooltip-base bottom-full mb-2 left-1/2 -translate-x-1/2">
                    {btn.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </td>
    </tr>
  );
}