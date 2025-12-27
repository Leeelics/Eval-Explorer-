
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import ResearchCard from './components/ResearchCard';
import AIAssistant from './components/AIAssistant';
import DetailView from './components/DetailView';
import { RESEARCH_ITEMS } from './data';
import { Category, ResourceType, ResearchItem } from './types';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedType, setSelectedType] = useState<ResourceType | 'All'>('All');
  const [selectedItem, setSelectedItem] = useState<ResearchItem | null>(null);

  const filteredItems = useMemo(() => {
    return RESEARCH_ITEMS.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesType = selectedType === 'All' || item.type === selectedType;
      
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [searchTerm, selectedCategory, selectedType]);

  const categories = ['All', ...Object.values(Category)];
  const types = ['All', ...Object.values(ResourceType)];

  return (
    <div className="min-h-screen pb-20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6">
        {/* Hero Section - Hide when viewing details for focus */}
        {!selectedItem && (
          <section className="mb-16 text-center animate-in fade-in duration-700">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">
              LLM Evaluation Research Hub
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Discover the seminal papers and essential benchmarks driving the science of Large Language Model evaluation.
            </p>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            
            {selectedItem ? (
              <DetailView item={selectedItem} onBack={() => setSelectedItem(null)} />
            ) : (
              <>
                {/* Controls */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between glass-card p-4 rounded-2xl sticky top-24 z-40 shadow-xl shadow-slate-900/50">
                  <div className="relative w-full md:w-64">
                    <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
                    <input 
                      type="text" 
                      placeholder="Search repository..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-white"
                    />
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
                    <select 
                      value={selectedCategory} 
                      onChange={(e) => setSelectedCategory(e.target.value as any)}
                      className="bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition-colors"
                    >
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select 
                      value={selectedType} 
                      onChange={(e) => setSelectedType(e.target.value as any)}
                      className="bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition-colors"
                    >
                      {types.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  {filteredItems.length > 0 ? (
                    filteredItems.map(item => (
                      <ResearchCard 
                        key={item.id} 
                        item={item} 
                        onClick={(item) => setSelectedItem(item)}
                      />
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center glass-card rounded-3xl border border-dashed border-slate-700">
                      <div className="text-slate-500 mb-4">
                        <i className="fas fa-database text-4xl mb-3 opacity-20"></i>
                        <p className="text-lg">No research matches your filters</p>
                      </div>
                      <button 
                        onClick={() => {setSearchTerm(''); setSelectedCategory('All'); setSelectedType('All');}}
                        className="text-blue-500 hover:text-blue-400 font-medium transition-colors"
                      >
                        Clear all filters
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Sidebar Area */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-24">
              <AIAssistant />
              
              <div className="mt-8 glass-card rounded-2xl p-6 border border-white/5">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <i className="fas fa-chart-line text-blue-500"></i>
                  Key Metrics
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Total Resources</span>
                    <span className="text-white font-mono">{RESEARCH_ITEMS.length}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Total Citations Indexed</span>
                    <span className="text-white font-mono">
                      {RESEARCH_ITEMS.reduce((acc, curr) => acc + (curr.citationCount || 0), 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Latest Entry</span>
                    <span className="text-white font-mono">TruthfulQA (2022)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-500/20">
                <p className="text-[10px] text-blue-400 uppercase font-bold mb-2 tracking-widest">Knowledge Base</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Our repository contains peer-reviewed papers and validated datasets. Click on any item to explore its methodology, citation impact, and related research.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="mt-20 border-t border-slate-800 py-10 text-center">
        <p className="text-slate-500 text-sm">
          &copy; 2024 EvalExplorer Research Repository. All rights reserved.
        </p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="text-slate-500 hover:text-white transition-colors"><i className="fab fa-github"></i></a>
          <a href="#" className="text-slate-500 hover:text-white transition-colors"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-slate-500 hover:text-white transition-colors"><i className="fas fa-envelope"></i></a>
        </div>
      </footer>
    </div>
  );
};

export default App;
