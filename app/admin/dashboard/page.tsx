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
        <div className="space-y-5 md:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black italic tracking-tight">OVERVIEW</h1>
                    <p className="text-xs text-muted-foreground mt-0.5">Federation dashboard at a glance</p>
                </div>
                <RecordGameDialog members={members} />
            </div>

            {/* Stats Grid — 2x2 on mobile, 4 columns on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        className={`relative overflow-hidden p-4 md:p-6 rounded-2xl bg-gradient-to-br ${stat.gradient} border ${stat.borderColor} transition-all duration-200 active:scale-[0.98]`}
                    >
                        {/* Icon */}
                        <div className={`w-9 h-9 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} mb-3`}>
                            <stat.icon className="w-4 h-4 md:w-6 md:h-6" />
                        </div>
                        {/* Value */}
                        <div className="text-xl md:text-2xl font-black text-white leading-none">{stat.value}</div>
                        {/* Label */}
                        <div className="text-[10px] md:text-xs text-muted-foreground font-medium mt-1 uppercase tracking-wider">{stat.title}</div>
                    </div>
                ))}
            </div>

            {/* Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {/* Top Rated Members */}
                <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-white/5">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-blue-400" />
                            <h2 className="text-sm md:text-base font-bold">Top Rated</h2>
                        </div>
                        <Link href="/admin/members" className="text-[10px] text-blue-400 font-bold uppercase tracking-wider flex items-center gap-0.5 hover:text-blue-300 transition-colors">
                            View All <ChevronRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="divide-y divide-white/5">
                        {topMembers.map((member, index) => (
                            <div key={member.id} className="flex items-center gap-3 px-4 py-3 md:px-6 md:py-3.5 hover:bg-white/[0.02] transition-colors">
                                {/* Rank */}
                                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                    <span className="text-[10px] font-black text-muted-foreground">{index + 1}</span>
                                </div>
                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-sm text-white truncate">{member.name}</div>
                                    <div className="text-[10px] text-muted-foreground truncate">{member.club}</div>
                                </div>
                                {/* Ratings */}
                                <div className="flex items-center gap-2 shrink-0">
                                    {member.title && member.title !== "None" && (
                                        <span className="px-1.5 py-0.5 bg-blue-900/40 border border-blue-500/30 text-blue-400 text-[8px] font-bold rounded uppercase">
                                            {member.title}
                                        </span>
                                    )}
                                    <span className="text-sm font-bold text-blue-400 tabular-nums">
                                        {member.rating > 0 ? member.rating : '—'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Events */}
                <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-white/5">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-emerald-400" />
                            <h2 className="text-sm md:text-base font-bold">Upcoming Events</h2>
                        </div>
                        <Link href="/admin/events" className="text-[10px] text-blue-400 font-bold uppercase tracking-wider flex items-center gap-0.5 hover:text-blue-300 transition-colors">
                            View All <ChevronRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="divide-y divide-white/5">
                        {events.slice(0, 5).map(event => (
                            <div key={event.id} className="flex items-center gap-3 px-4 py-3 md:px-6 md:py-3.5 hover:bg-white/[0.02] transition-colors">
                                {/* Date chip */}
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex flex-col items-center justify-center shrink-0 border border-white/5">
                                    <span className="text-[8px] font-bold text-muted-foreground uppercase leading-none">
                                        {event.date.split('-')[1] ? new Date(event.date).toLocaleString('en', { month: 'short' }) : event.date.slice(0, 3)}
                                    </span>
                                    <span className="text-xs font-black text-white leading-none mt-0.5">
                                        {event.date.split('-')[2] || event.date.slice(4, 6)}
                                    </span>
                                </div>
                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-sm text-white truncate">{event.title}</div>
                                    <div className="text-[10px] text-muted-foreground truncate">{event.location}</div>
                                </div>
                                {/* Status */}
                                <span className={`shrink-0 text-[9px] font-bold uppercase px-2 py-1 rounded-md ${event.status === 'Upcoming' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'
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
