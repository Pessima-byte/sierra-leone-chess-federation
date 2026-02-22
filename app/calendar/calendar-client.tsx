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
                (statusFilter === 'Upcoming' && (event.status === 'Upcoming' || event.status === 'Ongoing' || event.status === 'Planned' || event.status === 'Active')) ||
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

            <main className="container mx-auto px-4 pt-24 md:pt-32 relative z-10">
                {/* Modern Hero Section */}
                {/* Compact Hero Section */}
                <section className="mb-8 md:mb-12">
                    <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-slate-900/40 border border-white/10 backdrop-blur-2xl p-5 md:p-10 lg:p-12 shadow-2xl group/hero">
                        {/* Dynamic Backgrounds */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full group-hover/hero:bg-blue-600/20 transition-colors duration-1000"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-emerald-600/5 blur-[80px] rounded-full"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] to-transparent opacity-50"></div>

                        <div className="relative z-10 grid lg:grid-cols-5 gap-6 md:gap-8 items-center">
                            <div className="lg:col-span-3 space-y-6 md:space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-1000">
                                    <Sparkles className="w-3 h-3 animate-pulse" />
                                    Federation Schedule 2026
                                </div>
                                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150 fill-mode-both flex flex-col items-center lg:items-start">
                                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter uppercase italic">
                                        The Arena <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-emerald-400">Awaits.</span>
                                    </h1>
                                    <p className="text-xs md:text-lg text-slate-400 leading-relaxed max-w-sm md:max-w-lg font-medium">
                                        From grandmaster showdowns to training, discover every move scheduled on the Sierra Leonean stage.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto">
                                    <Button
                                        size="lg"
                                        onClick={scrollToEvents}
                                        className="h-12 px-10 rounded-xl bg-blue-600 text-white hover:bg-blue-500 font-black transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-blue-600/20 text-xs md:text-sm uppercase tracking-widest"
                                    >
                                        Explore Timeline
                                    </Button>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                size="lg"
                                                variant="outline"
                                                className="h-12 px-10 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 font-black backdrop-blur-md transition-all text-xs md:text-sm uppercase tracking-widest"
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
                                                src="/images/national-championship.png"
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
                <div className="flex flex-col gap-6 mb-12 scroll-mt-24" ref={eventsRef}>
                    {/* Control Deck: Modern Switcher */}
                    <div className="relative p-1.5 bg-slate-900/40 border border-white/10 backdrop-blur-2xl rounded-3xl overflow-hidden group/deck">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover/deck:opacity-100 transition-opacity duration-700"></div>
                        <div className="relative flex items-center justify-between gap-1 z-10">
                            {[
                                { label: 'Upcoming', value: 'Upcoming' },
                                { label: 'Archived', value: 'Archived' },
                                { label: 'Full Archive', value: 'All' }
                            ].map((item) => (
                                <button
                                    key={item.value}
                                    onClick={() => setStatusFilter(item.value as any)}
                                    className={`flex-1 py-3 px-3 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 relative overflow-hidden ${statusFilter === item.value ? 'text-white' : 'text-slate-500 hover:text-white'}`}
                                >
                                    {statusFilter === item.value && (
                                        <div className="absolute inset-0 bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)] animate-in fade-in zoom-in-95 duration-300"></div>
                                    )}
                                    <span className="relative z-10">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action Bar: Search & Activity */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="relative flex-1 group">
                                <div className="absolute inset-0 bg-blue-600/5 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                                <Input
                                    placeholder="Search the arena..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-11 h-12 w-full bg-white/[0.03] border-white/5 rounded-2xl focus:ring-1 focus:ring-blue-500/30 transition-all text-xs placeholder:text-slate-600 font-bold backdrop-blur-md"
                                />
                            </div>
                            <div className="flex bg-white/[0.03] p-1 rounded-2xl border border-white/10 backdrop-blur-md">
                                <Button
                                    onClick={() => setView('grid')} variant="ghost" size="icon"
                                    className={`h-10 w-10 rounded-xl transition-all ${view === 'grid' ? 'bg-white/10 text-white shadow-inner' : 'text-slate-600'}`}
                                >
                                    <CalendarDays className="w-4 h-4" />
                                </Button>
                                <Button
                                    onClick={() => setView('list')} variant="ghost" size="icon"
                                    className={`h-10 w-10 rounded-xl transition-all ${view === 'list' ? 'bg-white/10 text-white shadow-inner' : 'text-slate-600'}`}
                                >
                                    <LayoutList className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4">
                            {['all', 'Tournament', 'Training', 'Meeting'].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTypeFilter(t as any)}
                                    className={`px-5 h-9 rounded-2xl text-[8px] font-black uppercase tracking-[0.2em] transition-all border whitespace-nowrap ${typeFilter === t ? 'bg-blue-500/10 border-blue-500/40 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'border-white/5 bg-white/[0.02] text-slate-600 hover:text-white'}`}
                                >
                                    {t === 'all' ? 'Signature View' : t}
                                </button>
                            ))}
                        </div>
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
                        src={event.image || "/images/national-blitz.png"}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
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
                                    <div className="font-black text-white" suppressHydrationWarning>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</div>
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
        <Card className="group relative bg-slate-900 border-white/5 rounded-[2.5rem] overflow-hidden hover:border-blue-500/40 transition-all duration-700 shadow-2xl cursor-pointer">
            <div className="relative h-56 overflow-hidden">
                <Image
                    src={event.image || "/images/national-blitz.png"}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                />
                {/* Advanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                {/* HUD Elements */}
                <div className="absolute top-5 left-5 right-5 flex justify-between items-start">
                    <div className="h-12 w-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex flex-col items-center justify-center shadow-2xl transform group-hover:-translate-y-1 transition-transform">
                        <span className="text-[9px] font-black uppercase text-blue-400 leading-none" suppressHydrationWarning>{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                        <span className="text-lg font-black text-white leading-none">{event.date.split('-')[2]}</span>
                    </div>
                    <Badge className="bg-slate-950/80 backdrop-blur-md text-white border-white/10 font-bold text-[8px] tracking-[0.2em] px-3 py-1.5 rounded-xl uppercase">
                        {event.type}
                    </Badge>
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                    <div className="flex flex-col gap-1 transform group-hover:translate-y-[-5px] transition-transform duration-500">
                        <h3 className="text-xl md:text-2xl font-black text-white leading-tight tracking-tighter uppercase italic drop-shadow-2xl">
                            {event.title}
                        </h3>
                        <div className="flex items-center gap-2 pt-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{event.location.split(',')[0]}</span>
                        </div>
                    </div>
                </div>
            </div>

            <CardContent className="p-6 pt-5 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-white/5">
                <p className="text-[12px] text-slate-500 font-medium leading-relaxed mb-6 line-clamp-2">
                    {event.description}
                </p>
                <Link href="#" className="flex items-center justify-center w-full h-12 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-blue-500 transition-all group/btn relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
                    <span className="relative z-10 text-[10px] font-black text-white uppercase tracking-[0.2em] group-hover/btn:scale-105 transition-transform">
                        Explore Mission
                    </span>
                </Link>
            </CardContent>
        </Card>
    )
}

