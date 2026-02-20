"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
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
        <div className="bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden">
            {/* Search bar + count */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                <div className="relative w-72">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search by name, FIDE ID, club, title…"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full h-9 pl-9 pr-4 bg-slate-950 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>
                <div className="text-sm text-muted-foreground">
                    Showing <span className="text-white font-bold">{filtered.length}</span> of {members.length} members
                </div>
            </div>

            {/* Table — compact padding so Actions column is always visible */}
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
    )
}
