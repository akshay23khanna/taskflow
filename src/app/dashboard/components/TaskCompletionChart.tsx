'use client';

import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { date: 'Apr 19', completed: 2, created: 5 },
  { date: 'Apr 20', completed: 4, created: 3 },
  { date: 'Apr 21', completed: 3, created: 6 },
  { date: 'Apr 22', completed: 6, created: 4 },
  { date: 'Apr 23', completed: 5, created: 7 },
  { date: 'Apr 24', completed: 8, created: 5 },
  { date: 'Apr 25', completed: 4, created: 2 },
  { date: 'Apr 26', completed: 3, created: 4 },
  { date: 'Apr 27', completed: 7, created: 6 },
  { date: 'Apr 28', completed: 9, created: 5 },
  { date: 'Apr 29', completed: 5, created: 8 },
  { date: 'Apr 30', completed: 6, created: 3 },
  { date: 'May 1', completed: 4, created: 7 },
  { date: 'May 2', completed: 3, created: 5 },
];

interface TooltipPayload {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-3 shadow-2xl">
      <p className="text-xs font-medium text-muted-foreground mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={`tooltip-${entry.name}`} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
          <span className="text-xs text-muted-foreground capitalize">{entry.name}:</span>
          <span className="text-xs font-semibold text-foreground font-tabular">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function TaskCompletionChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="gradCompleted" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="gradCreated" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.25} />
            <stop offset="95%" stopColor="var(--accent)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
          axisLine={false}
          tickLine={false}
          interval={2}
        />
        <YAxis
          tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="created"
          stroke="var(--accent)"
          strokeWidth={1.5}
          fill="url(#gradCreated)"
          strokeDasharray="4 2"
        />
        <Area
          type="monotone"
          dataKey="completed"
          stroke="var(--primary)"
          strokeWidth={2}
          fill="url(#gradCompleted)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}