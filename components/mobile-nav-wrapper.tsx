"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Home, CalendarDays, Users, GraduationCap, Newspaper, Shield, UserCircle, LogOut } from "lucide-react"
import { logout } from "@/app/actions/auth"

const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Calendar", href: "/calendar", icon: CalendarDays },
    { name: "Members", href: "/members", icon: Users },
    { name: "Learn", href: "/#learn", icon: GraduationCap },
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

    // Close on route change
    useEffect(() => { setOpen(false) }, [pathname])

    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [open])

    // ── Desktop: pill-style links ──
    if (variant === "desktop") {
        return (
            <>
                {navLinks.map((item) => {
                    const active = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            prefetch={true}
                            className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${active
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

    // ── Mobile: hamburger + fullscreen menu ──
    return (
        <div className="md:hidden">
            <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center text-white w-10 h-10 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Open menu"
            >
                <Menu className="w-6 h-6" />
            </button>

            {open && (
                <>
                    {/* 
                        Portal-style fullscreen menu.
                        Using inline styles for background to bypass any Tailwind overrides.
                    */}
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 9999,
                            backgroundColor: "#060b18",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {/* ─── Header ─── */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "12px 20px",
                                paddingTop: "max(12px, env(safe-area-inset-top, 12px))",
                                borderBottom: "1px solid rgba(255,255,255,0.08)",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                <div
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 10,
                                        background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: 900,
                                        fontSize: 12,
                                        color: "#fff",
                                    }}
                                >
                                    SL
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: 15, color: "#fff", lineHeight: 1 }}>SLCF</div>
                                    <div style={{ fontSize: 9, color: "#60a5fa", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const }}>
                                        Sierra Leone Chess
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "50%",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    background: "rgba(255,255,255,0.05)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#fff",
                                    cursor: "pointer",
                                }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* ─── Navigation Links ─── */}
                        <nav
                            style={{
                                flex: 1,
                                overflowY: "auto",
                                padding: "24px 20px",
                            }}
                        >
                            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                {navLinks.map((item) => {
                                    const active = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
                                    const Icon = item.icon
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setOpen(false)}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 14,
                                                padding: "16px 18px",
                                                borderRadius: 16,
                                                fontSize: 17,
                                                fontWeight: 600,
                                                color: active ? "#60a5fa" : "#e2e8f0",
                                                backgroundColor: active ? "rgba(59,130,246,0.1)" : "transparent",
                                                border: active ? "1px solid rgba(59,130,246,0.2)" : "1px solid transparent",
                                                textDecoration: "none",
                                                transition: "all 0.2s",
                                            }}
                                        >
                                            <Icon size={20} style={{ opacity: active ? 1 : 0.5 }} />
                                            {item.name}
                                        </Link>
                                    )
                                })}
                            </div>
                        </nav>

                        {/* ─── Auth Section (bottom) ─── */}
                        <div
                            style={{
                                padding: "16px 20px",
                                paddingBottom: "max(24px, env(safe-area-inset-bottom, 24px))",
                                borderTop: "1px solid rgba(255,255,255,0.08)",
                            }}
                        >
                            {user ? (
                                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                    {/* User card */}
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 12,
                                            padding: "12px 14px",
                                            borderRadius: 14,
                                            backgroundColor: "rgba(255,255,255,0.03)",
                                            border: "1px solid rgba(255,255,255,0.06)",
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: 42,
                                                height: 42,
                                                borderRadius: "50%",
                                                background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontWeight: 700,
                                                fontSize: 16,
                                                color: "#fff",
                                                flexShrink: 0,
                                            }}
                                        >
                                            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontWeight: 600, fontSize: 14, color: "#fff" }}>
                                                {user.name || "User"}
                                            </div>
                                            <div style={{ fontSize: 10, color: "#60a5fa", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>
                                                {user.role === "ADMIN" ? "Administrator" : "Player"}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Buttons row */}
                                    <div style={{ display: "flex", gap: 8 }}>
                                        {user.role === "ADMIN" && (
                                            <Link
                                                href="/admin/dashboard"
                                                onClick={() => setOpen(false)}
                                                style={{
                                                    flex: 1,
                                                    height: 44,
                                                    borderRadius: 12,
                                                    backgroundColor: "#2563eb",
                                                    color: "#fff",
                                                    fontWeight: 700,
                                                    fontSize: 13,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    gap: 6,
                                                    textDecoration: "none",
                                                }}
                                            >
                                                <Shield size={16} />
                                                Admin
                                            </Link>
                                        )}
                                        <Link
                                            href="/profile"
                                            onClick={() => setOpen(false)}
                                            style={{
                                                flex: 1,
                                                height: 44,
                                                borderRadius: 12,
                                                border: "1px solid rgba(255,255,255,0.1)",
                                                color: "#fff",
                                                fontWeight: 700,
                                                fontSize: 13,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: 6,
                                                textDecoration: "none",
                                            }}
                                        >
                                            <UserCircle size={16} />
                                            Profile
                                        </Link>
                                    </div>

                                    {/* Logout */}
                                    <form action={logout}>
                                        <button
                                            type="submit"
                                            onClick={() => setOpen(false)}
                                            style={{
                                                width: "100%",
                                                height: 44,
                                                borderRadius: 12,
                                                border: "1px solid rgba(239,68,68,0.2)",
                                                backgroundColor: "transparent",
                                                color: "#f87171",
                                                fontWeight: 700,
                                                fontSize: 13,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: 6,
                                                cursor: "pointer",
                                            }}
                                        >
                                            <LogOut size={16} />
                                            Log Out
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                    <Link
                                        href="/login"
                                        onClick={() => setOpen(false)}
                                        style={{
                                            width: "100%",
                                            height: 48,
                                            borderRadius: 14,
                                            border: "1px solid rgba(255,255,255,0.15)",
                                            color: "#fff",
                                            fontWeight: 700,
                                            fontSize: 15,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            textDecoration: "none",
                                        }}
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        href="/login?mode=register"
                                        onClick={() => setOpen(false)}
                                        style={{
                                            width: "100%",
                                            height: 48,
                                            borderRadius: 14,
                                            background: "linear-gradient(135deg, #10b981, #2563eb)",
                                            color: "#fff",
                                            fontWeight: 700,
                                            fontSize: 15,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            textDecoration: "none",
                                            border: "none",
                                        }}
                                    >
                                        Join Federation
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
