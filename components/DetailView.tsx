
import React from 'react';
import { ResearchItem, ResourceType } from '../types';

interface DetailViewProps {
  item: ResearchItem;
  onBack: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ item, onBack }) => {
  const isPaper = item.type === ResourceType.PAPER;

  return (
    <div className="glass-card rounded-3xl overflow-hidden border border-blue-500/30 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900/40 p-8 border-b border-slate-700/50">
        <button 
          onClick={onBack}
          className="text-slate-400 hover:text-white flex items-center gap-2 mb-6 transition-colors text-sm group"
        >
          <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
          Back to list
        </button>
        
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={`text-xs uppercase font-bold tracking-widest px-3 py-1 rounded-full ${isPaper ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
            {item.type}
          </span>
          <span className="text-slate-500 text-sm font-mono flex items-center gap-1">
            <i className="far fa-calendar-alt"></i> {item.year}
          </span>
          {item.category && (
            <span className="text-blue-400 text-xs font-semibold px-2 py-1 bg-blue-500/10 rounded border border-blue-500/20">
              {item.category}
            </span>
          )}
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
          {item.title}
        </h2>

        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {item.authors.slice(0, 3).map((author, i) => (
                <div key={i} className="h-8 w-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white">
                  {author[0]}
                </div>
              ))}
            </div>
            <span className="text-slate-300 text-sm">{item.authors.join(', ')}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href={item.link} 
              target="_blank" 
              className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
            >
              <i className="fas fa-file-pdf"></i> Read Paper
            </a>
            {item.projectLink && (
              <a 
                href={item.projectLink} 
                target="_blank" 
                className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all border border-slate-700 flex items-center gap-2"
              >
                <i className="fab fa-github"></i> Project Repo
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h4 className="text-blue-400 text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <i className="fas fa-info-circle"></i> Abstract & Summary
            </h4>
            <p className="text-slate-300 leading-relaxed text-lg italic">
              {item.description}
            </p>
          </section>

          {item.methodology && (
            <section className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl">
              <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-3">
                Methodology & Approach
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                {item.methodology}
              </p>
            </section>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 glass-card rounded-2xl border border-slate-700/30">
              <span className="text-slate-500 text-[10px] font-bold uppercase block mb-1">Citations</span>
              <span className="text-2xl font-bold text-white font-mono">
                {item.citationCount?.toLocaleString() || 'N/A'}+
              </span>
            </div>
            <div className="p-5 glass-card rounded-2xl border border-slate-700/30">
              <span className="text-slate-500 text-[10px] font-bold uppercase block mb-1">
                {item.type === ResourceType.DATASET ? 'Scale' : 'Domain'}
              </span>
              <span className="text-xl font-bold text-white">
                {item.type === ResourceType.DATASET ? item.itemCount : item.domain}
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar Context */}
        <div className="space-y-6">
          <div className="p-6 bg-slate-800/20 rounded-2xl border border-slate-700/50">
            <h4 className="text-white font-bold mb-4 text-sm">Key Attributes</h4>
            <div className="flex flex-wrap gap-2">
              {item.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-slate-800 text-slate-400 rounded-lg text-xs border border-slate-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {item.relatedPapers && item.relatedPapers.length > 0 && (
            <div className="p-6 bg-blue-900/10 rounded-2xl border border-blue-500/10">
              <h4 className="text-blue-300 font-bold mb-4 text-sm flex items-center gap-2">
                <i className="fas fa-link"></i> Latest References
              </h4>
              <ul className="space-y-4">
                {item.relatedPapers.map((rp, i) => (
                  <li key={i}>
                    <a 
                      href={rp.link} 
                      target="_blank" 
                      className="text-slate-400 hover:text-blue-400 text-xs leading-snug block transition-colors border-l-2 border-slate-700 pl-3 hover:border-blue-500"
                    >
                      {rp.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailView;
