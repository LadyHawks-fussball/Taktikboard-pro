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
  MoveRight,
  Save,
  FolderOpen,
  MousePointer2,
  Upload,
  Printer,
  FileText,
  Home,
  Copy,
  Share2,
  Monitor,
  Users,
  ArrowLeft,
  Check,
  Lock,
  Hash,
  ImagePlus,
  UserPlus,
  LogIn,
  LogOut,
  CalendarDays,
  Grip,
  Plus,
} from "lucide-react";

const initialRoster = [
  { id: "r1", name: "Spielerin 1", number: "1", role: "TW", customRoleLabel: "TW", color: "bg-blue-700", photo: "" },
  { id: "r2", name: "Spielerin 2", number: "2", role: "LV", customRoleLabel: "LV", color: "bg-blue-700", photo: "" },
  { id: "r3", name: "Spielerin 3", number: "3", role: "IV", customRoleLabel: "IV", color: "bg-blue-700", photo: "" },
  { id: "r4", name: "Spielerin 4", number: "4", role: "IV", customRoleLabel: "IV", color: "bg-blue-700", photo: "" },
  { id: "r5", name: "Spielerin 5", number: "5", role: "RV", customRoleLabel: "RV", color: "bg-blue-700", photo: "" },
  { id: "r6", name: "Spielerin 6", number: "6", role: "ZM", customRoleLabel: "ZM", color: "bg-blue-700", photo: "" },
  { id: "r7", name: "Spielerin 7", number: "7", role: "6", customRoleLabel: "6", color: "bg-blue-700", photo: "" },
  { id: "r8", name: "Spielerin 8", number: "8", role: "ZM", customRoleLabel: "ZM", color: "bg-blue-700", photo: "" },
  { id: "r9", name: "Spielerin 9", number: "9", role: "LA", customRoleLabel: "LA", color: "bg-blue-700", photo: "" },
  { id: "r10", name: "Spielerin 10", number: "10", role: "ST", customRoleLabel: "ST", color: "bg-blue-700", photo: "" },
  { id: "r11", name: "Spielerin 11", number: "11", role: "RA", customRoleLabel: "RA", color: "bg-blue-700", photo: "" },
  { id: "r12", name: "Spielerin 12", number: "12", role: "BANK", customRoleLabel: "BANK", color: "bg-blue-700", photo: "" },
  { id: "r13", name: "Spielerin 13", number: "13", role: "BANK", customRoleLabel: "BANK", color: "bg-white text-blue-700", photo: "" },
  { id: "r14", name: "Spielerin 14", number: "14", role: "BANK", customRoleLabel: "BANK", color: "bg-blue-700", photo: "" },
  { id: "r15", name: "Spielerin 15", number: "15", role: "BANK", customRoleLabel: "BANK", color: "bg-white text-blue-700", photo: "" },
];

const initialTrainingBlocks = [
  { id: "t1", title: "Aufwärmen", minutes: "15", focus: "Mobilisation + Passformen" },
  { id: "t2", title: "Spielform", minutes: "20", focus: "Pressing auslösen" },
  { id: "t3", title: "Abschlussspiel", minutes: "25", focus: "Umschalten nach Ballgewinn" },
];

const initialBall = { id: "ball", x: 50, y: 50 };

const formations = {
  "4-3-3": [
    { x: 50, y: 86, role: "TW" },
    { x: 18, y: 70, role: "LV" },
    { x: 38, y: 72, role: "IV" },
    { x: 62, y: 72, role: "IV" },
    { x: 82, y: 70, role: "RV" },
    { x: 28, y: 50, role: "ZM" },
    { x: 50, y: 54, role: "6" },
    { x: 72, y: 50, role: "ZM" },
    { x: 24, y: 28, role: "LA" },
    { x: 50, y: 22, role: "ST" },
    { x: 76, y: 28, role: "RA" },
  ],
  "4-4-2": [
    { x: 50, y: 86, role: "TW" },
    { x: 18, y: 70, role: "LV" },
    { x: 38, y: 72, role: "IV" },
    { x: 62, y: 72, role: "IV" },
    { x: 82, y: 70, role: "RV" },
    { x: 16, y: 48, role: "LM" },
    { x: 38, y: 52, role: "ZM" },
    { x: 62, y: 52, role: "ZM" },
    { x: 84, y: 48, role: "RM" },
    { x: 40, y: 24, role: "ST" },
    { x: 60, y: 24, role: "ST" },
  ],
  "3-5-2": [
    { x: 50, y: 86, role: "TW" },
    { x: 28, y: 72, role: "IV" },
    { x: 50, y: 74, role: "IV" },
    { x: 72, y: 72, role: "IV" },
    { x: 12, y: 48, role: "LAV" },
    { x: 32, y: 52, role: "ZM" },
    { x: 50, y: 56, role: "6" },
    { x: 68, y: 52, role: "ZM" },
    { x: 88, y: 48, role: "RAV" },
    { x: 40, y: 24, role: "ST" },
    { x: 60, y: 24, role: "ST" },
  ],
  "3-6-1": [
    { x: 50, y: 86, role: "TW" },
    { x: 28, y: 72, role: "IV" },
    { x: 50, y: 74, role: "IV" },
    { x: 72, y: 72, role: "IV" },
    { x: 12, y: 48, role: "LAV" },
    { x: 30, y: 52, role: "ZM" },
    { x: 44, y: 56, role: "6" },
    { x: 56, y: 56, role: "8" },
    { x: 70, y: 52, role: "ZM" },
    { x: 88, y: 48, role: "RAV" },
    { x: 50, y: 22, role: "ST" },
  ],
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
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

function buildBoardPayload({ players, arrows, ball, formation, roster, boardTitle, matchInfo, clubLogo, notes, trainingBlocks }) {
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
    trainingBlocks,
    savedAt: new Date().toISOString(),
  };
}

