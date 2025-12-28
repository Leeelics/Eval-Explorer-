
import React from 'react';
import { ModelItem } from '../types';

interface ModelDetailViewProps {
  model: ModelItem;
  onBack: () => void;
}

const ModelDetailView: React.FC<ModelDetailViewProps> = ({ model, onBack }) => {
  return (
    <div className="glass-card rounded-3xl overflow-hidden border border-blue-500/30 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 p-8 border-b border-slate-700/50">
        <button onClick={onBack} className="text-slate-400 hover:text-white flex items-center gap-2 mb-6 transition-colors text-sm">
          <i className="fas fa-arrow-left"></i> Back to Models
        </button>
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-600/20">
            <i className="fas fa-layer-group text-white text-2xl"></i>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">{model.name}</h2>
            <p className="text-blue-400 font-semibold">{model.organization}</p>
          </div>
        </div>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h4 className="text-[10px] font-bold uppercase text-slate-500 tracking-widest mb-4">Description</h4>
            <p className="text-slate-300 text-lg leading-relaxed">{model.description}</p>
          </section>

          <section>
            <h4 className="text-[10px] font-bold uppercase text-slate-500 tracking-widest mb-4">Benchmark Scores</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {model.evalData.map((data, idx) => (
                <div key={idx} className="p-5 bg-slate-800/30 rounded-2xl border border-slate-700/30 flex justify-between items-center group hover:border-blue-500/30 transition-all">
                  <div>
                    <span className="text-xs text-slate-500 font-bold uppercase">{data.datasetName}</span>
                    <p className="text-xl font-bold text-white">{data.score}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">Metric</span>
                    <span className="text-blue-400 font-mono text-xs">{data.metric}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* New: Genealogy / Family Tree */}
          <section className="bg-slate-900/50 p-6 rounded-3xl border border-slate-700/30">
            <h4 className="text-[10px] font-bold uppercase text-slate-500 tracking-widest mb-6 text-center">Model Genealogy</h4>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
              <div className="flex-1 w-full text-center">
                <span className="text-[10px] text-slate-500 uppercase mb-2 block">Predecessor</span>
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 text-slate-400 text-sm">
                  {model.predecessorName || 'None'}
                </div>
              </div>
              <i className="fas fa-long-arrow-alt-right text-slate-700 hidden md:block text-2xl"></i>
              <div className="flex-1 w-full text-center">
                <span className="text-[10px] text-blue-400 uppercase mb-2 block">Current</span>
                <div className="p-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20">
                  {model.name}
                </div>
              </div>
              <i className="fas fa-long-arrow-alt-right text-slate-700 hidden md:block text-2xl"></i>
              <div className="flex-1 w-full text-center">
                <span className="text-[10px] text-slate-500 uppercase mb-2 block">Successor</span>
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 text-slate-400 text-sm">
                  {model.successorName || 'Under Development'}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-slate-800/20 rounded-2xl border border-slate-700/50">
            <h4 className="text-white font-bold mb-4 text-sm">Details</h4>
            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Release Date</span>
                <span className="text-white font-mono">{model.releaseDate}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block mb-2">Key Scopes</span>
                <div className="flex flex-wrap gap-2">
                  {model.tasks.map(t => (
                    <span key={t} className="px-2 py-1 bg-slate-900 rounded border border-slate-700 text-xs text-slate-300">{t}</span>
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
