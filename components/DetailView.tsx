
import React, { useState } from 'react';
import { ResearchItem, ResourceType } from '../types';

interface DetailViewProps {
  item: ResearchItem;
  onBack: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ item, onBack }) => {
  const isPaper = item.type === ResourceType.PAPER;
  const isDataset = item.type === ResourceType.DATASET;
  const [showAnswer, setShowAnswer] = useState(false);

  const getInsightIcon = (type: string) => {
    switch(type) {
      case 'WARNING': return 'fa-exclamation-triangle text-amber-500';
      case 'CRITIQUE': return 'fa-glasses text-indigo-400';
      case 'SATURATION': return 'fa-chart-line text-red-400';
      default: return 'fa-info-circle text-blue-400';
    }
  };

  const getInsightColor = (type: string) => {
    switch(type) {
      case 'WARNING': return 'border-amber-500/30 bg-amber-500/5';
      case 'CRITIQUE': return 'border-indigo-500/30 bg-indigo-500/5';
      case 'SATURATION': return 'border-red-500/30 bg-red-500/5';
      default: return 'border-blue-500/30 bg-blue-500/5';
    }
  };

  return (
    <div className="glass-card rounded-3xl overflow-hidden border border-blue-500/30 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
            <span className="text-slate-300 text-sm">{item.authors.join(', ')}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <a href={item.link} target="_blank" className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2">
              <i className="fas fa-file-pdf"></i> Read Paper
            </a>
            {item.projectLink && (
              <a href={item.projectLink} target="_blank" className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all border border-slate-700 flex items-center gap-2">
                <i className="fab fa-github"></i> Project Repo
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">
          
          {/* New: Expert Insights / Critique Section */}
          {item.analysisInsights && item.analysisInsights.length > 0 && (
            <section className="animate-in fade-in duration-700 delay-100">
              <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                <i className="fas fa-lightbulb text-yellow-400"></i> Expert Insights
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {item.analysisInsights.map((insight, idx) => (
                  <div key={idx} className={`rounded-xl p-5 border ${getInsightColor(insight.type)}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <i className={`fas ${getInsightIcon(insight.type)} text-sm`}></i>
                      <span className="font-bold text-slate-200 text-sm">{insight.title}</span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {insight.content}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section>
            <h4 className="text-blue-400 text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <i className="fas fa-info-circle"></i> Overview
            </h4>
            <p className="text-slate-300 leading-relaxed text-lg italic">{item.description}</p>
          </section>

          {/* Data Samples / Inspection Deck */}
          {item.exampleQuestions && item.exampleQuestions.length > 0 && (
            <section className="bg-slate-900 border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
              <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
                <h4 className="text-white text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                  <i className="fas fa-microscope text-emerald-400"></i> Data Sample
                </h4>
                <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-1 rounded">One-shot Example</span>
              </div>
              <div className="p-6">
                <div className="font-mono text-sm text-slate-300 bg-slate-950/50 p-4 rounded-xl border border-slate-800 mb-6 whitespace-pre-wrap">
                  {item.exampleQuestions[0].prompt}
                  
                  {item.exampleQuestions[0].options && (
                    <div className="mt-4 space-y-1">
                      {item.exampleQuestions[0].options.map(opt => (
                        <div key={opt} className="text-slate-400">{opt}</div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center">
                  {!showAnswer ? (
                    <button 
                      onClick={() => setShowAnswer(true)}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 transition-colors"
                    >
                      Reveal Answer <i className="fas fa-eye ml-1"></i>
                    </button>
                  ) : (
                    <div className="w-full bg-emerald-900/10 border border-emerald-500/20 rounded-xl p-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-emerald-400 uppercase">Correct Answer</span>
                        <button onClick={() => setShowAnswer(false)} className="text-slate-500 hover:text-white"><i className="fas fa-times"></i></button>
                      </div>
                      <p className="text-white font-bold text-lg mb-2">{item.exampleQuestions[0].answer}</p>
                      {item.exampleQuestions[0].reasoning && (
                        <p className="text-emerald-200/60 text-sm italic border-t border-emerald-500/10 pt-2 mt-2">
                          <i className="fas fa-brain mr-1"></i> Reasoning: {item.exampleQuestions[0].reasoning}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Metric Logic Deep Dive */}
          {item.metricConfigs && item.metricConfigs.length > 0 && (
            <section>
              <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                <i className="fas fa-ruler-combined text-indigo-400"></i> Evaluation Logic
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {item.metricConfigs.map((metric, idx) => (
                  <div key={idx} className="bg-slate-800/20 border border-slate-700/50 rounded-xl p-5 hover:border-indigo-500/30 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="text-white font-bold text-base">{metric.name}</h5>
                      {metric.range && <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-1 rounded border border-slate-700">Range: {metric.range}</span>}
                    </div>
                    <p className="text-slate-400 text-sm mb-3">{metric.description}</p>
                    {metric.formula && (
                      <div className="bg-slate-950 p-3 rounded-lg font-mono text-xs text-indigo-300 border border-slate-800/50">
                        {metric.formula}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Citation Trend Chart */}
          {isDataset && item.citationHistory && (
            <section className="bg-slate-800/20 border border-slate-700/50 p-6 rounded-2xl">
              <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-6">Citation Velocity</h4>
              <div className="flex items-end gap-4 h-32 px-4">
                {item.citationHistory.map((data, idx) => {
                  const maxCount = Math.max(...item.citationHistory!.map(d => d.count));
                  const height = (data.count / maxCount) * 100;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                      <div 
                        className="w-full bg-blue-600/40 border-t-2 border-blue-500 rounded-t group-hover:bg-blue-500/60 transition-all cursor-help"
                        style={{ height: `${height}%` }}
                        title={`${data.count} citations`}
                      ></div>
                      <span className="text-[10px] text-slate-500 font-bold">{data.year}</span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {item.methodology && (
            <section className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl">
              <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-3">Methodology</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{item.methodology}</p>
            </section>
          )}
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-slate-800/20 rounded-2xl border border-slate-700/50">
            <h4 className="text-white font-bold mb-4 text-sm">Evaluation Specs</h4>
            <div className="space-y-4">
              {item.metrics && (
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block mb-2">Metrics Used</span>
                  <div className="flex flex-wrap gap-2">
                    {item.metrics.map(m => (
                      <span key={m} className="px-2 py-1 bg-slate-900 rounded border border-slate-700 text-xs text-slate-300">{m}</span>
                    ))}
                  </div>
                </div>
              )}
              {item.leaderboard && (
                <div>
                   <span className="text-[10px] text-slate-500 uppercase font-bold block mb-2">Current Top 3</span>
                   <ul className="space-y-2">
                     {item.leaderboard.slice(0, 3).map((l, i) => (
                       <li key={i} className="flex justify-between text-xs border-b border-slate-700/50 pb-1 last:border-0">
                         <span className="text-slate-300">{l.modelName}</span>
                         <span className="text-blue-400 font-bold">{l.score}</span>
                       </li>
                     ))}
                   </ul>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 bg-slate-800/20 rounded-2xl border border-slate-700/50">
            <h4 className="text-white font-bold mb-4 text-sm">Key Attributes</h4>
            <div className="flex flex-wrap gap-2">
              {item.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-slate-800 text-slate-400 rounded-lg text-xs border border-slate-700">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
