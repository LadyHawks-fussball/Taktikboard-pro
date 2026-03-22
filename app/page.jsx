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
  LogIn,
  LogOut,
  CalendarDays,
  Grip,
  Plus,
} from "lucide-react";

const initialAway = [];

const initialRoster = [
  { id: "r1", name: "Spielerin 1", number: "1", role: "TW", color: "bg-blue-700", customRoleLabel: "TW", photo: "" },
  { id: "r2", name: "Spielerin 2", number: "2", role: "LV", color: "bg-blue-700", customRoleLabel: "LV", photo: "" },
  { id: "r3", name: "Spielerin 3", number: "3", role: "IV", color: "bg-blue-700", customRoleLabel: "IV", photo: "" },
  { id: "r4", name: "Spielerin 4", number: "4", role: "IV", color: "bg-blue-700", customRoleLabel: "IV", photo: "" },
  { id: "r5", name: "Spielerin 5", number: "5", role: "RV", color: "bg-blue-700", customRoleLabel: "RV", photo: "" },
  { id: "r6", name: "Spielerin 6", number: "6", role: "ZM", color: "bg-blue-700", customRoleLabel: "ZM", photo: "" },
  { id: "r7", name: "Spielerin 7", number: "7", role: "6", color: "bg-blue-700", customRoleLabel: "6", photo: "" },
  { id: "r8", name: "Spielerin 8", number: "8", role: "ZM", color: "bg-blue-700", customRoleLabel: "ZM", photo: "" },
  { id: "r9", name: "Spielerin 9", number: "9", role: "LA", color: "bg-blue-700", customRoleLabel: "LA", photo: "" },
  { id: "r10", name: "Spielerin 10", number: "10", role: "ST", color: "bg-blue-700", customRoleLabel: "ST", photo: "" },
  { id: "r11", name: "Spielerin 11", number: "11", role: "RA", color: "bg-blue-700", customRoleLabel: "RA", photo: "" },
  { id: "r12", name: "Spielerin 12", number: "12", role: "BANK", color: "bg-blue-700", customRoleLabel: "BANK", photo: "" },
  { id: "r13", name: "Spielerin 13", number: "13", role: "BANK", color: "bg-white text-blue-700", customRoleLabel: "BANK", photo: "" },
  { id: "r14", name: "Spielerin 14", number: "14", role: "BANK", color: "bg-blue-700", customRoleLabel: "BANK", photo: "" },
  { id: "r15", name: "Spielerin 15", number: "15", role: "BANK", color: "bg-white text-blue-700", customRoleLabel: "BANK", photo: "" },
];

const initialTrainingBlocks = [
  { id: "t1", title: "Aufwärmen", minutes: "15", focus: "Mobilisation + Passformen" },
  { id: "t2", title: "Spielform", minutes: "20", focus: "Pressing auslösen" },
  { id: "t3", title: "Abschlussspiel", minutes: "25", focus: "Umschalten nach Ballgewinn" },
];

const initialBall = { id: "ball", x: 50, y: 50, label: "", color: "bg-white" };

