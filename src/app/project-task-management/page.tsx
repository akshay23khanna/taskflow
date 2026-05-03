import React from 'react';
import AppLayout from '@/components/AppLayout';
import { ToastProvider } from '@/components/ui/Toast';
import ProjectTaskClient from './components/ProjectTaskClient';

export default function ProjectTaskManagementPage() {
  return (
    <ToastProvider>
      <AppLayout>
        <ProjectTaskClient />
      </AppLayout>
    </ToastProvider>
  );
}