'use client';

import React from 'react';
import { GitCommit, UserPlus, CheckCircle2, AlertTriangle, MessageSquare, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';


interface ActivityItem {
  id: string;
  type: 'task-completed' | 'task-blocked' | 'member-added' | 'comment' | 'status-change';
  user: string;
  userInitials: string;
  userColor: string;
  action: string;
  target: string;
  project: string;
  time: string;
  isAlert?: boolean;
}

const activities: ActivityItem[] = [
  {
    id: 'act-001',
    type: 'task-blocked',
    user: 'Priya Sharma',
    userInitials: 'PS',
    userColor: 'from-red-600 to-orange-600',
    action: 'marked as blocked',
    target: 'OAuth token refresh loop',
    project: 'Auth Service',
    time: '4 min ago',
    isAlert: true,
  },
  {
    id: 'act-002',
    type: 'task-completed',
    user: 'Arjun Mehta',
    userInitials: 'AM',
    userColor: 'from-green-600 to-emerald-600',
    action: 'completed',
    target: 'Add rate limiting middleware',
    project: 'API Gateway v3',
    time: '12 min ago',
  },
  {
    id: 'act-003',
    type: 'comment',
    user: 'Tanvi Rao',
    userInitials: 'TR',
    userColor: 'from-violet-600 to-purple-600',
    action: 'commented on',
    target: 'Kafka consumer lag investigation',
    project: 'Data Pipeline',
    time: '28 min ago',
  },
  {
    id: 'act-004',
    type: 'status-change',
    user: 'Kiran Desai',
    userInitials: 'KD',
    userColor: 'from-cyan-600 to-blue-600',
    action: 'moved to In Review',
    target: 'Dark mode design tokens',
    project: 'Dashboard UI',
    time: '41 min ago',
  },
  {
    id: 'act-005',
    type: 'member-added',
    user: 'Rohan Lal',
    userInitials: 'RL',
    userColor: 'from-primary to-accent',
    action: 'added Sneha Iyer to',
    target: 'Mobile App',
    project: 'Mobile App',
    time: '1 hr ago',
  },
  {
    id: 'act-006',
    type: 'task-completed',
    user: 'Sneha Iyer',
    userInitials: 'SI',
    userColor: 'from-pink-600 to-rose-600',
    action: 'completed',
    target: 'Push notification setup',
    project: 'Mobile App',
    time: '1 hr ago',
  },
  {
    id: 'act-007',
    type: 'status-change',
    user: 'Arjun Mehta',
    userInitials: 'AM',
    userColor: 'from-green-600 to-emerald-600',
    action: 'moved to In Progress',
    target: 'SSL cert auto-renewal',
    project: 'Infra Upgrade',
    time: '2 hr ago',
  },
];

const activityIcons: Record<ActivityItem['type'], { icon: React.ElementType; className: string }> = {
  'task-completed': { icon: CheckCircle2, className: 'text-green-400' },
  'task-blocked': { icon: AlertTriangle, className: 'text-red-400' },
  'member-added': { icon: UserPlus, className: 'text-accent' },
  'comment': { icon: MessageSquare, className: 'text-muted-foreground' },
  'status-change': { icon: GitCommit, className: 'text-primary' },
};

export default function ActivityFeed() {
  return (
    <div className="card-base p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Team Activity</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Real-time workspace updates</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-green-400">Live</span>
        </div>
      </div>

      <div className="space-y-3 overflow-y-auto max-h-[340px] scrollbar-thin pr-1">
        {activities.map((item) => {
          const iconConfig = activityIcons[item.type];
          const Icon = iconConfig.icon;
          return (
            <div
              key={item.id}
              className={`flex items-start gap-3 p-2.5 rounded-lg transition-colors ${
                item.isAlert ? 'bg-red-950/30 border border-red-900/50' : 'hover:bg-muted/40'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full bg-gradient-to-br ${item.userColor} flex items-center justify-center flex-shrink-0 mt-0.5`}
              >
                <span className="text-xs font-bold text-white">{item.userInitials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground leading-relaxed">
                  <span className="font-medium">{item.user}</span>
                  {' '}
                  <span className="text-muted-foreground">{item.action}</span>
                  {' '}
                  <span className="font-medium text-primary">{item.target}</span>
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Icon size={11} className={iconConfig.className} />
                  <span className="text-xs text-muted-foreground">{item.project}</span>
                  <span className="text-xs text-muted-foreground/60">·</span>
                  <span className="text-xs text-muted-foreground/60">{item.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Link
        href="/project-task-management"
        className="flex items-center justify-center gap-1.5 mt-4 pt-4 border-t border-border text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        View all activity
        <ArrowRight size={12} />
      </Link>
    </div>
  );
}