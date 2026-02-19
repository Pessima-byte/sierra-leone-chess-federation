import Image from "next/image"
import Link from "next/link"
import {
    Search,
    Users,
    Trophy,
    Filter,
    Download,
    LayoutGrid,
    List,
    ChevronRight,
    ChevronLeft,
    Menu,
    Mail,
    Phone,
    MapPin,
    History,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import PlayerGamesDialog from "@/components/player-games-dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getSession, logout } from "@/app/actions/auth"

import { getMembers } from "@/lib/queries"

export default async function MembersPage() {
    const session = await getSession()
    const members = await getMembers()

    const totalMembers = members.length;
    const totalClubs = new Set(members.map(m => m.club)).size;

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
            {/* Navigation */}
            <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                                <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                            </div>
                            <span className="text-sm font-medium text-muted-foreground group-hover:text-white transition-colors hidden sm:block">Back to Home</span>
                        </Link>

                        <Link href="/" className="flex items-center gap-2 border-l border-white/10 pl-6">
                            <div className="relative w-8 h-8 md:w-10 md:h-10">
                                <div className="absolute inset-0 bg-gradient-to-tr from-green-500 to-blue-600 rounded-lg blur-lg opacity-50"></div>
                                <div className="relative w-full h-full bg-slate-950 rounded-lg border border-white/10 flex items-center justify-center overflow-hidden">
                                    <Image
                                        src="/images/logo.png"
                                        alt="SLCF Logo"
                                        width={40}
                                        height={40}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-lg leading-none tracking-tight">
                                    SLCF
                                </span>
                                <span className="text-[0.6rem] text-muted-foreground uppercase tracking-wider">
                                    Sierra Leone Chess
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10 backdrop-blur-md">
                        {[
                            { name: "Home", href: "/" },
                            { name: "Calendar", href: "/calendar" },
                            { name: "Members", href: "/members", active: true },
                            { name: "News", href: "/news" },
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${item.active
                                    ? "bg-white/10 text-white"
                                    : "text-muted-foreground hover:text-white hover:bg-white/10"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        {session ? (
                            <>
                                {session?.user?.role === "ADMIN" && (
                                    <Link href="/admin">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="hidden md:flex rounded-full border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 font-bold text-blue-400"
                                        >
                                            Admin Panel
                                        </Button>
                                    </Link>
                                )}
                                <Link href="/members">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="hidden md:flex rounded-full border-white/10 bg-white/5 hover:bg-white/10 font-bold text-white"
                                    >
                                        Dashboard
                                    </Button>
                                </Link>
                                <form action={logout}>
                                    <Button
                                        type="submit"
                                        size="sm"
                                        className="hidden md:flex bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white border-0 shadow-lg shadow-red-900/20 rounded-full font-bold"
                                    >
                                        Log Out
                                    </Button>
                                </form>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="hidden md:flex rounded-full border-white/10 bg-white/5 hover:bg-white/10 font-bold"
                                    >
                                        Log In
                                    </Button>
                                </Link>
                                <Link href="/login?mode=register">
                                    <Button
                                        size="sm"
                                        className="hidden md:flex bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white border-0 shadow-lg shadow-blue-900/20 rounded-full font-bold"
                                    >
                                        Join Federation
                                    </Button>
                                </Link>
                            </>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden text-muted-foreground"
                        >
                            <Menu className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-24">
                {/* Header Section */}
                <section className="container mx-auto px-4 mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-400">
                                <Users className="w-3.5 h-3.5" />
                                Federation Registry
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                                Federation <span className="text-blue-500">Members</span>
                            </h1>
                            <p className="text-muted-foreground max-w-2xl text-lg">
                                The official directory of registered chess players in Sierra Leone.
                                Search, filter, and discover the community of strategic thinkers.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="p-4 bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/10 text-center min-w-[120px]">
                                <div className="text-2xl font-bold">{totalMembers}</div>
                                <div className="text-xs text-muted-foreground uppercase tracking-wider">Total Members</div>
                            </div>
                            <div className="p-4 bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/10 text-center min-w-[120px]">
                                <div className="text-2xl font-bold">{totalClubs}</div>
                                <div className="text-xs text-muted-foreground uppercase tracking-wider">Active Clubs</div>
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
                                placeholder="Search member by name, ID or club..."
                                className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl focus:ring-blue-500/50"
                            />
                        </div>

                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <Button variant="outline" className="h-12 flex-1 md:flex-none border-white/10 bg-white/5 rounded-xl gap-2 hover:bg-white/10">
                                <Filter className="w-4 h-4" />
                                Filters
                            </Button>
                            <Button variant="outline" className="h-12 flex-1 md:flex-none border-white/10 bg-white/5 rounded-xl gap-2 hover:bg-white/10">
                                <Download className="w-4 h-4" />
                                Export
                            </Button>
                            <div className="h-12 w-[1px] bg-white/10 mx-2 hidden md:block"></div>
                            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-lg bg-blue-600 text-white hover:bg-blue-500">
                                    <List className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-lg text-muted-foreground hover:bg-white/5">
                                    <LayoutGrid className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Members Table */}
                <section className="container mx-auto px-4">
                    <div className="bg-slate-900/30 backdrop-blur-md rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
                        <Table>
                            <TableHeader className="bg-white/5">
                                <TableRow className="border-white/5 hover:bg-transparent">
                                    <TableHead className="w-[100px] py-6 px-8 text-xs font-bold uppercase tracking-widest text-muted-foreground">ID</TableHead>
                                    <TableHead className="py-6 px-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Member</TableHead>
                                    <TableHead className="py-6 px-4 text-xs font-bold uppercase tracking-widest text-muted-foreground text-center">Title</TableHead>
                                    <TableHead className="py-6 px-4 text-xs font-bold uppercase tracking-widest text-muted-foreground text-center">Elo Rating</TableHead>
                                    <TableHead className="py-6 px-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Club</TableHead>
                                    <TableHead className="py-6 px-4 text-xs font-bold uppercase tracking-widest text-muted-foreground text-center">Status</TableHead>
                                    <TableHead className="py-6 px-8 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {members.map((member) => (
                                    <TableRow key={member.id} className="border-white/5 hover:bg-white/[0.02] transition-colors group">
                                        <TableCell className="py-6 px-8 font-mono text-xs text-muted-foreground">
                                            {member.id}
                                        </TableCell>
                                        <TableCell className="py-6 px-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10 border border-white/10">
                                                    {member.image ? (
                                                        <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                                                    ) : (
                                                        <AvatarFallback className="bg-blue-900/20 text-blue-400 text-xs font-bold">
                                                            {member.name.split(' ').map(n => n[0]).join('')}
                                                        </AvatarFallback>
                                                    )}
                                                </Avatar>
                                                <div>
                                                    <Link href={`/members/${member.id}`} className="font-bold text-white hover:text-blue-400 transition-colors block">
                                                        {member.name}
                                                    </Link>
                                                    <div className="text-xs text-muted-foreground">Member since {member.joined}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-6 px-4 text-center">
                                            {member.title !== "None" ? (
                                                <Badge variant="outline" className="bg-blue-500/10 border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase">
                                                    {member.title}
                                                </Badge>
                                            ) : (
                                                <span className="text-xs text-muted-foreground italic">Unrated</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="py-6 px-4 text-center">
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 font-black text-sm text-blue-400 shadow-inner">
                                                <Trophy className="w-3.5 h-3.5 text-yellow-500" />
                                                {member.rating}
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-6 px-4">
                                            <div className="text-sm font-medium">{member.club}</div>
                                        </TableCell>
                                        <TableCell className="py-6 px-4 text-center">
                                            <div className="flex justify-center">
                                                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${member.status === 'Active'
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
                                                    <Button variant="ghost" size="sm" className="h-9 px-4 rounded-xl hover:bg-blue-600 hover:text-white group/btn">
                                                        Details
                                                        <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-0.5" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Pagination / Footer */}
                        <div className="p-8 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
                            <div className="text-sm text-muted-foreground">
                                Showing <span className="text-white font-medium">{members.length}</span> of <span className="text-white font-medium">{totalMembers}</span> members
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" className="h-10 rounded-xl border-white/10 bg-white/5" disabled>Previous</Button>
                                <div className="flex gap-1">
                                    <Button variant="ghost" className="h-10 w-10 rounded-xl bg-blue-600 text-white">1</Button>
                                </div>
                                <Button variant="outline" size="sm" className="h-10 rounded-xl border-white/10 bg-white/5" disabled>Next</Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-black border-t border-white/10 pt-16 pb-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-xs">SL</div>
                                <span className="font-bold text-lg">SLCF</span>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                The official governing body for chess in Sierra Leone. Affiliation with FIDE and the Africa Chess Confederation.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-bold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><Link href="/#home" className="hover:text-white transition-colors">About Us</Link></li>
                                <li><Link href="/#players" className="hover:text-white transition-colors">Rankings</Link></li>
                                <li><Link href="/news" className="hover:text-white transition-colors">News Transmission</Link></li>
                                <li><Link href="/members" className="hover:text-white transition-colors">Membership</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-4">Resources</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><Link href="#" className="hover:text-white transition-colors">Learn Chess</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">FIDE Laws</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Arbiter's Corner</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Download PGNs</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-4">Contact</h4>
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                <li className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-green-500" />
                                    15 Siaka Stevens St, Freetown
                                </li>
                                <li className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-blue-500" />
                                    info@slchess.org
                                </li>
                                <li className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-purple-500" />
                                    +232 76 123 456
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                        <p>© 2025 Sierra Leone Chess Federation. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            <Link href="#" className="hover:text-white">Privacy Policy</Link>
                            <Link href="#" className="hover:text-white">Terms of Service</Link>
                            <Link href="#" className="hover:text-white">Cookie Policy</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
