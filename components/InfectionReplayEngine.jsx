import React, { useState, useEffect, useRef } from 'react';
import {
  IconClock,
  IconPause,
  IconPlay,
  IconRotateCcw
} from './Icons';

export default function InfectionReplayEngine({ onClose }) {
  const [replayPlaying, setReplayPlaying] = useState(false);
  const [replayProgress, setReplayProgress] = useState(0);
  const [replaySpeed, setReplaySpeed] = useState(1);
  const [replayCase, setReplayCase] = useState(1);

  const replayRef = useRef(null);

  useEffect(() => {
    if (replayPlaying) {
      replayRef.current = setInterval(() => {
        setReplayProgress(p => {
          if (p >= 100) {
            setReplayPlaying(false);
            return 100;
          }
          return p + 0.5 * replaySpeed;
        });
      }, 50);
    } else {
      if (replayRef.current) clearInterval(replayRef.current);
    }
    return () => {
      if (replayRef.current) clearInterval(replayRef.current);
    };
  }, [replayPlaying, replaySpeed]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
            <IconClock className="w-6 h-6" />
            ⏰ Infection Replay Engine (IRE)
          </h2>
          <button
            onClick={() => { onClose(); setReplayPlaying(false); }}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-all"
          >
            Close
          </button>
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => { setReplayCase(1); setReplayProgress(0); setReplayPlaying(false); }}
            className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
              replayCase === 1 ? "bg-cyan-600 text-white shadow" : "bg-slate-700 text-gray-300"
            }`}
          >
            Case 1: Basic Prevention
          </button>
          <button
            onClick={() => { setReplayCase(2); setReplayProgress(0); setReplayPlaying(false); }}
            className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
              replayCase === 2 ? "bg-cyan-600 text-white shadow" : "bg-slate-700 text-gray-300"
            }`}
          >
            Case 2: Super Spreader
          </button>
        </div>

        <div className="bg-slate-900 rounded-lg p-6 border border-slate-800 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex gap-3">
              <button
                onClick={() => setReplayPlaying(!replayPlaying)}
                className={`px-6 py-2.5 rounded-lg font-bold text-sm text-white flex items-center gap-2 transition-all ${
                  replayPlaying ? "bg-orange-600 hover:bg-orange-700" : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {replayPlaying ? (
                  <>
                    <IconPause className="w-5 h-5" /> PAUSE
                  </>
                ) : (
                  <>
                    <IconPlay className="w-5 h-5" /> PLAY
                  </>
                )}
              </button>
              <button
                onClick={() => { setReplayProgress(0); setReplayPlaying(false); }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all"
              >
                <IconRotateCcw className="w-5 h-5" /> RESET
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm font-semibold">Speed:</span>
              {[0.5, 1, 1.5, 2].map(x => (
                <button
                  key={x}
                  onClick={() => setReplaySpeed(x)}
                  className={`px-3 py-1 rounded font-bold text-xs ${
                    replaySpeed === x ? "bg-cyan-600 text-white" : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                  }`}
                >
                  {x}x
                </button>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-10 bg-slate-800 rounded-lg overflow-hidden mb-8 border border-slate-700/50">
            <div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-75"
              style={{ width: `${replayProgress}%` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
              {Math.round(replayProgress)}%
            </div>
          </div>

          {/* Network Visualization */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-6 overflow-x-auto">
            <h4 className="text-lg font-bold text-cyan-400 mb-6">Transmission Network</h4>
            <svg width="850" height="200" viewBox="0 0 900 200" className="mx-auto">
              {replayCase === 1 ? (
                <g>
                  <circle cx="100" cy="100" r="30" fill={replayProgress >= 0 ? "#ef4444" : "#475569"} opacity={replayProgress >= 0 ? 0.6 : 0.3} />
                  <text x="100" y="100" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold" dy="4">Room 105</text>
                  <text x="100" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10">SOURCE</text>

                  <line x1="130" y1="100" x2="220" y2="100" stroke={replayProgress >= 20 ? "#eab308" : "#475569"} strokeWidth="3" strokeDasharray="5,5" />
                  
                  <circle cx="250" cy="100" r="30" fill={replayProgress >= 20 ? "#eab308" : "#475569"} opacity={replayProgress >= 20 ? 0.6 : 0.3} />
                  <text x="250" y="100" textAnchor="middle" fill={replayProgress >= 20 ? "#0f172a" : "#ffffff"} fontSize="12" fontWeight="bold" dy="4">Sarah</text>
                  <text x="250" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10">{replayProgress >= 40 ? "EXPOSED" : "MOVING"}</text>

                  <line x1="280" y1="100" x2="370" y2="100" stroke={replayProgress >= 40 ? "#f97316" : "#475569"} strokeWidth="3" strokeDasharray="5,5" />

                  <circle cx="400" cy="100" r="30" fill={replayProgress >= 40 ? "#f97316" : "#475569"} opacity={replayProgress >= 40 ? 0.6 : 0.3} />
                  <text x="400" y="100" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold" dy="4">BP Cuff</text>
                  <text x="400" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10">EQUIPMENT</text>

                  <line x1="430" y1="100" x2="520" y2="100" stroke={replayProgress >= 60 ? "#ef4444" : "#475569"} strokeWidth="3" strokeDasharray="5,5" />

                  <circle cx="550" cy="100" r="30" fill={replayProgress >= 60 ? "#22c55e" : "#475569"} opacity={replayProgress >= 60 ? 0.6 : 0.3} stroke={replayProgress >= 60 ? "#ef4444" : "none"} strokeWidth="3" />
                  <text x="550" y="100" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold" dy="4">Handwash</text>
                  <text x="550" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10">{replayProgress >= 80 ? "CLEANED" : "ACTIVE"}</text>

                  <line x1="580" y1="100" x2="720" y2="100" stroke={replayProgress >= 80 ? "#22c55e" : "#475569"} strokeWidth="3" strokeDasharray="5,5" />

                  <circle cx="750" cy="100" r="30" fill={replayProgress >= 100 ? "#22c55e" : (replayProgress >= 60 ? "#ef4444" : "#0088ff")} opacity={replayProgress >= 60 ? 0.6 : 0.3} />
                  <text x="750" y="100" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold" dy="4">Room 108</text>
                  <text x="750" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10">{replayProgress >= 100 ? "PROTECTED" : (replayProgress >= 60 ? "ENTRY BLOCKED" : "VULNERABLE")}</text>
                </g>
              ) : (
                <g>
                  <circle cx="100" cy="100" r="30" fill={replayProgress >= 0 ? "#ef4444" : "#475569"} opacity={replayProgress >= 0 ? 0.6 : 0.3} />
                  <text x="100" y="100" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold" dy="4">Room 104</text>
                  <text x="100" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10">SOURCE</text>

                  <line x1="130" y1="100" x2="220" y2="100" stroke={replayProgress >= 15 ? "#f97316" : "#475569"} strokeWidth="3" strokeDasharray="5,5" />

                  <circle cx="250" cy="100" r="30" fill={replayProgress >= 15 ? "#f97316" : "#475569"} opacity={replayProgress >= 15 ? 0.6 : 0.3} />
                  <text x="250" y="100" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold" dy="4">John</text>
                  <text x="250" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10">CONTAMINATED</text>

                  <line x1="250" y1="70" x2="400" y2="40" stroke={replayProgress >= 45 ? "#ef4444" : "#475569"} strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="250" y1="90" x2="550" y2="40" stroke={replayProgress >= 60 ? "#ef4444" : "#475569"} strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="250" y1="110" x2="700" y2="40" stroke={replayProgress >= 75 ? "#ef4444" : "#475569"} strokeWidth="2" strokeDasharray="5,5" />

                  <circle cx="400" cy="40" r="25" fill={replayProgress >= 45 ? "#ef4444" : "#475569"} opacity={replayProgress >= 45 ? 0.6 : 0.3} />
                  <text x="400" y="40" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold" dy="3">Room 102</text>
                  
                  <circle cx="550" cy="40" r="25" fill={replayProgress >= 60 ? "#ef4444" : "#475569"} opacity={replayProgress >= 60 ? 0.6 : 0.3} />
                  <text x="550" y="40" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold" dy="3">Room 103</text>

                  <circle cx="700" cy="40" r="25" fill={replayProgress >= 75 ? "#ef4444" : "#475569"} opacity={replayProgress >= 75 ? 0.6 : 0.3} />
                  <text x="700" y="40" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold" dy="3">Room 106</text>

                  <line x1="280" y1="100" x2="720" y2="140" stroke={replayProgress >= 90 ? "#f97316" : "#475569"} strokeWidth="3" strokeDasharray="5,5" />

                  <circle cx="750" cy="140" r="30" fill={replayProgress >= 100 ? "#22c55e" : (replayProgress >= 90 ? "#ef4444" : "#0088ff")} opacity={replayProgress >= 90 ? 0.6 : 0.3} />
                  <text x="750" y="135" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">ICU</text>
                  <text x="750" y="148" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Room 109</text>
                  <text x="750" y="185" textAnchor="middle" fill="#94a3b8" fontSize="10">{replayProgress >= 100 ? "✓ PROTECTED" : (replayProgress >= 90 ? "⛔ BLOCKED" : "CRITICAL")}</text>
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Replay Steps Logs */}
        <div className="bg-slate-900 rounded-lg p-5 border border-slate-800">
          <h4 className="text-lg font-bold text-white mb-3">Simulation Timeline</h4>
          <div className="space-y-2 text-sm font-light">
            {replayCase === 1 ? (
              <>
                <div className={`p-3 rounded transition-all ${replayProgress >= 0 ? "bg-cyan-950/60 border border-cyan-800 text-cyan-200" : "bg-slate-800/40 text-gray-400"}`}>0% - Shift Start: Nurse Station</div>
                <div className={`p-3 rounded transition-all ${replayProgress >= 20 ? "bg-cyan-950/60 border border-cyan-800 text-cyan-200" : "bg-slate-800/40 text-gray-400"}`}>20% - Enter Room 105 (Patient Tom - MRSA+)</div>
                <div className={`p-3 rounded transition-all ${replayProgress >= 40 ? "bg-yellow-950/60 border border-yellow-800 text-yellow-300" : "bg-slate-800/40 text-gray-400"}`}>40% - Nurse Sarah & BP Cuff Contaminated</div>
                <div className={`p-3 rounded transition-all ${replayProgress >= 60 ? "bg-red-950/60 border border-red-900 text-red-200" : "bg-slate-800/40 text-gray-400"}`}>60% - Entry Blocked at Room 108 (Vulnerable Newborn)</div>
                <div className={`p-3 rounded transition-all ${replayProgress >= 80 ? "bg-blue-950/60 border border-blue-800 text-blue-200" : "bg-slate-800/40 text-gray-400"}`}>80% - Decontamination: Handwash Station</div>
                <div className={`p-3 rounded transition-all ${replayProgress >= 100 ? "bg-green-950/60 border border-green-800 text-green-200" : "bg-slate-800/40 text-gray-400"}`}>100% - Success: Outbreak Prevented</div>
              </>
            ) : (
              <>
                <div className={`p-3 rounded transition-all ${replayProgress >= 0 ? "bg-cyan-950/60 border border-cyan-800 text-cyan-200" : "bg-slate-800/40 text-gray-400"}`}>0% - Shift Start: Nurse Station</div>
                <div className={`p-3 rounded transition-all ${replayProgress >= 15 ? "bg-cyan-950/60 border border-cyan-800 text-cyan-200" : "bg-slate-800/40 text-gray-400"}`}>15% - Enter Room 104 (Patient David - C.diff+)</div>
                <div className={`p-3 rounded transition-all ${replayProgress >= 30 ? "bg-yellow-950/60 border border-yellow-800 text-yellow-300" : "bg-slate-800/40 text-gray-400"}`}>30% - Nurse John Skips Handwashing Station</div>
                <div className={`p-3 rounded transition-all ${replayProgress >= 45 ? "bg-red-950/60 border border-red-900 text-red-200" : "bg-slate-800/40 text-gray-400"}`}>45% - Room 102 Infected (Cross Contamination)</div>
                <div className={`p-3 rounded transition-all ${replayProgress >= 60 ? "bg-red-950/60 border border-red-900 text-red-200" : "bg-slate-800/40 text-gray-400"}`}>60% - Room 103 Infected (Cross Contamination)</div>
                <div className={`p-3 rounded transition-all ${replayProgress >= 75 ? "bg-red-950/60 border border-red-900 text-red-200" : "bg-slate-800/40 text-gray-400"}`}>75% - Room 106 Infected (Cross Contamination)</div>
                <div className={`p-3 rounded transition-all ${replayProgress >= 90 ? "bg-orange-950/60 border border-orange-850 text-orange-200" : "bg-slate-800/40 text-gray-400"}`}>90% - AI Blocks Entry to ICU (Critical Patient Protected)</div>
                <div className={`p-3 rounded transition-all ${replayProgress >= 100 ? "bg-green-950/60 border border-green-800 text-green-200" : "bg-slate-800/40 text-gray-400"}`}>100% - Decontamination: Shift End</div>
              </>
            )}
          </div>
        </div>

        {replayProgress >= 100 && (
          <div className="bg-gradient-to-r from-green-900/60 to-green-800/60 border border-green-700 rounded-xl p-8 mt-6">
            <h3 className="text-2xl font-bold text-white mb-6">🏆 Simulation Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-5xl font-extrabold text-green-400 mb-1">{replayCase === 1 ? "1" : "0"}</div>
                <div className="text-gray-300 text-sm font-semibold">Infections Prevented</div>
              </div>
              <div>
                <div className="text-5xl font-extrabold text-green-400 mb-1">${replayCase === 1 ? "135,000" : "0"}</div>
                <div className="text-gray-300 text-sm font-semibold">Financial Loss Averted</div>
              </div>
              <div>
                <div className="text-5xl font-extrabold text-green-400 mb-1">{replayCase === 1 ? "2.3" : "3.5"}s</div>
                <div className="text-gray-300 text-sm font-semibold">AI Prediction latency</div>
              </div>
            </div>
            {replayCase === 2 && (
              <div className="mt-6 p-4 bg-red-950/80 border border-red-800 rounded-lg text-center">
                <p className="text-red-300 font-bold text-sm">
                  ⚠️ 3 protocol violations resulted in 3 infections. Est. Damage: $297,000.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
