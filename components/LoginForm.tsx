import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface LoginFormProps {
  onLogin: (username: string) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, isDarkMode, toggleTheme }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay for better UX feel
    await new Promise(resolve => setTimeout(resolve, 800));

    if (username.toLowerCase() === 'admin' && password === 'admin') {
      onLogin(username);
    } else {
      setError('Invalid credentials. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 transition-colors duration-500">
      
      {/* Theme Toggle - Absolute Position */}
      <button 
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-2 rounded-full text-slate-500 hover:bg-white/50 dark:text-slate-400 dark:hover:bg-slate-800/50 transition-all focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700"
        aria-label="Toggle Dark Mode"
      >
        {isDarkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
        )}
      </button>

      <div className="w-full max-w-md animate-fadeIn">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-800 p-8 md:p-10 transition-all duration-300">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 dark:bg-sky-600 text-white shadow-lg transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 transition-colors">
              Please enter your details to sign in.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              id="username"
              type="text"
              label="Username"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
            
            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="•••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />

            {error && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-500 dark:text-red-400 border border-red-100 dark:border-red-900/30 flex items-center animate-fadeIn">
                <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Sign In
            </Button>
            
            <div className="mt-4 text-center">
               <span className="text-xs text-slate-400 dark:text-slate-500">Hint: admin / admin</span>
            </div>
          </form>
        </div>
        
        <p className="mt-8 text-center text-xs text-slate-400 dark:text-slate-600 transition-colors">
          &copy; {new Date().getFullYear()} Secure System. All rights reserved.
        </p>
      </div>
    </div>
  );
};