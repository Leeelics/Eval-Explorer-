
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import ResearchCard from './components/ResearchCard';
import DetailView from './components/DetailView';
import ModelsView from './components/ModelsView';
import ModelDetailView from './components/ModelDetailView';
import AuthModal from './components/AuthModal';
import AddEntryModal from './components/AddEntryModal';
import { RESEARCH_ITEMS as INITIAL_ITEMS } from './data';
import { Category, ResourceType, ResearchItem, ModelItem } from './types';

export type Theme = 'light' | 'dark' | 'system';

const App: React.FC = () => {
  const [items, setItems] = useState<ResearchItem[]>(INITIAL_ITEMS);
  const [activeTab, setActiveTab] = useState<'research' | 'models'>('research');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedType, setSelectedType] = useState<ResourceType | 'All'>('All');
  const [selectedItem, setSelectedItem] = useState<ResearchItem | null>(null);
  const [selectedModel, setSelectedModel] = useState<ModelItem | null>(null);
  
  // Auth & UI State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(null);
  const [theme, setTheme] = useState<Theme>('system');

  // Load persistence
  useEffect(() => {
    const saved = localStorage.getItem('user_research_items');
    const savedUser = localStorage.getItem('eval_explorer_user');
    const savedTheme = localStorage.getItem('eval_explorer_theme');
    
    if (saved) {
      setItems([...INITIAL_ITEMS, ...JSON.parse(saved)]);
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedTheme) {
      setTheme(savedTheme as Theme);
    }
  }, []);

  // Theme Logic
  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = 
      theme === 'dark' || 
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('eval_explorer_theme', theme);
  }, [theme]);

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
    <div className="min-h-screen pb-20 transition-colors duration-300">
      <Navbar 
        onSignInClick={() => setIsAuthModalOpen(true)} 
        onAddClick={() => setIsAddModalOpen(true)}
        user={user}
        onLogout={handleLogout}
        theme={theme}
        onThemeChange={setTheme}
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
        
        {/* Navigation Tabs */}
        {!selectedItem && !selectedModel && (
          <div className="flex gap-4 mb-10 justify-center">
            <button 
              onClick={() => setActiveTab('research')}
              className={`px-8 py-3 rounded-2xl font-bold text-sm transition-all ${activeTab === 'research' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800'}`}
            >
              Research & Datasets
            </button>
            <button 
              onClick={() => setActiveTab('models')}
              className={`px-8 py-3 rounded-2xl font-bold text-sm transition-all ${activeTab === 'models' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800'}`}
            >
              Models Ecosystem
            </button>
          </div>
        )}

        {selectedItem ? (
          <DetailView item={selectedItem} onBack={() => setSelectedItem(null)} />
        ) : selectedModel ? (
          <ModelDetailView model={selectedModel} onBack={() => setSelectedModel(null)} />
        ) : activeTab === 'research' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-8">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between glass-card p-4 rounded-2xl sticky top-24 z-40 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50">
                <div className="relative w-full md:w-64">
                  <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                  <input 
                    type="text" 
                    placeholder="Search repository..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-slate-900 dark:text-white placeholder-slate-500"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value as any)}
                    className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-lg px-3 py-2 outline-none cursor-pointer"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <select 
                    value={selectedType} 
                    onChange={(e) => setSelectedType(e.target.value as any)}
                    className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-lg px-3 py-2 outline-none cursor-pointer"
                  >
                    {types.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {filteredItems.map(item => (
                  <ResearchCard key={item.id} item={item} onClick={(item) => setSelectedItem(item)} />
                ))}
              </div>
            </div>

            <aside className="lg:col-span-4 space-y-8">
              <div className="sticky top-24 space-y-8">
                <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-white/5 shadow-2xl shadow-blue-500/5">
                  <h4 className="text-slate-900 dark:text-white font-bold mb-4 flex items-center gap-2">
                    <i className="fas fa-chart-line text-blue-500"></i> Key Metrics
                  </h4>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Total Resources</span>
                      <span className="text-slate-900 dark:text-white font-semibold">{items.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Total Citations</span>
                      <span className="text-slate-900 dark:text-white font-semibold">{items.reduce((acc, curr) => acc + (curr.citationCount || 0), 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          <ModelsView onSelectModel={(model) => setSelectedModel(model)} />
        )}
      </main>

      <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 py-10 text-center">
        <p className="text-slate-500 text-sm">&copy; 2024 EvalExplorer Research Repository.</p>
      </footer>
    </div>
  );
};

export default App;
