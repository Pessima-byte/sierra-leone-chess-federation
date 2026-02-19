"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"

// Chess piece SVGs (Standard Staunton Style)
// Geometric Abstract Chess Pieces (Minimalist Style)
const PIECES: Record<string, React.ReactNode> = {
  wP: (
    <svg viewBox="0 0 45 45" className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(255,255,255,0.3)]">
      <path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" fill="#fff" stroke="#000" strokeWidth="1.5" />
    </svg>
  ),
  wR: (
    <svg viewBox="0 0 45 45" className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(255,255,255,0.3)]">
      <path d="M9 39h27v-3H9v3zM12 36h21l-4-11V9H16v16l-4 11zM11 14V9h4v2h5V9h5v2h5V9h4v5h-23z" fill="#fff" stroke="#000" strokeWidth="1.5" />
    </svg>
  ),
  wN: (
    <svg viewBox="0 0 45 45" className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(255,255,255,0.3)]">
      <path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" fill="#fff" stroke="#000" strokeWidth="1.5" />
      <path d="M24 18c.3 1.2 2.2 2.5 2 4.5 0 1.5-1.5 2.1-3 2.1" fill="none" stroke="#000" strokeWidth="1.5" />
      <path d="M9.5 25.5A.5.5 0 1 1 9 25.5a.5.5 0 1 1 .5 0" fill="#000" />
      <path d="M15 15.5c4.5 2 10 2 10 2s3-3.5 3-7.5" fill="none" stroke="#000" strokeWidth="1.5" />
    </svg>
  ),
  wB: (
    <svg viewBox="0 0 45 45" className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(255,255,255,0.3)]">
      <path d="M9 36c3.39-.47 10.11-2.93 13.5-2.93s10.11 2.46 13.5 2.93c0-7.79-13.5-16.14-13.5-27a4.5 4.5 0 0 1 4.5 4.5" fill="#fff" stroke="#000" strokeWidth="1.5" />
      <path d="M22.5 33V9" fill="none" stroke="#000" strokeWidth="1.5" />
    </svg>
  ),
  wQ: (
    <svg viewBox="0 0 45 45" className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(255,255,255,0.3)]">
      <path d="M8 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM24.5 7.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM41 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM11.5 20a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM37.5 20a2 2 0 1 1-4 0 2 2 0 1 1 4 0z" fill="#fff" stroke="#000" strokeWidth="1.5" />
      <path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-13.5V25L7 14l2 12z" fill="#fff" stroke="#000" strokeWidth="1.5" />
      <path d="M9 26c0 2 1.5 2 2.5 4 2.5 1 1 1 1 1h19s-1.5 0 1-1c1-2 2.5-2 2.5-4 0-1.5 0-1.5 0-1.5H9s0 0 0 1.5z" fill="#fff" stroke="#000" strokeWidth="1.5" />
      <path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" fill="none" stroke="#000" strokeWidth="1.5" />
    </svg>
  ),
  wK: (
    <svg viewBox="0 0 45 45" className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(255,255,255,0.3)]">
      <path d="M22.5 11.63V6M20 8h5M22.5 25s4.5-7.5 4.5-12.5c0-2.5-2-4.5-4.5-4.5s-4.5 2-4.5 4.5c0 5 4.5 12.5 4.5 12.5z" fill="#fff" stroke="#000" strokeWidth="1.5" />
      <path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9 1.5 9 6c0 4.5-9 6-9 6H11.5s-9-1.5-9-6c0-4.5 9-6 9-6v7z" fill="#fff" stroke="#000" strokeWidth="1.5" />
      <path d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0" fill="none" stroke="#000" strokeWidth="1.5" />
    </svg>
  ),
  bP: (
    <svg viewBox="0 0 45 45" className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
      <path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" fill="#1e1e1e" stroke="#fff" strokeWidth="1" />
    </svg>
  ),
  bR: (
    <svg viewBox="0 0 45 45" className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
      <path d="M9 39h27v-3H9v3zM12 36h21l-4-11V9H16v16l-4 11zM11 14V9h4v2h5V9h5v2h5V9h4v5h-23z" fill="#1e1e1e" stroke="#fff" strokeWidth="1" />
    </svg>
  ),
  bN: (
    <svg viewBox="0 0 45 45" className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
      <path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" fill="#1e1e1e" stroke="#fff" strokeWidth="1" />
      <path d="M24 18c.3 1.2 2.2 2.5 2 4.5 0 1.5-1.5 2.1-3 2.1" fill="none" stroke="#fff" strokeWidth="1" />
      <path d="M9.5 25.5A.5.5 0 1 1 9 25.5a.5.5 0 1 1 .5 0" fill="#fff" />
      <path d="M15 15.5c4.5 2 10 2 10 2s3-3.5 3-7.5" fill="none" stroke="#fff" strokeWidth="1" />
    </svg>
  ),
  bB: (
    <svg viewBox="0 0 45 45" className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
      <path d="M9 36c3.39-.47 10.11-2.93 13.5-2.93s10.11 2.46 13.5 2.93c0-7.79-13.5-16.14-13.5-27a4.5 4.5 0 0 1 4.5 4.5" fill="#1e1e1e" stroke="#fff" strokeWidth="1" />
      <path d="M22.5 33V9" fill="none" stroke="#fff" strokeWidth="1" />
    </svg>
  ),
  bQ: (
    <svg viewBox="0 0 45 45" className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
      <path d="M8 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM24.5 7.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM41 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM11.5 20a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM37.5 20a2 2 0 1 1-4 0 2 2 0 1 1 4 0z" fill="#1e1e1e" stroke="#fff" strokeWidth="1" />
      <path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-13.5V25L7 14l2 12z" fill="#1e1e1e" stroke="#fff" strokeWidth="1" />
      <path d="M9 26c0 2 1.5 2 2.5 4 2.5 1 1 1 1 1h19s-1.5 0 1-1c1-2 2.5-2 2.5-4 0-1.5 0-1.5 0-1.5H9s0 0 0 1.5z" fill="#1e1e1e" stroke="#fff" strokeWidth="1" />
    </svg>
  ),
  bK: (
    <svg viewBox="0 0 45 45" className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
      <path d="M22.5 11.63V6M20 8h5M22.5 25s4.5-7.5 4.5-12.5c0-2.5-2-4.5-4.5-4.5s-4.5 2-4.5 4.5c0 5 4.5 12.5 4.5 12.5z" fill="#1e1e1e" stroke="#fff" strokeWidth="1" />
      <path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9 1.5 9 6c0 4.5-9 6-9 6H11.5s-9-1.5-9-6c0-4.5 9-6 9-6v7z" fill="#1e1e1e" stroke="#fff" strokeWidth="1" />
      <path d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0" fill="none" stroke="#fff" strokeWidth="1" />
    </svg>
  ),
}

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"]
const RANKS = ["8", "7", "6", "5", "4", "3", "2", "1"]

