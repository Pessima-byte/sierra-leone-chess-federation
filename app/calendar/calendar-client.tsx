"use client"

import { useState, useRef, useMemo, Suspense, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Trophy,
    MapPin,
    Clock,
    Filter,
    Plus,
    Search,
    Share2,
    CalendarDays,
    LayoutList,
    Sparkles,
    ArrowUpRight,
    User,
    Globe,
    Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { type CalendarEvent } from "@/lib/calendar-data"
import { logout } from "@/app/actions/auth"

export default function CalendarPage({ initialEvents, session }: { initialEvents: CalendarEvent[], session: any }) {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Initializing Timeline...</div>}>
            <CalendarContent initialEvents={initialEvents} session={session} />
        </Suspense>
    )
}

function CalendarContent({ initialEvents, session }: { initialEvents: CalendarEvent[], session: any }) {
    const searchParams = useSearchParams()
    const [view, setView] = useState<'grid' | 'list'>('grid')
    const [typeFilter, setTypeFilter] = useState<'all' | 'Tournament' | 'Training' | 'Meeting'>('all')
    const [statusFilter, setStatusFilter] = useState<'Upcoming' | 'Archived' | 'All'>('Upcoming')
    const [searchQuery, setSearchQuery] = useState("")
    const eventsRef = useRef<HTMLDivElement>(null)

    // Set initial filter from URL params
    useEffect(() => {
        const type = searchParams.get('type')
        if (type && ['Tournament', 'Training', 'Meeting'].includes(type)) {
            setTypeFilter(type as any)
        }
    }, [searchParams])

    const filteredEvents = useMemo(() => {
        return initialEvents.filter(event => {
            const matchesType = typeFilter === 'all' || event.type === typeFilter
            const matchesStatus = statusFilter === 'All' ||
                (statusFilter === 'Upcoming' && (event.status === 'Upcoming' || event.status === 'Ongoing')) ||
                (statusFilter === 'Archived' && event.status === 'Completed')
            const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
            return matchesType && matchesStatus && matchesSearch
        })
    }, [typeFilter, statusFilter, searchQuery])

    const scrollToEvents = () => {
        eventsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'SLCF Events Calendar',
                text: 'Check out the upcoming chess events in Sierra Leone!',
                url: window.location.href,
            })
        } else {
            alert('Sharing is not supported on this browser. URL copied to clipboard!')
            navigator.clipboard.writeText(window.location.href)
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500 selection:text-white pb-24 overflow-x-hidden">
            {/* Futuristic Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-600/10 blur-[120px] rounded-full animate-pulse-slow animation-delay-2000"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
            </div>

            {/* Header */}
            <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                                <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                            </div>
                            <span className="text-sm font-medium text-muted-foreground group-hover:text-white transition-colors hidden sm:block">Back to Home</span>
                        </Link>

                        <Link href="/" className="flex items-center gap-3 group border-l border-white/10 pl-6">
                            <div className="relative w-10 h-10">
                                <div className="absolute inset-0 bg-blue-600 rounded-xl blur-lg opacity-40 group-hover:opacity-100 transition duration-500"></div>
                                <div className="relative w-full h-full bg-slate-900 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
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
                                <span className="font-bold text-xl leading-none">SLCF</span>
                                <span className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em]">Events Hub</span>
                            </div>
                        </Link>
                    </div>

                    <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/10">
                        {[
                            { label: 'Upcoming', value: 'Upcoming' },
                            { label: 'Archived', value: 'Archived' },
                            { label: 'All Events', value: 'All' }
                        ].map((item) => (
                            <Button
                                key={item.value}
                                onClick={() => setStatusFilter(item.value as any)}
                                variant="ghost"
                                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${statusFilter === item.value ? 'bg-white/10 text-white' : 'text-muted-foreground hover:text-white hover:bg-white/5'}`}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-blue-400 transition-colors" />
                            <Input
                                placeholder="Search events..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 h-10 w-48 lg:w-64 bg-white/5 border-white/10 rounded-xl focus:ring-blue-500/50 transition-all focus:w-80"
                            />
                        </div>
                        {session ? (
                            <>
                                {session?.user?.role === "ADMIN" && (
                                    <Link href="/admin">
                                        <Button
                                            variant="outline"
                                            className="hidden md:flex rounded-xl border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 font-bold px-6 text-blue-400"
                                        >
                                            Admin Panel
                                        </Button>
                                    </Link>
                                )}
                                <Link href="/members">
                                    <Button
                                        variant="outline"
                                        className="hidden md:flex rounded-xl border-white/10 bg-white/5 hover:bg-white/10 font-bold px-6 text-white"
                                    >
                                        Dashboard
                                    </Button>
                                </Link>
                                <form action={logout}>
                                    <Button
                                        type="submit"
                                        className="hidden md:flex bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white border-0 shadow-lg shadow-red-900/20 rounded-xl font-bold px-6"
                                    >
                                        Log Out
                                    </Button>
                                </form>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="outline" className="hidden lg:flex rounded-xl border-white/10 bg-white/5 hover:bg-white/10 font-bold px-6">
                                        Log In
                                    </Button>
                                </Link>
                            </>
                        )}
                        <HostEventDialog />
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 pt-32 relative z-10">
                {/* Hero Section */}
                <section className="mb-20">
                    <div className="relative p-12 md:p-20 rounded-[3rem] overflow-hidden border border-white/10 bg-slate-900/40 backdrop-blur-3xl">
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-600/20 to-transparent pointer-events-none"></div>
                        <div className="relative z-10 max-w-3xl">
                            <Badge variant="outline" className="mb-6 py-1.5 px-4 rounded-full bg-blue-500/10 border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-[0.2em] flex w-fit items-center">
                                <Sparkles className="w-3 h-3 mr-2 animate-pulse" />
                                Interactive Timeline
                            </Badge>
                            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter italic">
                                NEXT LEVEL <br />
                                <span className="text-blue-500 not-italic">FEDERATION</span> <br />
                                CALENDAR.
                            </h1>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl">
                                Discover upcoming tournaments, high-stakes seminars, and local club gatherings. The future of Sierra Leonean chess starts here.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button
                                    size="lg"
                                    onClick={scrollToEvents}
                                    className="h-16 px-8 rounded-2xl bg-white text-slate-950 hover:bg-slate-200 font-black text-lg transition-transform hover:scale-105 active:scale-95"
                                >
                                    Explore Today
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    onClick={() => alert('Calendar synchronization started... Redirecting to provider.')}
                                    className="h-16 px-8 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 font-black text-lg backdrop-blur-md"
                                >
                                    Sync to Google
                                </Button>
                            </div>
                        </div>

                        {/* Floating elements for "futuristic" look */}
                        <div className="absolute right-20 top-1/2 -translate-y-1/2 hidden xl:block animate-float">
                            <div className="h-96 w-96 rounded-full border border-blue-500/30 relative flex items-center justify-center">
                                <div className="h-72 w-72 rounded-full border border-green-500/20 animate-spin-slow"></div>
                                <div className="absolute h-10 w-10 bg-blue-500 rounded-full blur-xl animate-pulse"></div>
                                <CalendarIcon className="w-24 h-24 text-blue-500/50 absolute" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Calendar Controls */}
                <div ref={eventsRef} className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 scroll-mt-32">
                    <div className="flex items-center gap-2 p-1 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                        {['all', 'Tournament', 'Training', 'Meeting'].map((t) => (
                            <Button
                                key={t}
                                onClick={() => setTypeFilter(t as any)}
                                variant={typeFilter === t ? 'default' : 'ghost'}
                                className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest h-10 transition-all ${typeFilter === t ? 'bg-blue-600 text-white' : 'text-muted-foreground'}`}
                            >
                                {t}
                            </Button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur-md">
                            <Button
                                onClick={() => setView('grid')}
                                variant="ghost"
                                size="icon"
                                className={`h-10 w-10 rounded-lg transition-all ${view === 'grid' ? 'bg-blue-600 text-white shadow-lg' : 'text-muted-foreground'}`}
                            >
                                <CalendarDays className="w-4 h-4" />
                            </Button>
                            <Button
                                onClick={() => setView('list')}
                                variant="ghost"
                                size="icon"
                                className={`h-10 w-10 rounded-lg transition-all ${view === 'list' ? 'bg-blue-600 text-white shadow-lg' : 'text-muted-foreground'}`}
                            >
                                <LayoutList className="w-4 h-4" />
                            </Button>
                        </div>
                        <Button
                            variant="outline"
                            onClick={handleShare}
                            className="h-12 px-6 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 font-bold"
                        >
                            <Share2 className="w-4 h-4 mr-2" /> Share Feed
                        </Button>
                    </div>
                </div>

                {/* Event Grid/List View */}
                {filteredEvents.length > 0 ? (
                    view === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredEvents.map((event) => (
                                <EventDetailDialog key={event.id} event={event}>
                                    <EventCard event={event} />
                                </EventDetailDialog>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredEvents.map((event) => (
                                <EventDetailDialog key={event.id} event={event}>
                                    <EventListItem event={event} />
                                </EventDetailDialog>
                            ))}
                        </div>
                    )
                ) : (
                    <div className="py-20 text-center space-y-4 bg-white/5 rounded-[3rem] border border-white/10">
                        <div className="h-20 w-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto border border-blue-500/20">
                            <Search className="w-8 h-8 text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-bold">No events found</h3>
                        <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
                        <Button variant="outline" onClick={() => { setTypeFilter('all'); setStatusFilter('Upcoming'); setSearchQuery(""); }}>
                            Reset All Filters
                        </Button>
                    </div>
                )}
            </main>
        </div>
    )
}

function HostEventDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="rounded-xl bg-blue-600 hover:bg-blue-500 font-bold shadow-lg shadow-blue-500/20">
                    <Plus className="w-5 h-5 mr-2" /> Host Event
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-slate-950 border-white/10 text-white rounded-[2rem]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black italic">HOST NEW EVENT</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Fill out the federation event request form. Our technical committee will review your proposal.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Event Title</label>
                        <Input placeholder="e.g. Freetown Masters Open" className="bg-white/5 border-white/10" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Date</label>
                            <Input type="date" className="bg-white/5 border-white/10" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Type</label>
                            <select className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm">
                                <option className="bg-slate-900">Tournament</option>
                                <option className="bg-slate-900">Training</option>
                                <option className="bg-slate-900">Meeting</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Requested Location</label>
                        <Input placeholder="Physical or Virtual arena" className="bg-white/5 border-white/10" />
                    </div>
                </div>
                <DialogFooter>
                    <Button className="w-full bg-blue-600 hover:bg-blue-500 font-bold h-12 rounded-xl" onClick={() => alert('Proposal submitted for review!')}>
                        Submit Proposal
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function EventDetailDialog({ event, children }: { event: CalendarEvent, children: React.ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-3xl bg-slate-950 border-white/10 text-white p-0 overflow-hidden rounded-[2.5rem]">
                <div className="relative h-64 md:h-80 w-full">
                    <Image
                        src={event.image || "https://images.unsplash.com/photo-1554034483-04fda0d3507b?q=80&w=1000"}
                        alt={event.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-blue-600/80 backdrop-blur-md text-[10px] font-black uppercase tracking-widest">
                                {event.type}
                            </Badge>
                            <Badge variant="outline" className="bg-slate-950/50 backdrop-blur-md border-white/20 text-[10px] uppercase font-black">
                                {event.status}
                            </Badge>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black leading-tight italic">{event.title}</h2>
                    </div>
                </div>

                <div className="p-8 grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {event.description}
                        </p>
                        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                            <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Organizer</span>
                                <div className="flex items-center gap-2 font-bold">
                                    <User className="w-4 h-4 text-blue-400" />
                                    {event.organizer}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Entry Level</span>
                                <div className="flex items-center gap-2 font-bold">
                                    <Zap className="w-4 h-4 text-yellow-500" />
                                    {event.level}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 flex flex-col justify-between">
                        <div className="bg-white/5 rounded-3xl p-6 border border-white/10 space-y-4">
                            <div className="flex items-center gap-3 text-sm">
                                <CalendarIcon className="w-4 h-4 text-blue-400" />
                                <div>
                                    <div className="font-bold">{event.date}</div>
                                    <div className="text-xs text-muted-foreground">{event.time}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <MapPin className="w-4 h-4 text-blue-400" />
                                <div className="font-bold truncate">{event.location}</div>
                            </div>
                            {event.prizePool && (
                                <div className="flex items-center gap-3 text-sm font-bold text-green-400">
                                    <Trophy className="w-4 h-4 text-yellow-500" />
                                    {event.prizePool}
                                </div>
                            )}
                        </div>

                        <div className="space-y-3">
                            <Button className="w-full h-12 rounded-2xl bg-blue-600 hover:bg-blue-500 font-bold" disabled={!event.registrationOpen} onClick={() => alert('Registration confirmed! Check your email for details.')}>
                                {event.registrationOpen ? 'Register Now' : 'Registration Closed'}
                            </Button>
                            <Button variant="outline" className="w-full h-12 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 font-bold">
                                Sync to Calendar
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

function EventCard({ event }: { event: CalendarEvent }) {
    return (
        <Card className="group relative bg-slate-900/40 border-white/10 rounded-[2.5rem] overflow-hidden hover:border-blue-500/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] backdrop-blur-xl cursor-pointer">
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={event.image || "https://images.unsplash.com/photo-1554034483-04fda0d3507b?q=80&w=1000"}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                {/* Level Badge */}
                <div className="absolute top-6 left-6">
                    <Badge className="py-1 px-3 bg-slate-950/80 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest rounded-full">
                        {event.level} Level
                    </Badge>
                </div>

                {/* Date Highlight */}
                <div className="absolute bottom-6 left-6 flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center font-black">
                        <span className="text-[10px] text-blue-400 uppercase tracking-tighter">Day</span>
                        <span className="text-xl leading-none">{event.date.split('-')[2]}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-white uppercase tracking-wider">{new Date(event.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                        <span className="text-xs text-muted-foreground">{event.time}</span>
                    </div>
                </div>
            </div>

            <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-4">
                    <div className={`w-2 h-2 rounded-full ${event.type === 'Tournament' ? 'bg-red-500' : event.type === 'Training' ? 'bg-green-500' : 'bg-blue-500'} animate-pulse`}></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{event.type}</span>
                </div>
                <h3 className="text-2xl font-black mb-4 leading-tight group-hover:text-blue-400 transition-colors uppercase tracking-tighter">
                    {event.title}
                </h3>

                <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-blue-400" />
                        {event.location}
                    </div>
                    {event.prizePool && (
                        <div className="flex items-center gap-3 text-sm text-green-400 font-bold">
                            <Trophy className="w-4 h-4 text-yellow-500" />
                            Prize: {event.prizePool}
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Entry Fee</span>
                        <span className="font-bold text-white">{event.entryFee || 'Open Access'}</span>
                    </div>
                    <Button size="sm" className="rounded-xl bg-blue-600/10 text-blue-400 border border-blue-600/20 hover:bg-blue-600 hover:text-white transition-all group/btn px-4 h-10">
                        View Details
                        <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

function EventListItem({ event }: { event: CalendarEvent }) {
    return (
        <div className="group bg-slate-900/40 border border-white/5 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-8 hover:bg-white/[0.03] hover:border-blue-500/20 transition-all cursor-pointer backdrop-blur-md">
            <div className="h-24 w-24 md:h-32 md:w-32 rounded-2xl overflow-hidden relative shrink-0">
                <Image src={event.image || "https://images.unsplash.com/photo-1554034483-04fda0d3507b?q=80&w=1000"} alt={event.title} fill className="object-cover" />
            </div>

            <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-2">
                    <Badge variant="outline" className="bg-blue-500/10 border-blue-500/20 text-blue-400 text-[10px] font-black uppercase">
                        {event.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{event.date} • {event.time}</span>
                </div>
                <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{event.title}</h3>
                <div className="flex justify-center md:justify-start items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                    </div>
                    {event.prizePool && (
                        <div className="flex items-center gap-2 text-green-400 font-bold">
                            <Trophy className="w-4 h-4 text-yellow-500" />
                            {event.prizePool}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" className="h-14 px-8 rounded-2xl border border-white/10 hover:bg-white/10 font-bold">
                    Learn More
                </Button>
                <Button className="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-500 font-bold shadow-xl shadow-blue-500/20">
                    Register Now
                </Button>
            </div>
        </div>
    )
}
