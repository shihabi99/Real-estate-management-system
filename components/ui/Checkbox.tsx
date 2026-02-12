import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, className = '', id, ...props }) => {
  return (
    <div className="flex items-center group">
      <div className="relative flex items-center">
        <input
          id={id}
          type="checkbox"
          className={`
            peer h-4 w-4 cursor-pointer appearance-none rounded border border-slate-300 bg-white transition-all 
            checked:border-slate-900 checked:bg-slate-900 
            focus:ring-2 focus:ring-slate-900 focus:ring-offset-1
            disabled:cursor-not-allowed disabled:opacity-50
            dark:border-slate-600 dark:bg-slate-800 
            dark:checked:border-sky-600 dark:checked:bg-sky-600 
            dark:focus:ring-sky-600 dark:focus:ring-offset-slate-900
            ${className}
          `}
          {...props}
        />
        <svg
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      {label && (
        <label 
          htmlFor={id} 
          className="ml-2 block text-sm text-slate-700 dark:text-slate-300 cursor-pointer select-none group-hover:text-slate-900 dark:group-hover:text-white transition-colors"
        >
          {label}
        </label>
      )}
    </div>
  );
};