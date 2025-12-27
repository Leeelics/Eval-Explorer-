
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 glass-card px-6 py-4 mb-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <i className="fas fa-microchip text-white text-xl"></i>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Eval<span className="text-blue-500">Explorer</span>
          </h1>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Benchmarks</a>
          <a href="#" className="hover:text-white transition-colors">Leaderboards</a>
          <a href="#" className="hover:text-white transition-colors">About</a>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-slate-800 hover:bg-slate-700 text-white text-sm px-4 py-2 rounded-full transition-all border border-slate-700">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
