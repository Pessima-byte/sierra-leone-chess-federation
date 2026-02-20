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
    Sparkles,
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
    rapidRating: number
    blitzRating: number
    club: string
    status: string
    joined: string
    image?: string | null
    games?: any[]
}

export default function MembersClient({ members }: { members: Member[] }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid')
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
            {/* Breath-taking Members Header */}
            <section className="relative container mx-auto px-4 mb-20 pt-16 pb-8 flex flex-col items-center text-center">
                {/* Beautiful Background glow */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
                    <div className="flex items-center gap-3 px-5 py-2 mb-8 rounded-full bg-slate-900/80 border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.15)] backdrop-blur-xl">
                        <Users className="w-4 h-4 text-blue-400" />
                        <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Official Database</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse ml-1"></div>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[1.1] mb-6 drop-shadow-2xl text-white">
                        The Federation <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 italic pr-2">Thinkers</span>
                    </h1>

                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-14">
                        Discover the strategic minds, elite combatants, and emerging talents within the official Sierra Leone Chess Federation registry.
                    </p>

                    {/* Glassmorphic Stats Bar */}
                    <div className="flex flex-col md:flex-row bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-2 shadow-2xl overflow-hidden md:divide-x divide-white/5 w-full max-w-4xl">
                        <div className="flex-1 p-8 relative group overflow-hidden rounded-2xl md:rounded-r-none">
                            <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-500"></div>
                            <div className="text-6xl font-black text-white tracking-tighter mb-2 relative z-10">{members.length}</div>
                            <div className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] relative z-10">Total Registered</div>
                        </div>
                        <div className="flex-1 p-8 relative group overflow-hidden rounded-2xl md:rounded-none border-t md:border-t-0 border-white/5">
                            <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/10 transition-colors duration-500"></div>
                            <div className="text-6xl font-black text-white tracking-tighter mb-2 relative z-10">{new Set(members.map(m => m.club)).size}</div>
                            <div className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] relative z-10">Active Hubs & Clubs</div>
                        </div>
                        <div className="flex-1 p-8 relative group overflow-hidden rounded-2xl md:rounded-l-none border-t md:border-t-0 border-white/5">
                            <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 transition-colors duration-500"></div>
                            <div className="text-6xl font-black text-white tracking-tighter mb-2 relative z-10">
                                {members.filter(m => m.title !== "None" && m.title !== "Unrated").length}
                            </div>
                            <div className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em] relative z-10">Titled Masters</div>
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
                    <div className="space-y-4">
                        <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border-b border-white/5">
                            <div className="col-span-1">ID</div>
                            <div className="col-span-4">Member</div>
                            <div className="col-span-2 text-center">Title</div>
                            <div className="col-span-3 text-center">Ratings (STD/R/B)</div>
                            <div className="col-span-1 text-center">Status</div>
                            <div className="col-span-1 text-right">Action</div>
                        </div>

                        {paginatedMembers.map((member) => (
                            <div key={member.id} className="group relative bg-slate-900/40 backdrop-blur-md rounded-3xl border border-white/5 p-4 hover:bg-slate-800/60 hover:border-blue-500/30 transition-all duration-300">
                                {/* Hover glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>

                                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                    <div className="md:col-span-1 font-mono text-xs text-slate-500 px-4 md:px-2 flex items-center justify-between md:block">
                                        <span className="md:hidden text-[10px] uppercase tracking-widest font-black text-slate-600">ID</span>
                                        {member.id}
                                    </div>

                                    <div className="md:col-span-4 flex items-center gap-4 px-4 md:px-0">
                                        <div className="relative">
                                            <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500 to-emerald-500 rounded-full blur opacity-0 group-hover:opacity-40 transition duration-500"></div>
                                            <Avatar className="h-12 w-12 border border-white/10 shadow-lg relative rounded-full">
                                                {member.image ? (
                                                    <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                                                ) : (
                                                    <AvatarFallback className="bg-slate-800 text-blue-400 text-xs font-black">
                                                        {member.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                )}
                                            </Avatar>
                                        </div>
                                        <div>
                                            <Link href={`/members/${member.id}`} className="font-black text-base text-white hover:text-blue-400 transition-colors uppercase tracking-tight line-clamp-1">
                                                {member.name}
                                            </Link>
                                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-0.5">Active since {member.joined.split(' ')[member.joined.split(' ').length - 1]}</div>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2 flex justify-between md:justify-center items-center px-4 md:px-0">
                                        <span className="md:hidden text-[10px] uppercase tracking-widest font-black text-slate-600">Title</span>
                                        {member.title !== "None" && member.title !== "Unrated" ? (
                                            <Badge variant="outline" className="bg-blue-900/40 border-blue-500/30 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(59,130,246,0.1)] px-3 py-1">
                                                {member.title}
                                            </Badge>
                                        ) : (
                                            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Unrated</span>
                                        )}
                                    </div>

                                    <div className="md:col-span-3 flex justify-between md:justify-center items-center px-4 md:px-0">
                                        <span className="md:hidden text-[10px] uppercase tracking-widest font-black text-slate-600">Ratings</span>
                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col items-center">
                                                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">STD</span>
                                                <span className="text-sm font-black text-blue-400">{member.rating > 0 ? member.rating : '-'}</span>
                                            </div>
                                            <div className="w-px h-6 bg-white/5"></div>
                                            <div className="flex flex-col items-center">
                                                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">RAPID</span>
                                                <span className="text-sm font-black text-emerald-400">{member.rapidRating > 0 ? member.rapidRating : '-'}</span>
                                            </div>
                                            <div className="w-px h-6 bg-white/5"></div>
                                            <div className="flex flex-col items-center">
                                                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">BLITZ</span>
                                                <span className="text-sm font-black text-purple-400">{member.blitzRating > 0 ? member.blitzRating : '-'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:col-span-1 flex justify-between md:justify-center items-center px-4 md:px-0">
                                        <span className="md:hidden text-[10px] uppercase tracking-widest font-black text-slate-600">Status</span>
                                        <Badge variant="outline" className={`bg-black/50 border-white/10 text-[9px] font-black uppercase tracking-[0.2em] px-2 py-1 ${member.status === 'Active' ? 'text-green-400 border-green-500/20' : 'text-red-400 border-red-500/20'}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full mr-1.5 inline-block ${member.status === 'Active' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                                            {member.status === 'Active' ? 'ACT' : 'OFF'}
                                        </Badge>
                                    </div>

                                    <div className="md:col-span-1 flex justify-end items-center gap-2 px-4 md:px-2 pt-4 md:pt-0 mt-4 md:mt-0 border-t border-white/5 md:border-t-0">
                                        <PlayerGamesDialog games={(member.games as any) || []} playerName={member.name} variant="icon" />
                                        <Link href={`/members/${member.id}`}>
                                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-blue-600 border border-transparent group-hover:border-white/10 transition-all text-slate-400 hover:text-white">
                                                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedMembers.map((member) => (
                            <div key={member.id} className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 hover:bg-slate-800/60 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-500 group relative overflow-hidden flex flex-col h-full">
                                {/* Decorative background elements */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/10 blur-[60px] -mr-16 -mt-16 group-hover:bg-blue-500/30 transition-all duration-700"></div>
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-600/5 blur-[50px] -ml-16 -mb-16 group-hover:bg-emerald-500/20 transition-all duration-700"></div>

                                {/* Top Section: Avatar & Badges */}
                                <div className="relative z-10 flex items-start justify-between mb-8">
                                    <div className="relative">
                                        <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500 to-emerald-500 rounded-full blur opacity-20 group-hover:opacity-70 transition duration-700"></div>
                                        <Avatar className="relative h-20 w-20 border-2 border-white/10 shadow-2xl rounded-full">
                                            {member.image ? (
                                                <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                                            ) : (
                                                <AvatarFallback className="bg-slate-800 text-blue-400 text-xl font-black">
                                                    {member.name.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            )}
                                        </Avatar>
                                    </div>
                                    <div className="flex flex-col items-end gap-2.5">
                                        <Badge variant="outline" className={`bg-black/50 backdrop-blur-md border-white/10 text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 ${member.status === 'Active' ? 'text-green-400 shadow-[0_0_10px_rgba(74,222,128,0.1)] border-green-500/20' : 'text-red-400 shadow-[0_0_10px_rgba(248,113,113,0.1)] border-red-500/20'}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full mr-2 inline-block ${member.status === 'Active' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                                            {member.status}
                                        </Badge>
                                        {member.title !== "None" && (
                                            <Badge className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 shadow-lg shadow-blue-500/30 border border-blue-400/30">
                                                {member.title}
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                {/* Main Info Section */}
                                <div className="relative z-10 flex-1 space-y-6">
                                    <div>
                                        <Link href={`/members/${member.id}`} className="block text-2xl font-black tracking-tight text-white hover:text-blue-400 transition-colors uppercase leading-tight line-clamp-1 mb-1.5">
                                            {member.name}
                                        </Link>
                                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                                            TERMINAL :: <span className="text-slate-400">{member.id}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 p-4 bg-black/40 rounded-2xl border border-white/5 drop-shadow-md">
                                        <div className="flex flex-col items-center">
                                            <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Standard</div>
                                            <div className="text-lg font-black text-blue-400">{member.rating > 0 ? member.rating : '-'}</div>
                                        </div>
                                        <div className="flex flex-col items-center border-x border-white/5">
                                            <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Rapid</div>
                                            <div className="text-lg font-black text-emerald-400">{member.rapidRating > 0 ? member.rapidRating : '-'}</div>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Blitz</div>
                                            <div className="text-lg font-black text-purple-400">{member.blitzRating > 0 ? member.blitzRating : '-'}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Action */}
                                <div className="relative z-10 pt-6 mt-6 border-t border-white/5 flex gap-3">
                                    <PlayerGamesDialog games={(member.games as any) || []} playerName={member.name} variant="icon" />
                                    <Link href={`/members/${member.id}`} className="flex-1">
                                        <Button className="w-full bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/30 font-black text-[10px] uppercase tracking-[0.2em] rounded-xl h-11 transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500">
                                            Access Profile
                                        </Button>
                                    </Link>
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