export default function ChessBoard() {
  const [position, setPosition] = useState<string[][]>([
    ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
    ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
    ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"],
  ])

  const [selectedPiece, setSelectedPiece] = useState<{ row: number; col: number } | null>(null)
  const [possibleMoves, setPossibleMoves] = useState<{ row: number; col: number }[]>([])

  // Basic move calculator (visualization only, not full engine)
  const getMoves = (r: number, c: number) => {
    const piece = position[r][c];
    if (!piece) return [];

    const moves: { row: number, col: number }[] = [];
    const color = piece[0];
    const type = piece[1];

    if (type === 'P') {
      const dir = color === 'w' ? -1 : 1;
      if (position[r + dir]?.[c] === "") moves.push({ row: r + dir, col: c });
      if ((color === 'w' && r === 6) || (color === 'b' && r === 1)) {
        if (position[r + dir * 2]?.[c] === "") moves.push({ row: r + dir * 2, col: c });
      }
    } else {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          if (r + i >= 0 && r + i < 8 && c + j >= 0 && c + j < 8) {
            moves.push({ row: r + i, col: c + j });
          }
        }
      }
    }
    return moves;
  }

  const handleSquareClick = (r: number, c: number) => {
    if (position[r][c] && (!selectedPiece || (selectedPiece && position[r][c][0] === position[selectedPiece.row][selectedPiece.col][0]))) {
      setSelectedPiece({ row: r, col: c });
      setPossibleMoves(getMoves(r, c));
      return;
    }

    if (selectedPiece) {
      const newPos = [...position.map(row => [...row])];
      newPos[r][c] = newPos[selectedPiece.row][selectedPiece.col];
      newPos[selectedPiece.row][selectedPiece.col] = "";
      setPosition(newPos);
      setSelectedPiece(null);
      setPossibleMoves([]);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 select-none">
      {/* Board Container */}
      <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.2)] border border-white/10 bg-slate-950 p-2">
        <div className="grid grid-cols-8 h-full w-full rounded-xl overflow-hidden border border-white/5">
          {position.map((row, r) =>
            row.map((piece, c) => {
              const isDark = (r + c) % 2 === 1
              const isSelected = selectedPiece?.row === r && selectedPiece?.col === c
              const isPossibleMove = possibleMoves.some((m) => m.row === r && m.col === c)

              return (
                <div
                  key={`${r}-${c}`}
                  onClick={() => handleSquareClick(r, c)}
                  className={`
                                 relative flex items-center justify-center cursor-pointer transition-all duration-300
                                 ${isDark ? "bg-slate-900" : "bg-slate-800"}
                                 ${isSelected ? "bg-blue-500/30 ring-inset ring-2 ring-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)]" : ""}
                                 ${!isSelected && !isPossibleMove ? "hover:bg-white/5" : ""}
                                 ${isPossibleMove ? 'after:content-[""] after:absolute after:w-3 after:h-3 after:bg-blue-400 after:rounded-full after:shadow-[0_0_10px_rgba(96,165,250,0.8)] after:animate-pulse' : ""}
                             `}
                >
                  {/* Rank Labels (Vertical) */}
                  {c === 0 && (
                    <span className={`absolute top-0.5 left-1 text-[7px] font-bold uppercase tracking-widest leading-none opacity-40 select-none ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      {RANKS[r]}
                    </span>
                  )}
                  {/* File Labels (Horizontal) */}
                  {r === 7 && (
                    <span className={`absolute bottom-0.5 right-1 text-[7px] font-bold uppercase tracking-widest leading-none opacity-40 select-none ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      {FILES[c]}
                    </span>
                  )}

                  {/* Chess Piece */}
                  {piece && (
                    <div className={`w-[85%] h-[85%] transition-all duration-500 transform ${isSelected ? "scale-110 -translate-y-1 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]" : "hover:scale-110 hover:-translate-y-0.5"}`}>
                      {PIECES[piece]}
                    </div>
                  )}
                </div>
              )
            }),
          )}
        </div>
      </div>

      {/* Floating Controls (Modern Gradient Style) */}
      <div className="flex items-center gap-1 bg-slate-900/40 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10 shadow-2xl">
        <Button variant="ghost" size="sm" className="h-9 px-4 rounded-xl hover:bg-white/10 text-xs font-bold text-white/80 hover:text-white transition-all gap-2" onClick={() => window.location.reload()}>
          <RotateCcw className="w-3.5 h-3.5 text-blue-400" />
          Reset
        </Button>
        <div className="w-px h-5 bg-white/10 mx-1"></div>
        <Button variant="ghost" size="sm" className="h-9 px-4 rounded-xl hover:bg-white/10 text-xs font-bold text-white/80 hover:text-white transition-all gap-2">
          <ChevronLeft className="w-3.5 h-3.5 text-blue-400" />
          Undo
        </Button>
      </div>
    </div>
  )
}
