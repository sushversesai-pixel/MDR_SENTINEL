import React, { useState } from 'react';
import { IconZap } from './Icons';

export default function WhatIfSimulator({ onClose }) {
  const [scenario, setScenario] = useState(null);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-orange-400 flex items-center gap-2">
            <IconZap className="w-8 h-8" />
            WHAT-IF SIMULATOR
          </h2>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-all"
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => setScenario(1)}
            className="bg-gradient-to-br from-red-950/60 to-red-800/60 rounded-xl p-6 border border-red-500 hover:scale-[1.03] transition-all text-center"
          >
            <div className="text-5xl mb-4">🚫</div>
            <h3 className="text-lg font-bold text-white mb-2">Scenario 1</h3>
            <p className="text-gray-300 text-sm font-light">No handwashing compliance?</p>
          </button>
          <button
            onClick={() => setScenario(2)}
            className="bg-gradient-to-br from-orange-950/60 to-orange-800/60 rounded-xl p-6 border border-orange-500 hover:scale-[1.03] transition-all text-center"
          >
            <div className="text-5xl mb-4">🔧</div>
            <h3 className="text-lg font-bold text-white mb-2">Scenario 2</h3>
            <p className="text-gray-300 text-sm font-light">No equipment disinfection?</p>
          </button>
          <button
            onClick={() => setScenario(3)}
            className="bg-gradient-to-br from-purple-950/60 to-purple-800/60 rounded-xl p-6 border border-purple-500 hover:scale-[1.03] transition-all text-center"
          >
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-lg font-bold text-white mb-2">Scenario 3</h3>
            <p className="text-gray-300 text-sm font-light">No MDR Sentinel AI system?</p>
          </button>
        </div>

        {scenario === 1 && (
          <div className="bg-slate-900 rounded-xl p-8 border border-slate-800">
            <h3 className="text-2xl font-bold text-red-400 mb-4">Scenario 1: No Handwashing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
                <h4 className="font-bold text-red-400 mb-2 text-lg">Infections: 3 Cases</h4>
                <p className="text-gray-300 text-sm font-light font-light">Baby Emma, Patient John, Nurse Maria contaminated.</p>
              </div>
              <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
                <h4 className="font-bold text-red-400 mb-2 text-lg">Financial Damage</h4>
                <p className="text-gray-300 text-sm font-light font-light">Outbreak mitigation, extra ICU length of stay. Estimated Cost: $297,000.</p>
              </div>
            </div>
          </div>
        )}

        {scenario === 2 && (
          <div className="bg-slate-900 rounded-xl p-8 border border-slate-800">
            <h3 className="text-2xl font-bold text-orange-400 mb-4">Scenario 2: No Equipment Cleaning</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
                <h4 className="font-bold text-orange-400 mb-2 text-lg">Infections: 5 Cases</h4>
                <p className="text-gray-300 text-sm font-light font-light">Cross-contamination of shared diagnostic tools. Multiple rooms infected via contaminated BP Cuff #23.</p>
              </div>
              <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
                <h4 className="font-bold text-orange-400 mb-2 text-lg">Financial Damage</h4>
                <p className="text-gray-300 text-sm font-light font-light">Equipment replacement, contact isolation penalties. Estimated Cost: $495,000.</p>
              </div>
            </div>
          </div>
        )}

        {scenario === 3 && (
          <div className="bg-slate-900 rounded-xl p-8 border border-slate-800">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">Scenario 3: No MDR Sentinel AI System</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
                <h4 className="font-bold text-red-500 mb-2 text-lg">Infections: 8+ Cases</h4>
                <p className="text-gray-300 text-sm font-light font-light font-light font-light">Catastrophic outbreak. Detection delayed by 48-72 hours until lab cultures verify transmission path.</p>
              </div>
              <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
                <h4 className="font-bold text-red-500 mb-2 text-lg">Hospital Impact</h4>
                <p className="text-gray-300 text-sm font-light font-light font-light">1 fatality predicted, full federal investigation, accreditation loss risk. Mitigating cost: $1.2M+.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
