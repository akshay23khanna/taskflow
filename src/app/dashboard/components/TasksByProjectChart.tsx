'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,  } from 'recharts';

const data = [
  { project: 'API Gateway v3', todo: 4, inProgress: 6, inReview: 2, blocked: 1, done: 12 },
  { project: 'Auth Service', todo: 3, inProgress: 4, inReview: 3, blocked: 2, done: 8 },
  { project: 'Dashboard UI', todo: 6, inProgress: 5, inReview: 1, blocked: 0, done: 15 },
  { project: 'Data Pipeline', todo: 2, inProgress: 3, inReview: 2, blocked: 1, done: 7 },
  { project: 'Mobile App', todo: 8, inProgress: 5, inReview: 0, blocked: 0, done: 9 },
  { project: 'Infra Upgrade', todo: 1, inProgress: 2, inReview: 1, blocked: 1, done: 4 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-3 shadow-2xl min-w-[160px]">
      <p className="text-xs font-semibold text-foreground mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={`bar-tooltip-${entry.name}`} className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ backgroundColor: entry.color }} />
            <span className="text-xs text-muted-foreground">{entry.name}</span>
          </div>
          <span className="text-xs font-semibold text-foreground font-tabular">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function TasksByProjectChart() {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} margin={{ top: 0, right: 5, left: -20, bottom: 0 }} barCategoryGap="25%">
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis
          dataKey="project"
          tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="done" name="Done" stackId="a" fill="#22c55e" radius={[0, 0, 0, 0]} />
        <Bar dataKey="inReview" name="In Review" stackId="a" fill="#f59e0b" />
        <Bar dataKey="inProgress" name="In Progress" stackId="a" fill="#8b5cf6" />
        <Bar dataKey="todo" name="Todo" stackId="a" fill="#3b82f6" />
        <Bar dataKey="blocked" name="Blocked" stackId="a" fill="#ef4444" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}