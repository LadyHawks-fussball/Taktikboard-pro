"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  RotateCcw,
  Download,
  Trash2,
  Plus,
  Shield,
  CircleDot,
  MoveRight,
  Save,
  FolderOpen,
  MousePointer2,
  Upload,
  X,
  Printer,
  FileText,
  Home,
  Copy,
  Share2,
  Monitor,
  ClipboardList,
  Users,
  ArrowLeft,
  Check,
  Lock,
  Hash,
  ImagePlus,
  UserPlus,
} from "lucide-react";

const initialHome = [
  { id: "h1", x: 50, y: 90, label: "1", number: "1", role: "TW", color: "bg-blue-700", locked: false, team: "home", rosterId: "r1" },
  { id: "h2", x: 18, y: 72, label: "2", number: "2", role: "LV", color: "bg-blue-700", locked: false, team: "home", rosterId: "r2" },
  { id: "h3", x: 38, y: 74, label: "3", number: "3", role: "IV", color: "bg-blue-700", locked: false, team: "home", rosterId: "r3" },
  { id: "h4", x: 62, y: 74, label: "4", number: "4", role: "IV", color: "bg-blue-700", locked: false, team: "home", rosterId: "r4" },
  { id: "h5", x: 82, y: 72, label: "5", number: "5", role: "RV", color: "bg-blue-700", locked: false, team: "home", rosterId: "r5" },
  { id: "h6", x: 28, y: 52, label: "6", number: "6", role: "ZM", color: "bg-blue-700", locked: false, team: "home", rosterId: "r6" },
  { id: "h7", x: 50, y: 56, label: "7", number: "7", role: "6", color: "bg-blue-700", locked: false, team: "home", rosterId: "r7" },
  { id: "h8", x: 72, y: 52, label: "8", number: "8", role: "ZM", color: "bg-blue-700", locked: false, team: "home", rosterId: "r8" },
  { id: "h9", x: 24, y: 28, label: "9", number: "9", role: "LA", color: "bg-blue-700", locked: false, team: "home", rosterId: "r9" },
  { id: "h10", x: 50, y: 22, label: "10", number: "10", role: "ST", color: "bg-blue-700", locked: false, team: "home", rosterId: "r10" },
  { id: "h11", x: 76, y: 28, label: "11", number: "11", role: "RA", color: "bg-blue-700", locked: false, team: "home", rosterId: "r11" },
];

const initialAway = [
  { id: "a1", x: 50, y: 10, label: "1", number: "1", role: "TW", color: "bg-white text-red-700", locked: false, team: "away" },
  { id: "a2", x: 18, y: 28, label: "2", number: "2", role: "LV", color: "bg-white text-red-700", locked: false, team: "away" },
  { id: "a3", x: 38, y: 26, label: "3", number: "3", role: "IV", color: "bg-white text-red-700", locked: false, team: "away" },
  { id: "a4", x: 62, y: 26, label: "4", number: "4", role: "IV", color: "bg-white text-red-700", locked: false, team: "away" },
  { id: "a5", x: 82, y: 28, label: "5", number: "5", role: "RV", color: "bg-white text-red-700", locked: false, team: "away" },
  { id: "a6", x: 28, y: 48, label: "6", number: "6", role: "ZM", color: "bg-white text-red-700", locked: false, team: "away" },
  { id: "a7", x: 50, y: 44, label: "7", number: "7", role: "6", color: "bg-white text-red-700", locked: false, team: "away" },
  { id: "a8", x: 72, y: 48, label: "8", number: "8", role: "ZM", color: "bg-white text-red-700", locked: false, team: "away" },
  { id: "a9", x: 24, y: 72, label: "9", number: "9", role: "LA", color: "bg-white text-red-700", locked: false, team: "away" },
  { id: "a10", x: 50, y: 78, label: "10", number: "10", role: "ST", color: "bg-white text-red-700", locked: false, team: "away" },
  { id: "a11", x: 76, y: 72, label: "11", number: "11", role: "RA", color: "bg-white text-red-700", locked: false, team: "away" },
];

