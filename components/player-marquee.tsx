"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Trophy } from "lucide-react"

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
    // Duplicate the players list to create a seamless infinite scroll
    const doubledPlayers = [...players, ...players, ...players]

    return (
        <div className="relative w-full overflow-hidden py-10">
            {/* Gradient Fades for edges */}
            <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

            <motion.div
                className="flex gap-6 w-max px-4"
                animate={{
                    x: ["0%", "-33.3333%"]
                }}
                transition={{
                    duration: players.length * 4, // Faster, more dynamic scroll speed
                    ease: "linear",
                    repeat: Infinity,
                }}
                whileHover={{ animationPlayState: "paused" }}
            >
                {doubledPlayers.map((player, idx) => {
                    const style = CARD_STYLES[idx % CARD_STYLES.length]
                    const totalGames = player.wins + player.draws + player.losses
                    const winRate = totalGames > 0 ? Math.round((player.wins / totalGames) * 100) : 0
                    const winRateDisplay = totalGames > 0 ? `${winRate}%` : "Unrated"

                    return (
                        <Link
                            key={`${player.id}-${idx}`}
                            href={`/members/${player.id}`}
                            className="block w-64 md:w-80 shrink-0"
                        >
                            <div className="group relative bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] hover:-translate-y-2">
                                {/* Image Container */}
                                <div className="relative h-64 md:h-80 overflow-hidden">
                                    <Image
                                        src={player.image || "/images/player1.png"}
                                        alt={player.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/20 to-transparent" />

                                    {/* Stats Badge */}
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <div className={`px-2.5 py-1 rounded-full bg-gradient-to-r ${style} text-[9px] font-black text-white shadow-lg uppercase tracking-widest border border-white/20 backdrop-blur-md`}>
                                            {player.title && player.title !== "None" ? player.title : "NR"}
                                        </div>
                                    </div>

                                    {/* Elo Score */}
                                    <div className="absolute top-4 right-4">
                                        <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl flex flex-col items-center shadow-2xl">
                                            <span className="text-[8px] font-black uppercase tracking-tighter text-blue-400">ELO</span>
                                            <span className="text-sm font-black text-white leading-none">{player.rating > 0 ? player.rating : "—"}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 relative">
                                    <h3 className="text-xl md:text-2xl font-black mb-1 text-white group-hover:text-blue-400 transition-colors line-clamp-1 uppercase tracking-tighter">
                                        {player.name}
                                    </h3>
                                    <p className="text-[10px] text-blue-400/60 font-black mb-6 uppercase tracking-[0.2em] truncate">
                                        {player.club}
                                    </p>

                                    <div className="space-y-3">
                                        <div className="flex justify-between text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none">
                                            <span>Combat Win Rate</span>
                                            <span className="text-white">{winRateDisplay}</span>
                                        </div>
                                        <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden p-[1px] border border-white/5">
                                            <motion.div
                                                className={`h-full bg-gradient-to-r ${style} rounded-full`}
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${winRate}%` }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                            />
                                        </div>
                                    </div>

                                    {/* Trophy Icon Decoration */}
                                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                                        <Trophy className="w-5 h-5 text-blue-400/40" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </motion.div>
        </div>
    )
}
