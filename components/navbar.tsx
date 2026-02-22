import { getSession, logout } from "@/app/actions/auth"
import Link from "next/link"
import Image from "next/image"
import { LogOut, User } from "lucide-react"
import { Suspense } from "react"
import { MobileNavWrapper } from "./mobile-nav-wrapper"

export default function Navbar() {
    return (
        <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-slate-950/90 supports-[backdrop-filter]:bg-slate-950/60 supports-[backdrop-filter]:backdrop-blur-xl">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Branding */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10">
                        <div className="absolute inset-0 bg-blue-600 rounded-xl blur-lg opacity-40 group-hover:opacity-100 transition duration-500"></div>
                        <div className="relative w-full h-full bg-slate-900 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
                            <Image
                                src="/images/logo.png"
                                alt="SLCF Logo"
                                width={40}
                                height={40}
                                priority
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-lg leading-none tracking-tight text-white uppercase">SLCF</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Sierra Leone Chess</span>
                    </div>
                </Link>

                {/* Desktop Nav (hidden on mobile) */}
                <nav className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10">
                    <MobileNavWrapper variant="desktop" />
                </nav>

                {/* Auth Buttons — Desktop */}
                <Suspense fallback={<div className="w-32 h-10 bg-white/5 rounded-full animate-pulse hidden md:block" />}>
                    <AuthSection />
                </Suspense>

                {/* Mobile Menu Toggle + Panel */}
                <MobileNavWrapper variant="mobile" />
            </div>
        </header>
    )
}

async function AuthSection() {
    const session = await getSession()

    return (
        <div className="flex items-center gap-2">
            {session ? (
                <div className="hidden md:flex items-center bg-white/5 rounded-full border border-white/10 p-1 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    {session.user.role === "ADMIN" && (
                        <Link href="/admin/dashboard" className="h-8 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 hover:text-white hover:bg-blue-500/40 transition-all px-4 inline-flex items-center justify-center">
                            Admin
                        </Link>
                    )}
                    <Link href="/profile" className="h-8 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-blue-500/20 hover:text-blue-200 transition-all px-4 inline-flex items-center gap-2 group">
                        <User className="w-3.5 h-3.5 text-blue-400 group-hover:text-blue-300" />
                        {session.user.name?.split(' ')[0] || "Profile"}
                    </Link>
                    <div className="w-px h-4 bg-white/15 mx-1"></div>
                    <form action={logout}>
                        <button type="submit" title="Log Out" className="h-8 w-8 rounded-full p-0 text-slate-400 hover:text-red-400 hover:bg-red-500/20 transition-all inline-flex items-center justify-center">
                            <LogOut className="w-3.5 h-3.5" />
                            <span className="sr-only">Log Out</span>
                        </button>
                    </form>
                </div>
            ) : (
                <div className="hidden md:flex items-center gap-2">
                    <Link href="/login" className="rounded-full text-sm font-bold text-white hover:bg-white/10 h-10 px-4 py-2 inline-flex items-center justify-center transition-colors">
                        Log In
                    </Link>
                    <Link href="/login?mode=register" className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-white border-0 shadow-lg shadow-blue-500/20 rounded-full text-sm font-bold px-6 h-10 inline-flex items-center justify-center transition-all hover:scale-105 active:scale-95">
                        Join Federation
                    </Link>
                </div>
            )}
        </div>
    )
}
