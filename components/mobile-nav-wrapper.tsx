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

    // Mobile variant: hamburger + slide-down panel
    return (
        <div className="md:hidden">
            {/* Toggle Button */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="relative z-[60] inline-flex items-center justify-center text-white hover:bg-white/10 rounded-full w-10 h-10 transition-colors"
                aria-label={open ? "Close menu" : "Open menu"}
            >
                {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/60"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Slide-down Panel */}
            <div
                className={`fixed top-16 left-0 right-0 bottom-0 z-50 bg-slate-950 transition-all duration-300 ease-out ${open
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-full opacity-0 pointer-events-none"
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Nav Links */}
                    <nav className="flex-1 px-4 py-6 flex flex-col gap-1 overflow-y-auto">
                        {links.map((item) => {
                            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className={`px-4 py-3.5 text-base font-semibold rounded-xl transition-all ${isActive
                                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                        : "text-white/80 hover:bg-white/5 hover:text-white border border-transparent"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Bottom Auth Section */}
                    <div className="px-4 pb-8 pt-4 border-t border-white/10">
                        {user ? (
                            /* Logged-in state */
                            <div className="space-y-3">
                                {/* User Info Card */}
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-sm text-white shrink-0">
                                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-sm text-white truncate">{user.name || "User"}</div>
                                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
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
                                            className="flex-1 h-11 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white inline-flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <Shield className="w-4 h-4" />
                                            Admin Panel
                                        </Link>
                                    )}
                                    <Link
                                        href="/profile"
                                        onClick={() => setOpen(false)}
                                        className="flex-1 h-11 rounded-xl text-sm font-bold border border-white/10 hover:bg-white/5 text-white inline-flex items-center justify-center gap-2 transition-colors"
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
                                        className="w-full h-11 rounded-xl text-sm font-bold border border-red-500/20 hover:bg-red-500/10 text-red-400 inline-flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Log Out
                                    </button>
                                </form>
                            </div>
                        ) : (
                            /* Logged-out state */
                            <div className="flex flex-col gap-3">
                                <Link
                                    href="/login"
                                    onClick={() => setOpen(false)}
                                    className="w-full h-12 rounded-xl text-base font-bold border border-white/10 hover:bg-white/5 inline-flex items-center justify-center text-white transition-colors"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/login?mode=register"
                                    onClick={() => setOpen(false)}
                                    className="w-full h-12 rounded-xl text-base font-bold bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-white border-0 inline-flex items-center justify-center transition-colors"
                                >
                                    Join Federation
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
