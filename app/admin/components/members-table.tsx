"use client"

import { useState, useMemo } from "react"
import { Search, ChevronDown } from "lucide-react"
import { EditMemberDialog } from "./edit-member-dialog"
import { DeleteAction } from "./delete-action"
import { deleteMember } from "@/app/actions/admin"

interface Member {
    id: string
    name: string
    title: string
    rating: number
    rapidRating: number
    blitzRating: number
    club: string
    status: string
    joined: string
    fideId?: string | null
    image?: string | null
    games?: any[]
}

export function MembersTable({ members }: { members: Member[] }) {
    const [searchQuery, setSearchQuery] = useState("")

    const filtered = useMemo(() => {
        const q = searchQuery.toLowerCase().trim()
        if (!q) return members
        return members.filter(m =>
            m.name.toLowerCase().includes(q) ||
            (m.fideId ?? "").toLowerCase().includes(q) ||
            m.club.toLowerCase().includes(q) ||
            m.title.toLowerCase().includes(q) ||
            m.id.toLowerCase().includes(q)
        )
    }, [members, searchQuery])

    return (
        <div className="space-y-6">
            {/* Search bar - Premium HUD Style */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-4 md:p-6 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full pointer-events-none group-hover:bg-blue-600/10 transition-colors"></div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                    <div className="relative flex-1 max-w-xl">
                        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-blue-500/50 group-hover:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="OPERATIVE SEARCH: NAME, ID, OR UNIT..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full h-14 pl-12 pr-6 bg-slate-950/50 border border-white/10 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all shadow-inner"
                        />
                    </div>

                    <div className="flex items-center gap-4 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">DATABASE STATUS:</span>
                            <span className="text-[11px] font-bold text-blue-400 tabular-nums">{filtered.length} / {members.length}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Card View (shown < md) */}
            <div className="md:hidden space-y-4">
                {filtered.length === 0 ? (
                    <div className="py-20 text-center bg-slate-900/20 rounded-[2rem] border border-dashed border-white/10">
                        <Search className="w-10 h-10 mx-auto text-slate-800 mb-4 opacity-20" />
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">No matching intel found</p>
                    </div>
                ) : (
                    filtered.map(member => (
                        <div
                            key={member.id}
                            className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 space-y-5 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-3">
                                <span className={`px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-wider ${member.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : member.status === 'Registered' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                    {member.status}
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-black italic text-blue-500/50 shadow-inner">
                                    {member.name.charAt(0)}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-black text-sm text-white uppercase tracking-tight truncate leading-tight italic">
                                        {member.name}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        {member.title && member.title !== "None" && (
                                            <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">{member.title}</span>
                                        )}
                                        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest truncate">· {member.club}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 py-4 border-y border-white/5">
                                <div className="text-center space-y-1">
                                    <span className="block text-[8px] font-black text-slate-600 uppercase tracking-widest">Standard</span>
                                    <span className="block text-sm font-black text-blue-400 tabular-nums">{member.rating > 0 ? member.rating : '—'}</span>
                                </div>
                                <div className="text-center space-y-1 border-x border-white/5">
                                    <span className="block text-[8px] font-black text-slate-600 uppercase tracking-widest">Rapid</span>
                                    <span className="block text-sm font-black text-emerald-400 tabular-nums">{member.rapidRating > 0 ? member.rapidRating : '—'}</span>
                                </div>
                                <div className="text-center space-y-1">
                                    <span className="block text-[8px] font-black text-slate-600 uppercase tracking-widest">Blitz</span>
                                    <span className="block text-sm font-black text-purple-400 tabular-nums">{member.blitzRating > 0 ? member.blitzRating : '—'}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-1">
                                <span className="text-[9px] text-slate-600 font-mono tracking-tighter">
                                    FIDE_ID://{member.fideId || 'UNAFFILIATED'}
                                </span>
                                <div className="flex items-center gap-2">
                                    <EditMemberDialog member={member as any} />
                                    <DeleteAction
                                        id={member.id}
                                        action={deleteMember}
                                        title="Member"
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Desktop Table View (shown >= md) */}
            <div className="hidden md:block bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-950/50 text-slate-500 uppercase text-[9px] font-black tracking-[0.2em] border-b border-white/5">
                            <tr>
                                <th className="px-6 py-5 whitespace-nowrap italic">Sector ID</th>
                                <th className="px-6 py-5">Ident/Name</th>
                                <th className="px-6 py-5">Rank</th>
                                <th className="px-6 py-5 text-center">STD</th>
                                <th className="px-6 py-5 text-center">Rapid</th>
                                <th className="px-6 py-5 text-center">Blitz</th>
                                <th className="px-6 py-5">Unit (Club)</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5 text-right">Directives</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="px-6 py-24 text-center">
                                        <div className="flex flex-col items-center gap-4 opacity-20">
                                            <Search className="w-12 h-12" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">No match found in current grid</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filtered.map(member => (
                                    <tr key={member.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-5 font-mono text-slate-600 text-[10px] whitespace-nowrap tracking-tighter">
                                            {member.fideId || '———'}
                                        </td>
                                        <td className="px-6 py-5 font-black text-xs text-white uppercase italic tracking-tight whitespace-nowrap group-hover:text-blue-400 transition-colors">
                                            {member.name}
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            {member.title && member.title !== "None" ? (
                                                <span className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black rounded uppercase tracking-widest">
                                                    {member.title}
                                                </span>
                                            ) : (
                                                <span className="text-slate-800 text-[9px] font-black tracking-widest">RANK_N/A</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-5 font-black text-blue-400/80 text-center whitespace-nowrap tabular-nums">{member.rating > 0 ? member.rating : '—'}</td>
                                        <td className="px-6 py-5 font-black text-emerald-400/80 text-center whitespace-nowrap tabular-nums">{member.rapidRating > 0 ? member.rapidRating : '—'}</td>
                                        <td className="px-6 py-5 font-black text-purple-400/80 text-center whitespace-nowrap tabular-nums">{member.blitzRating > 0 ? member.blitzRating : '—'}</td>
                                        <td className="px-6 py-5 text-slate-500 text-xs font-bold uppercase tracking-tight whitespace-nowrap max-w-[150px] truncate">{member.club}</td>
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${member.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                                                {member.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right whitespace-nowrap">
                                            <div className="flex justify-end items-center gap-2">
                                                <EditMemberDialog member={member as any} />
                                                <DeleteAction
                                                    id={member.id}
                                                    action={deleteMember}
                                                    title="Member"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
