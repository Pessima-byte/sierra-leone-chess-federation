"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
    Search,
    Trophy,
    Filter,
    Download,
    LayoutGrid,
    List,
    ChevronRight,
    Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import PlayerGamesDialog from "@/components/player-games-dialog"

interface Member {
    id: string
    name: string
    title: string
    rating: number
    club: string
    status: string
    joined: string
    image?: string | null
    games?: any[]
}

export default function MembersClient({ members }: { members: Member[] }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
    const [currentPage, setCurrentPage] = useState(1)
    const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All')
    const itemsPerPage = 6

    const filteredMembers = useMemo(() => {
        return members.filter(member => {
            const matchesSearch =
                member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.id.toLowerCase().includes(searchQuery.toLowerCase())

            const matchesStatus =
                statusFilter === 'All' || member.status === statusFilter

            return matchesSearch && matchesStatus
        })
    }, [members, searchQuery, statusFilter])

    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage)
    const paginatedMembers = filteredMembers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const handleExport = () => {
        toast.info("Initializing Export", {
            description: "Generating CSV for federation directory...",
            className: "bg-slate-900 border-white/10 text-white",
        })
        // Mock download
        setTimeout(() => {
            toast.success("Export Complete", {
                description: "SLCF_Registry_Export.csv has been downloaded.",
            })
        }, 1500)
    }

    const toggleFilter = () => {
        const nextStatus = statusFilter === 'All' ? 'Active' : statusFilter === 'Active' ? 'Inactive' : 'All'
        setStatusFilter(nextStatus)
        setCurrentPage(1)
        toast.info(`Filter: ${nextStatus} Members`, {
            className: "bg-slate-900 border-white/10 text-white",
        })
    }

    return (
        <div className="space-y-8">
            {/* Stats Overview */}
            <section className="container mx-auto px-4 mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 uppercase">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-400 font-bold tracking-widest italic">
                            <Users className="w-3.5 h-3.5" />
                            Federation Registry
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter">
                            FEDERATION <span className="text-blue-500 not-italic">MEMBERS</span>
                        </h1>
                        <p className="text-muted-foreground max-w-2xl text-lg normal-case">
                            The official directory of registered chess players in Sierra Leone.
                            Search, filter, and discover the community of strategic thinkers.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="p-4 bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/10 text-center min-w-[120px]">
                            <div className="text-2xl font-black italic">{members.length}</div>
                            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">Total Members</div>
                        </div>
                        <div className="p-4 bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/10 text-center min-w-[120px]">
                            <div className="text-2xl font-black italic">{new Set(members.map(m => m.club)).size}</div>
                            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">Active Clubs</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Controls Section */}
            <section className="container mx-auto px-4 mb-8">
                <div className="p-4 bg-slate-900/40 backdrop-blur-xl rounded-[2rem] border border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search member by name or ID..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value)
                                setCurrentPage(1)
                            }}
                            className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl focus:ring-blue-500/50"
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <Button
                            onClick={toggleFilter}
                            variant="outline"
                            className={`h-12 flex-1 md:flex-none border-white/10 rounded-xl gap-2 hover:bg-white/10 font-bold uppercase tracking-widest text-[10px] ${statusFilter !== 'All' ? 'bg-blue-600/20 border-blue-500/50 text-blue-400' : 'bg-white/5'}`}
                        >
                            <Filter className="w-4 h-4" />
                            {statusFilter === 'All' ? 'Filters' : statusFilter}
                        </Button>
                        <Button
                            onClick={handleExport}
                            variant="outline"
                            className="h-12 flex-1 md:flex-none border-white/10 bg-white/5 rounded-xl gap-2 hover:bg-white/10 font-bold uppercase tracking-widest text-[10px]"
                        >
                            <Download className="w-4 h-4" />
                            Export
                        </Button>
                        <div className="h-12 w-[1px] bg-white/10 mx-2 hidden md:block"></div>
                        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                            <Button
                                onClick={() => setViewMode('list')}
                                variant="ghost"
                                size="icon"
                                className={`h-10 w-10 rounded-lg transition-all ${viewMode === 'list' ? 'bg-blue-600 text-white shadow-lg' : 'text-muted-foreground hover:bg-white/5'}`}
                            >
                                <List className="w-4 h-4" />
                            </Button>
                            <Button
                                onClick={() => setViewMode('grid')}
                                variant="ghost"
                                size="icon"
                                className={`h-10 w-10 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow-lg' : 'text-muted-foreground hover:bg-white/5'}`}
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="container mx-auto px-4">
                {viewMode === 'list' ? (
                    <div className="bg-slate-900/30 backdrop-blur-md rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
                        <Table>
                            <TableHeader className="bg-white/5">
                                <TableRow className="border-white/5 hover:bg-transparent">
                                    <TableHead className="w-[100px] py-6 px-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">ID</TableHead>
                                    <TableHead className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Member</TableHead>
                                    <TableHead className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Title</TableHead>
                                    <TableHead className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Elo Rating</TableHead>
                                    <TableHead className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Status</TableHead>
                                    <TableHead className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedMembers.map((member) => (
                                    <TableRow key={member.id} className="border-white/5 hover:bg-white/[0.02] transition-colors group">
                                        <TableCell className="py-6 px-8 font-mono text-xs text-muted-foreground">
                                            {member.id}
                                        </TableCell>
                                        <TableCell className="py-6 px-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10 border border-white/10 shadow-lg">
                                                    {member.image ? (
                                                        <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                                                    ) : (
                                                        <AvatarFallback className="bg-blue-900/20 text-blue-400 text-xs font-black italic">
                                                            {member.name.split(' ').map(n => n[0]).join('')}
                                                        </AvatarFallback>
                                                    )}
                                                </Avatar>
                                                <div>
                                                    <Link href={`/members/${member.id}`} className="font-black italic text-white hover:text-blue-400 transition-colors block uppercase tracking-tight">
                                                        {member.name}
                                                    </Link>
                                                    <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Member since {member.joined}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-6 px-4 text-center">
                                            {member.title !== "None" ? (
                                                <Badge variant="outline" className="bg-blue-500/10 border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-wider italic">
                                                    {member.title}
                                                </Badge>
                                            ) : (
                                                <span className="text-[10px] font-black text-muted-foreground italic uppercase opacity-50 tracking-widest">Unrated</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="py-6 px-4 text-center">
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 font-black text-sm text-blue-400 shadow-inner italic">
                                                <Trophy className="w-3.5 h-3.5 text-yellow-500" />
                                                {member.rating}
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-6 px-4 text-center">
                                            <div className="flex justify-center">
                                                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${member.status === 'Active'
                                                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                                    }`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${member.status === 'Active' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                                                    {member.status}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-6 px-8 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <PlayerGamesDialog games={(member.games as any) || []} playerName={member.name} variant="icon" />
                                                <Link href={`/members/${member.id}`}>
                                                    <Button variant="ghost" size="sm" className="h-9 px-4 rounded-xl hover:bg-blue-600 hover:text-white group/btn font-bold text-[10px] uppercase tracking-widest border border-white/5">
                                                        Details
                                                        <ChevronRight className="w-3 h-3 ml-1 transition-transform group-hover/btn:translate-x-0.5" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedMembers.map((member) => (
                            <div key={member.id} className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 hover:bg-white/5 transition-all group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl -mr-16 -mt-16 group-hover:bg-blue-600/20 transition-all duration-500"></div>

                                <div className="flex items-start justify-between mb-6">
                                    <Avatar className="h-16 w-16 border-2 border-white/10 shadow-2xl">
                                        {member.image ? (
                                            <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                                        ) : (
                                            <AvatarFallback className="bg-blue-900/20 text-blue-400 text-lg font-black italic">
                                                {member.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        )}
                                    </Avatar>
                                    <div className="flex flex-col items-end gap-2">
                                        <Badge variant="outline" className={`bg-white/5 border-white/10 text-[10px] font-black uppercase italic tracking-widest ${member.status === 'Active' ? 'text-green-400' : 'text-red-400'}`}>
                                            {member.status}
                                        </Badge>
                                        {member.title !== "None" && (
                                            <Badge className="bg-blue-600 text-white text-[10px] font-black uppercase italic tracking-widest shadow-lg shadow-blue-600/20">
                                                {member.title}
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <Link href={`/members/${member.id}`} className="text-xl font-black italic tracking-tighter text-white hover:text-blue-400 transition-colors uppercase">
                                            {member.name}
                                        </Link>
                                        <div className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">ID: {member.id}</div>
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                        <div className="flex items-center gap-2">
                                            <Trophy className="w-4 h-4 text-yellow-500" />
                                            <span className="text-xl font-black italic text-blue-400 tracking-tighter">{member.rating}</span>
                                        </div>
                                        <div className="text-[10px] font-bold text-muted-foreground uppercase">since {member.joined}</div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 pt-2">
                                        <PlayerGamesDialog games={(member.games as any) || []} playerName={member.name} variant="button" />
                                        <Link href={`/members/${member.id}`} className="w-full">
                                            <Button variant="outline" className="w-full h-10 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 font-bold text-[10px] uppercase tracking-widest">
                                                Details
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                <div className="mt-12 p-8 bg-slate-900/30 backdrop-blur-xl border border-white/10 rounded-[2rem] flex items-center justify-between shadow-xl">
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        Showing <span className="text-white">{Math.min(paginatedMembers.length, itemsPerPage)}</span> of <span className="text-white">{filteredMembers.length}</span> terminals
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="h-10 rounded-xl border-white/10 bg-white/5 font-black uppercase text-[10px] tracking-widest disabled:opacity-30"
                        >
                            Previous
                        </Button>
                        <div className="flex gap-1">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <Button
                                    key={i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                    variant="ghost"
                                    className={`h-10 w-10 rounded-xl font-black text-[10px] transition-all ${currentPage === i + 1 ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30 ring-2 ring-blue-500/20' : 'text-muted-foreground hover:bg-white/5'}`}
                                >
                                    {i + 1}
                                </Button>
                            ))}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className="h-10 rounded-xl border-white/10 bg-white/5 font-black uppercase text-[10px] tracking-widest disabled:opacity-30"
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
