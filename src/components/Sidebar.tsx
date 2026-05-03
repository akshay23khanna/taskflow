'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  Zap,
  LogOut,
  User,
  Shield,
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
  group: string;
}

const navItems: NavItem[] = [
  { id: 'nav-dashboard', label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, group: 'main' },
  { id: 'nav-projects', label: 'Projects & Tasks', href: '/project-task-management', icon: FolderKanban, badge: 3, group: 'main' },
  { id: 'nav-team', label: 'Team', href: '/project-task-management', icon: Users, group: 'main' },
  { id: 'nav-notifications', label: 'Notifications', href: '/dashboard', icon: Bell, badge: 5, group: 'secondary' },
  { id: 'nav-settings', label: 'Settings', href: '/dashboard', icon: Settings, group: 'secondary' },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);

  const isActive = (href: string) => {
    if (href === '/dashboard' && pathname === '/dashboard') return true;
    if (href === '/project-task-management' && pathname === '/project-task-management') return true;
    return false;
  };

  const mainItems = navItems.filter((n) => n.group === 'main');
  const secondaryItems = navItems.filter((n) => n.group === 'secondary');

  return (
    <aside
      className={`
        relative flex flex-col h-full bg-card border-r border-border
        transition-all duration-300 ease-in-out flex-shrink-0
        ${collapsed ? 'w-16' : 'w-60'}
      `}
    >
      {/* Logo */}
      <div className={`flex items-center h-16 border-b border-border px-4 ${collapsed ? 'justify-center' : 'gap-3'}`}>
        <AppLogo size={28} />
        {!collapsed && (
          <span className="font-semibold text-base text-foreground tracking-tight">TaskFlow</span>
        )}
      </div>

      {/* Workspace Badge */}
      {!collapsed && (
        <div className="mx-3 mt-3 px-3 py-2 rounded-lg bg-muted border border-border flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Zap size={12} className="text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-foreground truncate">Acme Engineering</p>
            <p className="text-xs text-muted-foreground">Pro Plan</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto scrollbar-thin">
        {!collapsed && (
          <p className="px-3 mb-2 text-xs font-medium text-muted-foreground uppercase tracking-widest">
            Workspace
          </p>
        )}
        {mainItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => collapsed && setTooltipVisible(item.id)}
              onMouseLeave={() => setTooltipVisible(null)}
            >
              <Link
                href={item.href}
                className={`
                  nav-item
                  ${active ? 'nav-item-active' : ''}
                  ${collapsed ? 'justify-center px-2' : ''}
                `}
              >
                <Icon size={18} className="flex-shrink-0" />
                {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                {!collapsed && item.badge && (
                  <span className="ml-auto flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-medium flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
                {collapsed && item.badge && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
                )}
              </Link>
              {collapsed && tooltipVisible === item.id && (
                <div className="tooltip-base left-full ml-3 top-1/2 -translate-y-1/2">
                  {item.label}
                  {item.badge && (
                    <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-primary/20 text-primary text-xs">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}

        <div className={`my-3 border-t border-border ${collapsed ? 'mx-2' : 'mx-1'}`} />

        {!collapsed && (
          <p className="px-3 mb-2 text-xs font-medium text-muted-foreground uppercase tracking-widest">
            Account
          </p>
        )}
        {secondaryItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => collapsed && setTooltipVisible(item.id)}
              onMouseLeave={() => setTooltipVisible(null)}
            >
              <Link
                href={item.href}
                className={`nav-item ${collapsed ? 'justify-center px-2' : ''}`}
              >
                <Icon size={18} className="flex-shrink-0" />
                {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                {!collapsed && item.badge && (
                  <span className="ml-auto flex-shrink-0 w-5 h-5 rounded-full bg-accent/20 text-accent text-xs font-medium flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
              {collapsed && tooltipVisible === item.id && (
                <div className="tooltip-base left-full ml-3 top-1/2 -translate-y-1/2">
                  {item.label}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className={`border-t border-border p-3 ${collapsed ? 'flex justify-center' : ''}`}>
        {collapsed ? (
          <div
            className="relative"
            onMouseEnter={() => setTooltipVisible('user-profile')}
            onMouseLeave={() => setTooltipVisible(null)}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center cursor-pointer">
              <span className="text-xs font-bold text-white">RL</span>
            </div>
            {tooltipVisible === 'user-profile' && (
              <div className="tooltip-base left-full ml-3 top-1/2 -translate-y-1/2">
                Rohan Lal — Admin
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-white">RL</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Rohan Lal</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Shield size={10} className="text-primary flex-shrink-0" />
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
            </div>
            <button className="btn-ghost p-1.5 rounded-md" title="Sign out">
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors duration-150 z-10"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}