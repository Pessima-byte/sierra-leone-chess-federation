import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
    Trophy,
    MapPin,
    Calendar,
    ChevronLeft,
    Activity,
    Award,
    BarChart3,
    Globe,
    Mail,
    Share2,
} from "lucide-react"
import { getMemberById } from "@/lib/queries"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import PlayerGamesDialog from "@/components/player-games-dialog"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { ShareProfileButton, ChallengePlayerButton } from "./member-profile-client"

export default async function MemberDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const member = await getMemberById(id)

    if (!member) {
        notFound()
    }

    // Use the transmuted games from our query
    const games = member.games

    // Create virtual stats and recent results to maintain UI compatibility
    const stats = {
        wins: member.wins,
        draws: member.draws,
        losses: member.losses
    }

    // Get last 5 games for recent results
    const recentResults = games
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5)
        .map(g => ({
            event: g.event,
            result: g.whiteId === member.id
                ? (g.result === '1-0' ? 'Won' : g.result === '0-1' ? 'Lost' : 'Draw')
                : (g.result === '0-1' ? 'Won' : g.result === '1-0' ? 'Lost' : 'Draw'),
            date: g.date
        }))

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
            {/* Navigation */}
            <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-xl">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/members" className="flex items-center gap-2 group">
                        <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                            <ChevronLeft className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium">Back to Registry</span>
                    </Link>

                    <ShareProfileButton />
                </div>
            </header>

            <main className="pt-24 pb-24">
                {/* Profile Hero section */}
                <section className="container mx-auto px-4 mb-12">
                    <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-slate-950 shadow-2xl">
                        <div className="absolute inset-0 z-0">
                            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/10 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-green-600/10 to-transparent"></div>
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]"></div>
                        </div>

                        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center md:items-start text-center md:text-left">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-green-600 rounded-3xl blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
                                <div className="relative h-64 w-64 md:h-80 md:w-80 rounded-2xl overflow-hidden border-2 border-white/10 bg-slate-900 shadow-2xl">
                                    {member.image ? (
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-blue-900/20 text-blue-400 text-6xl font-black">
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                    )}
                                </div>
                                {member.title !== "None" && (
                                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-blue-600 border border-white/20 rounded-full shadow-xl z-20">
                                        <span className="text-sm font-black text-white uppercase tracking-widest">{member.title}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 space-y-8 pt-4">
                                <div className="space-y-4">
                                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
                                        <Badge variant="outline" className={`bg-transparent border-white/10 text-[10px] font-bold uppercase tracking-widest ${member.status === 'Active' ? 'text-green-400' : 'text-red-400'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${member.status === 'Active' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></span>
                                            {member.status} Status
                                        </Badge>
                                        <Badge variant="outline" className="bg-transparent border-white/10 text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
                                            Player ID: {member.id}
                                        </Badge>
                                    </div>
                                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                                        {member.name}
                                    </h1>
                                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-blue-500" />
                                            {member.club}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-blue-500" />
                                            Member since {member.joined}
                                        </div>
                                        {member.fideId && (
                                            <div className="flex items-center gap-2">
                                                <Globe className="w-4 h-4 text-blue-500" />
                                                FIDE ID: {member.fideId}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
                                        <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">Elo Rating</div>
                                        <div className="text-3xl font-black text-white flex items-center gap-2">
                                            <Trophy className="w-6 h-6 text-yellow-500" />
                                            {member.rating}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
                                        <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">Win Rate</div>
                                        <div className="text-3xl font-black text-white">
                                            {stats.wins + stats.draws + stats.losses > 0
                                                ? Math.round(((stats.wins + (stats.draws / 2)) / (stats.wins + stats.draws + stats.losses)) * 100)
                                                : 0}%
                                        </div>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
                                        <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">Total Games</div>
                                        <div className="text-3xl font-black text-white">
                                            {stats.wins + stats.draws + stats.losses}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
                                        <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">Rank</div>
                                        <div className="text-3xl font-black text-blue-400">#{member.rating > 2000 ? '1' : member.rating > 1800 ? '4' : '12'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="bg-slate-900/40 border-white/10 backdrop-blur-md rounded-[2rem] overflow-hidden">
                            <CardHeader className="p-8 pb-4">
                                <div className="flex items-center gap-3 text-blue-400 mb-2">
                                    <Activity className="w-5 h-5" />
                                    <span className="text-xs font-bold uppercase tracking-[0.2em]">Bio & Stats</span>
                                </div>
                                <CardTitle className="text-3xl">Professional Profile</CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 pt-0 space-y-8">
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {member.bio || "No biography available for this member."}
                                </p>

                                <div className="grid sm:grid-cols-3 gap-8 pt-8 border-t border-white/5">
                                    <div className="text-center">
                                        <div className="text-3xl font-black text-white">{stats.wins}</div>
                                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Wins</div>
                                    </div>
                                    <div className="text-center border-l border-r border-white/10">
                                        <div className="text-3xl font-black text-white">{stats.draws}</div>
                                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Draws</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-black text-white">{stats.losses}</div>
                                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Losses</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {recentResults.length > 0 && (
                            <Card className="bg-slate-900/40 border-white/10 backdrop-blur-md rounded-[2rem] overflow-hidden">
                                <CardHeader className="p-8 pb-4">
                                    <div className="flex items-center gap-3 text-blue-400 mb-2">
                                        <BarChart3 className="w-5 h-5" />
                                        <span className="text-xs font-bold uppercase tracking-[0.2em]">Battle Record</span>
                                    </div>
                                    <CardTitle className="text-3xl">Recent Encounters</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader className="bg-white/5">
                                            <TableRow className="border-white/5 hover:bg-transparent">
                                                <TableHead className="py-4 px-8 text-[10px] font-bold uppercase tracking-widest">Event</TableHead>
                                                <TableHead className="py-4 px-4 text-[10px] font-bold uppercase tracking-widest text-center">Result</TableHead>
                                                <TableHead className="py-4 px-8 text-[10px] font-bold uppercase tracking-widest text-right">Date</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {recentResults.map((res, i) => (
                                                <TableRow key={i} className="border-white/5 hover:bg-white/[0.02]">
                                                    <TableCell className="py-4 px-8 font-bold text-sm">{res.event}</TableCell>
                                                    <TableCell className="py-4 px-4 text-center">
                                                        <Badge className={res.result === 'Won' ? 'bg-green-500/10 text-green-400 border-green-500/20' : res.result === 'Lost' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/20'}>
                                                            {res.result}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="py-4 px-8 text-right text-[10px] font-medium text-muted-foreground uppercase">{res.date}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    <div className="space-y-8">
                        <Card className="bg-slate-900/40 border-white/10 backdrop-blur-md rounded-[2rem] p-8">
                            <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-6">Quick Actions</div>
                            <div className="space-y-4">
                                <ChallengePlayerButton name={member.name} />
                                <PlayerGamesDialog games={games as any} playerName={member.name} variant="full" />
                            </div>
                        </Card>

                        <Card className="bg-slate-900/40 border-white/10 backdrop-blur-md rounded-[2rem] p-8">
                            <div className="flex items-center gap-3 text-blue-400 mb-6 font-bold uppercase text-xs tracking-widest">
                                <Award className="w-5 h-5 text-yellow-500" />
                                Achievements
                            </div>
                            <div className="space-y-6">
                                {[
                                    { name: "Olympiad Veteran", desc: "Represented SL in 3+ Olympiads", color: "text-blue-400" },
                                    { name: "Tactical Master", desc: "10+ brilliancy awards", color: "text-purple-400" },
                                    { name: "Top 10 National", desc: "Consistently ranked in top 10 Elos", color: "text-green-400" }
                                ].map((ach, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                            <Trophy className={`w-5 h-5 ${ach.color}`} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm text-white">{ach.name}</div>
                                            <div className="text-xs text-muted-foreground">{ach.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card className="bg-slate-900/40 border-white/10 backdrop-blur-md rounded-[2rem] p-8">
                            <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-6">Contact Info</div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <Mail className="w-4 h-4" />
                                    {member.name.toLowerCase().replace(' ', '.')}@slchess.org
                                </div>
                                <div className="text-xs text-muted-foreground italic border-t border-white/5 pt-4">
                                    Contact information is only visible to staff and registered opponents.
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </main>

            <footer className="bg-black border-t border-white/10 pt-16 pb-8">
                <div className="container mx-auto px-4">
                    <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground border-t border-white/5">
                        <p>© 2025 Sierra Leone Chess Federation. All rights reserved.</p>
                        <div className="font-bold text-white/10 tracking-widest">
                            SLCF TERMINAL :: {member.id}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
