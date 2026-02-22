"use client"

import { useState } from "react"
import Link from "next/link"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Game } from "@/lib/members-data"
import { History, Search, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { calendarEvents } from "@/lib/calendar-data"

interface PlayerGamesDialogProps {
    games: Game[]
    playerName: string
    variant?: "full" | "icon"
}

export default function PlayerGamesDialog({ games, playerName, variant = "full" }: PlayerGamesDialogProps) {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredGames = games.filter(game =>
        game.white.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.black.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.event.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <Dialog>
            <DialogTrigger asChild>
                {variant === "full" ? (
                    <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 font-bold group">
                        <History className="w-5 h-5 mr-2 text-blue-400 group-hover:scale-110 transition-transform" />
                        View Game Archives
                    </Button>
                ) : (
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white/10 group">
                        <History className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-4xl bg-slate-950 border-white/10 text-white p-0 overflow-hidden rounded-[2rem]">
                <DialogHeader className="p-8 pb-0">
                    <div className="flex items-center justify-between">
                        <div>
                            <DialogTitle className="text-3xl font-bold">Game Archives</DialogTitle>
                            <DialogDescription className="text-muted-foreground mt-2">
                                Complete competition history for {playerName}
                            </DialogDescription>
                        </div>
                    </div>

                    <div className="relative mt-6 mb-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by opponent or event..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-white/5 border-white/10 h-10 rounded-xl focus:ring-blue-500/50"
                        />
                    </div>
                </DialogHeader>

                <div className="max-h-[65vh] overflow-y-auto mt-4 scrollbar-hide">
                    {/* Desktop Table View */}
                    <div className="hidden md:block px-8 pb-8">
                        <Table>
                            <TableHeader className="bg-white/5 sticky top-0 z-10">
                                <TableRow className="border-white/5 hover:bg-transparent">
                                    <TableHead className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Date</TableHead>
                                    <TableHead className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Players</TableHead>
                                    <TableHead className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Result</TableHead>
                                    <TableHead className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Event</TableHead>
                                    <TableHead className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredGames.length > 0 ? (
                                    filteredGames.map((game) => (
                                        <TableRow key={game.id} className="border-white/5 hover:bg-white/[0.03] transition-colors">
                                            <TableCell className="py-4 text-xs font-mono text-slate-500">
                                                {game.date}
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <div className="flex flex-col items-center gap-1">
                                                    <span className={game.white === playerName ? "font-black text-blue-400 uppercase italic tracking-tight" : "text-white font-bold"}>
                                                        {game.white}
                                                    </span>
                                                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest italic opacity-40">VS</span>
                                                    <span className={game.black === playerName ? "font-black text-blue-400 uppercase italic tracking-tight" : "text-white font-bold"}>
                                                        {game.black}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4 text-center">
                                                <Badge className="bg-blue-600/10 border border-blue-500/30 text-blue-400 font-black rounded-lg">
                                                    {game.result}
                                                </Badge>
                                                {game.rating_change !== undefined && (
                                                    <div className={`text-[10px] mt-1.5 font-black uppercase tracking-widest ${game.rating_change > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                        {game.rating_change > 0 ? '+' : ''}{game.rating_change}
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <Link href={`/events/${calendarEvents.find(e => e.title.includes(game.event.replace(/ \d{4}$/, '')))?.id || '#'}`} className="block">
                                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-tight max-w-[150px] truncate hover:text-blue-400 cursor-pointer transition-colors">
                                                        {game.event}
                                                    </div>
                                                </Link>
                                            </TableCell>
                                            <TableCell className="py-4 text-right">
                                                <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-xl hover:bg-blue-600 transition-all hover:text-white">
                                                    <ExternalLink className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="py-20 text-center text-slate-500 font-black uppercase tracking-widest text-xs">
                                            No battle logs found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Mobile Card-List View */}
                    <div className="md:hidden space-y-4 px-6 pb-12">
                        {filteredGames.length > 0 ? (
                            filteredGames.map((game) => (
                                <div key={game.id} className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 space-y-4 relative overflow-hidden group active:bg-white/5 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <History className="w-3 h-3 text-blue-500/50" />
                                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{game.date}</span>
                                        </div>
                                        <Badge className="bg-blue-600/20 border-none text-blue-400 font-black text-[9px] uppercase tracking-widest rounded-full py-0.5 px-3">
                                            {game.result}
                                        </Badge>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col gap-0.5">
                                                <span className={`text-[11px] uppercase tracking-tight font-black ${game.white === playerName ? 'text-blue-400 italic' : 'text-slate-200'}`}>
                                                    {game.white}
                                                </span>
                                                <span className="text-[8px] font-black text-slate-600 uppercase italic">White Operations</span>
                                            </div>
                                            {game.white === playerName && game.rating_change !== undefined && (
                                                <span className={`text-[10px] font-black ${game.rating_change > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                    {game.rating_change > 0 ? '+' : ''}{game.rating_change}
                                                </span>
                                            )}
                                        </div>

                                        <div className="h-px bg-white/5 w-full my-1"></div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col gap-0.5">
                                                <span className={`text-[11px] uppercase tracking-tight font-black ${game.black === playerName ? 'text-blue-400 italic' : 'text-slate-200'}`}>
                                                    {game.black}
                                                </span>
                                                <span className="text-[8px] font-black text-slate-600 uppercase italic">Black Operations</span>
                                            </div>
                                            {game.black === playerName && game.rating_change !== undefined && (
                                                <span className={`text-[10px] font-black ${game.rating_change > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                    {game.rating_change > 0 ? '+' : ''}{game.rating_change}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                                        <Link href={`/events/${calendarEvents.find(e => e.title.includes(game.event.replace(/ \d{4}$/, '')))?.id || '#'}`}>
                                            <div className="flex flex-col cursor-pointer hover:opacity-80 transition-opacity">
                                                <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest">Sector / Event</span>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight truncate max-w-[200px]">{game.event}</span>
                                            </div>
                                        </Link>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl bg-white/5 hover:bg-blue-600 transition-all group">
                                            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-20 text-center opacity-50">
                                <History className="w-8 h-8 mx-auto mb-3 text-slate-600" />
                                <p className="text-[10px] font-black uppercase tracking-widest">Archive Void</p>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
