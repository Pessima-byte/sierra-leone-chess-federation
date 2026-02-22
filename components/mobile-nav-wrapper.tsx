"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Shield, User, LogOut, Home, Calendar, Users, Newspaper, Globe, Sparkles } from "lucide-react"
import { logout } from "@/app/actions/auth"

const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Events", href: "/calendar", icon: Calendar },
    { name: "Members", href: "/members", icon: Users },
    { name: "News", href: "/news", icon: Newspaper },
]

interface SessionUser {
    name: string | null
    role: string
}

interface Props {
    variant: "desktop" | "mobile"
    user?: SessionUser | null
}

export function MobileNavWrapper({ variant, user }: Props) {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        setOpen(false)
    }, [pathname])

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [open])

    if (!mounted) {
        if (variant === "desktop") {
            return (
                <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10 opacity-0">
                    <div className="w-32 h-8" />
                </div>
            )
        }
        return (
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-white/10" />
        )
    }

    if (variant === "desktop") {
        return (
            <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10">
                {navLinks.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`px-4 py-2 text-sm font-medium transition-all rounded-full ${isActive ? "bg-white/10 text-blue-400" : "text-slate-400 hover:text-white"}`}
                        >
                            {item.name}
                        </Link>
                    )
                })}
            </div>
        )
    }

    return (
        <div className="md:hidden">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full bg-slate-900 border border-white/20 flex items-center justify-center text-white shadow-xl active:scale-95 transition-all relative z-[10001]"
            >
                {open ? <X className="w-5 h-5 relative z-10" /> : <Menu className="w-5 h-5 relative z-10" />}
            </button>

            {open && createPortal(
                <div className="fixed inset-0 z-[10000] flex flex-col justify-start pointer-events-none">
                    {/* Darker Thick Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl pointer-events-auto animate-in fade-in duration-500"
                        onClick={() => setOpen(false)}
                    />

                    {/* The "High-Contrast" Command Hub */}
                    <div className="relative w-full max-w-[350px] mx-auto pt-24 pointer-events-auto animate-in slide-in-from-top-8 duration-500">

                        <div className="relative bg-[#05070a] rounded-[2rem] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden">

                            {/* Header Strip - High Contrast Gold */}
                            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-6 h-6 rounded-lg bg-amber-500 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                                        <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                                    </div>
                                    <span className="text-[12px] font-black text-amber-500 uppercase tracking-[0.2em]">Imperial Hub</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                                    <span className="text-[9px] font-black text-white/80 uppercase tracking-widest mt-0.5">Online</span>
                                </div>
                            </div>

                            {/* Nav Rail - Crystal Clear Links */}
                            <div className="px-4 py-8 flex items-center justify-around">
                                {navLinks.map((item) => {
                                    const isActive = pathname === item.href
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setOpen(false)}
                                            className="flex flex-col items-center gap-3 group flex-1"
                                        >
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 relative ${isActive
                                                ? "bg-blue-600 text-white shadow-[0_10px_30px_rgba(37,99,235,0.4)] scale-110"
                                                : "bg-white/5 text-slate-300 border border-white/5 hover:bg-white/10 hover:text-white"}`}>
                                                <item.icon className={`w-7 h-7 relative z-10 ${isActive ? 'drop-shadow-lg' : ''}`} />
                                            </div>
                                            <span className={`text-[10px] font-black uppercase tracking-[0.15em] transition-colors ${isActive ? "text-blue-400" : "text-slate-500"}`}>
                                                {item.name}
                                            </span>
                                        </Link>
                                    )
                                })}
                            </div>

                            {/* Action Dock - High Legibility */}
                            <div className="px-6 pb-8 pt-2">
                                {user ? (
                                    <div className="flex flex-col gap-3">
                                        <Link
                                            href={user.role === "ADMIN" ? "/admin/dashboard" : "/profile"}
                                            className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95"
                                        >
                                            {user.role === "ADMIN" ? <Shield className="w-4 h-4" /> : <User className="w-4 h-4" />}
                                            Go to {user.name?.split(' ')[0]}&apos;s Center
                                        </Link>
                                        <form action={logout} className="w-full">
                                            <button
                                                type="submit"
                                                className="w-full h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 transition-all"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Log Out Securely
                                            </button>
                                        </form>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-3">
                                        <Link href="/login?mode=register" className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center text-[11px] font-black uppercase tracking-[0.2em] shadow-lg transition-all active:scale-95">
                                            Join Federation Hub
                                        </Link>
                                        <Link href="/login" className="w-full h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-white/10 transition-all">
                                            Log In to Account
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    )
}