const formations = {
  "4-3-3": [
    { x: 50, y: 90, role: "TW" },
    { x: 18, y: 72, role: "LV" },
    { x: 38, y: 74, role: "IV" },
    { x: 62, y: 74, role: "IV" },
    { x: 82, y: 72, role: "RV" },
    { x: 28, y: 52, role: "ZM" },
    { x: 50, y: 56, role: "6" },
    { x: 72, y: 52, role: "ZM" },
    { x: 24, y: 28, role: "LA" },
    { x: 50, y: 22, role: "ST" },
    { x: 76, y: 28, role: "RA" },
  ],
  "4-4-2": [
    { x: 50, y: 90, role: "TW" },
    { x: 18, y: 72, role: "LV" },
    { x: 38, y: 74, role: "IV" },
    { x: 62, y: 74, role: "IV" },
    { x: 82, y: 72, role: "RV" },
    { x: 16, y: 48, role: "LM" },
    { x: 38, y: 52, role: "ZM" },
    { x: 62, y: 52, role: "ZM" },
    { x: 84, y: 48, role: "RM" },
    { x: 40, y: 24, role: "ST" },
    { x: 60, y: 24, role: "ST" },
  ],
  "3-5-2": [
    { x: 50, y: 90, role: "TW" },
    { x: 28, y: 74, role: "IV" },
    { x: 50, y: 76, role: "IV" },
    { x: 72, y: 74, role: "IV" },
    { x: 12, y: 48, role: "LAV" },
    { x: 32, y: 52, role: "ZM" },
    { x: 50, y: 56, role: "6" },
    { x: 68, y: 52, role: "ZM" },
    { x: 88, y: 48, role: "RAV" },
    { x: 40, y: 24, role: "ST" },
    { x: 60, y: 24, role: "ST" },
  ],
  "3-6-1": [
    { x: 50, y: 90, role: "TW" },
    { x: 28, y: 74, role: "IV" },
    { x: 50, y: 76, role: "IV" },
    { x: 72, y: 74, role: "IV" },
    { x: 12, y: 50, role: "LAV" },
    { x: 30, y: 54, role: "ZM" },
    { x: 44, y: 58, role: "6" },
    { x: 56, y: 58, role: "8" },
    { x: 70, y: 54, role: "ZM" },
    { x: 88, y: 50, role: "RAV" },
    { x: 50, y: 22, role: "ST" },
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
  const [selectedArrowId, setSelectedArrowId] = useState(null);
  const [savedSetups, setSavedSetups] = useState([]);
  const [arrows, setArrows] = useState([]);
  const [arrowStart, setArrowStart] = useState(null);
  const [shareLink, setShareLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [notes, setNotes] = useState("Schwerpunkte, Abläufe oder Coachingpunkte hier notieren...");
  const [loginName, setLoginName] = useState("");
  const [cloudEmail, setCloudEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cloudBoards, setCloudBoards] = useState([]);
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

  const startingPlayers = useMemo(() => players.filter((p) => p.team === "home"), [players]);
  const benchPlayers = useMemo(() => roster
  .filter((r) => !players.some((p) => p.rosterId === r.id && p.team === "home"))
  .slice(0,5), [roster, players]);

const notNominatedPlayers = useMemo(() => roster
  .filter((r) => !players.some((p) => p.rosterId === r.id && p.team === "home"))
  .slice(5), [roster, players]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("taktikboard_saved_setups_v5");
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
        applyExternalBoard(shared);
        setCurrentView("board");
      }
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("taktikboard_saved_setups_v5", JSON.stringify(savedSetups));
      localStorage.setItem("taktikboard_cloud_boards_v1", JSON.stringify(cloudBoards));
    } catch {}
  }, [savedSetups, cloudBoards]);

  const applyExternalBoard = (data) => {
    setPlayers(data.players || []);
    setRoster(data.roster || initialRoster);
    setTrainingBlocks(data.trainingBlocks || initialTrainingBlocks);
    setArrows(data.arrows || []);
    setBall(data.ball || initialBall);
    setSelectedFormation(data.formation || "4-3-3");
    setBoardTitle(data.boardTitle || "Taktikboard Lady Hawks");
    setMatchInfo(data.matchInfo || "Training / Spielbesprechung");
    setClubLogo(data.clubLogo || "/ladyhawks-logo.png");
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
    setPlayers([]);
    setTrainingBlocks(initialTrainingBlocks);
    setBall(initialBall);
    setSelectedId(null);
    setArrows([]);
    setArrowStart(null);
    setSelectedArrowId(null);
    setSelectedFormation("4-3-3");
    setBoardTitle("Taktikboard Lady Hawks");
    setMatchInfo("Training / Spielbesprechung");
    setNotes("Schwerpunkte, Abläufe oder Coachingpunkte hier notieren...");
  };

  const applyFormation = (formationKey) => {
    const formation = formations[formationKey] || formations["4-3-3"];
    setPlayers((prev) => {
      const homePlayers = prev.filter((p) => p.team === "home");
      const updatedHome = homePlayers.map((p, index) => {
        const slot = formation[index];
        return slot ? { ...p, x: slot.x, y: slot.y, role: slot.role } : p;
      });
      return [...updatedHome];
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
        customRoleLabel: "BANK",
        photo: "",
      },
    ]);
    setNewPlayerName("Neue Spielerin");
    setNewPlayerNumber(String(Number(newPlayerNumber || 16) + 1));
  };

  const addRosterPlayerToBoard = (rosterPlayer) => {
    const alreadyOnBoard = players.some((p) => p.rosterId === rosterPlayer.id && p.team === "home");
    if (alreadyOnBoard) return;

    const formation = formations[selectedFormation] || formations["4-3-3"];
    const homeCount = players.filter((p) => p.team === "home").length;
    const slot = formation[homeCount] || { x: 50, y: 50, role: rosterPlayer.role };
    const id = `c${Date.now()}${Math.floor(Math.random() * 1000)}`;

    setPlayers((prev) => [
      ...prev,
      {
        id,
        x: slot.x,
        y: slot.y,
        label: rosterPlayer.number,
        number: rosterPlayer.number,
        role: slot.role || rosterPlayer.role,
        color: rosterPlayer.color,
        locked: false,
        team: "home",
        rosterId: rosterPlayer.id,
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
    if (!raw) return;

    try {
      const rosterPlayer = JSON.parse(raw);
      const alreadyOnBoard = players.some((p) => p.rosterId === rosterPlayer.id && p.team === "home");
      if (alreadyOnBoard) return;

      const board = boardRef.current;
      if (!board) return;
      const rect = board.getBoundingClientRect();
      const x = clamp(((e.clientX - rect.left) / rect.width) * 100, 3, 97);
      const y = clamp(((e.clientY - rect.top) / rect.height) * 100, 3, 97);
      const id = `c${Date.now()}${Math.floor(Math.random() * 1000)}`;

      setPlayers((prev) => [
        ...prev,
        {
          id,
          x,
          y,
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
    } catch {}
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

  const updateSelectedRoleLabel = (value) => {
    if (!selected?.rosterId) return;
    const label = value.slice(0, 12);
    setRoster((prev) => prev.map((r) => (r.id === selected.rosterId ? { ...r, customRoleLabel: label } : r)));
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

  const addTrainingBlock = () => {
    setTrainingBlocks((prev) => [
      ...prev,
      {
        id: `t${Date.now()}`,
        title: newTrainingTitle,
        minutes: newTrainingMinutes,
        focus: newTrainingFocus,
      },
    ]);
    setNewTrainingTitle("Neue Übung");
    setNewTrainingMinutes("10");
    setNewTrainingFocus("Coachingpunkt");
  };

  const removeTrainingBlock = (id) => {
    setTrainingBlocks((prev) => prev.filter((block) => block.id !== id));
  };

  const exportBoardFile = () => {
    const data = buildBoardPayload({ players, arrows, ball, formation: selectedFormation, roster, boardTitle, matchInfo, clubLogo, notes, trainingBlocks });
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
    const setup = {
      id: Date.now().toString(),
      name,
      ...buildBoardPayload({ players, arrows, ball, formation: selectedFormation, roster, boardTitle, matchInfo, clubLogo, notes, trainingBlocks }),
    };
    setSavedSetups((prev) => [setup, ...prev]);
  };

  const saveCloudBoard = () => {
    if (!isLoggedIn) return;
    const cloudBoard = {
      id: Date.now().toString(),
      owner: loginName,
      email: cloudEmail,
      ...buildBoardPayload({ players, arrows, ball, formation: selectedFormation, roster, boardTitle, matchInfo, clubLogo, notes, trainingBlocks }),
    };
    setCloudBoards((prev) => [cloudBoard, ...prev]);
  };

  const loadSetup = (id) => {
    const setup = savedSetups.find((item) => item.id === id) || cloudBoards.find((item) => item.id === id);
    if (!setup) return;
    applyExternalBoard(setup);
    setCurrentView("board");
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

  const generateShareLink = async () => {
    const payload = buildBoardPayload({ players, arrows, ball, formation: selectedFormation, roster, boardTitle, matchInfo, clubLogo, notes, trainingBlocks });
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

  const openPresetView = (type) => {
    if (type === "training") {
      setBoardTitle("Trainingsplanung Lady Hawks");
      setMatchInfo("Trainingsplanung");
      setCurrentView("training");
      return;
    }
    if (type === "board") {
      setBoardTitle("Taktikboard Lady Hawks");
      setMatchInfo("Training / Spielbesprechung");
      setCurrentView("board");
      return;
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
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="rounded-[32px] bg-white/85 shadow-xl border border-blue-100 p-8 md:p-10 backdrop-blur">
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div className="flex items-center gap-5">
                {clubLogo ? (
                  <img src={clubLogo} alt="Lady Hawks Logo" className="h-24 w-24 object-contain rounded-2xl border border-blue-100 bg-white p-2 shadow-sm" />
                ) : null}
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Web-App für den PC</div>
                  <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2">Taktikboard Lady Hawks</h1>
                  <p className="text-slate-600 mt-3 max-w-2xl">Mit rechter Spielerinnen-Liste, extra Bank, freiem Positionsnamen und Trainingsplanung mit Übungen.</p>
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
              <StartCard icon={<Monitor className="w-8 h-8" />} title="Neues Taktikboard" text="Direkt mit Formation, Spielerinnen und Pfeilen starten." onClick={() => openPresetView("board")} />
              <StartCard icon={<Users className="w-8 h-8" />} title="Spielerinnen-Kader" text="Kader verwalten und per Drag & Drop in die Aufstellung ziehen." onClick={() => setCurrentView("roster")} />
              <StartCard icon={<CalendarDays className="w-8 h-8" />} title="Trainingsplanung" text="Übungen, Minuten und Schwerpunkte für Einheiten planen." onClick={() => openPresetView("training")} />
              <StartCard icon={<FolderOpen className="w-8 h-8" />} title="Gespeicherte Taktiken" text="Lokale und Cloud-Boards öffnen und weiter bearbeiten." onClick={() => setCurrentView("library")} />
            </div>
          </div>
        </div>
      ) : currentView === "library" ? (
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="text-3xl font-bold text-slate-900">Gespeicherte Taktiken</div>
              <div className="text-slate-600 mt-1">Öffne lokale oder Cloud-Boards.</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-xl border-blue-200" onClick={() => setCurrentView("start")}><ArrowLeft className="w-4 h-4 mr-2" /> Menü</Button>
              <Button className="rounded-xl bg-blue-700 hover:bg-blue-800" onClick={() => openPresetView("board")}>Neues Board</Button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[...savedSetups, ...cloudBoards].length === 0 ? (
              <Card className="rounded-3xl shadow-sm border-dashed col-span-full border-blue-200"><CardContent className="p-8 text-center text-slate-500">Noch keine Taktik gespeichert.</CardContent></Card>
            ) : (
              [...savedSetups, ...cloudBoards].map((setup) => (
                <Card key={setup.id} className="rounded-3xl shadow-sm border-blue-100">
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <div className="text-xl font-bold text-slate-900">{setup.boardTitle || "Taktikboard Lady Hawks"}</div>
                      <div className="text-sm text-slate-600">{setup.matchInfo || "Besprechung"}</div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{setup.formation}</Badge>
                      {setup.owner && <Badge variant="outline">Cloud: {setup.owner}</Badge>}
                    </div>
                    <Button className="w-full rounded-xl bg-blue-700 hover:bg-blue-800" onClick={() => loadSetup(setup.id)}>Öffnen</Button>
                  </CardContent>
                </Card>
              ))
            )}
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
              <Button className="rounded-xl bg-blue-700 hover:bg-blue-800" onClick={() => setCurrentView("board")}>Zum Board</Button>
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
              <div className="text-slate-600 mt-1">Spielerinnen im Kader bearbeiten und später aufs Spielfeld ziehen.</div>
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
              </div>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {roster.map((player) => (
                  <div key={player.id} className="rounded-2xl border border-blue-100 p-3 bg-white shadow-sm space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className={`w-9 h-9 rounded-full ${player.color} border-2 border-white shadow flex items-center justify-center text-sm font-bold`}>
                        {player.number}
                      </div>
                      {player.photo ? (
                        <img src={player.photo} alt={player.name} className="w-10 h-10 rounded-full object-cover border border-blue-100" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-blue-100 flex items-center justify-center text-[10px] text-slate-500">
                          Foto
                        </div>
                      )}
                      {players.some((p) => p.rosterId === player.id && p.team === "home") ? <Badge variant="secondary">Im Feld</Badge> : <Badge variant="outline">Bank</Badge>}
                    </div>
                    <div className="font-semibold text-slate-900">{player.name}</div>
                    <div className="text-sm text-slate-500">{player.customRoleLabel || player.role}</div>
                    <div className="text-xs text-slate-600">
  <div>Spielerfoto</div>
  <Input
    type="file"
    accept="image/*"
    onChange={handlePlayerPhotoUpload(player.id)}
    className="mt-1"
  />
</div>
                      {onBoard ? <Badge variant="secondary">Im Feld</Badge> : <Badge variant="outline">Bank</Badge>}
                    </div>
                    <div className="font-semibold text-slate-900">{player.name}</div>
                    <div className="text-sm text-slate-500">{player.customRoleLabel || player.role}</div>
                    <div className="flex gap-2">
                      <div draggable={!onBoard} onDragStart={handleRosterDragStart(player)} className={`flex-1 rounded-xl border px-3 py-2 text-sm flex items-center justify-center gap-2 ${onBoard ? "opacity-50 cursor-not-allowed" : "cursor-grab border-blue-200 bg-blue-50"}`}>
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
