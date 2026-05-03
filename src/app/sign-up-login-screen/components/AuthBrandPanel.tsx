import React from 'react';
import { Zap, GitBranch, Users, BarChart3, CheckCircle2 } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const features = [
  { id: 'feat-projects', icon: GitBranch, text: 'Manage projects with full Git-style task tracking' },
  { id: 'feat-team', icon: Users, text: 'Role-based access — Admins control, Members execute' },
  { id: 'feat-realtime', icon: Zap, text: 'Real-time updates — every change syncs instantly' },
  { id: 'feat-analytics', icon: BarChart3, text: 'Sprint analytics and burndown at a glance' },
];

export default function AuthBrandPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between w-[480px] xl:w-[560px] bg-card border-r border-border p-12 flex-shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Zap size={20} className="text-white" />
        </div>
        <span className="text-xl font-semibold text-foreground tracking-tight">TaskFlow</span>
      </div>
      {/* Hero Copy */}
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-foreground leading-tight">
            Ship faster,{' '}
            <span className="text-gradient-primary">together.</span>
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            The project management tool built for engineering teams who care about
            velocity, clarity, and zero context-switching.
          </p>
        </div>

        <div className="space-y-4">
          {features?.map((feature) => {
            const Icon = feature?.icon;
            return (
              <div key={feature?.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">{feature?.text}</p>
              </div>
            );
          })}
        </div>

        {/* Social Proof */}
        <div className="p-4 rounded-xl bg-muted border border-border">
          <div className="flex items-center gap-2 mb-2">
            {['MK', 'SP', 'AT', 'RV']?.map((initials, i) => (
              <div
                key={`avatar-${initials}`}
                className="w-7 h-7 rounded-full border-2 border-card flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                style={{
                  marginLeft: i > 0 ? '-8px' : '0',
                  background: `hsl(${i * 70 + 250}, 70%, 50%)`,
                  zIndex: 4 - i,
                }}
              >
                {initials}
              </div>
            ))}
            <span className="text-xs text-muted-foreground ml-2">+340 teams already shipping</span>
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5]?.map((star) => (
              <CheckCircle2 key={`star-${star}`} size={14} className="text-primary" />
            ))}
            <span className="text-xs text-foreground ml-1 font-medium">Trusted by 340+ engineering teams</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        © 2026 TaskFlow Inc. · Privacy Policy · Terms of Service
      </p>
    </div>
  );
}