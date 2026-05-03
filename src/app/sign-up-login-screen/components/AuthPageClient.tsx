'use client';

import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import AuthBrandPanel from './AuthBrandPanel';

export default function AuthPageClient() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen bg-background flex">
      <AuthBrandPanel />
      <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mode Toggle */}
          <div className="flex items-center gap-1 p-1 bg-muted rounded-xl mb-8 w-fit mx-auto">
            <button
              onClick={() => setMode('login')}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                mode === 'login' ?'bg-card text-foreground shadow-sm border border-border' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                mode === 'signup' ?'bg-card text-foreground shadow-sm border border-border' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Create Account
            </button>
          </div>

          {mode === 'login' ? (
            <LoginForm onSwitchToSignup={() => setMode('signup')} />
          ) : (
            <SignupForm onSwitchToLogin={() => setMode('login')} />
          )}
        </div>
      </div>
    </div>
  );
}