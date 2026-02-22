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
        <div className="space-y-3">
            {/* Search bar */}
            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-3 md:rounded-2xl md:p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div className="relative flex-1 max-w-sm">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search name, FIDE ID, club…"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full h-9 pl-9 pr-4 bg-slate-950 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>
                <div className="text-xs text-muted-foreground">
                    <span className="text-white font-bold">{filtered.length}</span> of {members.length}
                </div>
            </div>

            {/* Mobile Card View (shown < md) */}
            <div className="md:hidden space-y-2">
                {filtered.length === 0 ? (
                    <div className="py-12 text-center text-muted-foreground text-sm bg-slate-900/30 rounded-xl border border-white/5">
                        No members match &quot;{searchQuery}&quot;
                    </div>
                ) : (
                    filtered.map(member => (
                        <div
                            key={member.id}
                            className="bg-slate-900/40 border border-white/[0.06] rounded-xl p-3.5 space-y-2.5"
                        >
                            {/* Top row: Name + Status */}
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                        <span className="font-semibold text-sm text-white truncate">{member.name}</span>
                                        {member.title && member.title !== "None" && (
                                            <span className="px-1.5 py-0.5 bg-blue-900/40 border border-blue-500/30 text-blue-400 text-[8px] font-bold rounded uppercase shrink-0">
                                                {member.title}
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-[10px] text-muted-foreground mt-0.5 truncate">
                                        {member.club}
                                    </div>
                                </div>
                                <span className={`shrink-0 px-2 py-0.5 rounded text-[9px] font-bold uppercase ${member.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : member.status === 'Registered' ? 'bg-blue-500/10 text-blue-400' : 'bg-red-500/10 text-red-400'}`}>
                                    {member.status}
                                </span>
                            </div>

                            {/* Ratings row */}
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[9px] text-muted-foreground uppercase font-bold">STD</span>
                                    <span className="text-xs font-bold text-blue-400 tabular-nums">{member.rating > 0 ? member.rating : '—'}</span>
                                </div>
                                <div className="w-px h-3 bg-white/10" />
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[9px] text-muted-foreground uppercase font-bold">Rapid</span>
                                    <span className="text-xs font-bold text-emerald-400 tabular-nums">{member.rapidRating > 0 ? member.rapidRating : '—'}</span>
                                </div>
                                <div className="w-px h-3 bg-white/10" />
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[9px] text-muted-foreground uppercase font-bold">Blitz</span>
                                    <span className="text-xs font-bold text-purple-400 tabular-nums">{member.blitzRating > 0 ? member.blitzRating : '—'}</span>
                                </div>
                            </div>

                            {/* Bottom row: FIDE ID + Actions */}
                            <div className="flex items-center justify-between pt-1 border-t border-white/5">
                                <span className="text-[10px] text-muted-foreground font-mono">
                                    FIDE: {member.fideId || 'N/A'}
                                </span>
                                <div className="flex items-center gap-1">
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
            <div className="hidden md:block bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-950/50 text-muted-foreground uppercase text-[10px] font-black tracking-wider">
                            <tr>
                                <th className="px-3 py-3 whitespace-nowrap">FIDE ID</th>
                                <th className="px-3 py-3">Name</th>
                                <th className="px-3 py-3">Title</th>
                                <th className="px-3 py-3 text-center">STD</th>
                                <th className="px-3 py-3 text-center">Rapid</th>
                                <th className="px-3 py-3 text-center">Blitz</th>
                                <th className="px-3 py-3">Club</th>
                                <th className="px-3 py-3">Status</th>
                                <th className="px-3 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="px-6 py-16 text-center text-muted-foreground text-sm">
                                        No members match &quot;{searchQuery}&quot;
                                    </td>
                                </tr>
                            ) : (
                                filtered.map(member => (
                                    <tr key={member.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-3 py-3 font-mono text-muted-foreground text-xs whitespace-nowrap">{member.fideId || 'N/A'}</td>
                                        <td className="px-3 py-3 font-medium whitespace-nowrap max-w-[180px] truncate">{member.name}</td>
                                        <td className="px-3 py-3 whitespace-nowrap">
                                            {member.title && member.title !== "None" ? (
                                                <span className="px-2 py-0.5 bg-blue-900/40 border border-blue-500/30 text-blue-400 text-[10px] font-bold rounded uppercase">
                                                    {member.title}
                                                </span>
                                            ) : (
                                                <span className="text-slate-600 text-xs">—</span>
                                            )}
                                        </td>
                                        <td className="px-3 py-3 font-bold text-blue-400 text-center whitespace-nowrap">{member.rating > 0 ? member.rating : '—'}</td>
                                        <td className="px-3 py-3 font-bold text-emerald-400 text-center whitespace-nowrap">{member.rapidRating > 0 ? member.rapidRating : '—'}</td>
                                        <td className="px-3 py-3 font-bold text-purple-400 text-center whitespace-nowrap">{member.blitzRating > 0 ? member.blitzRating : '—'}</td>
                                        <td className="px-3 py-3 text-muted-foreground whitespace-nowrap max-w-[150px] truncate">{member.club}</td>
                                        <td className="px-3 py-3 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${member.status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                                {member.status}
                                            </span>
                                        </td>
                                        <td className="px-3 py-3 text-right whitespace-nowrap">
                                            <div className="flex justify-end items-center gap-1">
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
