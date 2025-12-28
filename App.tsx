
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import ResearchCard from './components/ResearchCard';
import DetailView from './components/DetailView';
import AuthModal from './components/AuthModal';
import AddEntryModal from './components/AddEntryModal';
import { RESEARCH_ITEMS as INITIAL_ITEMS } from './data';
import { Category, ResourceType, ResearchItem } from './types';

const App: React.FC = () => {
  const [items, setItems] = useState<ResearchItem[]>(INITIAL_ITEMS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedType, setSelectedType] = useState<ResourceType | 'All'>('All');
  const [selectedItem, setSelectedItem] = useState<ResearchItem | null>(null);
  
  // Auth & UI State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(null);

  // Load persistence
  useEffect(() => {
    const saved = localStorage.getItem('user_research_items');
    const savedUser = localStorage.getItem('eval_explorer_user');
    if (saved) {
      setItems([...INITIAL_ITEMS, ...JSON.parse(saved)]);
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (provider: 'google' | 'github') => {
    const mockUser = {
      name: provider === 'google' ? 'Google Researcher' : 'GitHub Contributor',
      avatar: provider === 'google' 
        ? 'https://api.dicebear.com/7.x/avataaars/svg?seed=Google' 
        : 'https://api.dicebear.com/7.x/avataaars/svg?seed=Github'
    };
    setUser(mockUser);
    localStorage.setItem('eval_explorer_user', JSON.stringify(mockUser));
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('eval_explorer_user');
  };

  const handleAddItem = (newItem: ResearchItem) => {
    const userItems = JSON.parse(localStorage.getItem('user_research_items') || '[]');
    const updatedUserItems = [...userItems, newItem];
    localStorage.setItem('user_research_items', JSON.stringify(updatedUserItems));
    setItems([...INITIAL_ITEMS, ...updatedUserItems]);
  };

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesType = selectedType === 'All' || item.type === selectedType;
      
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [searchTerm, selectedCategory, selectedType, items]);

  const categories = ['All', ...Object.values(Category)];
  const types = ['All', ...Object.values(ResourceType)];

  return (
    <div className="min-h-screen pb-20">
      <Navbar 
        onSignInClick={() => setIsAuthModalOpen(true)} 
        onAddClick={() => setIsAddModalOpen(true)}
        user={user}
        onLogout={handleLogout}
      />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={handleLogin}
      />

      <AddEntryModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSave={handleAddItem}
      />

      <main className="max-w-7xl mx-auto px-6">
        {!selectedItem && (
          <section className="mb-16 text-center animate-in fade-in duration-700">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">
              LLM Evaluation Research Hub
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Explore the seminal papers and essential benchmarks driving the science of Large Language Model evaluation.
            </p>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            {selectedItem ? (
              <DetailView item={selectedItem} onBack={() => setSelectedItem(null)} />
            ) : (
              <>
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
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-24 space-y-8">
              <div className="glass-card rounded-2xl p-6 border border-white/5 shadow-2xl shadow-blue-500/5">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <i className="fas fa-chart-line text-blue-500"></i>
                  Key Metrics
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Total Resources</span>
                    <span className="text-white font-mono">{items.length}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Total Citations Indexed</span>
                    <span className="text-white font-mono">
                      {items.reduce((acc, curr) => acc + (curr.citationCount || 0), 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">User Submissions</span>
                    <span className="text-white font-mono">{items.length - INITIAL_ITEMS.length}</span>
                  </div>
                </div>
              </div>

              {!user ? (
                <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-700 border border-blue-400/20 shadow-xl shadow-blue-900/40">
                  <h4 className="text-white font-bold text-lg mb-2">Want to contribute?</h4>
                  <p className="text-blue-100 text-xs mb-4 leading-relaxed">
                    Join our community of researchers to add new benchmarks and papers to the hub.
                  </p>
                  <button 
                    onClick={() => setIsAuthModalOpen(true)}
                    className="w-full py-2.5 bg-white text-blue-700 font-bold rounded-xl text-xs hover:bg-slate-100 transition-colors"
                  >
                    Join Hub
                  </button>
                </div>
              ) : (
                <div className="p-6 rounded-3xl bg-slate-800 border border-slate-700">
                  <h4 className="text-white font-bold mb-2">Contributor Badge</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Thank you for being part of the EvalExplorer community. You can now add new datasets and papers directly.
                  </p>
                </div>
              )}

              <div className="p-6 glass-card rounded-2xl border border-white/5">
                <h4 className="text-white font-bold mb-4 text-sm">Trending Tags</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-[10px] rounded border border-blue-500/20">#Benchmarking</span>
                  <span className="px-2 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] rounded border border-indigo-500/20">#CodeSynthesis</span>
                  <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] rounded border border-emerald-500/20">#ChainOfThought</span>
                  <span className="px-2 py-1 bg-amber-500/10 text-amber-400 text-[10px] rounded border border-amber-500/20">#Hallucination</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="mt-20 border-t border-slate-800 py-10 text-center">
        <p className="text-slate-500 text-sm">
          &copy; 2024 EvalExplorer Research Repository.
        </p>
      </footer>
    </div>
  );
};

export default App;
