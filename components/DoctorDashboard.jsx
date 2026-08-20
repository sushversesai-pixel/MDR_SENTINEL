import React, { useState } from 'react';
import {
  IconUser,
  IconUsers,
  IconActivity,
  IconAlertTriangle,
  IconArrowUpDown
} from './Icons';

export default function DoctorDashboard({ onLogout }) {
  const [patientSortColumn, setPatientSortColumn] = useState("room");
  const [patientSortOrder, setPatientSortOrder] = useState("asc");
  const [patientFilter, setPatientFilter] = useState("all");

  const patients = [
    { id: 1, name: "Sarah K", room: 101, status: "INFECTED", infection: "VRE", risk: 92, time: "08:15 AM" },
    { id: 2, name: "Mike", room: 102, status: "STABLE", infection: "None", risk: 15, time: "07:45 AM" },
    { id: 3, name: "Lisa", room: 103, status: "RECOVERY", infection: "None", risk: 20, time: "09:00 AM" },
    { id: 4, name: "David", room: 104, status: "INFECTED", infection: "C.diff", risk: 88, time: "08:30 AM" },
    { id: 5, name: "Tom", room: 105, status: "CRITICAL", infection: "MRSA", risk: 95, time: "08:00 AM" },
    { id: 6, name: "Anna", room: 106, status: "AT RISK", infection: "None", risk: 42, time: "07:30 AM" },
    { id: 7, name: "Robert", room: 107, status: "CRITICAL", infection: "None", risk: 98, time: "06:00 AM" },
    { id: 8, name: "Baby Emma", room: 108, status: "STABLE", infection: "None", risk: 5, time: "09:15 AM" },
    { id: 9, name: "ICU Patient", room: 109, status: "CRITICAL", infection: "None", risk: 96, time: "08:45 AM" },
    { id: 10, name: "Grace", room: 110, status: "STABLE", infection: "None", risk: 25, time: "07:00 AM" }
  ];

  const getSortedPatients = () => {
    return patients
      .filter(p => patientFilter === "all" || p.status.toLowerCase() === patientFilter.toLowerCase())
      .sort((a, b) => {
        const valA = a[patientSortColumn];
        const valB = b[patientSortColumn];
        if (patientSortOrder === "asc") {
          return valA > valB ? 1 : -1;
        } else {
          return valA < valB ? 1 : -1;
        }
      });
  };

  const sortedPatients = getSortedPatients();

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200">
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <IconUser className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl font-bold text-purple-400">Doctor Dashboard</h1>
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
        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white text-sm font-semibold">Total Patients</span>
              <IconUsers className="w-5 h-5 text-white" />
            </div>
            <div className="text-4xl font-bold text-white">47</div>
          </div>
          <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-xl p-6 shadow-md animate-pulse-custom">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white text-sm font-semibold">Infected</span>
              <IconAlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div className="text-4xl font-bold text-white">2</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white text-sm font-semibold">At Risk</span>
              <IconUser className="w-5 h-5 text-white" />
            </div>
            <div className="text-4xl font-bold text-white">8</div>
          </div>
          <div className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white text-sm font-semibold">Critical</span>
              <IconActivity className="w-5 h-5 text-white" />
            </div>
            <div className="text-4xl font-bold text-white">3</div>
          </div>
        </div>

        {/* Patient Table */}
        <div className="bg-slate-800 rounded-xl p-6 mb-8 shadow-lg border border-slate-700">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
            <h2 className="text-2xl font-bold text-purple-400">Patient List</h2>
            <select
              value={patientFilter}
              onChange={(e) => setPatientFilter(e.target.value)}
              className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="stable">Stable</option>
              <option value="infected">Infected</option>
              <option value="critical">Critical</option>
              <option value="at risk">At Risk</option>
              <option value="recovery">Recovery</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 text-gray-400 font-semibold text-sm">
                  <th className="text-left p-3 cursor-pointer hover:text-white" onClick={() => { setPatientSortColumn("id"); setPatientSortOrder(o => o === "asc" ? "desc" : "asc"); }}>
                    <div className="flex items-center gap-2">ID <IconArrowUpDown className="w-4 h-4" /></div>
                  </th>
                  <th className="text-left p-3 cursor-pointer hover:text-white" onClick={() => { setPatientSortColumn("name"); setPatientSortOrder(o => o === "asc" ? "desc" : "asc"); }}>
                    <div className="flex items-center gap-2">Name <IconArrowUpDown className="w-4 h-4" /></div>
                  </th>
                  <th className="text-left p-3 cursor-pointer hover:text-white" onClick={() => { setPatientSortColumn("room"); setPatientSortOrder(o => o === "asc" ? "desc" : "asc"); }}>
                    <div className="flex items-center gap-2">Room <IconArrowUpDown className="w-4 h-4" /></div>
                  </th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Infection</th>
                  <th className="text-left p-3 cursor-pointer hover:text-white" onClick={() => { setPatientSortColumn("risk"); setPatientSortOrder(o => o === "asc" ? "desc" : "asc"); }}>
                    <div className="flex items-center gap-2">Risk <IconArrowUpDown className="w-4 h-4" /></div>
                  </th>
                  <th className="text-left p-3">Last Contact</th>
                </tr>
              </thead>
              <tbody>
                {sortedPatients.map((p) => (
                  <tr key={p.id} className="border-b border-slate-700/50 hover:bg-slate-700/50 transition-colors">
                    <td className="p-3 text-sm text-gray-400">{p.id}</td>
                    <td className="p-3 font-semibold text-white">{p.name}</td>
                    <td className="p-3 text-sm">{p.room}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold text-white ${
                        p.status === "CRITICAL" || p.status === "INFECTED" ? "bg-red-600" : p.status === "AT RISK" ? "bg-yellow-600" : "bg-green-600"
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-3 text-sm">{p.infection}</td>
                    <td className="p-3">
                      <span className={`font-bold ${
                        p.risk >= 90 ? "text-red-400" : p.risk >= 70 ? "text-orange-400" : p.risk >= 40 ? "text-yellow-400" : "text-green-400"
                      }`}>
                        {p.risk}%
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-400">{p.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Risk Level Distribution</h3>
            <svg width="100%" height="200" viewBox="0 0 400 200">
              <rect x="50" y="80" width="40" height="100" fill="#ef4444" rx="4" />
              <text x="70" y="195" textAnchor="middle" fill="#94a3b8" fontSize="11">101-105</text>
              <text x="70" y="70" textAnchor="middle" fill="#ef4444" fontSize="13" fontWeight="bold">62%</text>

              <rect x="140" y="95" width="40" height="85" fill="#f97316" rx="4" />
              <text x="160" y="195" textAnchor="middle" fill="#94a3b8" fontSize="11">106-110</text>
              <text x="160" y="85" textAnchor="middle" fill="#f97316" fontSize="13" fontWeight="bold">53%</text>

              <rect x="230" y="20" width="40" height="160" fill="#dc2626" rx="4" />
              <text x="250" y="195" textAnchor="middle" fill="#94a3b8" fontSize="11">ICU</text>
              <text x="250" y="15" textAnchor="middle" fill="#dc2626" fontSize="13" fontWeight="bold">96%</text>

              <rect x="320" y="170" width="40" height="10" fill="#22c55e" rx="4" />
              <text x="340" y="195" textAnchor="middle" fill="#94a3b8" fontSize="11">Medicine</text>
              <text x="340" y="160" textAnchor="middle" fill="#22c55e" fontSize="13" fontWeight="bold">8%</text>
            </svg>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Infection Type Distribution</h3>
            <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
              <svg width="180" height="180" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="80" fill="transparent" stroke="#ef4444" strokeWidth="35" strokeDasharray="201 503" transform="rotate(-90 100 100)" />
                <circle cx="100" cy="100" r="80" fill="transparent" stroke="#f97316" strokeWidth="35" strokeDasharray="151 503" strokeDashoffset="-201" transform="rotate(-90 100 100)" />
                <circle cx="100" cy="100" r="80" fill="transparent" stroke="#eab308" strokeWidth="35" strokeDasharray="50 503" strokeDashoffset="-352" transform="rotate(-90 100 100)" />
                <circle cx="100" cy="100" r="80" fill="transparent" stroke="#22c55e" strokeWidth="35" strokeDasharray="101 503" strokeDashoffset="-402" transform="rotate(-90 100 100)" />
              </svg>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-sm text-gray-300">MRSA 40%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <span className="text-sm text-gray-300">C.diff 30%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span className="text-sm text-gray-300">VRE 10%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-300">Clean 20%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Recent Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 border-l-4 border-red-500 pl-3 py-2 bg-slate-900/40 rounded-r-lg">
                <span className="text-lg">🚨</span>
                <div>
                  <p className="font-semibold text-white">CRITICAL: Entry blocked at Room 108</p>
                  <p className="text-xs text-gray-400">08:35 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-l-4 border-yellow-500 pl-3 py-2 bg-slate-900/40 rounded-r-lg">
                <span className="text-lg">🟡</span>
                <div>
                  <p className="font-semibold text-white">Person contamination: Nurse Sarah</p>
                  <p className="text-xs text-gray-400">08:20 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-l-4 border-orange-500 pl-3 py-2 bg-slate-900/40 rounded-r-lg">
                <span className="text-lg">🟧</span>
                <div>
                  <p className="font-semibold text-white">Equipment contamination: BP Cuff #23</p>
                  <p className="text-xs text-gray-400">08:22 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-l-4 border-green-500 pl-3 py-2 bg-slate-900/40 rounded-r-lg">
                <span className="text-lg">✅</span>
                <div>
                  <p className="font-semibold text-white">Decontamination complete: Sarah</p>
                  <p className="text-xs text-gray-400">08:37 AM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-purple-400 mb-4">Trend Analysis</h3>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm border-b border-slate-700/50 pb-2">
                  <span className="text-gray-400">Week 1:</span>
                  <span className="font-semibold text-white">2 infections</span>
                </div>
                <div className="flex justify-between text-sm border-b border-slate-700/50 pb-2">
                  <span className="text-gray-400">Week 2:</span>
                  <span className="font-semibold text-white">1 infection</span>
                </div>
                <div className="flex justify-between text-sm border-b border-slate-700/50 pb-2">
                  <span className="text-gray-400">Week 3:</span>
                  <span className="font-semibold text-white">0 infections</span>
                </div>
                <div className="flex justify-between text-sm pb-1">
                  <span className="text-gray-400">Week 4 (current):</span>
                  <span className="font-bold text-green-400">0 infections (with AI)</span>
                </div>
              </div>
            </div>
            <div className="bg-green-950/60 border border-green-800 rounded-lg p-4 text-center">
              <p className="text-green-400 text-lg font-bold">
                📉 75% reduction in infection rate
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
