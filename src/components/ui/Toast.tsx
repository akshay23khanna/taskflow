'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextValue {
  toast: (type: ToastType, title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const toastConfig: Record<ToastType, { icon: React.ElementType; className: string; iconClass: string }> = {
  success: { icon: CheckCircle, className: 'border-green-800 bg-green-950', iconClass: 'text-green-400' },
  error: { icon: XCircle, className: 'border-red-800 bg-red-950', iconClass: 'text-red-400' },
  warning: { icon: AlertTriangle, className: 'border-amber-800 bg-amber-950', iconClass: 'text-amber-400' },
  info: { icon: Info, className: 'border-blue-800 bg-blue-950', iconClass: 'text-blue-400' },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((type: ToastType, title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.floor(type.length * 100)}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => {
          const config = toastConfig[t.type];
          const Icon = config.icon;
          return (
            <div
              key={t.id}
              className={`animate-slide-up pointer-events-auto flex items-start gap-3 p-4 rounded-xl border ${config.className} shadow-2xl`}
            >
              <Icon size={18} className={`flex-shrink-0 mt-0.5 ${config.iconClass}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{t.title}</p>
                {t.message && <p className="text-xs text-muted-foreground mt-0.5">{t.message}</p>}
              </div>
              <button
                onClick={() => dismiss(t.id)}
                className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Dismiss notification"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}