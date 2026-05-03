'use client';

import React from 'react';
import { Plus, Layers } from 'lucide-react';
import { type Project, type ProjectStatus } from './mockData';
import { ProjectStatusBadge } from '@/components/ui/StatusBadge';

interface ProjectSidebarProps {
  projects: Project[];
  selectedProjectId: string | null;
  onSelectProject: (id: string | null) => void;
  onCreateTask: () => void;
}

export default function ProjectSidebar({
  projects,
  selectedProjectId,
  onSelectProject,
  onCreateTask,
}: ProjectSidebarProps) {
  return (
    <div className="w-64 xl:w-72 flex-shrink-0 border-r border-border flex flex-col h-full bg-card">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground">Projects</h2>
          <button
            onClick={onCreateTask}
            className="btn-primary px-2.5 py-1.5 text-xs gap-1.5"
          >
            <Plus size={13} />
            New Task
          </button>
        </div>

        {/* All Tasks */}
        <button
          onClick={() => onSelectProject(null)}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
            selectedProjectId === null
              ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:bg-muted hover:text-foreground'
          }`}
        >
          <Layers size={15} className="flex-shrink-0" />
          <span className="font-medium">All Tasks</span>
          <span className="ml-auto text-xs font-tabular opacity-60">
            {projects.reduce((s, p) => s + p.taskCount, 0)}
          </span>
        </button>
      </div>

      {/* Project List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin py-2 px-2">
        {projects.map((project) => {
          const isSelected = selectedProjectId === project.id;
          const progressPct = Math.round((project.completedCount / project.taskCount) * 100);

          return (
            <button
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              className={`w-full text-left px-3 py-3 rounded-xl mb-1 transition-all duration-150 group ${
                isSelected
                  ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted border border-transparent'
              }`}
            >
              <div className="flex items-start gap-2.5 mb-2">
                <div className={`w-2.5 h-2.5 rounded-sm mt-1 flex-shrink-0 ${project.color}`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                    {project.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <ProjectStatusBadge status={project.status} />
                  </div>
                </div>
                <span className="text-xs text-muted-foreground font-tabular flex-shrink-0">
                  {project.taskCount}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="ml-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">{project.completedCount}/{project.taskCount} done</span>
                  <span className="text-xs text-muted-foreground font-tabular">{progressPct}%</span>
                </div>
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${progressPct}%`,
                      background: isSelected ? 'var(--primary)' : '#52525b',
                    }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          {projects.length} active projects · {projects.reduce((s, p) => s + p.memberCount, 0)} members
        </p>
      </div>
    </div>
  );
}