import Image from "next/image"
import Link from "next/link"
import {
    ChevronLeft,
    Menu,
    Mail,
    Phone,
    MapPin,
    ArrowRight,
    Star,
    Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { getSession, logout } from "@/app/actions/auth"
import { getMembers } from "@/lib/queries"
import MembersClient from "./members-client"

export const revalidate = 60

export default async function MembersPage() {
    const [session, members] = await Promise.all([
        getSession(),
        getMembers()
    ])

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
            <main className="pt-24 pb-24">
                <MembersClient members={members as any} />
            </main>

            {/* Footer */}
            <footer className="bg-slate-950 border-t border-white/5 pt-6 md:pt-24 pb-4 md:pb-12 relative overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/4 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50"></div>
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="absolute top-1/2 -right-24 w-64 h-64 bg-emerald-600/5 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="container mx-auto px-6 md:px-4 relative z-10">
                    {/* Mobile Dashboard: High-Density & Impressive */}
                    <div className="md:hidden space-y-5 mb-5">
                        {/* Header: Identity & Status */}
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-blue-600/20 border border-white/10 rounded-xl flex items-center justify-center font-black text-xs text-white shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]">
                                    SL
                                </div>
                                <div>
                                    <h3 className="font-black text-xl tracking-tighter text-white uppercase italic leading-none">SLCF</h3>
                                    <p className="text-[8px] font-black text-blue-400/80 uppercase tracking-[0.2em] mt-1">National Authority</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/5 border border-blue-500/10">
                                <Zap className="w-2.5 h-2.5 text-blue-400 animate-pulse" />
                                <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest">Active</span>
                            </div>
                        </div>

                        {/* Navigation Matrix */}
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3.5 space-y-2.5 group">
                                <div className="flex items-center justify-between">
                                    <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.15em] italic">Discovery</span>
                                    <ArrowRight className="w-3 h-3 text-white/10 group-hover:text-blue-400 transition-colors" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    {['About', 'Rankings', 'News'].map(item => (
                                        <Link key={item} href={item === 'News' ? '/news' : '/'} className="text-[11px] font-extrabold text-slate-400 hover:text-white transition-colors uppercase tracking-tight">{item}</Link>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3.5 space-y-2.5 group">
                                <div className="flex items-center justify-between">
                                    <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.15em] italic">Academy</span>
                                    <Star className="w-3 h-3 text-white/10 group-hover:text-emerald-400 transition-colors" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    {['Learn', 'FIDE', 'Hub'].map(item => (
                                        <Link key={item} href="#" className="text-[11px] font-extrabold text-slate-400 hover:text-white transition-colors uppercase tracking-tight">{item}</Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Smart Contact Strip */}
                        <div className="flex flex-col gap-1.5 bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 blur-2xl rounded-full"></div>
                            <div className="flex items-center gap-3 relative z-10">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500/40"></div>
                                <p className="text-[10px] font-bold text-slate-400">15 Siaka Stevens St, Freetown</p>
                            </div>
                            <div className="flex items-center gap-3 relative z-10">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40"></div>
                                <p className="text-[10px] font-bold text-slate-400">info@slchess.org</p>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:grid grid-cols-12 gap-8 mb-20">
                        {/* Brand Intro */}
                        <div className="md:col-span-5 space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                                    <div className="relative w-14 h-14 bg-slate-900 border border-white/10 rounded-2xl flex items-center justify-center font-black text-sm text-white shadow-2xl">
                                        SL
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-black text-2xl tracking-tighter text-white uppercase italic leading-none">SLCF</h3>
                                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mt-1 italic">National Authority</p>
                                </div>
                            </div>

                            <p className="text-slate-400 text-lg leading-relaxed max-w-sm font-medium">
                                The supreme governing body for chess in high strategy.
                            </p>
                        </div>

                        <div className="md:col-span-4 grid grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <h4 className="font-black text-[11px] uppercase tracking-[0.2em] text-white/50 italic">Discovery</h4>
                                    <div className="w-6 h-0.5 bg-blue-500"></div>
                                </div>
                                <ul className="grid grid-cols-1 gap-y-4">
                                    {['About Us', 'Rankings', 'Events', 'News'].map((item) => (
                                        <li key={item}>
                                            <Link href={item === 'News' ? '/news' : '/'} className="text-slate-500 hover:text-white text-[13px] font-bold uppercase tracking-wider transition-colors">{item}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <h4 className="font-black text-[11px] uppercase tracking-[0.2em] text-white/50 italic">Academy</h4>
                                    <div className="w-6 h-0.5 bg-emerald-500"></div>
                                </div>
                                <ul className="grid grid-cols-1 gap-y-4">
                                    {['Learn', 'FIDE Laws', 'Hub'].map((item) => (
                                        <li key={item}>
                                            <Link href="#" className="text-slate-500 hover:text-white text-[13px] font-bold uppercase tracking-wider transition-colors">{item}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="md:col-span-3 space-y-8">
                            <h4 className="font-black text-[11px] uppercase tracking-[0.2em] text-white/40 italic">Connect</h4>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-3.5 h-3.5 text-rose-500/60" />
                                    <p className="text-xs font-bold text-slate-400">Siaka Stevens St, Freetown</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="w-3.5 h-3.5 text-blue-500/60" />
                                    <p className="text-xs font-bold text-slate-400">info@slchess.org</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Credits & Legal */}
                    <div className="pt-4 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3">
                        <div className="flex items-center gap-4">
                            <Zap className="w-3.5 h-3.5 text-blue-400 animate-pulse hidden md:block" />
                            <p className="text-slate-600 text-[9px] font-black uppercase tracking-widest text-center">
                                © 2025 <span className="text-slate-400">Sierra Leone Chess Federation</span>
                            </p>
                        </div>

                        <div className="flex gap-6">
                            <Link href="#" className="text-slate-600 hover:text-white text-[8px] font-black uppercase tracking-widest transition-all">Privacy</Link>
                            <Link href="#" className="text-slate-600 hover:text-white text-[8px] font-black uppercase tracking-widest transition-all">Terms</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div >
    )
}
