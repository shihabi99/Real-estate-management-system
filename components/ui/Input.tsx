import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', id, ...props }) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          className={`
            w-full rounded-lg border px-3 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0
            bg-white dark:bg-slate-900/50 
            text-slate-900 dark:text-white
            placeholder:text-slate-400 dark:placeholder:text-slate-500
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200 dark:border-red-800 dark:focus:border-red-500 dark:focus:ring-red-900/30' 
              : 'border-slate-200 focus:border-slate-900 focus:ring-slate-100 dark:border-slate-700 dark:focus:border-sky-500 dark:focus:ring-sky-900/30'
            }
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-red-500 dark:text-red-400 animate-fadeIn">
          {error}
        </p>
      )}
    </div>
  );
};