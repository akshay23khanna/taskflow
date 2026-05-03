'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, Copy, CheckCheck } from 'lucide-react';

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

interface DemoCredential {
  role: string;
  email: string;
  password: string;
  color: string;
}

const demoCredentials: DemoCredential[] = [
  { role: 'Admin', email: 'rohan.lal@acme-eng.io', password: 'TaskFlow@Admin2026', color: 'text-primary' },
  { role: 'Member', email: 'priya.sharma@acme-eng.io', password: 'TaskFlow@Member2026', color: 'text-accent' },
];

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

export default function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: { remember: false },
  });

  const handleCopy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(key);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const autofill = (cred: DemoCredential) => {
    setValue('email', cred.email, { shouldValidate: true });
    setValue('password', cred.password, { shouldValidate: true });
    setAuthError(null);
  };

  // BACKEND INTEGRATION: Replace with real authentication API call
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setAuthError(null);
    await new Promise((r) => setTimeout(r, 1200));

    const valid = demoCredentials.some(
      (c) => c.email === data.email && c.password === data.password
    );

    if (!valid) {
      setAuthError('Invalid credentials — use the demo accounts below to sign in');
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    router.push('/dashboard');
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
        <p className="text-sm text-muted-foreground mt-1">Sign in to your TaskFlow workspace</p>
      </div>

      {authError && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-950 border border-red-800 text-sm text-red-400">
          {authError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div>
          <label htmlFor="login-email" className="block text-sm font-medium text-foreground mb-1.5">
            Email address
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            className={`input-field ${errors.email ? 'border-red-600 focus:ring-red-600' : ''}`}
            placeholder="you@company.io"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
            })}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="login-password" className="block text-sm font-medium text-foreground">
              Password
            </label>
            <button type="button" className="text-xs text-primary hover:text-primary/80 transition-colors">
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              className={`input-field pr-11 ${errors.password ? 'border-red-600 focus:ring-red-600' : ''}`}
              placeholder="••••••••••••"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-xs text-red-400">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            id="remember"
            type="checkbox"
            className="w-4 h-4 rounded border-border bg-input accent-primary"
            {...register('remember')}
          />
          <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
            Remember me for 30 days
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full py-2.5 text-sm font-semibold"
          style={{ minWidth: '100%' }}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              Signing in...
            </span>
          ) : (
            'Sign in to TaskFlow'
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        No account yet?{' '}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-primary hover:text-primary/80 font-medium transition-colors"
        >
          Create one free
        </button>
      </p>

      {/* Demo Credentials */}
      <div className="mt-8 p-4 rounded-xl bg-muted border border-border">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Demo Credentials
        </p>
        <div className="space-y-2">
          {demoCredentials.map((cred) => (
            <div
              key={`demo-${cred.role}`}
              className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-card border border-border hover:border-primary/40 transition-colors cursor-pointer group"
              onClick={() => autofill(cred)}
              title={`Click to autofill ${cred.role} credentials`}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className={`text-xs font-semibold ${cred.color} flex-shrink-0 w-12`}>
                  {cred.role}
                </span>
                <span className="text-xs text-muted-foreground truncate font-mono">{cred.email}</span>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleCopy(cred.email, `email-${cred.role}`); }}
                  className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={`Copy ${cred.role} email`}
                >
                  {copiedField === `email-${cred.role}` ? <CheckCheck size={12} className="text-green-400" /> : <Copy size={12} />}
                </button>
                <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                  Use →
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">Click any row to autofill credentials</p>
      </div>
    </div>
  );
}