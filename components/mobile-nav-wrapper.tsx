"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Shield, User, LogOut } from "lucide-react"
import { logout } from "@/app/actions/auth"

const links = [
    { name: "Home", href: "/" },
    { name: "Calendar", href: "/calendar" },
    { name: "Members", href: "/members" },
    { name: "Learn", href: "/#learn" },
    { name: "News", href: "/news" },
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

    // Close menu on route change
    useEffect(() => {
        setOpen(false)
    }, [pathname])

    // Prevent body scroll when menu is open
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

    // Desktop variant: just render the link pills
    if (variant === "desktop") {
        return (
            <>
                {links.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            prefetch={true}
                            className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${isActive
                                ? "bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                : "text-muted-foreground hover:text-white hover:bg-white/5"
                                }`}
                        >
                            {item.name}
                        </Link>
                    )
                })}
            </>
        )
    }

    // Mobile variant: hamburger + full-screen panel
    return (
        <div className="md:hidden">
            {/* Toggle Button */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="relative z-[80] inline-flex items-center justify-center text-white hover:bg-white/10 rounded-full w-10 h-10 transition-colors"
                aria-label={open ? "Close menu" : "Open menu"}
            >
                {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Full-screen menu panel */}
            {open && (
                <div
                    className="fixed inset-0 z-[70] flex flex-col"
                    style={{
                        backgroundColor: '#0a0f1e',
                        paddingTop: 'env(safe-area-inset-top, 0px)',
                    }}
                >
                    {/* Panel Header */}
                    <div className="flex items-center justify-between px-5 h-16 border-b border-white/10 shrink-0 mt-2">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                <span className="text-xs font-black text-white">SL</span>
                            </div>
                            <div>
                                <div className="font-bold text-white text-sm leading-none">SLCF</div>
                                <div className="text-[9px] text-blue-400 font-bold uppercase tracking-widest">Sierra Leone Chess</div>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Nav Links — Large & Prominent */}
                    <nav className="flex-1 overflow-y-auto px-5 py-6">
                        <div className="space-y-1">
                            {links.map((item) => {
                                const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        className={`block px-4 py-4 text-lg font-semibold rounded-2xl transition-all ${isActive
                                            ? "bg-blue-500/15 text-blue-400 border border-blue-500/20"
                                            : "text-white hover:bg-white/5 border border-transparent"
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </div>
                    </nav>

                    {/* Bottom Auth Section */}
                    <div className="shrink-0 px-5 pb-10 pt-4 border-t border-white/10">
                        {user ? (
                            <div className="space-y-3">
                                {/* User Info */}
                                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-base text-white shrink-0">
                                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-bold text-sm text-white truncate">{user.name || "User"}</div>
                                        <div className="text-[10px] text-blue-400 uppercase tracking-widest font-bold mt-0.5">
                                            {user.role === "ADMIN" ? "Administrator" : "Player"}
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2">
                                    {user.role === "ADMIN" && (
                                        <Link
                                            href="/admin/dashboard"
                                            onClick={() => setOpen(false)}
                                            className="flex-1 h-12 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white inline-flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <Shield className="w-4 h-4" />
                                            Admin Panel
                                        </Link>
                                    )}
                                    <Link
                                        href="/profile"
                                        onClick={() => setOpen(false)}
                                        className="flex-1 h-12 rounded-xl text-sm font-bold border border-white/10 hover:bg-white/5 text-white inline-flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <User className="w-4 h-4" />
                                        Profile
                                    </Link>
                                </div>

                                {/* Logout */}
                                <form action={logout}>
                                    <button
                                        type="submit"
                                        onClick={() => setOpen(false)}
                                        className="w-full h-12 rounded-xl text-sm font-bold border border-red-500/20 hover:bg-red-500/10 text-red-400 inline-flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Log Out
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <Link
                                    href="/login"
                                    onClick={() => setOpen(false)}
                                    className="w-full h-13 rounded-xl text-base font-bold border border-white/10 hover:bg-white/5 inline-flex items-center justify-center text-white transition-colors"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/login?mode=register"
                                    onClick={() => setOpen(false)}
                                    className="w-full h-13 rounded-xl text-base font-bold bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-white border-0 inline-flex items-center justify-center transition-colors"
                                >
                                    Join Federation
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
