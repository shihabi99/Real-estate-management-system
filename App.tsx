import React, { useState, useEffect } from 'react';
import { LoginForm } from './components/LoginForm';
import { Dashboard } from './components/Dashboard';
import { AuthState } from './types';

export default function App() {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  // Initialize theme from system preference or default to light
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleLogin = (username: string) => {
    setAuth({
      isAuthenticated: true,
      user: { username, role: 'admin' },
    });
  };

  const handleLogout = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
    });
  };

  return (
    <div className="min-h-screen w-full font-sans text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-900 selection:bg-primary-500 selection:text-white transition-colors duration-200">
      {auth.isAuthenticated ? (
        <Dashboard 
          onLogout={handleLogout} 
          isDarkMode={isDarkMode} 
          toggleTheme={toggleTheme} 
        />
      ) : (
        <LoginForm onLogin={handleLogin} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      )}
    </div>
  );
}