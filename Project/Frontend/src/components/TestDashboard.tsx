
import React, { useState } from 'react';
import { suite, type SuiteResult } from '../Tests/Assertions';

const TestDashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [reports, setReports] = useState<SuiteResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runTests = async () => {
    setIsRunning(true);
    const results = await suite.run();
    setReports(results);
    setIsRunning(false);
  };

  const totalTests = reports.reduce((acc, s) => acc + s.results.length, 0);
  const passedTests = reports.reduce((acc, s) => acc + s.results.filter(r => r.passed).length, 0);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-[100] w-12 h-12 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
        title="Open Test Dashboard"
      >
        <span className="material-symbols-outlined">terminal</span>
      </button>

      <div className={`fixed inset-y-0 left-0 w-full max-w-lg bg-slate-900 z-[110] shadow-2xl border-r border-white/10 transform transition-transform duration-500 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full p-8 text-white font-mono text-sm">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="text-primary">●</span> Suite Runner
            </h2>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <button 
            onClick={runTests}
            disabled={isRunning}
            className={`w-full py-3 rounded-lg font-bold mb-8 transition-all ${isRunning ? 'bg-slate-700' : 'bg-primary hover:bg-primary/80'}`}
          >
            {isRunning ? 'EXECUTING...' : 'RUN ALL ROBUSTNESS TESTS'}
          </button>

          <div className="flex-grow overflow-y-auto space-y-8 custom-scrollbar">
            {reports.length === 0 ? (
              <div className="text-slate-500 italic">No tests executed yet. Click run to verify system integrity.</div>
            ) : (
              reports.map(s => (
                <div key={s.name}>
                  <h3 className="text-primary mb-3 uppercase tracking-widest text-[10px] font-black">{s.name}</h3>
                  <div className="space-y-2">
                    {s.results.map(r => (
                      <div key={r.name} className="flex items-start gap-3 p-3 rounded bg-white/5 border border-white/5">
                        <span className={`material-symbols-outlined text-sm mt-0.5 ${r.passed ? 'text-emerald-400' : 'text-red-400'}`}>
                          {r.passed ? 'check_circle' : 'error'}
                        </span>
                        <div>
                          <div className="font-bold">{r.name}</div>
                          {r.error && <div className="text-red-400 text-xs mt-1 bg-red-400/10 p-2 rounded">{r.error}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {reports.length > 0 && (
            <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
              <span className="text-slate-400">Integrity Score</span>
              <span className={`text-xl font-bold ${passedTests === totalTests ? 'text-emerald-400' : 'text-red-400'}`}>
                {passedTests}/{totalTests} PASSED
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TestDashboard;
