'use client';

import React from 'react';
import {
  AlertTriangle, Ban, Clock, Activity, CheckCircle2, ListTodo,
  TrendingDown, TrendingUp, Minus,
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface KPICardData {
  id: string;
  label: string;
  value: string | number;
  subvalue?: string;
  trend?: { direction: 'up' | 'down' | 'flat'; value: string; positive: boolean };
  icon: React.ElementType;
  variant: 'danger' | 'warning' | 'info' | 'success' | 'neutral' | 'primary';
  span?: 'single' | 'double';
  description?: string;
}

const kpiData: KPICardData[] = [
  {
    id: 'kpi-overdue',
    label: 'Overdue Tasks',
    value: 7,
    subvalue: '3 critical priority',
    trend: { direction: 'up', value: '+2 since yesterday', positive: false },
    icon: AlertTriangle,
    variant: 'danger',
    span: 'double',
    description: 'Tasks past their due date requiring immediate attention',
  },
  {
    id: 'kpi-blocked',
    label: 'Blocked',
    value: 4,
    subvalue: 'Needs unblocking',
    trend: { direction: 'up', value: '+1 today', positive: false },
    icon: Ban,
    variant: 'warning',
    span: 'single',
  },
  {
    id: 'kpi-due-today',
    label: 'Due Today',
    value: 9,
    subvalue: '4 assigned to you',
    trend: { direction: 'flat', value: 'Same as yesterday', positive: true },
    icon: Clock,
    variant: 'info',
    span: 'single',
  },
  {
    id: 'kpi-in-progress',
    label: 'In Progress',
    value: 23,
    subvalue: 'Across 5 projects',
    trend: { direction: 'up', value: '+5 this week', positive: true },
    icon: Activity,
    variant: 'primary',
    span: 'single',
  },
  {
    id: 'kpi-completion',
    label: 'Completion Rate',
    value: '68%',
    subvalue: '51 of 75 tasks done',
    trend: { direction: 'up', value: '+4% vs last sprint', positive: true },
    icon: CheckCircle2,
    variant: 'success',
    span: 'single',
  },
  {
    id: 'kpi-total',
    label: 'Total Tasks',
    value: 75,
    subvalue: 'Sprint 14',
    trend: { direction: 'down', value: '-3 removed', positive: true },
    icon: ListTodo,
    variant: 'neutral',
    span: 'single',
  },
];

const variantStyles: Record<KPICardData['variant'], {
  card: string;
  icon: string;
  iconBg: string;
  value: string;
  label: string;
}> = {
  danger: {
    card: 'card-glow-danger bg-red-950/30 border-red-900',
    icon: 'text-red-400',
    iconBg: 'bg-red-900/50',
    value: 'text-red-300',
    label: 'text-red-400/80',
  },
  warning: {
    card: 'card-glow-warning bg-amber-950/20 border-amber-900/60',
    icon: 'text-amber-400',
    iconBg: 'bg-amber-900/40',
    value: 'text-amber-300',
    label: 'text-amber-400/80',
  },
  info: {
    card: 'bg-card border-border hover:border-accent/40',
    icon: 'text-accent',
    iconBg: 'bg-accent/10',
    value: 'text-foreground',
    label: 'text-muted-foreground',
  },
  success: {
    card: 'bg-card border-border hover:border-green-700/40',
    icon: 'text-green-400',
    iconBg: 'bg-green-900/30',
    value: 'text-foreground',
    label: 'text-muted-foreground',
  },
  primary: {
    card: 'card-glow-primary bg-primary/5 border-primary/30',
    icon: 'text-primary',
    iconBg: 'bg-primary/15',
    value: 'text-foreground',
    label: 'text-muted-foreground',
  },
  neutral: {
    card: 'bg-card border-border hover:border-muted-foreground/30',
    icon: 'text-muted-foreground',
    iconBg: 'bg-muted',
    value: 'text-foreground',
    label: 'text-muted-foreground',
  },
};

export default function KPIBentoGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 mb-8">
      {kpiData.map((card) => {
        const Icon = card.icon;
        const styles = variantStyles[card.variant];
        const TrendIcon =
          card.trend?.direction === 'up'
            ? TrendingUp
            : card.trend?.direction === 'down'
            ? TrendingDown
            : Minus;

        return (
          <div
            key={card.id}
            className={`
              rounded-xl border p-5 transition-all duration-200 cursor-default
              ${styles.card}
              ${card.span === 'double' ? 'sm:col-span-2' : ''}
            `}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className={`text-xs font-medium uppercase tracking-wider ${styles.label}`}>
                  {card.label}
                </p>
                {card.description && (
                  <p className="text-xs text-muted-foreground/60 mt-0.5 hidden xl:block max-w-[180px] leading-relaxed">
                    {card.description}
                  </p>
                )}
              </div>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${styles.iconBg}`}>
                <Icon size={18} className={styles.icon} />
              </div>
            </div>

            <div className="flex items-end justify-between gap-4">
              <div>
                <p className={`text-3xl font-bold font-tabular ${styles.value}`}>
                  {card.value}
                </p>
                {card.subvalue && (
                  <p className="text-xs text-muted-foreground mt-1">{card.subvalue}</p>
                )}
              </div>

              {card.trend && (
                <div
                  className={`flex items-center gap-1 text-xs font-medium flex-shrink-0 ${
                    card.trend.positive ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  <TrendIcon size={13} />
                  <span>{card.trend.value}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}