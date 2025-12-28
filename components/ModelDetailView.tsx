
import React from 'react';
import { ModelItem } from '../types';

interface ModelDetailViewProps {
  model: ModelItem;
  onBack: () => void;
}

const ModelDetailView: React.FC<ModelDetailViewProps> = ({ model, onBack }) => {
  return (
    <div className="glass-card rounded-3xl overflow-hidden border border-slate-200 dark:border-blue-500/30 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-50/50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-blue-900/20 dark:to-slate-900 p-8 border-b border-slate-200 dark:border-slate-700/50">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-2 mb-6 transition-colors text-sm">
          <i className="fas fa-arrow-left"></i> Back to Models
        </button>
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-600/20">
            <i className="fas fa-layer-group text-white text-2xl"></i>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{model.name}</h2>
            <p className="text-blue-600 dark:text-blue-400 font-semibold">{model.organization}</p>
          </div>
        </div>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <section>
            <h4 className="text-[10px] font-bold uppercase text-slate-500 tracking-widest mb-4">Description</h4>
            <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">{model.description}</p>
          </section>

          {/* Capabilities Analysis (Strengths & Limitations) */}
          {(model.strengths || model.limitations) && (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {model.strengths && (
                <div className="bg-emerald-50 dark:bg-emerald-900/5 border border-emerald-500/20 p-5 rounded-2xl">
                   <h4 className="text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                     <i className="fas fa-plus-circle"></i> Key Strengths
                   </h4>
                   <ul className="space-y-2">
                     {model.strengths.map((s, i) => (
                       <li key={i} className="text-slate-700 dark:text-slate-300 text-sm flex items-start gap-2">
                         <i className="fas fa-check text-emerald-500 mt-1 text-[10px]"></i>
                         {s}
                       </li>
                     ))}
                   </ul>
                </div>
              )}
              {model.limitations && (
                 <div className="bg-red-50 dark:bg-red-900/5 border border-red-500/20 p-5 rounded-2xl">
                   <h4 className="text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                     <i className="fas fa-minus-circle"></i> Limitations
                   </h4>
                   <ul className="space-y-2">
                     {model.limitations.map((s, i) => (
                       <li key={i} className="text-slate-700 dark:text-slate-300 text-sm flex items-start gap-2">
                         <i className="fas fa-exclamation text-red-500 mt-1 text-[10px]"></i>
                         {s}
                       </li>
                     ))}
                   </ul>
                </div>
              )}
            </section>
          )}

          {/* Ecosystem / Variants Matrix */}
          {model.variants && (
            <section>
               <h4 className="text-[10px] font-bold uppercase text-slate-500 tracking-widest mb-4">Model Family Matrix</h4>
               <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700/50">
                 <table className="w-full text-left text-sm">
                   <thead className="bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold">
                     <tr>
                       <th className="px-6 py-3">Variant</th>
                       <th className="px-6 py-3">Params</th>
                       <th className="px-6 py-3">License</th>
                       <th className="px-6 py-3">Recommended Use</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                     {model.variants.map((v, i) => (
                       <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                         <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{v.name}</td>
                         <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-mono text-xs">{v.params}</td>
                         <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-xs">
                           <span className={`px-2 py-0.5 rounded ${v.license.includes('Apache') ? 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400' : 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400'}`}>
                             {v.license}
                           </span>
                         </td>
                         <td className="px-6 py-4 text-slate-600 dark:text-slate-300 text-xs italic">{v.recommendedUse}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </section>
          )}

          <section>
            <h4 className="text-[10px] font-bold uppercase text-slate-500 tracking-widest mb-4">Benchmark Scores</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {model.evalData.map((data, idx) => (
                <div key={idx} className="p-5 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700/30 flex justify-between items-center group hover:border-blue-500/30 transition-all">
                  <div>
                    <span className="text-xs text-slate-500 font-bold uppercase">{data.datasetName}</span>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">{data.score}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">Metric</span>
                    <span className="text-blue-600 dark:text-blue-400 font-mono text-xs">{data.metric}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Genealogy / Family Tree */}
          <section className="bg-slate-100 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-700/30">
            <h4 className="text-[10px] font-bold uppercase text-slate-500 tracking-widest mb-6 text-center">Model Genealogy</h4>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
              <div className="flex-1 w-full text-center">
                <span className="text-[10px] text-slate-500 uppercase mb-2 block">Predecessor</span>
                <div className="p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm">
                  {model.predecessorName || 'None'}
                </div>
              </div>
              <i className="fas fa-long-arrow-alt-right text-slate-400 dark:text-slate-700 hidden md:block text-2xl"></i>
              <div className="flex-1 w-full text-center">
                <span className="text-[10px] text-blue-600 dark:text-blue-400 uppercase mb-2 block">Current</span>
                <div className="p-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20">
                  {model.name}
                </div>
              </div>
              <i className="fas fa-long-arrow-alt-right text-slate-400 dark:text-slate-700 hidden md:block text-2xl"></i>
              <div className="flex-1 w-full text-center">
                <span className="text-[10px] text-slate-500 uppercase mb-2 block">Successor</span>
                <div className="p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm">
                  {model.successorName || 'Under Development'}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-slate-50 dark:bg-slate-800/20 rounded-2xl border border-slate-200 dark:border-slate-700/50">
            <h4 className="text-slate-900 dark:text-white font-bold mb-4 text-sm">Details</h4>
            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Release Date</span>
                <span className="text-slate-800 dark:text-white font-mono">{model.releaseDate}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block mb-2">Key Scopes</span>
                <div className="flex flex-wrap gap-2">
                  {model.tasks.map(t => (
                    <span key={t} className="px-2 py-1 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetailView;
