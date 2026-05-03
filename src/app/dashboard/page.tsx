import React from 'react';
import AppLayout from '@/components/AppLayout';
import DashboardHeader from './components/DashboardHeader';
import KPIBentoGrid from './components/KPIBentoGrid';
import DashboardCharts from './components/DashboardCharts';
import ActivityAndTasks from './components/ActivityAndTasks';
import { ToastProvider } from '@/components/ui/Toast';

export default function DashboardPage() {
  return (
    <ToastProvider>
      <AppLayout>
        <div className="px-6 lg:px-8 xl:px-10 py-6 max-w-screen-2xl mx-auto">
          <DashboardHeader />
          <KPIBentoGrid />
          <DashboardCharts />
          <ActivityAndTasks />
        </div>
      </AppLayout>
    </ToastProvider>
  );
}