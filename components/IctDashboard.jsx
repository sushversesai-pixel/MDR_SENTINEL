import React, { useState, useEffect, useRef } from 'react';
import {
  IconShield,
  IconUsers,
  IconAlertTriangle,
  IconCheck,
  IconClock,
  IconZap
} from './Icons';
import AiPrediction from './AiPrediction';
import InfectionReplayEngine from './InfectionReplayEngine';
import WhatIfSimulator from './WhatIfSimulator';

export default function IctDashboard({ onLogout }) {
  const [currentCase, setCurrentCase] = useState(1);
  const [step, setStep] = useState(0);
  const [showStory, setShowStory] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [ictView, setIctView] = useState("twin");
  const [avatarPos, setAvatarPos] = useState({ x: 550, y: 115 });
  const [avatarColor, setAvatarColor] = useState("#00ff00");
  const [contaminationState, setContaminationState] = useState("clean");
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState({ x: 550, y: 425 });
  const [roomStates, setRoomStates] = useState({});
  const [showTomCircle, setShowTomCircle] = useState(false);
  const [showEmmaCircle, setShowEmmaCircle] = useState(false);
  const [trailDots, setTrailDots] = useState([]);
  const [infectedRooms, setInfectedRooms] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const intervalRef = useRef(null);
  const pathSegments = useRef([]);
  const targetPos = useRef(null);

  const rooms = {
    101: { x: 50, y: 50, w: 200, h: 130, label: "Room 101" },
    102: { x: 50, y: 210, w: 200, h: 130, label: "Room 102" },
    103: { x: 50, y: 370, w: 200, h: 130, label: "Room 103" },
    104: { x: 50, y: 530, w: 200, h: 130, label: "Room 104" },
    105: { x: 50, y: 690, w: 200, h: 130, label: "Room 105" },
    106: { x: 850, y: 50, w: 200, h: 130, label: "Room 106" },
    107: { x: 850, y: 210, w: 200, h: 130, label: "Room 107" },
    108: { x: 850, y: 370, w: 200, h: 130, label: "Room 108" },
    109: { x: 850, y: 530, w: 200, h: 130, label: "Room 109" },
    110: { x: 850, y: 690, w: 200, h: 130, label: "Room 110" },
    nurse: { x: 450, y: 50, w: 200, h: 130, label: "Nurse Station" },
    medicine: { x: 450, y: 370, w: 200, h: 130, label: "Medicine Room" },
    handwash: { x: 450, y: 690, w: 200, h: 130, label: "Handwash Station" }
  };

  const distance = (p1, p2) => Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);

  const moveAvatar = (destination, callback, intermediatePath = []) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    pathSegments.current = intermediatePath.length > 0 ? [...intermediatePath, destination] : [destination];
    targetPos.current = pathSegments.current[0];

    intervalRef.current = setInterval(() => {
      setAvatarPos(current => {
        const target = targetPos.current;
        if (!target) return current;

        if (distance(current, target) < 4) {
          pathSegments.current.shift();
          if (pathSegments.current.length > 0) {
            targetPos.current = pathSegments.current[0];
            return current;
          } else {
            clearInterval(intervalRef.current);
            if (callback) callback();
            return target;
          }
        }

        const angle = Math.atan2(target.y - current.y, target.x - current.x);

        if (avatarColor !== "#00ff00" || contaminationState === "contaminated") {
          const dotColor = avatarColor === "#ffff00" ? "#ffff00" : (avatarColor === "#ff8800" ? "#ff8800" : "#ffff00");
          setTrailDots(dots => [...dots, { x: current.x, y: current.y, color: dotColor, t: Date.now() }]);
        }

        return {
          x: current.x + Math.cos(angle) * 8,
          y: current.y + Math.sin(angle) * 8
        };
      });
    }, 40);
  };

  useEffect(() => {
    const handle = setInterval(() => {
      setTrailDots(dots => dots.filter(d => Date.now() - d.t < 10000));
    }, 1000);
    return () => clearInterval(handle);
  }, []);

  const resetTwinState = () => {
    setStep(0);
    setShowStory(false);
    setShowAlert(false);
    setAvatarPos({ x: 550, y: 115 });
    setAvatarColor("#00ff00");
    setContaminationState("clean");
    setZoom(1);
    setCenter({ x: 550, y: 425 });
    setSelectedPatient(null);
    setShowTomCircle(false);
    setShowEmmaCircle(false);
    setTrailDots([]);
    setInfectedRooms([]);
    setRoomStates({});
  };

  const selectCase = (caseNo) => {
    resetTwinState();
    setCurrentCase(caseNo);
    setStep(0);
    setShowStory(true);
  };

  const handleStoryStep = () => {
    setShowStory(false);
    setShowAlert(false);

    if (currentCase === 1) {
      if (step === 0) {
        setStep(1);
        setShowStory(true);
      } else if (step === 1) {
        const targetRoom = rooms[105];
        moveAvatar(
          { x: targetRoom.x + targetRoom.w / 2, y: targetRoom.y + targetRoom.h / 2 },
          () => {
            setTimeout(() => setRoomStates(prev => ({ ...prev, 105: false })), 1000);
            setStep(2);
            setShowStory(true);
          },
          [{ x: 300, y: 400 }, { x: 150, y: 700 }]
        );

        setTimeout(() => {
          setSelectedPatient({ name: "Patient Tom", status: "INFECTED", infection: "MRSA", risk: 95, age: "67 years" });
          setZoom(1.5);
          setCenter({ x: targetRoom.x + targetRoom.w / 2, y: targetRoom.y + targetRoom.h / 2 });
        }, 1200);
      } else if (step === 2) {
        setShowTomCircle(true);
        setTimeout(() => {
          setAvatarColor("#ffff00");
          setStep(3);
          setShowAlert(true);
          setAlertType("person");
        }, 2000);
      } else if (step === 3) {
        setShowStory(true);
        setStep(4);
      } else if (step === 4) {
        setTimeout(() => {
          setContaminationState("contaminated");
          setShowAlert(true);
          setAlertType("equipment");
          setStep(5);
        }, 1000);
      } else if (step === 5) {
        setShowStory(true);
        setStep(6);
      } else if (step === 6) {
        setZoom(1);
        setCenter({ x: 550, y: 425 });
        setSelectedPatient(null);
        setRoomStates(prev => ({ ...prev, 105: true }));

        const targetMed = rooms.medicine;
        moveAvatar(
          { x: targetMed.x + targetMed.w / 2, y: targetMed.y + targetMed.h / 2 },
          () => {
            setRoomStates(prev => ({ ...prev, 105: false }));
            setStep(7);
            setShowStory(true);
          },
          [{ x: 300, y: 600 }]
        );
      } else if (step === 7) {
        setShowStory(true);
        setStep(8);
      } else if (step === 8) {
        const targetEmma = rooms[108];
        moveAvatar(
          { x: targetEmma.x - 50, y: targetEmma.y + targetEmma.h / 2 },
          () => {
            setStep(9);
            setShowAlert(true);
            setAlertType("critical");
          },
          [{ x: 600, y: 400 }]
        );
      } else if (step === 9) {
        const targetWash = rooms.handwash;
        moveAvatar(
          { x: targetWash.x + targetWash.w / 2, y: targetWash.y + targetWash.h / 2 },
          () => {
            setShowStory(true);
            setStep(10);
            setTimeout(() => {
              setAvatarColor("#00ff00");
              setContaminationState("clean");
              setTrailDots([]);
              setShowStory(true);
            }, 2000);
          },
          [{ x: 600, y: 600 }]
        );
      } else if (step === 10) {
        setShowStory(true);
        setStep(11);
      } else if (step === 11) {
        const targetEmma = rooms[108];
        moveAvatar(
          { x: targetEmma.x + targetEmma.w / 2, y: targetEmma.y + targetEmma.h / 2 },
          () => {
            setTimeout(() => setRoomStates(prev => ({ ...prev, 108: false })), 1000);
            setStep(12);
            setShowStory(true);
          },
          [{ x: 700, y: 400 }]
        );

        setTimeout(() => {
          setSelectedPatient({ name: "Baby Emma", status: "VULNERABLE", age: "3 days old", risk: 5 });
          setShowEmmaCircle(true);
          setZoom(1.5);
          setCenter({ x: targetEmma.x + targetEmma.w / 2, y: targetEmma.y + targetEmma.h / 2 });
        }, 1200);
      } else if (step === 12) {
        resetTwinState();
      }
    } else if (currentCase === 2) {
      if (step === 0) {
        setStep(1);
        setShowStory(true);
      } else if (step === 1) {
        const targetRoom = rooms[104];
        moveAvatar(
          { x: targetRoom.x + targetRoom.w / 2, y: targetRoom.y + targetRoom.h / 2 },
          () => {
            setStep(2);
            setShowStory(true);
          },
          [{ x: 300, y: 500 }]
        );

        setTimeout(() => {
          setSelectedPatient({ name: "Patient David", status: "INFECTED", infection: "C.diff", risk: 88, age: "54 years" });
          setZoom(1.5);
          setCenter({ x: targetRoom.x + targetRoom.w / 2, y: targetRoom.y + targetRoom.h / 2 });
        }, 1200);
      } else if (step === 2) {
        setAvatarColor("#ff8800");
        setTimeout(() => {
          setRoomStates(prev => ({ ...prev, 104: false }));
          setStep(3);
          setShowStory(true);
        }, 1000);
      } else if (step === 3) {
        setZoom(1);
        setCenter({ x: 550, y: 425 });
        setSelectedPatient(null);
        setStep(4);
        setShowStory(true);
      } else if (step === 4) {
        const targetRoom2 = rooms[102];
        moveAvatar(
          { x: targetRoom2.x + targetRoom2.w / 2, y: targetRoom2.y + targetRoom2.h / 2 },
          () => {
            setInfectedRooms(prev => [...prev, 102]);
            setRoomStates(prev => ({ ...prev, 102: true }));
            setTimeout(() => {
              setStep(5);
              setShowAlert(true);
              setAlertType("infected");
            }, 1000);
          },
          [{ x: 300, y: 300 }]
        );
      } else if (step === 5) {
        const targetRoom3 = rooms[103];
        moveAvatar(
          { x: targetRoom3.x + targetRoom3.w / 2, y: targetRoom3.y + targetRoom3.h / 2 },
          () => {
            setInfectedRooms(prev => [...prev, 103]);
            setRoomStates(prev => ({ ...prev, 103: true }));
            setTimeout(() => {
              setStep(6);
              setShowAlert(true);
              setAlertType("infected");
            }, 1000);
          },
          [{ x: 200, y: 400 }]
        );
      } else if (step === 6) {
        const targetRoom6 = rooms[106];
        moveAvatar(
          { x: targetRoom6.x + targetRoom6.w / 2, y: targetRoom6.y + targetRoom6.h / 2 },
          () => {
            setInfectedRooms(prev => [...prev, 106]);
            setRoomStates(prev => ({ ...prev, 106: true }));
            setTimeout(() => {
              setStep(7);
              setShowAlert(true);
              setAlertType("infected");
            }, 1000);
          },
          [{ x: 600, y: 200 }, { x: 900, y: 100 }]
        );
      } else if (step === 7) {
        setStep(8);
        setShowStory(true);
      } else if (step === 8) {
        const targetRoom9 = rooms[109];
        moveAvatar(
          { x: targetRoom9.x - 50, y: targetRoom9.y + targetRoom9.h / 2 },
          () => {
            setStep(9);
            setShowAlert(true);
            setAlertType("critical");
          },
          [{ x: 700, y: 400 }]
        );

        setTimeout(() => {
          setSelectedPatient({ name: "ICU Patient", status: "CRITICAL", infection: "None", risk: 96, age: "71 years" });
          setZoom(1.5);
          setCenter({ x: targetRoom9.x + targetRoom9.w / 2, y: targetRoom9.y + targetRoom9.h / 2 });
        }, 1200);
      } else if (step === 9) {
        const targetWash = rooms.handwash;
        moveAvatar(
          { x: targetWash.x + targetWash.w / 2, y: targetWash.y + targetWash.h / 2 },
          () => {
            setShowStory(true);
            setStep(10);
            setTimeout(() => {
              setAvatarColor("#00ff00");
              setTrailDots([]);
              setZoom(1);
              setCenter({ x: 550, y: 425 });
              setSelectedPatient(null);
            }, 2000);
          },
          [{ x: 600, y: 600 }]
        );
      } else if (step === 10) {
        setStep(11);
        setShowStory(true);
      } else if (step === 11) {
        resetTwinState();
      }
    }
  };

  const twinStoryData = {
    1: {
      0: { txt: "📖 CASE 1: Basic Prevention - Demonstrates AI tracking contamination from infected patient to vulnerable newborn", btn: "START CASE" },
      1: { txt: "☀️ 8:00 AM - Morning shift begins. Nurse Sarah at Nurse Station.", btn: "ACKNOWLEDGE" },
      2: { txt: "🚶‍♀️ 8:16 AM - Sarah inside Room 105 checking Patient Tom. Contact time: 60 seconds...", btn: "ACKNOWLEDGE" },
      4: { txt: "🩺 Equipment check. BP Cuff #23 used on Patient Tom. Contamination occurring...", btn: "ACKNOWLEDGE" },
      6: { txt: "🚪 8:22 AM - Sarah exiting Room 105. Carrying contaminated equipment.", btn: "ACKNOWLEDGE" },
      7: { txt: "📦 8:24 AM - Sarah placed BP Cuff in Medicine Room. ⚠️ Surface contamination risk.", btn: "ACKNOWLEDGE" },
      8: { txt: "🚶‍♀️ 8:30 AM - Sarah walking to Room 108. Next patient: Baby Emma (3 days old - VULNERABLE).", btn: "ACKNOWLEDGE" },
      10: { txt: avatarColor === "#00ff00" ? "✅ 8:37 AM - Cleaning complete! Sarah: EXPOSED → SAFE. Equipment: CONTAMINATED → CLEAN." : "🧼 8:35 AM - Handwashing in progress...", btn: avatarColor === "#00ff00" ? "ACKNOWLEDGE" : null },
      11: { txt: "🥼 8:40 AM - Sarah approaching Room 108. Status: SAFE ✓. Equipment: CLEAN ✓.", btn: "ACKNOWLEDGE" },
      12: { txt: "🏆 SUCCESS! Baby Emma protected. Crisis averted by AI system. Outbreak prevented: 1 case ✓. Lives saved: 1 ✓", btn: "RESTART CASE" }
    },
    2: {
      0: { txt: "📖 CASE 2: Super Spreader - Shows catastrophic consequences when handwashing protocols are ignored", btn: "START CASE" },
      1: { txt: "☀️ 9:00 AM - Nurse John shift begins. Moving to Room 104...", btn: "ACKNOWLEDGE" },
      2: { txt: "🏥 Inside Room 104 - Patient David (C.diff+, Risk 88). Contact time: 45 seconds...", btn: "ACKNOWLEDGE" },
      3: { txt: "🟧 John contaminated. Exiting Room 104...", btn: "ACKNOWLEDGE" },
      4: { txt: "⚠️ 9:20 AM - John SKIPS handwashing station. Moving toward patient rooms...", btn: "ACKNOWLEDGE" },
      8: { txt: "⚠️ 3 INFECTIONS IN 20 MINUTES - Rooms 102, 103, 106 contaminated", btn: "ACKNOWLEDGE" },
      11: { txt: "🛡️ ICU patient protected. 3 infections occurred but 1 critical case prevented. Cost: $297,000 damage.", btn: "RESTART CASE" }
    }
  };

  const modalAlertText = {
    person: `🟡 PERSON CONTAMINATION\n\nNurse Sarah\n60+ seconds with MRSA patient\nStatus: SAFE → EXPOSED\nRisk Score: 12 → 68`,
    equipment: `🟧 EQUIPMENT CONTAMINATION\n\nBP Cuff #23\nUsed on MRSA+ patient\nStatus: CLEAN → CONTAMINATED`,
    critical: `🚨 CRITICAL ALERT\n\n⛔ STOP! CONTAMINATED PERSON + EQUIPMENT APPROACHING VULNERABLE PATIENT\n\nPerson: Nurse Sarah (EXPOSED)\nEquipment: BP Cuff #23 (CONTAMINATED)\nTarget: Baby Emma (3 days old)\nRisk: 87%\n\n🚫 ENTRY BLOCKED BY AI SYSTEM`,
    infected: `🔴 ROOM ${infectedRooms[infectedRooms.length - 1] || ""} CONTAMINATED\n\nPatient infected with C.diff\nContamination source: Nurse John\nTransmission: Direct contact`
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200">
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <IconShield className="w-8 h-8 text-cyan-400" />
            <h1 className="text-2xl font-bold text-cyan-400">MDR Sentinel AI - ICT Dashboard</h1>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </nav>

      {ictView === "prediction" && (
        <AiPrediction onClose={() => setIctView("twin")} />
      )}

      {ictView === "timemachine" && (
        <InfectionReplayEngine onClose={() => setIctView("twin")} />
      )}

      {ictView === "whatif" && (
        <WhatIfSimulator onClose={() => setIctView("twin")} />
      )}

      {ictView === "twin" && (
        <div>
          {/* Stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 font-semibold text-sm">Active Patients</span>
                <IconUsers className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-3xl font-bold text-white">47</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 font-semibold text-sm">Contamination Events</span>
                <IconAlertTriangle className={`w-5 h-5 ${avatarColor !== "#00ff00" || contaminationState === "contaminated" ? "text-yellow-400 animate-pulse-custom" : "text-gray-500"}`} />
              </div>
              <div className="text-3xl font-bold text-white">
                {avatarColor !== "#00ff00" || contaminationState === "contaminated" ? (infectedRooms.length > 0 ? infectedRooms.length + 2 : "2") : "0"}
              </div>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 font-semibold text-sm">Prevented Infections</span>
                <IconCheck className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-white">{step >= 12 && currentCase === 1 ? "1" : "0"}</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 font-semibold text-sm">AI Interventions</span>
                <IconShield className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white">{step >= 9 && currentCase === 1 ? "1" : "0"}</div>
            </div>
          </div>

          {/* Case controls */}
          <div className="px-6 max-w-7xl mx-auto pb-2">
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => selectCase(1)}
                className={`px-5 py-3 rounded-lg font-bold text-sm transition-all ${
                  currentCase === 1 ? "bg-cyan-600 text-white shadow-md shadow-cyan-900/40" : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                }`}
              >
                Case 1: Basic Prevention
              </button>
              <button
                onClick={() => selectCase(2)}
                className={`px-5 py-3 rounded-lg font-bold text-sm transition-all ${
                  currentCase === 2 ? "bg-cyan-600 text-white shadow-md shadow-cyan-900/40" : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                }`}
              >
                Case 2: Super Spreader
              </button>
            </div>
          </div>

          {/* Navigation views tabs */}
          <div className="px-6 max-w-7xl mx-auto flex flex-wrap gap-4 mb-6">
            <button
              onClick={() => setIctView("prediction")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 text-sm shadow-md"
            >
              <IconShield className="w-5 h-5" />
              AI Prediction
            </button>
            <button
              onClick={() => setIctView("timemachine")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 text-sm shadow-md"
            >
              <IconClock className="w-5 h-5" />
              Infection Replay Engine (IRE)
            </button>
            <button
              onClick={() => setIctView("whatif")}
              className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 text-sm shadow-md"
            >
              <IconZap className="w-5 h-5" />
              What-If Simulator
            </button>
          </div>

          {/* Main Twin panel */}
          <div className="px-6 max-w-7xl mx-auto pb-6 flex flex-col xl:flex-row gap-6">
            <div className="flex-1 bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg">
              <h2 className="text-xl font-bold text-cyan-400 mb-4">
                Hospital Digital Twin - {currentCase === 1 ? "Case 1: Basic Prevention" : "Case 2: Super Spreader"}
              </h2>
              <div className="bg-slate-900 rounded-lg p-4 overflow-auto border border-slate-800" style={{ height: "650px" }}>
                <svg width="1100" height="850" viewBox="0 0 1100 850">
                  <g transform={`translate(${550 - center.x * zoom}, ${425 - center.y * zoom}) scale(${zoom})`} style={{ transition: "transform 1s ease-in-out" }}>
                    {/* Trail dots */}
                    {trailDots.map((d, index) => (
                      <circle key={index} cx={d.x} cy={d.y} r="4" fill={d.color} opacity={Math.max(0, 1 - (Date.now() - d.t) / 10000)} />
                    ))}

                    {/* Rooms */}
                    {Object.entries(rooms).map(([key, value]) => {
                      const isSource = key === "105" || (currentCase === 2 && key === "104");
                      const isTarget = key === "108" || (currentCase === 2 && key === "109");
                      const isRoomInfected = infectedRooms.includes(parseInt(key)) || roomStates[key];

                      let fill = "#1e293b";
                      let stroke = "#475569";
                      if (isSource || isRoomInfected) {
                        fill = "rgba(255, 0, 0, 0.15)";
                        stroke = "#ef4444";
                      } else if (isTarget) {
                        fill = "rgba(0, 136, 255, 0.15)";
                        stroke = "#0088ff";
                      }

                      return (
                        <g key={key}>
                          <rect
                            x={value.x}
                            y={value.y}
                            width={value.w}
                            height={value.h}
                            fill={fill}
                            stroke={stroke}
                            strokeWidth="3"
                            rx="8"
                          />
                          <text
                            x={value.x + value.w / 2}
                            y={value.y + value.h / 2}
                            textAnchor="middle"
                            fill="#f1f5f9"
                            fontSize="15"
                            fontWeight="bold"
                          >
                            {value.label}
                          </text>
                          {(isSource || isRoomInfected) && (
                            <text x={value.x + value.w / 2} y={value.y + value.h / 2 + 22} textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">
                              INFECTED
                            </text>
                          )}
                          {isTarget && (
                            <text x={value.x + value.w / 2} y={value.y + value.h / 2 + 22} textAnchor="middle" fill="#0088ff" fontSize="11" fontWeight="bold">
                              {key === "109" ? "CRITICAL" : "VULNERABLE"}
                            </text>
                          )}
                        </g>
                      );
                    })}

                    {/* Outbreak animation circles */}
                    {showTomCircle && [...Array(6)].map((_, i) => (
                      <circle
                        key={i}
                        cx={rooms[105].x + 100 + Math.cos(i * Math.PI / 3) * 45}
                        cy={rooms[105].y + 65 + Math.sin(i * Math.PI / 3) * 45}
                        r="5"
                        fill="#ef4444"
                        className="animate-pulse-custom"
                      />
                    ))}

                    {showEmmaCircle && [...Array(5)].map((_, i) => (
                      <circle
                        key={i}
                        cx={rooms[108].x + 100 + Math.cos(i * Math.PI * 2 / 5) * 45}
                        cy={rooms[108].y + 65 + Math.sin(i * Math.PI * 2 / 5) * 45}
                        r="5"
                        fill="#22c55e"
                        className="animate-pulse-custom"
                      />
                    ))}

                    {/* Nurse Avatar */}
                    <g>
                      <circle cx={avatarPos.x} cy={avatarPos.y} r="14" fill={avatarColor} stroke="#ffffff" strokeWidth="2.5" />
                      <text x={avatarPos.x} y={avatarPos.y - 22} textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">
                        {currentCase === 1 ? "Sarah" : "John"}
                      </text>
                      {contaminationState === "contaminated" && (
                        <circle cx={avatarPos.x + 15} cy={avatarPos.y} r="6" fill="#f97316" stroke="#ffffff" strokeWidth="1" />
                      )}
                    </g>
                  </g>
                </svg>
              </div>
            </div>

            {/* Sidebar controls */}
            <div className="w-full xl:w-96 flex flex-col gap-6">
              {selectedPatient && (
                <div className="bg-slate-800 rounded-xl p-5 border border-cyan-400 shadow-md">
                  <h3 className="text-lg font-bold text-cyan-400 mb-3">Patient Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-b border-slate-700/50 pb-1.5">
                      <span className="text-gray-400">Name:</span>
                      <span className="text-white font-semibold">{selectedPatient.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-700/50 pb-1.5">
                      <span className="text-gray-400">Status:</span>
                      <span className={`font-semibold ${selectedPatient.status === "INFECTED" ? "text-red-400" : (selectedPatient.status === "CRITICAL" ? "text-orange-400" : "text-blue-400")}`}>{selectedPatient.status}</span>
                    </div>
                    {selectedPatient.infection && (
                      <div className="flex justify-between border-b border-slate-700/50 pb-1.5">
                        <span className="text-gray-400">Infection:</span>
                        <span className="text-red-400 font-semibold">{selectedPatient.infection}</span>
                      </div>
                    )}
                    {selectedPatient.age && (
                      <div className="flex justify-between border-b border-slate-700/50 pb-1.5">
                        <span className="text-gray-400">Age:</span>
                        <span className="text-white font-semibold">{selectedPatient.age}</span>
                      </div>
                    )}
                    <div className="flex justify-between pb-0.5">
                      <span className="text-gray-400">Risk Score:</span>
                      <span className="text-white font-bold">{selectedPatient.risk}%</span>
                    </div>
                  </div>
                </div>
              )}

              {showStory && twinStoryData[currentCase] && twinStoryData[currentCase][step] && (
                <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl p-5 border border-blue-400 shadow-lg">
                  <h3 className="text-lg font-bold text-white mb-3">📖 Story Event</h3>
                  <p className="text-white text-sm mb-4 leading-relaxed font-light">
                    {twinStoryData[currentCase][step].txt}
                  </p>
                  {twinStoryData[currentCase][step].btn && (
                    <button
                      onClick={handleStoryStep}
                      className="w-full bg-white hover:bg-gray-100 text-blue-600 font-bold py-2.5 px-4 rounded-lg text-sm shadow transition-all duration-200"
                    >
                      {twinStoryData[currentCase][step].btn}
                    </button>
                  )}
                </div>
              )}

              {showAlert && (
                <div className={`rounded-xl p-5 border shadow-lg transition-all ${
                  alertType === "critical" ? "bg-gradient-to-br from-red-600 to-red-800 border-red-400" : (alertType === "person" ? "bg-gradient-to-br from-yellow-600 to-yellow-800 border-yellow-400" : (alertType === "infected" ? "bg-gradient-to-br from-red-600 to-red-800 border-red-400" : "bg-gradient-to-br from-orange-600 to-orange-800 border-orange-400"))
                }`}>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {alertType === "critical" ? "🚨 CRITICAL ALERT" : (alertType === "person" ? "🟡 PERSON CONTAMINATION" : (alertType === "infected" ? "🔴 INFECTION SPREAD" : "🟧 EQUIPMENT CONTAMINATION"))}
                  </h3>
                  <p className="text-white text-xs mb-4 leading-relaxed whitespace-pre-line font-light">
                    {modalAlertText[alertType]}
                  </p>
                  <button
                    onClick={handleStoryStep}
                    className="w-full bg-white hover:bg-gray-100 text-gray-900 font-bold py-2.5 px-4 rounded-lg text-sm shadow transition-all duration-200"
                  >
                    {alertType === "critical" ? "GO TO HANDWASH STATION" : "ACKNOWLEDGE"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
