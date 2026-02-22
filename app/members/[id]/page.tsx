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
    ArrowRight,
    Star,
    Zap,
    Phone
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
import { calendarEvents } from "@/lib/calendar-data"

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
            {/* Navigation (Responsive) */}
            <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-xl h-14 md:h-16 flex items-center">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <Link href="/members" className="flex items-center gap-2 group">
                        <div className="h-8 w-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-all active:scale-90">
                            <ChevronLeft className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-[10px] md:text-sm font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">Registry</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <ShareProfileButton />
                    </div>
                </div>
            </header>

            <main className="pt-20 md:pt-32 pb-24 md:pb-32 relative z-10">
                {/* Ambient Background Elements (Global) */}
                <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/5 blur-[120px] rounded-full"></div>
                    <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/5 blur-[120px] rounded-full"></div>
                </div>

                {/* Profile Hero section */}
                <section className="container mx-auto px-4 mb-8 md:mb-16">
                    <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 bg-slate-900/40 backdrop-blur-3xl shadow-2xl">
                        {/* Hero Background Glows */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute top-0 right-0 w-[70%] h-full bg-gradient-to-l from-blue-600/[0.07] to-transparent"></div>
                            <div className="absolute bottom-0 left-0 w-[70%] h-full bg-gradient-to-r from-emerald-600/[0.07] to-transparent"></div>
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-overlay"></div>
                        </div>

                        <div className="relative z-10 p-6 md:p-12 lg:p-16 flex flex-col md:flex-row gap-8 md:gap-16 items-center md:items-start">
                            {/* Avatar/Profile Image */}
                            <div className="relative shrink-0">
                                <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-emerald-500 rounded-[2rem] md:rounded-3xl blur-xl opacity-20 md:opacity-10"></div>
                                <div className="relative h-48 w-48 md:h-80 md:w-80 rounded-[2rem] md:rounded-3xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">
                                    {member.image ? (
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            priority
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900/40 to-slate-900 text-blue-400 text-5xl md:text-7xl font-black italic">
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                    )}
                                </div>
                                {member.title !== "None" && (
                                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-blue-600 border border-white/20 rounded-full shadow-xl z-20">
                                        <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest italic">{member.title}</span>
                                    </div>
                                )}
                            </div>

                            {/* Identity and Core Info */}
                            <div className="flex-1 flex flex-col items-center md:items-start space-y-6 md:space-y-10 pt-2 text-center md:text-left">
                                <div className="space-y-4 md:space-y-6 w-full">
                                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
                                        <Badge variant="outline" className={`bg-white/5 border-white/5 px-3 py-1 text-[8px] md:text-[9px] font-black uppercase tracking-widest rounded-full ${member.status === 'Active' ? 'text-emerald-400' : 'text-red-400'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${member.status === 'Active' ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`}></span>
                                            {member.status}
                                        </Badge>
                                        <Badge variant="outline" className="bg-white/5 border-white/5 px-3 py-1 text-slate-500 text-[8px] md:text-[9px] font-black uppercase tracking-widest rounded-full">
                                            UID_{member.id}
                                        </Badge>
                                    </div>

                                    <h1 className="text-3xl md:text-7xl font-black tracking-tighter leading-[0.9] text-white uppercase italic">
                                        {member.name}
                                    </h1>

                                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-5 text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-3.5 h-3.5 text-blue-500" />
                                            {member.club}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                                            EST. {member.joined}
                                        </div>
                                        {member.fideId && (
                                            <div className="flex items-center gap-2">
                                                <Globe className="w-3.5 h-3.5 text-blue-400" />
                                                FIDE_{member.fideId}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 w-full max-w-2xl">
                                    <div className="p-4 md:p-5 bg-white/5 rounded-[1.5rem] md:rounded-2xl border border-white/5 backdrop-blur-md group hover:border-blue-500/30 transition-all">
                                        <div className="text-[8px] md:text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1">Elo Rating</div>
                                        <div className="text-2xl md:text-3xl font-black text-white flex items-center justify-center md:justify-start gap-2">
                                            <Trophy className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
                                            {member.rating}
                                        </div>
                                    </div>
                                    <div className="p-4 md:p-5 bg-white/5 rounded-[1.5rem] md:rounded-2xl border border-white/5 backdrop-blur-md group hover:border-emerald-500/30 transition-all">
                                        <div className="text-[8px] md:text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1">Success Rate</div>
                                        <div className="text-2xl md:text-3xl font-black text-white text-center md:text-left">
                                            {stats.wins + stats.draws + stats.losses > 0
                                                ? Math.round(((stats.wins + (stats.draws / 2)) / (stats.wins + stats.draws + stats.losses)) * 100)
                                                : 0}%
                                        </div>
                                    </div>
                                    <div className="hidden md:block p-5 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
                                        <div className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1">Total Battles</div>
                                        <div className="text-3xl font-black text-white">
                                            {stats.wins + stats.draws + stats.losses}
                                        </div>
                                    </div>
                                    <div className="hidden md:block p-5 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
                                        <div className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1">Natl Rank</div>
                                        <div className="text-3xl font-black text-blue-400">#{member.rating > 2000 ? '1' : member.rating > 1800 ? '4' : '12'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-6 md:gap-10 relative z-10">
                    <div className="lg:col-span-2 space-y-6 md:space-y-10">
                        {/* Bio & Extended Stats */}
                        <Card className="bg-slate-950/40 border-white/5 backdrop-blur-xl rounded-[2rem] overflow-hidden shadow-2xl">
                            <CardHeader className="p-6 md:p-10 pb-4">
                                <div className="flex items-center gap-3 text-blue-400 mb-2">
                                    <Activity className="w-5 h-5" />
                                    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] italic">Intel Briefing</span>
                                </div>
                                <CardTitle className="text-2xl md:text-4xl font-black uppercase tracking-tighter italic">Strategic Profile</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 md:p-10 pt-2 space-y-8">
                                <p className="text-base md:text-lg text-slate-400 font-medium leading-relaxed italic opacity-80">
                                    "{member.bio || "No biography available for this member."}"
                                </p>

                                <div className="grid grid-cols-3 gap-2 md:gap-8 pt-6 md:pt-10 border-t border-white/5">
                                    <div className="text-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                        <div className="text-2xl md:text-4xl font-black text-white italic">{stats.wins}</div>
                                        <div className="text-[8px] md:text-[10px] font-black text-emerald-500/60 uppercase tracking-widest mt-1">Victories</div>
                                    </div>
                                    <div className="text-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                        <div className="text-2xl md:text-4xl font-black text-white italic">{stats.draws}</div>
                                        <div className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Draws</div>
                                    </div>
                                    <div className="text-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                        <div className="text-2xl md:text-4xl font-black text-white italic">{stats.losses}</div>
                                        <div className="text-[8px] md:text-[10px] font-black text-rose-500/60 uppercase tracking-widest mt-1">Defeats</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Results / Battle Record */}
                        {recentResults.length > 0 && (
                            <Card className="bg-slate-950/40 border-white/5 backdrop-blur-xl rounded-[2rem] overflow-hidden shadow-2xl">
                                <CardHeader className="p-6 md:p-10 pb-4">
                                    <div className="flex items-center gap-3 text-emerald-400 mb-2">
                                        <BarChart3 className="w-5 h-5" />
                                        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] italic">Combat Log</span>
                                    </div>
                                    <CardTitle className="text-2xl md:text-4xl font-black uppercase tracking-tighter italic">Recent Encounters</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader className="bg-white/[0.03]">
                                                <TableRow className="border-white/5 hover:bg-transparent">
                                                    <TableHead className="py-4 px-6 md:px-10 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">Event Intelligence</TableHead>
                                                    <TableHead className="py-4 px-4 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-center text-slate-500">Result</TableHead>
                                                    <TableHead className="py-4 px-6 md:px-10 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-right text-slate-500">Date</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {recentResults.map((res, i) => (
                                                    <TableRow key={i} className="border-white/5 hover:bg-white/[0.02] transition-colors">
                                                        <TableCell className="py-5 px-6 md:px-10">
                                                            <Link href={`/events/${calendarEvents.find(e => e.title.includes(res.event.replace(/ \d{4}$/, '')))?.id || '#'}`} className="block group/event">
                                                                <span className="font-black text-xs md:text-base text-white uppercase italic tracking-tight hover:text-blue-400 cursor-pointer transition-colors block">
                                                                    {res.event}
                                                                </span>
                                                            </Link>
                                                        </TableCell>
                                                        <TableCell className="py-5 px-4 text-center">
                                                            <Badge className={`rounded-full px-3 py-0.5 text-[8px] md:text-[9px] font-black uppercase tracking-widest border-none ${res.result === 'Won' ? 'bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : res.result === 'Lost' ? 'bg-rose-500/10 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.1)]' : 'bg-slate-500/10 text-slate-400'}`}>
                                                                {res.result}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="py-5 px-6 md:px-10 text-right">
                                                            <span className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">{res.date}</span>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar Actions & Achievements */}
                    <div className="space-y-6 md:space-y-8">
                        {/* Quick Actions */}
                        <Card className="bg-slate-900/60 border-white/10 backdrop-blur-3xl rounded-[2rem] p-6 md:p-10 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full"></div>
                            <div className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-6 italic">Tactical Actions</div>
                            <div className="space-y-3.5 relative z-10">
                                <ChallengePlayerButton name={member.name} />
                                <PlayerGamesDialog games={games as any} playerName={member.name} variant="full" />
                            </div>
                        </Card>

                        {/* Achievements */}
                        <Card className="bg-slate-900/40 border-white/5 backdrop-blur-2xl rounded-[2rem] p-6 md:p-10 shadow-xl overflow-hidden relative">
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/5 blur-3xl rounded-full"></div>
                            <div className="flex items-center gap-3 text-emerald-400 mb-8 font-black uppercase text-[10px] tracking-[0.3em] italic">
                                <Award className="w-5 h-5 text-yellow-500" />
                                Merit Badges
                            </div>
                            <div className="space-y-6 md:space-y-8 relative z-10">
                                {[
                                    { name: "Olympiad Veteran", desc: "Represented SL in 3+ Olympiads", color: "text-blue-400", bg: "bg-blue-400/5" },
                                    { name: "Tactical Master", desc: "10+ brilliancy awards", color: "text-purple-400", bg: "bg-purple-400/5" },
                                    { name: "Top 10 National", desc: "Consistently ranked in elite tier", color: "text-emerald-400", bg: "bg-emerald-400/5" }
                                ].map((ach, i) => (
                                    <div key={i} className="flex gap-4 group">
                                        <div className={`h-12 w-12 rounded-2xl ${ach.bg} border border-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                                            <Trophy className={`w-6 h-6 ${ach.color} drop-shadow-lg`} />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <div className="font-black text-xs text-white uppercase tracking-tight italic">{ach.name}</div>
                                            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">{ach.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Contact Info */}
                        <Card className="bg-slate-950/60 border-white/5 backdrop-blur-xl rounded-[2rem] p-6 md:p-10 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/[0.03] blur-3xl rounded-full"></div>
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6 italic">Registry Data</div>
                            <div className="space-y-5 relative z-10">
                                <div className="flex items-center gap-4 text-[11px] font-black text-slate-300 uppercase tracking-widest transition-colors hover:text-white">
                                    <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
                                        <Mail className="w-3.5 h-3.5 text-blue-400" />
                                    </div>
                                    {member.name.toLowerCase().replace(' ', '.')}@slchess.org
                                </div>
                                <div className="text-[9px] text-slate-500 font-bold italic border-t border-white/5 pt-5 opacity-60">
                                    Strategic contact data is restricted to verified federation officials and active tournament arbiters.
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-slate-950 border-t border-white/5 pt-6 md:pt-24 pb-4 md:pb-12 relative overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/4 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50"></div>
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="absolute top-1/2 -right-24 w-64 h-64 bg-emerald-600/5 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="container mx-auto px-6 md:px-4 relative z-10">
                    {/* Mobile Dashboard: High-Density & Impressive */}
                    <div className="md:hidden space-y-5 mb-5">
                        {/* Header: Identity & Status */}
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-blue-600/20 border border-white/10 rounded-xl flex items-center justify-center font-black text-xs text-white shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]">
                                    SL
                                </div>
                                <div>
                                    <h3 className="font-black text-xl tracking-tighter text-white uppercase italic leading-none">SLCF</h3>
                                    <p className="text-[8px] font-black text-blue-400/80 uppercase tracking-[0.2em] mt-1">National Authority</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/5 border border-blue-500/10">
                                <Zap className="w-2.5 h-2.5 text-blue-400 animate-pulse" />
                                <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest">Active</span>
                            </div>
                        </div>

                        {/* Navigation Matrix */}
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3.5 space-y-2.5 group">
                                <div className="flex items-center justify-between">
                                    <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.15em] italic">Discovery</span>
                                    <ArrowRight className="w-3 h-3 text-white/10 group-hover:text-blue-400 transition-colors" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    {['About', 'Rankings', 'News'].map(item => (
                                        <Link key={item} href={item === 'News' ? '/news' : '/'} className="text-[11px] font-extrabold text-slate-400 hover:text-white transition-colors uppercase tracking-tight">{item}</Link>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3.5 space-y-2.5 group">
                                <div className="flex items-center justify-between">
                                    <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.15em] italic">Academy</span>
                                    <Star className="w-3 h-3 text-white/10 group-hover:text-emerald-400 transition-colors" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    {['Learn', 'FIDE', 'Hub'].map(item => (
                                        <Link key={item} href="#" className="text-[11px] font-extrabold text-slate-400 hover:text-white transition-colors uppercase tracking-tight">{item}</Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Smart Contact Strip */}
                        <div className="flex flex-col gap-1.5 bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 blur-2xl rounded-full"></div>
                            <div className="flex items-center gap-3 relative z-10">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500/40"></div>
                                <p className="text-[10px] font-bold text-slate-400">15 Siaka Stevens St, Freetown</p>
                            </div>
                            <div className="flex items-center gap-3 relative z-10">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40"></div>
                                <p className="text-[10px] font-bold text-slate-400">info@slchess.org</p>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:grid grid-cols-12 gap-8 mb-20">
                        {/* Brand Intro */}
                        <div className="md:col-span-5 space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                                    <div className="relative w-14 h-14 bg-slate-900 border border-white/10 rounded-2xl flex items-center justify-center font-black text-sm text-white shadow-2xl">
                                        SL
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-black text-2xl tracking-tighter text-white uppercase italic leading-none">SLCF</h3>
                                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mt-1 italic">National Authority</p>
                                </div>
                            </div>

                            <p className="text-slate-400 text-lg leading-relaxed max-w-sm font-medium">
                                The supreme governing body for chess in high strategy.
                            </p>
                        </div>

                        <div className="md:col-span-4 grid grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <h4 className="font-black text-[11px] uppercase tracking-[0.2em] text-white/50 italic">Discovery</h4>
                                    <div className="w-6 h-0.5 bg-blue-500"></div>
                                </div>
                                <ul className="grid grid-cols-1 gap-y-4">
                                    {['About Us', 'Rankings', 'Events', 'News'].map((item) => (
                                        <li key={item}>
                                            <Link href={item === 'News' ? '/news' : '/'} className="text-slate-500 hover:text-white text-[13px] font-bold uppercase tracking-wider transition-colors">{item}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <h4 className="font-black text-[11px] uppercase tracking-[0.2em] text-white/50 italic">Academy</h4>
                                    <div className="w-6 h-0.5 bg-emerald-500"></div>
                                </div>
                                <ul className="grid grid-cols-1 gap-y-4">
                                    {['Learn', 'FIDE Laws', 'Hub'].map((item) => (
                                        <li key={item}>
                                            <Link href="#" className="text-slate-500 hover:text-white text-[13px] font-bold uppercase tracking-wider transition-all">{item}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="md:col-span-3 space-y-8">
                            <h4 className="font-black text-[11px] uppercase tracking-[0.2em] text-white/40 italic">Connect</h4>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-3.5 h-3.5 text-rose-500/60" />
                                    <p className="text-xs font-bold text-slate-400">Siaka Stevens St, Freetown</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="w-3.5 h-3.5 text-blue-500/60" />
                                    <p className="text-xs font-bold text-slate-400">info@slchess.org</p>
                                </div>
                                <a href="https://wa.me/23275553029" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group/dev hover:text-emerald-400 transition-colors">
                                    <Phone className="w-3.5 h-3.5 text-emerald-500/60 group-hover/dev:text-emerald-400" />
                                    <p className="text-xs font-bold text-slate-400 group-hover/dev:text-emerald-400">Architect: Tommace</p>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Credits & Legal */}
                    <div className="pt-4 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3">
                        <div className="flex items-center gap-4">
                            <Zap className="w-3.5 h-3.5 text-blue-400 animate-pulse hidden md:block" />
                            <p className="text-slate-600 text-[9px] font-black uppercase tracking-widest text-center">
                                © 2025 <span className="text-slate-400">Sierra Leone Chess Federation</span>
                            </p>
                        </div>

                        <div className="flex gap-6">
                            <Link href="#" className="text-slate-600 hover:text-white text-[8px] font-black uppercase tracking-widest transition-all">Privacy</Link>
                            <Link href="#" className="text-slate-600 hover:text-white text-[8px] font-black uppercase tracking-widest transition-all">Terms</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
