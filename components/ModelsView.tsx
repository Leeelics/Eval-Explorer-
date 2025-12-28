
import React from 'react';
import { ModelItem } from '../types';
import { MODEL_ITEMS } from '../data';

interface ModelsViewProps {
  onSelectModel: (model: ModelItem) => void;
}

const ModelsView: React.FC<ModelsViewProps> = ({ onSelectModel }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MODEL_ITEMS.map((model) => (
          <div 
            key={model.id}
            onClick={() => onSelectModel(model)}
            className="group glass-card rounded-2xl p-6 border border-white/5 hover:border-blue-500/50 transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
                {model.organization}
              </span>
              <span className="text-slate-500 text-xs font-mono">{model.releaseDate}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{model.name}</h3>
            <p className="text-slate-400 text-sm line-clamp-2 mb-4">{model.description}</p>
            <div className="flex flex-wrap gap-1 mb-6">
              {model.tasks.map(t => (
                <span key={t} className="text-[10px] bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full">{t}</span>
              ))}
            </div>
            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-500">{model.evalData.length} Evaluation Points</span>
              <i className="fas fa-chevron-right text-xs text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelsView;
