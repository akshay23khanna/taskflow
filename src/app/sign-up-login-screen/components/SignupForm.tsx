'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, Shield, Users } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'admin' | 'member';
  inviteCode?: string;
  terms: boolean;
}

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export default function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'admin' | 'member'>('admin');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues: { role: 'admin' },
  });

  const password = watch('password');

  const handleRoleSelect = (role: 'admin' | 'member') => {
    setSelectedRole(role);
    setValue('role', role);
  };

  // BACKEND INTEGRATION: Replace with real user registration API call
  const onSubmit = async (_data: SignupFormData) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setIsLoading(false);
    router.push('/dashboard');
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Create your account</h2>
        <p className="text-sm text-muted-foreground mt-1">Set up your TaskFlow workspace in 60 seconds</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Role Selector */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Account role</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: 'admin' as const, label: 'Admin', desc: 'Create & manage workspace', icon: Shield, color: 'primary' },
              { value: 'member' as const, label: 'Member', desc: 'Join with invite code', icon: Users, color: 'accent' },
            ].map((roleOption) => {
              const Icon = roleOption.icon;
              const isSelected = selectedRole === roleOption.value;
              return (
                <button
                  key={`role-${roleOption.value}`}
                  type="button"
                  onClick={() => handleRoleSelect(roleOption.value)}
                  className={`p-3 rounded-xl border text-left transition-all duration-150 ${
                    isSelected
                      ? roleOption.color === 'primary' ?'border-primary bg-primary/10' :'border-accent bg-accent/10' :'border-border bg-card hover:border-muted-foreground/40'
                  }`}
                >
                  <Icon
                    size={18}
                    className={`mb-1.5 ${isSelected ? (roleOption.color === 'primary' ? 'text-primary' : 'text-accent') : 'text-muted-foreground'}`}
                  />
                  <p className={`text-sm font-semibold ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {roleOption.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{roleOption.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label htmlFor="signup-name" className="block text-sm font-medium text-foreground mb-1.5">
            Full name
          </label>
          <input
            id="signup-name"
            type="text"
            autoComplete="name"
            className={`input-field ${errors.name ? 'border-red-600 focus:ring-red-600' : ''}`}
            placeholder="Rohan Lal"
            {...register('name', {
              required: 'Full name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
            })}
          />
          {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="signup-email" className="block text-sm font-medium text-foreground mb-1.5">
            Work email
          </label>
          <input
            id="signup-email"
            type="email"
            autoComplete="email"
            className={`input-field ${errors.email ? 'border-red-600 focus:ring-red-600' : ''}`}
            placeholder="you@company.io"
            {...register('email', {
              required: 'Work email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
            })}
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>}
        </div>

        {selectedRole === 'member' && (
          <div className="animate-slide-up">
            <label htmlFor="invite-code" className="block text-sm font-medium text-foreground mb-1.5">
              Workspace invite code
            </label>
            <p className="text-xs text-muted-foreground mb-1.5">
              Ask your Admin for the 8-character code to join their workspace
            </p>
            <input
              id="invite-code"
              type="text"
              className={`input-field font-mono tracking-widest uppercase ${errors.inviteCode ? 'border-red-600 focus:ring-red-600' : ''}`}
              placeholder="ACME-X4T7"
              maxLength={9}
              {...register('inviteCode', {
                required: selectedRole === 'member' ? 'Invite code is required to join as a Member' : false,
                pattern: {
                  value: /^[A-Z0-9]{4}-[A-Z0-9]{4}$/i,
                  message: 'Invalid format — use XXXX-XXXX',
                },
              })}
            />
            {errors.inviteCode && <p className="mt-1.5 text-xs text-red-400">{errors.inviteCode.message}</p>}
          </div>
        )}

        <div>
          <label htmlFor="signup-password" className="block text-sm font-medium text-foreground mb-1.5">
            Password
          </label>
          <p className="text-xs text-muted-foreground mb-1.5">Minimum 8 characters with at least one number</p>
          <div className="relative">
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              className={`input-field pr-11 ${errors.password ? 'border-red-600 focus:ring-red-600' : ''}`}
              placeholder="••••••••••••"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'At least 8 characters required' },
                pattern: { value: /(?=.*\d)/, message: 'Must contain at least one number' },
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
          {errors.password && <p className="mt-1.5 text-xs text-red-400">{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-foreground mb-1.5">
            Confirm password
          </label>
          <div className="relative">
            <input
              id="confirm-password"
              type={showConfirm ? 'text' : 'password'}
              autoComplete="new-password"
              className={`input-field pr-11 ${errors.confirmPassword ? 'border-red-600 focus:ring-red-600' : ''}`}
              placeholder="••••••••••••"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showConfirm ? 'Hide password' : 'Show password'}
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1.5 text-xs text-red-400">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="flex items-start gap-2">
          <input
            id="terms"
            type="checkbox"
            className="w-4 h-4 mt-0.5 rounded border-border bg-input accent-primary flex-shrink-0"
            {...register('terms', { required: 'You must accept the terms to continue' })}
          />
          <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
            I agree to the{' '}
            <span className="text-primary hover:underline cursor-pointer">Terms of Service</span>
            {' '}and{' '}
            <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span>
          </label>
        </div>
        {errors.terms && <p className="text-xs text-red-400 -mt-3">{errors.terms.message}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full py-2.5 text-sm font-semibold"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              Creating your workspace...
            </span>
          ) : (
            `Create ${selectedRole === 'admin' ? 'Workspace' : 'Account'}`
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-primary hover:text-primary/80 font-medium transition-colors"
        >
          Sign in
        </button>
      </p>
    </div>
  );
}