const initialRoster = [
  { id: "r1", name: "Spielerin 1", number: "1", role: "TW", color: "bg-blue-700" },
  { id: "r2", name: "Spielerin 2", number: "2", role: "LV", color: "bg-blue-700" },
  { id: "r3", name: "Spielerin 3", number: "3", role: "IV", color: "bg-blue-700" },
  { id: "r4", name: "Spielerin 4", number: "4", role: "IV", color: "bg-blue-700" },
  { id: "r5", name: "Spielerin 5", number: "5", role: "RV", color: "bg-blue-700" },
  { id: "r6", name: "Spielerin 6", number: "6", role: "ZM", color: "bg-blue-700" },
  { id: "r7", name: "Spielerin 7", number: "7", role: "6", color: "bg-blue-700" },
  { id: "r8", name: "Spielerin 8", number: "8", role: "ZM", color: "bg-blue-700" },
  { id: "r9", name: "Spielerin 9", number: "9", role: "LA", color: "bg-blue-700" },
  { id: "r10", name: "Spielerin 10", number: "10", role: "ST", color: "bg-blue-700" },
  { id: "r11", name: "Spielerin 11", number: "11", role: "RA", color: "bg-blue-700" },
  { id: "r12", name: "Spielerin 12", number: "12", role: "BANK", color: "bg-blue-700" },
  { id: "r13", name: "Spielerin 13", number: "13", role: "BANK", color: "bg-white text-blue-700" },
  { id: "r14", name: "Spielerin 14", number: "14", role: "BANK", color: "bg-blue-700" },
  { id: "r15", name: "Spielerin 15", number: "15", role: "BANK", color: "bg-white text-blue-700" },
];

const initialBall = { id: "ball", x: 50, y: 50, label: "", color: "bg-white" };

const formations = {
  "4-3-3": [
    { id: "h1", x: 50, y: 90, role: "TW" },
    { id: "h2", x: 18, y: 72, role: "LV" },
    { id: "h3", x: 38, y: 74, role: "IV" },
    { id: "h4", x: 62, y: 74, role: "IV" },
    { id: "h5", x: 82, y: 72, role: "RV" },
    { id: "h6", x: 28, y: 52, role: "ZM" },
    { id: "h7", x: 50, y: 56, role: "6" },
    { id: "h8", x: 72, y: 52, role: "ZM" },
    { id: "h9", x: 24, y: 28, role: "LA" },
    { id: "h10", x: 50, y: 22, role: "ST" },
    { id: "h11", x: 76, y: 28, role: "RA" },
  ],
  "4-4-2": [
    { id: "h1", x: 50, y: 90, role: "TW" },
    { id: "h2", x: 18, y: 72, role: "LV" },
    { id: "h3", x: 38, y: 74, role: "IV" },
    { id: "h4", x: 62, y: 74, role: "IV" },
    { id: "h5", x: 82, y: 72, role: "RV" },
    { id: "h6", x: 16, y: 48, role: "LM" },
    { id: "h7", x: 38, y: 52, role: "ZM" },
    { id: "h8", x: 62, y: 52, role: "ZM" },
    { id: "h9", x: 84, y: 48, role: "RM" },
    { id: "h10", x: 40, y: 24, role: "ST" },
    { id: "h11", x: 60, y: 24, role: "ST" },
  ],
  "3-5-2": [
    { id: "h1", x: 50, y: 90, role: "TW" },
    { id: "h2", x: 28, y: 74, role: "IV" },
    { id: "h3", x: 50, y: 76, role: "IV" },
    { id: "h4", x: 72, y: 74, role: "IV" },
    { id: "h5", x: 12, y: 48, role: "LAV" },
    { id: "h6", x: 32, y: 52, role: "ZM" },
    { id: "h7", x: 50, y: 56, role: "6" },
    { id: "h8", x: 68, y: 52, role: "ZM" },
    { id: "h9", x: 88, y: 48, role: "RAV" },
    { id: "h10", x: 40, y: 24, role: "ST" },
    { id: "h11", x: 60, y: 24, role: "ST" },
  ],
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function PlayerChip({ item, selected, locked, onPointerDown, onClick }) {
  return (
    <button
      onPointerDown={onPointerDown}
      onClick={onClick}
      className={`absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full ${item.color} text-xs font-bold shadow-lg border-2 ${selected ? "border-yellow-300 scale-110" : "border-white/80"} transition flex items-center justify-center`}
      style={{ left: `${item.x}%`, top: `${item.y}%`, cursor: locked ? "not-allowed" : "grab" }}
    >
      {item.number || item.label}
    </button>
  );
}

function encodeBoardState(data) {
  try {
    return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
  } catch {
    return "";
  }
}

function decodeBoardState(value) {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(value))));
  } catch {
    return null;
  }
}

function buildBoardPayload({ players, arrows, ball, formation, roster, boardTitle, matchInfo, clubLogo, notes }) {
  return {
    players,
    arrows,
    ball,
    formation,
    roster,
    boardTitle,
    matchInfo,
    clubLogo,
    notes,
    savedAt: new Date().toISOString(),
  };
}

