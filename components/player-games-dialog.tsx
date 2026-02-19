"use client"

import { useState } from "react"
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

                <div className="max-h-[60vh] overflow-y-auto px-8 pb-8 mt-4">
                    <Table>
                        <TableHeader className="bg-white/5 sticky top-0 z-10">
                            <TableRow className="border-white/5 hover:bg-transparent">
                                <TableHead className="py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Date</TableHead>
                                <TableHead className="py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-center">Players</TableHead>
                                <TableHead className="py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-center">Result</TableHead>
                                <TableHead className="py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Event</TableHead>
                                <TableHead className="py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredGames.length > 0 ? (
                                filteredGames.map((game) => (
                                    <TableRow key={game.id} className="border-white/5 hover:bg-white/[0.03] transition-colors">
                                        <TableCell className="py-4 text-xs font-mono text-muted-foreground">
                                            {game.date}
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="flex flex-col items-center gap-1">
                                                <span className={game.white === playerName ? "font-bold text-blue-400" : "text-white"}>
                                                    {game.white}
                                                </span>
                                                <span className="text-[10px] text-muted-foreground italic">vs</span>
                                                <span className={game.black === playerName ? "font-bold text-blue-400" : "text-white"}>
                                                    {game.black}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4 text-center">
                                            <Badge variant="outline" className="bg-blue-600/10 border-blue-500/30 text-blue-400 font-black">
                                                {game.result}
                                            </Badge>
                                            {game.rating_change && (
                                                <div className={`text-[10px] mt-1 font-bold ${game.rating_change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                    {game.rating_change > 0 ? '+' : ''}{game.rating_change}
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="text-xs font-medium max-w-[150px] truncate">{game.event}</div>
                                        </TableCell>
                                        <TableCell className="py-4 text-right">
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-blue-600 hover:text-white">
                                                <ExternalLink className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="py-12 text-center text-muted-foreground">
                                        No games found matching your search.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </DialogContent>
        </Dialog>
    )
}
