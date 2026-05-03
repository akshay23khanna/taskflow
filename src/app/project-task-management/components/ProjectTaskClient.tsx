'use client';

import React, { useState } from 'react';
import ProjectSidebar from './ProjectSidebar';
import TaskTableSection from './TaskTableSection';
import TaskDetailModal from './TaskDetailModal';
import CreateTaskModal from './CreateTaskModal';
import { tasks as initialTasks, projects, type Task } from './mockData';
import { useToast } from '@/components/ui/Toast';

export default function ProjectTaskClient() {
  const { toast } = useToast();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [taskList, setTaskList] = useState<Task[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredTasks = selectedProjectId
    ? taskList.filter((t) => t.projectId === selectedProjectId)
    : taskList;

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTaskList((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
    toast('success', 'Status updated', `Task moved to ${newStatus}`);
  };

  const handleDeleteTask = (taskId: string) => {
    setTaskList((prev) => prev.filter((t) => t.id !== taskId));
    toast('success', 'Task deleted', 'Task removed from project');
    if (selectedTask?.id === taskId) {
      setIsDetailOpen(false);
      setSelectedTask(null);
    }
  };

  const handleBulkDelete = (taskIds: string[]) => {
    setTaskList((prev) => prev.filter((t) => !taskIds.includes(t.id)));
    toast('success', `${taskIds.length} tasks deleted`, 'Bulk action completed');
  };

  const handleCreateTask = (task: Task) => {
    setTaskList((prev) => [task, ...prev]);
    toast('success', 'Task created', task.title);
    setIsCreateOpen(false);
  };

  const handleOpenDetail = (task: Task) => {
    setSelectedTask(task);
    setIsDetailOpen(true);
  };

  return (
    <div className="flex h-full min-h-screen">
      <ProjectSidebar
        projects={projects}
        selectedProjectId={selectedProjectId}
        onSelectProject={setSelectedProjectId}
        onCreateTask={() => setIsCreateOpen(true)}
      />

      <div className="flex-1 overflow-hidden flex flex-col">
        <TaskTableSection
          tasks={filteredTasks}
          selectedProjectId={selectedProjectId}
          onStatusChange={handleStatusChange}
          onDeleteTask={handleDeleteTask}
          onBulkDelete={handleBulkDelete}
          onOpenDetail={handleOpenDetail}
          onCreateTask={() => setIsCreateOpen(true)}
        />
      </div>

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteTask}
        />
      )}

      <CreateTaskModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreateTask}
        defaultProjectId={selectedProjectId}
      />
    </div>
  );
}