function EventListItem({ event }: { event: CalendarEvent }) {
    return (
        <div className="group bg-slate-900/40 border border-white/5 rounded-[1.25rem] md:rounded-[1.5rem] p-2.5 md:p-3 pr-4 md:pr-6 flex items-center gap-4 md:gap-6 hover:bg-white/[0.02] hover:border-blue-500/20 transition-all cursor-pointer backdrop-blur-3xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full"></div>

            <div className="h-16 w-16 md:h-24 md:w-24 rounded-lg md:rounded-xl overflow-hidden relative shrink-0 border border-white/5">
                <Image src={event.image || "/images/national-blitz.png"} alt={event.title} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
            </div>

            <div className="flex-1 space-y-0.5 md:space-y-1 relative z-10">
                <div className="flex items-center gap-2">
                    <Badge className="bg-blue-600/10 border-blue-500/20 text-blue-400 text-[7px] md:text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
                        {event.type}
                    </Badge>
                    <span className="text-[8px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden sm:inline-block" suppressHydrationWarning>
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                    </span>
                </div>
                <h3 className="text-sm md:text-xl font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight line-clamp-1 italic">{event.title}</h3>
                <div className="flex items-center gap-3 text-[9px] md:text-[11px] font-medium text-slate-500">
                    <div className="flex items-center gap-1">
                        <MapPin className="w-2.5 md:w-3.5 h-2.5 md:h-3.5 text-blue-400" />
                        {event.location}
                    </div>
                </div>
            </div>

            <div className="shrink-0 relative z-10">
                <Button className="h-8 md:h-10 px-4 md:px-6 rounded-lg md:rounded-xl bg-white text-slate-950 font-black hover:bg-blue-600 hover:text-white transition-all text-[9px] md:text-xs">
                    JOIN
                </Button>
            </div>
        </div>
    )
}