function PlayerCircle({ player, rosterPlayer, selected, onPointerDown, onClick }) {
  return (
    <>
      <button
        onPointerDown={onPointerDown}
        onClick={onClick}
        className={`absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full ${player.color} border-2 ${selected ? "border-yellow-300" : "border-white"} shadow-lg flex items-center justify-center text-xs font-bold`}
        style={{ left: `${player.x}%`, top: `${player.y}%`, cursor: player.locked ? "not-allowed" : "grab" }}
      >
        {player.number}
      </button>
      <div
        className="absolute -translate-x-1/2 text-[11px] font-semibold text-white bg-slate-900/85 px-2.5 py-1 rounded-md shadow whitespace-nowrap"
        style={{ left: `${player.x}%`, top: `calc(${player.y}% + 32px)` }}
      >
        {rosterPlayer?.name || "Spielerin"} · {rosterPlayer?.customRoleLabel || player.role || ""}
        {player.locked ? " · FIX" : ""}
      </div>
    </>
  );
}

export default function FussballTaktikboardApp() {
  const [currentView, setCurrentView] = useState("start");
  const [players, setPlayers] = useState([]);
  const [roster, setRoster] = useState(initialRoster);
  const [trainingBlocks, setTrainingBlocks] = useState(initialTrainingBlocks);
  const [ball, setBall] = useState(initialBall);
  const [selectedId, setSelectedId] = useState(null);
  const [newPlayerName, setNewPlayerName] = useState("Neue Spielerin");
  const [newPlayerNumber, setNewPlayerNumber] = useState("16");
  const [newTrainingTitle, setNewTrainingTitle] = useState("Neue Übung");
  const [newTrainingMinutes, setNewTrainingMinutes] = useState("10");
  const [newTrainingFocus, setNewTrainingFocus] = useState("Coachingpunkt");
  const [boardTitle, setBoardTitle] = useState("Taktikboard Lady Hawks");
  const [matchInfo, setMatchInfo] = useState("Training / Spielbesprechung");
  const [clubLogo, setClubLogo] = useState("/ladyhawks-logo.png");
  const [selectedFormation, setSelectedFormation] = useState("4-3-3");
  const [mode, setMode] = useState("move");
  const [savedSetups, setSavedSetups] = useState([]);
  const [cloudBoards, setCloudBoards] = useState([]);
  const [arrows, setArrows] = useState([]);
  const [arrowStart, setArrowStart] = useState(null);
  const [selectedArrowId, setSelectedArrowId] = useState(null);
  const [shareLink, setShareLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [notes, setNotes] = useState("Schwerpunkte, Abläufe oder Coachingpunkte hier notieren...");
  const [loginName, setLoginName] = useState("");
  const [cloudEmail, setCloudEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  const benchPlayers = useMemo(() => {
    return roster.filter((r) => !players.some((p) => p.rosterId === r.id)).slice(0, 5);
  }, [roster, players]);

  const notNominatedPlayers = useMemo(() => {
    return roster.filter((r) => !players.some((p) => p.rosterId === r.id)).slice(5);
  }, [roster, players]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("taktikboard_saved_setups_v6");
      if (raw) setSavedSetups(JSON.parse(raw));
      const cloudRaw = localStorage.getItem("taktikboard_cloud_boards_v1");
      if (cloudRaw) setCloudBoards(JSON.parse(cloudRaw));
      const userRaw = localStorage.getItem("taktikboard_login_v1");
      if (userRaw) {
        const user = JSON.parse(userRaw);
        setLoginName(user.name || "");
        setCloudEmail(user.email || "");
        setIsLoggedIn(!!user.name);
      }
    } catch {}

    const hash = window.location.hash.replace("#shared=", "");
    if (hash) {
      const shared = decodeBoardState(hash);
      if (shared) {
        setPlayers(shared.players || []);
        setRoster(shared.roster || initialRoster);
        setTrainingBlocks(shared.trainingBlocks || initialTrainingBlocks);
        setBall(shared.ball || initialBall);
        setArrows(shared.arrows || []);
        setSelectedFormation(shared.formation || "4-3-3");
        setBoardTitle(shared.boardTitle || "Taktikboard Lady Hawks");
        setMatchInfo(shared.matchInfo || "Training / Spielbesprechung");
        setClubLogo(shared.clubLogo || "/ladyhawks-logo.png");
        setNotes(shared.notes || "");
        setCurrentView("board");
      }
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("taktikboard_saved_setups_v6", JSON.stringify(savedSetups));
      localStorage.setItem("taktikboard_cloud_boards_v1", JSON.stringify(cloudBoards));
    } catch {}
  }, [savedSetups, cloudBoards]);

  const applyFormation = (formationKey) => {
    const formation = formations[formationKey] || formations["4-3-3"];
    setPlayers((prev) =>
      prev.map((p, index) => {
        const slot = formation[index];
        return slot ? { ...p, x: slot.x, y: slot.y, role: slot.role } : p;
      })
    );
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
        customRoleLabel: "BANK",
        color: "bg-blue-700",
        photo: "",
      },
    ]);
    setNewPlayerName("Neue Spielerin");
    setNewPlayerNumber(String(Number(newPlayerNumber || 16) + 1));
  };

  const addRosterPlayerToBoard = (rosterPlayer, dropPos = null) => {
    if (players.some((p) => p.rosterId === rosterPlayer.id)) return;
    const formation = formations[selectedFormation] || formations["4-3-3"];
    const slot = dropPos || formation[players.length] || { x: 50, y: 50, role: rosterPlayer.role };
    const id = `p${Date.now()}${Math.floor(Math.random() * 1000)}`;
    setPlayers((prev) => [
      ...prev,
      {
        id,
        rosterId: rosterPlayer.id,
        x: slot.x,
        y: slot.y,
        number: rosterPlayer.number,
        role: slot.role || rosterPlayer.role,
        color: rosterPlayer.color,
        locked: false,
      },
    ]);
    setSelectedId(id);
  };

  const handleRosterDragStart = (rosterPlayer) => (e) => {
    e.dataTransfer.setData("application/json", JSON.stringify(rosterPlayer));
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleBoardDrop = (e) => {
    e.preventDefault();
    const raw = e.dataTransfer.getData("application/json");
    if (!raw || !boardRef.current) return;
    try {
      const rosterPlayer = JSON.parse(raw);
      const rect = boardRef.current.getBoundingClientRect();
      const x = clamp(((e.clientX - rect.left) / rect.width) * 100, 3, 97);
      const y = clamp(((e.clientY - rect.top) / rect.height) * 100, 3, 97);
      addRosterPlayerToBoard(rosterPlayer, { x, y, role: rosterPlayer.role });
    } catch {}
  };

  const startDrag = (type, id) => (e) => {
    if (mode !== "move") return;
    if (type === "player") {
      const player = players.find((p) => p.id === id);
      if (player?.locked) return;
    }
    e.preventDefault();
    dragRef.current = { type, id };
    setSelectedId(id);
  };

  const onPointerMove = (e) => {
    if (!dragRef.current || !boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const x = clamp(((e.clientX - rect.left) / rect.width) * 100, 3, 97);
    const y = clamp(((e.clientY - rect.top) / rect.height) * 100, 3, 97);

    if (dragRef.current.type === "ball") {
      setBall({ id: "ball", x, y });
    } else {
      setPlayers((prev) => prev.map((p) => (p.id === dragRef.current.id ? { ...p, x, y } : p)));
    }
  };

  const stopDrag = () => {
    dragRef.current = null;
  };

  const handleBoardClick = (e) => {
    if (mode !== "draw" || !boardRef.current || dragRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const x = clamp(((e.clientX - rect.left) / rect.width) * 100, 0, 100);
    const y = clamp(((e.clientY - rect.top) / rect.height) * 100, 0, 100);
    if (!arrowStart) {
      setArrowStart({ x, y });
      return;
    }
    setArrows((prev) => [...prev, { id: `a${Date.now()}`, from: arrowStart, to: { x, y } }]);
    setArrowStart(null);
  };

  const clearArrows = () => {
    setArrows([]);
    setArrowStart(null);
    setSelectedArrowId(null);
  };

  const removeSelected = () => {
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
    setPlayers((prev) => prev.map((p) => (p.rosterId === selected.rosterId ? { ...p, number: cleaned } : p)));
  };

  const updateSelectedRole = (value) => {
    if (!selected?.rosterId) return;
    const role = value.toUpperCase().slice(0, 5);
    setPlayers((prev) => prev.map((p) => (p.id === selectedId ? { ...p, role } : p)));
    setRoster((prev) => prev.map((r) => (r.id === selected.rosterId ? { ...r, role } : r)));
  };

  const updateSelectedRoleLabel = (value) => {
    if (!selected?.rosterId) return;
    setRoster((prev) => prev.map((r) => (r.id === selected.rosterId ? { ...r, customRoleLabel: value } : r)));
  };

  const toggleSelectedLock = () => {
    if (!selectedId || selectedId === "ball") return;
    setPlayers((prev) => prev.map((p) => (p.id === selectedId ? { ...p, locked: !p.locked } : p)));
  };

  const addTrainingBlock = () => {
    setTrainingBlocks((prev) => [
      ...prev,
      { id: `t${Date.now()}`, title: newTrainingTitle, minutes: newTrainingMinutes, focus: newTrainingFocus },
    ]);
    setNewTrainingTitle("Neue Übung");
    setNewTrainingMinutes("10");
    setNewTrainingFocus("Coachingpunkt");
  };

  const removeTrainingBlock = (id) => {
    setTrainingBlocks((prev) => prev.filter((t) => t.id !== id));
  };

  const saveSetup = () => {
    const item = {
      id: `s${Date.now()}`,
      ...buildBoardPayload({ players, arrows, ball, formation: selectedFormation, roster, boardTitle, matchInfo, clubLogo, notes, trainingBlocks }),
    };
    setSavedSetups((prev) => [item, ...prev]);
  };

  const saveCloudBoard = () => {
    if (!isLoggedIn) return;
    const item = {
      id: `c${Date.now()}`,
      owner: loginName,
      ...buildBoardPayload({ players, arrows, ball, formation: selectedFormation, roster, boardTitle, matchInfo, clubLogo, notes, trainingBlocks }),
    };
    setCloudBoards((prev) => [item, ...prev]);
  };

  const loadSetup = (id) => {
    const item = [...savedSetups, ...cloudBoards].find((x) => x.id === id);
    if (!item) return;
    setPlayers(item.players || []);
    setRoster(item.roster || initialRoster);
    setTrainingBlocks(item.trainingBlocks || initialTrainingBlocks);
    setBall(item.ball || initialBall);
    setArrows(item.arrows || []);
    setSelectedFormation(item.formation || "4-3-3");
    setBoardTitle(item.boardTitle || "Taktikboard Lady Hawks");
    setMatchInfo(item.matchInfo || "Training / Spielbesprechung");
    setClubLogo(item.clubLogo || "/ladyhawks-logo.png");
    setNotes(item.notes || "");
    setCurrentView("board");
  };

  const generateShareLink = async () => {
    const encoded = encodeBoardState(buildBoardPayload({ players, arrows, ball, formation: selectedFormation, roster, boardTitle, matchInfo, clubLogo, notes, trainingBlocks }));
    const url = `${window.location.origin}${window.location.pathname}#shared=${encoded}`;
    setShareLink(url);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const exportBoardFile = () => {
    const blob = new Blob([
      JSON.stringify(buildBoardPayload({ players, arrows, ball, formation: selectedFormation, roster, boardTitle, matchInfo, clubLogo, notes, trainingBlocks }), null, 2),
    ], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "taktikboard.json";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const importBoardFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const data = JSON.parse(text);
    setPlayers(data.players || []);
    setRoster(data.roster || initialRoster);
    setTrainingBlocks(data.trainingBlocks || initialTrainingBlocks);
    setBall(data.ball || initialBall);
    setArrows(data.arrows || []);
    setSelectedFormation(data.formation || "4-3-3");
    setBoardTitle(data.boardTitle || "Taktikboard Lady Hawks");
    setMatchInfo(data.matchInfo || "Training / Spielbesprechung");
    setClubLogo(data.clubLogo || "/ladyhawks-logo.png");
    setNotes(data.notes || "");
    e.target.value = "";
  };

  const exportImage = async () => {
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(boardRef.current, { backgroundColor: null, scale: 2 });
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "taktikboard.png";
    link.click();
  };

  const exportPDF = async () => {
    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");
    const target = boardRef.current?.closest(".print-area");
    if (!target) return;
    const canvas = await html2canvas(target, { backgroundColor: "#ffffff", scale: 2 });
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const w = pdf.internal.pageSize.getWidth();
    const h = pdf.internal.pageSize.getHeight();
    const ratio = Math.min(w / canvas.width, h / canvas.height);
    const imgW = canvas.width * ratio;
    const imgH = canvas.height * ratio;
    pdf.addImage(img, "PNG", (w - imgW) / 2, 8, imgW, imgH);
    pdf.save("taktikboard.pdf");
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => typeof reader.result === "string" && setClubLogo(reader.result);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handlePlayerPhotoUpload = (playerId) => (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setRoster((prev) => prev.map((r) => (r.id === playerId ? { ...r, photo: reader.result } : r)));
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleLogin = () => {
    if (!loginName.trim()) return;
    const email = cloudEmail || `${loginName.toLowerCase().replace(/\s+/g, ".")}@team.local`;
    setCloudEmail(email);
    setIsLoggedIn(true);
    localStorage.setItem("taktikboard_login_v1", JSON.stringify({ name: loginName, email }));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("taktikboard_login_v1");
  };

  const openBoard = () => {
    setBoardTitle("Taktikboard Lady Hawks");
    setMatchInfo("Training / Spielbesprechung");
    setCurrentView("board");
  };

  return (
    <div className="min-h-screen p-6 bg-[linear-gradient(135deg,#dbeafe_0%,#ffffff_45%,#bfdbfe_100%)] print:bg-white print:p-2">
      {currentView === "start" ? (
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="rounded-[32px] bg-white/85 shadow-xl border border-blue-100 p-8 md:p-10">
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div className="flex items-center gap-5">
                {clubLogo ? <img src={clubLogo} alt="Lady Hawks Logo" className="h-24 w-24 object-contain rounded-2xl border border-blue-100 bg-white p-2 shadow-sm" /> : null}
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Web-App für den PC</div>
                  <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2">Taktikboard Lady Hawks</h1>
                  <p className="text-slate-600 mt-3 max-w-2xl">Mit rechter Spielerinnen-Liste, extra Bank, nicht nominiert und freiem Positionsnamen.</p>
                </div>
              </div>
              <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-slate-600 min-w-[280px]">
                <div className="font-semibold text-slate-900 mb-2">Login & Cloud</div>
                {!isLoggedIn ? (
                  <div className="space-y-2">
                    <Input value={loginName} onChange={(e) => setLoginName(e.target.value)} placeholder="Trainername" />
                    <Input value={cloudEmail} onChange={(e) => setCloudEmail(e.target.value)} placeholder="E-Mail" />
                    <Button className="w-full rounded-xl bg-blue-700 hover:bg-blue-800" onClick={handleLogin}><LogIn className="w-4 h-4 mr-2" /> Login aktivieren</Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div>Angemeldet als <strong>{loginName}</strong></div>
                    <div className="text-xs text-slate-500">{cloudEmail}</div>
                    <Button variant="outline" className="w-full rounded-xl border-blue-200" onClick={handleLogout}><LogOut className="w-4 h-4 mr-2" /> Abmelden</Button>
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mt-10">
              <button onClick={openBoard} className="text-left rounded-3xl border border-blue-100 bg-white/80 hover:bg-white transition p-6 shadow-sm">
                <Monitor className="w-8 h-8 text-blue-700 mb-4" />
                <div className="text-2xl font-bold text-slate-900">Neues Taktikboard</div>
                <div className="text-sm text-slate-600 mt-2">Direkt mit Formation, Spielerinnen und Pfeilen starten.</div>
              </button>
              <button onClick={() => setCurrentView("roster")} className="text-left rounded-3xl border border-blue-100 bg-white/80 hover:bg-white transition p-6 shadow-sm">
                <Users className="w-8 h-8 text-blue-700 mb-4" />
                <div className="text-2xl font-bold text-slate-900">Spielerinnen-Kader</div>
                <div className="text-sm text-slate-600 mt-2">Kader verwalten und Fotos hochladen.</div>
              </button>
              <button onClick={() => setCurrentView("training")} className="text-left rounded-3xl border border-blue-100 bg-white/80 hover:bg-white transition p-6 shadow-sm">
                <CalendarDays className="w-8 h-8 text-blue-700 mb-4" />
                <div className="text-2xl font-bold text-slate-900">Trainingsplanung</div>
                <div className="text-sm text-slate-600 mt-2">Übungen, Minuten und Schwerpunkte planen.</div>
              </button>
              <button onClick={() => setCurrentView("library")} className="text-left rounded-3xl border border-blue-100 bg-white/80 hover:bg-white transition p-6 shadow-sm">
                <FolderOpen className="w-8 h-8 text-blue-700 mb-4" />
                <div className="text-2xl font-bold text-slate-900">Gespeicherte Taktiken</div>
                <div className="text-sm text-slate-600 mt-2">Lokale und Cloud-Boards öffnen.</div>
              </button>
            </div>
          </div>
        </div>
      ) : currentView === "training" ? (
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="text-3xl font-bold text-slate-900">Trainingsplanung Lady Hawks</div>
              <div className="text-slate-600 mt-1">Einheiten, Dauer und Coachingpunkte verwalten.</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-xl border-blue-200" onClick={() => setCurrentView("start")}><ArrowLeft className="w-4 h-4 mr-2" /> Menü</Button>
              <Button className="rounded-xl bg-blue-700 hover:bg-blue-800" onClick={openBoard}>Zum Board</Button>
            </div>
          </div>

          <Card className="rounded-3xl border-blue-100">
            <CardContent className="p-6 grid lg:grid-cols-[320px_1fr] gap-6">
              <div className="space-y-3">
                <div className="text-lg font-bold text-slate-900">Neue Einheit / Übung</div>
                <Input value={newTrainingTitle} onChange={(e) => setNewTrainingTitle(e.target.value)} placeholder="Titel" />
                <Input value={newTrainingMinutes} onChange={(e) => setNewTrainingMinutes(e.target.value.replace(/[^0-9]/g, "").slice(0, 3))} placeholder="Minuten" />
                <Textarea value={newTrainingFocus} onChange={(e) => setNewTrainingFocus(e.target.value)} className="min-h-[100px]" placeholder="Schwerpunkt" />
                <Button className="w-full rounded-xl bg-blue-700 hover:bg-blue-800" onClick={addTrainingBlock}><Plus className="w-4 h-4 mr-2" /> Trainingsblock hinzufügen</Button>
              </div>
              <div className="space-y-4">
                {trainingBlocks.map((block) => (
                  <Card key={block.id} className="rounded-2xl border-blue-100 shadow-sm">
                    <CardContent className="p-4 flex items-start justify-between gap-4">
                      <div>
                        <div className="font-bold text-slate-900">{block.title}</div>
                        <div className="text-sm text-slate-500">{block.minutes} Minuten</div>
                        <div className="text-sm text-slate-600 mt-2">{block.focus}</div>
                      </div>
                      <Button variant="destructive" className="rounded-xl" onClick={() => removeTrainingBlock(block.id)}><Trash2 className="w-4 h-4" /></Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : currentView === "roster" ? (
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="text-3xl font-bold text-slate-900">Spielerinnen-Kader</div>
              <div className="text-slate-600 mt-1">Spielerinnen bearbeiten und Fotos hochladen.</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-xl border-blue-200" onClick={() => setCurrentView("start")}><ArrowLeft className="w-4 h-4 mr-2" /> Menü</Button>
              <Button className="rounded-xl bg-blue-700 hover:bg-blue-800" onClick={openBoard}>Zum Board</Button>
            </div>
          </div>

          <Card className="rounded-3xl border-blue-100">
            <CardContent className="p-6 grid lg:grid-cols-[320px_1fr] gap-6">
              <div className="space-y-3">
                <div className="text-lg font-bold text-slate-900">Neue Spielerin anlegen</div>
                <Input value={newPlayerName} onChange={(e) => setNewPlayerName(e.target.value)} placeholder="Name" />
                <Input value={newPlayerNumber} onChange={(e) => setNewPlayerNumber(e.target.value.replace(/[^0-9]/g, "").slice(0, 2))} placeholder="Nummer" />
                <Button className="w-full rounded-xl bg-blue-700 hover:bg-blue-800" onClick={addRosterPlayer}><UserPlus className="w-4 h-4 mr-2" /> Zum Kader hinzufügen</Button>
              </div>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {roster.map((player) => (
                  <Card key={player.id} className="rounded-2xl border-blue-100 shadow-sm">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className={`w-10 h-10 rounded-full ${player.color} border-2 border-white shadow flex items-center justify-center text-sm font-bold`}>
                          {player.number}
                        </div>
                        {player.photo ? (
                          <img src={player.photo} alt={player.name} className="w-10 h-10 rounded-full object-cover border border-blue-100" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-slate-100 border border-blue-100 flex items-center justify-center text-[10px] text-slate-500">Foto</div>
                        )}
                      </div>
                      <Input value={player.name} onChange={(e) => setRoster((prev) => prev.map((r) => (r.id === player.id ? { ...r, name: e.target.value } : r)))} placeholder="Name" />
                      <Input value={player.number} onChange={(e) => setRoster((prev) => prev.map((r) => (r.id === player.id ? { ...r, number: e.target.value.replace(/[^0-9]/g, "").slice(0, 2) } : r)))} placeholder="Nummer" />
                      <Input value={player.customRoleLabel} onChange={(e) => setRoster((prev) => prev.map((r) => (r.id === player.id ? { ...r, customRoleLabel: e.target.value } : r)))} placeholder="Positionsname" />
                      <div className="text-xs text-slate-600">
                        <div>Spielerfoto</div>
                        <Input type="file" accept="image/*" onChange={handlePlayerPhotoUpload(player.id)} className="mt-1" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : currentView === "library" ? (
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="text-3xl font-bold text-slate-900">Gespeicherte Taktiken</div>
              <div className="text-slate-600 mt-1">Öffne lokale oder Cloud-Boards.</div>
            </div>
            <Button variant="outline" className="rounded-xl border-blue-200" onClick={() => setCurrentView("start")}><ArrowLeft className="w-4 h-4 mr-2" /> Menü</Button>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[...savedSetups, ...cloudBoards].length === 0 ? (
              <Card className="rounded-3xl shadow-sm border-dashed col-span-full border-blue-200"><CardContent className="p-8 text-center text-slate-500">Noch keine Taktik gespeichert.</CardContent></Card>
            ) : (
              [...savedSetups, ...cloudBoards].map((setup) => (
                <Card key={setup.id} className="rounded-3xl shadow-sm border-blue-100">
                  <CardContent className="p-6 space-y-4">
                    <div className="text-xl font-bold text-slate-900">{setup.boardTitle || "Taktikboard Lady Hawks"}</div>
                    <div className="text-sm text-slate-600">{setup.matchInfo || "Besprechung"}</div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{setup.formation}</Badge>
                      {setup.owner ? <Badge variant="outline">Cloud: {setup.owner}</Badge> : null}
                    </div>
                    <Button className="w-full rounded-xl bg-blue-700 hover:bg-blue-800" onClick={() => loadSetup(setup.id)}>Öffnen</Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-[1600px] mx-auto grid xl:grid-cols-[320px_minmax(0,1fr)_300px] gap-6">
          <Card className="rounded-2xl shadow-xl border border-blue-100 bg-white/90 print:hidden">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-2xl text-blue-800">Taktikboard Lady Hawks</CardTitle>
                  <p className="text-sm text-slate-600">Ohne Gegnerteam, mit rechter Liste und extra Bank.</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="rounded-xl border-blue-200" onClick={() => setCurrentView("start")}><Home className="w-4 h-4" /></Button>
                  <Button variant="outline" size="icon" className="rounded-xl border-blue-200" onClick={() => setCurrentView("roster")}><Users className="w-4 h-4" /></Button>
                  <Button variant="outline" size="icon" className="rounded-xl border-blue-200" onClick={() => setCurrentView("training")}><CalendarDays className="w-4 h-4" /></Button>
                  <Button variant="outline" size="icon" className="rounded-xl border-blue-200" onClick={() => setCurrentView("library")}><FolderOpen className="w-4 h-4" /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-2 gap-2">
                <Button variant={mode === "move" ? "default" : "outline"} className={`rounded-xl ${mode === "move" ? "bg-blue-700 hover:bg-blue-800" : "border-blue-200"}`} onClick={() => { setMode("move"); setArrowStart(null); }}><MousePointer2 className="w-4 h-4 mr-2" /> Bewegen</Button>
                <Button variant={mode === "draw" ? "default" : "outline"} className={`rounded-xl ${mode === "draw" ? "bg-blue-700 hover:bg-blue-800" : "border-blue-200"}`} onClick={() => { setMode("draw"); setArrowStart(null); }}><MoveRight className="w-4 h-4 mr-2" /> Pfeile</Button>
                <Button className="rounded-xl bg-blue-700 hover:bg-blue-800" onClick={() => { setPlayers([]); setBall(initialBall); setArrows([]); setArrowStart(null); }}> <RotateCcw className="w-4 h-4 mr-2" /> Reset</Button>
                <Button variant="secondary" className="rounded-xl" onClick={exportImage}><Download className="w-4 h-4 mr-2" /> Bild</Button>
                <Button variant="outline" className="rounded-xl border-blue-200" onClick={saveSetup}><Save className="w-4 h-4 mr-2" /> Lokal speichern</Button>
                <Button variant="outline" className="rounded-xl border-blue-200" onClick={saveCloudBoard} disabled={!isLoggedIn}><LogIn className="w-4 h-4 mr-2" /> Cloud speichern</Button>
                <Button variant="outline" className="rounded-xl border-blue-200" onClick={exportBoardFile}><Upload className="w-4 h-4 mr-2 rotate-180" /> Datei</Button>
                <Button variant="outline" className="rounded-xl border-blue-200" onClick={() => window.print()}><Printer className="w-4 h-4 mr-2" /> Drucken</Button>
                <Button variant="outline" className="rounded-xl border-blue-200 col-span-2" onClick={exportPDF}><FileText className="w-4 h-4 mr-2" /> PDF</Button>
              </div>

              <div className="border rounded-2xl p-4 bg-blue-50/70 border-blue-100 space-y-3">
                <div className="text-sm font-medium text-blue-800">Web teilen</div>
                <Button className="w-full rounded-xl bg-blue-700 hover:bg-blue-800" onClick={generateShareLink}><Share2 className="w-4 h-4 mr-2" /> Link erzeugen</Button>
                {shareLink ? (
                  <>
                    <Textarea value={shareLink} readOnly className="min-h-[90px] bg-white" />
                    <Button variant="outline" className="w-full rounded-xl border-blue-200" onClick={async () => { try { await navigator.clipboard.writeText(shareLink); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {} }}>
                      {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copied ? "Link kopiert" : "Link kopieren"}
                    </Button>
                  </>
                ) : null}
              </div>

              <div className="border rounded-2xl p-4 bg-blue-50/70 border-blue-100 space-y-3">
                <div className="text-sm font-medium text-blue-800">Teamlogo</div>
                <Input type="file" accept="image/*" onChange={handleLogoUpload} />
                <div className="text-sm font-medium text-blue-800">Datei laden</div>
                <Input type="file" accept="application/json" onChange={importBoardFile} />
              </div>

              <div className="border rounded-2xl p-4 bg-blue-50/70 border-blue-100 space-y-3">
                <Input value={boardTitle} onChange={(e) => setBoardTitle(e.target.value)} placeholder="Titel" />
                <Input value={matchInfo} onChange={(e) => setMatchInfo(e.target.value)} placeholder="Info" />
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(formations).map((formation) => (
                    <Button key={formation} type="button" variant={selectedFormation === formation ? "default" : "outline"} className={`rounded-xl ${selectedFormation === formation ? "bg-blue-700 hover:bg-blue-800" : "border-blue-200"}`} onClick={() => applyFormation(formation)}>
                      {formation}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="border rounded-2xl p-4 bg-blue-50/70 border-blue-100 space-y-3">
                <div className="text-sm font-medium text-blue-800">Auswahl</div>
                {selectedId && selectedId !== "ball" ? (
                  <>
                    <Input value={selectedRosterPlayer?.name || ""} onChange={(e) => updateSelectedName(e.target.value)} placeholder="Name" />
                    <Input value={selected?.number || ""} onChange={(e) => updateSelectedNumber(e.target.value)} placeholder="Nummer" />
                    <Input value={selected?.role || ""} onChange={(e) => updateSelectedRole(e.target.value)} placeholder="Positionscode" />
                    <Input value={selectedRosterPlayer?.customRoleLabel || ""} onChange={(e) => updateSelectedRoleLabel(e.target.value)} placeholder="Manueller Positionsname" />
                    <Button variant="outline" className="w-full rounded-xl border-blue-200" onClick={toggleSelectedLock}><Lock className="w-4 h-4 mr-2" /> {selected?.locked ? "Position freigeben" : "Position fixieren"}</Button>
                    <Button variant="destructive" className="w-full rounded-xl" onClick={removeSelected}><Trash2 className="w-4 h-4 mr-2" /> Aus Aufstellung entfernen</Button>
                  </>
                ) : selectedId === "ball" ? (
                  <Button variant="destructive" className="w-full rounded-xl" onClick={removeSelected}><Trash2 className="w-4 h-4 mr-2" /> Ball zurücksetzen</Button>
                ) : (
                  <p className="text-sm text-slate-500">Klicke auf eine Spielerin oder den Ball.</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
            <CardContent className="p-2 print-area bg-white">
              <div className="flex items-center justify-between gap-4 mb-3 border border-blue-100 rounded-2xl p-4 bg-[linear-gradient(90deg,#eff6ff_0%,#ffffff_50%,#dbeafe_100%)]">
                <div>
                  <div className="text-2xl font-bold text-slate-900">{boardTitle}</div>
                  <div className="text-sm text-slate-600">{matchInfo}</div>
                  <div className="text-xs text-slate-500 mt-1">Formation: {selectedFormation}</div>
                </div>
                {clubLogo ? <img src={clubLogo} alt="Teamlogo" className="h-16 w-16 object-contain rounded-xl border bg-white p-1" /> : <div className="h-16 w-16 rounded-xl border bg-blue-50 flex items-center justify-center"><ImagePlus className="w-5 h-5 text-slate-400" /></div>}
              </div>

              <div
                ref={boardRef}
                onClick={handleBoardClick}
                onPointerMove={mode === "move" ? onPointerMove : undefined}
                onPointerUp={stopDrag}
                onPointerLeave={stopDrag}
                onDrop={handleBoardDrop}
                onDragOver={(e) => e.preventDefault()}
                style={{ pageBreakInside: "avoid", background: "linear-gradient(180deg, #1d4ed8 0%, #2563eb 12%, #1f9d55 12%, #178347 100%)" }}
                className="relative w-full aspect-[4/5] rounded-[28px] overflow-hidden select-none touch-none shadow-inner"
              >
                <div className="absolute right-4 top-4 z-10 rounded-xl bg-white/90 px-3 py-2 text-xs text-slate-600 shadow">Ziehe Spielerinnen von rechts hier hinein</div>
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(45deg, rgba(255,255,255,0.55) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0.55) 75%, transparent 75%, transparent)", backgroundSize: "40px 40px" }} />
                <div className="absolute inset-4 border-2 border-white/90 rounded-[24px]" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 border-2 border-white/90 rounded-full" />
                <div className="absolute left-4 right-4 top-1/2 border-t-2 border-white/90" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-4 w-44 h-16 border-2 border-white/90 border-b-0 rounded-t-2xl" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-4 w-20 h-7 border-2 border-white/90 border-b-0 rounded-t-xl" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-2 text-white/90 text-xs font-semibold tracking-widest">DEIN TEAM</div>

                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="white" />
                    </marker>
                  </defs>
                  {arrows.map((arrow) => (
                    <line key={arrow.id} x1={`${arrow.from.x}%`} y1={`${arrow.from.y}%`} x2={`${arrow.to.x}%`} y2={`${arrow.to.y}%`} stroke={selectedArrowId === arrow.id ? "#fde047" : "white"} strokeWidth="3" markerEnd="url(#arrowhead)" strokeLinecap="round" onClick={() => setSelectedArrowId(arrow.id)} className="pointer-events-auto cursor-pointer" />
                  ))}
                  {arrowStart ? <circle cx={`${arrowStart.x}%`} cy={`${arrowStart.y}%`} r="6" fill="white" /> : null}
                </svg>

                {players.map((player) => {
                  const rosterPlayer = roster.find((r) => r.id === player.rosterId);
                  return (
                    <PlayerCircle
                      key={player.id}
                      player={player}
                      rosterPlayer={rosterPlayer}
                      selected={selectedId === player.id}
                      onPointerDown={startDrag("player", player.id)}
                      onClick={() => setSelectedId(player.id)}
                    />
                  );
                })}

                <button
                  onPointerDown={startDrag("ball", "ball")}
                  onClick={() => setSelectedId("ball")}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border-2 ${selectedId === "ball" ? "border-yellow-300" : "border-slate-900/20"} shadow-lg`}
                  style={{ left: `${ball.x}%`, top: `${ball.y}%` }}
                />
              </div>

              <div className="mt-2 space-y-2 text-xs">
                <div>
                  <strong>Bank (max. 5):</strong>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {benchPlayers.map((player) => (
                      <span key={player.id} className="px-2 py-1 bg-blue-50 border rounded">
                        {player.number} {player.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <strong>Nicht nominiert:</strong>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {notNominatedPlayers.map((player) => (
                      <span key={player.id} className="px-2 py-1 bg-gray-100 border rounded">
                        {player.number} {player.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-xl border border-blue-100 bg-white/90 print:hidden">
            <CardHeader>
              <CardTitle className="text-xl text-blue-800">Spielerinnen rechts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[85vh] overflow-auto">
              {roster.map((player) => {
                const onBoard = players.some((p) => p.rosterId === player.id);
                return (
                  <div key={player.id} className="rounded-2xl border border-blue-100 p-3 bg-white shadow-sm space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className={`w-9 h-9 rounded-full ${player.color} border-2 border-white shadow flex items-center justify-center text-sm font-bold`}>
                        {player.number}
                      </div>
                      {player.photo ? (
                        <img src={player.photo} alt={player.name} className="w-10 h-10 rounded-full object-cover border border-blue-100" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-blue-100 flex items-center justify-center text-[10px] text-slate-500">Foto</div>
                      )}
                      {onBoard ? <Badge variant="secondary">Im Feld</Badge> : <Badge variant="outline">Bank</Badge>}
                    </div>
                    <div className="font-semibold text-slate-900">{player.name}</div>
                    <div className="text-sm text-slate-500">{player.customRoleLabel || player.role}</div>
                    <div className="text-xs text-slate-600">
                      <div>Spielerfoto</div>
                      <Input type="file" accept="image/*" onChange={handlePlayerPhotoUpload(player.id)} className="mt-1" />
                    </div>
                    <div className="flex gap-2">
                      <div
                        draggable={!onBoard}
                        onDragStart={handleRosterDragStart(player)}
                        className={`flex-1 rounded-xl border px-3 py-2 text-sm flex items-center justify-center gap-2 ${onBoard ? "opacity-50 cursor-not-allowed" : "cursor-grab border-blue-200 bg-blue-50"}`}
                      >
                        <Grip className="w-4 h-4" /> Ziehen
                      </div>
                      <Button className="flex-1 rounded-xl bg-blue-700 hover:bg-blue-800" onClick={() => addRosterPlayerToBoard(player)} disabled={onBoard}>
                        {onBoard ? "Im Feld" : "Einfügen"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
