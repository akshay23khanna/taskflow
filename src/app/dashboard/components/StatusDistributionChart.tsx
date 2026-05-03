'use client';

import React from 'react';
import { Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

const data = [
  { name: 'Done', value: 51, color: '#22c55e' },
  { name: 'In Progress', value: 23, color: '#8b5cf6' },
  { name: 'In Review', value: 8, color: '#f59e0b' },
  { name: 'Todo', value: 12, color: '#3b82f6' },
  { name: 'Blocked', value: 4, color: '#ef4444' },
  { name: 'Backlog', value: 15, color: '#52525b' },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { color: string } }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0];
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-3 shadow-2xl">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.payload.color }} />
        <span className="text-xs text-muted-foreground">{item.name}:</span>
        <span className="text-xs font-semibold text-foreground font-tabular">{item.value}</span>
      </div>
    </div>
  );
}

export default function StatusDistributionChart() {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div>
      <div className="relative">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry) => (
                <Cell key={`cell-${entry.name}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground font-tabular">{total}</p>
            <p className="text-xs text-muted-foreground">tasks</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1.5 mt-3">
        {data.map((item) => (
          <div key={`legend-${item.name}`} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-muted-foreground truncate">{item.name}</span>
            <span className="text-xs font-medium text-foreground ml-auto font-tabular">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}