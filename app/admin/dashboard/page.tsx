import { getMembers, getEvents, getNews } from "@/lib/queries"
import { Users, Calendar, Newspaper, Trophy, TrendingUp, Clock, ChevronRight } from "lucide-react"
import { RecordGameDialog } from "../components/record-game-dialog"
import Link from "next/link"

export default async function AdminDashboard() {
    const members = await getMembers()
    const events = await getEvents()
    const news = await getNews()

    const stats = [
        {
            title: "Total Members",
            value: members.length,
            icon: Users,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            borderColor: "border-blue-500/20",
            gradient: "from-blue-600/20 to-blue-600/5",
        },
        {
            title: "Active Events",
            value: events.filter(e => e.status !== "Completed").length,
            icon: Calendar,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            borderColor: "border-emerald-500/20",
            gradient: "from-emerald-600/20 to-emerald-600/5",
        },
        {
            title: "News Articles",
            value: news.length,
            icon: Newspaper,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            borderColor: "border-purple-500/20",
            gradient: "from-purple-600/20 to-purple-600/5",
        },
        {
            title: "Total Prize Pools",
            value: "$12.5k",
            icon: Trophy,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            borderColor: "border-amber-500/20",
            gradient: "from-amber-600/20 to-amber-600/5",
        }
    ]

    // Get top rated members for the quick list
    const topMembers = [...members].sort((a, b) => b.rating - a.rating).slice(0, 5)

    return (
        <div className="space-y-8">
            {/* Header - Premium Style */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
                <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black italic tracking-tighter uppercase leading-none">Command <span className="text-blue-500">Center</span></h1>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 italic">Real-time Federation Logistics & Intel</p>
                    </div>
                </div>
                <RecordGameDialog members={members} />
            </div>

            {/* Stats Grid — High Density HUD Style */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        className={`relative overflow-hidden p-6 rounded-[2rem] bg-slate-900/40 backdrop-blur-xl border border-white/5 transition-all duration-300 hover:border-white/10 group shadow-2xl`}
                    >
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.gradient} blur-3xl rounded-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity`}></div>

                        <div className="relative z-10 space-y-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} shadow-inner border border-white/5`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-3xl font-black text-white leading-none tracking-tighter italic">{stat.value}</div>
                                <div className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] mt-2 group-hover:text-slate-400 transition-colors">{stat.title}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Sections - Premium HUD Containers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Rated Members */}
                <div className="rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl border border-white/5 overflow-hidden shadow-2xl group">
                    <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-slate-950/30">
                        <div className="flex items-center gap-3">
                            <TrendingUp className="w-5 h-5 text-blue-500" />
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] italic text-white/90">Tactical Rankings</h2>
                        </div>
                        <Link href="/admin/members" className="text-[9px] text-blue-500 font-black uppercase tracking-widest flex items-center gap-1.5 hover:text-blue-400 transition-all group-hover:translate-x-1">
                            Access Database <ChevronRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="divide-y divide-white/5">
                        {topMembers.map((member, index) => (
                            <div key={member.id} className="flex items-center gap-4 px-8 py-4 hover:bg-white/[0.02] transition-colors relative">
                                {/* Rank */}
                                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                                    <span className="text-[11px] font-black text-slate-500 italic">{index + 1}</span>
                                </div>
                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="font-black text-sm text-white uppercase italic tracking-tight truncate leading-none">{member.name}</div>
                                    <div className="text-[9px] text-slate-600 font-bold uppercase tracking-widest mt-1 truncate">{member.club}</div>
                                </div>
                                {/* Ratings */}
                                <div className="flex items-center gap-3 shrink-0">
                                    {member.title && member.title !== "None" && (
                                        <span className="px-1.5 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[8px] font-black rounded uppercase tracking-widest">
                                            {member.title}
                                        </span>
                                    )}
                                    <span className="text-base font-black text-blue-400 tabular-nums italic tracking-tighter">
                                        {member.rating > 0 ? member.rating : '—'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Events */}
                <div className="rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl border border-white/5 overflow-hidden shadow-2xl group">
                    <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-slate-950/30">
                        <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-emerald-500" />
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] italic text-white/90">Upcoming Operations</h2>
                        </div>
                        <Link href="/admin/events" className="text-[9px] text-emerald-500 font-black uppercase tracking-widest flex items-center gap-1.5 hover:text-emerald-400 transition-all group-hover:translate-x-1">
                            Mission Log <ChevronRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="divide-y divide-white/5">
                        {events.slice(0, 5).map(event => (
                            <div key={event.id} className="flex items-center gap-4 px-8 py-4 hover:bg-white/[0.02] transition-colors">
                                {/* Date chip */}
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex flex-col items-center justify-center shrink-0 border border-white/5 shadow-inner">
                                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-tighter leading-none italic">
                                        {event.date.split('-')[1] ? new Date(event.date).toLocaleString('en', { month: 'short' }) : event.date.slice(0, 3)}
                                    </span>
                                    <span className="text-sm font-black text-white leading-none mt-1 italic tracking-tighter">
                                        {event.date.split('-')[2] || event.date.slice(4, 6)}
                                    </span>
                                </div>
                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="font-black text-sm text-white uppercase italic tracking-tight truncate leading-none">{event.title}</div>
                                    <div className="text-[9px] text-slate-600 font-bold uppercase tracking-widest mt-1 truncate">{event.location}</div>
                                </div>
                                {/* Status */}
                                <span className={`shrink-0 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border ${event.status === 'Upcoming' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-500/10 text-slate-500 border-white/5'
                                    }`}>
                                    {event.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
