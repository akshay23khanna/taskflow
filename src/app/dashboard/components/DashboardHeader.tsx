'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw, Plus, Bell } from 'lucide-react';
import Link from 'next/link';

export default function DashboardHeader() {
  const [lastUpdated, setLastUpdated] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const now = new Date();
    setLastUpdated(
      now?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    );
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const now = new Date();
      setLastUpdated(
        now?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
      );
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-950 border border-green-800">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium text-green-400">Live</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Acme Engineering · Sprint 14{' '}
          {lastUpdated && (
            <span className="text-muted-foreground/60">· Updated {lastUpdated}</span>
          )}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="btn-ghost gap-2"
          aria-label="Refresh dashboard data"
        >
          <RefreshCw size={15} className={isRefreshing ? 'animate-spin' : ''} />
          <span className="hidden sm:inline">Refresh</span>
        </button>

        <button className="btn-ghost gap-2 relative">
          <Bell size={15} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-accent" />
        </button>

        <Link href="/project-task-management" className="btn-primary gap-2">
          <Plus size={15} />
          <span>New Task</span>
        </Link>
      </div>
    </div>
  );
}