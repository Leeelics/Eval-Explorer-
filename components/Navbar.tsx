
import React from 'react';
import { Theme } from '../App';

interface NavbarProps {
  onSignInClick: () => void;
  onAddClick: () => void;
  user: { name: string; avatar: string } | null;
  onLogout: () => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSignInClick, onAddClick, user, onLogout, theme, onThemeChange }) => {
  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return 'fa-sun';
      case 'dark': return 'fa-moon';
      case 'system': return 'fa-desktop';
    }
  };

  const cycleTheme = () => {
    if (theme === 'system') onThemeChange('light');
    else if (theme === 'light') onThemeChange('dark');
    else onThemeChange('system');
  };

  return (
    <nav className="sticky top-0 z-50 glass-card px-6 py-4 mb-8 border-b border-slate-200 dark:border-white/5 transition-all">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-600/20">
            <i className="fas fa-microchip text-white text-xl"></i>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Eval<span className="text-blue-500">Explorer</span>
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={cycleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            title={`Current theme: ${theme}`}
          >
            <i className={`fas ${getThemeIcon()} text-sm`}></i>
          </button>

          {user ? (
            <div className="flex items-center space-x-4">
              <button 
                onClick={onAddClick}
                className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded-xl transition-all font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/20"
              >
                <i className="fas fa-plus text-xs"></i>
                <span className="hidden sm:inline">Add Resource</span>
              </button>
              <div className="group relative">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-9 h-9 rounded-full border-2 border-blue-500 cursor-pointer"
                />
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 z-50">
                  <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-800 mb-1">
                    <p className="text-slate-900 dark:text-white text-xs font-bold">{user.name}</p>
                    <p className="text-slate-500 text-[10px]">Contributor</p>
                  </div>
                  <button 
                    onClick={onLogout}
                    className="w-full text-left px-3 py-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/10 rounded-lg text-xs transition-colors"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i> Log Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={onSignInClick}
              className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-sm px-6 py-2 rounded-full transition-all border border-slate-200 dark:border-slate-700 font-medium"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
