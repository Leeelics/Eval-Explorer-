
import React from 'react';
import { ResearchItem, ResourceType } from '../types';

interface ResearchCardProps {
  item: ResearchItem;
  onClick: (item: ResearchItem) => void;
}

const ResearchCard: React.FC<ResearchCardProps> = ({ item, onClick }) => {
  const isPaper = item.type === ResourceType.PAPER;

  return (
    <div 
      onClick={() => onClick(item)}
      className="group glass-card rounded-2xl p-6 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 flex flex-col h-full cursor-pointer hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5 active:scale-[0.98]"
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded ${isPaper ? 'bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400' : 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'}`}>
          {item.type}
        </span>
        <span className="text-slate-500 dark:text-slate-500 text-sm font-mono">{item.year}</span>
      </div>
      
      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {item.title}
      </h3>
      
      <div className="flex flex-wrap gap-1 mb-4">
        {item.tags.map(tag => (
          <span key={tag} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
        {item.description}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200 dark:border-slate-700/50">
        <div className="flex -space-x-2 overflow-hidden">
          {item.authors.slice(0, 3).map((author, i) => (
            <div key={i} className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-900 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[8px] font-bold text-slate-700 dark:text-white">
              {author[0]}
            </div>
          ))}
          {item.authors.length > 3 && (
            <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-900 bg-slate-300 dark:bg-slate-800 flex items-center justify-center text-[8px] font-bold text-slate-600 dark:text-slate-400">
              +{item.authors.length - 3}
            </div>
          )}
        </div>
        <div 
          className="text-blue-600 dark:text-blue-400 group-hover:text-blue-500 dark:group-hover:text-blue-300 text-sm font-medium flex items-center gap-1 group/link"
        >
          View Details
          <i className="fas fa-arrow-right text-[10px] transform group-hover/link:translate-x-1 transition-transform"></i>
        </div>
      </div>
    </div>
  );
};

export default ResearchCard;
