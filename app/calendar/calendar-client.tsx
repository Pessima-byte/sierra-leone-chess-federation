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
import { toast } from "sonner"

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
            toast.info('URL copied to clipboard!')
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

            <main className="container mx-auto px-4 pt-16 relative z-10">
                {/* Modern Hero Section */}
                {/* Compact Hero Section */}
                <section className="mb-12">
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-600/10 via-slate-900/50 to-slate-950 border border-white/10 backdrop-blur-2xl p-6 md:p-10 lg:p-12 shadow-2xl">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-600/15 blur-[100px] rounded-full"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-emerald-600/5 blur-[100px] rounded-full"></div>

                        <div className="relative z-10 grid lg:grid-cols-5 gap-8 items-center">
                            <div className="lg:col-span-3 space-y-6">
                                <Badge className="py-1 px-3 rounded-full bg-blue-500/10 border-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-[0.2em] flex w-fit items-center backdrop-blur-md">
                                    <Sparkles className="w-3 h-3 mr-2 animate-pulse" />
                                    Federation Schedule 2026
                                </Badge>
                                <div className="space-y-2">
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none tracking-tighter">
                                        The Arena <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Awaits.</span>
                                    </h1>
                                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
                                        From grandmaster showdowns to grassroots training, discover every move scheduled on the Sierra Leonean stage.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-4 pt-2">
                                    <Button
                                        size="lg"
                                        onClick={scrollToEvents}
                                        className="h-12 px-8 rounded-xl bg-blue-600 text-white hover:bg-blue-500 font-black transition-all hover:scale-[1.02] active:scale-95"
                                    >
                                        Explore Timeline
                                    </Button>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                size="lg"
                                                variant="outline"
                                                className="h-12 px-8 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 font-black backdrop-blur-md transition-all"
                                            >
                                                Host Event
                                            </Button>
                                        </DialogTrigger>
                                        <HostEventDialogContent />
                                    </Dialog>
                                </div>
                            </div>

                            {/* Featured Event Spotlight - More Compact */}
                            <div className="lg:col-span-2 relative lg:block hidden group">
                                <div className="relative bg-slate-900/40 border border-white/10 rounded-[2rem] p-6 backdrop-blur-xl overflow-hidden group-hover:border-blue-500/30 transition-all duration-500">
                                    <div className="relative z-10 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Badge className="bg-emerald-500/20 text-emerald-400 border-none font-black italic text-[10px]">FEATURED</Badge>
                                            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/40">
                                                <Trophy className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-black text-white leading-tight">National Chess Open 2026</h3>
                                        <div className="flex items-center gap-4 text-[11px] text-muted-foreground font-bold">
                                            <div className="flex items-center gap-1.5">
                                                <CalendarIcon className="w-3.5 h-3.5 text-blue-400" />
                                                Jan 15, 2026
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                                                Freetown
                                            </div>
                                        </div>
                                        <div className="h-28 w-full rounded-xl overflow-hidden relative border border-white/5">
                                            <Image
                                                src="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=1000"
                                                alt="Spotlight"
                                                fill
                                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                            />
                                        </div>
                                        <Button className="w-full h-10 rounded-xl bg-white text-slate-950 font-black hover:bg-slate-200 text-xs">
                                            SECURE SPOT
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Compact Toolbar */}
                <div className="flex flex-col gap-4 mb-10 scroll-mt-24" ref={eventsRef}>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-1.5 p-1 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg overflow-x-auto max-w-full">
                            {[
                                { label: 'Upcoming', value: 'Upcoming' },
                                { label: 'Archived', value: 'Archived' },
                                { label: 'All', value: 'All' }
                            ].map((item) => (
                                <Button
                                    key={item.value}
                                    onClick={() => setStatusFilter(item.value as any)}
                                    variant="ghost"
                                    className={`px-4 py-2 h-9 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] transition-all whitespace-nowrap ${statusFilter === item.value ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 italic' : 'text-muted-foreground hover:text-white hover:bg-white/5'}`}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-1 md:w-64 group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground group-focus-within:text-blue-400 transition-colors" />
                                <Input
                                    placeholder="Search events..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 h-10 w-full bg-white/5 border-white/5 rounded-2xl focus:ring-blue-500/50 transition-all text-sm placeholder:text-muted-foreground font-medium"
                                />
                            </div>
                            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 shadow-lg shrink-0">
                                <Button
                                    onClick={() => setView('grid')}
                                    variant="ghost"
                                    size="icon"
                                    className={`h-8 w-8 rounded-lg transition-all ${view === 'grid' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-muted-foreground hover:bg-white/10'}`}
                                >
                                    <CalendarDays className="w-4 h-4" />
                                </Button>
                                <Button
                                    onClick={() => setView('list')}
                                    variant="ghost"
                                    size="icon"
                                    className={`h-8 w-8 rounded-lg transition-all ${view === 'list' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-muted-foreground hover:bg-white/10'}`}
                                >
                                    <LayoutList className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                        {['all', 'Tournament', 'Training', 'Meeting'].map((t) => (
                            <Button
                                key={t}
                                onClick={() => setTypeFilter(t as any)}
                                variant="ghost"
                                size="sm"
                                className={`px-4 h-8 rounded-lg text-[9px] font-black uppercase tracking-[0.1em] transition-all whitespace-nowrap border ${typeFilter === t ? 'bg-white/10 border-white/20 text-white' : 'border-transparent text-muted-foreground hover:text-white hover:bg-white/5'}`}
                            >
                                {t === 'all' ? 'All Activities' : t}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Event Grid/List View */}
                {filteredEvents.length > 0 ? (
                    view === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {filteredEvents.map((event) => (
                                <EventDetailDialog key={event.id} event={event}>
                                    <EventCard event={event} />
                                </EventDetailDialog>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {filteredEvents.map((event) => (
                                <EventDetailDialog key={event.id} event={event}>
                                    <EventListItem event={event} />
                                </EventDetailDialog>
                            ))}
                        </div>
                    )
                ) : (
                    <div className="py-32 text-center space-y-6 rounded-[4rem] bg-gradient-to-b from-white/5 to-transparent border border-white/5 backdrop-blur-xl">
                        <div className="h-24 w-24 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto border border-blue-500/20 animate-pulse">
                            <Search className="w-10 h-10 text-blue-400" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-3xl font-black text-white">No Transmissions Found</h3>
                            <p className="text-muted-foreground max-w-sm mx-auto">We couldn't find any events matching your current signal. Try recalibrating your filters.</p>
                        </div>
                        <Button
                            variant="outline"
                            className="h-14 px-10 rounded-[2rem] border-white/10 bg-white/5 font-black uppercase tracking-widest text-[10px]"
                            onClick={() => { setTypeFilter('all'); setStatusFilter('Upcoming'); setSearchQuery(""); }}
                        >
                            Reset Radar
                        </Button>
                    </div>
                )}
            </main>
        </div>
    )
}

function HostEventDialogContent() {
    return (
        <DialogContent className="sm:max-w-[500px] bg-slate-950/90 border-white/10 text-white rounded-[2.5rem] backdrop-blur-2xl">
            <DialogHeader>
                <DialogTitle className="text-3xl font-black italic">HOST NEW EVENT</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                    Fill out the federation event request form. Our technical committee will review your proposal.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">Event Title</label>
                    <Input placeholder="e.g. Freetown Masters Open" className="bg-white/5 border-white/10 h-12 rounded-xl" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">Date</label>
                        <Input type="date" className="bg-white/5 border-white/10 h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">Type</label>
                        <select className="flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none">
                            <option className="bg-slate-900">Tournament</option>
                            <option className="bg-slate-900">Training</option>
                            <option className="bg-slate-900">Meeting</option>
                        </select>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">Requested Location</label>
                    <Input placeholder="Physical or Virtual arena" className="bg-white/5 border-white/10 h-12 rounded-xl" />
                </div>
            </div>
            <DialogFooter>
                <Button className="w-full bg-blue-600 hover:bg-blue-500 font-black h-14 rounded-2xl shadow-xl shadow-blue-600/20">
                    Submit Proposal
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}

function EventDetailDialog({ event, children }: { event: CalendarEvent, children: React.ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-4xl bg-slate-950/95 border-white/5 text-white p-0 overflow-hidden rounded-[3rem] backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                <div className="relative h-[400px] w-full group">
                    <Image
                        src={event.image || "https://images.unsplash.com/photo-1554034483-04fda0d3507b?q=80&w=1000"}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                    <div className="absolute top-8 left-8 flex gap-3">
                        <Badge className="bg-blue-600 text-white border-none font-black text-[10px] tracking-widest px-4 py-2 rounded-full shadow-xl shadow-blue-600/20">
                            {event.type}
                        </Badge>
                        <Badge className="bg-white/10 backdrop-blur-md text-white border-white/10 font-black text-[10px] tracking-widest px-4 py-2 rounded-full">
                            {event.status}
                        </Badge>
                    </div>

                    <div className="absolute bottom-10 left-10 right-10">
                        <h2 className="text-4xl md:text-6xl font-black leading-[0.9] tracking-tighter uppercase italic">{event.title}</h2>
                    </div>
                </div>

                <div className="p-10 md:p-14 grid md:grid-cols-3 gap-12">
                    <div className="md:col-span-2 space-y-10">
                        <div className="space-y-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Mission Briefing</span>
                            <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                                {event.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 pt-10 border-t border-white/5">
                            <div className="space-y-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Logistics Lead</span>
                                <div className="flex items-center gap-3 font-black text-lg">
                                    <div className="h-8 w-8 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/20">
                                        <User className="w-4 h-4 text-blue-400" />
                                    </div>
                                    {event.organizer}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Combat Level</span>
                                <div className="flex items-center gap-3 font-black text-lg text-yellow-500">
                                    <Zap className="w-5 h-5" />
                                    {event.level}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white/5 rounded-[2.5rem] p-8 border border-white/5 space-y-6 backdrop-blur-xl">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                    <CalendarIcon className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <div className="font-black text-white">{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</div>
                                    <div className="text-xs text-muted-foreground font-bold">{event.time}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                    <MapPin className="w-5 h-5 text-blue-400" />
                                </div>
                                <div className="font-black text-white truncate">{event.location}</div>
                            </div>
                            {event.prizePool && (
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                        <Trophy className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <div className="font-black text-emerald-400">{event.prizePool}</div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <Button
                                className="w-full h-16 rounded-2xl bg-blue-600 hover:bg-blue-500 font-black text-lg transition-all shadow-xl shadow-blue-600/20 active:scale-95"
                                disabled={!event.registrationOpen}
                                onClick={() => toast.success('Registration request transmitted!')}
                            >
                                {event.registrationOpen ? 'INITIALIZE ENTRY' : 'REG CLOSED'}
                            </Button>
                            <Button variant="outline" className="w-full h-16 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 font-black text-sm uppercase tracking-widest text-muted-foreground hover:text-white transition-all">
                                SHARE FEED
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
        <Card className="group relative bg-slate-950 border-white/5 rounded-[2rem] overflow-hidden hover:border-blue-500/30 transition-all duration-500 shadow-xl hover:shadow-blue-500/10 cursor-pointer">
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={event.image || "https://images.unsplash.com/photo-1554034483-04fda0d3507b?q=80&w=1000"}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                <div className="absolute top-4 left-4">
                    <div className="px-3 py-1 bg-slate-950/60 backdrop-blur-xl border border-white/10 rounded-xl flex flex-col items-center">
                        <span className="text-[9px] font-black uppercase tracking-widest text-blue-400">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                        <span className="text-base font-black leading-none">{event.date.split('-')[2]}</span>
                    </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <Badge className="bg-blue-600 text-white border-none font-black text-[9px] tracking-widest px-3 py-1 rounded-full">
                        {event.type}
                    </Badge>
                </div>
            </div>

            <CardContent className="p-5 space-y-4">
                <div className="space-y-1.5">
                    <h3 className="text-lg lg:text-xl font-black text-white leading-tight tracking-tight uppercase group-hover:text-blue-400 transition-colors line-clamp-1">
                        {event.title}
                    </h3>
                    <p className="text-[12px] text-muted-foreground line-clamp-2 font-medium leading-relaxed">
                        {event.description}
                    </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 text-blue-400" />
                        {event.location}
                    </div>
                </div>

                <Button className="w-full h-10 rounded-xl bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-600 text-white font-black text-xs transition-all">
                    VIEW DETAILS
                </Button>
            </CardContent>
        </Card>
    )
}

function EventListItem({ event }: { event: CalendarEvent }) {
    return (
        <div className="group bg-slate-950 border border-white/5 rounded-[1.5rem] p-3 pr-6 flex flex-col md:flex-row items-center gap-6 hover:bg-white/[0.02] hover:border-blue-500/20 transition-all cursor-pointer backdrop-blur-3xl shadow-lg">
            <div className="h-20 w-20 md:h-24 md:w-24 rounded-xl overflow-hidden relative shrink-0">
                <Image src={event.image || "https://images.unsplash.com/photo-1554034483-04fda0d3507b?q=80&w=1000"} alt={event.title} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
            </div>

            <div className="flex-1 text-center md:text-left space-y-1">
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
                    <Badge className="bg-blue-600/10 border-blue-500/20 text-blue-400 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
                        {event.type}
                    </Badge>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <h3 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{event.title}</h3>
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-[11px] font-medium text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-blue-400" />
                        {event.location}
                    </div>
                </div>
            </div>

            <div className="shrink-0">
                <Button className="h-10 px-6 rounded-xl bg-white text-slate-950 font-black hover:bg-blue-600 hover:text-white transition-all text-xs">
                    REGISTER
                </Button>
            </div>
        </div>
    )
}
