import { getEventById } from "@/lib/queries"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
    Calendar as CalendarIcon,
    MapPin,
    Clock,
    Trophy,
    User,
    Zap,
    ChevronLeft,
    Share2,
    CalendarDays,
    ArrowLeft
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const event = await getEventById(id)

    if (!event) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500 selection:text-white pb-20 overflow-x-hidden relative font-sans">
            {/* Minimalist Premium Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 right-1/4 w-[50%] h-[50%] bg-emerald-600/5 blur-[120px] rounded-full"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 mix-blend-overlay"></div>
            </div>

            {/* Sleek Navigation */}
            <header className="fixed top-0 z-50 w-full h-16 flex items-center bg-slate-950/40 backdrop-blur-xl border-b border-white/5">
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <Link href="/calendar" className="flex items-center gap-3 group">
                        <div className="h-8 w-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-all active:scale-90 shadow-xl">
                            <ChevronLeft className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-white transition-colors">Abort Mission</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white shadow-xl">
                            <Share2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 pt-24 md:pt-28 relative z-10 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Primary Intelligence Section */}
                    <div className="flex-1 space-y-8">
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-widest backdrop-blur-sm">
                                <Zap className="w-3 h-3" />
                                {event.type} // {event.status}
                            </div>

                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black leading-[1.1] tracking-tighter uppercase italic text-white drop-shadow-sm">
                                {event.title}
                            </h1>
                        </div>

                        {/* Compact Hero Module */}
                        <div className="relative group animate-in fade-in zoom-in-95 duration-700 delay-100">
                            <div className="relative aspect-[16/7] w-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                                <Image
                                    src={event.image || "/images/national-blitz.png"}
                                    alt={event.title}
                                    fill
                                    className="object-cover transition-transform duration-[3000ms] group-hover:scale-105"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                                <div className="absolute bottom-5 left-6 flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-xl bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 flex items-center justify-center">
                                        <Trophy className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    <p className="text-sm font-black text-white italic uppercase tracking-tight">{event.prizePool || 'Glory Rewards'}</p>
                                </div>
                            </div>
                        </div>

                        {/* High-Density Intelligence Module */}
                        <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                            <div className="bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-6 backdrop-blur-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full"></div>
                                <div className="relative z-10 space-y-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-[1px] w-6 bg-blue-500"></div>
                                        <h2 className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-400">Mission Brief</h2>
                                    </div>
                                    <p className="text-sm md:text-lg text-slate-300 leading-relaxed font-bold italic">
                                        "{event.description}"
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-5 backdrop-blur-xl flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                        <User className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Command Lead</span>
                                        <span className="text-sm font-black text-white uppercase italic leading-none">{event.organizer}</span>
                                    </div>
                                </div>
                                <div className="bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-5 backdrop-blur-xl flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                                        <Zap className="w-5 h-5 text-yellow-500" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Tactical Tier</span>
                                        <span className="text-sm font-black text-yellow-500 uppercase italic leading-none">{event.level} Engagement</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Compact Tactical HUD Sidebar */}
                    <div className="lg:w-[320px] space-y-6 animate-in fade-in slide-in-from-right-8 duration-700 delay-150">
                        <div className="lg:sticky lg:top-24 space-y-6">
                            <div className="bg-slate-900/60 border border-white/10 backdrop-blur-2xl rounded-[1.5rem] p-6 md:p-8 space-y-8 shadow-2xl relative overflow-hidden group/hud">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 blur-3xl rounded-full"></div>

                                <div className="flex items-center justify-between">
                                    <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-400">Intelligence HUB</h3>
                                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 group/item">
                                        <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/item:border-blue-500 transition-colors">
                                            <CalendarDays className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-base font-black text-white italic uppercase tracking-tight" suppressHydrationWarning>
                                                {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                                            </p>
                                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Target Date</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 group/item">
                                        <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/item:border-blue-500 transition-colors">
                                            <Clock className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-base font-black text-white italic uppercase tracking-tight">{event.time}</p>
                                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Commencement</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 group/item">
                                        <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/item:border-rose-500 transition-colors">
                                            <MapPin className="w-5 h-5 text-rose-500" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-base font-black text-white italic uppercase tracking-tight truncate">{event.location}</p>
                                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Sector Axis</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5 space-y-4">
                                    <Button
                                        className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest italic transition-all shadow-lg shadow-blue-600/20 active:scale-95 disabled:bg-slate-800 disabled:text-slate-500"
                                        disabled={!event.registrationOpen}
                                    >
                                        {event.registrationOpen ? 'Initialize Entry' : 'Registry Locked'}
                                    </Button>

                                    <div className="flex items-center justify-between px-1">
                                        <div className="flex flex-col">
                                            <span className="text-[7px] font-black text-slate-500 uppercase tracking-[0.2em]">Usage Fee</span>
                                            <span className="text-[10px] font-black text-white uppercase italic">{event.entryFee || 'Gratis'}</span>
                                        </div>
                                        <span className={`text-[10px] font-black uppercase italic ${event.registrationOpen ? 'text-emerald-400' : 'text-rose-500'}`}>
                                            {event.registrationOpen ? 'Open Ops' : 'Restricted'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest leading-relaxed text-center px-4 italic opacity-80">
                                Strategic engagement protocols strictly enforced. Secure your sector early.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

function CardContent({ children, className }: { children: React.ReactNode, className?: string }) {
    return <div className={className}>{children}</div>
}
