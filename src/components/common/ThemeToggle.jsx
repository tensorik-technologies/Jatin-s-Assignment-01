import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`btn-icon ${className}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      id="theme-toggle-btn"
    >
      {theme === 'light' ? (
        <Moon size={19} className="text-slate-700" />
      ) : (
        <Sun size={19} className="text-amber-400" />
      )}
    </button>
  );
}