export default function FussballTaktikboardApp() {
  const [currentView, setCurrentView] = useState("start");
  const [players, setPlayers] = useState([...initialHome, ...initialAway]);
  const [roster, setRoster] = useState(initialRoster);
  const [ball, setBall] = useState(initialBall);
  const [selectedId, setSelectedId] = useState(null);
  const [newPlayerName, setNewPlayerName] = useState("Neue Spielerin");
  const [newPlayerNumber, setNewPlayerNumber] = useState("16");
  const [boardTitle, setBoardTitle] = useState("Taktikboard Fußball");
  const [matchInfo, setMatchInfo] = useState("Training / Spielbesprechung");
  const [clubLogo, setClubLogo] = useState("");
  const [selectedFormation, setSelectedFormation] = useState("4-3-3");
  const [mode, setMode] = useState("move");
  const [selectedArrowId, setSelectedArrowId] = useState(null);
  const [savedSetups, setSavedSetups] = useState([]);
  const [arrows, setArrows] = useState([]);
  const [arrowStart, setArrowStart] = useState(null);
  const [shareLink, setShareLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [notes, setNotes] = useState("Schwerpunkte, Abläufe oder Coachingpunkte hier notieren...");
  const boardRef = useRef(null);
  const dragRef = useRef(null);

  const selected = useMemo(() => {
    if (selectedId === "ball") return ball;
    return players.find((p) => p.id === selectedId) || null;
  }, [selectedId, players, ball]);

  const selectedRosterPlayer = useMemo(() => {
    if (!selected || !selected.rosterId) return null;
    return roster.find((r) => r.id === selected.rosterId) || null;
  }, [selected, roster]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("taktikboard_saved_setups_v3");
      if (raw) setSavedSetups(JSON.parse(raw));
    } catch {}
    const hash = window.location.hash.replace("#shared=", "");
    if (hash) {
      const shared = decodeBoardState(hash);
      if (shared) {
        applyExternalBoard(shared);
        setCurrentView("board");
      }
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("taktikboard_saved_setups_v3", JSON.stringify(savedSetups));
    } catch {}
  }, [savedSetups]);

  const applyExternalBoard = (data) => {
    setPlayers(data.players || [...initialHome, ...initialAway]);
    setRoster(data.roster || initialRoster);
    setArrows(data.arrows || []);
    setBall(data.ball || initialBall);
    setSelectedFormation(data.formation || "4-3-3");
    setBoardTitle(data.boardTitle || "Taktikboard Fußball");
    setMatchInfo(data.matchInfo || "Training / Spielbesprechung");
    setClubLogo(data.clubLogo || "");
    setNotes(data.notes || "");
    setSelectedArrowId(null);
    setArrowStart(null);
  };

  const updatePositionFromEvent = (clientX, clientY) => {
    const board = boardRef.current;
    const drag = dragRef.current;
    if (!board || !drag) return;
    const player = players.find((p) => p.id === drag.id);
    if (player?.locked) return;

    const rect = board.getBoundingClientRect();
    const x = clamp(((clientX - rect.left) / rect.width) * 100, 3, 97);
    const y = clamp(((clientY - rect.top) / rect.height) * 100, 3, 97);

    if (drag.type === "ball") {
      setBall((prev) => ({ ...prev, x, y }));
    } else {
      setPlayers((prev) => prev.map((p) => (p.id === drag.id ? { ...p, x, y } : p)));
    }
  };

  const startDrag = (type, id) => (e) => {
    if (mode !== "move") return;
    const player = players.find((p) => p.id === id);
    if (player?.locked) return;
    e.preventDefault();
    dragRef.current = { type, id };
    setSelectedId(id);
  };

  const onPointerMove = (e) => {
    if (!dragRef.current) return;
    updatePositionFromEvent(e.clientX, e.clientY);
  };

  const stopDrag = () => {
    dragRef.current = null;
  };

  const resetBoard = () => {
    setPlayers([...initialHome, ...initialAway]);
    setRoster(initialRoster);
    setBall(initialBall);
    setSelectedId(null);
    setArrows([]);
    setArrowStart(null);
    setSelectedArrowId(null);
    setSelectedFormation("4-3-3");
    setBoardTitle("Taktikboard Fußball");
    setMatchInfo("Training / Spielbesprechung");
    setNotes("Schwerpunkte, Abläufe oder Coachingpunkte hier notieren...");
  };

  const applyFormation = (formationKey) => {
    const formation = formations[formationKey] || formations["4-3-3"];
    setPlayers((prev) => {
      const homePlayers = prev.filter((p) => p.team === "home");
      const updatedHome = homePlayers.map((p) => {
        const slot = formation.find((f) => f.id === p.id);
        return slot ? { ...p, x: slot.x, y: slot.y, role: slot.role } : p;
      });
      const others = prev.filter((p) => p.team !== "home");
      return [...updatedHome, ...others];
    });
    setSelectedFormation(formationKey);
  };

  const addRosterPlayer = () => {
    const id = `r${Date.now()}`;
    setRoster((prev) => [
      ...prev,
      {
        id,
        name: newPlayerName || `Spielerin ${newPlayerNumber}`,
        number: newPlayerNumber || "16",
        role: "BANK",
        color: "bg-blue-700",
      },
    ]);
    setNewPlayerName("Neue Spielerin");
    setNewPlayerNumber(String(Number(newPlayerNumber || 16) + 1));
  };

  const addRosterPlayerToBoard = (rosterPlayer) => {
    const alreadyOnBoard = players.some((p) => p.rosterId === rosterPlayer.id && p.team === "home");
    if (alreadyOnBoard) return;
    const id = `c${Date.now()}${Math.floor(Math.random() * 1000)}`;
    setPlayers((prev) => [
      ...prev,
      {
        id,
        x: 50,
        y: 50,
        label: rosterPlayer.number,
        number: rosterPlayer.number,
        role: rosterPlayer.role,
        color: rosterPlayer.color,
        locked: false,
        team: "home",
        rosterId: rosterPlayer.id,
      },
    ]);
    setSelectedId(id);
    setCurrentView("board");
  };

  const removeSelected = () => {
    if (!selectedId) return;
    if (selectedId === "ball") {
      setBall(initialBall);
      setSelectedId(null);
      return;
    }
    setPlayers((prev) => prev.filter((p) => p.id !== selectedId));
    setSelectedId(null);
  };

  const updateSelectedName = (value) => {
    if (!selected?.rosterId) return;
    setRoster((prev) => prev.map((r) => (r.id === selected.rosterId ? { ...r, name: value } : r)));
  };

  const updateSelectedNumber = (value) => {
    if (!selected?.rosterId) return;
    const cleaned = value.replace(/[^0-9]/g, "").slice(0, 2);
    setRoster((prev) => prev.map((r) => (r.id === selected.rosterId ? { ...r, number: cleaned } : r)));
    setPlayers((prev) => prev.map((p) => (p.rosterId === selected.rosterId ? { ...p, number: cleaned, label: cleaned } : p)));
  };

  const updateSelectedRole = (value) => {
    if (!selected?.rosterId) return;
    const role = value.slice(0, 5).toUpperCase();
    setRoster((prev) => prev.map((r) => (r.id === selected.rosterId ? { ...r, role } : r)));
    setPlayers((prev) => prev.map((p) => (p.rosterId === selected.rosterId ? { ...p, role } : p)));
  };

  const toggleSelectedLock = () => {
    if (!selectedId || selectedId === "ball") return;
    setPlayers((prev) => prev.map((p) => (p.id === selectedId ? { ...p, locked: !p.locked } : p)));
  };

  const getBoardPosition = (clientX, clientY) => {
    const board = boardRef.current;
    if (!board) return null;
    const rect = board.getBoundingClientRect();
    return {
      x: clamp(((clientX - rect.left) / rect.width) * 100, 0, 100),
      y: clamp(((clientY - rect.top) / rect.height) * 100, 0, 100),
    };
  };

  const handleBoardClick = (e) => {
    if (mode !== "draw" || dragRef.current) return;
    const pos = getBoardPosition(e.clientX, e.clientY);
    if (!pos) return;
    if (!arrowStart) {
      setArrowStart(pos);
      return;
    }
    setArrows((prev) => [...prev, { id: `arrow-${Date.now()}`, from: arrowStart, to: pos }]);
    setArrowStart(null);
  };

  const clearArrows = () => {
    setArrows([]);
    setArrowStart(null);
    setSelectedArrowId(null);
  };

  const deleteSelectedArrow = () => {
    if (!selectedArrowId) return;
    setArrows((prev) => prev.filter((arrow) => arrow.id !== selectedArrowId));
    setSelectedArrowId(null);
  };

  const exportBoardFile = () => {
    const data = buildBoardPayload({ players, arrows, ball, formation: selectedFormation, roster, boardTitle, matchInfo, clubLogo, notes });
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `taktikboard-${selectedFormation}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const importBoardFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const data = JSON.parse(text);
    applyExternalBoard(data);
    setCurrentView("board");
    e.target.value = "";
  };

  const saveSetup = () => {
    const name = `Aufstellung ${savedSetups.length + 1}`;
    const setup = { id: Date.now().toString(), name, ...buildBoardPayload({ players, arrows, ball, formation: selectedFormation, roster, boardTitle, matchInfo, clubLogo, notes }) };
    setSavedSetups((prev) => [setup, ...prev]);
  };

  const loadSetup = (id) => {
    const setup = savedSetups.find((item) => item.id === id);
    if (!setup) return;
    applyExternalBoard(setup);
    setCurrentView("board");
  };

  const generateShareLink = async () => {
    const payload = buildBoardPayload({ players, arrows, ball, formation: selectedFormation, roster, boardTitle, matchInfo, clubLogo, notes });
    const encoded = encodeBoardState(payload);
    const url = `${window.location.origin}${window.location.pathname}#shared=${encoded}`;
    setShareLink(url);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const exportImage = async () => {
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(boardRef.current, { backgroundColor: null, scale: 2 });
    const link = document.createElement("a");
    link.download = "taktikboard.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const printBoard = () => window.print();

  const exportPDF = async () => {
    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");
    const target = boardRef.current?.closest(".print-area");
    if (!target) return;
    const canvas = await html2canvas(target, { backgroundColor: "#ffffff", scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
    const imgWidth = canvas.width * ratio;
    const imgHeight = canvas.height * ratio;
    pdf.addImage(imgData, "PNG", (pageWidth - imgWidth) / 2, (pageHeight - imgHeight) / 2, imgWidth, imgHeight);
    pdf.save("taktikboard.pdf");
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setClubLogo(reader.result);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const openPresetView = (type) => {
    if (type === "training") {
      setBoardTitle("Trainingseinheit");
      setMatchInfo("Trainingsplanung");
    }
    if (type === "match") {
      setBoardTitle("Spielanalyse / Gegnerbesprechung");
      setMatchInfo("Matchbesprechung");
    }
    if (type === "board") {
      setBoardTitle("Taktikboard Fußball");
      setMatchInfo("Training / Spielbesprechung");
    }
    setCurrentView("board");
  };

  const StartCard = ({ icon, title, text, onClick }) => (
    <button onClick={onClick} className="text-left rounded-3xl border border-blue-100 bg-white/80 hover:bg-white transition p-6 shadow-sm backdrop-blur">
      <div className="flex items-center gap-3 mb-4 text-blue-700">{icon}</div>
      <div className="text-2xl font-bold text-slate-900">{title}</div>
      <div className="text-sm text-slate-600 mt-2">{text}</div>
    </button>
  );

  return (
    <div className="min-h-screen p-6 print:bg-white print:p-2 bg-[linear-gradient(135deg,#dbeafe_0%,#ffffff_45%,#bfdbfe_100%)]">
      {currentView === "start" ? (
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[32px] bg-white/85 shadow-xl border border-blue-100 p-8 md:p-10 backdrop-blur">
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Web-App für den PC</div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2">Taktikboard Pro Blau/Weiß</h1>
                <p className="text-slate-600 mt-3 max-w-2xl">Mit eigenem Kaderbereich, damit du Spielerinnen per Drag & Drop oder Klick in die Aufstellung bringen kannst.</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mt-10">
              <StartCard icon={<Monitor className="w-8 h-8" />} title="Neues Taktikboard" text="Direkt mit Formation, Spielerinnen und Pfeilen starten." onClick={() => openPresetView("board")} />
              <StartCard icon={<Users className="w-8 h-8" />} title="Spielerinnen-Kader" text="Kader verwalten und Spielerinnen in die Aufstellung ziehen." onClick={() => setCurrentView("roster")} />
              <StartCard icon={<FolderOpen className="w-8 h-8" />} title="Gespeicherte Taktiken" text="Gespeicherte Aufstellungen öffnen und weiter bearbeiten." onClick={() => setCurrentView("library")} />
              <StartCard icon={<ClipboardList className="w-8 h-8" />} title="Matchbesprechung" text="Gegnerbild und Spielplan für dein Team und den Co-Trainer." onClick={() => openPresetView("match")} />
            </div>
          </div>
        </div>
      ) : currentView === "library" ? (
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="text-3xl font-bold text-slate-900">Gespeicherte Taktiken</div>
              <div className="text-slate-600 mt-1">Öffne gespeicherte Boards oder starte ein neues.</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-xl border-blue-200" onClick={() => setCurrentView("start")}><ArrowLeft className="w-4 h-4 mr-2" /> Menü</Button>
              <Button className="rounded-xl bg-blue-700 hover:bg-blue-800" onClick={() => openPresetView("board")}>Neues Board</Button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {savedSetups.length === 0 ? (
              <Card className="rounded-3xl shadow-sm border-dashed col-span-full border-blue-200"><CardContent className="p-8 text-center text-slate-500">Noch keine Taktik gespeichert.</CardContent></Card>
            ) : (
              savedSetups.map((setup) => (
                <Card key={setup.id} className="rounded-3xl shadow-sm border-blue-100">
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <div className="text-xl font-bold text-slate-900">{setup.name}</div>
                      <div className="text-sm text-slate-600">{setup.boardTitle || "Taktikboard Fußball"}</div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{setup.formation}</Badge>
                      <Badge variant="outline">{setup.matchInfo || "Besprechung"}</Badge>
                    </div>
                    <Button className="w-full rounded-xl bg-blue-700 hover:bg-blue-800" onClick={() => loadSetup(setup.id)}>Öffnen</Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      ) : currentView === "roster" ? (
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="text-3xl font-bold text-slate-900">Spielerinnen-Kader</div>
              <div className="text-slate-600 mt-1">Per Klick eine Spielerin ins Board übernehmen. Danach auf dem Spielfeld frei platzieren.</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-xl border-blue-200" onClick={() => setCurrentView("start")}><ArrowLeft className="w-4 h-4 mr-2" /> Menü</Button>
              <Button className="rounded-xl bg-blue-700 hover:bg-blue-800" onClick={() => setCurrentView("board")}>Zum Board</Button>
            </div>
          </div>

          <Card className="rounded-3xl border-blue-100">
            <CardContent className="p-6 grid lg:grid-cols-[320px_1fr] gap-6">
              <div className="space-y-3">
                <div className="text-lg font-bold text-slate-900">Neue Spielerin anlegen</div>
                <Input value={newPlayerName} onChange={(e) => setNewPlayerName(e.target.value)} placeholder="Name" />
                <Input value={newPlayerNumber} onChange={(e) => setNewPlayerNumber(e.target.value.replace(/[^0-9]/g, "").slice(0, 2))} placeholder="Nummer" />
                <Button className="w-full rounded-xl bg-blue-700 hover:bg-blue-800" onClick={addRosterPlayer}><UserPlus className="w-4 h-4 mr-2" /> Zum Kader hinzufügen</Button>
                <p className="text-sm text-slate-500">Tipp: Im nächsten Schritt kannst du jede Spielerin mit einem Klick in die Aufstellung übernehmen.</p>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {roster.map((player) => {
                  const onBoard = players.some((p) => p.rosterId === player.id && p.team === "home");
                  return (
                    <Card key={player.id} className="rounded-2xl border-blue-100 shadow-sm">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className={`w-10 h-10 rounded-full ${player.color} border-2 border-white shadow flex items-center justify-center text-sm font-bold`}>
                            {player.number}
                          </div>
                          {onBoard ? <Badge variant="secondary">Im Board</Badge> : <Badge variant="outline">Kader</Badge>}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{player.name}</div>
                          <div className="text-sm text-slate-500">Position: {player.role}</div>
                        </div>
                        <Button className="w-full rounded-xl bg-blue-700 hover:bg-blue-800" onClick={() => addRosterPlayerToBoard(player)} disabled={onBoard}>
                          {onBoard ? "Schon im Board" : "In Aufstellung übernehmen"}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[400px_1fr] gap-6">
          <Card className="rounded-2xl shadow-xl border border-blue-100 bg-white/90 print:hidden">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-2xl text-blue-800">Taktikboard Fußball</CardTitle>
                  <p className="text-sm text-slate-600">Mit extra Spielerinnen-Seite für die Aufstellung.</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="rounded-xl border-blue-200" onClick={() => setCurrentView("start")}><Home className="w-4 h-4" /></Button>
                  <Button variant="outline" size="icon" className="rounded-xl border-blue-200" onClick={() => setCurrentView("roster")}><Users className="w-4 h-4" /></Button>
                  <Button variant="outline" size="icon" className="rounded-xl border-blue-200" onClick={() => setCurrentView("library")}><FolderOpen className="w-4 h-4" /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <div className="text-sm font-medium mb-2 text-blue-800">Toolbar</div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant={mode === "move" ? "default" : "outline"} className={`rounded-xl ${mode === "move" ? "bg-blue-700 hover:bg-blue-800" : "border-blue-200"}`} onClick={() => { setMode("move"); setArrowStart(null); }}><MousePointer2 className="w-4 h-4 mr-2" /> Bewegen</Button>
                  <Button variant={mode === "draw" ? "default" : "outline"} className={`rounded-xl ${mode === "draw" ? "bg-blue-700 hover:bg-blue-800" : "border-blue-200"}`} onClick={() => { setMode("draw"); setArrowStart(null); }}><MoveRight className="w-4 h-4 mr-2" /> Pfeile</Button>
                  <Button className="rounded-xl bg-blue-700 hover:bg-blue-800" onClick={resetBoard}><RotateCcw className="w-4 h-4 mr-2" /> Reset</Button>
                  <Button variant="secondary" className="rounded-xl" onClick={exportImage}><Download className="w-4 h-4 mr-2" /> Bild</Button>
                  <Button variant="outline" className="rounded-xl border-blue-200" onClick={saveSetup}><Save className="w-4 h-4 mr-2" /> Speichern</Button>
                  <Button variant="outline" className="rounded-xl border-blue-200" onClick={exportBoardFile}><Upload className="w-4 h-4 mr-2 rotate-180" /> Datei</Button>
                  <Button variant="outline" className="rounded-xl border-blue-200" onClick={printBoard}><Printer className="w-4 h-4 mr-2" /> Drucken</Button>
                  <Button variant="outline" className="rounded-xl border-blue-200" onClick={exportPDF}><FileText className="w-4 h-4 mr-2" /> PDF</Button>
                </div>
              </div>

              <div className="border rounded-2xl p-4 bg-blue-50/70 border-blue-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-blue-800">Spielerinnen</div>
                  <Users className="w-4 h-4 text-blue-700" />
                </div>
                <Button className="w-full rounded-xl bg-blue-700 hover:bg-blue-800" onClick={() => setCurrentView("roster")}>Zur Spielerinnen-Seite</Button>
                <p className="text-xs text-slate-500">Dort kannst du den Kader verwalten und Spielerinnen in die Aufstellung übernehmen.</p>
              </div>

              <div className="border rounded-2xl p-4 bg-blue-50/70 border-blue-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-blue-800">Web teilen</div>
                  <Share2 className="w-4 h-4 text-blue-700" />
                </div>
                <Button className="w-full rounded-xl bg-blue-700 hover:bg-blue-800" onClick={generateShareLink}><Share2 className="w-4 h-4 mr-2" /> Link erzeugen</Button>
                {shareLink ? (
                  <>
                    <Textarea value={shareLink} readOnly className="min-h-[90px] bg-white" />
                    <Button variant="outline" className="w-full rounded-xl border-blue-200" onClick={async () => {
                      try { await navigator.clipboard.writeText(shareLink); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {}
                    }}>
                      {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copied ? "Link kopiert" : "Link kopieren"}
                    </Button>
                  </>
                ) : <p className="text-xs text-slate-500">Erzeuge einen Link für deinen Co-Trainer.</p>}
              </div>

              <div className="border rounded-2xl p-4 bg-blue-50/70 border-blue-100 space-y-3">
                <label className="block">
                  <span className="text-sm font-medium mb-2 block text-blue-800">Teamlogo hochladen</span>
                  <Input type="file" accept="image/*" onChange={handleLogoUpload} />
                </label>
                <label className="block">
                  <span className="text-sm font-medium mb-2 block text-blue-800">Gespeicherte Datei laden</span>
                  <Input type="file" accept="application/json" onChange={importBoardFile} />
                </label>
              </div>

              <div className="border rounded-2xl p-4 bg-blue-50/70 border-blue-100">
                <div className="text-sm font-medium mb-3 text-blue-800">Kopfbereich</div>
                <div className="space-y-3 mb-4">
                  <Input value={boardTitle} onChange={(e) => setBoardTitle(e.target.value)} placeholder="Titel" />
                  <Input value={matchInfo} onChange={(e) => setMatchInfo(e.target.value)} placeholder="z. B. Gegner / Datum / Thema" />
                </div>
                <div className="text-sm font-medium mb-3 text-blue-800">Formation wählen</div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {Object.keys(formations).map((formation) => (
                    <Button key={formation} type="button" variant={selectedFormation === formation ? "default" : "outline"} className={`rounded-xl ${selectedFormation === formation ? "bg-blue-700 hover:bg-blue-800" : "border-blue-200"}`} onClick={() => applyFormation(formation)}>{formation}</Button>
                  ))}
                </div>
              </div>

              <div className="border rounded-2xl p-4 bg-blue-50/70 border-blue-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-blue-800">Auswahl</div>
                  {selected ? <Badge variant="secondary">{selectedId === "ball" ? "Ball" : selected.id}</Badge> : <Badge variant="outline">Nichts gewählt</Badge>}
                </div>
                {selectedId && selectedId !== "ball" ? (
                  <>
                    <Input value={selectedRosterPlayer?.name || ""} onChange={(e) => updateSelectedName(e.target.value)} placeholder="Name der Spielerin" />
                    <Input value={selected?.number || ""} onChange={(e) => updateSelectedNumber(e.target.value)} placeholder="Nummer" />
                    <Input value={selected?.role || ""} onChange={(e) => updateSelectedRole(e.target.value)} placeholder="Position, z. B. IV" />
                    <Button variant="outline" className="w-full rounded-xl border-blue-200" onClick={toggleSelectedLock}><Lock className="w-4 h-4 mr-2" /> {selected?.locked ? "Position freigeben" : "Position fixieren"}</Button>
                    <Button variant="destructive" className="w-full rounded-xl" onClick={removeSelected}><Trash2 className="w-4 h-4 mr-2" /> Aus Aufstellung entfernen</Button>
                  </>
                ) : selectedId === "ball" ? (
                  <Button variant="destructive" className="w-full rounded-xl" onClick={removeSelected}><CircleDot className="w-4 h-4 mr-2" /> Ball zurücksetzen</Button>
                ) : <p className="text-sm text-slate-500">Klicke auf eine Spielerin oder den Ball.</p>}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
            <CardContent className="p-3 md:p-5 print-area bg-white">
              <div className="flex items-center justify-between gap-4 mb-4 border border-blue-100 rounded-2xl p-4 bg-[linear-gradient(90deg,#eff6ff_0%,#ffffff_50%,#dbeafe_100%)]">
                <div>
                  <div className="text-2xl font-bold text-slate-900">{boardTitle}</div>
                  <div className="text-sm text-slate-600">{matchInfo}</div>
                  <div className="text-xs text-slate-500 mt-1">Formation: {selectedFormation}</div>
                </div>
                {clubLogo ? (
                  <img src={clubLogo} alt="Teamlogo" className="h-16 w-16 object-contain rounded-xl border bg-white p-1" />
                ) : (
                  <div className="h-16 w-16 rounded-xl border bg-blue-50 flex items-center justify-center text-[10px] text-slate-400 text-center px-2"><ImagePlus className="w-5 h-5" /></div>
                )}
              </div>

              <div
                ref={boardRef}
                onClick={handleBoardClick}
                onPointerMove={mode === "move" ? onPointerMove : undefined}
                onPointerUp={stopDrag}
                onPointerLeave={stopDrag}
                className="relative w-full aspect-[7/10] rounded-[28px] overflow-hidden select-none touch-none shadow-inner"
                style={{ background: "linear-gradient(180deg, #1d4ed8 0%, #2563eb 12%, #1f9d55 12%, #178347 100%)" }}
              >
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(45deg, rgba(255,255,255,0.55) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0.55) 75%, transparent 75%, transparent)", backgroundSize: "40px 40px" }} />
                <div className="absolute inset-0 opacity-20">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="absolute inset-y-0 border-l border-white" style={{ left: `${(i + 1) * 8}%` }} />
                  ))}
                </div>
                <div className="absolute inset-4 border-2 border-white/90 rounded-[24px]" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 border-2 border-white/90 rounded-full" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full" />
                <div className="absolute left-4 right-4 top-1/2 border-t-2 border-white/90" />
                <div className="absolute left-1/2 -translate-x-1/2 top-4 w-44 h-16 border-2 border-white/90 border-t-0 rounded-b-2xl" />
                <div className="absolute left-1/2 -translate-x-1/2 top-4 w-20 h-7 border-2 border-white/90 border-t-0 rounded-b-xl" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-4 w-44 h-16 border-2 border-white/90 border-b-0 rounded-t-2xl" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-4 w-20 h-7 border-2 border-white/90 border-b-0 rounded-t-xl" />

                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="white" />
                    </marker>
                  </defs>
                  {arrows.map((arrow) => (
                    <line key={arrow.id} x1={`${arrow.from.x}%`} y1={`${arrow.from.y}%`} x2={`${arrow.to.x}%`} y2={`${arrow.to.y}%`} stroke={selectedArrowId === arrow.id ? "#fde047" : "white"} strokeWidth="3" markerEnd="url(#arrowhead)" strokeLinecap="round" className="cursor-pointer pointer-events-auto" onClick={() => setSelectedArrowId(arrow.id)} />
                  ))}
                  {arrowStart && <circle cx={`${arrowStart.x}%`} cy={`${arrowStart.y}%`} r="6" fill="white" />}
                </svg>

                <div className="absolute left-1/2 -translate-x-1/2 top-2 text-white/90 text-xs font-semibold tracking-widest">GEGNER</div>
                <div className="absolute left-1/2 -translate-x-1/2 bottom-2 text-white/90 text-xs font-semibold tracking-widest">DEIN TEAM</div>

                {players.map((player) => {
                  const rosterPlayer = roster.find((r) => r.id === player.rosterId);
                  return (
                    <div key={player.id}>
                      <PlayerChip item={player} selected={selectedId === player.id} locked={!!player.locked} onPointerDown={startDrag("player", player.id)} onClick={() => setSelectedId(player.id)} />
                      <div className="absolute -translate-x-1/2 text-[10px] font-medium text-white bg-slate-900/45 px-2 py-0.5 rounded-full" style={{ left: `${player.x}%`, top: `calc(${player.y}% + 30px)` }}>
                        {rosterPlayer?.name || player.id} · {player.role || ""}{player.locked ? " · FIX" : ""}
                      </div>
                    </div>
                  );
                })}

                <button onPointerDown={startDrag("ball", "ball")} onClick={() => setSelectedId("ball")} className={`absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border-2 ${selectedId === "ball" ? "border-yellow-300 scale-110" : "border-slate-900/20"} shadow-lg`} style={{ left: `${ball.x}%`, top: `${ball.y}%` }} title="Ball" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
