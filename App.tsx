import React, { useState } from 'react';
import { LoginForm } from './features/auth/components/LoginForm';
import { Dashboard } from './Dashboard';
import { AuthState } from './types/index';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  const { isDarkMode, toggleTheme } = useTheme();

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
