
import React from 'react';

interface NavbarProps {
  onSignInClick: () => void;
  onAddClick: () => void;
  user: { name: string; avatar: string } | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSignInClick, onAddClick, user, onLogout }) => {
  return (
    <nav className="sticky top-0 z-50 glass-card px-6 py-4 mb-8 border-b border-white/5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="bg-blue-600 p-2 rounded-lg">
            <i className="fas fa-microchip text-white text-xl"></i>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Eval<span className="text-blue-500">Explorer</span>
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <button 
                onClick={onAddClick}
                className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded-xl transition-all font-semibold flex items-center gap-2"
              >
                <i className="fas fa-plus text-xs"></i>
                Add Resource
              </button>
              <div className="group relative">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-9 h-9 rounded-full border-2 border-blue-500 cursor-pointer"
                />
                <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2">
                  <div className="px-3 py-2 border-b border-slate-800 mb-1">
                    <p className="text-white text-xs font-bold">{user.name}</p>
                    <p className="text-slate-500 text-[10px]">Contributor</p>
                  </div>
                  <button 
                    onClick={onLogout}
                    className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-400/10 rounded-lg text-xs transition-colors"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i> Log Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={onSignInClick}
              className="bg-slate-800 hover:bg-slate-700 text-white text-sm px-6 py-2 rounded-full transition-all border border-slate-700 font-medium"
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
