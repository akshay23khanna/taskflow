'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ChartSkeleton } from '@/components/ui/LoadingSkeleton';

const TaskCompletionChart = dynamic(() => import('./TaskCompletionChart'), {
  ssr: false,
  loading: () => <ChartSkeleton height={220} />,
});

const TasksByProjectChart = dynamic(() => import('./TasksByProjectChart'), {
  ssr: false,
  loading: () => <ChartSkeleton height={220} />,
});

const StatusDistributionChart = dynamic(() => import('./StatusDistributionChart'), {
  ssr: false,
  loading: () => <ChartSkeleton height={220} />,
});

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 mb-8">
      <div className="lg:col-span-2 card-base p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Task Completion Trend</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Last 14 days · Sprint 14</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">Completed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-xs text-muted-foreground">Created</span>
            </div>
          </div>
        </div>
        <TaskCompletionChart />
      </div>

      <div className="card-base p-5">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-foreground">Status Distribution</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Current sprint tasks</p>
        </div>
        <StatusDistributionChart />
      </div>

      <div className="lg:col-span-3 card-base p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Tasks by Project</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Open tasks per active project</p>
          </div>
        </div>
        <TasksByProjectChart />
      </div>
    </div>
  );
}