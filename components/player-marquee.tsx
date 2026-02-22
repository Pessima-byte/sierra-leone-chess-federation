"use client"
// Trigger re-compile: 2026-02-21T21:49

import Image from "next/image"
import Link from "next/link"

interface Player {
    id: string
    name: string
    title: string
    rating: number
    club: string
    image: string
    wins: number
    draws: number
    losses: number
}

const CARD_STYLES = [
    "from-blue-600 to-indigo-600",
    "from-purple-600 to-pink-600",
    "from-emerald-600 to-green-600",
    "from-orange-500 to-red-600",
    "from-cyan-500 to-blue-600",
]

export default function PlayerMarquee({ players }: { players: Player[] }) {
    // Duplicate the players list to create a seamless infinite scroll (2x is enough)
    const doubledPlayers = [...players, ...players]
    // Calculate duration based on player count for consistent speed
    const duration = Math.max(players.length * 5, 30)

    return (
        <div className="relative w-full overflow-hidden py-6 md:py-10">
            {/* Gradient Fades for edges */}
            <div className="absolute inset-y-0 left-0 w-20 md:w-64 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 md:w-64 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

            {/* 
              Pure CSS marquee instead of framer-motion.
              CSS animations run on the compositor thread, completely 
              independent of main-thread scroll handling. This eliminates
              the biggest source of scroll jank.
            */}
            <div
                className="flex gap-4 md:gap-6 w-max px-4 animate-marquee"
                style={{
                    animationDuration: `${duration}s`,
                    transform: 'translateZ(0)', // Force GPU layer
                }}
            >
                {doubledPlayers.map((player, idx) => {
                    const style = CARD_STYLES[idx % CARD_STYLES.length]
                    const totalGames = player.wins + player.draws + player.losses
                    const winRate = totalGames > 0 ? Math.round((player.wins / totalGames) * 100) : 0
                    const winRateDisplay = totalGames > 0 ? `${winRate}%` : "NR"

                    return (
                        <Link
                            key={`${player.id}-${idx}`}
                            href={`/members/${player.id}`}
                            className="block w-48 md:w-80 shrink-0"
                        >
                            <div
                                className="group relative bg-slate-900/60 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 transform-gpu"
                            >
                                {/* Image Container */}
                                <div className="relative h-48 md:h-80 overflow-hidden bg-slate-800">
                                    <Image
                                        src={player.image || "/images/player1.png"}
                                        alt={player.name}
                                        fill
                                        sizes="(max-width: 768px) 192px, 320px"
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/10 to-transparent" />

                                    {/* Stats Badges */}
                                    <div className="absolute top-3 left-3 md:top-4 md:left-4">
                                        <div className={`px-2 py-0.5 rounded-full bg-gradient-to-r ${style} text-[8px] md:text-[9px] font-black text-white uppercase tracking-widest`}>
                                            {player.title && player.title !== "None" ? player.title : "NR"}
                                        </div>
                                    </div>

                                    {/* Elo Score — removed backdrop-blur-sm for mobile perf */}
                                    <div className="absolute top-3 right-3 md:top-4 md:right-4">
                                        <div className="px-2 py-1 bg-black/60 border border-white/10 rounded-lg flex flex-col items-center">
                                            <span className="text-[7px] font-black uppercase text-blue-400">ELO</span>
                                            <span className="text-xs font-black text-white">{player.rating > 0 ? player.rating : "—"}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-3 md:p-6 relative">
                                    <h3 className="text-base md:text-2xl font-black mb-0.5 text-white line-clamp-1 uppercase tracking-tighter">
                                        {player.name}
                                    </h3>
                                    <p className="text-[8px] md:text-[9px] text-blue-400/60 font-black mb-3 md:mb-4 uppercase tracking-widest truncate">
                                        {player.club}
                                    </p>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[8px] font-black text-muted-foreground uppercase tracking-widest leading-none">
                                            <span>Combat Rating</span>
                                            <span className="text-white">{winRateDisplay}</span>
                                        </div>
                                        <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
                                            <div
                                                className={`h-full bg-gradient-to-r ${style} rounded-full`}
                                                style={{ width: `${winRate}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
