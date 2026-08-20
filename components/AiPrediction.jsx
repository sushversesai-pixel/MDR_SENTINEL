import React, { useState } from 'react';
import { IconShield } from './Icons';

export default function AiPrediction({ onClose }) {
  const [predictionPage, setPredictionPage] = useState(1);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-purple-400 flex items-center gap-2">
            <IconShield className="w-6 h-6" />
            🔮 AI INFECTION PREDICTION
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => setPredictionPage(p => p === 1 ? 2 : 1)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
            >
              {predictionPage === 1 ? "Chain Analysis" : "Visual Path"}
            </button>
            <button
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
            >
              Close
            </button>
          </div>
        </div>

        {predictionPage === 1 ? (
          <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-6">Infection Spread Visualization</h3>
            <div className="bg-slate-900 rounded-lg p-6 mb-6 overflow-x-auto border border-slate-800">
              <svg width="850" height="250" viewBox="0 0 900 300" className="mx-auto">
                <circle cx="150" cy="150" r="40" fill="#ef4444" opacity="0.6" />
                <text x="150" y="150" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Patient Tom</text>
                <text x="150" y="215" textAnchor="middle" fill="#94a3b8" fontSize="11">8:00 AM - SOURCE</text>

                <line x1="190" y1="150" x2="310" y2="150" stroke="#eab308" strokeWidth="3" />
                <polygon points="310,145 320,150 310,155" fill="#eab308" />

                <circle cx="360" cy="150" r="40" fill="#eab308" />
                <text x="360" y="150" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">Nurse Sarah</text>
                <text x="360" y="215" textAnchor="middle" fill="#94a3b8" fontSize="11">8:16 AM - EXPOSED</text>

                <line x1="400" y1="150" x2="520" y2="150" stroke="#f97316" strokeWidth="3" />
                <polygon points="520,145 530,150 520,155" fill="#f97316" />

                <circle cx="570" cy="150" r="40" fill="#f97316" />
                <text x="570" y="150" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">BP Cuff #23</text>
                <text x="570" y="215" textAnchor="middle" fill="#94a3b8" fontSize="11">8:20 AM - CONTA.</text>

                <line x1="610" y1="150" x2="710" y2="150" stroke="#ef4444" strokeWidth="3" strokeDasharray="10,10" opacity="0.5" />
                <circle cx="660" cy="150" r="20" fill="#ef4444" />
                <text x="660" y="156" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="bold">✕</text>

                <circle cx="760" cy="150" r="40" fill="#0088ff" />
                <text x="760" y="150" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Baby Emma</text>
                <text x="760" y="215" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">8:40 AM - PROTECTED</text>
              </svg>
            </div>

            <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
              <h4 className="text-lg font-bold text-white mb-3">Chain Analysis</h4>
              <p className="text-gray-300 leading-relaxed text-sm font-light">
                The AI system tracked the infection chain from Patient Tom (MRSA+) through Nurse Sarah's 60-second contact, which led to her contamination. The contaminated BP Cuff #23 was then identified as a transmission vector. When Sarah approached vulnerable Baby Emma, the AI detected 87% risk and blocked entry, preventing infection.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-950/60 to-red-900/60 rounded-xl p-6 border border-red-500 shadow-md">
              <h4 className="text-xl font-bold text-white mb-2">HIGHEST RISK (87%) - Baby Emma</h4>
              <p className="text-gray-300 text-sm font-light mb-3">Newborn with underdeveloped immune system. MRSA exposure would likely result in severe sepsis.</p>
              <div className="inline-block bg-green-600 rounded-lg py-1.5 px-3 text-xs font-bold text-white shadow">
                ✅ STATUS: PREVENTED BY AI SYSTEM
              </div>
            </div>
            <div className="bg-gradient-to-r from-orange-950/60 to-orange-900/60 rounded-xl p-6 border border-orange-500 shadow-md">
              <h4 className="text-xl font-bold text-white mb-2">HIGH RISK (62%) - Patient John</h4>
              <p className="text-gray-300 text-sm font-light">Post-surgical patient. MRSA would delay healing by 2-3 weeks, cost $45,000 additional.</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-950/60 to-yellow-900/60 rounded-xl p-6 border border-yellow-500 shadow-md">
              <h4 className="text-xl font-bold text-white mb-2">MEDIUM RISK (45%) - Nurse Maria</h4>
              <p className="text-gray-300 text-sm font-light">Equipment sharing risk. Could spread to 3-5 additional patients.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
