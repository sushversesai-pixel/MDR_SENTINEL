import React, { useState } from 'react';
import { IconShield, IconUser, IconUsers } from './components/Icons';
import DoctorDashboard from './components/DoctorDashboard';
import NurseDashboard from './components/NurseDashboard';
import IctDashboard from './components/IctDashboard';

function App() {
  const [activeRole, setActiveRole] = useState(null);

  const handleLogout = () => {
    setActiveRole(null);
  };

  if (!activeRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-2xl shadow-2xl p-12 max-w-2xl w-full border border-purple-500/30 transition-all duration-300">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4 tracking-wide">
              MDR Sentinel
            </h1>
            <p className="text-gray-300 text-lg font-light">
              Hospital Digital Twin - Infection Control System
            </p>
          </div>
          <div className="space-y-4">
            <button
              onClick={() => setActiveRole("ict")}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.03] flex items-center justify-center gap-3 text-xl shadow-lg"
            >
              <IconShield className="w-8 h-8" />
              ICT - Infection Control Team
            </button>
            <button
              onClick={() => setActiveRole("doctor")}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.03] flex items-center justify-center gap-3 text-xl shadow-lg"
            >
              <IconUser className="w-8 h-8" />
              Doctor Dashboard
            </button>
            <button
              onClick={() => setActiveRole("nurse")}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.03] flex items-center justify-center gap-3 text-xl shadow-lg"
            >
              <IconUsers className="w-8 h-8" />
              Nurse Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (activeRole === "doctor") {
    return <DoctorDashboard onLogout={handleLogout} />;
  }

  if (activeRole === "nurse") {
    return <NurseDashboard onLogout={handleLogout} />;
  }

  if (activeRole === "ict") {
    return <IctDashboard onLogout={handleLogout} />;
  }

  return null;
}

export default App;
