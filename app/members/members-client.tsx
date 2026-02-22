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
        const filtered = members.filter(member => {
            const matchesSearch =
                member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.id.toLowerCase().includes(searchQuery.toLowerCase())

            const matchesStatus =
                statusFilter === 'All' || member.status === statusFilter

            return matchesSearch && matchesStatus
        })

        // Members with images always surface first so the first 3 pages
        // show real profile photos by default. Within each group, rating order
        // (already applied server-side) is preserved.
        return filtered.sort((a, b) => {
            const aHasImage = !!(a.image && a.image.trim())
            const bHasImage = !!(b.image && b.image.trim())
            if (aHasImage === bHasImage) return 0
            return aHasImage ? -1 : 1
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

                    <h1 className="text-[2.5rem] md:text-8xl font-black tracking-tighter leading-[1.05] md:leading-[1.1] mb-6 drop-shadow-2xl text-white uppercase italic">
                        The Federation <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 pr-2">Thinkers</span>
                    </h1>

                    <p className="text-slate-400 text-sm md:text-xl max-w-sm md:max-w-2xl font-medium leading-relaxed mb-10 md:mb-14 px-4 md:px-0">
                        Discover the strategic minds, elite combatants, and emerging talents within the official Sierra Leone Chess Federation registry.
                    </p>

                    {/* Glassmorphic Stats Bar — Reorganized for Desktop Excellence */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-2 md:p-3 shadow-[0_30px_100px_rgba(0,0,0,0.4)] overflow-hidden divide-x divide-y lg:divide-y-0 divide-white/5 w-full max-w-6xl">
                        <div className="p-6 md:p-10 relative group overflow-hidden transition-all hover:bg-white/[0.02] text-center border-white/5">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-1 relative z-10 transition-transform group-hover:scale-110 duration-500 transform-gpu">{members.length}</div>
                            <div className="text-[8px] md:text-[11px] font-black text-blue-400/80 uppercase tracking-[0.2em] relative z-10 italic">Personnel</div>
                        </div>
                        <div className="p-6 md:p-10 relative group overflow-hidden transition-all hover:bg-white/[0.02] text-center border-white/5 border-l-0 lg:border-l">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-1 relative z-10 transition-transform group-hover:scale-110 duration-500 transform-gpu">{new Set(members.map(m => m.club)).size}</div>
                            <div className="text-[8px] md:text-[11px] font-black text-emerald-400/80 uppercase tracking-[0.2em] relative z-10 italic">Active Hubs</div>
                        </div>
                        <div className="p-6 md:p-10 relative group overflow-hidden transition-all hover:bg-white/[0.02] text-center border-white/5 border-t lg:border-t-0">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-1 relative z-10 transition-transform group-hover:scale-110 duration-500 transform-gpu">
                                {members.filter(m => m.title !== "None" && m.title !== "Unrated").length}
                            </div>
                            <div className="text-[8px] md:text-[11px] font-black text-purple-400/80 uppercase tracking-[0.2em] relative z-10 italic">Titled Class</div>
                        </div>
                        <div className="p-6 md:p-10 relative group overflow-hidden transition-all hover:bg-white/[0.02] text-center border-white/5 border-l-0 lg:border-l border-t lg:border-t-0">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-1 relative z-10 transition-transform group-hover:scale-110 duration-500 transform-gpu">
                                {members.filter(m => m.rating >= 1800).length}
                            </div>
                            <div className="text-[8px] md:text-[11px] font-black text-orange-400/80 uppercase tracking-[0.2em] relative z-10 italic">Elite Corps</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 mb-6">
                <div className="p-3 md:p-4 bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-white/10 flex flex-col md:flex-row gap-3 md:gap-4 items-center justify-between shadow-xl">
                    <div className="relative w-full md:max-w-md group">
                        <div className="absolute inset-0 bg-blue-500/5 blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                        <Input
                            placeholder="Directory ID or Name..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value)
                                setCurrentPage(1)
                            }}
                            className="pl-10 h-11 md:h-12 bg-white/[0.03] border-white/10 rounded-2xl focus:ring-1 focus:ring-blue-500/30 transition-all text-xs placeholder:text-slate-600 font-bold backdrop-blur-md"
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <div className="flex items-center gap-2 flex-1 md:flex-none">
                            <Button
                                onClick={toggleFilter}
                                variant="outline"
                                className={`h-11 md:h-12 flex-1 md:px-6 border-white/10 rounded-2xl gap-2 hover:bg-white/10 font-black uppercase tracking-widest text-[9px] transition-all ${statusFilter !== 'All' ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white/5 text-slate-400'}`}
                            >
                                <Filter className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">{statusFilter === 'All' ? 'Filter' : statusFilter}</span>
                                <span className="sm:hidden">{statusFilter === 'All' ? 'Filter' : statusFilter}</span>
                            </Button>
                            <Button
                                onClick={handleExport}
                                variant="outline"
                                className="h-11 md:h-12 px-5 md:px-6 border-white/10 bg-white/5 rounded-2xl gap-2 hover:bg-white/10 font-black uppercase tracking-widest text-[9px] text-slate-400 transition-all"
                            >
                                <Download className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Export</span>
                            </Button>
                        </div>

                        <div className="h-11 md:h-12 w-[1px] bg-white/10 mx-1 hidden md:block"></div>

                        <div className="flex bg-white/[0.03] p-1 rounded-2xl border border-white/10 backdrop-blur-md shrink-0 shadow-inner">
                            <Button
                                onClick={() => setViewMode('list')}
                                variant="ghost"
                                size="icon"
                                className={`h-9 w-9 md:h-10 md:w-10 rounded-xl transition-all duration-300 ${viewMode === 'list' ? 'bg-white/10 text-white shadow-xl' : 'text-slate-600 hover:text-white'}`}
                            >
                                <List className="w-4 h-4" />
                            </Button>
                            <Button
                                onClick={() => setViewMode('grid')}
                                variant="ghost"
                                size="icon"
                                className={`h-9 w-9 md:h-10 md:w-10 rounded-xl transition-all duration-300 ${viewMode === 'grid' ? 'bg-white/10 text-white shadow-xl' : 'text-slate-600 hover:text-white'}`}
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
                            <div key={member.id} className="group relative bg-slate-900/40 backdrop-blur-md rounded-2xl md:rounded-3xl border border-white/5 p-3 md:p-4 hover:bg-slate-800/60 hover:border-blue-500/30 transition-all duration-300">
                                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-center">
                                    <div className="md:col-span-1 font-mono text-[10px] md:text-xs text-slate-500 flex items-center justify-between md:block px-1">
                                        <span className="md:hidden text-[8px] uppercase tracking-widest font-black text-slate-600">ID</span>
                                        {member.id}
                                    </div>

                                    <div className="md:col-span-4 flex items-center gap-3 md:gap-4">
                                        <div className="relative shrink-0">
                                            <Avatar className="h-10 w-10 md:h-12 md:w-12 border border-white/10 shadow-lg relative rounded-full">
                                                {member.image ? (
                                                    <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                                                ) : (
                                                    <AvatarFallback className="bg-slate-800 text-blue-400 text-[10px] md:text-xs font-black">
                                                        {member.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                )}
                                            </Avatar>
                                        </div>
                                        <div>
                                            <Link href={`/members/${member.id}`} className="font-black text-sm md:text-base text-white hover:text-blue-400 transition-colors uppercase tracking-tight line-clamp-1">
                                                {member.name}
                                            </Link>
                                            <div className="text-[8px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Active Hub</div>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2 flex justify-between md:justify-center items-center">
                                        <span className="md:hidden text-[8px] uppercase tracking-widest font-black text-slate-600">Title</span>
                                        {member.title !== "None" && member.title !== "Unrated" ? (
                                            <Badge variant="outline" className="bg-blue-900/40 border-blue-500/30 text-blue-400 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] px-2 py-0.5">
                                                {member.title}
                                            </Badge>
                                        ) : (
                                            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Unrated</span>
                                        )}
                                    </div>

                                    <div className="md:col-span-3 flex justify-between md:justify-center items-center">
                                        <span className="md:hidden text-[8px] uppercase tracking-widest font-black text-slate-600">Ratings</span>
                                        <div className="flex items-center gap-2 md:gap-3">
                                            <span className="text-xs font-black text-blue-400">{member.rating > 0 ? member.rating : '-'}</span>
                                            <div className="w-px h-3 bg-white/10"></div>
                                            <span className="text-xs font-black text-emerald-400">{member.rapidRating > 0 ? member.rapidRating : '-'}</span>
                                            <div className="w-px h-3 bg-white/10"></div>
                                            <span className="text-xs font-black text-purple-400">{member.blitzRating > 0 ? member.blitzRating : '-'}</span>
                                        </div>
                                    </div>

                                    <div className="md:col-span-1 flex justify-between md:justify-center items-center">
                                        <span className="md:hidden text-[8px] uppercase tracking-widest font-black text-slate-600">Status</span>
                                        <div className={`w-2 h-2 rounded-full ${member.status === 'Active' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                                    </div>

                                    <div className="md:col-span-1 flex justify-end items-center gap-2 pt-2 md:pt-0 border-t border-white/5 md:border-t-0">
                                        <Link href={`/members/${member.id}`} className="w-full md:w-auto">
                                            <Button variant="ghost" size="sm" className="w-full md:w-10 h-8 md:h-10 rounded-xl hover:bg-blue-600 border border-white/5 transition-all text-[9px] uppercase font-black">
                                                <span className="md:hidden pr-2">Profile</span>
                                                <ChevronRight className="w-4 h-4" />
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
                            <div key={member.id} className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-[2.5rem] p-4 md:p-6 hover:bg-slate-800/60 hover:border-blue-500/30 transition-all duration-500 group relative overflow-hidden flex flex-col h-full shadow-2xl">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[50px] -mr-12 -mt-12 group-hover:bg-blue-500/20 transition-all duration-700"></div>

                                <div className="relative z-10 flex items-start justify-between mb-6 md:mb-8">
                                    <div className="relative">
                                        <Avatar className="h-14 w-14 md:h-20 md:w-20 border-2 border-white/10 shadow-2xl rounded-full">
                                            {member.image ? (
                                                <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                                            ) : (
                                                <AvatarFallback className="bg-slate-800 text-blue-400 text-sm md:text-xl font-black">
                                                    {member.name.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            )}
                                        </Avatar>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <div className={`w-2 h-2 rounded-full ${member.status === 'Active' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                                        {member.title !== "None" && (
                                            <Badge className="bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg border border-white/10">
                                                {member.title}
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                <div className="relative z-10 flex-1 space-y-4">
                                    <div>
                                        <Link href={`/members/${member.id}`} className="block text-lg md:text-2xl font-black tracking-tight text-white hover:text-blue-400 transition-colors uppercase leading-tight line-clamp-1 mb-1">
                                            {member.name}
                                        </Link>
                                        <div className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                            ID :: {member.id}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-1 md:gap-2 p-3 md:p-4 bg-black/40 rounded-xl md:rounded-2xl border border-white/5">
                                        <div className="flex flex-col items-center">
                                            <div className="text-[7px] md:text-[8px] font-black text-slate-500 uppercase tracking-widest mb-0.5">STD</div>
                                            <div className="text-sm md:text-lg font-black text-blue-400">{member.rating > 0 ? member.rating : '-'}</div>
                                        </div>
                                        <div className="flex flex-col items-center border-x border-white/5">
                                            <div className="text-[7px] md:text-[8px] font-black text-slate-500 uppercase tracking-widest mb-0.5">RPD</div>
                                            <div className="text-sm md:text-lg font-black text-emerald-400">{member.rapidRating > 0 ? member.rapidRating : '-'}</div>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="text-[7px] md:text-[8px] font-black text-slate-500 uppercase tracking-widest mb-0.5">BLZ</div>
                                            <div className="text-sm md:text-lg font-black text-purple-400">{member.blitzRating > 0 ? member.blitzRating : '-'}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative z-10 pt-4 mt-4 border-t border-white/5">
                                    <Link href={`/members/${member.id}`} className="block">
                                        <Button className="w-full bg-white/[0.03] hover:bg-blue-600 text-white border border-white/10 font-black text-[9px] uppercase tracking-widest rounded-xl h-10 transition-all">
                                            View Profile
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                <div className="mt-8 p-4 md:p-8 bg-slate-900/30 backdrop-blur-xl border border-white/10 rounded-[1.5rem] md:rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
                    <div className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">
                        View <span className="text-white">{Math.min(paginatedMembers.length, itemsPerPage)}</span> of <span className="text-white">{filteredMembers.length}</span> Members
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="h-9 md:h-10 px-4 rounded-xl border-white/10 bg-white/5 font-black uppercase text-[8px] md:text-[10px] tracking-widest disabled:opacity-30"
                        >
                            Prev
                        </Button>
                        <div className="flex gap-1">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <Button
                                    key={i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                    variant="ghost"
                                    className={`h-9 w-9 md:h-10 md:w-10 rounded-xl font-black text-[9px] md:text-[10px] transition-all ${currentPage === i + 1 ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' : 'text-slate-500 hover:bg-white/5'}`}
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
                            className="h-9 md:h-10 px-4 rounded-xl border-white/10 bg-white/5 font-black uppercase text-[8px] md:text-[10px] tracking-widest disabled:opacity-30"
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
