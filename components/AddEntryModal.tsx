
import React, { useState } from 'react';
import { ResourceType, Category, ResearchItem } from '../types';

interface AddEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: ResearchItem) => void;
}

const AddEntryModal: React.FC<AddEntryModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<ResearchItem>>({
    type: ResourceType.PAPER,
    category: Category.GENERAL,
    year: new Date().getFullYear(),
    tags: [],
    authors: [],
    relatedPapers: []
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.link) return;
    
    const newItem: ResearchItem = {
      ...formData as ResearchItem,
      id: Math.random().toString(36).substr(2, 9),
      authors: formData.authors?.length ? formData.authors : ['Anonymous'],
    };
    onSave(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 dark:bg-slate-950/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative glass-card w-full max-w-2xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
        <div className="bg-slate-100 dark:bg-slate-900 px-8 py-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Add New Research Resource</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900 dark:text-slate-500 dark:hover:text-white"><i className="fas fa-times"></i></button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 max-h-[70vh] overflow-y-auto space-y-6 bg-white dark:bg-slate-900/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Title</label>
              <input 
                required
                type="text" 
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. MMLU: Measuring Massive Multitask..."
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Resource Type</label>
              <select 
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value as ResourceType})}
              >
                <option value={ResourceType.PAPER}>Research Paper</option>
                <option value={ResourceType.DATASET}>Dataset</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Category</label>
              <select 
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as Category})}
              >
                {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Year</label>
              <input 
                type="number" 
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.year}
                onChange={e => setFormData({...formData, year: parseInt(e.target.value)})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Citation/Scale</label>
              <input 
                type="text" 
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder={formData.type === ResourceType.DATASET ? "e.g. 15k items" : "e.g. 1200 citations"}
                onChange={e => formData.type === ResourceType.DATASET 
                  ? setFormData({...formData, itemCount: e.target.value})
                  : setFormData({...formData, citationCount: parseInt(e.target.value) || 0})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Description / Abstract</label>
            <textarea 
              required
              rows={3}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Short summary of the resource..."
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Paper/Main Link</label>
              <input 
                required
                type="url" 
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="https://arxiv.org/..."
                onChange={e => setFormData({...formData, link: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Project/Repo Link (Optional)</label>
              <input 
                type="url" 
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="https://github.com/..."
                onChange={e => setFormData({...formData, projectLink: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Methodology / Detailed Idea</label>
            <textarea 
              rows={2}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="How does it work? What's the main innovation?"
              onChange={e => setFormData({...formData, methodology: e.target.value})}
            />
          </div>
        </form>

        <div className="bg-slate-100 dark:bg-slate-900 px-8 py-6 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white font-medium text-sm transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-600/20"
          >
            Publish Entry
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEntryModal;
