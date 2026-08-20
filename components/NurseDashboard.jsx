import React, { useState } from 'react';
import {
  IconUsers,
  IconCheck
} from './Icons';

export default function NurseDashboard({ onLogout }) {
  const [checklist, setChecklist] = useState([true, true, false, false, false]);

  const nurseAssignedPatients = [
    { room: 101, name: "Sarah K", status: "INFECTED", infection: "VRE", next: "10:00 AM", priority: "HIGH" },
    { room: 105, name: "Tom", status: "CRITICAL", infection: "MRSA", next: "09:30 AM", priority: "CRITICAL" },
    { room: 108, name: "Baby Emma", status: "STABLE", infection: "None", next: "10:30 AM", priority: "MEDIUM" },
    { room: 102, name: "Mike", status: "STABLE", infection: "None", next: "11:00 AM", priority: "LOW" },
    { room: 106, name: "Anna", status: "AT RISK", infection: "None", next: "10:15 AM", priority: "MEDIUM" }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200">
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <IconUsers className="w-8 h-8 text-green-400" />
            <h1 className="text-2xl font-bold text-green-400">Nurse Dashboard</h1>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl p-6 border-2 border-green-500 shadow-md">
            <h3 className="text-sm font-semibold text-green-400 mb-1">Your Status</h3>
            <div className="text-3xl font-extrabold text-white">SAFE ✓</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-6 border-2 border-cyan-500 shadow-md">
            <h3 className="text-sm font-semibold text-cyan-400 mb-1">Location</h3>
            <div className="text-2xl font-bold text-white">Nurse Station</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-6 border-2 border-purple-500 shadow-md">
            <h3 className="text-sm font-semibold text-purple-400 mb-1">Risk Score</h3>
            <div className="text-3xl font-extrabold text-white">12</div>
          </div>
        </div>

        {/* Assigned Patients */}
        <div className="bg-slate-800 rounded-xl p-6 mb-8 shadow-lg border border-slate-700">
          <h2 className="text-2xl font-bold text-green-400 mb-4">Assigned Patients</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 text-gray-400 text-sm font-semibold">
                  <th className="text-left p-3">Room</th>
                  <th className="text-left p-3">Patient</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Infection</th>
                  <th className="text-left p-3">Next Check</th>
                  <th className="text-left p-3">Priority</th>
                </tr>
              </thead>
              <tbody>
                {nurseAssignedPatients.map((x, index) => (
                  <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/50 transition-colors">
                    <td className="p-3 font-bold text-white">{x.room}</td>
                    <td className="p-3 font-semibold text-gray-300">{x.name}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold text-white ${
                        x.status === "CRITICAL" || x.status === "INFECTED" ? "bg-red-600" : "bg-green-600"
                      }`}>
                        {x.status}
                      </span>
                    </td>
                    <td className="p-3 text-sm">{x.infection}</td>
                    <td className="p-3 text-sm text-gray-400">{x.next}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded text-xs font-bold text-white ${
                        x.priority === "CRITICAL" ? "bg-red-600 animate-pulse-custom" : (x.priority === "HIGH" ? "bg-orange-600" : (x.priority === "MEDIUM" ? "bg-yellow-600" : "bg-green-600"))
                      }`}>
                        {x.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Compliance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
            <h3 className="text-xl font-bold text-green-400 mb-4">Handwashing Compliance</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm font-semibold">
                  <span>Today</span>
                  <span className="text-cyan-400">80%</span>
                </div>
                <div className="h-6 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-600" style={{ width: "80%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm font-semibold">
                  <span>This Week</span>
                  <span className="text-cyan-400">85%</span>
                </div>
                <div className="h-6 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-600" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm font-semibold">
                  <span>This Month</span>
                  <span className="text-green-400">92%</span>
                </div>
                <div className="h-6 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-green-600" style={{ width: "92%" }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
            <h3 className="text-xl font-bold text-green-400 mb-4">Your Safety Score (This Week)</h3>
            <svg width="100%" height="180" viewBox="0 0 400 200">
              <polyline points="50,150 100,120 150,160 200,100 250,130 300,80 350,110" fill="none" stroke="#22c55e" strokeWidth="4" />
              <circle cx="50" cy="150" r="5" fill="#22c55e" />
              <circle cx="100" cy="120" r="5" fill="#22c55e" />
              <circle cx="150" cy="160" r="5" fill="#22c55e" />
              <circle cx="200" cy="100" r="5" fill="#22c55e" />
              <circle cx="250" cy="130" r="5" fill="#22c55e" />
              <circle cx="300" cy="80" r="5" fill="#22c55e" />
              <circle cx="350" cy="110" r="5" fill="#22c55e" />
              <text x="50" y="195" textAnchor="middle" fill="#94a3b8" fontSize="11">Mon</text>
              <text x="100" y="195" textAnchor="middle" fill="#94a3b8" fontSize="11">Tue</text>
              <text x="150" y="195" textAnchor="middle" fill="#94a3b8" fontSize="11">Wed</text>
              <text x="200" y="195" textAnchor="middle" fill="#94a3b8" fontSize="11">Thu</text>
              <text x="250" y="195" textAnchor="middle" fill="#94a3b8" fontSize="11">Fri</text>
              <text x="300" y="195" textAnchor="middle" fill="#94a3b8" fontSize="11">Sat</text>
              <text x="350" y="195" textAnchor="middle" fill="#94a3b8" fontSize="11">Sun</text>
            </svg>
          </div>
        </div>

        {/* Contact Dist & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
            <h3 className="text-xl font-bold text-green-400 mb-4">Contact Distribution</h3>
            <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
              <svg width="180" height="180" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="80" fill="transparent" stroke="#22c55e" strokeWidth="35" strokeDasharray="428 503" transform="rotate(-90 100 100)" />
                <circle cx="100" cy="100" r="80" fill="transparent" stroke="#eab308" strokeWidth="35" strokeDasharray="50 503" strokeDashoffset="-428" transform="rotate(-90 100 100)" />
                <circle cx="100" cy="100" r="80" fill="transparent" stroke="#ef4444" strokeWidth="35" strokeDasharray="25 503" strokeDashoffset="-478" transform="rotate(-90 100 100)" />
              </svg>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-300">Safe 85%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span className="text-sm text-gray-300">At-Risk 10%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-sm text-gray-300">High-Risk 5%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
            <h3 className="text-xl font-bold text-green-400 mb-4">Active Alerts</h3>
            <div className="space-y-3">
              <div className="bg-orange-950/60 border border-orange-900 rounded-lg p-4">
                <p className="text-sm text-orange-300 font-semibold">⚠️ High-risk patient check due: Room 105 - 09:30 AM</p>
              </div>
              <div className="bg-green-950/60 border border-green-900 rounded-lg p-4">
                <p className="text-sm text-green-300 font-semibold">✅ Handwashing compliance: Excellent today</p>
              </div>
              <div className="bg-blue-950/60 border border-blue-900 rounded-lg p-4">
                <p className="text-sm text-blue-300 font-semibold">📋 Equipment sterilization log pending</p>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Checklist */}
        <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
          <h3 className="text-xl font-bold text-green-400 mb-4">Today's Checklist</h3>
          <div className="space-y-3">
            {["Morning hand hygiene audit", "PPE inventory check", "Patient isolation signs verified", "Equipment sterilization log", "Evening rounds documentation"].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg cursor-pointer transition-all border border-slate-600/30"
                onClick={() => setChecklist(prev => {
                  const next = [...prev];
                  next[index] = !next[index];
                  return next;
                })}
              >
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                  checklist[index] ? "bg-green-500 border-green-500" : "border-gray-500"
                }`}>
                  {checklist[index] && <IconCheck className="w-5 h-5 text-white" />}
                </div>
                <span className={`text-base font-semibold text-gray-200 ${checklist[index] ? "line-through text-gray-500" : ""}`}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
